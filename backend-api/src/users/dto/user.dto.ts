import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// User Profile Response DTOs
// ============================================================================

export class UserProfileDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'johndoe' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatarUrl?: string | null;

  @ApiPropertyOptional({ example: 'I love coding!' })
  bio?: string | null;

  @ApiProperty({ example: 'en' })
  locale!: string;

  @ApiPropertyOptional({ example: 'Asia/Manila' })
  timezone?: string | null;

  @ApiProperty({ example: 2500 })
  xpTotal!: number;

  @ApiProperty({ example: 5 })
  level!: number;

  @ApiProperty({ example: 7 })
  streakCurrent!: number;

  @ApiProperty({ example: 14 })
  streakLongest!: number;

  @ApiProperty({ example: 'USER', enum: ['USER', 'MODERATOR', 'ADMIN'] })
  role!: string;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({ example: false })
  onboardingCompleted!: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt!: string;

  @ApiPropertyOptional({ example: '2024-01-15T00:00:00.000Z' })
  lastActiveAt?: string | null;
}

export class PublicUserProfileDto {
  @ApiProperty({ example: 'johndoe' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatarUrl?: string | null;

  @ApiPropertyOptional({ example: 'I love coding!' })
  bio?: string | null;

  @ApiPropertyOptional({ example: 2500, description: 'Only visible if privacy allows' })
  xpTotal?: number | null;

  @ApiPropertyOptional({ example: 5, description: 'Only visible if privacy allows' })
  level?: number | null;

  @ApiPropertyOptional({ example: 7, description: 'Only visible if privacy allows' })
  streakCurrent?: number | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt!: string;
}

// ============================================================================
// User Settings Response DTOs
// ============================================================================

export class NotificationSettingsDto {
  @ApiProperty({ example: true })
  emailEnabled!: boolean;

  @ApiProperty({ example: true })
  pushEnabled!: boolean;

  @ApiProperty({ example: true })
  streakReminders!: boolean;

  @ApiProperty({ example: true })
  achievementNotifs!: boolean;

  @ApiProperty({ example: true })
  socialNotifs!: boolean;
}

export class PrivacySettingsDto {
  @ApiProperty({ example: 'PUBLIC', enum: ['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE'] })
  profileVisibility!: string;

  @ApiProperty({ example: true })
  showProgress!: boolean;

  @ApiProperty({ example: true })
  showActivity!: boolean;

  @ApiProperty({ example: 'EVERYONE', enum: ['EVERYONE', 'FRIENDS_ONLY', 'NONE'] })
  allowMessages!: string;
}

export class UserSettingsDto {
  @ApiProperty({ example: 'dark', enum: ['light', 'dark', 'auto'] })
  theme!: string;

  @ApiProperty({ example: 'vs-dark' })
  codeEditorTheme!: string;

  @ApiProperty({ example: 14 })
  fontSize!: number;

  @ApiProperty({ example: 30 })
  dailyGoalMins!: number;

  @ApiProperty({ example: 'MEDIUM', enum: ['EASY', 'MEDIUM', 'HARD'] })
  difficultyPref!: string;

  @ApiProperty({ type: NotificationSettingsDto })
  notifications!: NotificationSettingsDto;

  @ApiProperty({ type: PrivacySettingsDto })
  privacy!: PrivacySettingsDto;
}

// ============================================================================
// User Stats Response DTOs
// ============================================================================

export class UserStatsDto {
  @ApiProperty({ example: 2500 })
  xpTotal!: number;

  @ApiProperty({ example: 5 })
  level!: number;

  @ApiProperty({ example: 7 })
  streakCurrent!: number;

  @ApiProperty({ example: 14 })
  streakLongest!: number;

  @ApiProperty({ example: 3 })
  coursesStarted!: number;

  @ApiProperty({ example: 1 })
  coursesCompleted!: number;

  @ApiProperty({ example: 25 })
  lessonsCompleted!: number;

  @ApiProperty({ example: 300 })
  totalTimeSpentMinutes!: number;

  @ApiProperty({ example: 5 })
  achievementsEarned!: number;

  @ApiProperty({ example: 2 })
  badgesEarned!: number;
}

export class PublicUserStatsDto {
  @ApiPropertyOptional({ example: 2500, description: 'Only visible if privacy allows' })
  xpTotal?: number | null;

  @ApiPropertyOptional({ example: 5, description: 'Only visible if privacy allows' })
  level?: number | null;

  @ApiPropertyOptional({ example: 1, description: 'Only visible if privacy allows' })
  coursesCompleted?: number | null;

  @ApiPropertyOptional({ example: 5, description: 'Only visible if privacy allows' })
  achievementsEarned?: number | null;
}

// ============================================================================
// User Courses Response DTO
// ============================================================================

export class UserCourseDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'python-basics' })
  slug!: string;

  @ApiProperty({ example: 'Python Basics' })
  title!: string;

  @ApiPropertyOptional({ example: 'Learn the fundamentals of Python' })
  description?: string | null;

  @ApiProperty({ example: 'python' })
  language!: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  iconUrl?: string | null;

  @ApiPropertyOptional({ example: '#3B82F6' })
  color?: string | null;

  @ApiProperty({ example: 65.5 })
  completionPercentage!: number;

  @ApiProperty({ example: 1200 })
  totalXpEarned!: number;

  @ApiPropertyOptional({ example: '2024-01-15T00:00:00.000Z' })
  lastActivityAt?: string | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  startedAt!: string;

  @ApiPropertyOptional({ example: '2024-02-01T00:00:00.000Z' })
  completedAt?: string | null;
}

