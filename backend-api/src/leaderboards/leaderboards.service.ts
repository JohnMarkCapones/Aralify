import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LeaderboardsRepository, LeaderboardEntry } from './leaderboards.repository';
import {
  LeaderboardEntryDto,
  GlobalLeaderboardResponseDto,
  FriendsLeaderboardResponseDto,
  WeeklyLeaderboardResponseDto,
  MonthlyLeaderboardResponseDto,
  CourseLeaderboardResponseDto,
  UserRanksResponseDto,
  AroundUserResponseDto,
} from './dto';

export interface SnapshotResult {
  snapshotsCreated: number;
}

@Injectable()
export class LeaderboardsService {
  private readonly logger = new Logger(LeaderboardsService.name);

  constructor(private readonly repository: LeaderboardsRepository) {}

  // ============================================================================
  // Global
  // ============================================================================

  async getGlobalLeaderboard(
    limit: number,
    offset: number,
    userId?: string,
  ): Promise<GlobalLeaderboardResponseDto> {
    const [entries, totalUsers, userRank] = await Promise.all([
      this.repository.getGlobalLeaderboard(limit, offset),
      this.repository.getTotalActiveUsers(),
      userId ? this.repository.getGlobalRank(userId) : Promise.resolve(null),
    ]);

    return {
      rankings: this.formatEntries(entries, offset + 1, userId),
      userRank,
      totalUsers,
      limit,
      offset,
    };
  }

  // ============================================================================
  // Friends
  // ============================================================================

  async getFriendsLeaderboard(userId: string): Promise<FriendsLeaderboardResponseDto> {
    const mutualFriendIds = await this.repository.getMutualFriendIds(userId);

    // Always include the auth user
    const allIds = [...new Set([userId, ...mutualFriendIds])];
    const entries = await this.repository.getUsersByIds(allIds);

    return {
      rankings: this.formatEntries(entries, 1, userId),
      totalFriends: entries.length,
    };
  }

  // ============================================================================
  // Weekly
  // ============================================================================

  async getWeeklyLeaderboard(
    limit: number,
    userId?: string,
  ): Promise<WeeklyLeaderboardResponseDto> {
    const { start, end } = this.getCurrentWeekBounds();

    const [entries, userRankData] = await Promise.all([
      this.repository.getWeeklyLeaderboard(start, end, limit),
      userId
        ? this.repository.getUserPeriodXpAndRank(userId, start, end)
        : Promise.resolve(null),
    ]);

    return {
      rankings: this.formatPeriodEntries(entries, userId),
      userRank: userRankData?.rank ?? null,
      periodStart: start.toISOString(),
      periodEnd: end.toISOString(),
    };
  }

  // ============================================================================
  // Monthly
  // ============================================================================

  async getMonthlyLeaderboard(
    limit: number,
    month?: string,
    userId?: string,
  ): Promise<MonthlyLeaderboardResponseDto> {
    const { start, end, monthStr } = this.getMonthBounds(month);

    const [entries, userRankData] = await Promise.all([
      this.repository.getMonthlyLeaderboard(start, end, limit),
      userId
        ? this.repository.getUserPeriodXpAndRank(userId, start, end)
        : Promise.resolve(null),
    ]);

    return {
      rankings: this.formatPeriodEntries(entries, userId),
      userRank: userRankData?.rank ?? null,
      month: monthStr,
      periodStart: start.toISOString(),
      periodEnd: end.toISOString(),
    };
  }

  // ============================================================================
  // Course
  // ============================================================================

  async getCourseLeaderboard(
    slug: string,
    limit: number,
    userId?: string,
  ): Promise<CourseLeaderboardResponseDto> {
    const course = await this.repository.getCourseBySlug(slug);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const [entries, userRankData] = await Promise.all([
      this.repository.getCourseLeaderboard(course.id, limit),
      userId
        ? this.repository.getUserCourseRank(userId, course.id)
        : Promise.resolve(null),
    ]);

    return {
      rankings: this.formatEntries(entries, 1, userId),
      userRank: userRankData?.rank ?? null,
      courseSlug: course.slug,
      courseTitle: course.title,
    };
  }

