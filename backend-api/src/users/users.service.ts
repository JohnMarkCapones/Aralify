import { Injectable, NotFoundException } from '@nestjs/common';
import { Difficulty, ProfileVisibility, AllowMessages } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UpdateProfileDto, UpdateSettingsDto } from './dto';
import {
  UserProfileDto,
  PublicUserProfileDto,
  UserSettingsDto,
  UserStatsDto,
  PublicUserStatsDto,
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
