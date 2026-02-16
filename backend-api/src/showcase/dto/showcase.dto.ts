import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// ── Request DTOs ────────────────────────────────────────────

export class CreateShowcaseDto {
  @ApiProperty({
    example: 'My Awesome Portfolio',
    description: 'Project title (max 200 characters)',
  })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiProperty({
    example: 'A portfolio website built with React and TypeScript',
    description: 'Project description (max 2000 characters)',
  })
  @IsString()
  @MaxLength(2000)
  description!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/thumbnail.jpg',
    description: 'Thumbnail image URL',
  })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    example: 'https://my-project.vercel.app',
    description: 'Live project URL',
  })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/user/project',
    description: 'Repository URL',
  })
  @IsOptional()
  @IsString()
  repoUrl?: string;

  @ApiPropertyOptional({
    example: ['react', 'typescript', 'tailwind'],
    description: 'Project tags',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class UpdateShowcaseDto {
  @ApiPropertyOptional({
    example: 'My Updated Portfolio',
    description: 'Project title (max 200 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    example: 'An updated portfolio description',
    description: 'Project description (max 2000 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/new-thumbnail.jpg',
    description: 'Thumbnail image URL',
  })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    example: 'https://my-project.vercel.app',
    description: 'Live project URL',
  })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/user/project',
    description: 'Repository URL',
  })
  @IsOptional()
  @IsString()
  repoUrl?: string;

  @ApiPropertyOptional({
    example: ['react', 'typescript', 'tailwind'],
    description: 'Project tags',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

// ── Response DTOs ───────────────────────────────────────────

export class ShowcaseAuthorDto {
  @ApiProperty({ example: 'johndoe' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatarUrl?: string | null;
}

export class ShowcaseProjectDto {
  @ApiProperty({ example: 'clxyz123' })
  id!: string;

  @ApiProperty({ example: 'my-awesome-portfolio-a1b2' })
  slug!: string;

  @ApiProperty({ example: 'My Awesome Portfolio' })
  title!: string;

  @ApiProperty({ example: 'A portfolio website built with React and TypeScript' })
  description!: string;

  @ApiPropertyOptional({ example: 'https://example.com/thumbnail.jpg' })
  thumbnailUrl?: string | null;

  @ApiPropertyOptional({ example: 'https://my-project.vercel.app' })
  liveUrl?: string | null;

  @ApiPropertyOptional({ example: 'https://github.com/user/project' })
  repoUrl?: string | null;

  @ApiPropertyOptional({
    example: ['react', 'typescript', 'tailwind'],
    type: [String],
  })
  tags?: string[] | null;

  @ApiProperty({ example: 'PENDING' })
  status!: string;

  @ApiProperty()
  author!: ShowcaseAuthorDto;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  updatedAt!: string;
}

export class ShowcaseListResponseDto {
  @ApiProperty({ type: [ShowcaseProjectDto] })
  data!: ShowcaseProjectDto[];

  @ApiProperty({ example: 42 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 12 })
  limit!: number;
}