// ============================================================================
// User Detailed Stats Response DTO
// ============================================================================

export class XpDataPointDto {
  @ApiProperty({ example: '2024-01-15' })
  date!: string;

  @ApiProperty({ example: 150 })
  xp!: number;
}

export class DifficultyBreakdownDto {
  @ApiProperty({ example: 10 })
  easy!: number;

  @ApiProperty({ example: 8 })
  medium!: number;

  @ApiProperty({ example: 3 })
  hard!: number;
}

export class UserDetailedStatsDto {
  @ApiProperty({ type: [XpDataPointDto] })
  xpOverTime!: XpDataPointDto[];

  @ApiProperty({ type: DifficultyBreakdownDto })
  difficultyBreakdown!: DifficultyBreakdownDto;

  @ApiProperty({ example: 45 })
  averageTimePerDayMins!: number;

  @ApiProperty({ example: 2500 })
  totalXp!: number;

  @ApiProperty({ example: 25 })
  lessonsCompleted!: number;

  @ApiProperty({ example: 7 })
  currentStreak!: number;
}

// ============================================================================
// User Certificates Response DTO
// ============================================================================

export class UserCertificateDto {
  @ApiProperty({ example: 'clx1234567890' })
  courseId!: string;

  @ApiProperty({ example: 'python-basics' })
  courseSlug!: string;

  @ApiProperty({ example: 'Python Basics' })
  courseTitle!: string;

  @ApiProperty({ example: '2024-02-01T00:00:00.000Z' })
  completedAt!: string;

  @ApiProperty({ example: 3500 })
  totalXpEarned!: number;
}

// ============================================================================
// User Challenge History Response DTO
// ============================================================================

export class ChallengeHistoryItemDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'clxchallenge123' })
  challengeId!: string;

  @ApiProperty({ example: 'Two Sum' })
  challengeTitle!: string;

  @ApiProperty({ example: 'PASSED', enum: ['SUBMITTED', 'PASSED', 'FAILED'] })
  status!: string;

  @ApiProperty({ example: 1 })
  attemptNumber!: number;

  @ApiProperty({ example: 100 })
  xpAwarded!: number;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  createdAt!: string;
}

// ============================================================================
// User Activities Response DTO
// ============================================================================

export class UserActivityDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'LESSON_COMPLETED' })
  type!: string;

  @ApiPropertyOptional()
  data?: any;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  createdAt!: string;
}
