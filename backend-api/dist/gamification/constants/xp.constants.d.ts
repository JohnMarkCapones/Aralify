export declare const XP_LEVEL_EXPONENT = 1.5;
export declare const XP_BASE_MULTIPLIER = 100;
export declare const XP_DIFFICULTY_MULTIPLIERS: {
    readonly EASY: 1;
    readonly MEDIUM: 2;
    readonly HARD: 3;
};
export declare const XP_DECAY: {
    readonly INACTIVE_DAYS_THRESHOLD: 7;
    readonly DAILY_DECAY_AMOUNT: 25;
    readonly MIN_XP: 0;
};
export declare const XP_REWARDS: {
    readonly LESSON_COMPLETE: 100;
    readonly QUIZ_COMPLETE: 25;
    readonly CHALLENGE_COMPLETE: 50;
    readonly DAILY_LOGIN: 10;
};
export declare const RANK_TITLES: {
    minLevel: number;
    title: string;
}[];
export declare const LEVEL_XP_THRESHOLDS: {
    level: number;
    xpRequired: number;
}[];
export declare function calculateXpForLevel(level: number): number;
export declare function calculateLevelFromXp(totalXp: number): number;
export declare function getRankTitle(level: number): string;
export declare function calculateLevelProgress(totalXp: number): {
    currentLevel: number;
    currentLevelXp: number;
    nextLevelXp: number;
    progressXp: number;
    progressPercentage: number;
};
