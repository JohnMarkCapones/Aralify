import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// Response DTOs
// ============================================================================

export class SearchCourseResultDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'python-basics' })
  slug!: string;

  @ApiProperty({ example: 'Python Basics' })
  title!: string;

  @ApiPropertyOptional({ example: 'Learn the fundamentals of Python programming' })
  description?: string | null;

  @ApiProperty({ example: 'python' })
  language!: string;

  @ApiPropertyOptional({ example: 'https://example.com/python-icon.png' })
  iconUrl?: string | null;

  @ApiProperty({ example: 'course' })
  type!: string;
}

export class SearchLessonResultDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'variables-intro' })
  slug!: string;

  @ApiProperty({ example: 'Introduction to Variables' })
  title!: string;

  @ApiProperty({ example: 'EASY', enum: ['EASY', 'MEDIUM', 'HARD'] })
  difficulty!: string;

  @ApiPropertyOptional({ example: 'python-basics', description: 'Slug of the parent course' })
  courseSlug?: string | null;

  @ApiProperty({ example: 'lesson' })
  type!: string;
}

export class SearchChallengeResultDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'FizzBuzz' })
  title!: string;

  @ApiProperty({ example: 'Write a function that prints FizzBuzz' })
  description!: string;

  @ApiProperty({ example: 71, description: 'Judge0 language ID' })
  languageId!: number;

  @ApiProperty({ example: 'challenge' })
  type!: string;
}

export class SearchUserResultDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'john_doe' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
  avatarUrl?: string | null;

  @ApiProperty({ example: 'user' })
  type!: string;
}

export class SearchResultsDto {
  @ApiProperty({ type: [SearchCourseResultDto] })
  courses!: SearchCourseResultDto[];

  @ApiProperty({ type: [SearchLessonResultDto] })
  lessons!: SearchLessonResultDto[];

  @ApiProperty({ type: [SearchChallengeResultDto] })
  challenges!: SearchChallengeResultDto[];

  @ApiProperty({ type: [SearchUserResultDto] })
  users!: SearchUserResultDto[];
}
