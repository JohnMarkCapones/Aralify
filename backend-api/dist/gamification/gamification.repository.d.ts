import { PrismaService } from '../prisma/prisma.service';
import { XpSource, Prisma, ActivityType } from '@prisma/client';
export interface UserGamificationData {
    id: string;
    xpTotal: number;
    level: number;
    streakCurrent: number;
    streakLongest: number;
    streakFreezes: number;
    lastDailyClaimAt: Date | null;
    lastActiveAt: Date | null;
    createdAt: Date;
}
export declare class GamificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserGamificationData(userId: string): Promise<UserGamificationData | null>;
    awardXpAtomic(userId: string, amount: number, level: number, source: XpSource, sourceId?: string, description?: string): Promise<{
        level: number;
        id: string;
        email: string;
        username: string;
        passwordHash: string | null;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        locale: string | null;
        timezone: string | null;
        xpTotal: number;
        streakCurrent: number;
        streakLongest: number;
        streakFreezes: number;
        lastDailyClaimAt: Date | null;
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
        onboardingCompleted: boolean;
        onboardingStep: number;
        skillLevel: import(".prisma/client").$Enums.SkillLevel | null;
        interestedLanguages: Prisma.JsonValue | null;
        learningGoals: Prisma.JsonValue | null;
        dailyCommitmentMins: number | null;
        onboardingCompletedAt: Date | null;
        isBanned: boolean;
        bannedAt: Date | null;
        bannedUntil: Date | null;
        banReason: string | null;
        bannedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
        lastActiveAt: Date | null;
    }>;
    updateUserStreak(userId: string, data: {
        streakCurrent: number;
        streakLongest?: number;
        streakFreezes?: number;
        lastActiveAt?: Date;
    }): Promise<{
        level: number;
        id: string;
        email: string;
        username: string;
        passwordHash: string | null;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        locale: string | null;
        timezone: string | null;
        xpTotal: number;
        streakCurrent: number;
        streakLongest: number;
        streakFreezes: number;
        lastDailyClaimAt: Date | null;
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
        onboardingCompleted: boolean;
        onboardingStep: number;
        skillLevel: import(".prisma/client").$Enums.SkillLevel | null;
        interestedLanguages: Prisma.JsonValue | null;
        learningGoals: Prisma.JsonValue | null;
        dailyCommitmentMins: number | null;
        onboardingCompletedAt: Date | null;
        isBanned: boolean;
        bannedAt: Date | null;
        bannedUntil: Date | null;
        banReason: string | null;
        bannedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
        lastActiveAt: Date | null;
    }>;
    updateLastDailyClaim(userId: string): Promise<{
        level: number;
        id: string;
        email: string;
        username: string;
        passwordHash: string | null;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        locale: string | null;
        timezone: string | null;
        xpTotal: number;
        streakCurrent: number;
        streakLongest: number;
        streakFreezes: number;
        lastDailyClaimAt: Date | null;
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
        onboardingCompleted: boolean;
        onboardingStep: number;
        skillLevel: import(".prisma/client").$Enums.SkillLevel | null;
        interestedLanguages: Prisma.JsonValue | null;
        learningGoals: Prisma.JsonValue | null;
        dailyCommitmentMins: number | null;
        onboardingCompletedAt: Date | null;
        isBanned: boolean;
        bannedAt: Date | null;
        bannedUntil: Date | null;
        banReason: string | null;
        bannedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
        lastActiveAt: Date | null;
    }>;
    createXpTransaction(data: {
        userId: string;
        amount: number;
        source: XpSource;
        sourceId?: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        userId: string;
        amount: number;
        source: import(".prisma/client").$Enums.XpSource;
        sourceId: string | null;
    }>;
    getXpTransactions(userId: string, options?: {
        limit?: number;
        offset?: number;
        source?: XpSource;
        startDate?: Date;
        endDate?: Date;
    }): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            amount: number;
            source: import(".prisma/client").$Enums.XpSource;
            sourceId: string | null;
        }[];
        total: number;
    }>;
    getXpTransactionsSummary(userId: string, days?: number): Promise<{
        source: import(".prisma/client").$Enums.XpSource;
        totalXp: number;
        count: number;
    }[]>;
    getAllAchievements(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        slug: string;
        title: string;
        iconUrl: string | null;
        xpReward: number;
        category: string;
        criteria: Prisma.JsonValue;
        isSecret: boolean;
    }[]>;
    getUserAchievements(userId: string): Promise<({
        achievement: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            slug: string;
            title: string;
            iconUrl: string | null;
            xpReward: number;
            category: string;
            criteria: Prisma.JsonValue;
            isSecret: boolean;
        };
    } & {
        id: string;
        userId: string;
        unlockedAt: Date;
        achievementId: string;
    })[]>;
    getUserAchievementIds(userId: string): Promise<string[]>;
    awardAchievement(userId: string, achievementId: string): Promise<{
        achievement: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            slug: string;
            title: string;
            iconUrl: string | null;
            xpReward: number;
            category: string;
            criteria: Prisma.JsonValue;
            isSecret: boolean;
        };
    } & {
        id: string;
        userId: string;
        unlockedAt: Date;
        achievementId: string;
    }>;
    getAchievementBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        slug: string;
        title: string;
        iconUrl: string | null;
        xpReward: number;
        category: string;
        criteria: Prisma.JsonValue;
        isSecret: boolean;
    } | null>;
    getUserBadges(userId: string, options?: {
        displayedOnly?: boolean;
    }): Promise<({
        badge: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            slug: string;
            title: string;
            iconUrl: string | null;
            rarity: string;
        };
    } & {
        id: string;
        userId: string;
        badgeId: string;
        earnedAt: Date;
        isDisplayed: boolean;
        displayOrder: number | null;
    })[]>;
    getUserBadgeCount(userId: string): Promise<number>;
    getDisplayedBadgeCount(userId: string): Promise<number>;
    getUserBadge(userId: string, badgeId: string): Promise<({
        badge: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            slug: string;
            title: string;
            iconUrl: string | null;
            rarity: string;
        };
    } & {
        id: string;
        userId: string;
        badgeId: string;
        earnedAt: Date;
        isDisplayed: boolean;
        displayOrder: number | null;
    }) | null>;
    setBadgeDisplayed(userId: string, badgeId: string, isDisplayed: boolean, displayOrder?: number): Promise<{
        badge: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            slug: string;
            title: string;
            iconUrl: string | null;
            rarity: string;
        };
    } & {
        id: string;
        userId: string;
        badgeId: string;
        earnedAt: Date;
        isDisplayed: boolean;
        displayOrder: number | null;
    }>;
    awardBadge(userId: string, badgeId: string): Promise<{
        badge: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            slug: string;
            title: string;
            iconUrl: string | null;
            rarity: string;
        };
    } & {
        id: string;
        userId: string;
        badgeId: string;
        earnedAt: Date;
        isDisplayed: boolean;
        displayOrder: number | null;
    }>;
    getBadgeBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        slug: string;
        title: string;
        iconUrl: string | null;
        rarity: string;
    } | null>;
    getStreakHistory(userId: string, limit?: number): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        date: Date;
        completed: boolean;
    }[]>;
    recordStreakDay(userId: string, date: Date): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        date: Date;
        completed: boolean;
    }>;
    getLastStreakDay(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        date: Date;
        completed: boolean;
    } | null>;
    getUserLessonStats(userId: string): Promise<{
        completedCount: number;
        totalCount: number;
    }>;
    getUserLessonStatsByDifficulty(userId: string): Promise<{
        EASY: number;
        MEDIUM: number;
        HARD: number;
    }>;
    getUserCourseStats(userId: string): Promise<{
        startedCount: number;
        completedCount: number;
    }>;
    getUserSocialStats(userId: string): Promise<{
        commentCount: number;
        followerCount: number;
        followingCount: number;
    }>;
    hasCompletedLessonDuringHours(userId: string, hourStart: number, hourEnd: number): Promise<boolean>;
    hasFastCompletion(userId: string, maxSeconds: number): Promise<boolean>;
    getCompletedLanguageCount(userId: string): Promise<number>;
    getLessonsCompletedToday(userId: string): Promise<number>;
    getInactiveUsers(thresholdDays: number): Promise<{
        level: number;
        id: string;
        xpTotal: number;
        lastActiveAt: Date | null;
    }[]>;
    deductXpAtomic(userId: string, amount: number, source: XpSource, description?: string): Promise<{
        level: number;
        id: string;
        email: string;
        username: string;
        passwordHash: string | null;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        locale: string | null;
        timezone: string | null;
        xpTotal: number;
        streakCurrent: number;
        streakLongest: number;
        streakFreezes: number;
        lastDailyClaimAt: Date | null;
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
        onboardingCompleted: boolean;
        onboardingStep: number;
        skillLevel: import(".prisma/client").$Enums.SkillLevel | null;
        interestedLanguages: Prisma.JsonValue | null;
        learningGoals: Prisma.JsonValue | null;
        dailyCommitmentMins: number | null;
        onboardingCompletedAt: Date | null;
        isBanned: boolean;
        bannedAt: Date | null;
        bannedUntil: Date | null;
        banReason: string | null;
        bannedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
        lastActiveAt: Date | null;
    } | null>;
    createActivity(activityData: {
        userId: string;
        type: ActivityType;
        data?: Record<string, unknown>;
    }): Promise<{
        id: string;
        createdAt: Date;
        data: Prisma.JsonValue | null;
        userId: string;
        type: import(".prisma/client").$Enums.ActivityType;
    }>;
}
