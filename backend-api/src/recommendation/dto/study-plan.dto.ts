import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

// ============================================================================
// Study Plan DTOs
// ============================================================================

export class GenerateStudyPlanDto {
  @ApiPropertyOptional({ example: 'clx1234567890', description: 'Career path to base plan on' })
  @IsOptional()
  @IsString()
  careerPathId?: string;

  @ApiPropertyOptional({ example: 30, description: 'Daily time commitment in minutes' })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(240)
  dailyMinutes?: number;
}

export class StudyPlanItemDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 1 })
  dayNumber!: number;

  @ApiProperty({ example: 'LEARN', enum: ['LEARN', 'REVIEW', 'CHALLENGE', 'REST', 'MILESTONE'] })
  type!: string;

  @ApiPropertyOptional({ example: 'Variables and Data Types' })
  title?: string;

  @ApiPropertyOptional({ example: 'Learn about Python variables' })
  description?: string;

  @ApiProperty({ example: 25 })
  estimatedMins!: number;

  @ApiPropertyOptional({ example: 'clx1234567890' })
  lessonId?: string;

  @ApiPropertyOptional({ example: 'clx1234567890' })
  courseId?: string;

  @ApiProperty({ example: false })
  isCompleted!: boolean;

  @ApiPropertyOptional()
  completedAt?: Date;
}

export class StudyPlanResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiPropertyOptional({ example: 'Frontend Developer Path' })
  title?: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'PAUSED', 'COMPLETED'] })
  status!: string;

  @ApiProperty({ example: 30 })
  dailyMinutes!: number;

  @ApiProperty({ example: 90 })
  totalDays!: number;

  @ApiProperty({ example: 5 })
  completedDays!: number;

  @ApiProperty({ example: 5.6, description: 'Completion percentage' })
  completionPercentage!: number;

  @ApiProperty()
  startDate!: Date;

  @ApiPropertyOptional()
  endDate?: Date;

  @ApiProperty({ type: [StudyPlanItemDto], description: 'Items for today or next 7 days' })
  upcomingItems!: StudyPlanItemDto[];
}

export class TodayPlanDto {
  @ApiProperty({ example: 5 })
  dayNumber!: number;

  @ApiProperty({ type: [StudyPlanItemDto] })
  items!: StudyPlanItemDto[];

  @ApiProperty({ example: 30 })
  totalEstimatedMins!: number;

  @ApiProperty({ example: 1 })
  completedCount!: number;

  @ApiProperty({ example: 3 })
  totalCount!: number;

  @ApiPropertyOptional({ example: 'You\'re 2 lessons away from completing Level 1!' })
  motivationalMessage?: string;
}

export class UpdateStudyPlanDto {
  @ApiPropertyOptional({ example: 'PAUSED', enum: ['ACTIVE', 'PAUSED'] })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 45 })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(240)
  dailyMinutes?: number;
}
