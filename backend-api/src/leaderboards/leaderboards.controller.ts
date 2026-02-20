import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Public, CurrentUser } from '../auth/decorators';
import { LeaderboardsService } from './leaderboards.service';
import {
  LeaderboardPaginationDto,
  MonthlyLeaderboardQueryDto,
  AroundUserQueryDto,
  GlobalLeaderboardResponseDto,
  FriendsLeaderboardResponseDto,
  WeeklyLeaderboardResponseDto,
  MonthlyLeaderboardResponseDto,
  CourseLeaderboardResponseDto,
  UserRanksResponseDto,
  AroundUserResponseDto,
} from './dto';

@ApiTags('Leaderboards')
@Controller('api/v1/leaderboards')
export class LeaderboardsController {
  constructor(private readonly leaderboardsService: LeaderboardsService) {}

  @Get('global')
  @Public()
  @ApiOperation({ summary: 'Get global all-time leaderboard' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns global leaderboard ranked by total XP',
    type: GlobalLeaderboardResponseDto,
  })
  async getGlobalLeaderboard(
    @Query() query: LeaderboardPaginationDto,
    @CurrentUser() user?: User,
  ): Promise<GlobalLeaderboardResponseDto> {
    return this.leaderboardsService.getGlobalLeaderboard(
      query.limit ?? 20,
      query.offset ?? 0,
      user?.id,
    );
  }

  @Get('friends')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get friends leaderboard (mutual follows)' })
  @ApiResponse({
    status: 200,
    description: 'Returns leaderboard of mutual friends ranked by total XP',
    type: FriendsLeaderboardResponseDto,
  })
  async getFriendsLeaderboard(
    @CurrentUser() user: User,
  ): Promise<FriendsLeaderboardResponseDto> {
    return this.leaderboardsService.getFriendsLeaderboard(user.id);
  }

  @Get('weekly')
  @Public()
  @ApiOperation({ summary: 'Get weekly leaderboard (XP earned this week)' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns weekly leaderboard ranked by XP earned since Monday UTC',
    type: WeeklyLeaderboardResponseDto,
  })
  async getWeeklyLeaderboard(
    @Query() query: LeaderboardPaginationDto,
    @CurrentUser() user?: User,
  ): Promise<WeeklyLeaderboardResponseDto> {
    return this.leaderboardsService.getWeeklyLeaderboard(
      query.limit ?? 20,
      user?.id,
    );
  }

  @Get('monthly')
  @Public()
  @ApiOperation({ summary: 'Get monthly leaderboard (XP earned in a month)' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns monthly leaderboard ranked by XP earned in the specified month',
    type: MonthlyLeaderboardResponseDto,
  })
  async getMonthlyLeaderboard(
    @Query() query: MonthlyLeaderboardQueryDto,
    @CurrentUser() user?: User,
  ): Promise<MonthlyLeaderboardResponseDto> {
    return this.leaderboardsService.getMonthlyLeaderboard(
      query.limit ?? 20,
      query.month,
      user?.id,
    );
  }

  @Get('course/:slug')
  @Public()
  @ApiOperation({ summary: 'Get course-specific leaderboard' })
  @ApiBearerAuth()
  @ApiParam({ name: 'slug', example: 'python-basics', description: 'Course slug' })
  @ApiResponse({
    status: 200,
    description: 'Returns course leaderboard ranked by course XP',
    type: CourseLeaderboardResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseLeaderboard(
    @Param('slug') slug: string,
    @Query() query: LeaderboardPaginationDto,
    @CurrentUser() user?: User,
  ): Promise<CourseLeaderboardResponseDto> {
    return this.leaderboardsService.getCourseLeaderboard(
      slug,
      query.limit ?? 20,
      user?.id,
    );
  }

  @Get('rank')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user rank across all leaderboards' })
  @ApiResponse({
    status: 200,
    description: 'Returns user rank on global, weekly, monthly, friends, and per-course boards',
    type: UserRanksResponseDto,
  })
  async getUserRanks(
    @CurrentUser() user: User,
  ): Promise<UserRanksResponseDto> {
    return this.leaderboardsService.getUserRanks(user.id);
  }

  @Get('around-user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users around current user on a leaderboard' })
  @ApiResponse({
    status: 200,
    description: 'Returns N users above and below the current user',
    type: AroundUserResponseDto,
  })
  async getAroundUser(
    @Query() query: AroundUserQueryDto,
    @CurrentUser() user: User,
  ): Promise<AroundUserResponseDto> {
    return this.leaderboardsService.getAroundUser(
      user.id,
      query.type ?? 'global',
      query.radius ?? 5,
    );
  }
}
