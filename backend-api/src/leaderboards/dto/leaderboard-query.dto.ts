import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsString, IsIn, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class LeaderboardPaginationDto {
  @ApiPropertyOptional({ example: 20, description: 'Number of entries to return (max 100)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ example: 0, description: 'Number of entries to skip' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}

export class MonthlyLeaderboardQueryDto extends LeaderboardPaginationDto {
  @ApiPropertyOptional({
    example: '2026-01',
    description: 'Month in YYYY-MM format (defaults to current month)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, {
    message: 'month must be in YYYY-MM format',
  })
  month?: string;
}

export class AroundUserQueryDto {
  @ApiPropertyOptional({
    example: 'global',
    description: 'Leaderboard type',
    enum: ['global', 'weekly', 'monthly'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['global', 'weekly', 'monthly'])
  type?: string;

  @ApiPropertyOptional({ example: 5, description: 'Number of users above and below (max 10)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  radius?: number;
}
