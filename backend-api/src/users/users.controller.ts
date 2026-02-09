import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
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
