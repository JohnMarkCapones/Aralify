import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { XpSource } from '@prisma/client';
import { GamificationRepository } from '../gamification.repository';
import {
  calculateLevelFromXp,
  calculateXpForLevel,
  calculateLevelProgress,
  getRankTitle,
  LEVEL_XP_THRESHOLDS,
  RANK_TITLES,
} from '../constants';

export interface AwardXpResult {
  xpAwarded: number;
  newTotal: number;
  levelUp: boolean;
  previousLevel: number;
  newLevel: number;
  rankTitle: string;
}

export interface XpHistoryOptions {
  limit?: number;
  offset?: number;
  source?: XpSource;
  startDate?: Date;
  endDate?: Date;
}

@Injectable()
export class XpService {
  private readonly logger = new Logger(XpService.name);

  constructor(
    private readonly repository: GamificationRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Award XP to a user with automatic level calculation
   */
  async awardXp(
    userId: string,
    amount: number,
    source: XpSource,
    sourceId?: string,
    description?: string,
  ): Promise<AwardXpResult> {
    // Get current user data
    const user = await this.repository.getUserGamificationData(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    const previousLevel = user.level;
    const newTotal = user.xpTotal + amount;
    const newLevel = calculateLevelFromXp(newTotal);
    const levelUp = newLevel > previousLevel;

    // Atomically create XP transaction and increment user total
    const updatedUser = await this.repository.awardXpAtomic(
      userId,
      amount,
      newLevel,
      source,
      sourceId,
      description,
    );

    // Log level up
    if (levelUp) {
      this.logger.log(
        `User ${userId} leveled up from ${previousLevel} to ${newLevel}`,
      );

      await this.repository.createActivity({
        userId,
        type: 'LEVEL_UP',
        data: {
          previousLevel,
          newLevel,
          xpTotal: updatedUser.xpTotal,
        },
      });
    }

    // Emit event for league weekly XP tracking
    this.eventEmitter.emit('xp.awarded', {
      userId,
      amount,
      source,
      newTotal: updatedUser.xpTotal,
    });

    return {
      xpAwarded: amount,
      newTotal: updatedUser.xpTotal,
      levelUp,
      previousLevel,
      newLevel,
      rankTitle: getRankTitle(newLevel),
    };
  }

  /**
   * Get XP transaction history for a user
   */
  async getXpHistory(userId: string, options?: XpHistoryOptions) {
    const { transactions, total } = await this.repository.getXpTransactions(
      userId,
      options,
    );

    return {
      transactions: transactions.map((t) => ({
        id: t.id,
        amount: t.amount,
        source: t.source,
        sourceId: t.sourceId,
        description: t.description,
        createdAt: t.createdAt,
      })),
      total,
      limit: options?.limit || 50,
      offset: options?.offset || 0,
    };
  }

  /**
   * Get XP summary by source
   */
  async getXpSummary(userId: string, days: number = 30) {
    return this.repository.getXpTransactionsSummary(userId, days);
  }

  /**
   * Calculate level from XP
   */
  calculateLevelFromXp(totalXp: number): number {
    return calculateLevelFromXp(totalXp);
  }

  /**
   * Calculate XP required for a level
   */
  calculateXpForLevel(level: number): number {
    return calculateXpForLevel(level);
  }

  /**
   * Get rank title for a level
   */
  getRankTitle(level: number): string {
    return getRankTitle(level);
  }

  /**
   * Get level progress details
   */
  getLevelProgress(totalXp: number) {
    return calculateLevelProgress(totalXp);
  }

  /**
   * Get level system info (for public /levels endpoint)
   */
  getLevelSystemInfo() {
    return {
      formula: {
        description: 'XP required for level N = floor(100 * N^1.5)',
        baseMultiplier: 100,
        exponent: 1.5,
      },
      levels: LEVEL_XP_THRESHOLDS,
      ranks: RANK_TITLES.map((r) => ({
        minLevel: r.minLevel,
        title: r.title,
        xpRequired: calculateXpForLevel(r.minLevel),
      })),
      xpSources: [
        { source: 'LESSON_COMPLETE', description: 'Complete a lesson', baseXp: 100 },
        { source: 'QUIZ_COMPLETE', description: 'Complete a quiz', baseXp: 25 },
        { source: 'CHALLENGE_COMPLETE', description: 'Complete a code challenge', baseXp: 50 },
        { source: 'DAILY_BONUS', description: 'Daily login bonus', baseXp: 10 },
        { source: 'STREAK_BONUS', description: 'Streak milestone bonus', baseXp: 'varies' },
        { source: 'ACHIEVEMENT', description: 'Unlock an achievement', baseXp: 'varies' },
      ],
      difficultyMultipliers: {
        EASY: 1,
        MEDIUM: 2,
        HARD: 3,
      },
    };
  }
}
