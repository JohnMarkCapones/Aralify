import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  IsIn,
  MaxLength,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';

// ============================================================================
// Onboarding Request DTOs
// ============================================================================

export class CompleteOnboardingDto {
  @ApiPropertyOptional({ example: 'John Doe', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  displayName?: string;

  @ApiPropertyOptional({ example: 'avatar-preset-3' })
  @IsOptional()
  @IsString()
  avatarPreset?: string;

  @ApiProperty({ example: ['python', 'javascript'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  interestedLanguages!: string[];

  @ApiProperty({
    example: 'COMPLETE_BEGINNER',
    enum: ['COMPLETE_BEGINNER', 'SOME_EXPERIENCE', 'INTERMEDIATE', 'ADVANCED'],
  })
  @IsString()
  @IsIn(['COMPLETE_BEGINNER', 'SOME_EXPERIENCE', 'INTERMEDIATE', 'ADVANCED'])
  skillLevel!: string;

  @ApiProperty({ example: ['web-dev', 'get-job'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  learningGoals!: string[];

  @ApiProperty({ example: 30, minimum: 10, maximum: 60 })
  @IsInt()
  @Min(10)
  @Max(60)
  dailyCommitmentMins!: number;
}

// ============================================================================
// Onboarding Response DTOs
// ============================================================================

export class OnboardingStatusDto {
  @ApiProperty({ example: false })
  onboardingCompleted!: boolean;

  @ApiProperty({ example: 0 })
  onboardingStep!: number;
}
