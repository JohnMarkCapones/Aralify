import { Injectable, Logger } from '@nestjs/common';
import { XpSource } from '@prisma/client';
import { GamificationRepository } from '../gamification.repository';
import { XpService } from './xp.service';

// Achievement criteria types
interface LessonCountCriteria {
  type: 'lesson_count';
  count: number;
}

interface LessonDifficultyCriteria {
  type: 'lesson_difficulty';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  count: number;
}

interface StreakCriteria {
  type: 'streak';
  days: number;
}

interface CourseCriteria {
  type: 'course_complete';
  count: number;
}

interface SocialCriteria {
  type: 'social';
  action: 'comment' | 'follower' | 'following';
  count: number;
}

interface LevelCriteria {
  type: 'level';
  level: number;
}

interface XpCriteria {
  type: 'xp_total';
  amount: number;
}

type AchievementCriteria =
  | LessonCountCriteria
  | LessonDifficultyCriteria
  | StreakCriteria
  | CourseCriteria
  | SocialCriteria
  | LevelCriteria
  | XpCriteria;

export interface AchievementEvaluation {
  achievementId: string;
  slug: string;
  title: string;
  description: string;
  iconUrl: string | null;
  xpReward: number;
  category: string;
  isSecret: boolean;
  isUnlocked: boolean;
  unlockedAt: Date | null;
  progress: number; // 0-100
  currentValue: number;
  targetValue: number;
}

@Injectable()
export class AchievementsService {
  private readonly logger = new Logger(AchievementsService.name);

  constructor(
    private readonly repository: GamificationRepository,
    private readonly xpService: XpService,
  ) {}

  /**
   * Evaluate all achievements for a user and award any newly unlocked ones
   * Called after lesson completion, streak updates, etc.
   */
  async evaluateForUser(userId: string): Promise<AchievementEvaluation[]> {
    // Get all achievements and user's current unlocked achievements
    const [allAchievements, userAchievementIds, userStats] = await Promise.all([
      this.repository.getAllAchievements(),
      this.repository.getUserAchievementIds(userId),
      this.getUserStats(userId),
    ]);

    const newlyUnlocked: AchievementEvaluation[] = [];
    const evaluations: AchievementEvaluation[] = [];

    for (const achievement of allAchievements) {
      const isAlreadyUnlocked = userAchievementIds.includes(achievement.id);
      const criteria = achievement.criteria as unknown as AchievementCriteria;
      const { progress, currentValue, targetValue, isMet } = this.evaluateCriteria(
        criteria,
        userStats,
      );

      const evaluation: AchievementEvaluation = {
        achievementId: achievement.id,
        slug: achievement.slug,
        title: achievement.title,
        description: achievement.description,
        iconUrl: achievement.iconUrl,
        xpReward: achievement.xpReward,
        category: achievement.category,
        isSecret: achievement.isSecret,
        isUnlocked: isAlreadyUnlocked || isMet,
        unlockedAt: null,
        progress,
        currentValue,
        targetValue,
      };

      // Award newly unlocked achievement
      if (!isAlreadyUnlocked && isMet) {
        const userAchievement = await this.repository.awardAchievement(
          userId,
          achievement.id,
        );
        evaluation.unlockedAt = userAchievement.unlockedAt;

        // Award XP for achievement
        if (achievement.xpReward > 0) {
          await this.xpService.awardXp(
            userId,
            achievement.xpReward,
            XpSource.ACHIEVEMENT,
            achievement.id,
            `Achievement unlocked: ${achievement.title}`,
          );
        }

        // Create activity
        await this.repository.createActivity({
          userId,
          type: 'ACHIEVEMENT_EARNED',
          data: {
            achievementId: achievement.id,
            title: achievement.title,
            xpReward: achievement.xpReward,
          },
        });

        newlyUnlocked.push(evaluation);
        this.logger.log(`User ${userId} unlocked achievement: ${achievement.title}`);
      }

      evaluations.push(evaluation);
    }

    return evaluations;
  }

