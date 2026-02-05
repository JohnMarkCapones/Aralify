import { Injectable } from '@nestjs/common';
import { ActivityType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocialRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ── Follow ──────────────────────────────────────────────

  async createFollow(followerId: string, followingId: string) {
    return this.prisma.follow.create({
      data: { followerId, followingId },
    });
  }

  async deleteFollow(followerId: string, followingId: string) {
    await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
  }

  async findFollowById(followerId: string, followingId: string) {
    return this.prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });
  }

  async getFollowStatus(userA: string, userB: string) {
    const [aFollowsB, bFollowsA] = await Promise.all([
      this.prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: userA, followingId: userB } },
      }),
      this.prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: userB, followingId: userA } },
      }),
    ]);

    return {
      isFollowing: !!aFollowsB,
      isFollowedBy: !!bFollowsA,
    };
  }

  // ── Followers / Following ──────────────────────────────

  async getFollowers(userId: string, limit: number, offset: number) {
    const [follows, total] = await Promise.all([
      this.prisma.follow.findMany({
        where: { followingId: userId },
        include: {
          follower: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              level: true,
              xpTotal: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.follow.count({ where: { followingId: userId } }),
    ]);

    return {
      users: follows.map((f) => f.follower),
      total,
    };
  }

  async getFollowing(userId: string, limit: number, offset: number) {
    const [follows, total] = await Promise.all([
      this.prisma.follow.findMany({
        where: { followerId: userId },
        include: {
          following: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              level: true,
              xpTotal: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.follow.count({ where: { followerId: userId } }),
    ]);

    return {
      users: follows.map((f) => f.following),
      total,
    };
  }

  async getFollowCounts(userId: string) {
    const [followersCount, followingCount] = await Promise.all([
      this.prisma.follow.count({ where: { followingId: userId } }),
      this.prisma.follow.count({ where: { followerId: userId } }),
    ]);

    return { followersCount, followingCount };
  }

  async getFollowingIds(userId: string): Promise<string[]> {
    const follows = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    return follows.map((f) => f.followingId);
  }

  // ── User Search ────────────────────────────────────────

  async searchUsers(query: string, limit: number, offset: number) {
    const where = {
      isActive: true,
      OR: [
        { username: { contains: query, mode: 'insensitive' as const } },
        { displayName: { contains: query, mode: 'insensitive' as const } },
      ],
      privacySettings: {
        profileVisibility: { not: 'PRIVATE' as const },
      },
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
          level: true,
          xpTotal: true,
        },
        orderBy: { username: 'asc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  // ── Activity ───────────────────────────────────────────

  async getActivityFeed(
    followingIds: string[],
    limit: number,
    offset: number,
    type?: ActivityType,
  ) {
    const where: any = {
      userId: { in: followingIds },
      user: {
        isActive: true,
        privacySettings: { showActivity: true },
      },
    };
    if (type) {
      where.type = type;
    }

    const [activities, total] = await Promise.all([
      this.prisma.activity.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              level: true,
              xpTotal: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.activity.count({ where }),
    ]);

    return { activities, total };
  }

  async getUserActivity(
    userId: string,
    limit: number,
    offset: number,
    type?: ActivityType,
  ) {
    const where: any = { userId };
    if (type) {
      where.type = type;
    }

    const [activities, total] = await Promise.all([
      this.prisma.activity.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              level: true,
              xpTotal: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.activity.count({ where }),
    ]);

    return { activities, total };
  }

  // ── Privacy / User Lookup ──────────────────────────────

  async getUserWithPrivacy(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: { privacySettings: true },
    });
  }

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        level: true,
        xpTotal: true,
        isActive: true,
      },
    });
  }
}
