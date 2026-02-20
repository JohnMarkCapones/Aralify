import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// Response DTOs
// ============================================================================

export class I18nTextDto {
  @ApiProperty({ example: 'Python Basics' })
  en!: string;

  @ApiPropertyOptional({ example: 'Batayan ng Python' })
  fil?: string;
}

export class CourseListItemDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'python-basics' })
  slug!: string;

  @ApiProperty({ example: 'python' })
  language!: string;

  @ApiProperty({ type: I18nTextDto })
  title!: I18nTextDto;

  @ApiProperty({ type: I18nTextDto })
  description!: I18nTextDto;

  @ApiPropertyOptional({ example: 'https://example.com/python-icon.png' })
  iconUrl?: string;

  @ApiPropertyOptional({ example: '#3776AB' })
  color?: string;

  @ApiProperty({ example: 10 })
  totalLevels!: number;

  @ApiProperty({ example: 20 })
  estimatedHours!: number;

  @ApiPropertyOptional({
    description: 'User progress information if authenticated',
    example: {
      completionPercentage: 45.5,
      startedAt: '2024-01-01T00:00:00.000Z',
      lastActivityAt: '2024-01-15T00:00:00.000Z',
    },
  })
  userProgress?: {
    completionPercentage: number;
    masteryPercentage: number;
    totalXpEarned: number;
    startedAt: Date;
    lastActivityAt: Date | null;
  } | null;
}

export class LessonSummaryDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ enum: ['easy', 'medium', 'hard'] })
  difficulty!: string;

  @ApiProperty({ type: I18nTextDto })
  title!: I18nTextDto;

  @ApiProperty({ example: 100 })
  xpReward!: number;

  @ApiProperty({ example: 10 })
  estimatedTimeMinutes!: number;
}

export class LevelDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'variables-and-types' })
  slug!: string;

  @ApiProperty({ type: I18nTextDto })
  title!: I18nTextDto;

  @ApiProperty({ type: I18nTextDto })
  description!: I18nTextDto;

  @ApiProperty({ example: 0 })
  orderIndex!: number;

  @ApiPropertyOptional({ type: [LessonSummaryDto] })
  lessons?: LessonSummaryDto[];

  @ApiPropertyOptional({ example: false })
  isLocked?: boolean;
}

export class CourseDetailDto extends CourseListItemDto {
  @ApiProperty({ type: [LevelDto] })
  levels!: LevelDto[];

  @ApiProperty({ example: 30 })
  totalLessons!: number;

  @ApiProperty({ example: true })
  isPublished!: boolean;
}

export class LevelProgressDto {
  @ApiProperty({ example: 'clx1234567890' })
  levelId!: string;

  @ApiProperty({ example: true })
  isUnlocked!: boolean;

  @ApiProperty({ example: true })
  easyCompleted!: boolean;

  @ApiProperty({ example: false })
  mediumCompleted!: boolean;

  @ApiProperty({ example: false })
  hardCompleted!: boolean;
}

export class CourseProgressDto {
  @ApiProperty({ example: 'clx1234567890' })
  courseId!: string;

  @ApiProperty({ example: 45.5 })
  completionPercentage!: number;

  @ApiProperty({ example: 33.3 })
  masteryPercentage!: number;

  @ApiProperty({ example: 3 })
  levelsUnlocked!: number;

  @ApiProperty({ example: 2 })
  levelsCompleted!: number;

  @ApiProperty({ example: 5 })
  lessonsCompleted!: number;

  @ApiProperty({ example: 1500 })
  totalXpEarned!: number;

  @ApiProperty({ example: 3600 })
  timeSpentSeconds!: number;

  @ApiPropertyOptional({ type: Date, example: '2024-01-15T00:00:00.000Z' })
  lastActivity?: Date | null;

  @ApiProperty({ type: [LevelProgressDto] })
  levelProgress!: LevelProgressDto[];
}

export class CourseProgressResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  courseId!: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  startedAt!: Date;

  @ApiProperty({ example: 0 })
  completionPercentage!: number;
}

export class StartCourseResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ type: CourseProgressResponseDto })
  courseProgress!: CourseProgressResponseDto;
}

// ============================================================================
// Query DTOs
// ============================================================================

export class GetCoursesQueryDto {
  @ApiPropertyOptional({ example: 'python', description: 'Filter by programming language' })
  language?: string;

  @ApiPropertyOptional({ enum: ['popular', 'newest', 'alphabetical'], description: 'Sort order' })
  sort?: 'popular' | 'newest' | 'alphabetical';
}

export class GetLevelsQueryDto {
  @ApiPropertyOptional({ enum: ['easy', 'medium', 'hard'], description: 'Filter by difficulty' })
  difficulty?: 'easy' | 'medium' | 'hard';
}
