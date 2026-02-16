import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeagueTier, LeagueAction, Prisma } from '@prisma/client';

@Injectable()
export class LeaguesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getLeagueByTier(tier: LeagueTier) {
    return this.prisma.league.findUnique({ where: { tier } });
  }

  async getAllLeagues() {
    return this.prisma.league.findMany({
      orderBy: { minRank: 'asc' },
    });
  }

  async getUserLeague(userId: string) {
    return this.prisma.userLeague.findUnique({
      where: { userId },
      include: { league: true },
    });
  }

  async assignUserToLeague(userId: string, leagueId: string, groupId: string) {
    return this.prisma.userLeague.upsert({
      where: { userId },
      update: {
        leagueId,
        groupId,
        weeklyXp: 0,
        joinedAt: new Date(),
      },
      create: {
        userId,
        leagueId,
        groupId,
        weeklyXp: 0,
      },
      include: { league: true },
    });
  }

  async getLeagueGroupRankings(leagueId: string, groupId: string) {
    return this.prisma.userLeague.findMany({
      where: { leagueId, groupId },
      orderBy: { weeklyXp: 'desc' },
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
  }

  async resetAllWeeklyXp() {
    return this.prisma.userLeague.updateMany({
      data: { weeklyXp: 0 },
    });
  }

  async incrementWeeklyXp(userId: string, amount: number) {
    return this.prisma.userLeague.update({
      where: { userId },
      data: { weeklyXp: { increment: amount } },
    });
  }

  async moveUserToLeague(userId: string, newLeagueId: string, newGroupId: string) {
    return this.prisma.userLeague.update({
      where: { userId },
      data: {
        leagueId: newLeagueId,
        groupId: newGroupId,
        weeklyXp: 0,
        joinedAt: new Date(),
      },
    });
  }

  async createLeagueHistory(data: {
    userId: string;
    fromTier: LeagueTier;
    toTier: LeagueTier;
    weekStart: Date;
    weekEnd: Date;
    finalRank: number;
    weeklyXp: number;
    action: LeagueAction;
  }) {
    return this.prisma.leagueHistory.create({ data });
  }

  async getLeagueHistory(userId: string, limit: number = 20) {
    return this.prisma.leagueHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Get all distinct group IDs for a given league.
   */
  async getLeagueGroups(leagueId: string): Promise<string[]> {
    const groups = await this.prisma.userLeague.findMany({
      where: { leagueId },
      select: { groupId: true },
      distinct: ['groupId'],
    });
    return groups.map((g) => g.groupId);
  }

  /**
   * Find a group with available space, or generate a new group ID.
   */
  async getAvailableGroupId(leagueId: string, maxSize: number): Promise<string> {
    const groups = await this.prisma.userLeague.groupBy({
      by: ['groupId'],
      where: { leagueId },
      _count: true,
    });

    // Find a group with space
    for (const group of groups) {
      if (group._count < maxSize) {
        return group.groupId;
      }
    }

    // Create new group ID
    const nextNum = groups.length + 1;
    return `grp_${nextNum}`;
  }

  async getGroupMemberCount(leagueId: string, groupId: string): Promise<number> {
    return this.prisma.userLeague.count({
      where: { leagueId, groupId },
    });
  }
}
