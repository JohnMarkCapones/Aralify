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

export class UserSettingsDto {
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

export class UserProfileDto {
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

  @ApiPropertyOptional({ type: UserSettingsDto })
  settings?: UserSettingsDto;
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

export class UpdateProfileDto {
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

export class UpdateSettingsDto {
  @ApiPropertyOptional({ example: 'dark', enum: ['light', 'dark', 'auto'] })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiPropertyOptional({ example: 'vs-dark' })
  @IsOptional()
  @IsString()
  codeEditorTheme?: string;

  @ApiPropertyOptional({ example: 14 })
  @IsOptional()
  fontSize?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  dailyGoalMins?: number;

  @ApiPropertyOptional({ example: 'MEDIUM', enum: ['EASY', 'MEDIUM', 'HARD'] })
  @IsOptional()
  @IsString()
  difficultyPref?: string;
}

export class RegisterSessionDto {
  @ApiPropertyOptional({ example: 'device_abc123' })
  @IsOptional()
  @IsString()
  deviceId?: string;
}
