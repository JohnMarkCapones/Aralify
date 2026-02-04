import { GamificationRepository } from '../gamification.repository';
import { XpService } from './xp.service';
import { StreaksService } from './streaks.service';
import { AchievementsService } from './achievements.service';
import { BadgesService } from './badges.service';
export declare class GamificationService {
    private readonly repository;
    private readonly xpService;
    private readonly streaksService;
    private readonly achievementsService;
    private readonly badgesService;
    constructor(repository: GamificationRepository, xpService: XpService, streaksService: StreaksService, achievementsService: AchievementsService, badgesService: BadgesService);
    getProfile(userId: string): Promise<{
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
    getMilestones(userId: string): Promise<{
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
    onLessonComplete(userId: string, lessonId: string, xpEarned: number, difficulty: string, lessonTitle: string): Promise<{
        xp: import("./xp.service").AwardXpResult;
        streak: import("./streaks.service").UpdateStreakResult;
        newAchievements: import("./achievements.service").AchievementEvaluation[];
        newBadges: string[];
    }>;
}
