import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsBoolean, IsDateString, IsInt, Min, Max, MinLength, MaxLength } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { UserRole } from '@prisma/client';

// ============================================================================
// Request DTOs
// ============================================================================

export class GetUsersQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number (1-indexed)', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20, description: 'Items per page', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ example: 'john', description: 'Search by username, email, or display name' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: UserRole, description: 'Filter by role' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: false, description: 'Filter by ban status' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isBanned?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Filter by active status' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ enum: ['createdAt', 'lastActiveAt', 'xpTotal', 'username'], default: 'createdAt' })
  @IsOptional()
  sortBy?: 'createdAt' | 'lastActiveAt' | 'xpTotal' | 'username';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

export class BanUserDto {
  @ApiProperty({ example: 'Violation of community guidelines', description: 'Reason for ban' })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  reason!: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z', description: 'Ban expiration date (optional for permanent ban)' })
  @IsOptional()
  @IsDateString()
  bannedUntil?: string;
}

export class UnbanUserDto {
  @ApiPropertyOptional({ example: 'Appeal approved', description: 'Reason for lifting ban' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

export class ChangeUserRoleDto {
  @ApiProperty({ enum: UserRole, example: 'MODERATOR', description: 'New role for the user' })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiPropertyOptional({ example: 'Promoted to content moderator', description: 'Reason for role change' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

export class DeleteUserDto {
  @ApiProperty({ example: 'Account requested deletion', description: 'Reason for deletion' })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  reason!: string;
}

// ============================================================================
// Response DTOs
// ============================================================================

export class AdminUserDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'johndoe' })
  username!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
  avatarUrl?: string | null;

  @ApiProperty({ enum: UserRole, example: 'USER' })
  role!: UserRole;

  @ApiProperty({ example: 1500 })
  xpTotal!: number;

  @ApiProperty({ example: 5 })
  level!: number;

  @ApiProperty({ example: 10 })
  streakCurrent!: number;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: false })
  isBanned!: boolean;

  @ApiPropertyOptional({ example: '2024-01-15T00:00:00Z' })
  bannedAt?: Date | null;

  @ApiPropertyOptional({ example: '2024-02-15T00:00:00Z' })
  bannedUntil?: Date | null;

  @ApiPropertyOptional({ example: 'Spam behavior' })
  banReason?: string | null;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt!: Date;

  @ApiPropertyOptional({ example: '2024-01-15T00:00:00Z' })
  lastLoginAt?: Date | null;

  @ApiPropertyOptional({ example: '2024-01-15T00:00:00Z' })
  lastActiveAt?: Date | null;

  @ApiProperty({ example: true, description: 'Has linked Google account' })
  hasGoogleAuth!: boolean;

  @ApiProperty({ example: false, description: 'Has linked GitHub account' })
  hasGithubAuth!: boolean;

  @ApiProperty({ example: false, description: 'Has linked Facebook account' })
  hasFacebookAuth!: boolean;
}

export class AdminUserDetailDto extends AdminUserDto {
  @ApiProperty({ example: 3, description: 'Number of courses started' })
  coursesStarted!: number;

  @ApiProperty({ example: 1, description: 'Number of courses completed' })
  coursesCompleted!: number;

  @ApiProperty({ example: 25, description: 'Number of lessons completed' })
  lessonsCompleted!: number;

  @ApiProperty({ example: 5, description: 'Number of achievements earned' })
  achievementsEarned!: number;

  @ApiProperty({ example: 3600, description: 'Total time spent in seconds' })
  totalTimeSpent!: number;
}

export class PaginationDto {
  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 150 })
  total!: number;

  @ApiProperty({ example: 8 })
  totalPages!: number;
}

export class AdminUserListResponseDto {
  @ApiProperty({ type: [AdminUserDto] })
  data!: AdminUserDto[];

  @ApiProperty({ type: PaginationDto })
  pagination!: PaginationDto;
}

export class BanUserResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'User has been banned' })
  message!: string;

  @ApiProperty({ type: AdminUserDto })
  user!: AdminUserDto;
}

export class UnbanUserResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'User ban has been lifted' })
  message!: string;

  @ApiProperty({ type: AdminUserDto })
  user!: AdminUserDto;
}

export class ChangeRoleResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'User role updated to MODERATOR' })
  message!: string;

  @ApiProperty({ type: AdminUserDto })
  user!: AdminUserDto;
}

export class DeleteUserResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'User account has been deleted' })
  message!: string;
}
