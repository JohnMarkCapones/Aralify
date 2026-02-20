import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsInt,
  IsOptional,
  Min,
  Max,
  IsIn,
} from 'class-validator';

// ============================================================================
// Profile Assessment DTOs
// ============================================================================

export class SubmitAssessmentDto {
  @ApiProperty({
    description: 'Why do you want to learn programming?',
    example: ['career_change', 'freelance'],
    enum: [
      'career_change',
      'freelance',
      'hobby',
      'school',
      'startup',
      'automate_work',
    ],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  motivation!: string[];

  @ApiPropertyOptional({
    description: 'What do you want to build? (pick up to 3)',
    example: ['personal_website', 'mobile_app'],
    enum: [
      'personal_website',
      'mobile_app',
      'game',
      'chatbot',
      'data_dashboard',
      'automation',
      'social_platform',
      'hardware_project',
    ],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dreamProject?: string[];

  @ApiPropertyOptional({
    description: 'What subjects do you enjoy?',
    example: ['math', 'puzzles'],
    enum: [
      'math',
      'art_design',
      'science',
      'writing',
      'music',
      'business',
      'puzzles',
      'social_studies',
    ],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjectInterests?: string[];

  @ApiPropertyOptional({
    description: 'How would your friends describe you?',
    example: 'analytical',
    enum: ['creative', 'analytical', 'organizer', 'communicator', 'builder'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['creative', 'analytical', 'organizer', 'communicator', 'builder'])
  personalityType?: string;

  @ApiProperty({
    description: 'What industries/domains excite you?',
    example: ['web', 'mobile'],
    enum: [
      'web',
      'mobile',
      'data_science',
      'ai_ml',
      'games',
      'devops',
      'cybersecurity',
      'embedded',
    ],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  industryInterests!: string[];

  @ApiProperty({
    description: 'Preferred learning style',
    example: 'structured_path',
    enum: ['structured_path', 'explore_freely', 'project_based', 'challenge_driven'],
  })
  @IsString()
  @IsIn(['structured_path', 'explore_freely', 'project_based', 'challenge_driven'])
  workStyle!: string;

  @ApiPropertyOptional({
    description: 'How do you feel about math?',
    example: 'comfortable',
    enum: ['love_it', 'comfortable', 'neutral', 'avoid', 'struggle'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['love_it', 'comfortable', 'neutral', 'avoid', 'struggle'])
  mathComfort?: string;

  @ApiPropertyOptional({
    description: 'What does your typical day look like?',
    example: 'student_full',
    enum: ['student_full', 'working_full', 'working_part', 'stay_home', 'busy_parent'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['student_full', 'working_full', 'working_part', 'stay_home', 'busy_parent'])
  dailyRoutine?: string;

  @ApiProperty({
    description: 'Learning timeline',
    example: '3_months',
    enum: ['1_month', '3_months', '6_months', '1_year', 'no_rush'],
  })
  @IsString()
  @IsIn(['1_month', '3_months', '6_months', '1_year', 'no_rush'])
  timeHorizon!: string;

  @ApiProperty({
    description: 'Coding experience level',
    example: 'some_tutorials',
    enum: ['never', 'tried_once', 'some_tutorials', 'school_course', 'professional'],
  })
  @IsString()
  @IsIn(['never', 'tried_once', 'some_tutorials', 'school_course', 'professional'])
  background!: string;

  @ApiPropertyOptional({
    description: 'How do you prefer to learn?',
    example: 'hands_on',
    enum: ['video_first', 'read_first', 'hands_on', 'mixed'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['video_first', 'read_first', 'hands_on', 'mixed'])
  contentPreference?: string;

  @ApiProperty({
    description: 'Analytical/logic score from mini-quiz (0-100)',
    example: 65,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  analyticalScore!: number;

  @ApiProperty({
    description: 'User context/demographic',
    example: 'student_college',
    enum: [
      'student_hs',
      'student_college',
      'career_changer',
      'professional_upskill',
      'parent_returner',
    ],
  })
  @IsString()
  @IsIn(['student_hs', 'student_college', 'career_changer', 'professional_upskill', 'parent_returner'])
  contextProfile!: string;

  @ApiPropertyOptional({
    description: 'Daily time commitment in minutes',
    example: 30,
  })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(240)
  dailyCommitmentMins?: number;
}

export class LearningProfileResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  motivation!: string[];

  @ApiPropertyOptional()
  dreamProject?: string[];

  @ApiPropertyOptional()
  subjectInterests?: string[];

  @ApiPropertyOptional()
  personalityType?: string;

  @ApiProperty()
  industryInterests!: string[];

  @ApiProperty()
  workStyle!: string;

  @ApiPropertyOptional()
  mathComfort?: string;

  @ApiPropertyOptional()
  dailyRoutine?: string;

  @ApiProperty()
  timeHorizon!: string;

  @ApiProperty()
  background!: string;

  @ApiPropertyOptional()
  contentPreference?: string;

  @ApiProperty()
  analyticalScore!: number;

  @ApiProperty()
  contextProfile!: string;

  @ApiProperty()
  difficultyScore!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
