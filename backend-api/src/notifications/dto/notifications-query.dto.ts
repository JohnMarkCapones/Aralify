import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class NotificationsQueryDto {
  @ApiPropertyOptional({
    example: true,
    description: 'Filter to only unread notifications',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  unread?: boolean;

  @ApiPropertyOptional({
    example: 20,
    description: 'Number of notifications to return (max 50)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Number of notifications to skip',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}
