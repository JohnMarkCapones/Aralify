import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

// ============================================================================
// Response DTOs
// ============================================================================

export class ChallengeListItemDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'Two Sum' })
  title!: string;

  @ApiProperty({ example: 'Given an array of integers, return indices of the two numbers that add up to a target.' })
  description!: string;

  @ApiProperty({ example: 71, description: 'Judge0 language ID' })
  languageId!: number;

  @ApiPropertyOptional({ example: 'easy', enum: ['easy', 'medium', 'hard'], description: 'Difficulty from associated lesson' })
  difficulty?: string | null;

  @ApiProperty({ example: 42, description: 'Total number of submissions' })
  submissionCount!: number;
}

export class DailyChallengeDto {
  @ApiProperty({ example: '2026-02-12T00:00:00.000Z' })
  date!: Date;

  @ApiProperty({ type: ChallengeListItemDto })
  challenge!: ChallengeListItemDto;
}

export class ChallengeDetailDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'Two Sum' })
  title!: string;

  @ApiProperty({ example: 'Given an array of integers, return indices of the two numbers that add up to a target.' })
  description!: string;

  @ApiPropertyOptional({ example: 'def two_sum(nums, target):\n    pass' })
  starterCode?: string | null;

  @ApiProperty({ description: 'Array of test cases with input and expectedOutput', example: [{ input: '[2,7,11,15], 9', expectedOutput: '[0,1]' }] })
  testCases!: any;

  @ApiPropertyOptional({ description: 'Array of hint strings', example: ['Think about using a hash map.'] })
  hints?: any;

  @ApiProperty({ example: 71, description: 'Judge0 language ID' })
  languageId!: number;

  @ApiPropertyOptional({ example: 'Variables and Types', description: 'Title of the associated lesson' })
  lessonTitle?: string | null;
}

// ============================================================================
// Query DTOs
// ============================================================================

export class GetChallengesQueryDto {
  @ApiPropertyOptional({
    example: 'easy',
    enum: ['easy', 'medium', 'hard'],
    description: 'Filter by difficulty level',
  })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @ApiPropertyOptional({
    example: 71,
    description: 'Filter by Judge0 language ID',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  language?: number;

  @ApiPropertyOptional({ example: 1, description: 'Page number (starts at 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20, description: 'Number of items per page (max 100)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
