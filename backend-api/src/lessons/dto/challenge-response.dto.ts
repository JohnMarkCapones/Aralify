import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChallengeSubmissionResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'clx1234567890' })
  submissionId!: string;

  @ApiProperty({ example: 'clx0987654321' })
  challengeId!: string;

  @ApiProperty({
    example: 'SUBMITTED',
    description: 'Submission status: SUBMITTED, PASSED, or FAILED',
  })
  status!: string;

  @ApiProperty({ example: 1, description: 'Attempt number for this challenge' })
  attemptNumber!: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'XP awarded (only non-zero when PASSED and first successful attempt)',
  })
  xpAwarded?: number;

  @ApiPropertyOptional({
    description: 'Test results (populated after code execution)',
    example: null,
  })
  testResults?: any;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt!: Date;
}

export class ChallengeSubmissionsHistoryDto {
  @ApiProperty({ example: 'clx0987654321' })
  challengeId!: string;

  @ApiProperty({ example: 3 })
  totalAttempts!: number;

  @ApiProperty({
    example: 'PASSED',
    description: 'Best status achieved: SUBMITTED, PASSED, or FAILED',
  })
  bestStatus!: string;

  @ApiProperty({ example: 40 })
  totalXpEarned!: number;

  @ApiProperty({ type: [ChallengeSubmissionResponseDto] })
  submissions!: ChallengeSubmissionResponseDto[];
}
