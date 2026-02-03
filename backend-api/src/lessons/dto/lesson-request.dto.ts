import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

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

export class UnlockHintDto {
  @ApiProperty({
    example: 'clx1234567890',
    description: 'Challenge ID to unlock hint for',
  })
  challengeId!: string;
}
