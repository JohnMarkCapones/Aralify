import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, UserRole } from '@prisma/client';
import { PaginationParams, UserFilters } from '../types';

@Injectable()
export class AdminUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: {
    pagination: PaginationParams;
    filters?: UserFilters;
    sortBy?: 'createdAt' | 'lastActiveAt' | 'xpTotal' | 'username';
    sortOrder?: 'asc' | 'desc';
  }) {
    const { pagination, filters, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (filters?.search) {
      where.OR = [
        { username: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { displayName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.role) {
      where.role = filters.role;
    }

    if (filters?.isBanned !== undefined) {
      where.isBanned = filters.isBanned;
    }

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          username: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          role: true,
          xpTotal: true,
          level: true,
          streakCurrent: true,
          isVerified: true,
          isActive: true,
          isBanned: true,
          bannedAt: true,
          bannedUntil: true,
          banReason: true,
          createdAt: true,
          lastLoginAt: true,
          lastActiveAt: true,
          googleId: true,
          githubId: true,
          facebookId: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        role: true,
        xpTotal: true,
        level: true,
        streakCurrent: true,
        streakLongest: true,
        isVerified: true,
        isActive: true,
        isBanned: true,
        bannedAt: true,
        bannedUntil: true,
        banReason: true,
        bannedBy: true,
        createdAt: true,
        lastLoginAt: true,
        lastActiveAt: true,
        googleId: true,
        githubId: true,
        facebookId: true,
      },
    });
  }

  async findByIdWithStats(id: string) {
    const user = await this.findById(id);

    if (!user) {
      return null;
    }

    const [coursesStarted, coursesCompleted, lessonsCompleted, achievementsEarned, totalTimeSpent] =
      await Promise.all([
        this.prisma.userCourseProgress.count({
          where: { userId: id },
        }),
        this.prisma.userCourseProgress.count({
          where: { userId: id, completedAt: { not: null } },
        }),
        this.prisma.userLessonProgress.count({
          where: { userId: id, status: 'COMPLETED' },
        }),
        this.prisma.userAchievement.count({
          where: { userId: id },
        }),
        this.prisma.userCourseProgress.aggregate({
          where: { userId: id },
          _sum: { timeSpentSeconds: true },
        }),
      ]);

    return {
      ...user,
      coursesStarted,
      coursesCompleted,
      lessonsCompleted,
      achievementsEarned,
      totalTimeSpent: totalTimeSpent._sum.timeSpentSeconds || 0,
    };
  }

  async banUser(
    id: string,
    data: {
      banReason: string;
      bannedBy: string;
      bannedUntil?: Date;
    },
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isBanned: true,
        bannedAt: new Date(),
        banReason: data.banReason,
        bannedBy: data.bannedBy,
        bannedUntil: data.bannedUntil,
      },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        role: true,
        xpTotal: true,
        level: true,
        streakCurrent: true,
        isVerified: true,
        isActive: true,
        isBanned: true,
        bannedAt: true,
        bannedUntil: true,
        banReason: true,
        createdAt: true,
        lastLoginAt: true,
        lastActiveAt: true,
        googleId: true,
        githubId: true,
        facebookId: true,
      },
    });
  }

  async unbanUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isBanned: false,
        bannedAt: null,
        banReason: null,
        bannedBy: null,
        bannedUntil: null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        role: true,
        xpTotal: true,
        level: true,
        streakCurrent: true,
        isVerified: true,
        isActive: true,
        isBanned: true,
        bannedAt: true,
        bannedUntil: true,
        banReason: true,
        createdAt: true,
        lastLoginAt: true,
        lastActiveAt: true,
        googleId: true,
        githubId: true,
        facebookId: true,
      },
    });
  }

  async updateRole(id: string, role: UserRole) {
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        role: true,
        xpTotal: true,
        level: true,
        streakCurrent: true,
        isVerified: true,
        isActive: true,
        isBanned: true,
        bannedAt: true,
        bannedUntil: true,
        banReason: true,
        createdAt: true,
        lastLoginAt: true,
        lastActiveAt: true,
        googleId: true,
        githubId: true,
        facebookId: true,
      },
    });
  }

  async deleteUser(id: string) {
    // Soft delete by deactivating and anonymizing
    return this.prisma.user.update({
      where: { id },
      data: {
        isActive: false,
        email: `deleted_${id}@deleted.local`,
        username: `deleted_${id}`,
        displayName: 'Deleted User',
        avatarUrl: null,
        bio: null,
        passwordHash: null,
        googleId: null,
        githubId: null,
        facebookId: null,
      },
    });
  }

  async hardDeleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getRecentSignups(limit = 10) {
    return this.prisma.user.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        createdAt: true,
        googleId: true,
        githubId: true,
        facebookId: true,
      },
    });
  }

  async countNewUsers(since: Date) {
    return this.prisma.user.count({
      where: {
        createdAt: { gte: since },
      },
    });
  }

  async countActiveUsers(since: Date) {
    return this.prisma.user.count({
      where: {
        lastActiveAt: { gte: since },
      },
    });
  }

  async countBannedUsers() {
    return this.prisma.user.count({
      where: { isBanned: true },
    });
  }

  async countTotalUsers() {
    return this.prisma.user.count();
  }
}
