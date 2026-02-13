import { Controller, Get, Put, Param, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { Public, CurrentUser } from '../auth/decorators';
import {
  UserProfileDto,
  PublicUserProfileDto,
  UserSettingsDto,
  UserStatsDto,
  PublicUserStatsDto,
  UpdateProfileDto,
  UpdateSettingsDto,
  CompleteOnboardingDto,
  OnboardingStatusDto,
  UserCourseDto,
  UserDetailedStatsDto,
  UserCertificateDto,
  ChallengeHistoryItemDto,
  UserActivityDto,
} from './dto';

@ApiTags('Users')
@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ============================================================================
  // Authenticated User Endpoints (/api/v1/user/*)
  // ============================================================================

  @Get('user/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get authenticated user's full profile" })
  @ApiResponse({
    status: 200,
    description: 'Returns the full user profile',
    type: UserProfileDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@CurrentUser() user: User): Promise<UserProfileDto> {
    return this.usersService.getProfile(user.id);
  }

  @Put('user/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile (displayName, bio, locale, timezone)' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user profile',
    type: UserProfileDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @CurrentUser() user: User,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserProfileDto> {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Get('user/settings')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user settings (theme, notifications, privacy)' })
  @ApiResponse({
    status: 200,
    description: 'Returns combined user settings',
    type: UserSettingsDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getSettings(@CurrentUser() user: User): Promise<UserSettingsDto> {
    return this.usersService.getSettings(user.id);
  }

  @Put('user/settings')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user settings' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user settings',
    type: UserSettingsDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateSettings(
    @CurrentUser() user: User,
    @Body() dto: UpdateSettingsDto,
  ): Promise<UserSettingsDto> {
    return this.usersService.updateSettings(user.id, dto);
  }

  @Get('user/stats')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get detailed user statistics' })
  @ApiResponse({
    status: 200,
    description: 'Returns aggregated user statistics',
    type: UserStatsDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getStats(@CurrentUser() user: User): Promise<UserStatsDto> {
    return this.usersService.getStats(user.id);
  }

  @Get('user/courses')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get enrolled courses with progress' })
  @ApiResponse({ status: 200, description: 'Returns enrolled courses', type: [UserCourseDto] })
  async getUserCourses(@CurrentUser() user: User): Promise<UserCourseDto[]> {
    return this.usersService.getUserCourses(user.id);
  }

  @Get('user/stats/detailed')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get detailed stats (XP over time, difficulty breakdown)' })
  @ApiQuery({ name: 'range', required: false, enum: ['7d', '30d'], example: '7d' })
  @ApiResponse({ status: 200, description: 'Returns detailed statistics', type: UserDetailedStatsDto })
  async getDetailedStats(
    @CurrentUser() user: User,
    @Query('range') range?: string,
  ): Promise<UserDetailedStatsDto> {
    return this.usersService.getDetailedStats(user.id, range || '7d');
  }

  @Get('user/certificates')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get certificates for completed courses' })
  @ApiResponse({ status: 200, description: 'Returns certificates', type: [UserCertificateDto] })
  async getCertificates(@CurrentUser() user: User): Promise<UserCertificateDto[]> {
    return this.usersService.getCertificates(user.id);
  }

  @Get('user/challenge-history')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get past challenge submissions' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Returns challenge history' })
  async getChallengeHistory(
    @CurrentUser() user: User,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{ data: ChallengeHistoryItemDto[]; total: number }> {
    return this.usersService.getChallengeHistory(user.id, Number(page) || 1, Number(limit) || 20);
  }

  @Get('user/activities')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get own activity history' })
  @ApiQuery({ name: 'type', required: false, description: 'Filter by activity type' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Returns activities' })
  async getUserActivities(
    @CurrentUser() user: User,
    @Query('type') type?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{ data: UserActivityDto[]; total: number }> {
    return this.usersService.getUserActivities(user.id, {
      type,
      page: Number(page) || 1,
      limit: Number(limit) || 20,
    });
  }

  // ============================================================================
  // Onboarding Endpoints (/api/v1/users/onboarding/*)
  // ============================================================================

  @Get('users/onboarding/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get onboarding status' })
  @ApiResponse({
    status: 200,
    description: 'Returns onboarding completion state',
    type: OnboardingStatusDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getOnboardingStatus(
    @CurrentUser() user: User,
  ): Promise<OnboardingStatusDto> {
    return this.usersService.getOnboardingStatus(user.id);
  }

  @Put('users/onboarding/complete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete onboarding with preferences' })
  @ApiResponse({
    status: 200,
    description: 'Onboarding completed, XP awarded',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async completeOnboarding(
    @CurrentUser() user: User,
    @Body() dto: CompleteOnboardingDto,
  ): Promise<{ success: boolean; xpAwarded: number }> {
    return this.usersService.completeOnboarding(user.id, dto);
  }

  @Put('users/onboarding/skip')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Skip onboarding' })
  @ApiResponse({
    status: 200,
    description: 'Onboarding skipped',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async skipOnboarding(
    @CurrentUser() user: User,
  ): Promise<{ success: boolean }> {
    return this.usersService.skipOnboarding(user.id);
  }

  // ============================================================================
  // Public User Endpoints (/api/v1/users/*)
  // ============================================================================

  @Get('users/:username')
  @Public()
  @ApiOperation({ summary: 'Get public profile by username' })
  @ApiParam({ name: 'username', example: 'johndoe' })
  @ApiResponse({
    status: 200,
    description: 'Returns public profile (privacy-filtered)',
    type: PublicUserProfileDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getPublicProfile(
    @Param('username') username: string,
    @CurrentUser() user?: User,
  ): Promise<PublicUserProfileDto> {
    return this.usersService.getPublicProfile(username, user?.id);
  }

  @Get('users/:username/stats')
  @Public()
  @ApiOperation({ summary: 'Get public stats by username' })
  @ApiParam({ name: 'username', example: 'johndoe' })
  @ApiResponse({
    status: 200,
    description: 'Returns public statistics (privacy-filtered)',
    type: PublicUserStatsDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getPublicStats(
    @Param('username') username: string,
    @CurrentUser() user?: User,
  ): Promise<PublicUserStatsDto> {
    return this.usersService.getPublicStats(username, user?.id);
  }
}
