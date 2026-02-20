import { Injectable, Logger } from '@nestjs/common';
import { RecommendationRepository } from '../recommendation.repository';
import { SubmitAssessmentDto } from '../dto';
import { BACKGROUND_SKILL_MAP } from '../constants/scoring.constants';

/**
 * Layer 1: User Profiling Service
 *
 * Handles the onboarding assessment quiz, storing and retrieving
 * the user's learning profile for downstream recommendation algorithms.
 */
@Injectable()
export class ProfilingService {
  private readonly logger = new Logger(ProfilingService.name);

  constructor(private readonly repository: RecommendationRepository) {}

  /**
   * Process and store the user's profiling assessment answers.
   * Calculates an initial difficulty score based on background and analytical ability.
   */
  async submitAssessment(userId: string, dto: SubmitAssessmentDto) {
    const initialDifficulty = this.calculateInitialDifficulty(
      dto.background,
      dto.analyticalScore,
    );

    const profile = await this.repository.upsertLearningProfile(userId, {
      motivation: dto.motivation,
      dreamProject: dto.dreamProject ?? null,
      subjectInterests: dto.subjectInterests ?? null,
      personalityType: dto.personalityType ?? null,
      industryInterests: dto.industryInterests,
      workStyle: dto.workStyle,
      mathComfort: dto.mathComfort ?? null,
      dailyRoutine: dto.dailyRoutine ?? null,
      timeHorizon: dto.timeHorizon,
      background: dto.background,
      contentPreference: dto.contentPreference ?? null,
      analyticalScore: dto.analyticalScore,
      contextProfile: dto.contextProfile,
      difficultyScore: initialDifficulty,
      lastCalibrationAt: new Date(),
    });

    this.logger.log(
      `Profile created for user ${userId} — initial difficulty: ${initialDifficulty.toFixed(2)}`,
    );

    return this.formatProfile(profile);
  }

  /**
   * Build a transient profile object from assessment data without persisting.
   * Used for guest users who haven't signed up yet.
   */
  buildTransientProfile(dto: SubmitAssessmentDto) {
    const initialDifficulty = this.calculateInitialDifficulty(
      dto.background,
      dto.analyticalScore,
    );

    return {
      id: 'guest',
      motivation: dto.motivation,
      dreamProject: dto.dreamProject ?? [],
      subjectInterests: dto.subjectInterests ?? [],
      personalityType: dto.personalityType ?? null,
      industryInterests: dto.industryInterests,
      workStyle: dto.workStyle,
      mathComfort: dto.mathComfort ?? null,
      dailyRoutine: dto.dailyRoutine ?? null,
      timeHorizon: dto.timeHorizon,
      background: dto.background,
      contentPreference: dto.contentPreference ?? null,
      analyticalScore: dto.analyticalScore,
      contextProfile: dto.contextProfile,
      difficultyScore: initialDifficulty,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getProfile(userId: string) {
    const profile = await this.repository.getLearningProfile(userId);
    if (!profile) return null;
    return this.formatProfile(profile);
  }

  /**
   * Calculate initial difficulty score (0-1) from onboarding data.
   * Combines background experience (70% weight) with analytical ability (30% weight).
   */
  private calculateInitialDifficulty(
    background: string,
    analyticalScore: number,
  ): number {
    const backgroundWeight = 0.7;
    const analyticalWeight = 0.3;

    const backgroundScore = BACKGROUND_SKILL_MAP[background] ?? 0;
    const normalizedAnalytical = analyticalScore / 100;

    return (
      backgroundWeight * backgroundScore +
      analyticalWeight * normalizedAnalytical
    );
  }

  private formatProfile(profile: any) {
    return {
      id: profile.id,
      motivation: profile.motivation || [],
      dreamProject: profile.dreamProject || [],
      subjectInterests: profile.subjectInterests || [],
      personalityType: profile.personalityType || null,
      industryInterests: profile.industryInterests || [],
      workStyle: profile.workStyle,
      mathComfort: profile.mathComfort || null,
      dailyRoutine: profile.dailyRoutine || null,
      timeHorizon: profile.timeHorizon,
      background: profile.background,
      contentPreference: profile.contentPreference || null,
      analyticalScore: profile.analyticalScore,
      contextProfile: profile.contextProfile,
      difficultyScore: profile.difficultyScore,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
