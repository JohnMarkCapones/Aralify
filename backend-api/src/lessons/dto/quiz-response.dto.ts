import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuizType, Difficulty } from '@prisma/client';

// ============================================================================
// Quiz Answer Result DTOs
// ============================================================================

export class QuizAnswerResultDto {
  @ApiProperty({ example: true })
  correct!: boolean;

  @ApiPropertyOptional({ example: 'Variables in Python are dynamically typed...' })
  explanation?: string | null;

  @ApiProperty({ example: 25, description: 'XP awarded for this answer (0 if already answered correctly)' })
  xpAwarded!: number;

  @ApiProperty({ example: 1, description: 'Attempt number for this quiz' })
  attemptNumber!: number;

  @ApiProperty({ example: false, description: 'Whether user has already answered this quiz correctly' })
  alreadyCorrect!: boolean;

  @ApiPropertyOptional({ example: true, description: 'Whether this was a first-attempt correct answer' })
  firstAttemptBonus?: boolean;
}

// ============================================================================
// Quiz Results DTOs
// ============================================================================

export class QuizResultItemDto {
  @ApiProperty({ example: 'clx1234567890' })
  quizId!: string;

  @ApiProperty({ example: 'What is the correct way to declare a variable?' })
  question!: string;

  @ApiProperty({ example: true })
  isCorrect!: boolean;

  @ApiProperty({ example: 'x = 5' })
  userAnswer!: string;

  @ApiProperty({ example: 'x = 5' })
  correctAnswer!: string;

  @ApiProperty({ example: 25 })
  xpAwarded!: number;

  @ApiProperty({ example: 2 })
  attempts!: number;
}

export class QuizResultsResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({ example: 80, description: 'Score percentage (0-100)' })
  scorePercentage!: number;

  @ApiProperty({ example: 4 })
  correctCount!: number;

  @ApiProperty({ example: 5 })
  totalQuizzes!: number;

  @ApiProperty({ example: 100 })
  totalXpEarned!: number;

  @ApiProperty({ type: [QuizResultItemDto] })
  results!: QuizResultItemDto[];
}

// ============================================================================
// Quiz Hints DTOs
// ============================================================================

export class QuizHintDto {
  @ApiProperty({ example: 0 })
  index!: number;

  @ApiPropertyOptional({ example: 'Think about Python syntax' })
  content?: string;

  @ApiProperty({ example: true })
  isUnlocked!: boolean;
}

export class QuizHintsResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({ example: 'clx0987654321' })
  quizId!: string;

  @ApiProperty({ type: [QuizHintDto] })
  hints!: QuizHintDto[];

  @ApiProperty({ example: 3 })
  totalHints!: number;

  @ApiProperty({ example: 1 })
  unlockedCount!: number;
}

export class UnlockQuizHintResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ type: QuizHintDto, description: 'The newly unlocked hint' })
  hint!: QuizHintDto;

  @ApiProperty({ example: 2 })
  unlockedCount!: number;

  @ApiProperty({ example: 3 })
  totalHints!: number;
}

// ============================================================================
// Admin Quiz DTOs
// ============================================================================

export class AdminQuizResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'clx0987654321' })
  lessonId!: string;

  @ApiProperty({ enum: QuizType, example: 'MULTIPLE_CHOICE' })
  type!: QuizType;

  @ApiProperty({ example: 'What is the correct way to declare a variable?' })
  question!: string;

  @ApiPropertyOptional({
    example: ['x = 5', 'var x = 5', 'int x = 5', 'let x = 5'],
  })
  options?: any;

  @ApiProperty({ example: 'x = 5' })
  correctAnswer!: string;

  @ApiPropertyOptional({ example: 'Variables in Python are dynamically typed...' })
  explanation?: string | null;

  @ApiPropertyOptional({ example: ['Think about Python syntax'] })
  hints?: string[] | null;

  @ApiPropertyOptional({ enum: Difficulty, example: 'MEDIUM' })
  difficulty?: Difficulty | null;

  @ApiProperty({ example: 0 })
  orderIndex!: number;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt!: Date;
}

export class AdminBulkCreateQuizResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 5 })
  createdCount!: number;

  @ApiProperty({ type: [AdminQuizResponseDto] })
  quizzes!: AdminQuizResponseDto[];
}

export class AdminDeleteQuizResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'clx1234567890' })
  deletedId!: string;
}
