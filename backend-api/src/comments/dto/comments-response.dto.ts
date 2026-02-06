import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommentAuthorDto {
  @ApiProperty({ example: 'clxyz123' })
  userId!: string;

  @ApiProperty({ example: 'johndoe' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatarUrl?: string | null;
}

export class CommentDto {
  @ApiProperty({ example: 'clxyz456' })
  id!: string;

  @ApiProperty({ example: 'clxyz789' })
  lessonId!: string;

  @ApiProperty()
  author!: CommentAuthorDto;

  @ApiProperty({ example: 'This lesson was really helpful!' })
  content!: string;

  @ApiProperty({ example: false })
  isEdited!: boolean;

  @ApiProperty({ example: 5 })
  likesCount!: number;

  @ApiProperty({ example: false })
  isPinned!: boolean;

  @ApiProperty({ example: false })
  isDeleted!: boolean;

  @ApiProperty({ example: false })
  isLikedByMe!: boolean;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  updatedAt!: string;

  @ApiPropertyOptional({ type: () => [CommentDto] })
  replies?: CommentDto[];

  @ApiProperty({ example: 2 })
  repliesCount!: number;
}

export class CommentsListResponseDto {
  @ApiProperty({ type: [CommentDto] })
  comments!: CommentDto[];

  @ApiProperty({ example: 42 })
  total!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;

  @ApiProperty({ example: true })
  has_more!: boolean;
}

export class CommentResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty()
  comment!: CommentDto;
}

export class LikeResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 6 })
  likesCount!: number;
}

export class DeleteCommentResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;
}

export class ReportResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'clxyz999' })
  reportId!: string;
}
