import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// Career Path DTOs
// ============================================================================

export class PathNodeDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'HTML & CSS Fundamentals' })
  skillName!: string;

  @ApiPropertyOptional({ example: 'Learn the building blocks of the web' })
  description?: string;

  @ApiProperty({ example: 0 })
  orderIndex!: number;

  @ApiProperty({ example: true })
  isRequired!: boolean;

  @ApiProperty({ example: 20 })
  estimatedHours!: number;

  @ApiPropertyOptional({ example: 'clx1234567890' })
  courseId?: string;

  @ApiPropertyOptional({ example: 'html-css-basics' })
  courseSlug?: string;

  @ApiPropertyOptional({ example: 'HTML & CSS' })
  courseTitle?: string;

  @ApiPropertyOptional({
    description: 'IDs of prerequisite nodes',
    example: [],
  })
  prerequisiteIds?: string[];

  @ApiPropertyOptional({ example: false })
  isCompleted?: boolean;
}

export class CareerPathListItemDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'frontend-developer' })
  slug!: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title!: string;

  @ApiProperty({ example: 'Build beautiful, interactive web experiences' })
  description!: string;

  @ApiPropertyOptional({ example: 'Build web UIs' })
  shortDescription?: string;

  @ApiProperty({ example: 'web' })
  industry!: string;

  @ApiProperty({ example: 200 })
  estimatedHours!: number;

  @ApiProperty({ example: 85 })
  marketDemand!: number;

  @ApiProperty({ example: 4 })
  totalNodes!: number;

  @ApiPropertyOptional({ example: '#3B82F6' })
  color?: string;

  @ApiPropertyOptional()
  iconUrl?: string;
}

export class CareerPathDetailDto extends CareerPathListItemDto {
  @ApiProperty({ example: 75 })
  salaryImpact!: number;

  @ApiProperty({ example: 50 })
  analyticalReq!: number;

  @ApiProperty({ type: [PathNodeDto] })
  nodes!: PathNodeDto[];

  @ApiPropertyOptional({
    description: 'Outcomes this path enables',
    example: ['career_change', 'freelance'],
  })
  outcomes?: string[];

  @ApiPropertyOptional()
  enrollmentCount?: number;
}

export class CareerPathProgressDto {
  @ApiProperty({ example: 'clx1234567890' })
  careerPathId!: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title!: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'PAUSED', 'COMPLETED', 'ABANDONED'] })
  status!: string;

  @ApiProperty({ example: 45.5 })
  completionPercentage!: number;

  @ApiProperty({ example: 2 })
  nodesCompleted!: number;

  @ApiProperty({ example: 5 })
  totalNodes!: number;

  @ApiPropertyOptional({ example: 'clx1234567890' })
  currentNodeId?: string;

  @ApiPropertyOptional({ example: 'JavaScript Fundamentals' })
  currentNodeName?: string;

  @ApiProperty()
  startedAt!: Date;

  @ApiPropertyOptional()
  completedAt?: Date;

  @ApiProperty({ type: [PathNodeDto] })
  nodes!: PathNodeDto[];
}

export class EnrollCareerPathResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'clx1234567890' })
  careerPathId!: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title!: string;

  @ApiPropertyOptional({ example: 'clx1234567890' })
  firstNodeId?: string;

  @ApiPropertyOptional({ example: 'HTML & CSS Fundamentals' })
  firstNodeName?: string;

  @ApiPropertyOptional({ example: 'html-css-basics' })
  firstCourseSlug?: string;
}
