import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XpSource } from '@prisma/client';
import { Judge0Service } from './judge0.service';
import { LessonsRepository } from '../../lessons/lessons.repository';
import { XpService } from '../../gamification/services';
import {
  XP_REWARDS,
  XP_DIFFICULTY_MULTIPLIERS,
} from '../../gamification/constants';
import {
  Judge0SubmissionRequest,
  Judge0SubmissionResponse,
  Judge0StatusId,
  isRuntimeError,
  TestCaseDefinition,
  TestCaseResult,
  ExecutionResult,
  SubmissionResult,
} from '../interfaces';

@Injectable()
export class CodeExecutionService {
  private readonly logger = new Logger(CodeExecutionService.name);
  private readonly maxExecutionTimeSec: number;
  private readonly maxMemoryKb: number;

  constructor(
    private readonly judge0Service: Judge0Service,
    private readonly lessonsRepository: LessonsRepository,
    private readonly xpService: XpService,
    private readonly configService: ConfigService,
  ) {
    this.maxExecutionTimeSec = this.configService.get<number>(
      'JUDGE0_MAX_EXECUTION_TIME_SEC',
      5,
    );
    this.maxMemoryKb = this.configService.get<number>(
      'JUDGE0_MAX_MEMORY_KB',
      131072,
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
    // Build batch requests
    const requests: Judge0SubmissionRequest[] = testCases.map((tc) => ({
      source_code: Buffer.from(code, 'utf-8').toString('base64'),
      language_id: languageId,
      stdin: Buffer.from(tc.input, 'utf-8').toString('base64'),
      cpu_time_limit: this.maxExecutionTimeSec,
      memory_limit: this.maxMemoryKb,
    }));

    // Execute via Judge0
    const responses = await this.judge0Service.submitBatch(requests);

    // Map responses to test results
    const testResults: TestCaseResult[] = responses.map((response, index) => {
      const tc = testCases[index];
      const actualOutput = response.stdout?.trim() ?? null;
      const expectedOutput = tc.expectedOutput.trim();
      const passed =
        response.status.id === Judge0StatusId.ACCEPTED &&
        actualOutput === expectedOutput;

      return {
        testCase: index + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput,
        passed,
        executionTimeMs: response.time
          ? Math.round(parseFloat(response.time) * 1000)
          : null,
        memoryUsedKb: response.memory,
        status: this.getStatusDescription(response),
        errorOutput: response.stderr || response.compile_output || null,
      };
    });

    const passed = testResults.filter((r) => r.passed).length;
    const failed = testResults.filter((r) => !r.passed).length;
    const hasError = responses.some(
      (r) =>
        r.status.id === Judge0StatusId.COMPILATION_ERROR ||
        isRuntimeError(r.status.id) ||
        r.status.id === Judge0StatusId.INTERNAL_ERROR,
    );

    return {
      stdout: responses[0]?.stdout ?? null,
      stderr: responses[0]?.stderr ?? null,
      testResults,
      passed,
      failed,
      total: testResults.length,
      overallStatus:
        failed === 0 && !hasError ? 'PASSED' : hasError ? 'ERROR' : 'FAILED',
    };
  }

  private getStatusDescription(response: Judge0SubmissionResponse): string {
    switch (response.status.id) {
      case Judge0StatusId.ACCEPTED:
        return 'Accepted';
      case Judge0StatusId.WRONG_ANSWER:
        return 'Wrong Answer';
      case Judge0StatusId.TIME_LIMIT_EXCEEDED:
        return 'Time Limit Exceeded';
      case Judge0StatusId.COMPILATION_ERROR:
        return 'Compilation Error';
      case Judge0StatusId.INTERNAL_ERROR:
        return 'Internal Error';
      default:
        if (isRuntimeError(response.status.id)) {
          return `Runtime Error (${response.status.description})`;
        }
        return response.status.description;
    }
  }
}
