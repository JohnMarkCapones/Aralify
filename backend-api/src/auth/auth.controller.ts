import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CurrentUser, Public } from './decorators';
import {
  UserProfileDto,
  UpdateProfileDto,
  SessionInfoDto,
  AuthStatusDto,
} from './dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('status')
  @Public()
  @ApiOperation({ summary: 'Check auth service status' })
  @ApiResponse({ status: 200, description: 'Auth service is running' })
  getStatus(): AuthStatusDto {
    return {
      status: 'ok',
      message: 'Auth service is running',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile',
    type: UserProfileDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@CurrentUser() user: User): Promise<UserProfileDto> {
    const fullUser = await this.authService.getUserWithSettings(user.id);
    return this.mapToProfileDto(fullUser || user);
  }

  @Post('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: UserProfileDto,
  })
  async updateMe(
    @CurrentUser() user: User,
    @Body() updateDto: UpdateProfileDto,
  ): Promise<UserProfileDto> {
    const updated = await this.authService.updateProfile(user.id, updateDto);
    return this.mapToProfileDto(updated);
  }

  @Post('session')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a new session (call after login)' })
  @ApiResponse({
    status: 201,
    description: 'Session registered',
    type: SessionInfoDto,
  })
  async registerSession(
    @CurrentUser() user: User,
    @Headers('user-agent') userAgent: string,
    @Headers('x-forwarded-for') forwardedFor: string,
    @Body() body: { deviceId?: string },
  ): Promise<SessionInfoDto> {
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || 'unknown';

    const session = await this.authService.createSession(user.id, {
      deviceInfo: userAgent,
      ipAddress,
      deviceId: body.deviceId,
    });

    return {
      sessionId: session.id,
      createdAt: session.createdAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
      deviceInfo: session.deviceInfo || undefined,
    };
  }

  @Get('sessions')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all active sessions for current user' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of active sessions',
    type: [SessionInfoDto],
  })
  async getSessions(@CurrentUser() user: User): Promise<SessionInfoDto[]> {
    const sessions = await this.authService.getUserSessions(user.id);
    return sessions.map((s) => ({
      sessionId: s.id,
      createdAt: s.createdAt.toISOString(),
      expiresAt: s.expiresAt.toISOString(),
      deviceInfo: s.deviceInfo || undefined,
    }));
  }

  @Delete('sessions/:sessionId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke a specific session' })
  @ApiResponse({ status: 204, description: 'Session revoked' })
  async revokeSession(
    @CurrentUser() user: User,
    @Body('sessionId') sessionId: string,
  ): Promise<void> {
    await this.authService.revokeSession(user.id, sessionId);
  }

  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout - revoke all sessions' })
  @ApiResponse({ status: 204, description: 'All sessions revoked' })
  async logout(@CurrentUser() user: User): Promise<void> {
    await this.authService.revokeAllSessions(user.id);
  }

  @Delete('account')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user account (soft delete)' })
  @ApiResponse({ status: 204, description: 'Account deleted' })
  async deleteAccount(@CurrentUser() user: User): Promise<void> {
    await this.authService.deleteAccount(user.id);
  }

  private mapToProfileDto(user: any): UserProfileDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      locale: user.locale,
      timezone: user.timezone,
      xpTotal: user.xpTotal,
      level: user.level,
      streakCurrent: user.streakCurrent,
      streakLongest: user.streakLongest,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      settings: user.settings
        ? {
            theme: user.settings.theme,
            codeEditorTheme: user.settings.codeEditorTheme,
            fontSize: user.settings.fontSize,
            dailyGoalMins: user.settings.dailyGoalMins,
            difficultyPref: user.settings.difficultyPref,
          }
        : undefined,
    };
  }
}
