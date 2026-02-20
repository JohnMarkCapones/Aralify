import { GamificationRepository } from '../gamification.repository';
export declare class BadgesService {
    private readonly repository;
    constructor(repository: GamificationRepository);
    getBadges(userId: string, options?: {
        displayedOnly?: boolean;
    }): Promise<{
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
    setDisplayed(userId: string, badgeId: string, displayOrder?: number): Promise<{
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
    removeDisplay(userId: string, badgeId: string): Promise<{
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
    getDisplayedBadges(userId: string): Promise<{
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
    evaluateForUser(_userId: string): Promise<{
        id: string;
        slug: string;
        title: string;
    }[]>;
    private formatUserBadge;
}
