import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsEnum,
  MinLength,
  MaxLength,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Difficulty } from '@prisma/client';

// ============================================================================
// Request DTOs - Courses
// ============================================================================

export class GetAdminCoursesQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 20, default: 20 })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ example: 'python', description: 'Filter by programming language' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: true, description: 'Filter by published status' })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: 'python', description: 'Search in title or description' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class CreateCourseDto {
  @ApiProperty({ example: 'python-basics', description: 'URL-friendly slug' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  slug!: string;

  @ApiProperty({ example: 'Python Basics', description: 'Course title' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional({ example: 'Python Basics', description: 'English title' })
  @IsOptional()
  @IsString()
  titleEn?: string;

  @ApiPropertyOptional({ example: 'Batayan ng Python', description: 'Filipino title' })
  @IsOptional()
  @IsString()
  titleFil?: string;

  @ApiPropertyOptional({ example: 'Learn the fundamentals of Python programming', description: 'Course description' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ example: 'python', description: 'Programming language' })
  @IsString()
  language!: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png', description: 'Icon URL' })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiPropertyOptional({ example: '#3776AB', description: 'Theme color hex code' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 0, description: 'Display order', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

export class UpdateCourseDto {
  @ApiPropertyOptional({ example: 'python-basics' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({ example: 'Python Basics' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ example: 'Python Basics' })
  @IsOptional()
  @IsString()
  titleEn?: string;

  @ApiPropertyOptional({ example: 'Batayan ng Python' })
  @IsOptional()
  @IsString()
  titleFil?: string;

  @ApiPropertyOptional({ example: 'Learn the fundamentals of Python programming' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: 'python' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiPropertyOptional({ example: '#3776AB' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

// ============================================================================
// Request DTOs - Levels
// ============================================================================

export class CreateLevelDto {
  @ApiProperty({ example: 'clx1234567890', description: 'Parent course ID' })
  @IsString()
  courseId!: string;

  @ApiProperty({ example: 'variables-and-types', description: 'URL-friendly slug' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  slug!: string;

  @ApiProperty({ example: 'Variables and Types', description: 'Level title' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional({ example: 'Learn about variables and data types' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

export class UpdateLevelDto {
  @ApiPropertyOptional({ example: 'variables-and-types' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({ example: 'Variables and Types' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ example: 'Learn about variables and data types' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

// ============================================================================
// Request DTOs - Lessons
// ============================================================================

export class CreateLessonDto {
  @ApiProperty({ example: 'clx1234567890', description: 'Parent level ID' })
  @IsString()
  levelId!: string;

  @ApiProperty({ example: 'intro-to-variables', description: 'URL-friendly slug' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  slug!: string;

  @ApiProperty({ example: 'Introduction to Variables', description: 'Lesson title' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional({ description: 'Lesson content in JSON format' })
  @IsOptional()
  content?: Record<string, unknown>;

  @ApiProperty({ enum: Difficulty, example: 'EASY', description: 'Difficulty level' })
  @IsEnum(Difficulty)
  difficulty!: Difficulty;

  @ApiPropertyOptional({ example: 100, default: 100, description: 'XP reward for completion' })
  @IsOptional()
  @IsInt()
  @Min(0)
  xpReward?: number;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

export class UpdateLessonDto {
  @ApiPropertyOptional({ example: 'intro-to-variables' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({ example: 'Introduction to Variables' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ description: 'Lesson content in JSON format' })
  @IsOptional()
  content?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: Difficulty, example: 'EASY' })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  xpReward?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

// ============================================================================
// Response DTOs
// ============================================================================

export class AdminCourseDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'python-basics' })
  slug!: string;

  @ApiProperty({ example: 'Python Basics' })
  title!: string;

  @ApiPropertyOptional({ example: 'Python Basics' })
  titleEn?: string | null;

  @ApiPropertyOptional({ example: 'Batayan ng Python' })
  titleFil?: string | null;

  @ApiPropertyOptional({ example: 'Learn the fundamentals of Python programming' })
  description?: string | null;

  @ApiProperty({ example: 'python' })
  language!: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  iconUrl?: string | null;

  @ApiPropertyOptional({ example: '#3776AB' })
  color?: string | null;

  @ApiProperty({ example: 0 })
  orderIndex!: number;

  @ApiProperty({ example: false })
  isPublished!: boolean;

  @ApiProperty({ example: 5, description: 'Total number of levels' })
  totalLevels!: number;

  @ApiProperty({ example: 15, description: 'Total number of lessons' })
  totalLessons!: number;

  @ApiProperty({ example: 100, description: 'Number of enrolled users' })
  enrolledUsers!: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-01-15T00:00:00Z' })
  updatedAt!: Date;
}

export class AdminLevelDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'clx1234567890' })
  courseId!: string;

  @ApiProperty({ example: 'variables-and-types' })
  slug!: string;

  @ApiProperty({ example: 'Variables and Types' })
  title!: string;

  @ApiPropertyOptional({ example: 'Learn about variables and data types' })
  description?: string | null;

  @ApiProperty({ example: 0 })
  orderIndex!: number;

  @ApiProperty({ example: false })
  isPublished!: boolean;

  @ApiProperty({ example: 3, description: 'Total number of lessons' })
  totalLessons!: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-01-15T00:00:00Z' })
  updatedAt!: Date;
}

export class AdminLessonDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'clx1234567890' })
  levelId!: string;

  @ApiProperty({ example: 'intro-to-variables' })
  slug!: string;

  @ApiProperty({ example: 'Introduction to Variables' })
  title!: string;

  @ApiPropertyOptional({ description: 'Lesson content' })
  content?: Record<string, unknown> | null;

  @ApiProperty({ enum: Difficulty, example: 'EASY' })
  difficulty!: Difficulty;

  @ApiProperty({ example: 100 })
  xpReward!: number;

  @ApiProperty({ example: 0 })
  orderIndex!: number;

  @ApiProperty({ example: false })
  isPublished!: boolean;

  @ApiProperty({ example: 50, description: 'Number of completions' })
  completions!: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-01-15T00:00:00Z' })
  updatedAt!: Date;
}

export class AdminCourseDetailDto extends AdminCourseDto {
  @ApiProperty({ type: [AdminLevelDto] })
  levels!: AdminLevelDto[];
}

export class AdminLevelDetailDto extends AdminLevelDto {
  @ApiProperty({ type: [AdminLessonDto] })
  lessons!: AdminLessonDto[];
}

export class AdminCourseListResponseDto {
  @ApiProperty({ type: [AdminCourseDto] })
  data!: AdminCourseDto[];

  @ApiProperty()
  pagination!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class PublishResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Course has been published' })
  message!: string;
}

export class DeleteContentResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Course has been deleted' })
  message!: string;
}
