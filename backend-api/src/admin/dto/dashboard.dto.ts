import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// Response DTOs
// ============================================================================

export class UserMetricsDto {
  @ApiProperty({ example: 1500, description: 'Total registered users' })
  totalUsers!: number;

  @ApiProperty({ example: 1200, description: 'Users who have been active in last 30 days' })
  activeUsers!: number;

  @ApiProperty({ example: 25, description: 'Users who signed up today' })
  newUsersToday!: number;

  @ApiProperty({ example: 150, description: 'Users who signed up this week' })
  newUsersThisWeek!: number;

  @ApiProperty({ example: 500, description: 'Users who signed up this month' })
  newUsersThisMonth!: number;

  @ApiProperty({ example: 50, description: 'Currently banned users' })
  bannedUsers!: number;
}

export class ContentMetricsDto {
  @ApiProperty({ example: 10, description: 'Total courses' })
  totalCourses!: number;

  @ApiProperty({ example: 8, description: 'Published courses' })
  publishedCourses!: number;

  @ApiProperty({ example: 50, description: 'Total levels' })
  totalLevels!: number;

  @ApiProperty({ example: 45, description: 'Published levels' })
  publishedLevels!: number;

  @ApiProperty({ example: 150, description: 'Total lessons' })
  totalLessons!: number;

  @ApiProperty({ example: 140, description: 'Published lessons' })
  publishedLessons!: number;
}

export class EngagementMetricsDto {
  @ApiProperty({ example: 500000, description: 'Total XP awarded to all users' })
  totalXpAwarded!: number;

  @ApiProperty({ example: 2500, description: 'Total lessons completed by all users' })
  totalLessonCompletions!: number;

  @ApiProperty({ example: 45.5, description: 'Average course completion percentage' })
  averageCompletionRate!: number;

  @ApiProperty({ example: 15, description: 'Average daily active users this week' })
  averageDailyActiveUsers!: number;

  @ApiProperty({ example: 7, description: 'Average streak length across all users' })
  averageStreakLength!: number;
}

export class DashboardMetricsDto {
  @ApiProperty({ type: UserMetricsDto })
  users!: UserMetricsDto;

  @ApiProperty({ type: ContentMetricsDto })
  content!: ContentMetricsDto;

  @ApiProperty({ type: EngagementMetricsDto })
  engagement!: EngagementMetricsDto;
}

export class RecentSignupDto {
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

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  createdAt!: Date;

  @ApiProperty({ example: 'google', description: 'Sign-up method' })
  signupMethod!: string;
}

export class RecentSignupsResponseDto {
  @ApiProperty({ type: [RecentSignupDto] })
  data!: RecentSignupDto[];

  @ApiProperty({ example: 25, description: 'Total new users in specified period' })
  totalInPeriod!: number;
}

export class SystemHealthDto {
  @ApiProperty({ enum: ['healthy', 'degraded', 'down'], example: 'healthy' })
  database!: 'healthy' | 'degraded' | 'down';

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  lastChecked!: Date;

  @ApiProperty({ example: 86400, description: 'Server uptime in seconds' })
  uptime!: number;

  @ApiProperty({ example: '1.0.0', description: 'API version' })
  version!: string;

  @ApiProperty({ example: 'production', description: 'Current environment' })
  environment!: string;
}

export class RecentActivityDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'USER_SIGNUP', description: 'Activity type' })
  type!: string;

  @ApiProperty({ example: 'New user johndoe signed up', description: 'Activity description' })
  description!: string;

  @ApiPropertyOptional({ example: 'clx1234567890', description: 'Related user ID' })
  userId?: string;

  @ApiPropertyOptional({ example: 'johndoe', description: 'Related username' })
  username?: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  createdAt!: Date;
}

export class DashboardOverviewDto {
  @ApiProperty({ type: DashboardMetricsDto })
  metrics!: DashboardMetricsDto;

  @ApiProperty({ type: [RecentSignupDto] })
  recentSignups!: RecentSignupDto[];

  @ApiProperty({ type: [RecentActivityDto] })
  recentActivity!: RecentActivityDto[];

  @ApiProperty({ type: SystemHealthDto })
  health!: SystemHealthDto;
}
