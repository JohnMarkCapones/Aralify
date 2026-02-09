import { Injectable, Logger } from '@nestjs/common';
import { RecommendationRepository } from '../recommendation.repository';
import { ENGAGEMENT } from '../constants/scoring.constants';

/**
 * Engagement signal types detected by monitoring.
 */
export interface EngagementSignals {
  /** User hasn't been active for N+ days */
  isInactive: boolean;
  inactiveDays: number;

  /** User's streak is at risk or recently broken */
  streakAtRisk: boolean;
  currentStreak: number;

  /** User is failing quizzes/challenges repeatedly */
  isStruggling: boolean;
  recentFailureRate: number;

  /** User is completing content very fast (too easy) */
  isBreezing: boolean;
  avgCompletionRatio: number;

  /** User is skipping content */
  isSkipping: boolean;

  /** Engagement health score (0 = disengaged, 1 = highly engaged) */
  healthScore: number;
}

/**
 * Layer 6: Engagement Monitoring & Re-Ranking Service
 *
 * Monitors user behavior signals to detect disengagement, struggle,
 * or boredom. Outputs engagement signals that feed into recommendation
 * re-ranking and nudge message generation.
 *
 * Signals:
 * - Dropping streak → losing motivation
 * - Long session times → deep engagement (positive)
 * - Skipping lessons → content mismatch
 * - High quiz failures → struggling
 * - Fast completions → content too easy
 * - Inactivity (3+ days) → disengagement
 */
@Injectable()
export class EngagementService {
  private readonly logger = new Logger(EngagementService.name);

  constructor(private readonly repository: RecommendationRepository) {}

  /**
   * Analyze current engagement signals for a user.
   */
  async analyzeEngagement(userId: string): Promise<EngagementSignals> {
    const [userInfo, recentLessons, recentQuizzes, recentChallenges] =
      await Promise.all([
        this.repository.getUserLastActivity(userId),
        this.repository.getRecentLessonPerformance(userId, 10),
        this.repository.getRecentQuizPerformance(userId, 20),
        this.repository.getRecentChallengeSubmissions(userId, 10),
      ]);

    // 1. Inactivity detection
    const lastActive = userInfo?.lastActiveAt;
    const now = new Date();
    const inactiveDays = lastActive
      ? Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
      : 999;
    const isInactive = inactiveDays >= ENGAGEMENT.inactivityThresholdDays;

    // 2. Streak analysis
    const currentStreak = userInfo?.streakCurrent || 0;
    const streakAtRisk = currentStreak > 0 && inactiveDays >= 1;

    // 3. Struggle detection (quiz/challenge failure rate)
    const recentFailures = recentQuizzes.filter((q) => !q.isCorrect);
    const recentFailureRate =
      recentQuizzes.length > 0 ? recentFailures.length / recentQuizzes.length : 0;
    const challengeFailures = recentChallenges.filter((c) => c.status === 'FAILED');
    const challengeFailureRate =
      recentChallenges.length > 0 ? challengeFailures.length / recentChallenges.length : 0;
    const combinedFailureRate = (recentFailureRate + challengeFailureRate) / 2;
    const isStruggling = combinedFailureRate > 0.5 || recentFailures.length >= ENGAGEMENT.failureThreshold;

    // 4. Breezing detection (completing too fast)
    const lessonsWithTime = recentLessons.filter((l) => l.timeSpent && l.timeSpent > 0);
    let avgCompletionRatio = 1.0;
    let fastCount = 0;
    if (lessonsWithTime.length > 0) {
      const expectedTime = 900; // 15 min average
      avgCompletionRatio =
        lessonsWithTime.reduce((sum, l) => sum + (l.timeSpent! / expectedTime), 0) /
        lessonsWithTime.length;
      fastCount = lessonsWithTime.filter(
        (l) => l.timeSpent! / expectedTime < ENGAGEMENT.fastCompletionRatio,
      ).length;
    }
    const isBreezing = fastCount >= ENGAGEMENT.fastCompletionThreshold;

    // 5. Skipping detection (sparse completion pattern)
    // If user has many in-progress but few completed recently, they may be skipping
    const isSkipping = false; // TODO: implement with more granular tracking

    // 6. Overall health score
    const healthScore = this.calculateHealthScore({
      inactiveDays,
      currentStreak,
      combinedFailureRate,
      avgCompletionRatio,
      lessonsCompleted: recentLessons.length,
    });

    const signals: EngagementSignals = {
      isInactive,
      inactiveDays,
      streakAtRisk,
      currentStreak,
      isStruggling,
      recentFailureRate: combinedFailureRate,
      isBreezing,
      avgCompletionRatio,
      isSkipping,
      healthScore,
    };

    this.logger.debug(
      `Engagement for user ${userId}: health=${healthScore.toFixed(2)}, ` +
      `inactive=${isInactive}, struggling=${isStruggling}, breezing=${isBreezing}`,
    );

    return signals;
  }

