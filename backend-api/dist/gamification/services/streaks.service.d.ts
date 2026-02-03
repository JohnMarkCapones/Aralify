import { GamificationRepository } from '../gamification.repository';
import { XpService } from './xp.service';
export interface UpdateStreakResult {
    streakUpdated: boolean;
    newStreak: number;
    previousStreak: number;
    milestoneReached: {
        days: number;
        xpBonus: number;
        name: string;
    } | null;
    xpAwarded: number;
}
export interface ClaimDailyBonusResult {
    success: boolean;
    xpEarned: number;
    alreadyClaimed: boolean;
    currentStreak: number;
}
export declare class StreaksService {
    private readonly repository;
    private readonly xpService;
    private readonly logger;
    constructor(repository: GamificationRepository, xpService: XpService);
    updateStreak(userId: string): Promise<UpdateStreakResult>;
    claimDailyBonus(userId: string): Promise<ClaimDailyBonusResult>;
    getStreakInfo(userId: string): Promise<{
        currentStreak: number;
        longestStreak: number;
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
}