  // ============================================================================
  // User Rank Summary
  // ============================================================================

  async getUserRanks(userId: string): Promise<UserRanksResponseDto> {
    const { start: weekStart, end: weekEnd } = this.getCurrentWeekBounds();
    const { start: monthStart, end: monthEnd } = this.getMonthBounds();

    const [
      globalRank,
      totalUsers,
      weeklyData,
      monthlyData,
      mutualFriendIds,
      courseProgressList,
    ] = await Promise.all([
      this.repository.getGlobalRank(userId),
      this.repository.getTotalActiveUsers(),
      this.repository.getUserPeriodXpAndRank(userId, weekStart, weekEnd),
      this.repository.getUserPeriodXpAndRank(userId, monthStart, monthEnd),
      this.repository.getMutualFriendIds(userId),
      this.repository.getUserCourseProgressList(userId),
    ]);

    // Calculate friends rank
    let friendsRank: number | null = null;
    if (mutualFriendIds.length > 0) {
      const allIds = [...new Set([userId, ...mutualFriendIds])];
      const friendEntries = await this.repository.getUsersByIds(allIds);
      const userIndex = friendEntries.findIndex((e) => e.userId === userId);
      friendsRank = userIndex >= 0 ? userIndex + 1 : null;
    } else {
      // No friends, user is rank 1 by default
      friendsRank = 1;
    }

    // Calculate per-course ranks
    const courseRanks = await Promise.all(
      courseProgressList.map(async (cp) => {
        const rankData = await this.repository.getUserCourseRank(userId, cp.courseId);
        return {
          courseSlug: cp.courseSlug,
          courseTitle: cp.courseTitle,
          rank: rankData?.rank ?? 0,
          xp: rankData?.xp ?? 0,
        };
      }),
    );

    // Percentile: (totalUsers - globalRank) / totalUsers * 100
    const percentile =
      globalRank !== null && totalUsers > 0
        ? Math.round(((totalUsers - globalRank) / totalUsers) * 1000) / 10
        : 0;

    return {
      globalRank,
      weeklyRank: weeklyData?.rank ?? null,
      monthlyRank: monthlyData?.rank ?? null,
      friendsRank,
      percentile,
      courseRanks,
    };
  }

  // ============================================================================
  // Around User
  // ============================================================================

  async getAroundUser(
    userId: string,
    type: string,
    radius: number,
  ): Promise<AroundUserResponseDto> {
    if (type === 'global') {
      const result = await this.repository.getGlobalAroundUser(userId, radius);
      if (!result) {
        return { rankings: [], userRank: 0, type };
      }

      return {
        rankings: this.formatEntries(result.rankings, result.startRank, userId),
        userRank: result.userRank,
        type,
      };
    }

    // Weekly or monthly
    const bounds =
      type === 'weekly' ? this.getCurrentWeekBounds() : this.getMonthBounds();

    const result = await this.repository.getPeriodAroundUser(
      userId,
      bounds.start,
      bounds.end,
      radius,
    );

    if (!result) {
      return { rankings: [], userRank: 0, type };
    }

    return {
      rankings: this.formatPeriodEntries(result.rankings, userId),
      userRank: result.userRank,
      type,
    };
  }

  // ============================================================================
  // Snapshot Generation
  // ============================================================================

