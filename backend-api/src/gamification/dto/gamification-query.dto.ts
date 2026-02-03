import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetXpHistoryQueryDto {
  @ApiPropertyOptional({ example: 50, description: 'Number of records to return' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ example: 0, description: 'Number of records to skip' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    example: 'LESSON_COMPLETE',
    enum: ['LESSON_COMPLETE', 'QUIZ_COMPLETE', 'CHALLENGE_COMPLETE', 'STREAK_BONUS', 'ACHIEVEMENT', 'DAILY_BONUS', 'EVENT'],
    description: 'Filter by XP source',
  })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ example: '2024-01-01', description: 'Filter from date (ISO format)' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2024-01-31', description: 'Filter to date (ISO format)' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class GetAchievementsQueryDto {
  @ApiPropertyOptional({
    example: 'completion',
    description: 'Filter by achievement category',
    enum: ['completion', 'streak', 'mastery', 'social', 'secret'],
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: false, description: 'Include secret achievements' })
  @IsOptional()
  @Type(() => Boolean)
  includeSecret?: boolean;
}

export class GetBadgesQueryDto {
  @ApiPropertyOptional({ example: false, description: 'Only return displayed badges' })
  @IsOptional()
  @Type(() => Boolean)
  displayedOnly?: boolean;
}
