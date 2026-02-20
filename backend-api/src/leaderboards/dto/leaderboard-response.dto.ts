import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeaderboardEntryDto {
  @ApiProperty({ example: 1, description: 'Rank position' })
  rank!: number;

  @ApiProperty({ example: 'clx1234567890', description: 'User ID' })
  userId!: string;

  @ApiProperty({ example: 'john_doe', description: 'Username' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'Display name' })
  displayName!: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png', description: 'Avatar URL' })
  avatarUrl!: string | null;

  @ApiProperty({ example: 5000, description: 'XP amount' })
  xp!: number;

  @ApiProperty({ example: 12, description: 'User level' })
  level!: number;

  @ApiProperty({ example: false, description: 'Whether this entry is the current user' })
  isCurrentUser!: boolean;
}

export class GlobalLeaderboardResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto], description: 'Ranked user entries' })
  rankings!: LeaderboardEntryDto[];

  @ApiPropertyOptional({ example: 42, description: 'Current user rank (null if not authenticated)' })
  userRank!: number | null;

  @ApiProperty({ example: 1500, description: 'Total active users' })
  totalUsers!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;
}

export class FriendsLeaderboardResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto], description: 'Ranked friend entries' })
  rankings!: LeaderboardEntryDto[];

  @ApiProperty({ example: 3, description: 'Total friends on leaderboard' })
  totalFriends!: number;
}

export class WeeklyLeaderboardResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto], description: 'Ranked entries for the week' })
  rankings!: LeaderboardEntryDto[];

  @ApiPropertyOptional({ example: 5, description: 'Current user rank this week' })
  userRank!: number | null;

  @ApiProperty({ example: '2026-02-02T00:00:00.000Z', description: 'Week start (Monday UTC)' })
  periodStart!: string;

  @ApiProperty({ example: '2026-02-09T00:00:00.000Z', description: 'Week end (next Monday UTC)' })
  periodEnd!: string;
}

export class MonthlyLeaderboardResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto], description: 'Ranked entries for the month' })
  rankings!: LeaderboardEntryDto[];

  @ApiPropertyOptional({ example: 8, description: 'Current user rank this month' })
  userRank!: number | null;

  @ApiProperty({ example: '2026-02', description: 'Month in YYYY-MM format' })
  month!: string;

  @ApiProperty({ example: '2026-02-01T00:00:00.000Z', description: 'Month start' })
  periodStart!: string;

  @ApiProperty({ example: '2026-03-01T00:00:00.000Z', description: 'Month end (exclusive)' })
  periodEnd!: string;
}

export class CourseLeaderboardResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto], description: 'Ranked entries for the course' })
  rankings!: LeaderboardEntryDto[];

  @ApiPropertyOptional({ example: 15, description: 'Current user rank in this course' })
  userRank!: number | null;

  @ApiProperty({ example: 'python-basics', description: 'Course slug' })
  courseSlug!: string;

  @ApiProperty({ example: 'Python Basics', description: 'Course title' })
  courseTitle!: string;
}

export class CourseRankDto {
  @ApiProperty({ example: 'python-basics' })
  courseSlug!: string;

  @ApiProperty({ example: 'Python Basics' })
  courseTitle!: string;

  @ApiProperty({ example: 5 })
  rank!: number;

  @ApiProperty({ example: 2400 })
  xp!: number;
}

export class UserRanksResponseDto {
  @ApiPropertyOptional({ example: 42, description: 'Global all-time rank' })
  globalRank!: number | null;

  @ApiPropertyOptional({ example: 15, description: 'Weekly rank' })
  weeklyRank!: number | null;

  @ApiPropertyOptional({ example: 23, description: 'Monthly rank' })
  monthlyRank!: number | null;

  @ApiPropertyOptional({ example: 3, description: 'Rank among mutual friends' })
  friendsRank!: number | null;

  @ApiProperty({ example: 92.5, description: 'Global percentile (top X%)' })
  percentile!: number;

  @ApiProperty({ type: [CourseRankDto], description: 'Per-course ranks' })
  courseRanks!: CourseRankDto[];
}

export class AroundUserResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto], description: 'Users around the current user' })
  rankings!: LeaderboardEntryDto[];

  @ApiProperty({ example: 42, description: 'Current user rank' })
  userRank!: number;

  @ApiProperty({ example: 'global', description: 'Leaderboard type' })
  type!: string;
}