  async generateSnapshots(): Promise<SnapshotResult> {
    let snapshotsCreated = 0;

    // Weekly snapshot
    const { start: weekStart, end: weekEnd } = this.getCurrentWeekBounds();
    const weeklyEntries = await this.repository.getWeeklyLeaderboard(
      weekStart,
      weekEnd,
      100,
    );
    const prevWeekly = await this.repository.getLatestSnapshot('weekly');
    const prevWeeklyMap = this.buildPrevRankMap(prevWeekly);

    const weeklyRankings = weeklyEntries.map((entry) => ({
      userId: entry.userId,
      rank: entry.rank,
      xp: entry.xp,
      change: prevWeeklyMap.get(entry.userId)
        ? prevWeeklyMap.get(entry.userId)! - entry.rank
        : 0,
    }));

    await this.repository.createSnapshot('weekly', weekStart, weekEnd, weeklyRankings);
    snapshotsCreated++;

    // Monthly snapshot
    const { start: monthStart, end: monthEnd } = this.getMonthBounds();
    const monthlyEntries = await this.repository.getMonthlyLeaderboard(
      monthStart,
      monthEnd,
      100,
    );
    const prevMonthly = await this.repository.getLatestSnapshot('monthly');
    const prevMonthlyMap = this.buildPrevRankMap(prevMonthly);

    const monthlyRankings = monthlyEntries.map((entry) => ({
      userId: entry.userId,
      rank: entry.rank,
      xp: entry.xp,
      change: prevMonthlyMap.get(entry.userId)
        ? prevMonthlyMap.get(entry.userId)! - entry.rank
        : 0,
    }));

    await this.repository.createSnapshot('monthly', monthStart, monthEnd, monthlyRankings);
    snapshotsCreated++;

    // All-time snapshot
    const allTimeEntries = await this.repository.getAllTimeRankings(100);
    const prevAllTime = await this.repository.getLatestSnapshot('allTime');
    const prevAllTimeMap = this.buildPrevRankMap(prevAllTime);

    const allTimeRankings = allTimeEntries.map((entry, index) => ({
      userId: entry.userId,
      rank: index + 1,
      xp: entry.xp,
      change: prevAllTimeMap.get(entry.userId)
        ? prevAllTimeMap.get(entry.userId)! - (index + 1)
        : 0,
    }));

    const now = new Date();
    await this.repository.createSnapshot('allTime', now, now, allTimeRankings);
    snapshotsCreated++;

    this.logger.log(`Generated ${snapshotsCreated} leaderboard snapshots`);
    return { snapshotsCreated };
  }

  private buildPrevRankMap(
    snapshot: { rankings: any } | null,
  ): Map<string, number> {
    const map = new Map<string, number>();
    if (!snapshot?.rankings || !Array.isArray(snapshot.rankings)) return map;

    for (const entry of snapshot.rankings as Array<{ userId: string; rank: number }>) {
      map.set(entry.userId, entry.rank);
    }
    return map;
  }

  // ============================================================================
  // Helpers
  // ============================================================================

  private getCurrentWeekBounds(): { start: Date; end: Date } {
    const now = new Date();
    const day = now.getUTCDay();
    // Monday = 1, Sunday = 0 → shift so Monday = 0
    const daysSinceMonday = day === 0 ? 6 : day - 1;

    const start = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() - daysSinceMonday,
      ),
    );

    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 7);

    return { start, end };
  }

  private getMonthBounds(month?: string): {
    start: Date;
    end: Date;
    monthStr: string;
  } {
    let year: number;
    let monthIndex: number;

    if (month) {
      const [y, m] = month.split('-').map(Number);
      year = y;
      monthIndex = m - 1;
    } else {
      const now = new Date();
      year = now.getUTCFullYear();
      monthIndex = now.getUTCMonth();
    }

    const start = new Date(Date.UTC(year, monthIndex, 1));
    const end = new Date(Date.UTC(year, monthIndex + 1, 1));
    const monthStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

    return { start, end, monthStr };
  }

  private formatEntries(
    entries: LeaderboardEntry[],
    startRank: number,
    currentUserId?: string,
  ): LeaderboardEntryDto[] {
    return entries.map((entry, index) => ({
      rank: startRank + index,
      userId: entry.userId,
      username: entry.username,
      displayName: entry.displayName,
      avatarUrl: entry.avatarUrl,
      xp: entry.xp,
      level: entry.level,
      isCurrentUser: currentUserId === entry.userId,
    }));
  }

  private formatPeriodEntries(
    entries: Array<LeaderboardEntry & { rank: number }>,
    currentUserId?: string,
  ): LeaderboardEntryDto[] {
    return entries.map((entry) => ({
      rank: entry.rank,
      userId: entry.userId,
      username: entry.username,
      displayName: entry.displayName,
      avatarUrl: entry.avatarUrl,
      xp: entry.xp,
      level: entry.level,
      isCurrentUser: currentUserId === entry.userId,
    }));
  }
}
