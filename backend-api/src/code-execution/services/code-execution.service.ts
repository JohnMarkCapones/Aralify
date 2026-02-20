import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XpSource } from '@prisma/client';
import { PistonService } from './piston.service';
import { LessonsRepository } from '../../lessons/lessons.repository';
import { XpService } from '../../gamification/services';
import {
  XP_REWARDS,
  XP_DIFFICULTY_MULTIPLIERS,
} from '../../gamification/constants';
import {
  PistonExecuteRequest,
  PistonExecuteResponse,
  TestCaseDefinition,
  TestCaseResult,
  ExecutionResult,
  SubmissionResult,
} from '../interfaces';

@Injectable()
export class CodeExecutionService {
  private readonly logger = new Logger(CodeExecutionService.name);
  private readonly runTimeoutMs: number;
  private readonly runMemoryLimit: number;

  constructor(
    private readonly pistonService: PistonService,
    private readonly lessonsRepository: LessonsRepository,
    private readonly xpService: XpService,
    private readonly configService: ConfigService,
  ) {
    this.runTimeoutMs = this.configService.get<number>(
      'PISTON_RUN_TIMEOUT_MS',
      10000,
    );
    this.runMemoryLimit = this.configService.get<number>(
      'PISTON_RUN_MEMORY_LIMIT',
      134217728,
    );
  }

  /**
   * Execute a test run against challenge test cases (no save, no XP)
   */
  async executeTestRun(
    challengeId: string,
    userId: string,
    code: string,
    languageId: number,
  ): Promise<ExecutionResult> {
    const challenge =
      await this.lessonsRepository.getChallengeById(challengeId);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    const testCases = challenge.testCases as unknown as TestCaseDefinition[];
    if (!Array.isArray(testCases) || testCases.length === 0) {
      throw new BadRequestException('Challenge has no test cases');
    }

    return this.runTestCases(code, languageId, testCases);
  }

  /**
   * Submit a solution: execute, save, and award XP on success
   */
  async submitSolution(
    challengeId: string,
    userId: string,
    code: string,
    languageId: number,
    timeSpentSeconds?: number,
  ): Promise<SubmissionResult> {
    // Fetch challenge and verify it exists
    const challenge =
      await this.lessonsRepository.getChallengeById(challengeId);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    // Verify lesson exists and is published
    const lesson = await this.lessonsRepository.getLessonById(
      challenge.lessonId,
    );
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found or not published');
    }

    // Check if user already passed this challenge
    const previouslyPassed = await this.lessonsRepository.hasPassedChallenge(
      userId,
      challengeId,
    );

    // Get attempt count
    const attemptCount = await this.lessonsRepository.getChallengeAttemptCount(
      userId,
      challengeId,
    );
    const attemptNumber = attemptCount + 1;

    // Execute test cases
    const testCases = challenge.testCases as unknown as TestCaseDefinition[];
    if (!Array.isArray(testCases) || testCases.length === 0) {
      throw new BadRequestException('Challenge has no test cases');
    }

    const executionResult = await this.runTestCases(
      code,
      languageId,
      testCases,
    );

    const allTestsPassed =
      executionResult.failed === 0 && executionResult.total > 0;
    const status = allTestsPassed ? 'PASSED' : 'FAILED';

    // Calculate XP
    let xpEarned = 0;
    if (allTestsPassed && !previouslyPassed) {
      const difficultyKey = lesson.difficulty as keyof typeof XP_DIFFICULTY_MULTIPLIERS;
      const multiplier = XP_DIFFICULTY_MULTIPLIERS[difficultyKey] ?? 1;
      xpEarned = XP_REWARDS.CHALLENGE_COMPLETE * multiplier;
    }

    // Save submission
    const submission = await this.lessonsRepository.createChallengeSubmission({
      userId,
      challengeId,
      code,
      languageId,
      status,
      attemptNumber,
      xpAwarded: xpEarned,
      timeSpentSeconds,
      testResults: executionResult.testResults,
    });

    // Award XP if earned
    let gamificationResult = null;
    if (xpEarned > 0) {
      try {
        const xpResult = await this.xpService.awardXp(
          userId,
          xpEarned,
          XpSource.CHALLENGE_COMPLETE,
          challengeId,
          `Completed challenge: ${challenge.title}`,
        );
        gamificationResult = {
          xpAwarded: xpResult.xpAwarded,
          newTotal: xpResult.newTotal,
          levelUp: xpResult.levelUp,
          newLevel: xpResult.newLevel,
          rankTitle: xpResult.rankTitle,
        };
      } catch (error) {
        this.logger.error(
          `Failed to award XP for challenge ${challengeId}: ${error}`,
        );
        // Don't fail the submission if XP award fails
      }
    }

    return {
      ...executionResult,
      submissionId: submission.id,
      allTestsPassed,
      xpEarned,
      attemptNumber,
      previouslyPassed,
      gamification: gamificationResult,
    };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private async runTestCases(
    code: string,
    languageId: number,
    testCases: TestCaseDefinition[],
  ): Promise<ExecutionResult> {
    // Map numeric language ID to Piston language + version
    const { language, version } =
      this.pistonService.mapLanguageId(languageId);

    // Build Piston requests — no base64, just raw strings
    const requests: PistonExecuteRequest[] = testCases.map((tc) => ({
      language,
      version,
      files: [{ content: code }],
      stdin: tc.input,
      run_timeout: this.runTimeoutMs,
      compile_timeout: this.runTimeoutMs,
      run_memory_limit: this.runMemoryLimit,
    }));

    // Execute via Piston (sequential — no batch endpoint)
    const responses = await this.pistonService.executeAll(requests);

    // Map responses to test results
    const testResults: TestCaseResult[] = responses.map((response, index) => {
      const tc = testCases[index];
      const actualOutput = response.run.stdout?.trim() ?? null;
      const expectedOutput = tc.expectedOutput.trim();
      const passed =
        response.run.code === 0 &&
        actualOutput === expectedOutput;

      return {
        testCase: index + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput,
        passed,
        executionTimeMs: null,
        memoryUsedKb: null,
        status: this.getStatusDescription(response),
        errorOutput: response.run.stderr || response.compile?.stderr || null,
      };
    });

    const passed = testResults.filter((r) => r.passed).length;
    const failed = testResults.filter((r) => !r.passed).length;
    const hasError = responses.some(
      (r) =>
        (r.compile && r.compile.code !== 0) ||
        (r.run.code !== null && r.run.code !== 0),
    );

    return {
      stdout: responses[0]?.run.stdout ?? null,
      stderr: responses[0]?.run.stderr ?? null,
      testResults,
      passed,
      failed,
      total: testResults.length,
      overallStatus:
        failed === 0 && !hasError ? 'PASSED' : hasError ? 'ERROR' : 'FAILED',
    };
  }

  private getStatusDescription(response: PistonExecuteResponse): string {
    // Compilation error
    if (response.compile && response.compile.code !== 0) {
      return 'Compilation Error';
    }

    // Successful execution
    if (response.run.code === 0) {
      return 'Accepted';
    }

    // Killed by signal (typically SIGKILL from timeout)
    if (response.run.signal === 'SIGKILL') {
      return 'Time Limit Exceeded';
    }

    // Other non-zero exit code = runtime error
    if (response.run.code !== null && response.run.code !== 0) {
      return `Runtime Error (exit code ${response.run.code})`;
    }

    return 'Unknown Error';
  }
}
