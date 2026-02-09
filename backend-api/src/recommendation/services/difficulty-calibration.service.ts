import { Injectable, Logger } from '@nestjs/common';
import { RecommendationRepository } from '../recommendation.repository';
import { ADC } from '../constants/scoring.constants';

/**
 * Layer 4: Adaptive Difficulty Calibration (ADC)
 *
 * Continuously adjusts the recommended difficulty for a user based on
 * real performance data. Replaces the static difficultyPref setting
 * with a dynamic, evidence-based recommendation.
 *
 * DifficultyScore(user) =
 *   α * RecentPerformance    — lesson completion rate & XP earned
 *   β * QuizAccuracy         — recent quiz correctness ratio
 *   γ * TimeEfficiency       — actual vs expected completion time
 *   δ * HintDependency       — hints used / hints available ratio (inverted)
 *   ε * RetryRate            — failed attempts / total attempts (inverted)
 *
 * Output: 0.0 (very easy) to 1.0 (very hard)
 */
@Injectable()
export class DifficultyCalibrationService {
  private readonly logger = new Logger(DifficultyCalibrationService.name);

  constructor(private readonly repository: RecommendationRepository) {}

  /**
   * Recalibrate difficulty score for a user based on recent performance.
   * Returns the new score and recommended difficulty tier.
   */
  async calibrate(userId: string): Promise<{
    previousScore: number;
    newScore: number;
    previousDifficulty: string;
    newDifficulty: string;
    explanation: string;
    signals: {
      recentPerformance: number;
      quizAccuracy: number;
      timeEfficiency: number;
      hintDependency: number;
      retryRate: number;
    };
  }> {
    const profile = await this.repository.getLearningProfile(userId);
    const previousScore = profile?.difficultyScore ?? 0.5;

    // Gather performance signals
    const [recentPerformance, quizAccuracy, timeEfficiency, hintDependency, retryRate] =
      await Promise.all([
        this.calcRecentPerformance(userId),
        this.calcQuizAccuracy(userId),
        this.calcTimeEfficiency(userId),
        this.calcHintDependency(userId),
        this.calcRetryRate(userId),
      ]);

    const signals = { recentPerformance, quizAccuracy, timeEfficiency, hintDependency, retryRate };

    // Weighted combination
    const rawScore =
      ADC.weights.recentPerformance * recentPerformance +
      ADC.weights.quizAccuracy * quizAccuracy +
      ADC.weights.timeEfficiency * timeEfficiency +
      ADC.weights.hintDependency * hintDependency +
      ADC.weights.retryRate * retryRate;

    // Smooth transition: blend 70% new data with 30% previous score
    // This prevents wild swings from a single bad session
    const smoothedScore = 0.7 * rawScore + 0.3 * previousScore;
    const newScore = Math.min(1, Math.max(0, smoothedScore));

    // Persist
    if (profile) {
      await this.repository.updateDifficultyScore(userId, newScore);
    }

    const previousDifficulty = this.scoreToDifficulty(previousScore);
    const newDifficulty = this.scoreToDifficulty(newScore);

    const explanation = this.generateExplanation(signals, newScore, previousScore);

    this.logger.log(
      `Calibrated user ${userId}: ${previousScore.toFixed(2)} → ${newScore.toFixed(2)} (${previousDifficulty} → ${newDifficulty})`,
    );

    return {
      previousScore,
      newScore,
      previousDifficulty,
      newDifficulty,
      explanation,
      signals,
    };
  }

  /**
   * Get current difficulty recommendation without recalibrating.
   */
  getDifficultyTier(score: number): string {
    return this.scoreToDifficulty(score);
  }

  // ========================================================================
  // Signal calculations
  // ========================================================================

  /**
   * Recent Performance (0-1): Measures lesson completion quality.
   * Higher score = user is excelling at current difficulty.
   *
   * Considers: XP earned relative to max possible, difficulty of completed lessons.
   */
  private async calcRecentPerformance(userId: string): Promise<number> {
    const lessons = await this.repository.getRecentLessonPerformance(
      userId,
      ADC.recentLessonWindow,
    );

    if (lessons.length < ADC.minimumDataPoints) return 0.5; // insufficient data

    let performanceSum = 0;
    for (const lp of lessons) {
      const maxXp = lp.lesson.xpReward;
      const earned = lp.xpEarned;
      const ratio = maxXp > 0 ? earned / maxXp : 0;

      // Bonus for completing harder difficulties
      const difficultyBonus =
        lp.lesson.difficulty === 'HARD' ? 0.15 :
        lp.lesson.difficulty === 'MEDIUM' ? 0.05 : 0;

      performanceSum += Math.min(1, ratio + difficultyBonus);
    }

    return performanceSum / lessons.length;
  }

