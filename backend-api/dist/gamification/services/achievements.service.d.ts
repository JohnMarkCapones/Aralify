import { GamificationRepository } from '../gamification.repository';
import { XpService } from './xp.service';
export interface AchievementEvaluation {
    achievementId: string;
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
}
export declare class AchievementsService {
    private readonly repository;
    private readonly xpService;
    private readonly logger;
    constructor(repository: GamificationRepository, xpService: XpService);
    evaluateForUser(userId: string): Promise<AchievementEvaluation[]>;
    getAchievements(userId: string, options?: {
        category?: string;
        includeSecret?: boolean;
    }): Promise<{
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
    private getUserStats;
    private evaluateCriteria;
}
