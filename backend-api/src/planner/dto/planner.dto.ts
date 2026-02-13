import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// ── Request DTOs ────────────────────────────────────────

export class CreateGoalDto {
  @ApiProperty({
    example: 'Complete NestJS course',
    description: 'Goal title (max 200 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional({
    example: 'Finish all modules and pass the final quiz',
    description: 'Goal description (max 1000 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    example: '2026-03-31',
    description: 'Target date (ISO date string)',
  })
  @IsOptional()
  @IsString()
  targetDate?: string;
}

export class UpdateGoalDto {
  @ApiPropertyOptional({
    example: 'Complete NestJS course',
    description: 'Goal title (max 200 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    example: 'Finish all modules and pass the final quiz',
    description: 'Goal description (max 1000 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    example: '2026-03-31',
    description: 'Target date (ISO date string)',
  })
  @IsOptional()
  @IsString()
  targetDate?: string;

  @ApiPropertyOptional({
    example: 'COMPLETED',
    description: 'Goal status',
    enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'],
  })
  @IsOptional()
  @IsIn(['ACTIVE', 'COMPLETED', 'CANCELLED'])
  status?: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

export class CreateTaskDto {
  @ApiProperty({
    example: 'Read chapter 3 on middleware',
    description: 'Task title (max 200 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional({
    example: 'Focus on guard and interceptor patterns',
    description: 'Task description (max 1000 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    example: 'clxyz123',
    description: 'ID of the goal this task belongs to',
  })
  @IsOptional()
  @IsString()
  goalId?: string;

  @ApiPropertyOptional({
    example: '2026-02-15',
    description: 'Due date (ISO date string)',
  })
  @IsOptional()
  @IsString()
  dueDate?: string;

  @ApiPropertyOptional({
    example: 'PENDING',
    description: 'Task status',
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'],
  })
  @IsOptional()
  @IsIn(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'])
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
}

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Read chapter 3 on middleware',
    description: 'Task title (max 200 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    example: 'Focus on guard and interceptor patterns',
    description: 'Task description (max 1000 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    example: 'clxyz123',
    description: 'ID of the goal this task belongs to',
  })
  @IsOptional()
  @IsString()
  goalId?: string;

  @ApiPropertyOptional({
    example: '2026-02-15',
    description: 'Due date (ISO date string)',
  })
  @IsOptional()
  @IsString()
  dueDate?: string;

  @ApiPropertyOptional({
    example: 'IN_PROGRESS',
    description: 'Task status',
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'],
  })
  @IsOptional()
  @IsIn(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'])
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
}

// ── Response DTOs ───────────────────────────────────────

export class PlannerGoalDto {
  @ApiProperty({ example: 'clxyz456' })
  id!: string;

  @ApiProperty({ example: 'Complete NestJS course' })
  title!: string;

  @ApiPropertyOptional({ example: 'Finish all modules and pass the final quiz' })
  description!: string | null;

  @ApiPropertyOptional({ example: '2026-03-31T00:00:00.000Z' })
  targetDate!: string | null;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'] })
  status!: string;

  @ApiProperty({ example: '2026-02-12T10:30:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-02-12T10:30:00.000Z' })
  updatedAt!: string;
}

export class PlannerTaskDto {
  @ApiProperty({ example: 'clxyz789' })
  id!: string;

  @ApiProperty({ example: 'Read chapter 3 on middleware' })
  title!: string;

  @ApiPropertyOptional({ example: 'Focus on guard and interceptor patterns' })
  description!: string | null;

  @ApiPropertyOptional({ example: 'clxyz456' })
  goalId!: string | null;

  @ApiPropertyOptional({ example: '2026-02-15T00:00:00.000Z' })
  dueDate!: string | null;

  @ApiProperty({ example: 'PENDING', enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'] })
  status!: string;

  @ApiProperty({ example: '2026-02-12T10:30:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-02-12T10:30:00.000Z' })
  updatedAt!: string;
}
