import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Difficulty,
  ProfileVisibility,
  AllowMessages,
  ProgressStatus,
  SkillLevel,
  XpSource,
} from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================================================
  // User Queries
  // ============================================================================

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByIdWithSettings(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        settings: true,
        notificationSettings: true,
        privacySettings: true,
      },
    });
  }

  async findByUsernameWithSettings(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        settings: true,
        notificationSettings: true,
        privacySettings: true,
      },
    });
  }

  // ============================================================================
  // User Updates
  // ============================================================================

  async updateProfile(
    id: string,
    data: {
      displayName?: string;
      bio?: string;
      locale?: string;
      timezone?: string;
    },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async isUsernameAvailable(username: string, excludeUserId?: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) return true;
    if (excludeUserId && user.id === excludeUserId) return true;
    return false;
  }

  // ============================================================================
  // Settings Updates
  // ============================================================================

  async updateUserSettings(
    userId: string,
    data: {
      theme?: string;
      codeEditorTheme?: string;
      fontSize?: number;
      dailyGoalMins?: number;
      difficultyPref?: Difficulty;
    },
  ) {
    return this.prisma.userSettings.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }

  async updateNotificationSettings(
    userId: string,
    data: {
      emailEnabled?: boolean;
      pushEnabled?: boolean;
      streakReminders?: boolean;
      achievementNotifs?: boolean;
      socialNotifs?: boolean;
    },
  ) {
    return this.prisma.notificationSettings.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }

  async updatePrivacySettings(
    userId: string,
    data: {
      profileVisibility?: ProfileVisibility;
      showProgress?: boolean;
      showActivity?: boolean;
      allowMessages?: AllowMessages;
    },
  ) {
    return this.prisma.privacySettings.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }

  // ============================================================================
  // Stats Queries
  // ============================================================================

  async getUserStats(userId: string) {
    const [user, courseProgress, lessonProgress, achievementsCount, badgesCount] =
      await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
          select: {
            xpTotal: true,
            level: true,
            streakCurrent: true,
            streakLongest: true,
          },
        }),
        this.prisma.userCourseProgress.findMany({
          where: { userId },
          select: {
            completedAt: true,
            timeSpentSeconds: true,
          },
        }),
        this.prisma.userLessonProgress.count({
          where: {
            userId,
            status: ProgressStatus.COMPLETED,
          },
        }),
        this.prisma.userAchievement.count({
          where: { userId },
        }),
        this.prisma.userBadge.count({
          where: { userId },
        }),
      ]);

    if (!user) return null;

    return {
      xpTotal: user.xpTotal,
      level: user.level,
      streakCurrent: user.streakCurrent,
      streakLongest: user.streakLongest,
      coursesStarted: courseProgress.length,
      coursesCompleted: courseProgress.filter((c) => c.completedAt !== null).length,
      lessonsCompleted: lessonProgress,
      totalTimeSpentMinutes: Math.floor(
        courseProgress.reduce((sum, c) => sum + c.timeSpentSeconds, 0) / 60,
      ),
      achievementsEarned: achievementsCount,
      badgesEarned: badgesCount,
    };
  }

  // ============================================================================
  // Onboarding
  // ============================================================================

  async getOnboardingStatus(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
        onboardingStep: true,
      },
    });
  }

  async completeOnboarding(
    userId: string,
    data: {
      displayName?: string;
      avatarUrl?: string;
      skillLevel: SkillLevel;
      interestedLanguages: string[];
      learningGoals: string[];
      dailyCommitmentMins: number;
    },
  ) {
    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          displayName: data.displayName,
          avatarUrl: data.avatarUrl,
          onboardingCompleted: true,
          onboardingStep: 7,
          skillLevel: data.skillLevel,
          interestedLanguages: data.interestedLanguages,
          learningGoals: data.learningGoals,
          dailyCommitmentMins: data.dailyCommitmentMins,
          onboardingCompletedAt: new Date(),
          xpTotal: { increment: 100 },
        },
      }),
      this.prisma.userSettings.upsert({
        where: { userId },
        update: { dailyGoalMins: data.dailyCommitmentMins },
        create: { userId, dailyGoalMins: data.dailyCommitmentMins },
      }),
      this.prisma.xpTransaction.create({
        data: {
          userId,
          amount: 100,
          source: XpSource.EVENT,
          description: 'Welcome bonus - Onboarding completed',
        },
      }),
    ]);

    return user;
  }

  async skipOnboarding(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        onboardingCompleted: true,
        onboardingStep: 7,
        onboardingCompletedAt: new Date(),
      },
    });
  }

  // ============================================================================
  // Privacy Helpers
  // ============================================================================

  async getPrivacySettings(userId: string) {
    return this.prisma.privacySettings.findUnique({
      where: { userId },
    });
  }

  async isFollowing(followerId: string, followingId: string) {
    const follow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
    return !!follow;
  }

  // ============================================================================
  // User Courses
  // ============================================================================

  async getUserCourses(userId: string) {
    return this.prisma.userCourseProgress.findMany({
      where: { userId },
      orderBy: { lastActivityAt: 'desc' },
      include: {
        course: {
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            language: true,
            iconUrl: true,
            color: true,
          },
        },
      },
    });
  }

  // ============================================================================
  // Detailed Stats
  // ============================================================================

  async getXpOverTime(userId: string, since: Date) {
    return this.prisma.xpTransaction.findMany({
      where: {
        userId,
        createdAt: { gte: since },
      },
      select: {
        amount: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getDifficultyBreakdown(userId: string) {
    const [easy, medium, hard] = await Promise.all([
      this.prisma.userLessonProgress.count({
        where: { userId, status: ProgressStatus.COMPLETED, lesson: { difficulty: 'EASY' } },
      }),
      this.prisma.userLessonProgress.count({
        where: { userId, status: ProgressStatus.COMPLETED, lesson: { difficulty: 'MEDIUM' } },
      }),
      this.prisma.userLessonProgress.count({
        where: { userId, status: ProgressStatus.COMPLETED, lesson: { difficulty: 'HARD' } },
      }),
    ]);
    return { easy, medium, hard };
  }

  async getTimeSpentInRange(userId: string, since: Date) {
    const result = await this.prisma.userCourseProgress.aggregate({
      where: { userId, lastActivityAt: { gte: since } },
      _sum: { timeSpentSeconds: true },
    });
    return result._sum.timeSpentSeconds || 0;
  }

  // ============================================================================
  // Certificates
  // ============================================================================

  async getTimeSpentByDay(userId: string, since: Date) {
    const lessons = await this.prisma.userLessonProgress.findMany({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        completedAt: { gte: since },
      },
      select: {
        timeSpent: true,
        completedAt: true,
      },
    });

    const byDate = new Map<string, number>();
    for (const l of lessons) {
      if (!l.completedAt || !l.timeSpent) continue;
      const dateKey = l.completedAt.toISOString().split('T')[0];
      byDate.set(dateKey, (byDate.get(dateKey) || 0) + Math.round(l.timeSpent / 60));
    }

    return Array.from(byDate.entries()).map(([date, minutes]) => ({ date, minutes }));
  }

  async getActivityHeatmap(userId: string, since: Date) {
    const transactions = await this.prisma.xpTransaction.findMany({
      where: {
        userId,
        createdAt: { gte: since },
      },
      select: {
        createdAt: true,
        amount: true,
      },
    });

    // Build a 7x24 grid: day-of-week (0=Mon..6=Sun) x hour (0..23)
    const grid = new Map<string, number>();
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (const tx of transactions) {
      const d = tx.createdAt;
      // JS getDay(): 0=Sun, 1=Mon...6=Sat → remap to Mon=0..Sun=6
      const jsDay = d.getDay();
      const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
      const hour = d.getHours();
      const key = `${dayIndex}-${hour}`;
      grid.set(key, (grid.get(key) || 0) + tx.amount);
    }

    const result: { day: string; hour: number; value: number }[] = [];
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      for (let h = 0; h < 24; h++) {
        result.push({
          day: days[dayIdx],
          hour: h,
          value: grid.get(`${dayIdx}-${h}`) || 0,
        });
      }
    }
    return result;
  }

  async calculateCourseGrade(userId: string, courseId: string): Promise<string> {
    const lessonProgress = await this.prisma.userLessonProgress.findMany({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        lesson: { level: { courseId } },
      },
      select: { score: true },
    });

    if (lessonProgress.length === 0) return 'C';

    const scores = lessonProgress
      .map((lp) => lp.score)
      .filter((s): s is number => s !== null && s !== undefined);

    if (scores.length === 0) return 'C';

    const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;

    if (avg >= 97) return 'A+';
    if (avg >= 93) return 'A';
    if (avg >= 90) return 'A-';
    if (avg >= 87) return 'B+';
    if (avg >= 83) return 'B';
    if (avg >= 80) return 'B-';
    if (avg >= 77) return 'C+';
    return 'C';
  }

  async getCompletedCourses(userId: string) {
    return this.prisma.userCourseProgress.findMany({
      where: { userId, completedAt: { not: null } },
      orderBy: { completedAt: 'desc' },
      include: {
        course: {
          select: {
            id: true,
            slug: true,
            title: true,
            color: true,
          },
        },
      },
    });
  }

  // ============================================================================
  // Challenge History
  // ============================================================================

  async getChallengeHistory(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.challengeSubmission.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          challenge: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      }),
      this.prisma.challengeSubmission.count({ where: { userId } }),
    ]);

    return { data, total };
  }

  // ============================================================================
  // Activities
  // ============================================================================

  async getUserActivities(
    userId: string,
    options: { type?: string; page: number; limit: number },
  ) {
    const skip = (options.page - 1) * options.limit;
    const where: any = { userId };

    if (options.type) {
      where.type = options.type;
    }

    const [data, total] = await Promise.all([
      this.prisma.activity.findMany({
        where,
        skip,
        take: options.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.activity.count({ where }),
    ]);

    return { data, total };
  }
}
