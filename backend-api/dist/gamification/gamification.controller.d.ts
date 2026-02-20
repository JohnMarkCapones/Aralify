import { User } from '@prisma/client';
import { GamificationService, XpService, StreaksService, AchievementsService, BadgesService } from './services';
import { GetXpHistoryQueryDto, GetAchievementsQueryDto, GetBadgesQueryDto, SetBadgeDisplayDto } from './dto';
export declare class GamificationController {
    private readonly gamificationService;
    private readonly xpService;
    private readonly streaksService;
    private readonly achievementsService;
    private readonly badgesService;
    constructor(gamificationService: GamificationService, xpService: XpService, streaksService: StreaksService, achievementsService: AchievementsService, badgesService: BadgesService);
    getProfile(user: User): Promise<{
        user: {
            id: string;
            createdAt: Date;
        };
        xp: {
            total: number;
            level: number;
            rankTitle: string;
            progress: {
                currentLevelXp: number;
                nextLevelXp: number;
                progressXp: number;
                progressPercentage: number;
            };
        };
        streak: {
            current: number;
            longest: number;
            freezesAvailable: number;
            maxFreezes: 2;
            isActive: boolean;
            atRisk: boolean;
            lastActivityDate: Date | null;
            nextMilestone: {
                days: number;
                xpBonus: number;
                name: string;
                daysRemaining: number;
            } | null;
            dailyBonus: {
                canClaim: boolean;
                amount: number;
                lastClaimAt: Date | null;
            };
        };
        achievements: {
            unlocked: number;
            total: number;
            progress: number;
            totalXpEarned: number;
            recent: {
                id: string;
                slug: string;
                title: string;
                description: string;
                iconUrl: string | null;
                xpReward: number;
                category: string;
                isSecret: boolean;
                isUnlocked: boolean;
                unlockedAt: Date | null;
                progress: number;
                currentValue: number;
                targetValue: number;
            }[];
        };
        badges: {
            total: number | undefined;
            displayed: {
                id: string;
                slug: string;
                title: string;
                description: string;
                iconUrl: string | null;
                rarity: string;
                earnedAt: Date;
                isDisplayed: boolean;
                displayOrder: number | null;
            }[];
            maxDisplay: number;
        };
    }>;
    getAchievements(user: User, query: GetAchievementsQueryDto): Promise<{
        achievements: {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            xpReward: number;
            category: string;
            isSecret: boolean;
            isUnlocked: boolean;
            unlockedAt: Date | null;
            progress: number;
            currentValue: number;
            targetValue: number;
        }[];
        byCategory: Record<string, {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            xpReward: number;
            category: string;
            isSecret: boolean;
            isUnlocked: boolean;
            unlockedAt: Date | null;
            progress: number;
            currentValue: number;
            targetValue: number;
        }[]>;
        summary: {
            total: number;
            unlocked: number;
            progress: number;
            totalXpEarned: number;
        };
    }>;
    getBadges(user: User, query: GetBadgesQueryDto): Promise<{
        badges: {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            rarity: string;
            earnedAt: Date;
            isDisplayed: boolean;
            displayOrder: number | null;
        }[];
        count: number;
        maxDisplay: number;
        byRarity?: undefined;
        total?: undefined;
        displayedCount?: undefined;
        canDisplayMore?: undefined;
    } | {
        badges: {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            rarity: string;
            earnedAt: Date;
            isDisplayed: boolean;
            displayOrder: number | null;
        }[];
        byRarity: Record<string, {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            rarity: string;
            earnedAt: Date;
            isDisplayed: boolean;
            displayOrder: number | null;
        }[]>;
        total: number;
        displayedCount: number;
        maxDisplay: number;
        canDisplayMore: boolean;
        count?: undefined;
    }>;
    displayBadge(badgeId: string, user: User, dto: SetBadgeDisplayDto): Promise<{
        success: boolean;
        badge: {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            rarity: string;
            earnedAt: Date;
            isDisplayed: boolean;
            displayOrder: number | null;
        };
        message: string;
        displayedCount?: undefined;
        maxDisplay?: undefined;
    } | {
        success: boolean;
        badge: {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            rarity: string;
            earnedAt: Date;
            isDisplayed: boolean;
            displayOrder: number | null;
        };
        displayedCount: number;
        maxDisplay: number;
        message?: undefined;
    }>;
    hideBadge(badgeId: string, user: User): Promise<{
        success: boolean;
        badge: {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            rarity: string;
            earnedAt: Date;
            isDisplayed: boolean;
            displayOrder: number | null;
        };
        message: string;
        displayedCount?: undefined;
        maxDisplay?: undefined;
    } | {
        success: boolean;
        badge: {
            id: string;
            slug: string;
            title: string;
            description: string;
            iconUrl: string | null;
            rarity: string;
            earnedAt: Date;
            isDisplayed: boolean;
            displayOrder: number | null;
        };
        displayedCount: number;
        maxDisplay: number;
        message?: undefined;
    }>;
    getStreakInfo(user: User): Promise<{
        currentStreak: number;
        longestStreak: number;
        freezesAvailable: number;
        maxFreezes: 2;
        isStreakActive: boolean;
        streakAtRisk: boolean;
        lastActivityDate: Date | null;
        nextMilestone: {
            days: number;
            xpBonus: number;
            name: string;
            daysRemaining: number;
        } | null;
        milestones: {
            achieved: boolean;
            daysRemaining: number;
            progress: number;
            days: number;
            xpBonus: number;
            name: string;
        }[];
        dailyBonus: {
            canClaim: boolean;
            amount: number;
            lastClaimAt: Date | null;
        };
        recentHistory: {
            date: Date;
            completed: boolean;
        }[];
    }>;
    claimDailyBonus(user: User): Promise<import("./services").ClaimDailyBonusResult>;
    getXpHistory(user: User, query: GetXpHistoryQueryDto): Promise<{
        transactions: {
            id: string;
            amount: number;
            source: import(".prisma/client").$Enums.XpSource;
            sourceId: string | null;
            description: string | null;
            createdAt: Date;
        }[];
        total: number;
        limit: number;
        offset: number;
    }>;
    getLevelSystemInfo(): Promise<{
        formula: {
            description: string;
            baseMultiplier: number;
            exponent: number;
        };
        levels: {
            level: number;
            xpRequired: number;
        }[];
        ranks: {
            minLevel: number;
            title: string;
            xpRequired: number;
        }[];
        xpSources: ({
            source: string;
            description: string;
            baseXp: number;
        } | {
            source: string;
            description: string;
            baseXp: string;
        })[];
        difficultyMultipliers: {
            EASY: number;
            MEDIUM: number;
            HARD: number;
        };
    }>;
    getMilestones(user: User): Promise<{
        level: {
            current: number;
            next: number;
            xpToNextLevel: number;
            xpProgress: number;
            progressPercentage: number;
            nextRankTitle: string;
        };
        streak: {
            current: number;
            nextMilestoneDays: number;
            milestoneName: string;
            daysRemaining: number;
            xpReward: number;
        } | null;
        achievements: {
            nearCompletion: {
                id: string;
                slug: string;
                title: string;
                description: string;
                progress: number;
                currentValue: number;
                targetValue: number;
                xpReward: number;
            }[];
            totalRemaining: number;
        };
    }>;
}
