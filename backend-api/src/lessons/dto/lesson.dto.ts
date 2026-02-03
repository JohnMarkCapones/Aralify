import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// Shared DTOs
// ============================================================================

export class I18nTextDto {
  @ApiProperty({ example: 'Variables and Data Types' })
  en!: string;

  @ApiPropertyOptional({ example: 'Mga Variable at Uri ng Data', nullable: true })
  fil?: string | null;
}

// ============================================================================
// Quiz DTOs (without answers)
// ============================================================================

export class QuizSummaryDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ enum: ['MULTIPLE_CHOICE', 'FILL_BLANK', 'CODE_COMPLETION', 'TRUE_FALSE'] })
  type!: string;

  @ApiProperty({ example: 'What is the correct way to declare a variable in Python?' })
  question!: string;

  @ApiPropertyOptional({
    example: ['x = 5', 'var x = 5', 'int x = 5', 'let x = 5'],
    description: 'Options for multiple choice questions',
    nullable: true,
  })
  options?: any; // Json type from Prisma

  @ApiPropertyOptional({ example: 'Variables in Python are dynamically typed...', nullable: true })
  explanation?: string | null;

  @ApiProperty({ example: 0 })
  orderIndex!: number;
}

// ============================================================================
// Challenge DTOs (without solutions)
// ============================================================================

export class ChallengeSummaryDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'Calculate the Sum' })
  title!: string;

  @ApiProperty({ example: 'Write a function that calculates the sum of two numbers.' })
  description!: string;

  @ApiPropertyOptional({ example: 'def add(a, b):\n    # Your code here\n    pass', nullable: true })
  starterCode?: string | null;

  @ApiProperty({ example: 71, description: 'Judge0 language ID' })
  languageId!: number;
}

// ============================================================================
// Hint DTOs
// ============================================================================

export class HintDto {
  @ApiProperty({ example: 0 })
  index!: number;

  @ApiPropertyOptional({ example: 'Try using the + operator' })
  content?: string;

  @ApiProperty({ example: true })
  isUnlocked!: boolean;
}

// ============================================================================
// Progress DTOs
// ============================================================================

export class UserLessonProgressDto {
  @ApiProperty({ enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'] })
  status!: string;

  @ApiPropertyOptional({ example: 85, nullable: true })
  score?: number | null;

  @ApiProperty({ example: 200 })
  xpEarned!: number;

  @ApiPropertyOptional({ example: 300, nullable: true })
  timeSpentSeconds?: number | null;

  @ApiPropertyOptional({ example: '2024-01-15T10:30:00.000Z', nullable: true })
  completedAt?: Date | null;
}

// ============================================================================
// Lesson Detail DTO
// ============================================================================

export class LessonDetailDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'variables-intro' })
  slug!: string;

  @ApiProperty({ type: I18nTextDto })
  title!: I18nTextDto;

  @ApiPropertyOptional({
    description: 'Lesson content (text, code examples)',
    example: { sections: [{ type: 'text', content: 'Welcome to...' }] },
  })
  content?: any;

  @ApiProperty({ enum: ['easy', 'medium', 'hard'] })
  difficulty!: string;

  @ApiProperty({ example: 100 })
  xpReward!: number;

  @ApiProperty({ example: 0 })
  orderIndex!: number;

  @ApiProperty({
    description: 'Level information',
    example: { id: 'clx123', slug: 'variables', title: { en: 'Variables' } },
  })
  level!: {
    id: string;
    slug: string;
    title: I18nTextDto;
    courseId: string;
  };

  @ApiPropertyOptional({ type: [QuizSummaryDto] })
  quizzes?: QuizSummaryDto[];

  @ApiPropertyOptional({ type: [ChallengeSummaryDto] })
  challenges?: ChallengeSummaryDto[];

  @ApiPropertyOptional({ type: UserLessonProgressDto })
  userProgress?: UserLessonProgressDto | null;
}

// ============================================================================
// Response DTOs
// ============================================================================

export class StartLessonResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({
    type: UserLessonProgressDto,
    description: 'Initial progress record',
  })
  progress!: UserLessonProgressDto;
}

export class CompleteLessonResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({ example: 200, description: 'XP earned with multiplier applied' })
  xpEarned!: number;

  @ApiProperty({ example: 2, description: 'XP multiplier based on difficulty (1x=Easy, 2x=Medium, 3x=Hard)' })
  xpMultiplier!: number;

  @ApiProperty({ example: 100, description: 'Base XP before multiplier' })
  baseXp!: number;

  @ApiPropertyOptional({ example: true, description: 'Whether this completion unlocked the next level' })
  levelUnlocked?: boolean;

  @ApiPropertyOptional({ example: 'clx9876543210', description: 'ID of newly unlocked level' })
  nextLevelId?: string;

  @ApiProperty({ type: UserLessonProgressDto })
  progress!: UserLessonProgressDto;
}

export class LessonQuizzesResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({ type: [QuizSummaryDto] })
  quizzes!: QuizSummaryDto[];

  @ApiProperty({ example: 5 })
  totalCount!: number;
}

export class LessonChallengesResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({ type: [ChallengeSummaryDto] })
  challenges!: ChallengeSummaryDto[];

  @ApiProperty({ example: 2 })
  totalCount!: number;
}

export class LessonHintsResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({ example: 'clx0987654321' })
  challengeId!: string;

  @ApiProperty({ type: [HintDto] })
  hints!: HintDto[];

  @ApiProperty({ example: 3 })
  totalHints!: number;

  @ApiProperty({ example: 1 })
  unlockedCount!: number;
}

export class UnlockHintResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ type: HintDto, description: 'The newly unlocked hint' })
  hint!: HintDto;

  @ApiProperty({ example: 2 })
  unlockedCount!: number;

  @ApiProperty({ example: 3 })
  totalHints!: number;
}
