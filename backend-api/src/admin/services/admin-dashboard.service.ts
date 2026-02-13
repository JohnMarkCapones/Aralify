import { Injectable } from '@nestjs/common';
import { AdminUsersRepository } from '../repositories/admin-users.repository';
import { AdminCoursesRepository } from '../repositories/admin-courses.repository';
import { PrismaService } from '../../prisma/prisma.service';
import {
  DashboardOverviewDto,
  DashboardMetricsDto,
  RecentSignupsResponseDto,
  SystemHealthDto,
  RecentSignupDto,
  AdminAnalyticsDto,
} from '../dto';

@Injectable()
export class AdminDashboardService {
  private readonly startTime = Date.now();

  constructor(
    private readonly adminUsersRepository: AdminUsersRepository,
    private readonly adminCoursesRepository: AdminCoursesRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getDashboardOverview(): Promise<DashboardOverviewDto> {
    const [metrics, recentSignups, health] = await Promise.all([
      this.getMetrics(),
      this.getRecentSignupsData(10),
      this.getHealth(),
    ]);

    const recentActivity = await this.getRecentActivity();

    return {
      metrics,
      recentSignups: recentSignups.data,
      recentActivity,
      health,
    };
  }

  async getMetrics(): Promise<DashboardMetricsDto> {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      bannedUsers,
      totalCourses,
      publishedCourses,
      totalLevels,
      publishedLevels,
      totalLessons,
      publishedLessons,
      totalXpAwarded,
      totalLessonCompletions,
      avgCompletion,
      avgStreak,
    ] = await Promise.all([
      this.adminUsersRepository.countTotalUsers(),
      this.adminUsersRepository.countActiveUsers(thirtyDaysAgo),
      this.adminUsersRepository.countNewUsers(startOfToday),
      this.adminUsersRepository.countNewUsers(startOfWeek),
      this.adminUsersRepository.countNewUsers(startOfMonth),
      this.adminUsersRepository.countBannedUsers(),
      this.adminCoursesRepository.countCourses(),
      this.adminCoursesRepository.countCourses(true),
      this.adminCoursesRepository.countLevels(),
      this.adminCoursesRepository.countLevels(true),
      this.adminCoursesRepository.countLessons(),
      this.adminCoursesRepository.countLessons(true),
      this.getTotalXpAwarded(),
      this.adminCoursesRepository.countLessonCompletions(),
      this.getAverageCompletionRate(),
      this.getAverageStreakLength(),
    ]);

    // Calculate daily active users for the past week
    const dailyActiveUsers = await this.getDailyActiveUsersAverage();

    return {
      users: {
        totalUsers,
        activeUsers,
        newUsersToday,
        newUsersThisWeek,
        newUsersThisMonth,
        bannedUsers,
      },
      content: {
        totalCourses,
        publishedCourses,
        totalLevels,
        publishedLevels,
        totalLessons,
        publishedLessons,
      },
      engagement: {
        totalXpAwarded,
        totalLessonCompletions,
        averageCompletionRate: avgCompletion,
        averageDailyActiveUsers: dailyActiveUsers,
        averageStreakLength: avgStreak,
      },
    };
  }

  async getRecentSignups(limit = 20): Promise<RecentSignupsResponseDto> {
    return this.getRecentSignupsData(limit);
  }

  async getHealth(): Promise<SystemHealthDto> {
    let databaseStatus: 'healthy' | 'degraded' | 'down' = 'healthy';

    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      databaseStatus = 'down';
    }

    const uptime = Math.floor((Date.now() - this.startTime) / 1000);

    return {
      database: databaseStatus,
      lastChecked: new Date(),
      uptime,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }

  private async getRecentSignupsData(limit: number): Promise<RecentSignupsResponseDto> {
    const users = await this.adminUsersRepository.getRecentSignups(limit);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalInPeriod = await this.adminUsersRepository.countNewUsers(today);

    return {
      data: users.map((user) => this.formatRecentSignup(user)),
      totalInPeriod,
    };
  }

