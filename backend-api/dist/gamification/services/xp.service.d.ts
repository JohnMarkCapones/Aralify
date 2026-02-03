import { XpSource } from '@prisma/client';
import { GamificationRepository } from '../gamification.repository';
export interface AwardXpResult {
    xpAwarded: number;
    newTotal: number;
    levelUp: boolean;
    previousLevel: number;
    newLevel: number;
    rankTitle: string;
}
export interface XpHistoryOptions {
    limit?: number;
    offset?: number;
    source?: XpSource;
    startDate?: Date;
    endDate?: Date;
}
export declare class XpService {
    private readonly repository;
    private readonly logger;
    constructor(repository: GamificationRepository);
    awardXp(userId: string, amount: number, source: XpSource, sourceId?: string, description?: string): Promise<AwardXpResult>;
    getXpHistory(userId: string, options?: XpHistoryOptions): Promise<{
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
    getXpSummary(userId: string, days?: number): Promise<{
        source: import(".prisma/client").$Enums.XpSource;
        totalXp: number;
        count: number;
    }[]>;
    calculateLevelFromXp(totalXp: number): number;
    calculateXpForLevel(level: number): number;
    getRankTitle(level: number): string;
    getLevelProgress(totalXp: number): {
        currentLevel: number;
        currentLevelXp: number;
        nextLevelXp: number;
        progressXp: number;
        progressPercentage: number;
    };
    getLevelSystemInfo(): {
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
    };
}
