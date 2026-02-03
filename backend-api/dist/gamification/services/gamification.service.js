"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const gamification_repository_1 = require("../gamification.repository");
const xp_service_1 = require("./xp.service");
const streaks_service_1 = require("./streaks.service");
const achievements_service_1 = require("./achievements.service");
const badges_service_1 = require("./badges.service");
const constants_1 = require("../constants");
let GamificationService = class GamificationService {
    constructor(repository, xpService, streaksService, achievementsService, badgesService) {
        this.repository = repository;
        this.xpService = xpService;
        this.streaksService = streaksService;
        this.achievementsService = achievementsService;
        this.badgesService = badgesService;
    }
    async getProfile(userId) {
        const [user, streakInfo, achievements, badges] = await Promise.all([
            this.repository.getUserGamificationData(userId),
            this.streaksService.getStreakInfo(userId),
            this.achievementsService.getAchievements(userId),
            this.badgesService.getBadges(userId),
        ]);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        const levelProgress = (0, constants_1.calculateLevelProgress)(user.xpTotal);
        const displayedBadges = await this.badgesService.getDisplayedBadges(userId);
        return {
            user: {
                id: user.id,
                createdAt: user.createdAt,
            },
            xp: {
                total: user.xpTotal,
                level: user.level,
                rankTitle: (0, constants_1.getRankTitle)(user.level),
                progress: {
                    currentLevelXp: levelProgress.currentLevelXp,
                    nextLevelXp: levelProgress.nextLevelXp,
                    progressXp: levelProgress.progressXp,
                    progressPercentage: Math.round(levelProgress.progressPercentage * 10) / 10,
                },
            },
            streak: {
                current: streakInfo.currentStreak,
                longest: streakInfo.longestStreak,
                isActive: streakInfo.isStreakActive,
                atRisk: streakInfo.streakAtRisk,
                lastActivityDate: streakInfo.lastActivityDate,
                nextMilestone: streakInfo.nextMilestone,
                dailyBonus: streakInfo.dailyBonus,
            },
            achievements: {
                unlocked: achievements.summary.unlocked,
                total: achievements.summary.total,
                progress: Math.round(achievements.summary.progress * 10) / 10,
                totalXpEarned: achievements.summary.totalXpEarned,
                recent: achievements.achievements
                    .filter((a) => a.isUnlocked)
                    .slice(0, 5),
            },
            badges: {
                total: badges.total,
                displayed: displayedBadges.badges,
                maxDisplay: badges.maxDisplay,
            },
        };
    }
    async getMilestones(userId) {
        const [user, streakInfo, achievements] = await Promise.all([
            this.repository.getUserGamificationData(userId),
            this.streaksService.getStreakInfo(userId),
            this.achievementsService.getAchievements(userId),
        ]);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        const levelProgress = (0, constants_1.calculateLevelProgress)(user.xpTotal);
        const xpToNextLevel = levelProgress.nextLevelXp - user.xpTotal;
        const nearAchievements = achievements.achievements
            .filter((a) => !a.isUnlocked && a.progress >= 50)
            .sort((a, b) => b.progress - a.progress)
            .slice(0, 5);
        const streakMilestone = (0, constants_1.getNextMilestone)(user.streakCurrent);
        return {
            level: {
                current: user.level,
                next: user.level + 1,
                xpToNextLevel,
                xpProgress: levelProgress.progressXp,
                progressPercentage: Math.round(levelProgress.progressPercentage * 10) / 10,
                nextRankTitle: (0, constants_1.getRankTitle)(user.level + 1),
            },
            streak: streakMilestone
                ? {
                    current: user.streakCurrent,
                    nextMilestoneDays: streakMilestone.days,
                    milestoneName: streakMilestone.name,
                    daysRemaining: streakMilestone.daysRemaining,
                    xpReward: streakMilestone.xpBonus,
                }
                : null,
            achievements: {
                nearCompletion: nearAchievements.map((a) => ({
                    id: a.id,
                    slug: a.slug,
                    title: a.title,
                    description: a.description,
                    progress: Math.round(a.progress * 10) / 10,
                    currentValue: a.currentValue,
                    targetValue: a.targetValue,
                    xpReward: a.xpReward,
                })),
                totalRemaining: achievements.summary.total - achievements.summary.unlocked,
            },
        };
    }
    async onLessonComplete(userId, lessonId, xpEarned, difficulty, lessonTitle) {
        const xpResult = await this.xpService.awardXp(userId, xpEarned, 'LESSON_COMPLETE', lessonId, `Completed: ${lessonTitle} (${difficulty.toLowerCase()})`);
        const streakResult = await this.streaksService.updateStreak(userId);
        const achievements = await this.achievementsService.evaluateForUser(userId);
        const newAchievements = achievements.filter((a) => a.isUnlocked && a.unlockedAt !== null);
        return {
            xp: xpResult,
            streak: streakResult,
            newAchievements,
        };
    }
};
exports.GamificationService = GamificationService;
exports.GamificationService = GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gamification_repository_1.GamificationRepository,
        xp_service_1.XpService,
        streaks_service_1.StreaksService,
        achievements_service_1.AchievementsService,
        badges_service_1.BadgesService])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map