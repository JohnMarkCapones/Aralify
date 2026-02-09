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
}
