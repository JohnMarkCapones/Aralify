import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================
// XP Response DTOs
// ============================================

export class LevelProgressDto {
  @ApiProperty({ example: 3162, description: 'XP required for current level' })
  currentLevelXp!: number;

  @ApiProperty({ example: 4472, description: 'XP required for next level' })
  nextLevelXp!: number;

  @ApiProperty({ example: 500, description: 'XP earned within current level' })
  progressXp!: number;

  @ApiProperty({ example: 38.2, description: 'Progress percentage to next level' })
  progressPercentage!: number;
}

export class XpInfoDto {
  @ApiProperty({ example: 3662, description: 'Total XP earned' })
  total!: number;

  @ApiProperty({ example: 10, description: 'Current level' })
  level!: number;

  @ApiProperty({ example: 'Developer', description: 'Current rank title' })
  rankTitle!: string;

  @ApiProperty({ type: LevelProgressDto })
  progress!: LevelProgressDto;
}

export class XpTransactionDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 200, description: 'XP amount' })
  amount!: number;

  @ApiProperty({ example: 'LESSON_COMPLETE', enum: ['LESSON_COMPLETE', 'QUIZ_COMPLETE', 'CHALLENGE_COMPLETE', 'STREAK_BONUS', 'ACHIEVEMENT', 'DAILY_BONUS', 'EVENT'] })
  source!: string;

  @ApiPropertyOptional({ example: 'clx1234567890', description: 'Source entity ID' })
  sourceId?: string | null;

  @ApiPropertyOptional({ example: 'Completed: Python Basics - Variables (medium)' })
  description?: string | null;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt!: Date;
}

export class XpHistoryResponseDto {
  @ApiProperty({ type: [XpTransactionDto] })
  transactions!: XpTransactionDto[];

  @ApiProperty({ example: 150, description: 'Total number of transactions' })
  total!: number;

  @ApiProperty({ example: 50 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;
}

// ============================================
// Streak Response DTOs
// ============================================

export class NextMilestoneDto {
  @ApiProperty({ example: 30, description: 'Days required for milestone' })
  days!: number;

  @ApiProperty({ example: 200, description: 'XP bonus for milestone' })
  xpBonus!: number;

  @ApiProperty({ example: 'Monthly Master', description: 'Milestone name' })
  name!: string;

  @ApiProperty({ example: 7, description: 'Days remaining to reach milestone' })
  daysRemaining!: number;
}

export class DailyBonusInfoDto {
  @ApiProperty({ example: true, description: 'Whether daily bonus can be claimed' })
  canClaim!: boolean;

  @ApiProperty({ example: 10, description: 'XP amount for daily bonus' })
  amount!: number;

  @ApiPropertyOptional({ example: '2024-01-14T10:30:00.000Z', description: 'Last claim timestamp' })
  lastClaimAt?: Date | null;
}

export class StreakHistoryItemDto {
  @ApiProperty({ example: '2024-01-15' })
  date!: Date;

  @ApiProperty({ example: true })
  completed!: boolean;
}

export class StreakMilestoneDto {
  @ApiProperty({ example: 7 })
  days!: number;

  @ApiProperty({ example: 50 })
  xpBonus!: number;

  @ApiProperty({ example: 'Week Warrior' })
  name!: string;

  @ApiProperty({ example: true })
  achieved!: boolean;

  @ApiProperty({ example: 0 })
  daysRemaining!: number;

  @ApiProperty({ example: 100 })
  progress!: number;
}

export class StreakInfoDto {
  @ApiProperty({ example: 23, description: 'Current streak in days' })
  currentStreak!: number;

  @ApiProperty({ example: 45, description: 'Longest streak ever' })
  longestStreak!: number;

  @ApiProperty({ example: 1, description: 'Number of streak freezes available' })
  freezesAvailable!: number;

  @ApiProperty({ example: 2, description: 'Maximum streak freezes that can be held' })
  maxFreezes!: number;

  @ApiProperty({ example: true, description: 'Whether streak is currently active' })
  isStreakActive!: boolean;

  @ApiProperty({ example: false, description: 'Whether streak is at risk of breaking' })
  streakAtRisk!: boolean;

  @ApiPropertyOptional({ example: '2024-01-15', description: 'Last activity date' })
  lastActivityDate?: Date | null;

  @ApiPropertyOptional({ type: NextMilestoneDto })
  nextMilestone?: NextMilestoneDto | null;

  @ApiProperty({ type: [StreakMilestoneDto] })
  milestones!: StreakMilestoneDto[];

  @ApiProperty({ type: DailyBonusInfoDto })
  dailyBonus!: DailyBonusInfoDto;

  @ApiProperty({ type: [StreakHistoryItemDto] })
  recentHistory!: StreakHistoryItemDto[];
}

export class ClaimDailyBonusResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 10, description: 'XP earned from daily bonus' })
  xpEarned!: number;

  @ApiProperty({ example: false, description: 'Whether bonus was already claimed today' })
  alreadyClaimed!: boolean;

  @ApiProperty({ example: 23 })
  currentStreak!: number;
}

