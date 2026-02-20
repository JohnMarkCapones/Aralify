import { Injectable, Logger } from '@nestjs/common';
import { RecommendationRepository } from '../recommendation.repository';
import { COLLABORATIVE } from '../constants/scoring.constants';

interface UserVector {
  userId: string;
  features: number[];
}

interface SimilarUser {
  userId: string;
  similarity: number;
}

export interface CollaborativeRecommendation {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  courseLanguage: string;
  score: number;
  recommendedBy: number; // how many similar users completed this
}

/**
 * Layer 5: Collaborative Filtering Service
 *
 * Implements user-based collaborative filtering to recommend courses
 * based on what similar users have completed and enjoyed.
 *
 * Algorithm:
 * 1. Build feature vectors for all users (skill level, interests, XP rate, etc.)
 * 2. Compute cosine similarity between the target user and all other users
 * 3. Select top-K similar users above a minimum similarity threshold
 * 4. Aggregate courses completed by similar users that the target hasn't started
 * 5. Rank by weighted completion count among similar users
 *
 * Note: This service requires a minimum user base (50+ active users with
 * completed onboarding) to provide meaningful recommendations.
 */
@Injectable()
export class CollaborativeService {
  private readonly logger = new Logger(CollaborativeService.name);

  constructor(private readonly repository: RecommendationRepository) {}

  /**
   * Get collaborative filtering recommendations for a user.
   * Returns courses that similar users have completed but this user hasn't.
   */
  async getRecommendations(userId: string): Promise<CollaborativeRecommendation[]> {
    // 1. Get all user vectors
    const allUsers = await this.repository.getAllUserVectors();

    if (allUsers.length < COLLABORATIVE.minSimilarUsers) {
      this.logger.warn(
        `Insufficient users for collaborative filtering (${allUsers.length} < ${COLLABORATIVE.minSimilarUsers})`,
      );
      return [];
    }

    // 2. Build feature vectors
    const vectors = allUsers.map((user) => this.buildUserVector(user));
    const targetVector = vectors.find((v) => v.userId === userId);

    if (!targetVector) {
      this.logger.warn(`Target user ${userId} not found in user vectors`);
      return [];
    }

    // 3. Compute similarities
    const similarities: SimilarUser[] = vectors
      .filter((v) => v.userId !== userId)
      .map((v) => ({
        userId: v.userId,
        similarity: this.cosineSimilarity(targetVector.features, v.features),
      }))
      .filter((s) => s.similarity >= COLLABORATIVE.minSimilarityScore)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, COLLABORATIVE.maxSimilarUsers);

    if (similarities.length < COLLABORATIVE.minSimilarUsers) {
      this.logger.debug(
        `Not enough similar users for ${userId} (${similarities.length})`,
      );
      return [];
    }

    // 4. Get courses the target user hasn't started
    const unstartedCourses = await this.repository.getUnstartedCourses(userId);
    const unstartedCourseIds = new Set(unstartedCourses.map((c) => c.id));

    // 5. Aggregate similar users' completed courses
    const courseScores = new Map<
      string,
      { score: number; count: number; course: any }
    >();

    for (const similar of similarities) {
      const simUser = allUsers.find((u) => u.id === similar.userId);
      if (!simUser) continue;

      for (const progress of simUser.courseProgress) {
        if (!unstartedCourseIds.has(progress.courseId)) continue;
        if (progress.completionPercentage < 50) continue; // only count meaningful progress

        const existing = courseScores.get(progress.courseId);
        const weightedScore = similar.similarity * (progress.completionPercentage / 100);

        if (existing) {
          existing.score += weightedScore;
          existing.count++;
        } else {
          const courseInfo = unstartedCourses.find((c) => c.id === progress.courseId);
          courseScores.set(progress.courseId, {
            score: weightedScore,
            count: 1,
            course: courseInfo,
          });
        }
      }
    }

    // 6. Rank and return
    const recommendations: CollaborativeRecommendation[] = Array.from(
      courseScores.entries(),
    )
      .map(([courseId, data]) => ({
        courseId,
        courseSlug: data.course?.slug || '',
        courseTitle: data.course?.title || '',
        courseLanguage: data.course?.language || '',
        score: data.score / similarities.length, // normalize
        recommendedBy: data.count,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    this.logger.log(
      `Collaborative recommendations for ${userId}: ${recommendations.length} courses from ${similarities.length} similar users`,
    );

    return recommendations;
  }

  // ========================================================================
  // Feature vector construction
  // ========================================================================

  /**
   * Build a normalized feature vector for a user.
   * Features: [skillLevel, interestDiversity, courseProgress, avgDifficulty, xpRate, streakAvg]
   */
  private buildUserVector(user: any): UserVector {
    // Skill level (0-1)
    const skillMap: Record<string, number> = {
      COMPLETE_BEGINNER: 0.0,
      SOME_EXPERIENCE: 0.33,
      INTERMEDIATE: 0.66,
      ADVANCED: 1.0,
    };
    const skillLevel = skillMap[user.skillLevel] ?? 0.5;

    // Interest diversity (0-1) — how many interest areas
    const interests = (user.interestedLanguages as string[]) || [];
    const interestDiversity = Math.min(1, interests.length / 5);

    // Course progress average (0-1)
    const courseProgress =
      user.courseProgress.length > 0
        ? user.courseProgress.reduce(
            (sum: number, cp: any) => sum + cp.completionPercentage,
            0,
          ) /
          (user.courseProgress.length * 100)
        : 0;

    // Average difficulty preference (0-1)
    const diffMap: Record<string, number> = { EASY: 0.0, MEDIUM: 0.5, HARD: 1.0 };
    const completedDifficulties = user.lessonProgress.map(
      (lp: any) => diffMap[lp.lesson.difficulty] ?? 0.5,
    );
    const avgDifficulty =
      completedDifficulties.length > 0
        ? completedDifficulties.reduce((a: number, b: number) => a + b, 0) /
          completedDifficulties.length
        : 0.5;

    // XP rate (0-1) — normalized XP per day since account creation
    const daysSinceCreation = Math.max(
      1,
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24),
    );
    const xpRate = Math.min(1, (user.xpTotal / daysSinceCreation) / 200); // 200 XP/day = max

    // Streak consistency (0-1)
    const streakAvg = Math.min(1, user.streakCurrent / 30); // 30-day streak = max

    return {
      userId: user.id,
      features: [
        skillLevel,
        interestDiversity,
        courseProgress,
        avgDifficulty,
        xpRate,
        streakAvg,
      ],
    };
  }

  // ========================================================================
  // Math utilities
  // ========================================================================

  /**
   * Cosine similarity between two vectors.
   * Returns value between -1 and 1 (typically 0-1 for non-negative features).
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length || a.length === 0) return 0;

    let dotProduct = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }

    const magnitude = Math.sqrt(magA) * Math.sqrt(magB);
    return magnitude > 0 ? dotProduct / magnitude : 0;
  }
}
