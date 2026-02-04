export declare class LevelProgressDto {
    currentLevelXp: number;
    nextLevelXp: number;
    progressXp: number;
    progressPercentage: number;
}
export declare class XpInfoDto {
    total: number;
    level: number;
    rankTitle: string;
    progress: LevelProgressDto;
}
export declare class XpTransactionDto {
    id: string;
    amount: number;
    source: string;
    sourceId?: string | null;
    description?: string | null;
    createdAt: Date;
}
export declare class XpHistoryResponseDto {
    transactions: XpTransactionDto[];
    total: number;
    limit: number;
    offset: number;
}
export declare class NextMilestoneDto {
    days: number;
    xpBonus: number;
    name: string;
    daysRemaining: number;
}
export declare class DailyBonusInfoDto {
    canClaim: boolean;
    amount: number;
    lastClaimAt?: Date | null;
}
export declare class StreakHistoryItemDto {
    date: Date;
    completed: boolean;
}
export declare class StreakMilestoneDto {
    days: number;
    xpBonus: number;
    name: string;
    achieved: boolean;
    daysRemaining: number;
    progress: number;
}
export declare class StreakInfoDto {
    currentStreak: number;
    longestStreak: number;
    freezesAvailable: number;
    maxFreezes: number;
    isStreakActive: boolean;
    streakAtRisk: boolean;
    lastActivityDate?: Date | null;
    nextMilestone?: NextMilestoneDto | null;
    milestones: StreakMilestoneDto[];
    dailyBonus: DailyBonusInfoDto;
    recentHistory: StreakHistoryItemDto[];
}
export declare class ClaimDailyBonusResponseDto {
    success: boolean;
    xpEarned: number;
    alreadyClaimed: boolean;
    currentStreak: number;
}
export declare class AchievementDto {
    id: string;
    slug: string;
    title: string;
    description: string;
    iconUrl?: string | null;
    xpReward: number;
    category: string;
    isSecret: boolean;
    isUnlocked: boolean;
    unlockedAt?: Date | null;
    progress: number;
    currentValue: number;
    targetValue: number;
}
export declare class AchievementSummaryDto {
    total: number;
    unlocked: number;
    progress: number;
    totalXpEarned: number;
}
export declare class AchievementsResponseDto {
    achievements: AchievementDto[];
    byCategory: Record<string, AchievementDto[]>;
    summary: AchievementSummaryDto;
}
export declare class BadgeDto {
    id: string;
    slug: string;
    title: string;
    description: string;
    iconUrl?: string | null;
    rarity: string;
    earnedAt: Date;
    isDisplayed: boolean;
    displayOrder?: number | null;
}
export declare class BadgesResponseDto {
    badges: BadgeDto[];
    byRarity: Record<string, BadgeDto[]>;
    total: number;
    displayedCount: number;
    maxDisplay: number;
    canDisplayMore: boolean;
}
export declare class BadgeDisplayResponseDto {
    success: boolean;
    badge: BadgeDto;
    displayedCount?: number;
    maxDisplay: number;
    message?: string;
}
export declare class ProfileStreakDto {
    current: number;
    longest: number;
    freezesAvailable: number;
    maxFreezes: number;
    isActive: boolean;
    atRisk: boolean;
    lastActivityDate?: Date | null;
    nextMilestone?: NextMilestoneDto | null;
    dailyBonus: DailyBonusInfoDto;
}
export declare class ProfileAchievementsDto {
    unlocked: number;
    total: number;
    progress: number;
    totalXpEarned: number;
    recent: AchievementDto[];
}
export declare class ProfileBadgesDto {
    total: number;
    displayed: BadgeDto[];
    maxDisplay: number;
}
export declare class GamificationProfileDto {
    user: {
        id: string;
        createdAt: Date;
    };
    xp: XpInfoDto;
    streak: ProfileStreakDto;
    achievements: ProfileAchievementsDto;
    badges: ProfileBadgesDto;
}
export declare class LevelMilestoneDto {
    current: number;
    next: number;
    xpToNextLevel: number;
    xpProgress: number;
    progressPercentage: number;
    nextRankTitle: string;
}
export declare class StreakMilestoneInfoDto {
    current: number;
    nextMilestoneDays: number;
    milestoneName: string;
    daysRemaining: number;
    xpReward: number;
}
export declare class NearAchievementDto {
    id: string;
    slug: string;
    title: string;
    description: string;
    progress: number;
    currentValue: number;
    targetValue: number;
    xpReward: number;
}
export declare class MilestonesResponseDto {
    level: LevelMilestoneDto;
    streak?: StreakMilestoneInfoDto | null;
    achievements: {
        nearCompletion: NearAchievementDto[];
        totalRemaining: number;
    };
}
export declare class LevelThresholdDto {
    level: number;
    xpRequired: number;
}
export declare class RankInfoDto {
    minLevel: number;
    title: string;
    xpRequired: number;
}
export declare class XpSourceInfoDto {
    source: string;
    description: string;
    baseXp: number | string;
}
export declare class LevelSystemInfoDto {
    formula: {
        description: string;
        baseMultiplier: number;
        exponent: number;
    };
    levels: LevelThresholdDto[];
    ranks: RankInfoDto[];
    xpSources: XpSourceInfoDto[];
    difficultyMultipliers: {
        EASY: number;
        MEDIUM: number;
        HARD: number;
    };
}
