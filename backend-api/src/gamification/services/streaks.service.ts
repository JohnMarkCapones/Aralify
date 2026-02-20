import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { XpSource } from '@prisma/client';
import { GamificationRepository } from '../gamification.repository';
import { XpService } from './xp.service';
import {
  getStreakMilestoneBonus,
  getNextMilestone,
  calculateDailyBonus,
  getMilestonesWithProgress,
  isToday,
  isYesterday,
  isTwoDaysAgo,
  STREAK_FREEZE,
} from '../constants';

export interface UpdateStreakResult {
  streakUpdated: boolean;
  newStreak: number;
  previousStreak: number;
  milestoneReached: { days: number; xpBonus: number; name: string } | null;
  xpAwarded: number;
  freezeConsumed: boolean;
  freezeEarned: boolean;
  freezesAvailable: number;
}

export interface ClaimDailyBonusResult {
  success: boolean;
  xpEarned: number;
  alreadyClaimed: boolean;
  currentStreak: number;
}

@Injectable()
export class StreaksService {
  private readonly logger = new Logger(StreaksService.name);

  constructor(
    private readonly repository: GamificationRepository,
    private readonly xpService: XpService,
  ) {}

  /**
   * Update user's streak on activity (e.g., lesson completion)
   * Called when user completes a lesson or other qualifying activity
   */
  async updateStreak(userId: string): Promise<UpdateStreakResult> {
    const user = await this.repository.getUserGamificationData(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    const lastStreakDay = await this.repository.getLastStreakDay(userId);
    const today = new Date();
    const previousStreak = user.streakCurrent;
    let newStreak = previousStreak;
    let xpAwarded = 0;
    let milestoneReached = null;
    let freezeConsumed = false;
    let freezeEarned = false;
    let freezesAvailable = user.streakFreezes;

    // Check if already recorded activity today
    if (lastStreakDay && isToday(lastStreakDay.date)) {
      return {
        streakUpdated: false,
        newStreak: previousStreak,
        previousStreak,
        milestoneReached: null,
        xpAwarded: 0,
        freezeConsumed: false,
        freezeEarned: false,
        freezesAvailable,
      };
    }

    // Check if last activity was yesterday (continuing streak)
    if (lastStreakDay && isYesterday(lastStreakDay.date)) {
      newStreak = previousStreak + 1;
    } else if (lastStreakDay && isTwoDaysAgo(lastStreakDay.date) && user.streakFreezes > 0) {
      // Missed exactly 1 day but has a freeze — consume it and continue streak
      freezeConsumed = true;
      freezesAvailable = user.streakFreezes - 1;
      newStreak = previousStreak + 1;
      this.logger.log(
        `User ${userId} streak freeze consumed (${freezesAvailable} remaining)`,
      );
    } else if (lastStreakDay) {
      // Streak broken (missed 2+ days or no freezes), reset to 1
      newStreak = 1;
    } else {
      // First activity ever
      newStreak = 1;
    }

    // Record today's activity
    await this.repository.recordStreakDay(userId, today);

    // Check for milestone
    const { milestone, isMilestone } = getStreakMilestoneBonus(newStreak);
    if (isMilestone && milestone) {
      milestoneReached = milestone;

      // Award milestone XP
      const result = await this.xpService.awardXp(
        userId,
        milestone.xpBonus,
        XpSource.STREAK_BONUS,
        undefined,
        `Streak milestone: ${milestone.name}`,
      );
      xpAwarded = result.xpAwarded;

      // Create streak milestone activity
      await this.repository.createActivity({
        userId,
        type: 'STREAK_MILESTONE',
        data: {
          streak: newStreak,
          milestoneName: milestone.name,
          xpBonus: milestone.xpBonus,
        },
      });

      this.logger.log(
        `User ${userId} reached streak milestone: ${milestone.name} (${newStreak} days)`,
      );

      // Earn a freeze at every 7-day milestone
      if (newStreak % 7 === 0 && freezesAvailable < STREAK_FREEZE.MAX_FREEZES) {
        freezeEarned = true;
        freezesAvailable += 1;
        this.logger.log(
          `User ${userId} earned a streak freeze (${freezesAvailable} total)`,
        );
      }
    }

    // Update user streak
    const newLongest = Math.max(user.streakLongest, newStreak);
    await this.repository.updateUserStreak(userId, {
      streakCurrent: newStreak,
      streakLongest: newLongest,
      streakFreezes: freezesAvailable,
      lastActiveAt: today,
    });

    return {
      streakUpdated: true,
      newStreak,
      previousStreak,
      milestoneReached,
      xpAwarded,
      freezeConsumed,
      freezeEarned,
      freezesAvailable,
    };
  }

  /**
   * Claim daily login bonus
   * User must explicitly call this endpoint to claim
   */
  async claimDailyBonus(userId: string): Promise<ClaimDailyBonusResult> {
    const user = await this.repository.getUserGamificationData(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    // Check if already claimed today
    if (user.lastDailyClaimAt && isToday(user.lastDailyClaimAt)) {
      return {
        success: false,
        xpEarned: 0,
        alreadyClaimed: true,
        currentStreak: user.streakCurrent,
      };
    }

    // Calculate bonus based on streak
    const bonusXp = calculateDailyBonus(user.streakCurrent);

    // Award XP
    await this.xpService.awardXp(
      userId,
      bonusXp,
      XpSource.DAILY_BONUS,
      undefined,
      `Daily login bonus (streak: ${user.streakCurrent})`,
    );

    // Update last claim timestamp
    await this.repository.updateLastDailyClaim(userId);

    this.logger.log(
      `User ${userId} claimed daily bonus: ${bonusXp} XP (streak: ${user.streakCurrent})`,
    );

    return {
      success: true,
      xpEarned: bonusXp,
      alreadyClaimed: false,
      currentStreak: user.streakCurrent,
    };
  }

  /**
   * Get detailed streak information for a user
   */
  async getStreakInfo(userId: string) {
    const user = await this.repository.getUserGamificationData(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    const lastStreakDay = await this.repository.getLastStreakDay(userId);
    const history = await this.repository.getStreakHistory(userId, 30);

    // Check if streak is active (activity today or yesterday)
    let isStreakActive = true;
    if (lastStreakDay) {
      const isActiveToday = isToday(lastStreakDay.date);
      const isActiveYesterday = isYesterday(lastStreakDay.date);
      isStreakActive = isActiveToday || isActiveYesterday;
    } else {
      isStreakActive = false;
    }

    // Determine if streak is at risk (no activity today, but yesterday)
    const streakAtRisk = lastStreakDay
      ? !isToday(lastStreakDay.date) && isYesterday(lastStreakDay.date)
      : false;

    const nextMilestone = getNextMilestone(user.streakCurrent);
    const milestonesProgress = getMilestonesWithProgress(user.streakCurrent);

    // Check if daily bonus can be claimed
    const canClaimDailyBonus = !user.lastDailyClaimAt || !isToday(user.lastDailyClaimAt);
    const dailyBonusAmount = calculateDailyBonus(user.streakCurrent);

    return {
      currentStreak: user.streakCurrent,
      longestStreak: user.streakLongest,
      freezesAvailable: user.streakFreezes,
      maxFreezes: STREAK_FREEZE.MAX_FREEZES,
      isStreakActive,
      streakAtRisk,
      lastActivityDate: lastStreakDay?.date || null,
      nextMilestone,
      milestones: milestonesProgress,
      dailyBonus: {
        canClaim: canClaimDailyBonus,
        amount: dailyBonusAmount,
        lastClaimAt: user.lastDailyClaimAt,
      },
      recentHistory: history.map((h) => ({
        date: h.date,
        completed: h.completed,
      })),
    };
  }
}