  /**
   * Generate a context-aware nudge message based on engagement signals.
   */
  generateNudgeMessage(signals: EngagementSignals): string | undefined {
    if (signals.isInactive && signals.inactiveDays >= 7) {
      return 'We miss you! Start with a quick 5-minute lesson to get back on track.';
    }

    if (signals.isInactive) {
      return `It's been ${signals.inactiveDays} days. A quick lesson can reignite your momentum!`;
    }

    if (signals.streakAtRisk && signals.currentStreak >= 7) {
      return `Don't lose your ${signals.currentStreak}-day streak! Complete just one lesson today.`;
    }

    if (signals.isStruggling) {
      return 'Feeling challenged? Try an easier difficulty — building confidence helps you learn faster.';
    }

    if (signals.isBreezing) {
      return 'You\'re crushing it! Ready to level up? Try a harder difficulty for bonus XP.';
    }

    if (signals.currentStreak >= 30) {
      return `Incredible ${signals.currentStreak}-day streak! You're in the top tier of learners.`;
    }

    if (signals.currentStreak >= 7) {
      return `${signals.currentStreak}-day streak! Keep the momentum going.`;
    }

    return undefined;
  }

  /**
   * Compute an engagement re-ranking multiplier (0.5 - 1.5).
   * Used to adjust recommendation scores based on engagement state.
   *
   * - Struggling users get easier content boosted
   * - Breezing users get harder content boosted
   * - Inactive users get shorter/easier content boosted
   */
  getReRankingMultiplier(
    signals: EngagementSignals,
    contentDifficulty: 'EASY' | 'MEDIUM' | 'HARD',
  ): number {
    let multiplier = 1.0;

    if (signals.isStruggling) {
      if (contentDifficulty === 'EASY') multiplier *= 1.4;
      if (contentDifficulty === 'MEDIUM') multiplier *= 0.9;
      if (contentDifficulty === 'HARD') multiplier *= 0.6;
    }

    if (signals.isBreezing) {
      if (contentDifficulty === 'EASY') multiplier *= 0.6;
      if (contentDifficulty === 'MEDIUM') multiplier *= 0.9;
      if (contentDifficulty === 'HARD') multiplier *= 1.4;
    }

    if (signals.isInactive) {
      // Boost easier, shorter content for returning users
      if (contentDifficulty === 'EASY') multiplier *= 1.3;
      if (contentDifficulty === 'HARD') multiplier *= 0.7;
    }

    return Math.min(1.5, Math.max(0.5, multiplier));
  }

  // ========================================================================
  // Private helpers
  // ========================================================================

  private calculateHealthScore(data: {
    inactiveDays: number;
    currentStreak: number;
    combinedFailureRate: number;
    avgCompletionRatio: number;
    lessonsCompleted: number;
  }): number {
    let score = 0.5; // baseline

    // Activity recency bonus/penalty
    if (data.inactiveDays === 0) score += 0.2;
    else if (data.inactiveDays === 1) score += 0.1;
    else if (data.inactiveDays >= 3) score -= 0.15;
    else if (data.inactiveDays >= 7) score -= 0.3;

    // Streak bonus
    if (data.currentStreak >= 30) score += 0.15;
    else if (data.currentStreak >= 7) score += 0.1;
    else if (data.currentStreak >= 3) score += 0.05;

    // Failure rate penalty
    if (data.combinedFailureRate > 0.6) score -= 0.15;
    else if (data.combinedFailureRate > 0.4) score -= 0.05;
    else if (data.combinedFailureRate < 0.2) score += 0.05;

    // Lesson completion volume bonus
    if (data.lessonsCompleted >= 5) score += 0.1;
    else if (data.lessonsCompleted >= 2) score += 0.05;

    return Math.min(1, Math.max(0, score));
  }
}
