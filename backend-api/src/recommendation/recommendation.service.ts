import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RecommendationRepository } from './recommendation.repository';
import { ProfilingService } from './services/profiling.service';
import { PathScoringService } from './services/path-scoring.service';
import { DifficultyCalibrationService } from './services/difficulty-calibration.service';
import { EngagementService } from './services/engagement.service';
import { CollaborativeService } from './services/collaborative.service';
import { StudyPlanService } from './services/study-plan.service';
import { SubmitAssessmentDto } from './dto';

/**
 * Recommendation Service — Orchestrator
 *
 * Central coordinator for the PathFinder recommendation engine.
 * Combines all 7 layers into unified recommendation flows:
 *
 * Layer 1: Profiling (onboarding assessment)
 * Layer 2: Career Path Knowledge Graph (data model)
 * Layer 3: Path Scoring (multi-factor weighted algorithm)
 * Layer 4: Adaptive Difficulty Calibration (ADC)
 * Layer 5: Collaborative Filtering
 * Layer 6: Engagement Monitoring & Re-ranking
 * Layer 7: Study Plan Generation
 */
@Injectable()
export class RecommendationService {
  private readonly logger = new Logger(RecommendationService.name);

  constructor(
    private readonly repository: RecommendationRepository,
    private readonly profilingService: ProfilingService,
    private readonly pathScoringService: PathScoringService,
    private readonly difficultyService: DifficultyCalibrationService,
    private readonly engagementService: EngagementService,
    private readonly collaborativeService: CollaborativeService,
    private readonly studyPlanService: StudyPlanService,
  ) {}

  // ========================================================================
  // Assessment Flow (Layer 1 + 3)
  // ========================================================================

  /**
   * Submit profiling assessment, generate path recommendations, and store results.
   * This is the primary entry point for new users.
   * Supports guest mode (userId = null) — scores paths without persisting profile/recommendations.
   */
  async submitAssessment(userId: string | null, dto: SubmitAssessmentDto) {
    let profile: any = null;

    // Step 1: Store learning profile (only for authenticated users)
    if (userId) {
      profile = await this.profilingService.submitAssessment(userId, dto);
    } else {
      // Build a transient profile for scoring without persisting
      profile = this.profilingService.buildTransientProfile(dto);
    }

    // Step 2: Score all career paths
    const scoredPaths = userId
      ? await this.pathScoringService.scorePathsForUser(userId)
      : await this.pathScoringService.scorePathsForProfile(profile);

    // Step 3: Persist top recommendations (only for authenticated users)
    if (userId) {
      await this.pathScoringService.persistRecommendations(userId, scoredPaths);
    }

    // Step 4: Format response
    const topPaths = scoredPaths.slice(0, 3).map((sp) => ({
      id: sp.path.id,
      slug: sp.path.slug,
      title: sp.path.title,
      description: sp.path.description,
      industry: sp.path.industry,
      estimatedHours: sp.path.estimatedHours,
      score: Math.round(sp.score * 100) / 100,
      matchPercentage: Math.round(sp.score * 100),
      scoreBreakdown: {
        interestAlignment: Math.round(sp.breakdown.interestAlignment * 100) / 100,
        goalAlignment: Math.round(sp.breakdown.goalAlignment * 100) / 100,
        skillGap: Math.round(sp.breakdown.skillGap * 100) / 100,
        timeViability: Math.round(sp.breakdown.timeViability * 100) / 100,
        marketDemand: Math.round(sp.breakdown.marketDemand * 100) / 100,
        communityPopularity: Math.round(sp.breakdown.communityPopularity * 100) / 100,
        cognitiveMatch: Math.round(sp.breakdown.cognitiveMatch * 100) / 100,
      },
      rank: sp.rank,
      marketDemand: sp.path.marketDemand,
      color: sp.path.color,
      iconUrl: sp.path.iconUrl,
    }));

    this.logger.log(
      `Assessment complete for ${userId ? `user ${userId}` : 'guest'}. Top path: ${topPaths[0]?.slug} (${topPaths[0]?.matchPercentage}%)`,
    );

    return {
      profile,
      recommendedPaths: topPaths,
      totalPathsScored: scoredPaths.length,
    };
  }

  // ========================================================================
  // Recommendation Retrieval (Layer 3 + 5 + 6)
  // ========================================================================

