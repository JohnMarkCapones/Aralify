import { Injectable, NotFoundException } from '@nestjs/common';
import { Difficulty, ProfileVisibility, AllowMessages, SkillLevel } from '@prisma/client';
import { UsersRepository } from './users.repository';
import {
  UpdateProfileDto,
  UpdateSettingsDto,
  CompleteOnboardingDto,
  OnboardingStatusDto,
} from './dto';
import {
  UserProfileDto,
  PublicUserProfileDto,
  UserSettingsDto,
  UserStatsDto,
  PublicUserStatsDto,
  UserCourseDto,
  UserDetailedStatsDto,
  UserCertificateDto,
  ChallengeHistoryItemDto,
  UserActivityDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // ============================================================================
  // Profile Operations
  // ============================================================================

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatUserProfile(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserProfileDto> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.usersRepository.updateProfile(userId, {
      displayName: dto.displayName,
      bio: dto.bio,
      locale: dto.locale,
      timezone: dto.timezone,
    });

    return this.formatUserProfile(updatedUser);
  }

  async getPublicProfile(
    username: string,
    viewerId?: string,
  ): Promise<PublicUserProfileDto> {
    const user = await this.usersRepository.findByUsernameWithSettings(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const privacySettings = user.privacySettings;
    const canView = await this.canViewProfile(viewerId, user.id, privacySettings);

    if (!canView) {
      throw new NotFoundException('User not found');
    }

    return this.formatPublicProfile(user, privacySettings);
  }

  // ============================================================================
  // Settings Operations
  // ============================================================================

  async getSettings(userId: string): Promise<UserSettingsDto> {
    const user = await this.usersRepository.findByIdWithSettings(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatUserSettings(user);
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto): Promise<UserSettingsDto> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Extract settings by category
    const userSettingsData: {
      theme?: string;
      codeEditorTheme?: string;
      fontSize?: number;
      dailyGoalMins?: number;
      difficultyPref?: Difficulty;
    } = {};

    const notificationSettingsData: {
      emailEnabled?: boolean;
      pushEnabled?: boolean;
      streakReminders?: boolean;
      achievementNotifs?: boolean;
      socialNotifs?: boolean;
    } = {};

    const privacySettingsData: {
      profileVisibility?: ProfileVisibility;
      showProgress?: boolean;
      showActivity?: boolean;
      allowMessages?: AllowMessages;
    } = {};

    // Map user settings
    if (dto.theme !== undefined) userSettingsData.theme = dto.theme;
    if (dto.codeEditorTheme !== undefined)
      userSettingsData.codeEditorTheme = dto.codeEditorTheme;
    if (dto.fontSize !== undefined) userSettingsData.fontSize = dto.fontSize;
    if (dto.dailyGoalMins !== undefined)
      userSettingsData.dailyGoalMins = dto.dailyGoalMins;
    if (dto.difficultyPref !== undefined)
      userSettingsData.difficultyPref = dto.difficultyPref as Difficulty;

    // Map notification settings
    if (dto.emailEnabled !== undefined)
      notificationSettingsData.emailEnabled = dto.emailEnabled;
    if (dto.pushEnabled !== undefined)
      notificationSettingsData.pushEnabled = dto.pushEnabled;
    if (dto.streakReminders !== undefined)
      notificationSettingsData.streakReminders = dto.streakReminders;
    if (dto.achievementNotifs !== undefined)
      notificationSettingsData.achievementNotifs = dto.achievementNotifs;
    if (dto.socialNotifs !== undefined)
      notificationSettingsData.socialNotifs = dto.socialNotifs;

    // Map privacy settings
    if (dto.profileVisibility !== undefined)
      privacySettingsData.profileVisibility = dto.profileVisibility as ProfileVisibility;
    if (dto.showProgress !== undefined)
      privacySettingsData.showProgress = dto.showProgress;
    if (dto.showActivity !== undefined)
      privacySettingsData.showActivity = dto.showActivity;
    if (dto.allowMessages !== undefined)
      privacySettingsData.allowMessages = dto.allowMessages as AllowMessages;

    // Update each settings table if there are changes
    if (Object.keys(userSettingsData).length > 0) {
      await this.usersRepository.updateUserSettings(userId, userSettingsData);
    }

    if (Object.keys(notificationSettingsData).length > 0) {
      await this.usersRepository.updateNotificationSettings(
        userId,
        notificationSettingsData,
      );
    }

    if (Object.keys(privacySettingsData).length > 0) {
      await this.usersRepository.updatePrivacySettings(userId, privacySettingsData);
    }

    // Fetch and return updated settings
    const updatedUser = await this.usersRepository.findByIdWithSettings(userId);
    return this.formatUserSettings(updatedUser!);
  }

  // ============================================================================
  // Stats Operations
  // ============================================================================

  async getStats(userId: string): Promise<UserStatsDto> {
    const stats = await this.usersRepository.getUserStats(userId);

    if (!stats) {
      throw new NotFoundException('User not found');
    }

    return stats;
  }

  async getPublicStats(
    username: string,
    viewerId?: string,
  ): Promise<PublicUserStatsDto> {
    const user = await this.usersRepository.findByUsernameWithSettings(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const privacySettings = user.privacySettings;
    const canView = await this.canViewProfile(viewerId, user.id, privacySettings);

    if (!canView) {
      throw new NotFoundException('User not found');
    }

    const stats = await this.usersRepository.getUserStats(user.id);

    if (!stats) {
      throw new NotFoundException('User not found');
    }

    return this.formatPublicStats(stats, privacySettings);
  }

  // ============================================================================
  // Onboarding Operations
  // ============================================================================

  async getOnboardingStatus(userId: string): Promise<OnboardingStatusDto> {
    const status = await this.usersRepository.getOnboardingStatus(userId);

    if (!status) {
      throw new NotFoundException('User not found');
    }

    return {
      onboardingCompleted: status.onboardingCompleted,
      onboardingStep: status.onboardingStep,
    };
  }

  async completeOnboarding(
    userId: string,
    dto: CompleteOnboardingDto,
  ): Promise<{ success: boolean; xpAwarded: number }> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const avatarUrl = dto.avatarPreset
      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.avatarPreset}`
      : undefined;

    await this.usersRepository.completeOnboarding(userId, {
      displayName: dto.displayName,
      avatarUrl,
      skillLevel: dto.skillLevel as SkillLevel,
      interestedLanguages: dto.interestedLanguages,
      learningGoals: dto.learningGoals,
      dailyCommitmentMins: dto.dailyCommitmentMins,
    });

    return { success: true, xpAwarded: 100 };
  }

  async skipOnboarding(userId: string): Promise<{ success: boolean }> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.skipOnboarding(userId);

    return { success: true };
  }

  // ============================================================================
  // User Courses
  // ============================================================================

  async getUserCourses(userId: string): Promise<UserCourseDto[]> {
    const progress = await this.usersRepository.getUserCourses(userId);

    return progress.map((p) => ({
      id: p.course.id,
      slug: p.course.slug,
      title: p.course.title,
      description: p.course.description,
      language: p.course.language,
      iconUrl: p.course.iconUrl,
      color: p.course.color,
      completionPercentage: p.completionPercentage,
      totalXpEarned: p.totalXpEarned,
      lastActivityAt: p.lastActivityAt?.toISOString() ?? null,
      startedAt: p.startedAt.toISOString(),
      completedAt: p.completedAt?.toISOString() ?? null,
    }));
  }

  // ============================================================================
  // Detailed Stats
  // ============================================================================

  async getDetailedStats(userId: string, range: string): Promise<UserDetailedStatsDto> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const days = range === '30d' ? 30 : 7;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [xpTransactions, difficultyBreakdown, timeSpent, lessonsCompleted] =
      await Promise.all([
        this.usersRepository.getXpOverTime(userId, since),
        this.usersRepository.getDifficultyBreakdown(userId),
        this.usersRepository.getTimeSpentInRange(userId, since),
        this.usersRepository.getUserStats(userId),
      ]);

    // Group XP by date
    const xpByDate = new Map<string, number>();
    for (const tx of xpTransactions) {
      const dateKey = tx.createdAt.toISOString().split('T')[0];
      xpByDate.set(dateKey, (xpByDate.get(dateKey) || 0) + tx.amount);
    }

    const xpOverTime = Array.from(xpByDate.entries()).map(([date, xp]) => ({
      date,
      xp,
    }));

    return {
      xpOverTime,
      difficultyBreakdown,
      averageTimePerDayMins: Math.round(timeSpent / 60 / days),
      totalXp: user.xpTotal,
      lessonsCompleted: lessonsCompleted?.lessonsCompleted ?? 0,
      currentStreak: user.streakCurrent,
    };
  }

  // ============================================================================
  // Certificates
  // ============================================================================

  async getCertificates(userId: string): Promise<UserCertificateDto[]> {
    const completed = await this.usersRepository.getCompletedCourses(userId);

    return completed.map((p) => ({
      courseId: p.course.id,
      courseSlug: p.course.slug,
      courseTitle: p.course.title,
      completedAt: p.completedAt!.toISOString(),
      totalXpEarned: p.totalXpEarned,
    }));
  }

  // ============================================================================
  // Challenge History
  // ============================================================================

  async getChallengeHistory(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ data: ChallengeHistoryItemDto[]; total: number }> {
    const result = await this.usersRepository.getChallengeHistory(userId, page, limit);

    return {
      data: result.data.map((s) => ({
        id: s.id,
        challengeId: s.challenge.id,
        challengeTitle: s.challenge.title,
        status: s.status,
        attemptNumber: s.attemptNumber,
        xpAwarded: s.xpAwarded,
        createdAt: s.createdAt.toISOString(),
      })),
      total: result.total,
    };
  }

  // ============================================================================
  // Activities
  // ============================================================================

  async getUserActivities(
    userId: string,
    options: { type?: string; page: number; limit: number },
  ): Promise<{ data: UserActivityDto[]; total: number }> {
    const result = await this.usersRepository.getUserActivities(userId, options);

    return {
      data: result.data.map((a) => ({
        id: a.id,
        type: a.type,
        data: a.data,
        createdAt: a.createdAt.toISOString(),
      })),
      total: result.total,
    };
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  private async canViewProfile(
    viewerId: string | undefined,
    targetUserId: string,
    privacySettings: { profileVisibility: ProfileVisibility } | null,
  ): Promise<boolean> {
    // Default to PUBLIC if no privacy settings exist
    const visibility = privacySettings?.profileVisibility ?? ProfileVisibility.PUBLIC;

    if (visibility === ProfileVisibility.PUBLIC) {
      return true;
    }

    if (visibility === ProfileVisibility.PRIVATE) {
      return viewerId === targetUserId;
    }

    if (visibility === ProfileVisibility.FRIENDS_ONLY) {
      if (!viewerId) return false;
      if (viewerId === targetUserId) return true;
      return this.usersRepository.isFollowing(viewerId, targetUserId);
    }

    return false;
  }

  private formatUserProfile(user: any): UserProfileDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      locale: user.locale ?? 'en',
      timezone: user.timezone,
      xpTotal: user.xpTotal,
      level: user.level,
      streakCurrent: user.streakCurrent,
      streakLongest: user.streakLongest,
      role: user.role,
      isVerified: user.isVerified,
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt.toISOString(),
      lastActiveAt: user.lastActiveAt?.toISOString() ?? null,
    };
  }

  private formatPublicProfile(
    user: any,
    privacySettings: { showProgress?: boolean; showActivity?: boolean } | null,
  ): PublicUserProfileDto {
    const showProgress = privacySettings?.showProgress ?? true;
    const showActivity = privacySettings?.showActivity ?? true;

    return {
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      bio: showActivity ? user.bio : null,
      xpTotal: showProgress ? user.xpTotal : null,
      level: showProgress ? user.level : null,
      streakCurrent: showProgress ? user.streakCurrent : null,
      createdAt: user.createdAt.toISOString(),
    };
  }

  private formatUserSettings(user: any): UserSettingsDto {
    const settings = user.settings;
    const notificationSettings = user.notificationSettings;
    const privacySettings = user.privacySettings;

    return {
      theme: settings?.theme ?? 'auto',
      codeEditorTheme: settings?.codeEditorTheme ?? 'vs-dark',
      fontSize: settings?.fontSize ?? 14,
      dailyGoalMins: settings?.dailyGoalMins ?? 30,
      difficultyPref: settings?.difficultyPref ?? 'MEDIUM',
      notifications: {
        emailEnabled: notificationSettings?.emailEnabled ?? true,
        pushEnabled: notificationSettings?.pushEnabled ?? true,
        streakReminders: notificationSettings?.streakReminders ?? true,
        achievementNotifs: notificationSettings?.achievementNotifs ?? true,
        socialNotifs: notificationSettings?.socialNotifs ?? true,
      },
      privacy: {
        profileVisibility: privacySettings?.profileVisibility ?? 'PUBLIC',
        showProgress: privacySettings?.showProgress ?? true,
        showActivity: privacySettings?.showActivity ?? true,
        allowMessages: privacySettings?.allowMessages ?? 'EVERYONE',
      },
    };
  }

  private formatPublicStats(
    stats: any,
    privacySettings: { showProgress?: boolean } | null,
  ): PublicUserStatsDto {
    const showProgress = privacySettings?.showProgress ?? true;

    if (!showProgress) {
      return {
        xpTotal: null,
        level: null,
        coursesCompleted: null,
        achievementsEarned: null,
      };
    }

    return {
      xpTotal: stats.xpTotal,
      level: stats.level,
      coursesCompleted: stats.coursesCompleted,
      achievementsEarned: stats.achievementsEarned,
    };
  }
}