  /**
   * Get all achievements with progress for a user
   */
  async getAchievements(
    userId: string,
    options?: { category?: string; includeSecret?: boolean },
  ) {
    const [allAchievements, userAchievements, userStats] = await Promise.all([
      this.repository.getAllAchievements(),
      this.repository.getUserAchievements(userId),
      this.getUserStats(userId),
    ]);

    const userAchievementMap = new Map(
      userAchievements.map((ua) => [ua.achievementId, ua]),
    );

    let achievements = allAchievements.map((achievement) => {
      const userAchievement = userAchievementMap.get(achievement.id);
      const isUnlocked = !!userAchievement;
      const criteria = achievement.criteria as unknown as AchievementCriteria;
      const { progress, currentValue, targetValue } = this.evaluateCriteria(
        criteria,
        userStats,
      );

      return {
        id: achievement.id,
        slug: achievement.slug,
        title: achievement.title,
        description: achievement.description,
        iconUrl: achievement.iconUrl,
        xpReward: achievement.xpReward,
        category: achievement.category,
        isSecret: achievement.isSecret,
        isUnlocked,
        unlockedAt: userAchievement?.unlockedAt || null,
        progress: isUnlocked ? 100 : progress,
        currentValue,
        targetValue,
      };
    });

    // Filter by category
    if (options?.category) {
      achievements = achievements.filter((a) => a.category === options.category);
    }

    // Filter secret achievements
    if (!options?.includeSecret) {
      achievements = achievements.filter((a) => !a.isSecret || a.isUnlocked);
    }

    // Group by category
    const byCategory = achievements.reduce(
      (acc, achievement) => {
        if (!acc[achievement.category]) {
          acc[achievement.category] = [];
        }
        acc[achievement.category].push(achievement);
        return acc;
      },
      {} as Record<string, typeof achievements>,
    );

    // Calculate summary stats
    const totalAchievements = allAchievements.filter(
      (a) => !a.isSecret || userAchievementMap.has(a.id),
    ).length;
    const unlockedCount = userAchievements.length;
    const totalXpEarned = userAchievements.reduce(
      (sum, ua) => sum + ua.achievement.xpReward,
      0,
    );

    return {
      achievements,
      byCategory,
      summary: {
        total: totalAchievements,
        unlocked: unlockedCount,
        progress: totalAchievements > 0 ? (unlockedCount / totalAchievements) * 100 : 0,
        totalXpEarned,
      },
    };
  }

  /**
   * Get user statistics needed for achievement evaluation
   */
  private async getUserStats(userId: string) {
    const [user, lessonStats, difficultyStats, courseStats, socialStats] =
      await Promise.all([
        this.repository.getUserGamificationData(userId),
        this.repository.getUserLessonStats(userId),
        this.repository.getUserLessonStatsByDifficulty(userId),
        this.repository.getUserCourseStats(userId),
        this.repository.getUserSocialStats(userId),
      ]);

    return {
      xpTotal: user?.xpTotal || 0,
      level: user?.level || 1,
      streakCurrent: user?.streakCurrent || 0,
      streakLongest: user?.streakLongest || 0,
      lessonsCompleted: lessonStats.completedCount,
      easyLessonsCompleted: difficultyStats.EASY,
      mediumLessonsCompleted: difficultyStats.MEDIUM,
      hardLessonsCompleted: difficultyStats.HARD,
      coursesCompleted: courseStats.completedCount,
      coursesStarted: courseStats.startedCount,
      commentsCount: socialStats.commentCount,
      followersCount: socialStats.followerCount,
      followingCount: socialStats.followingCount,
    };
  }

  /**
   * Evaluate a single achievement criteria against user stats
   */
  private evaluateCriteria(
    criteria: AchievementCriteria,
    stats: Awaited<ReturnType<typeof this.getUserStats>>,
  ): { progress: number; currentValue: number; targetValue: number; isMet: boolean } {
    let currentValue = 0;
    let targetValue = 0;

    switch (criteria.type) {
      case 'lesson_count':
        currentValue = stats.lessonsCompleted;
        targetValue = criteria.count;
        break;

      case 'lesson_difficulty':
        switch (criteria.difficulty) {
          case 'EASY':
            currentValue = stats.easyLessonsCompleted;
            break;
          case 'MEDIUM':
            currentValue = stats.mediumLessonsCompleted;
            break;
          case 'HARD':
            currentValue = stats.hardLessonsCompleted;
            break;
        }
        targetValue = criteria.count;
        break;

      case 'streak':
        currentValue = stats.streakLongest;
        targetValue = criteria.days;
        break;

      case 'course_complete':
        currentValue = stats.coursesCompleted;
        targetValue = criteria.count;
        break;

      case 'social':
        switch (criteria.action) {
          case 'comment':
            currentValue = stats.commentsCount;
            break;
          case 'follower':
            currentValue = stats.followersCount;
            break;
          case 'following':
            currentValue = stats.followingCount;
            break;
        }
        targetValue = criteria.count;
        break;

      case 'level':
        currentValue = stats.level;
        targetValue = criteria.level;
        break;

      case 'xp_total':
        currentValue = stats.xpTotal;
        targetValue = criteria.amount;
        break;

      default:
        return { progress: 0, currentValue: 0, targetValue: 1, isMet: false };
    }

    const progress = targetValue > 0 ? Math.min(100, (currentValue / targetValue) * 100) : 0;
    const isMet = currentValue >= targetValue;

    return { progress, currentValue, targetValue, isMet };
  }
}
