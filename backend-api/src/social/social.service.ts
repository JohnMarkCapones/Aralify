import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActivityType, ProfileVisibility, PrivacySettings } from '@prisma/client';
import { SocialRepository } from './social.repository';
import {
  ActivityEntryDto,
  ActivityFeedResponseDto,
  FollowListResponseDto,
  FollowResponseDto,
  FollowStatusDto,
  UserSearchResponseDto,
  UserSummaryDto,
} from './dto';

const DEFAULT_LIMIT = 20;

@Injectable()
export class SocialService {
  constructor(private readonly socialRepository: SocialRepository) {}

  // ── Follow / Unfollow ──────────────────────────────────

  async followUser(
    followerId: string,
    targetUserId: string,
  ): Promise<FollowResponseDto> {
    if (followerId === targetUserId) {
      throw new BadRequestException('Cannot follow yourself');
    }

    const targetUser = await this.socialRepository.getUserById(targetUserId);
    if (!targetUser || !targetUser.isActive) {
      throw new NotFoundException('User not found');
    }

    const existing = await this.socialRepository.findFollowById(
      followerId,
      targetUserId,
    );
    if (!existing) {
      await this.socialRepository.createFollow(followerId, targetUserId);
    }

    const followStatus = await this.socialRepository.getFollowStatus(
      followerId,
      targetUserId,
    );

    return { success: true, followStatus };
  }

  async unfollowUser(
    followerId: string,
    targetUserId: string,
  ): Promise<FollowResponseDto> {
    await this.socialRepository.deleteFollow(followerId, targetUserId);

    const followStatus = await this.socialRepository.getFollowStatus(
      followerId,
      targetUserId,
    );

    return { success: true, followStatus };
  }

  async getFollowStatus(
    userId: string,
    targetUserId: string,
  ): Promise<FollowStatusDto> {
    return this.socialRepository.getFollowStatus(userId, targetUserId);
  }

  // ── Own Followers / Following ──────────────────────────

  async getFollowers(
    userId: string,
    limit?: number,
    offset?: number,
  ): Promise<FollowListResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;

    const { users, total } = await this.socialRepository.getFollowers(
      userId,
      l,
      o,
    );

    return {
      users: users.map((u) => this.formatUserSummary(u)),
      total,
      limit: l,
      offset: o,
    };
  }

  async getFollowing(
    userId: string,
    limit?: number,
    offset?: number,
  ): Promise<FollowListResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;

    const { users, total } = await this.socialRepository.getFollowing(
      userId,
      l,
      o,
    );

    return {
      users: users.map((u) => this.formatUserSummary(u)),
      total,
      limit: l,
      offset: o,
    };
  }

  // ── Public Followers / Following (privacy-aware) ───────

  async getUserFollowers(
    username: string,
    viewerId: string | undefined,
    limit?: number,
    offset?: number,
  ): Promise<FollowListResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;

    const targetUser = await this.socialRepository.getUserWithPrivacy(username);
    if (!targetUser || !targetUser.isActive) {
      throw new NotFoundException('User not found');
    }

    const canView = await this.canViewProfile(viewerId, targetUser.id, targetUser.privacySettings);
    if (!canView) {
      throw new NotFoundException('User not found');
    }

    const { users, total } = await this.socialRepository.getFollowers(
      targetUser.id,
      l,
      o,
    );

    return {
      users: users.map((u) => this.formatUserSummary(u)),
      total,
      limit: l,
      offset: o,
    };
  }

  async getUserFollowing(
    username: string,
    viewerId: string | undefined,
    limit?: number,
    offset?: number,
  ): Promise<FollowListResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;

    const targetUser = await this.socialRepository.getUserWithPrivacy(username);
    if (!targetUser || !targetUser.isActive) {
      throw new NotFoundException('User not found');
    }

    const canView = await this.canViewProfile(viewerId, targetUser.id, targetUser.privacySettings);
    if (!canView) {
      throw new NotFoundException('User not found');
    }

    const { users, total } = await this.socialRepository.getFollowing(
      targetUser.id,
      l,
      o,
    );

    return {
      users: users.map((u) => this.formatUserSummary(u)),
      total,
      limit: l,
      offset: o,
    };
  }

  // ── Search ─────────────────────────────────────────────

  async searchUsers(
    query: string,
    limit?: number,
    offset?: number,
  ): Promise<UserSearchResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;

    const { users, total } = await this.socialRepository.searchUsers(
      query,
      l,
      o,
    );

    return {
      users: users.map((u) => this.formatUserSummary(u)),
      total,
      limit: l,
      offset: o,
    };
  }

  // ── Activity Feed ──────────────────────────────────────

  async getActivityFeed(
    userId: string,
    limit?: number,
    offset?: number,
    type?: ActivityType,
  ): Promise<ActivityFeedResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;

    const followingIds =
      await this.socialRepository.getFollowingIds(userId);

    if (followingIds.length === 0) {
      return { activities: [], total: 0, limit: l, offset: o };
    }

    const { activities, total } =
      await this.socialRepository.getActivityFeed(followingIds, l, o, type);

    return {
      activities: activities.map((a) => this.formatActivity(a)),
      total,
      limit: l,
      offset: o,
    };
  }

  async getUserActivity(
    username: string,
    viewerId: string | undefined,
    limit?: number,
    offset?: number,
    type?: ActivityType,
  ): Promise<ActivityFeedResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;

    const targetUser = await this.socialRepository.getUserWithPrivacy(username);
    if (!targetUser || !targetUser.isActive) {
      throw new NotFoundException('User not found');
    }

    const canView = await this.canViewProfile(viewerId, targetUser.id, targetUser.privacySettings);
    if (!canView) {
      throw new NotFoundException('User not found');
    }

    if (!targetUser.privacySettings?.showActivity) {
      return { activities: [], total: 0, limit: l, offset: o };
    }

    const { activities, total } =
      await this.socialRepository.getUserActivity(targetUser.id, l, o, type);

    return {
      activities: activities.map((a) => this.formatActivity(a)),
      total,
      limit: l,
      offset: o,
    };
  }

  // ── Private Helpers ────────────────────────────────────

  private async canViewProfile(
    viewerId: string | undefined,
    targetUserId: string,
    privacySettings: PrivacySettings | null,
  ): Promise<boolean> {
    if (viewerId === targetUserId) {
      return true;
    }

    const visibility =
      privacySettings?.profileVisibility ?? ProfileVisibility.PUBLIC;

    switch (visibility) {
      case ProfileVisibility.PUBLIC:
        return true;

      case ProfileVisibility.FRIENDS_ONLY:
        // Viewer must be authenticated and be a follower of the target
        if (!viewerId) {
          return false;
        }
        const follow = await this.socialRepository.findFollowById(
          viewerId,
          targetUserId,
        );
        return !!follow;

      case ProfileVisibility.PRIVATE:
        return false;

      default:
        return false;
    }
  }

  private formatUserSummary(user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    level: number;
    xpTotal: number;
  }): UserSummaryDto {
    return {
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      level: user.level,
      xpTotal: user.xpTotal,
    };
  }

  private formatActivity(activity: {
    id: string;
    type: string;
    data: any;
    createdAt: Date;
    user: {
      id: string;
      username: string;
      displayName: string | null;
      avatarUrl: string | null;
      level: number;
      xpTotal: number;
    };
  }): ActivityEntryDto {
    return {
      id: activity.id,
      type: activity.type,
      data: activity.data,
      user: this.formatUserSummary(activity.user),
      createdAt: activity.createdAt.toISOString(),
    };
  }
}