  private formatRecentSignup(user: any): RecentSignupDto {
    let signupMethod = 'email';
    if (user.googleId) signupMethod = 'google';
    else if (user.githubId) signupMethod = 'github';
    else if (user.facebookId) signupMethod = 'facebook';

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      signupMethod,
    };
  }

  private async getRecentActivity() {
    // Get recent user activities (lesson completions, achievements, etc.)
    const activities = await this.prisma.activity.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return activities.map((activity) => ({
      id: activity.id,
      type: activity.type,
      description: this.getActivityDescription(activity),
      userId: activity.user.id,
      username: activity.user.username,
      createdAt: activity.createdAt,
    }));
  }

  private getActivityDescription(activity: any): string {
    const username = activity.user.username;
    switch (activity.type) {
      case 'LESSON_COMPLETED':
        return `${username} completed a lesson`;
      case 'LEVEL_COMPLETED':
        return `${username} completed a level`;
      case 'COURSE_COMPLETED':
        return `${username} completed a course`;
      case 'ACHIEVEMENT_EARNED':
        return `${username} earned an achievement`;
      case 'BADGE_EARNED':
        return `${username} earned a badge`;
      case 'STREAK_MILESTONE':
        return `${username} reached a streak milestone`;
      case 'LEVEL_UP':
        return `${username} leveled up`;
      default:
        return `${username} performed an activity`;
    }
  }

  private async getTotalXpAwarded(): Promise<number> {
    const result = await this.prisma.user.aggregate({
      _sum: {
        xpTotal: true,
      },
    });
    return result._sum.xpTotal || 0;
  }

  private async getAverageCompletionRate(): Promise<number> {
    const result = await this.prisma.userCourseProgress.aggregate({
      _avg: {
        completionPercentage: true,
      },
    });
    return Math.round((result._avg.completionPercentage || 0) * 100) / 100;
  }

  private async getAverageStreakLength(): Promise<number> {
    const result = await this.prisma.user.aggregate({
      _avg: {
        streakCurrent: true,
      },
    });
    return Math.round((result._avg.streakCurrent || 0) * 10) / 10;
  }

  async getAnalytics(range: string): Promise<AdminAnalyticsDto> {
    const days = range === '90d' ? 90 : range === '30d' ? 30 : 7;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [dauTrend, signupsTrend, completionRate, xpDistribution] = await Promise.all([
      this.getDauTrend(since, days),
      this.getSignupsTrend(since, days),
      this.getAverageCompletionRate(),
      this.getXpDistribution(),
    ]);

    return { dauTrend, signupsTrend, completionRate, xpDistribution, range };
  }

  private async getDauTrend(since: Date, days: number) {
    const result: { date: string; value: number }[] = [];
    for (let i = 0; i < days; i++) {
      const dayStart = new Date(since);
      dayStart.setDate(dayStart.getDate() + i);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const count = await this.prisma.user.count({
        where: {
          lastActiveAt: { gte: dayStart, lt: dayEnd },
        },
      });

      result.push({
        date: dayStart.toISOString().split('T')[0],
        value: count,
      });
    }
    return result;
  }

  private async getSignupsTrend(since: Date, days: number) {
    const result: { date: string; value: number }[] = [];
    for (let i = 0; i < days; i++) {
      const dayStart = new Date(since);
      dayStart.setDate(dayStart.getDate() + i);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const count = await this.prisma.user.count({
        where: {
          createdAt: { gte: dayStart, lt: dayEnd },
        },
      });

      result.push({
        date: dayStart.toISOString().split('T')[0],
        value: count,
      });
    }
    return result;
  }

  private async getXpDistribution() {
    const buckets = [
      { range: '0-500', min: 0, max: 500 },
      { range: '501-1000', min: 501, max: 1000 },
      { range: '1001-2500', min: 1001, max: 2500 },
      { range: '2501-5000', min: 2501, max: 5000 },
      { range: '5001-10000', min: 5001, max: 10000 },
      { range: '10001+', min: 10001, max: 999999999 },
    ];

    const result = await Promise.all(
      buckets.map(async (bucket) => ({
        range: bucket.range,
        count: await this.prisma.user.count({
          where: {
            xpTotal: { gte: bucket.min, lte: bucket.max },
          },
        }),
      })),
    );

    return result;
  }

  private async getDailyActiveUsersAverage(): Promise<number> {
    // Get daily active users for the past 7 days and average
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const count = await this.prisma.user.count({
      where: {
        lastActiveAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    return Math.round(count / 7);
  }
}
