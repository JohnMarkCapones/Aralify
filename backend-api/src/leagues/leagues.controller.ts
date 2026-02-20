import { Controller, Get, NotFoundException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Public, CurrentUser } from '../auth/decorators';
import { LeaguesService } from './leagues.service';
import {
  UserLeagueInfoDto,
  LeagueGroupLeaderboardDto,
  LeagueHistoryEntryDto,
  LeagueTierInfoDto,
} from './dto/league-response.dto';

@ApiTags('Leagues')
@Controller('api/v1/leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user league info' })
  @ApiResponse({ status: 200, type: UserLeagueInfoDto })
  async getUserLeague(@CurrentUser() user: User): Promise<UserLeagueInfoDto> {
    // Ensure user is assigned to a league
    await this.leaguesService.ensureLeagueAssignment(user.id);
    const info = await this.leaguesService.getUserLeagueInfo(user.id);
    if (!info) {
      throw new NotFoundException('League assignment not found');
    }
    return info;
  }

  @Get('me/group')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get league group leaderboard' })
  @ApiResponse({ status: 200, type: LeagueGroupLeaderboardDto })
  async getLeagueGroupLeaderboard(
    @CurrentUser() user: User,
  ): Promise<LeagueGroupLeaderboardDto> {
    await this.leaguesService.ensureLeagueAssignment(user.id);
    const leaderboard = await this.leaguesService.getLeagueGroupLeaderboard(
      user.id,
    );
    if (!leaderboard) {
      throw new NotFoundException('League group not found');
    }
    return leaderboard;
  }

  @Get('me/history')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get league promotion/demotion history' })
  @ApiResponse({ status: 200, type: [LeagueHistoryEntryDto] })
  async getLeagueHistory(
    @CurrentUser() user: User,
  ): Promise<LeagueHistoryEntryDto[]> {
    return this.leaguesService.getLeagueHistory(user.id);
  }

  @Get('tiers')
  @Public()
  @ApiOperation({ summary: 'Get all league tiers info' })
  @ApiResponse({ status: 200, type: [LeagueTierInfoDto] })
  async getLeagueTiers(): Promise<LeagueTierInfoDto[]> {
    return this.leaguesService.getLeagueTiers();
  }
}
