import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// Response DTOs
// ============================================================================

export class BlogPostListItemDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'introducing-aralify' })
  slug!: string;

  @ApiProperty({ example: 'Introducing Aralify: Learn to Code in Filipino' })
  title!: string;

  @ApiPropertyOptional({
    example: 'We are excited to announce the launch of Aralify...',
  })
  excerpt?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/blog-cover.jpg' })
  coverImageUrl?: string | null;

  @ApiPropertyOptional({ example: 'announcement' })
  category?: string | null;

  @ApiProperty({ example: ['announcement', 'launch'], type: [String] })
  tags!: string[];

  @ApiPropertyOptional({ example: 'Aralify Team' })
  authorName?: string | null;

  @ApiPropertyOptional({ example: '2026-02-01T00:00:00.000Z', type: Date })
  publishedAt?: Date | null;
}

export class BlogPostDetailDto extends BlogPostListItemDto {
  @ApiProperty({
    example: '# Introducing Aralify\n\nFull blog post content in markdown...',
    description: 'Full blog post content',
  })
  content!: string;
}

export class BlogPostListResponseDto {
  @ApiProperty({ type: [BlogPostListItemDto] })
  data!: BlogPostListItemDto[];

  @ApiProperty({ example: 25, description: 'Total number of matching posts' })
  total!: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page!: number;

  @ApiProperty({ example: 10, description: 'Items per page' })
  limit!: number;
}