// ============================================
// Achievement Response DTOs
// ============================================

export class AchievementDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'first-lesson' })
  slug!: string;

  @ApiProperty({ example: 'First Steps' })
  title!: string;

  @ApiProperty({ example: 'Complete your first lesson' })
  description!: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  iconUrl?: string | null;

  @ApiProperty({ example: 50 })
  xpReward!: number;

  @ApiProperty({ example: 'completion' })
  category!: string;

  @ApiProperty({ example: false })
  isSecret!: boolean;

  @ApiProperty({ example: true })
  isUnlocked!: boolean;

  @ApiPropertyOptional({ example: '2024-01-15T10:30:00.000Z' })
  unlockedAt?: Date | null;

  @ApiProperty({ example: 100, description: 'Progress percentage (0-100)' })
  progress!: number;

  @ApiProperty({ example: 1, description: 'Current progress value' })
  currentValue!: number;

  @ApiProperty({ example: 1, description: 'Target value for completion' })
  targetValue!: number;
}

export class AchievementSummaryDto {
  @ApiProperty({ example: 15, description: 'Total visible achievements' })
  total!: number;

  @ApiProperty({ example: 5, description: 'Unlocked achievements count' })
  unlocked!: number;

  @ApiProperty({ example: 33.3, description: 'Completion progress percentage' })
  progress!: number;

  @ApiProperty({ example: 250, description: 'Total XP earned from achievements' })
  totalXpEarned!: number;
}

export class AchievementsResponseDto {
  @ApiProperty({ type: [AchievementDto] })
  achievements!: AchievementDto[];

  @ApiProperty({ description: 'Achievements grouped by category' })
  byCategory!: Record<string, AchievementDto[]>;

  @ApiProperty({ type: AchievementSummaryDto })
  summary!: AchievementSummaryDto;
}

// ============================================
// Badge Response DTOs
// ============================================

export class BadgeDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'python-master' })
  slug!: string;

  @ApiProperty({ example: 'Python Master' })
  title!: string;

  @ApiProperty({ example: 'Complete all Python courses' })
  description!: string;

  @ApiPropertyOptional({ example: 'https://example.com/badge.png' })
  iconUrl?: string | null;

  @ApiProperty({ example: 'epic', enum: ['common', 'rare', 'epic', 'legendary'] })
  rarity!: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  earnedAt!: Date;

  @ApiProperty({ example: true })
  isDisplayed!: boolean;

  @ApiPropertyOptional({ example: 1 })
  displayOrder?: number | null;
}

export class BadgesResponseDto {
  @ApiProperty({ type: [BadgeDto] })
  badges!: BadgeDto[];

  @ApiProperty({ description: 'Badges grouped by rarity' })
  byRarity!: Record<string, BadgeDto[]>;

  @ApiProperty({ example: 10 })
  total!: number;

  @ApiProperty({ example: 3 })
  displayedCount!: number;

  @ApiProperty({ example: 5 })
  maxDisplay!: number;

  @ApiProperty({ example: true })
  canDisplayMore!: boolean;
}

export class BadgeDisplayResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ type: BadgeDto })
  badge!: BadgeDto;

  @ApiPropertyOptional({ example: 3 })
  displayedCount?: number;

  @ApiProperty({ example: 5 })
  maxDisplay!: number;

  @ApiPropertyOptional({ example: 'Badge is already displayed' })
  message?: string;
}

// ============================================
// Profile Response DTOs
// ============================================

export class ProfileStreakDto {
  @ApiProperty({ example: 23 })
  current!: number;

  @ApiProperty({ example: 45 })
  longest!: number;

  @ApiProperty({ example: 1, description: 'Streak freezes available' })
  freezesAvailable!: number;

  @ApiProperty({ example: 2, description: 'Max freezes that can be held' })
  maxFreezes!: number;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: false })
  atRisk!: boolean;

  @ApiPropertyOptional({ example: '2024-01-15' })
  lastActivityDate?: Date | null;

  @ApiPropertyOptional({ type: NextMilestoneDto })
  nextMilestone?: NextMilestoneDto | null;

  @ApiProperty({ type: DailyBonusInfoDto })
  dailyBonus!: DailyBonusInfoDto;
}

export class ProfileAchievementsDto {
  @ApiProperty({ example: 5 })
  unlocked!: number;

