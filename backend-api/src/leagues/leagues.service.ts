import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LeagueTier, LeagueAction } from '@prisma/client';
import { LeaguesRepository } from './leagues.repository';
import {
  LEAGUE_CONFIG,
  LEAGUE_TIERS,
  getNextTier,
  getPreviousTier,
} from './constants/league.constants';
import {
  UserLeagueInfoDto,
  LeagueGroupLeaderboardDto,
  LeagueGroupEntryDto,
  LeagueHistoryEntryDto,
  LeagueTierInfoDto,
} from './dto/league-response.dto';

export interface PromotionResult {
  promoted: number;
  demoted: number;
  stayed: number;
}

@Injectable()
export class LeaguesService {
  private readonly logger = new Logger(LeaguesService.name);

  constructor(private readonly repository: LeaguesRepository) {}

  /**
   * Get the current user's league info.
   */
  async getUserLeagueInfo(userId: string): Promise<UserLeagueInfoDto | null> {
    const userLeague = await this.repository.getUserLeague(userId);
    if (!userLeague) return null;

    // Get rank in group
    const groupRankings = await this.repository.getLeagueGroupRankings(
      userLeague.leagueId,
      userLeague.groupId,
    );
    const userIndex = groupRankings.findIndex((r) => r.userId === userId);
    const rankInGroup = userIndex >= 0 ? userIndex + 1 : 0;

    return {
      tier: userLeague.league.tier,
      name: userLeague.league.name,
      description: userLeague.league.description,
      iconUrl: userLeague.league.iconUrl,
      weeklyXp: userLeague.weeklyXp,
      rankInGroup,
      groupSize: groupRankings.length,
      groupId: userLeague.groupId,
    };
  }

  /**
   * Ensure a user is assigned to a league. New users start in BRONZE.
   */
  async ensureLeagueAssignment(userId: string) {
    const existing = await this.repository.getUserLeague(userId);
    if (existing) return existing;

    const bronzeLeague = await this.repository.getLeagueByTier(LeagueTier.BRONZE);
    if (!bronzeLeague) {
      this.logger.warn('Bronze league not found. Leagues may not be seeded.');
      return null;
    }

    const groupId = await this.repository.getAvailableGroupId(
      bronzeLeague.id,
      LEAGUE_CONFIG.GROUP_SIZE,
    );

    return this.repository.assignUserToLeague(userId, bronzeLeague.id, groupId);
  }

  /**
   * Get the league group leaderboard for a user's current group.
   */
  async getLeagueGroupLeaderboard(
    userId: string,
  ): Promise<LeagueGroupLeaderboardDto | null> {
    const userLeague = await this.repository.getUserLeague(userId);
    if (!userLeague) return null;

    const groupRankings = await this.repository.getLeagueGroupRankings(
      userLeague.leagueId,
      userLeague.groupId,
    );

    const rankings: LeagueGroupEntryDto[] = groupRankings.map((entry, index) => ({
      rank: index + 1,
      userId: entry.user.id,
      username: entry.user.username,
      displayName: entry.user.displayName,
      avatarUrl: entry.user.avatarUrl,
      weeklyXp: entry.weeklyXp,
      level: entry.user.level,
      isCurrentUser: entry.user.id === userId,
    }));

    const userRank = rankings.find((r) => r.isCurrentUser)?.rank ?? 0;

    return {
      rankings,
      tier: userLeague.league.tier,
      groupId: userLeague.groupId,
      userRank,
    };
  }

  /**
   * Add weekly XP for a user. Called via event listener.
   */
  async addWeeklyXp(userId: string, amount: number) {
    try {
      await this.repository.incrementWeeklyXp(userId, amount);
    } catch {
      // User may not have a league assignment yet — assign them first
      await this.ensureLeagueAssignment(userId);
      try {
        await this.repository.incrementWeeklyXp(userId, amount);
      } catch {
        this.logger.warn(`Failed to increment weekly XP for user ${userId}`);
      }
    }
  }

