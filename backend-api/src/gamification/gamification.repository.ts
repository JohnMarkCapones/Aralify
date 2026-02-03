import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { XpSource, Prisma, ActivityType } from '@prisma/client';

export interface UserGamificationData {
  id: string;
  xpTotal: number;
  level: number;
  streakCurrent: number;
  streakLongest: number;
  lastDailyClaimAt: Date | null;
  lastActiveAt: Date | null;
  createdAt: Date;
}

@Injectable()
export class GamificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================
  // USER GAMIFICATION DATA
  // ============================================

  async getUserGamificationData(userId: string): Promise<UserGamificationData | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return null;

    return {
      id: user.id,
      xpTotal: user.xpTotal,
      level: user.level,
      streakCurrent: user.streakCurrent,
      streakLongest: user.streakLongest,
      lastDailyClaimAt: (user as any).lastDailyClaimAt ?? null,
      lastActiveAt: user.lastActiveAt,
      createdAt: user.createdAt,
    };
  }

  async updateUserXpAndLevel(
    userId: string,
    data: { xpTotal: number; level: number },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        xpTotal: data.xpTotal,
        level: data.level,
      },
    });
  }

  async updateUserStreak(
    userId: string,
    data: { streakCurrent: number; streakLongest?: number; lastActiveAt?: Date },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        streakCurrent: data.streakCurrent,
        ...(data.streakLongest !== undefined && { streakLongest: data.streakLongest }),
        ...(data.lastActiveAt && { lastActiveAt: data.lastActiveAt }),
      },
    });
  }

  async updateLastDailyClaim(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { lastDailyClaimAt: new Date() } as any,
    });
  }

  // ============================================
  // XP TRANSACTIONS
  // ============================================

  async createXpTransaction(data: {
    userId: string;
    amount: number;
    source: XpSource;
    sourceId?: string;
    description?: string;
  }) {
    return this.prisma.xpTransaction.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        source: data.source,
        sourceId: data.sourceId,
        description: data.description,
      },
    });
  }

  async getXpTransactions(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      source?: XpSource;
      startDate?: Date;
      endDate?: Date;
    },
  ) {
    const where: Prisma.XpTransactionWhereInput = {
      userId,
      ...(options?.source && { source: options.source }),
      ...(options?.startDate || options?.endDate
        ? {
            createdAt: {
              ...(options?.startDate && { gte: options.startDate }),
              ...(options?.endDate && { lte: options.endDate }),
            },
          }
        : {}),
    };

    const [transactions, total] = await Promise.all([
      this.prisma.xpTransaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: options?.limit || 50,
        skip: options?.offset || 0,
      }),
      this.prisma.xpTransaction.count({ where }),
    ]);

    return { transactions, total };
  }

  async getXpTransactionsSummary(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const transactions = await this.prisma.xpTransaction.groupBy({
      by: ['source'],
      where: {
        userId,
        createdAt: { gte: startDate },
      },
      _sum: { amount: true },
      _count: true,
    });

    return transactions.map((t) => ({
      source: t.source,
      totalXp: t._sum.amount || 0,
      count: t._count,
    }));
  }

  // ============================================
  // ACHIEVEMENTS
  // ============================================

  async getAllAchievements() {
    return this.prisma.achievement.findMany({
      orderBy: [{ category: 'asc' }, { xpReward: 'asc' }],
    });
  }

  async getUserAchievements(userId: string) {
    return this.prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' },
    });
  }

  async getUserAchievementIds(userId: string): Promise<string[]> {
    const achievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });
    return achievements.map((a) => a.achievementId);
  }

  async awardAchievement(userId: string, achievementId: string) {
    return this.prisma.userAchievement.upsert({
      where: {
        userId_achievementId: { userId, achievementId },
      },
      update: {},
      create: {
        userId,
        achievementId,
      },
      include: { achievement: true },
    });
  }

  async getAchievementBySlug(slug: string) {
    return this.prisma.achievement.findUnique({
      where: { slug },
    });
  }

  // ============================================
  // BADGES
  // ============================================

  async getUserBadges(userId: string, options?: { displayedOnly?: boolean }): Promise<any[]> {
    return this.prisma.userBadge.findMany({
      where: {
        userId,
        ...(options?.displayedOnly && { isDisplayed: true }),
      } as any,
      include: { badge: true },
      orderBy: options?.displayedOnly
        ? ({ displayOrder: 'asc' } as any)
        : { earnedAt: 'desc' },
    });
  }

  async getUserBadgeCount(userId: string) {
    return this.prisma.userBadge.count({
      where: { userId },
    });
  }

  async getDisplayedBadgeCount(userId: string) {
    return this.prisma.userBadge.count({
      where: { userId, isDisplayed: true } as any,
    });
  }

  async getUserBadge(userId: string, badgeId: string): Promise<any> {
    return this.prisma.userBadge.findUnique({
      where: {
        userId_badgeId: { userId, badgeId },
      },
      include: { badge: true },
    });
  }

  async setBadgeDisplayed(
    userId: string,
    badgeId: string,
    isDisplayed: boolean,
    displayOrder?: number,
  ): Promise<any> {
    return this.prisma.userBadge.update({
      where: {
        userId_badgeId: { userId, badgeId },
      },
      data: {
        isDisplayed,
        displayOrder: isDisplayed ? displayOrder : null,
      } as any,
      include: { badge: true },
    });
  }

  async awardBadge(userId: string, badgeId: string) {
    return this.prisma.userBadge.upsert({
      where: {
        userId_badgeId: { userId, badgeId },
      },
      update: {},
      create: {
        userId,
        badgeId,
      },
      include: { badge: true },
    });
  }

  async getBadgeBySlug(slug: string) {
    return this.prisma.badge.findUnique({
      where: { slug },
    });
  }

  // ============================================
  // STREAK HISTORY
  // ============================================

  async getStreakHistory(userId: string, limit: number = 30) {
    return this.prisma.streakHistory.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  async recordStreakDay(userId: string, date: Date) {
    const dateOnly = new Date(date.toISOString().split('T')[0]);
    return this.prisma.streakHistory.upsert({
      where: {
        userId_date: { userId, date: dateOnly },
      },
      update: { completed: true },
      create: {
        userId,
        date: dateOnly,
        completed: true,
      },
    });
  }

  async getLastStreakDay(userId: string) {
    return this.prisma.streakHistory.findFirst({
      where: { userId, completed: true },
      orderBy: { date: 'desc' },
    });
  }

  // ============================================
  // USER PROGRESS STATS (for achievements)
  // ============================================

  async getUserLessonStats(userId: string) {
    const stats = await this.prisma.userLessonProgress.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    });

    const completedCount = stats.find((s) => s.status === 'COMPLETED')?._count || 0;
    const totalCount = stats.reduce((acc, s) => acc + s._count, 0);

    return { completedCount, totalCount };
  }

  async getUserLessonStatsByDifficulty(userId: string) {
    const lessons = await this.prisma.userLessonProgress.findMany({
      where: { userId, status: 'COMPLETED' },
      include: {
        lesson: {
          select: { difficulty: true },
        },
      },
    });

    const stats = {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
    };

    lessons.forEach((lp) => {
      stats[lp.lesson.difficulty]++;
    });

    return stats;
  }

  async getUserCourseStats(userId: string) {
    const courses = await this.prisma.userCourseProgress.findMany({
      where: { userId },
    });

    const completedCount = courses.filter((c) => c.completionPercentage >= 100).length;

    return {
      startedCount: courses.length,
      completedCount,
    };
  }

  async getUserSocialStats(userId: string) {
    const [commentCount, followerCount, followingCount] = await Promise.all([
      this.prisma.comment.count({ where: { userId } }),
      this.prisma.follow.count({ where: { followingId: userId } }),
      this.prisma.follow.count({ where: { followerId: userId } }),
    ]);

    return { commentCount, followerCount, followingCount };
  }

  // ============================================
  // ACTIVITY
  // ============================================

  async createActivity(activityData: {
    userId: string;
    type: ActivityType;
    data?: Record<string, unknown>;
  }) {
    return this.prisma.activity.create({
      data: {
        userId: activityData.userId,
        type: activityData.type,
        data: (activityData.data || {}) as Prisma.InputJsonValue,
      },
    });
  }
}
