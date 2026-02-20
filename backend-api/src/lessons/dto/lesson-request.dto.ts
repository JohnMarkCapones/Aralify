import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class CompleteLessonDto {
  @ApiProperty({
    example: 300,
    description: 'Time spent on the lesson in seconds',
  })
  @IsInt()
  @Min(0)
  timeSpentSeconds!: number;

  @ApiPropertyOptional({
    example: 85,
    description: 'Score achieved (0-100)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  score?: number;
}

export class SubmitQuizAnswerDto {
  @ApiProperty({
    example: 'Option A - Correct',
    description: 'The answer submitted by the user',
  })
  @IsString()
  answer!: string;

  @ApiPropertyOptional({
    example: 45,
    description: 'Time spent on this question in seconds',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentSeconds?: number;
}

export class UnlockHintDto {
  @ApiProperty({
    example: 'clx1234567890',
    description: 'Challenge ID to unlock hint for',
  })
  challengeId!: string;
}
