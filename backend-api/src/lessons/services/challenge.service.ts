import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { LessonsRepository } from '../lessons.repository';

@Injectable()
export class ChallengeService {
  private readonly logger = new Logger(ChallengeService.name);

  constructor(private readonly lessonsRepository: LessonsRepository) {}

  /**
   * Submit code for a challenge (storage only, no code execution)
   * Piston integration will update status/testResults later
   */
  async submitChallenge(
    lessonId: string,
    challengeId: string,
    userId: string,
    code: string,
    languageId: number,
    timeSpentSeconds?: number,
  ) {
    // Verify lesson exists
    const lesson = await this.lessonsRepository.findById(lessonId);
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Verify challenge exists and belongs to lesson
    const challenge = await this.lessonsRepository.getChallengeById(challengeId);
    if (!challenge || challenge.lessonId !== lessonId) {
      throw new NotFoundException('Challenge not found in this lesson');
    }

    // Get attempt count
    const attemptCount = await this.lessonsRepository.getChallengeAttemptCount(
      userId,
      challengeId,
    );
    const attemptNumber = attemptCount + 1;

    // Create submission with SUBMITTED status
    // XP will be awarded when Piston updates status to PASSED
    const submission = await this.lessonsRepository.createChallengeSubmission({
      userId,
      challengeId,
      code,
      languageId,
      status: 'SUBMITTED',
      attemptNumber,
      xpAwarded: 0,
      timeSpentSeconds,
    });

    return {
      success: true,
      submissionId: submission.id,
      challengeId,
      status: submission.status,
      attemptNumber,
      xpAwarded: 0,
      testResults: null,
      createdAt: submission.createdAt,
    };
  }

  /**
   * Get submission history for a challenge
   */
  async getChallengeSubmissions(
    lessonId: string,
    challengeId: string,
    userId: string,
  ) {
    // Verify lesson exists
    const lesson = await this.lessonsRepository.findById(lessonId);
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Verify challenge exists and belongs to lesson
    const challenge = await this.lessonsRepository.getChallengeById(challengeId);
    if (!challenge || challenge.lessonId !== lessonId) {
      throw new NotFoundException('Challenge not found in this lesson');
    }

    // This would need a new repository method to get submissions
    // For now, return basic info
    const attemptCount = await this.lessonsRepository.getChallengeAttemptCount(
      userId,
      challengeId,
    );
    const hasPassed = await this.lessonsRepository.hasPassedChallenge(
      userId,
      challengeId,
    );

    return {
      challengeId,
      totalAttempts: attemptCount,
      bestStatus: hasPassed ? 'PASSED' : attemptCount > 0 ? 'SUBMITTED' : 'NOT_STARTED',
      totalXpEarned: 0, // Would need to sum from submissions
      submissions: [], // Would need new repository method
    };
  }
}
