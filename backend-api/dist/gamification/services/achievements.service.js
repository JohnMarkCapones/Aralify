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
var AchievementsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const gamification_repository_1 = require("../gamification.repository");
const xp_service_1 = require("./xp.service");
let AchievementsService = AchievementsService_1 = class AchievementsService {
    constructor(repository, xpService) {
        this.repository = repository;
        this.xpService = xpService;
        this.logger = new common_1.Logger(AchievementsService_1.name);
    }
    async evaluateForUser(userId) {
        const [allAchievements, userAchievementIds, userStats] = await Promise.all([
            this.repository.getAllAchievements(),
            this.repository.getUserAchievementIds(userId),
            this.getUserStats(userId),
        ]);
        const newlyUnlocked = [];
        const evaluations = [];
        for (const achievement of allAchievements) {
            const isAlreadyUnlocked = userAchievementIds.includes(achievement.id);
            const criteria = achievement.criteria;
            const { progress, currentValue, targetValue, isMet } = await this.evaluateCriteria(criteria, userStats);
            const evaluation = {
                achievementId: achievement.id,
                slug: achievement.slug,
                title: achievement.title,
                description: achievement.description,
                iconUrl: achievement.iconUrl,
                xpReward: achievement.xpReward,
                category: achievement.category,
                isSecret: achievement.isSecret,
                isUnlocked: isAlreadyUnlocked || isMet,
                unlockedAt: null,
                progress,
                currentValue,
                targetValue,
            };
            if (!isAlreadyUnlocked && isMet) {
                const userAchievement = await this.repository.awardAchievement(userId, achievement.id);
                evaluation.unlockedAt = userAchievement.unlockedAt;
                if (achievement.xpReward > 0) {
                    await this.xpService.awardXp(userId, achievement.xpReward, client_1.XpSource.ACHIEVEMENT, achievement.id, `Achievement unlocked: ${achievement.title}`);
                }
                await this.repository.createActivity({
                    userId,
                    type: 'ACHIEVEMENT_EARNED',
                    data: {
                        achievementId: achievement.id,
                        title: achievement.title,
                        xpReward: achievement.xpReward,
                    },
                });
                newlyUnlocked.push(evaluation);
                this.logger.log(`User ${userId} unlocked achievement: ${achievement.title}`);
            }
            evaluations.push(evaluation);
        }
        return evaluations;
    }
    async getAchievements(userId, options) {
        const [allAchievements, userAchievements, userStats] = await Promise.all([
            this.repository.getAllAchievements(),
            this.repository.getUserAchievements(userId),
            this.getUserStats(userId),
        ]);
        const userAchievementMap = new Map(userAchievements.map((ua) => [ua.achievementId, ua]));
        let achievements = await Promise.all(allAchievements.map(async (achievement) => {
            const userAchievement = userAchievementMap.get(achievement.id);
            const isUnlocked = !!userAchievement;
            const criteria = achievement.criteria;
            const { progress, currentValue, targetValue } = await this.evaluateCriteria(criteria, userStats);
            return {
                id: achievement.id,
                slug: achievement.slug,
                title: achievement.title,
                description: achievement.description,
                iconUrl: achievement.iconUrl,
                xpReward: achievement.xpReward,
                category: achievement.category,
                isSecret: achievement.isSecret,
                isUnlocked,
                unlockedAt: userAchievement?.unlockedAt || null,
                progress: isUnlocked ? 100 : progress,
                currentValue,
                targetValue,
            };
        }));
        if (options?.category) {
            achievements = achievements.filter((a) => a.category === options.category);
        }
        if (!options?.includeSecret) {
            achievements = achievements.filter((a) => !a.isSecret || a.isUnlocked);
        }
        const byCategory = achievements.reduce((acc, achievement) => {
            if (!acc[achievement.category]) {
                acc[achievement.category] = [];
            }
            acc[achievement.category].push(achievement);
            return acc;
        }, {});
        const totalAchievements = allAchievements.filter((a) => !a.isSecret || userAchievementMap.has(a.id)).length;
        const unlockedCount = userAchievements.length;
        const totalXpEarned = userAchievements.reduce((sum, ua) => sum + ua.achievement.xpReward, 0);
        return {
            achievements,
            byCategory,
            summary: {
                total: totalAchievements,
                unlocked: unlockedCount,
                progress: totalAchievements > 0 ? (unlockedCount / totalAchievements) * 100 : 0,
                totalXpEarned,
            },
        };
    }
    async getUserStats(userId) {
        const [user, lessonStats, difficultyStats, courseStats, socialStats] = await Promise.all([
            this.repository.getUserGamificationData(userId),
            this.repository.getUserLessonStats(userId),
            this.repository.getUserLessonStatsByDifficulty(userId),
            this.repository.getUserCourseStats(userId),
            this.repository.getUserSocialStats(userId),
        ]);
        return {
            userId,
            xpTotal: user?.xpTotal || 0,
            level: user?.level || 1,
            streakCurrent: user?.streakCurrent || 0,
            streakLongest: user?.streakLongest || 0,
            lessonsCompleted: lessonStats.completedCount,
            easyLessonsCompleted: difficultyStats.EASY,
            mediumLessonsCompleted: difficultyStats.MEDIUM,
            hardLessonsCompleted: difficultyStats.HARD,
            coursesCompleted: courseStats.completedCount,
            coursesStarted: courseStats.startedCount,
            commentsCount: socialStats.commentCount,
            followersCount: socialStats.followerCount,
            followingCount: socialStats.followingCount,
        };
    }
    async evaluateCriteria(criteria, stats) {
        let currentValue = 0;
        let targetValue = 0;
        switch (criteria.type) {
            case 'lesson_count':
                currentValue = stats.lessonsCompleted;
                targetValue = criteria.count;
                break;
            case 'lesson_difficulty':
                switch (criteria.difficulty) {
                    case 'EASY':
                        currentValue = stats.easyLessonsCompleted;
                        break;
                    case 'MEDIUM':
                        currentValue = stats.mediumLessonsCompleted;
                        break;
                    case 'HARD':
                        currentValue = stats.hardLessonsCompleted;
                        break;
                }
                targetValue = criteria.count;
                break;
            case 'streak':
                currentValue = stats.streakLongest;
                targetValue = criteria.days;
                break;
            case 'course_complete':
                currentValue = stats.coursesCompleted;
                targetValue = criteria.count;
                break;
            case 'social':
                switch (criteria.action) {
                    case 'comment':
                        currentValue = stats.commentsCount;
                        break;
                    case 'follower':
                        currentValue = stats.followersCount;
                        break;
                    case 'following':
                        currentValue = stats.followingCount;
                        break;
                }
                targetValue = criteria.count;
                break;
            case 'level':
                currentValue = stats.level;
                targetValue = criteria.level;
                break;
            case 'xp_total':
                currentValue = stats.xpTotal;
                targetValue = criteria.amount;
                break;
            case 'time_of_day': {
                const hasMatch = await this.repository.hasCompletedLessonDuringHours(stats.userId, criteria.hour_start, criteria.hour_end);
                currentValue = hasMatch ? 1 : 0;
                targetValue = 1;
                break;
            }
            case 'fast_completion': {
                const hasFast = await this.repository.hasFastCompletion(stats.userId, criteria.max_seconds);
                currentValue = hasFast ? 1 : 0;
                targetValue = 1;
                break;
            }
            case 'course_started':
                currentValue = stats.coursesStarted;
                targetValue = criteria.count;
                break;
            case 'language_count': {
                const langCount = await this.repository.getCompletedLanguageCount(stats.userId);
                currentValue = langCount;
                targetValue = criteria.count;
                break;
            }
            default:
                return { progress: 0, currentValue: 0, targetValue: 1, isMet: false };
        }
        const progress = targetValue > 0 ? Math.min(100, (currentValue / targetValue) * 100) : 0;
        const isMet = currentValue >= targetValue;
        return { progress, currentValue, targetValue, isMet };
    }
};
exports.AchievementsService = AchievementsService;
exports.AchievementsService = AchievementsService = AchievementsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gamification_repository_1.GamificationRepository,
        xp_service_1.XpService])
], AchievementsService);
//# sourceMappingURL=achievements.service.js.map