  @ApiProperty({ example: 15 })
  total!: number;

  @ApiProperty({ example: 33.3 })
  progress!: number;

  @ApiProperty({ example: 250 })
  totalXpEarned!: number;

  @ApiProperty({ type: [AchievementDto], description: 'Recent unlocked achievements' })
  recent!: AchievementDto[];
}

export class ProfileBadgesDto {
  @ApiProperty({ example: 10 })
  total!: number;

  @ApiProperty({ type: [BadgeDto], description: 'Displayed badges on profile' })
  displayed!: BadgeDto[];

  @ApiProperty({ example: 5 })
  maxDisplay!: number;
}

export class GamificationProfileDto {
  @ApiProperty({ description: 'User basic info' })
  user!: {
    id: string;
    createdAt: Date;
  };

  @ApiProperty({ type: XpInfoDto })
  xp!: XpInfoDto;

  @ApiProperty({ type: ProfileStreakDto })
  streak!: ProfileStreakDto;

  @ApiProperty({ type: ProfileAchievementsDto })
  achievements!: ProfileAchievementsDto;

  @ApiProperty({ type: ProfileBadgesDto })
  badges!: ProfileBadgesDto;
}

// ============================================
// Milestones Response DTOs
// ============================================

export class LevelMilestoneDto {
  @ApiProperty({ example: 10 })
  current!: number;

  @ApiProperty({ example: 11 })
  next!: number;

  @ApiProperty({ example: 810, description: 'XP needed to reach next level' })
  xpToNextLevel!: number;

  @ApiProperty({ example: 500 })
  xpProgress!: number;

  @ApiProperty({ example: 38.2 })
  progressPercentage!: number;

  @ApiProperty({ example: 'Developer' })
  nextRankTitle!: string;
}

export class StreakMilestoneInfoDto {
  @ApiProperty({ example: 23 })
  current!: number;

  @ApiProperty({ example: 30 })
  nextMilestoneDays!: number;

  @ApiProperty({ example: 'Monthly Master' })
  milestoneName!: string;

  @ApiProperty({ example: 7 })
  daysRemaining!: number;

  @ApiProperty({ example: 200 })
  xpReward!: number;
}

export class NearAchievementDto {
  @ApiProperty({ example: 'clx1234567890' })
  id!: string;

  @ApiProperty({ example: 'ten-lessons' })
  slug!: string;

  @ApiProperty({ example: 'Lesson Master' })
  title!: string;

  @ApiProperty({ example: 'Complete 10 lessons' })
  description!: string;

  @ApiProperty({ example: 80, description: 'Progress percentage' })
  progress!: number;

  @ApiProperty({ example: 8 })
  currentValue!: number;

  @ApiProperty({ example: 10 })
  targetValue!: number;

  @ApiProperty({ example: 100 })
  xpReward!: number;
}

export class MilestonesResponseDto {
  @ApiProperty({ type: LevelMilestoneDto })
  level!: LevelMilestoneDto;

  @ApiPropertyOptional({ type: StreakMilestoneInfoDto })
  streak?: StreakMilestoneInfoDto | null;

  @ApiProperty({ description: 'Achievements near completion' })
  achievements!: {
    nearCompletion: NearAchievementDto[];
    totalRemaining: number;
  };
}

// ============================================
// Level System Response DTOs
// ============================================

export class LevelThresholdDto {
  @ApiProperty({ example: 10 })
  level!: number;

  @ApiProperty({ example: 3162 })
  xpRequired!: number;
}

export class RankInfoDto {
  @ApiProperty({ example: 10 })
  minLevel!: number;

  @ApiProperty({ example: 'Developer' })
  title!: string;

  @ApiProperty({ example: 3162 })
  xpRequired!: number;
}

export class XpSourceInfoDto {
  @ApiProperty({ example: 'LESSON_COMPLETE' })
  source!: string;

  @ApiProperty({ example: 'Complete a lesson' })
  description!: string;

  @ApiProperty({ example: 100, description: 'Base XP or "varies"' })
  baseXp!: number | string;
}

export class LevelSystemInfoDto {
  @ApiProperty({ description: 'Level formula details' })
  formula!: {
    description: string;
    baseMultiplier: number;
    exponent: number;
  };

  @ApiProperty({ type: [LevelThresholdDto] })
  levels!: LevelThresholdDto[];

  @ApiProperty({ type: [RankInfoDto] })
  ranks!: RankInfoDto[];

  @ApiProperty({ type: [XpSourceInfoDto] })
  xpSources!: XpSourceInfoDto[];

  @ApiProperty({ description: 'XP multipliers by difficulty' })
  difficultyMultipliers!: {
    EASY: number;
    MEDIUM: number;
    HARD: number;
  };
}
