import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TestCaseResultDto {
  @ApiProperty({ example: 1 })
  testCase!: number;

  @ApiProperty({ example: '5\n3' })
  input!: string;

  @ApiProperty({ example: '8' })
  expectedOutput!: string;

  @ApiPropertyOptional({ example: '8' })
  actualOutput!: string | null;

  @ApiProperty({ example: true })
  passed!: boolean;

  @ApiPropertyOptional({ example: 12 })
  executionTimeMs!: number | null;

  @ApiPropertyOptional({ example: 3200 })
  memoryUsedKb!: number | null;

  @ApiProperty({ example: 'Accepted' })
  status!: string;

  @ApiPropertyOptional({ example: null })
  errorOutput!: string | null;
}

export class ExecutionResultDto {
  @ApiPropertyOptional({ example: '8\n' })
  stdout!: string | null;

  @ApiPropertyOptional({ example: null })
  stderr!: string | null;

  @ApiProperty({ type: [TestCaseResultDto] })
  testResults!: TestCaseResultDto[];

  @ApiProperty({ example: 3 })
  passed!: number;

  @ApiProperty({ example: 0 })
  failed!: number;

  @ApiProperty({ example: 3 })
  total!: number;

  @ApiProperty({ example: 'PASSED', enum: ['PASSED', 'FAILED', 'ERROR'] })
  overallStatus!: 'PASSED' | 'FAILED' | 'ERROR';
}

export class GamificationResultDto {
  @ApiProperty({ example: 100 })
  xpAwarded!: number;

  @ApiProperty({ example: 2500 })
  newTotal!: number;

  @ApiProperty({ example: false })
  levelUp!: boolean;

  @ApiProperty({ example: 5 })
  newLevel!: number;

  @ApiProperty({ example: 'Apprentice' })
  rankTitle!: string;
}

export class SubmissionResultDto extends ExecutionResultDto {
  @ApiProperty({ example: 'clx1234567890' })
  submissionId!: string;

  @ApiProperty({ example: true })
  allTestsPassed!: boolean;

  @ApiProperty({ example: 100 })
  xpEarned!: number;

  @ApiProperty({ example: 1 })
  attemptNumber!: number;

  @ApiProperty({ example: false })
  previouslyPassed!: boolean;

  @ApiPropertyOptional({ type: GamificationResultDto })
  gamification!: GamificationResultDto | null;
}