  /**
   * Quiz Accuracy (0-1): Ratio of correct answers in recent quizzes.
   * First-attempt correct answers weighted higher.
   */
  private async calcQuizAccuracy(userId: string): Promise<number> {
    const quizzes = await this.repository.getRecentQuizPerformance(
      userId,
      ADC.recentQuizWindow,
    );

    if (quizzes.length < ADC.minimumDataPoints) return 0.5;

    let score = 0;
    for (const quiz of quizzes) {
      if (quiz.isCorrect) {
        // First attempt correct = full credit; later attempts = diminishing
        score += quiz.attemptNumber === 1 ? 1.0 : 0.7;
      }
    }

    return score / quizzes.length;
  }

  /**
   * Time Efficiency (0-1): How fast does the user complete lessons?
   * Faster than expected → higher score (content is easy for them).
   * Much slower → lower score (struggling).
   */
  private async calcTimeEfficiency(userId: string): Promise<number> {
    const lessons = await this.repository.getRecentLessonPerformance(
      userId,
      ADC.recentLessonWindow,
    );

    const withTime = lessons.filter((l) => l.timeSpent && l.timeSpent > 0);
    if (withTime.length < ADC.minimumDataPoints) return 0.5;

    let efficiencySum = 0;
    for (const lp of withTime) {
      const ratio = lp.timeSpent! / ADC.expectedCompletionTime;
      // Transform: fast completion → high score, slow → low score
      // Using sigmoid: 1 / (1 + exp(2 * (ratio - 1)))
      efficiencySum += 1 / (1 + Math.exp(2 * (ratio - 1)));
    }

    return efficiencySum / withTime.length;
  }

  /**
   * Hint Dependency (0-1): Inverse of hint usage rate.
   * More hints used → lower score (user needs more help → easier content).
   */
  private async calcHintDependency(userId: string): Promise<number> {
    const hints = await this.repository.getRecentHintUsage(userId, 30);

    // If no hints used, assume self-sufficient → high score
    if (hints.length === 0) return 0.8;

    // Recent lesson count for normalization
    const lessons = await this.repository.getRecentLessonPerformance(
      userId,
      ADC.recentLessonWindow,
    );

    if (lessons.length === 0) return 0.5;

    // Hints per lesson ratio (inverted)
    const hintsPerLesson = hints.length / lessons.length;
    // 0 hints/lesson → 1.0, 3+ hints/lesson → ~0
    return Math.max(0, 1 - hintsPerLesson / 3);
  }

  /**
   * Retry Rate (0-1): Inverse of failure/retry ratio in challenges.
   * More retries → lower score (user is struggling).
   */
  private async calcRetryRate(userId: string): Promise<number> {
    const submissions = await this.repository.getRecentChallengeSubmissions(
      userId,
      20,
    );

    if (submissions.length < ADC.minimumDataPoints) return 0.5;

    const passed = submissions.filter((s) => s.status === 'PASSED').length;
    const passRate = passed / submissions.length;

    // Also factor in attempt numbers (more attempts = more struggle)
    const avgAttempts =
      submissions.reduce((sum, s) => sum + s.attemptNumber, 0) / submissions.length;

    // Combine pass rate (70%) and inverse attempt rate (30%)
    const attemptScore = Math.max(0, 1 - (avgAttempts - 1) / 4); // 1 attempt → 1.0, 5+ → 0
    return 0.7 * passRate + 0.3 * attemptScore;
  }

  // ========================================================================
  // Helpers
  // ========================================================================

  private scoreToDifficulty(score: number): string {
    if (score < ADC.thresholds.easy.max) return 'EASY';
    if (score < ADC.thresholds.medium.max) return 'MEDIUM';
    if (score < ADC.thresholds.hard.max) return 'HARD';
    return 'HARD'; // hardPlus still maps to HARD difficulty, but with challenge recommendations
  }

  private generateExplanation(
    signals: Record<string, number>,
    newScore: number,
    previousScore: number,
  ): string {
    const parts: string[] = [];
    const diff = newScore - previousScore;

    if (signals.quizAccuracy > 0.85) {
      parts.push(`Your quiz accuracy of ${Math.round(signals.quizAccuracy * 100)}% is excellent`);
    } else if (signals.quizAccuracy < 0.4) {
      parts.push(`Your recent quiz accuracy of ${Math.round(signals.quizAccuracy * 100)}% suggests the current difficulty may be too high`);
    }

    if (signals.timeEfficiency > 0.75) {
      parts.push('you\'re completing lessons faster than expected');
    } else if (signals.timeEfficiency < 0.3) {
      parts.push('lessons are taking longer than expected');
    }

    if (signals.hintDependency < 0.4) {
      parts.push('you\'re relying on hints frequently');
    }

    if (diff > 0.1) {
      parts.push('We recommend stepping up the difficulty');
    } else if (diff < -0.1) {
      parts.push('We suggest easier content to build confidence');
    }

    if (parts.length === 0) {
      return 'Your current difficulty level seems well-matched to your skills. Keep going!';
    }

    return parts.join('. ') + '.';
  }
}
