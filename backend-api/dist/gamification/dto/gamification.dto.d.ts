export declare class XpAwardResultDto {
    xpAwarded: number;
    newTotal: number;
    level: number;
    leveledUp?: boolean;
    previousLevel?: number;
}
export declare class AchievementUnlockDto {
    id: string;
    slug: string;
    title: string;
    description: string;
    iconUrl?: string | null;
    xpReward: number;
}
export declare class StreakInfoDto {
    currentStreak: number;
    longestStreak: number;
    freezesAvailable: number;
    lastActivityDate?: string | null;
    todayCompleted: boolean;
}
export declare class DailyClaimResponseDto {
    success: boolean;
    baseXp: number;
    streakBonus: number;
    totalXp: number;
    streak: StreakInfoDto;
    freezeEarned?: boolean;
}
export declare class GamificationResultDto {
    xp: XpAwardResultDto;
    streak: StreakInfoDto;
    achievementsUnlocked: AchievementUnlockDto[];
}
