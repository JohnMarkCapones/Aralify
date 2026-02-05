import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';
import { ActivityType } from '@prisma/client';

export class PaginationQueryDto {
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

export class UserSearchQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'john', description: 'Search term (min 2 characters)' })
  @IsString()
  @MinLength(2)
  q!: string;
}

export class ActivityFeedQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    example: 'LESSON_COMPLETED',
    description: 'Filter by activity type',
    enum: ActivityType,
  })
  @IsOptional()
  @IsEnum(ActivityType)
  type?: ActivityType;
}
