import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  xp: number;
  level: number;
}

export interface PeriodLeaderboardEntry extends LeaderboardEntry {
  rank: number;
}

@Injectable()
export class LeaderboardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================================================
  // Global Leaderboard
  // ============================================================================

  async getGlobalLeaderboard(limit: number, offset: number): Promise<LeaderboardEntry[]> {
    const users = await this.prisma.user.findMany({
      where: { isActive: true },
      orderBy: { xpTotal: 'desc' },
      skip: offset,
      take: limit,
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        xpTotal: true,
        level: true,
      },
    });

    return users.map((u) => ({
      userId: u.id,
      username: u.username,
      displayName: u.displayName,
      avatarUrl: u.avatarUrl,
      xp: u.xpTotal,
      level: u.level,
    }));
  }

  async getTotalActiveUsers(): Promise<number> {
    return this.prisma.user.count({
      where: { isActive: true },
    });
  }

  async getGlobalRank(userId: string): Promise<number | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { xpTotal: true, isActive: true },
    });

    if (!user || !user.isActive) return null;

    const usersAbove = await this.prisma.user.count({
      where: {
        isActive: true,
        xpTotal: { gt: user.xpTotal },
      },
    });

    return usersAbove + 1;
  }

  // ============================================================================
  // Friends Leaderboard
  // ============================================================================

  async getMutualFriendIds(userId: string): Promise<string[]> {
    const mutualFollows = await this.prisma.$queryRaw<Array<{ followingId: string }>>`
      SELECT a."followingId"
      FROM follows a
      INNER JOIN follows b
        ON a."followerId" = b."followingId"
        AND a."followingId" = b."followerId"
      WHERE a."followerId" = ${userId}
    `;

    return mutualFollows.map((f) => f.followingId);
  }

  async getUsersByIds(userIds: string[]): Promise<LeaderboardEntry[]> {
    if (userIds.length === 0) return [];

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
        isActive: true,
      },
      orderBy: { xpTotal: 'desc' },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        xpTotal: true,
        level: true,
      },
    });

    return users.map((u) => ({
      userId: u.id,
      username: u.username,
      displayName: u.displayName,
      avatarUrl: u.avatarUrl,
      xp: u.xpTotal,
      level: u.level,
    }));
  }

  // ============================================================================
  // Weekly / Monthly Leaderboards
  // ============================================================================

  async getWeeklyLeaderboard(
    weekStart: Date,
    weekEnd: Date,
    limit: number,
  ): Promise<PeriodLeaderboardEntry[]> {
    return this.getPeriodLeaderboard(weekStart, weekEnd, limit);
  }

  async getMonthlyLeaderboard(
    monthStart: Date,
    monthEnd: Date,
    limit: number,
  ): Promise<PeriodLeaderboardEntry[]> {
    return this.getPeriodLeaderboard(monthStart, monthEnd, limit);
  }

  private async getPeriodLeaderboard(
    periodStart: Date,
    periodEnd: Date,
    limit: number,
  ): Promise<PeriodLeaderboardEntry[]> {
    const rows = await this.prisma.$queryRaw<
      Array<{
        userId: string;
        username: string;
        displayName: string | null;
        avatarUrl: string | null;
        level: number;
        totalXp: bigint;
        rank: bigint;
      }>
    >`
      SELECT
        u.id AS "userId",
        u.username,
        u."displayName",
        u."avatarUrl",
        u.level,
        SUM(xt.amount) AS "totalXp",
        ROW_NUMBER() OVER (ORDER BY SUM(xt.amount) DESC) AS rank
      FROM xp_transactions xt
      INNER JOIN users u ON u.id = xt."userId"
      WHERE xt."createdAt" >= ${periodStart}
        AND xt."createdAt" < ${periodEnd}
        AND u."isActive" = true
      GROUP BY u.id, u.username, u."displayName", u."avatarUrl", u.level
      ORDER BY "totalXp" DESC
      LIMIT ${limit}
    `;

    return rows.map((r) => ({
      userId: r.userId,
      username: r.username,
      displayName: r.displayName,
      avatarUrl: r.avatarUrl,
      xp: Number(r.totalXp),
      level: r.level,
      rank: Number(r.rank),
    }));
  }

  async getUserPeriodXpAndRank(
    userId: string,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<{ xp: number; rank: number } | null> {
    const rows = await this.prisma.$queryRaw<
      Array<{ totalXp: bigint; rank: bigint }>
    >`
      WITH user_xp AS (
        SELECT
          xt."userId",
          SUM(xt.amount) AS "totalXp"
        FROM xp_transactions xt
        INNER JOIN users u ON u.id = xt."userId"
        WHERE xt."createdAt" >= ${periodStart}
          AND xt."createdAt" < ${periodEnd}
          AND u."isActive" = true
        GROUP BY xt."userId"
      ),
      ranked AS (
        SELECT
          "userId",
          "totalXp",
          ROW_NUMBER() OVER (ORDER BY "totalXp" DESC) AS rank
        FROM user_xp
      )
      SELECT "totalXp", rank
      FROM ranked
      WHERE "userId" = ${userId}
    `;

    if (rows.length === 0) return null;

    return {
      xp: Number(rows[0].totalXp),
      rank: Number(rows[0].rank),
    };
  }

  // ============================================================================
  // Course Leaderboard
  // ============================================================================

  async getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: { slug },
      select: { id: true, slug: true, title: true },
    });
  }

  async getCourseLeaderboard(
    courseId: string,
    limit: number,
  ): Promise<LeaderboardEntry[]> {
    const progress = await this.prisma.userCourseProgress.findMany({
      where: {
        courseId,
        totalXpEarned: { gt: 0 },
        user: { isActive: true },
      },
      orderBy: { totalXpEarned: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            level: true,
          },
        },
      },
    });

    return progress.map((p) => ({
      userId: p.user.id,
      username: p.user.username,
      displayName: p.user.displayName,
      avatarUrl: p.user.avatarUrl,
      xp: p.totalXpEarned,
      level: p.user.level,
    }));
  }

  async getUserCourseRank(
    userId: string,
    courseId: string,
  ): Promise<{ rank: number; xp: number } | null> {
    const userProgress = await this.prisma.userCourseProgress.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { totalXpEarned: true },
    });

    if (!userProgress || userProgress.totalXpEarned === 0) return null;

    const usersAbove = await this.prisma.userCourseProgress.count({
      where: {
        courseId,
        totalXpEarned: { gt: userProgress.totalXpEarned },
        user: { isActive: true },
      },
    });

    return {
      rank: usersAbove + 1,
      xp: userProgress.totalXpEarned,
    };
  }

  async getUserCourseProgressList(
    userId: string,
  ): Promise<Array<{ courseId: string; courseSlug: string; courseTitle: string; totalXpEarned: number }>> {
    const progress = await this.prisma.userCourseProgress.findMany({
      where: {
        userId,
        totalXpEarned: { gt: 0 },
      },
      include: {
        course: {
          select: { id: true, slug: true, title: true },
        },
      },
    });

    return progress.map((p) => ({
      courseId: p.course.id,
      courseSlug: p.course.slug,
      courseTitle: p.course.title,
      totalXpEarned: p.totalXpEarned,
    }));
  }

  // ============================================================================
  // Around User
  // ============================================================================

  async getGlobalAroundUser(
    userId: string,
    radius: number,
  ): Promise<{ rankings: LeaderboardEntry[]; userRank: number; startRank: number } | null> {
    const rank = await this.getGlobalRank(userId);
    if (rank === null) return null;

    const startRank = Math.max(1, rank - radius);
    const take = radius * 2 + 1;
    const skip = startRank - 1;

    const users = await this.prisma.user.findMany({
      where: { isActive: true },
      orderBy: { xpTotal: 'desc' },
      skip,
      take,
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        xpTotal: true,
        level: true,
      },
    });

    return {
      rankings: users.map((u) => ({
        userId: u.id,
        username: u.username,
        displayName: u.displayName,
        avatarUrl: u.avatarUrl,
        xp: u.xpTotal,
        level: u.level,
      })),
      userRank: rank,
      startRank,
    };
  }

  async getPeriodAroundUser(
    userId: string,
    periodStart: Date,
    periodEnd: Date,
    radius: number,
  ): Promise<{ rankings: PeriodLeaderboardEntry[]; userRank: number } | null> {
    const rows = await this.prisma.$queryRaw<
      Array<{
        userId: string;
        username: string;
        displayName: string | null;
        avatarUrl: string | null;
        level: number;
        totalXp: bigint;
        rank: bigint;
      }>
    >`
      WITH ranked AS (
        SELECT
          u.id AS "userId",
          u.username,
          u."displayName",
          u."avatarUrl",
          u.level,
          SUM(xt.amount) AS "totalXp",
          ROW_NUMBER() OVER (ORDER BY SUM(xt.amount) DESC) AS rank
        FROM xp_transactions xt
        INNER JOIN users u ON u.id = xt."userId"
        WHERE xt."createdAt" >= ${periodStart}
          AND xt."createdAt" < ${periodEnd}
          AND u."isActive" = true
        GROUP BY u.id, u.username, u."displayName", u."avatarUrl", u.level
      ),
      user_rank AS (
        SELECT rank FROM ranked WHERE "userId" = ${userId}
      )
      SELECT r."userId", r.username, r."displayName", r."avatarUrl", r.level, r."totalXp", r.rank
      FROM ranked r, user_rank ur
      WHERE r.rank BETWEEN GREATEST(1, ur.rank - ${radius}) AND ur.rank + ${radius}
      ORDER BY r.rank
    `;

    if (rows.length === 0) return null;

    const userRow = rows.find((r) => r.userId === userId);
    if (!userRow) return null;

    return {
      rankings: rows.map((r) => ({
        userId: r.userId,
        username: r.username,
        displayName: r.displayName,
        avatarUrl: r.avatarUrl,
        xp: Number(r.totalXp),
        level: r.level,
        rank: Number(r.rank),
      })),
      userRank: Number(userRow.rank),
    };
  }

  // ============================================================================
  // Snapshots
  // ============================================================================

  async createSnapshot(
    periodType: string,
    periodStart: Date,
    periodEnd: Date,
    rankings: Array<{ userId: string; rank: number; xp: number; change: number }>,
  ) {
    return this.prisma.leaderboardSnapshot.create({
      data: {
        periodType,
        periodStart,
        periodEnd,
        rankings: rankings as any,
      },
    });
  }

  async getLatestSnapshot(periodType: string) {
    return this.prisma.leaderboardSnapshot.findFirst({
      where: { periodType },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllTimeRankings(limit: number): Promise<LeaderboardEntry[]> {
    const users = await this.prisma.user.findMany({
      where: { isActive: true, xpTotal: { gt: 0 } },
      orderBy: { xpTotal: 'desc' },
      take: limit,
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        xpTotal: true,
        level: true,
      },
    });

    return users.map((u) => ({
      userId: u.id,
      username: u.username,
      displayName: u.displayName,
      avatarUrl: u.avatarUrl,
      xp: u.xpTotal,
      level: u.level,
    }));
  }
}
