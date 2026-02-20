import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator';

// ============================================================================
// Response DTOs
// ============================================================================

export class AuthStatusDto {
  @ApiProperty({ example: 'ok' })
  status!: string;

  @ApiProperty({ example: 'Auth service is running' })
  message!: string;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  timestamp!: string;
}

// Auth-specific lightweight snapshot of user settings for the /auth/me response.
// We keep this separate from the richer Users `UserSettingsDto` to avoid
// Swagger schema name collisions and to keep the payload focused on auth needs.
export class AuthUserSettingsDto {
  @ApiProperty({ example: 'dark' })
  theme!: string;

  @ApiProperty({ example: 'vs-dark' })
  codeEditorTheme!: string;

  @ApiProperty({ example: 14 })
  fontSize!: number;

  @ApiProperty({ example: 30 })
  dailyGoalMins!: number;

  @ApiProperty({ example: 'MEDIUM' })
  difficultyPref!: string;
}

// Auth-specific view of the user profile used by the Auth module.
// This intentionally differs from the Users `UserProfileDto` shape and name.
export class AuthUserProfileDto {
  @ApiProperty({ example: 'user_123' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'johndoe' })
  username!: string;

  @ApiProperty({ example: 'John Doe' })
  displayName!: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatarUrl?: string | null;

  @ApiPropertyOptional({ example: 'I love coding!' })
  bio?: string | null;

  @ApiProperty({ example: 'en' })
  locale!: string;

  @ApiProperty({ example: 'UTC' })
  timezone!: string;

  @ApiProperty({ example: 2500 })
  xpTotal!: number;

  @ApiProperty({ example: 5 })
  level!: number;

  @ApiProperty({ example: 7 })
  streakCurrent!: number;

  @ApiProperty({ example: 14 })
  streakLongest!: number;

  @ApiProperty({ example: 'USER', enum: ['USER', 'MODERATOR', 'ADMIN'] })
  role!: string;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt!: string;

  @ApiPropertyOptional({ type: AuthUserSettingsDto })
  settings?: AuthUserSettingsDto;
}

export class SessionInfoDto {
  @ApiProperty({ example: 'sess_123' })
  sessionId!: string;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2024-02-15T00:00:00.000Z' })
  expiresAt!: string;

  @ApiPropertyOptional({ example: 'Chrome/120.0 on Windows' })
  deviceInfo?: string;
}

// ============================================================================
// Request DTOs
// ============================================================================

// Auth-specific profile update payload (allows username + avatar updates).
// Named differently from Users `UpdateProfileDto` to keep Swagger schemas unique.
export class AuthUpdateProfileDto {
  @ApiPropertyOptional({ example: 'johndoe', minLength: 3, maxLength: 30 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username?: string;

  @ApiPropertyOptional({ example: 'John Doe', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  displayName?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'I love coding!', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiPropertyOptional({ example: 'en', enum: ['en', 'fil'] })
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional({ example: 'Asia/Manila' })
  @IsOptional()
  @IsString()
  timezone?: string;
}

export class RegisterSessionDto {
  @ApiPropertyOptional({ example: 'device_abc123' })
  @IsOptional()
  @IsString()
  deviceId?: string;
}
