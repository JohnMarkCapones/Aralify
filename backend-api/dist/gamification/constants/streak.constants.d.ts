export declare const STREAK_MILESTONES: {
    days: number;
    xpBonus: number;
    name: string;
}[];
export declare const DAILY_BONUS: {
    readonly BASE_XP: 10;
    readonly STREAK_MULTIPLIER_THRESHOLD: 7;
    readonly MAX_BONUS_MULTIPLIER: 2;
};
export declare const STREAK_FREEZE: {
    readonly MAX_FREEZES: 2;
    readonly FREEZE_DURATION_HOURS: 24;
};
export declare function getStreakMilestoneBonus(streakDays: number): {
    milestone: {
        days: number;
        xpBonus: number;
        name: string;
    } | null;
    isMilestone: boolean;
};
export declare function getNextMilestone(currentStreak: number): {
    days: number;
    xpBonus: number;
    name: string;
    daysRemaining: number;
} | null;
export declare function calculateDailyBonus(streakDays: number): number;
export declare function isToday(date: Date, timezone?: string): boolean;
export declare function isYesterday(date: Date): boolean;
export declare function getMilestonesWithProgress(currentStreak: number): {
    achieved: boolean;
    daysRemaining: number;
    progress: number;
    days: number;
    xpBonus: number;
    name: string;
}[];