  /**
   * Get recommended career paths for a user.
   * Combines stored recommendations with collaborative signals.
   */
  async getRecommendedPaths(userId: string) {
    const recommendations = await this.repository.getActiveRecommendations(
      userId,
      'CAREER_PATH',
    );

    if (recommendations.length === 0) {
      // Try to generate fresh recommendations
      const profile = await this.repository.getLearningProfile(userId);
      if (!profile) {
        return { recommendations: [], message: 'Complete the assessment first.' };
      }

      const scoredPaths = await this.pathScoringService.scorePathsForUser(userId);
      await this.pathScoringService.persistRecommendations(userId, scoredPaths);

      return {
        recommendations: scoredPaths.slice(0, 5).map((sp) => ({
          id: sp.path.id,
          slug: sp.path.slug,
          title: sp.path.title,
          description: sp.path.description,
          industry: sp.path.industry,
          estimatedHours: sp.path.estimatedHours,
          score: sp.score,
          matchPercentage: Math.round(sp.score * 100),
          rank: sp.rank,
          color: sp.path.color,
          iconUrl: sp.path.iconUrl,
        })),
      };
    }

    // Enrich stored recommendations with path data
    const enriched = await Promise.all(
      recommendations.map(async (rec: any) => {
        const path = await this.repository.findCareerPathById(rec.targetId);
        return {
          recommendationId: rec.id,
          id: path?.id || rec.targetId,
          slug: path?.slug || '',
          title: path?.title || '',
          description: path?.description || '',
          industry: path?.industry || '',
          estimatedHours: path?.estimatedHours || 0,
          score: rec.score,
          matchPercentage: Math.round(rec.score * 100),
          scoreBreakdown: rec.reasoning,
          rank: rec.rank,
          color: path?.color,
          iconUrl: path?.iconUrl,
        };
      }),
    );

    return { recommendations: enriched };
  }

  // ========================================================================
  // Next Lesson Recommendation (Layer 4 + 6)
  // ========================================================================

  /**
   * Get the next recommended lesson for a user, factoring in:
   * - Current career path progress
   * - Adaptive difficulty calibration
   * - Engagement signals
   */
  async getNextLesson(userId: string) {
    const [profile, engagement] = await Promise.all([
      this.repository.getLearningProfile(userId),
      this.engagementService.analyzeEngagement(userId),
    ]);

    const difficultyScore = profile?.difficultyScore ?? 0.5;
    const recommendedDifficulty = this.difficultyService.getDifficultyTier(difficultyScore);

    // Get user's active career path
    const userPaths = await this.repository.getUserCareerPaths(userId);
    const activePath = userPaths.find((p: any) => p.status === 'ACTIVE');

    let nextLessons: any[] = [];

    if (activePath) {
      // Follow career path order
      for (const node of activePath.careerPath.nodes) {
        if (node.courseId && nextLessons.length < 3) {
          const lessons = await this.repository.getNextUncompletedLessons(
            userId,
            node.courseId,
            3,
          );
          nextLessons.push(...lessons);
        }
      }
    }

    if (nextLessons.length === 0) {
      return {
        lessons: [],
        message: 'No uncompleted lessons found. Enroll in a career path or start a course!',
        currentDifficultyLevel: recommendedDifficulty,
        difficultyScore,
      };
    }

    // Filter for recommended difficulty (prefer matching, fall back to any)
    const difficultyFiltered = nextLessons.filter(
      (l) => l.difficulty === recommendedDifficulty,
    );
    const selected = difficultyFiltered.length > 0 ? difficultyFiltered : nextLessons;

    // Apply engagement re-ranking
    const ranked = selected.slice(0, 3).map((lesson) => {
      const multiplier = this.engagementService.getReRankingMultiplier(
        engagement,
        lesson.difficulty,
      );

      return {
        lessonId: lesson.id,
        title: lesson.title,
        recommendedDifficulty: lesson.difficulty,
        courseSlug: lesson.level?.course?.slug || '',
        courseTitle: lesson.level?.course?.title || '',
        reason: this.generateLessonReason(lesson, recommendedDifficulty, engagement),
        estimatedXp: lesson.xpReward || 100,
        estimatedMinutes: 15,
        engagementMultiplier: multiplier,
      };
    });

    const nudgeMessage = this.engagementService.generateNudgeMessage(engagement);

    return {
      lessons: ranked,
      totalEstimatedMinutes: ranked.length * 15,
      currentDifficultyLevel: recommendedDifficulty,
      difficultyScore,
      nudgeMessage,
    };
  }

  // ========================================================================
  // Difficulty Recalibration (Layer 4)
  // ========================================================================

  async recalibrate(userId: string) {
    return this.difficultyService.calibrate(userId);
  }

  // ========================================================================
  // Recommendation Actions
  // ========================================================================

  async dismissRecommendation(recommendationId: string) {
    return this.repository.dismissRecommendation(recommendationId);
  }

  async acceptRecommendation(recommendationId: string) {
    return this.repository.acceptRecommendation(recommendationId);
  }

  // ========================================================================
  // Collaborative Filtering (Layer 5)
  // ========================================================================

  async getCollaborativeRecommendations(userId: string) {
    return this.collaborativeService.getRecommendations(userId);
  }

  // ========================================================================
  // Profile
  // ========================================================================

  async getProfile(userId: string) {
    return this.profilingService.getProfile(userId);
  }

  // ========================================================================
  // Private helpers
  // ========================================================================

  private generateLessonReason(
    lesson: any,
    recommendedDifficulty: string,
    engagement: any,
  ): string {
    if (engagement.isStruggling) {
      return 'We recommend this easier lesson to help build your confidence.';
    }
    if (engagement.isBreezing) {
      return 'You\'re ready for a challenge! This harder lesson will push your skills further.';
    }
    if (lesson.difficulty === recommendedDifficulty) {
      return `Based on your performance, ${recommendedDifficulty} difficulty is your sweet spot.`;
    }
    return 'This is the next lesson in your learning path.';
  }
}
