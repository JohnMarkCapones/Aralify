import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Public, CurrentUser } from '../auth/decorators';
import {
  GamificationService,
  XpService,
  StreaksService,
  AchievementsService,
  BadgesService,
} from './services';
import {
  GamificationProfileDto,
  XpHistoryResponseDto,
  StreakInfoDto,
  ClaimDailyBonusResponseDto,
  AchievementsResponseDto,
  BadgesResponseDto,
  BadgeDisplayResponseDto,
  MilestonesResponseDto,
  LevelSystemInfoDto,
  GetXpHistoryQueryDto,
  GetAchievementsQueryDto,
  GetBadgesQueryDto,
  SetBadgeDisplayDto,
} from './dto';

@ApiTags('Gamification')
@Controller('api/v1/gamification')
export class GamificationController {
  constructor(
    private readonly gamificationService: GamificationService,
    private readonly xpService: XpService,
    private readonly streaksService: StreaksService,
    private readonly achievementsService: AchievementsService,
    private readonly badgesService: BadgesService,
  ) {}

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get full gamification profile for current user' })
  @ApiResponse({
    status: 200,
    description: 'Returns gamification profile with XP, streaks, achievements, and badges',
    type: GamificationProfileDto,
  })
  async getProfile(@CurrentUser() user: User) {
    return this.gamificationService.getProfile(user.id);
  }

  @Get('achievements')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all achievements with progress for current user' })
  @ApiResponse({
    status: 200,
    description: 'Returns achievements with progress and summary',
    type: AchievementsResponseDto,
  })
  async getAchievements(
    @CurrentUser() user: User,
    @Query() query: GetAchievementsQueryDto,
  ) {
    return this.achievementsService.getAchievements(user.id, {
      category: query.category,
      includeSecret: query.includeSecret,
    });
  }

  @Get('badges')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's earned badges" })
  @ApiResponse({
    status: 200,
    description: 'Returns badges grouped by rarity',
    type: BadgesResponseDto,
  })
  async getBadges(
    @CurrentUser() user: User,
    @Query() query: GetBadgesQueryDto,
  ) {
    return this.badgesService.getBadges(user.id, {
      displayedOnly: query.displayedOnly,
    });
  }

  @Post('badges/:id/display')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show badge on profile (max 5 displayed)' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Badge ID' })
  @ApiResponse({
    status: 200,
    description: 'Badge display status updated',
    type: BadgeDisplayResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Maximum badges already displayed' })
  @ApiResponse({ status: 404, description: 'Badge not found or not owned' })
  async displayBadge(
    @Param('id') badgeId: string,
    @CurrentUser() user: User,
    @Body() dto: SetBadgeDisplayDto,
  ) {
    return this.badgesService.setDisplayed(user.id, badgeId, dto.displayOrder);
  }

  @Delete('badges/:id/display')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hide badge from profile' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Badge ID' })
  @ApiResponse({
    status: 200,
    description: 'Badge removed from display',
    type: BadgeDisplayResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Badge not found or not owned' })
  async hideBadge(
    @Param('id') badgeId: string,
    @CurrentUser() user: User,
  ) {
    return this.badgesService.removeDisplay(user.id, badgeId);
  }

  @Get('streak')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get detailed streak information' })
  @ApiResponse({
    status: 200,
    description: 'Returns streak info with milestones and daily bonus status',
    type: StreakInfoDto,
  })
  async getStreakInfo(@CurrentUser() user: User) {
    return this.streaksService.getStreakInfo(user.id);
  }

  @Post('daily-claim')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Claim daily login bonus XP' })
  @ApiResponse({
    status: 200,
    description: 'Daily bonus claimed successfully or already claimed',
    type: ClaimDailyBonusResponseDto,
  })
  async claimDailyBonus(@CurrentUser() user: User) {
    return this.streaksService.claimDailyBonus(user.id);
  }

  @Get('xp-history')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get XP transaction history' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated XP transaction history',
    type: XpHistoryResponseDto,
  })
  async getXpHistory(
    @CurrentUser() user: User,
    @Query() query: GetXpHistoryQueryDto,
  ) {
    return this.xpService.getXpHistory(user.id, {
      limit: query.limit,
      offset: query.offset,
      source: query.source as any,
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
    });
  }

  @Get('levels')
  @Public()
  @ApiOperation({ summary: 'Get level system information (public)' })
  @ApiResponse({
    status: 200,
    description: 'Returns level formula, thresholds, ranks, and XP sources',
    type: LevelSystemInfoDto,
  })
  async getLevelSystemInfo() {
    return this.xpService.getLevelSystemInfo();
  }

  @Get('milestones')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get upcoming milestones and progress' })
  @ApiResponse({
    status: 200,
    description: 'Returns next level, streak milestone, and near-completion achievements',
    type: MilestonesResponseDto,
  })
  async getMilestones(@CurrentUser() user: User) {
    return this.gamificationService.getMilestones(user.id);
  }
}
