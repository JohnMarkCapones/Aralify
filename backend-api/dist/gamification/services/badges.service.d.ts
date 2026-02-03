import { GamificationRepository } from '../gamification.repository';
export declare class BadgesService {
    private readonly repository;
    constructor(repository: GamificationRepository);
    getBadges(userId: string, options?: {
        displayedOnly?: boolean;
    }): Promise<{
        badges: {
            id: any;
            slug: any;
            title: any;
            description: any;
            iconUrl: any;
            rarity: any;
            earnedAt: any;
            isDisplayed: any;
            displayOrder: any;
        }[];
        count: number;
        maxDisplay: number;
        byRarity?: undefined;
        total?: undefined;
        displayedCount?: undefined;
        canDisplayMore?: undefined;
    } | {
        badges: {
            id: any;
            slug: any;
            title: any;
            description: any;
            iconUrl: any;
            rarity: any;
            earnedAt: any;
            isDisplayed: any;
            displayOrder: any;
        }[];
        byRarity: Record<string, {
            id: any;
            slug: any;
            title: any;
            description: any;
            iconUrl: any;
            rarity: any;
            earnedAt: any;
            isDisplayed: any;
            displayOrder: any;
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
            id: any;
            slug: any;
            title: any;
            description: any;
            iconUrl: any;
            rarity: any;
            earnedAt: any;
            isDisplayed: any;
            displayOrder: any;
        }[];
        count: number;
        maxDisplay: number;
        byRarity?: undefined;
        total?: undefined;
        displayedCount?: undefined;
        canDisplayMore?: undefined;
    } | {
        badges: {
            id: any;
            slug: any;
            title: any;
            description: any;
            iconUrl: any;
            rarity: any;
            earnedAt: any;
            isDisplayed: any;
            displayOrder: any;
        }[];
        byRarity: Record<string, {
            id: any;
            slug: any;
            title: any;
            description: any;
            iconUrl: any;
            rarity: any;
            earnedAt: any;
            isDisplayed: any;
            displayOrder: any;
        }[]>;
        total: number;
        displayedCount: number;
        maxDisplay: number;
        canDisplayMore: boolean;
        count?: undefined;
    }>;
    private formatUserBadge;
}
