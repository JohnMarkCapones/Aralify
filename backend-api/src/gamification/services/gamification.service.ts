import { Injectable } from '@nestjs/common';
import { GamificationRepository } from '../gamification.repository';
import { XpService } from './xp.service';
import { StreaksService } from './streaks.service';
import { AchievementsService } from './achievements.service';
import { BadgesService } from './badges.service';
import { getRankTitle, calculateLevelProgress, getNextMilestone } from '../constants';

@Injectable()
export class GamificationService {
  constructor(
    private readonly repository: GamificationRepository,
    private readonly xpService: XpService,
    private readonly streaksService: StreaksService,
    private readonly achievementsService: AchievementsService,
    private readonly badgesService: BadgesService,
  ) {}

  /**
   * Get the full gamification profile for a user
   */
  async getProfile(userId: string) {
    const [user, streakInfo, achievements, badges] = await Promise.all([
      this.repository.getUserGamificationData(userId),
      this.streaksService.getStreakInfo(userId),
      this.achievementsService.getAchievements(userId),
      this.badgesService.getBadges(userId),
    ]);

    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    const levelProgress = calculateLevelProgress(user.xpTotal);
    const displayedBadges = await this.badgesService.getDisplayedBadges(userId);

    return {
      user: {
        id: user.id,
        createdAt: user.createdAt,
      },
      xp: {
        total: user.xpTotal,
        level: user.level,
        rankTitle: getRankTitle(user.level),
        progress: {
          currentLevelXp: levelProgress.currentLevelXp,
          nextLevelXp: levelProgress.nextLevelXp,
          progressXp: levelProgress.progressXp,
          progressPercentage: Math.round(levelProgress.progressPercentage * 10) / 10,
        },
      },
      streak: {
        current: streakInfo.currentStreak,
        longest: streakInfo.longestStreak,
        isActive: streakInfo.isStreakActive,
        atRisk: streakInfo.streakAtRisk,
        lastActivityDate: streakInfo.lastActivityDate,
        nextMilestone: streakInfo.nextMilestone,
        dailyBonus: streakInfo.dailyBonus,
      },
      achievements: {
        unlocked: achievements.summary.unlocked,
        total: achievements.summary.total,
        progress: Math.round(achievements.summary.progress * 10) / 10,
        totalXpEarned: achievements.summary.totalXpEarned,
        recent: achievements.achievements
          .filter((a) => a.isUnlocked)
          .slice(0, 5),
      },
      badges: {
        total: badges.total,
        displayed: displayedBadges.badges,
        maxDisplay: badges.maxDisplay,
      },
    };
  }

  /**
   * Get upcoming milestones for a user
   */
  async getMilestones(userId: string) {
    const [user, streakInfo, achievements] = await Promise.all([
      this.repository.getUserGamificationData(userId),
      this.streaksService.getStreakInfo(userId),
      this.achievementsService.getAchievements(userId),
    ]);

    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    const levelProgress = calculateLevelProgress(user.xpTotal);
    const xpToNextLevel = levelProgress.nextLevelXp - user.xpTotal;

    // Get achievements close to completion (50-99%)
    const nearAchievements = achievements.achievements
      .filter((a) => !a.isUnlocked && a.progress >= 50)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5);

    // Streak milestone
    const streakMilestone = getNextMilestone(user.streakCurrent);

    return {
      level: {
        current: user.level,
        next: user.level + 1,
        xpToNextLevel,
        xpProgress: levelProgress.progressXp,
        progressPercentage: Math.round(levelProgress.progressPercentage * 10) / 10,
        nextRankTitle: getRankTitle(user.level + 1),
      },
      streak: streakMilestone
        ? {
            current: user.streakCurrent,
            nextMilestoneDays: streakMilestone.days,
            milestoneName: streakMilestone.name,
            daysRemaining: streakMilestone.daysRemaining,
            xpReward: streakMilestone.xpBonus,
          }
        : null,
      achievements: {
        nearCompletion: nearAchievements.map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          description: a.description,
          progress: Math.round(a.progress * 10) / 10,
          currentValue: a.currentValue,
          targetValue: a.targetValue,
          xpReward: a.xpReward,
        })),
        totalRemaining: achievements.summary.total - achievements.summary.unlocked,
      },
    };
  }

  /**
   * Called after lesson completion to update all gamification systems
   */
  async onLessonComplete(
    userId: string,
    lessonId: string,
    xpEarned: number,
    difficulty: string,
    lessonTitle: string,
  ) {
    // Award XP
    const xpResult = await this.xpService.awardXp(
      userId,
      xpEarned,
      'LESSON_COMPLETE',
      lessonId,
      `Completed: ${lessonTitle} (${difficulty.toLowerCase()})`,
    );

    // Update streak
    const streakResult = await this.streaksService.updateStreak(userId);

    // Evaluate achievements
    const achievements = await this.achievementsService.evaluateForUser(userId);
    const newAchievements = achievements.filter(
      (a) => a.isUnlocked && a.unlockedAt !== null,
    );

    return {
      xp: xpResult,
      streak: streakResult,
      newAchievements,
    };
  }
}
