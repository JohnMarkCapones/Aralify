import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { AuditAction } from '@prisma/client';

// ============================================================================
// Request DTOs
// ============================================================================

export class GetAuditLogsQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 50, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ example: 'clx1234567890', description: 'Filter by admin ID' })
  @IsOptional()
  @IsString()
  adminId?: string;

  @ApiPropertyOptional({ enum: AuditAction, description: 'Filter by action type' })
  @IsOptional()
  @IsEnum(AuditAction)
  action?: AuditAction;

  @ApiPropertyOptional({ example: 'User', description: 'Filter by entity type (User, Course, Level, Lesson)' })
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional({ example: 'clx1234567890', description: 'Filter by entity ID' })
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z', description: 'Filter from date' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ example: '2024-01-31T23:59:59Z', description: 'Filter to date' })
  @IsOptional()
  @IsDateString()
  to?: string;
}

// ============================================================================
// Response DTOs
// ============================================================================

export class AuditLogAdminDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'admin_user' })
  username!: string;

  @ApiPropertyOptional({ example: 'Admin User' })
  displayName?: string | null;
}

export class AuditLogDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ type: AuditLogAdminDto })
  admin!: AuditLogAdminDto;

  @ApiProperty({ enum: AuditAction, example: 'USER_BANNED' })
  action!: AuditAction;

  @ApiProperty({ example: 'User', description: 'Type of entity affected' })
  entityType!: string;

  @ApiProperty({ example: 'clx1234567890', description: 'ID of entity affected' })
  entityId!: string;

  @ApiPropertyOptional({ description: 'Previous state before change' })
  oldValue?: Record<string, unknown> | null;

  @ApiPropertyOptional({ description: 'New state after change' })
  newValue?: Record<string, unknown> | null;

  @ApiPropertyOptional({ example: 'Violation of community guidelines' })
  reason?: string | null;

  @ApiPropertyOptional({ example: '192.168.1.1' })
  ipAddress?: string | null;

  @ApiPropertyOptional({ example: 'Mozilla/5.0...' })
  userAgent?: string | null;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  createdAt!: Date;
}

export class AuditLogDetailDto extends AuditLogDto {
  @ApiPropertyOptional({ description: 'Entity details at time of action' })
  entitySnapshot?: Record<string, unknown>;
}

export class AuditLogListResponseDto {
  @ApiProperty({ type: [AuditLogDto] })
  data!: AuditLogDto[];

  @ApiProperty()
  pagination!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
