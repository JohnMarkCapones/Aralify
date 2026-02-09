import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// Recommendation Response DTOs
// ============================================================================

export class ScoreBreakdownDto {
  @ApiProperty({ example: 0.85 })
  interestAlignment!: number;

  @ApiProperty({ example: 0.72 })
  goalAlignment!: number;

  @ApiProperty({ example: 0.60 })
  skillGap!: number;

  @ApiProperty({ example: 0.90 })
  timeViability!: number;

  @ApiProperty({ example: 0.75 })
  marketDemand!: number;

  @ApiProperty({ example: 0.65 })
  communityPopularity!: number;

  @ApiProperty({ example: 0.70 })
  cognitiveMatch!: number;
}

export class PathRecommendationDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'frontend-developer' })
  slug!: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title!: string;

  @ApiProperty({ example: 'Build beautiful, interactive web experiences' })
  description!: string;

  @ApiPropertyOptional({ example: 'web' })
  industry?: string;

  @ApiProperty({ example: 200 })
  estimatedHours!: number;

  @ApiProperty({ example: 0.87, description: 'Overall match score (0-1)' })
  score!: number;

  @ApiProperty({ example: 87, description: 'Match percentage' })
  matchPercentage!: number;

  @ApiProperty({ type: ScoreBreakdownDto })
  scoreBreakdown!: ScoreBreakdownDto;

  @ApiProperty({ example: 1, description: 'Rank position (1 = best match)' })
  rank!: number;

  @ApiPropertyOptional({ example: 85 })
  marketDemand?: number;

  @ApiPropertyOptional({ example: '#3B82F6' })
  color?: string;

  @ApiPropertyOptional()
  iconUrl?: string;
}

export class NextLessonRecommendationDto {
  @ApiProperty({ example: 'clx1234567890' })
  lessonId!: string;

  @ApiProperty({ example: 'Variables and Data Types' })
  title!: string;

  @ApiProperty({ example: 'MEDIUM', enum: ['EASY', 'MEDIUM', 'HARD'] })
  recommendedDifficulty!: string;

  @ApiProperty({ example: 'python-basics' })
  courseSlug!: string;

  @ApiProperty({ example: 'Python Basics' })
  courseTitle!: string;

  @ApiProperty({ example: 'Based on your recent performance, MEDIUM difficulty is optimal' })
  reason!: string;

  @ApiProperty({ example: 200 })
  estimatedXp!: number;

  @ApiProperty({ example: 15 })
  estimatedMinutes!: number;
}

export class DailyRecommendationDto {
  @ApiProperty({ type: [NextLessonRecommendationDto] })
  lessons!: NextLessonRecommendationDto[];

  @ApiProperty({ example: 30 })
  totalEstimatedMinutes!: number;

  @ApiProperty({ example: 'MEDIUM' })
  currentDifficultyLevel!: string;

  @ApiProperty({ example: 0.62 })
  difficultyScore!: number;

  @ApiPropertyOptional({
    description: 'Engagement-based nudge message',
    example: 'Great streak! Keep it going with today\'s lessons.',
  })
  nudgeMessage?: string;
}

export class DismissRecommendationDto {
  @ApiProperty({ example: 'not_interested' })
  reason?: string;
}

export class RecalibrateResponseDto {
  @ApiProperty({ example: 0.65 })
  previousScore!: number;

  @ApiProperty({ example: 0.72 })
  newScore!: number;

  @ApiProperty({ example: 'MEDIUM' })
  previousDifficulty!: string;

  @ApiProperty({ example: 'HARD' })
  newDifficulty!: string;

  @ApiProperty({ example: 'Your recent quiz accuracy of 92% and fast completion times suggest you\'re ready for harder challenges.' })
  explanation!: string;
}