  /**
   * Listen for XP awarded events and update weekly XP.
   */
  @OnEvent('xp.awarded')
  async handleXpAwarded(payload: { userId: string; amount: number }) {
    await this.addWeeklyXp(payload.userId, payload.amount);
  }

  /**
   * Process weekly promotions and demotions across all leagues.
   */
  async processWeeklyPromotions(): Promise<PromotionResult> {
    const leagues = await this.repository.getAllLeagues();
    const leagueByTier = new Map(leagues.map((l) => [l.tier, l]));

    const now = new Date();
    const weekEnd = new Date(now);
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);

    let promoted = 0;
    let demoted = 0;
    let stayed = 0;

    // Process each league
    for (const league of leagues) {
      const groups = await this.repository.getLeagueGroups(league.id);

      for (const groupId of groups) {
        const rankings = await this.repository.getLeagueGroupRankings(
          league.id,
          groupId,
        );

        if (rankings.length === 0) continue;

        const nextTier = getNextTier(league.tier);
        const prevTier = getPreviousTier(league.tier);

        for (let i = 0; i < rankings.length; i++) {
          const rank = i + 1;
          const entry = rankings[i];
          let action: LeagueAction = LeagueAction.STAYED;

          // Top N promote (except CHAMPION)
          if (rank <= LEAGUE_CONFIG.PROMOTION_SLOTS && nextTier) {
            const nextLeague = leagueByTier.get(nextTier);
            if (nextLeague) {
              const newGroupId = await this.repository.getAvailableGroupId(
                nextLeague.id,
                LEAGUE_CONFIG.GROUP_SIZE,
              );
              await this.repository.moveUserToLeague(
                entry.userId,
                nextLeague.id,
                newGroupId,
              );
              action = LeagueAction.PROMOTED;
              promoted++;
            }
          }
          // Bottom N demote (except BRONZE)
          else if (
            rank > rankings.length - LEAGUE_CONFIG.DEMOTION_SLOTS &&
            prevTier
          ) {
            const prevLeague = leagueByTier.get(prevTier);
            if (prevLeague) {
              const newGroupId = await this.repository.getAvailableGroupId(
                prevLeague.id,
                LEAGUE_CONFIG.GROUP_SIZE,
              );
              await this.repository.moveUserToLeague(
                entry.userId,
                prevLeague.id,
                newGroupId,
              );
              action = LeagueAction.DEMOTED;
              demoted++;
            }
          } else {
            stayed++;
          }

          // Record history
          const toTier =
            action === LeagueAction.PROMOTED
              ? nextTier!
              : action === LeagueAction.DEMOTED
                ? prevTier!
                : league.tier;

          await this.repository.createLeagueHistory({
            userId: entry.userId,
            fromTier: league.tier,
            toTier,
            weekStart,
            weekEnd,
            finalRank: rank,
            weeklyXp: entry.weeklyXp,
            action,
          });
        }
      }
    }

    // Reset all weekly XP after processing
    await this.repository.resetAllWeeklyXp();

    this.logger.log(
      `Weekly promotions processed: ${promoted} promoted, ${demoted} demoted, ${stayed} stayed`,
    );

    return { promoted, demoted, stayed };
  }

  /**
   * Get league history for a user.
   */
  async getLeagueHistory(userId: string): Promise<LeagueHistoryEntryDto[]> {
    const history = await this.repository.getLeagueHistory(userId);
    return history.map((h) => ({
      fromTier: h.fromTier,
      toTier: h.toTier,
      action: h.action,
      finalRank: h.finalRank,
      weeklyXp: h.weeklyXp,
      weekStart: h.weekStart.toISOString(),
      weekEnd: h.weekEnd.toISOString(),
      createdAt: h.createdAt.toISOString(),
    }));
  }

  /**
   * Get all league tier info (public).
   */
  async getLeagueTiers(): Promise<LeagueTierInfoDto[]> {
    return LEAGUE_TIERS.map((t) => ({
      tier: t.tier,
      name: t.name,
      description: t.description,
      iconUrl: t.iconUrl,
    }));
  }
}
