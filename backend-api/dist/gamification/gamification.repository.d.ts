import { PrismaService } from '../prisma/prisma.service';
import { XpSource, Prisma, ActivityType } from '@prisma/client';
export interface UserGamificationData {
    id: string;
    xpTotal: number;
    level: number;
    streakCurrent: number;
    streakLongest: number;
    lastDailyClaimAt: Date | null;
    lastActiveAt: Date | null;
    createdAt: Date;
}
export declare class GamificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserGamificationData(userId: string): Promise<UserGamificationData | null>;
    updateUserXpAndLevel(userId: string, data: {
        xpTotal: number;
        level: number;
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
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
        lastActiveAt: Date | null;
    }>;
    updateUserStreak(userId: string, data: {
        streakCurrent: number;
        streakLongest?: number;
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
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
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
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
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
        title: string;
        slug: string;
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
            title: string;
            slug: string;
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
            title: string;
            slug: string;
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
        title: string;
        slug: string;
        iconUrl: string | null;
        xpReward: number;
        category: string;
        criteria: Prisma.JsonValue;
        isSecret: boolean;
    } | null>;
    getUserBadges(userId: string, options?: {
        displayedOnly?: boolean;
    }): Promise<any[]>;
    getUserBadgeCount(userId: string): Promise<number>;
    getDisplayedBadgeCount(userId: string): Promise<number>;
    getUserBadge(userId: string, badgeId: string): Promise<any>;
    setBadgeDisplayed(userId: string, badgeId: string, isDisplayed: boolean, displayOrder?: number): Promise<any>;
    awardBadge(userId: string, badgeId: string): Promise<{
        badge: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            slug: string;
            iconUrl: string | null;
            rarity: string;
        };
    } & {
        id: string;
        userId: string;
        badgeId: string;
        earnedAt: Date;
    }>;
    getBadgeBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
    createActivity(activityData: {
        userId: string;
        type: ActivityType;
        data?: Record<string, unknown>;
    }): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.ActivityType;
        data: Prisma.JsonValue | null;
        userId: string;
    }>;
}
