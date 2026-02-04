import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuizType, Difficulty } from '@prisma/client';

// ============================================================================
// Quiz Hint DTOs
// ============================================================================

export class UnlockQuizHintDto {
  @ApiProperty({
    example: 'clx1234567890',
    description: 'Quiz ID to unlock hint for',
  })
  @IsString()
  quizId!: string;

  @ApiProperty({
    example: 0,
    description: 'Index of the hint to unlock (0-based)',
  })
  @IsInt()
  @Min(0)
  hintIndex!: number;
}

// ============================================================================
// Admin Quiz Management DTOs
// ============================================================================

export class AdminCreateQuizDto {
  @ApiProperty({
    enum: QuizType,
    example: 'MULTIPLE_CHOICE',
    description: 'Type of quiz question',
  })
  @IsEnum(QuizType)
  type!: QuizType;

  @ApiProperty({
    example: 'What is the correct way to declare a variable in Python?',
    description: 'The quiz question',
  })
  @IsString()
  question!: string;

  @ApiPropertyOptional({
    example: ['x = 5', 'var x = 5', 'int x = 5', 'let x = 5'],
    description: 'Options for multiple choice questions',
  })
  @IsOptional()
  options?: any;

  @ApiProperty({
    example: 'x = 5',
    description: 'The correct answer',
  })
  @IsString()
  correctAnswer!: string;

  @ApiPropertyOptional({
    example: 'Variables in Python are dynamically typed...',
    description: 'Explanation shown after answering',
  })
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiPropertyOptional({
    example: ['Think about Python syntax', 'No type declaration needed'],
    description: 'Array of hint strings',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hints?: string[];

  @ApiPropertyOptional({
    enum: Difficulty,
    example: 'MEDIUM',
    description: 'Quiz difficulty (optional, falls back to lesson difficulty)',
  })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiPropertyOptional({
    example: 0,
    description: 'Order index within the lesson',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

export class AdminUpdateQuizDto {
  @ApiPropertyOptional({
    enum: QuizType,
    example: 'MULTIPLE_CHOICE',
    description: 'Type of quiz question',
  })
  @IsOptional()
  @IsEnum(QuizType)
  type?: QuizType;

  @ApiPropertyOptional({
    example: 'What is the correct way to declare a variable in Python?',
    description: 'The quiz question',
  })
  @IsOptional()
  @IsString()
  question?: string;

  @ApiPropertyOptional({
    example: ['x = 5', 'var x = 5', 'int x = 5', 'let x = 5'],
    description: 'Options for multiple choice questions',
  })
  @IsOptional()
  options?: any;

  @ApiPropertyOptional({
    example: 'x = 5',
    description: 'The correct answer',
  })
  @IsOptional()
  @IsString()
  correctAnswer?: string;

  @ApiPropertyOptional({
    example: 'Variables in Python are dynamically typed...',
    description: 'Explanation shown after answering',
  })
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiPropertyOptional({
    example: ['Think about Python syntax', 'No type declaration needed'],
    description: 'Array of hint strings',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hints?: string[];

  @ApiPropertyOptional({
    enum: Difficulty,
    example: 'MEDIUM',
    description: 'Quiz difficulty (optional, falls back to lesson difficulty)',
  })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiPropertyOptional({
    example: 0,
    description: 'Order index within the lesson',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;
}

export class AdminBulkCreateQuizDto {
  @ApiProperty({
    type: [AdminCreateQuizDto],
    description: 'Array of quizzes to create',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AdminCreateQuizDto)
  quizzes!: AdminCreateQuizDto[];
}
