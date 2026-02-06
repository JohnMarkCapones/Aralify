import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum CommentSortOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  POPULAR = 'popular',
}

export class CommentsQueryDto {
  @ApiPropertyOptional({
    enum: CommentSortOrder,
    example: CommentSortOrder.NEWEST,
    description: 'Sort order for comments',
  })
  @IsOptional()
  @IsEnum(CommentSortOrder)
  sort?: CommentSortOrder;

  @ApiPropertyOptional({ example: 20, description: 'Number of items to return (max 100)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ example: 0, description: 'Number of items to skip' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}
