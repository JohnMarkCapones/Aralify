import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

// ── Request DTOs ──────────────────────────────────────────

export class CreateBookmarkDto {
  @ApiProperty({
    enum: ['LESSON', 'CHALLENGE', 'COURSE'],
    example: 'LESSON',
    description: 'Type of the bookmarked item',
  })
  @IsIn(['LESSON', 'CHALLENGE', 'COURSE'])
  targetType!: string;

  @ApiProperty({
    example: 'clxyz123',
    description: 'ID of the bookmarked item',
  })
  @IsString()
  targetId!: string;

  @ApiPropertyOptional({
    example: 'Review this lesson before the quiz',
    description: 'Optional note for the bookmark (max 500 characters)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

// ── Response DTOs ─────────────────────────────────────────

export class BookmarkDto {
  @ApiProperty({ example: 'clxyz456' })
  id!: string;

  @ApiProperty({ enum: ['LESSON', 'CHALLENGE', 'COURSE'], example: 'LESSON' })
  targetType!: string;

  @ApiProperty({ example: 'clxyz123' })
  targetId!: string;

  @ApiPropertyOptional({ example: 'Review this lesson before the quiz' })
  note?: string | null;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  createdAt!: string;
}

export class BookmarkListResponseDto {
  @ApiProperty({ type: [BookmarkDto] })
  bookmarks!: BookmarkDto[];
}

export class DeleteBookmarkResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;
}
