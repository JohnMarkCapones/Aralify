import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class SubmitChallengeDto {
  @ApiProperty({
    example: 'def add(a, b):\n    return a + b',
    description: 'The code submitted by the user',
  })
  @IsString()
  code!: string;

  @ApiProperty({
    example: 71,
    description: 'Judge0 language ID',
  })
  @IsInt()
  languageId!: number;

  @ApiPropertyOptional({
    example: 120,
    description: 'Time spent on this challenge in seconds',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentSeconds?: number;
}
