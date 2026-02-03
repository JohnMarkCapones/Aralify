import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsIn,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

// ============================================================================
// Profile Update Request DTO
// ============================================================================

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'John Doe', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  displayName?: string;

  @ApiPropertyOptional({ example: 'I love coding!', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiPropertyOptional({ example: 'en', enum: ['en', 'fil'] })
  @IsOptional()
  @IsString()
  @IsIn(['en', 'fil'])
  locale?: string;

  @ApiPropertyOptional({ example: 'Asia/Manila', description: 'IANA timezone' })
  @IsOptional()
  @IsString()
  timezone?: string;
}

// ============================================================================
// Settings Update Request DTO
// ============================================================================

export class UpdateSettingsDto {
  // App settings
  @ApiPropertyOptional({ example: 'dark', enum: ['light', 'dark', 'auto'] })
  @IsOptional()
  @IsString()
  @IsIn(['light', 'dark', 'auto'])
  theme?: string;

  @ApiPropertyOptional({ example: 'vs-dark' })
  @IsOptional()
  @IsString()
  codeEditorTheme?: string;

  @ApiPropertyOptional({ example: 14, minimum: 10, maximum: 24 })
  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(24)
  fontSize?: number;

  @ApiPropertyOptional({ example: 30, minimum: 5, maximum: 120 })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  dailyGoalMins?: number;

  @ApiPropertyOptional({ example: 'MEDIUM', enum: ['EASY', 'MEDIUM', 'HARD'] })
  @IsOptional()
  @IsString()
  @IsIn(['EASY', 'MEDIUM', 'HARD'])
  difficultyPref?: string;

  // Notification settings
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  emailEnabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  pushEnabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  streakReminders?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  achievementNotifs?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  socialNotifs?: boolean;

  // Privacy settings
  @ApiPropertyOptional({ example: 'PUBLIC', enum: ['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE'] })
  @IsOptional()
  @IsString()
  @IsIn(['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE'])
  profileVisibility?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  showProgress?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  showActivity?: boolean;

  @ApiPropertyOptional({ example: 'EVERYONE', enum: ['EVERYONE', 'FRIENDS_ONLY', 'NONE'] })
  @IsOptional()
  @IsString()
  @IsIn(['EVERYONE', 'FRIENDS_ONLY', 'NONE'])
  allowMessages?: string;
}
