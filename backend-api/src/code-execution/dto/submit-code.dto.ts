import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, MaxLength, Min } from 'class-validator';

export class SubmitCodeDto {
  @ApiProperty({
    example: 'def add(a, b):\n    return a + b',
    description: 'Source code to submit',
    maxLength: 10000,
  })
  @IsString()
  @MaxLength(10000)
  code!: string;

  @ApiProperty({
    example: 71,
    description: 'Language ID (e.g., 71 = Python 3)',
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
