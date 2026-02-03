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
var GamificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const gamification_repository_1 = require("./gamification.repository");
const STREAK_MILESTONES = {
    3: 25,
    7: 50,
    14: 100,
    30: 200,
    60: 400,
    100: 750,
};
const FREEZE_MILESTONE_INTERVAL = 7;
const DAILY_BONUS_BASE_XP = 10;
function calculateLevel(xpTotal) {
    return Math.max(1, Math.floor(xpTotal / 200) + 1);
}
let GamificationService = GamificationService_1 = class GamificationService {
    constructor(gamificationRepo) {
        this.gamificationRepo = gamificationRepo;
        this.logger = new common_1.Logger(GamificationService_1.name);
    }
    async awardXp(userId, amount, source, sourceId, description) {
        const user = await this.gamificationRepo.getUser(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const previousLevel = calculateLevel(user.xpTotal);
        const { newTotal } = await this.gamificationRepo.awardXp(userId, amount, source, sourceId, description);
        const newLevel = calculateLevel(newTotal);
        const leveledUp = newLevel > previousLevel;
        if (leveledUp) {
            await this.gamificationRepo.updateUserLevel(userId, newLevel);
            await this.gamificationRepo.createActivity(userId, client_1.ActivityType.LEVEL_UP, {
                previousLevel,
                newLevel,
                xpTotal: newTotal,
            });
        }
        return {
            xpAwarded: amount,
            newTotal,
            level: newLevel,
            leveledUp: leveledUp || undefined,
            previousLevel: leveledUp ? previousLevel : undefined,
        };
    }
    async evaluateAchievements(userId) {
        const unobtained = await this.gamificationRepo.getUnobtainedAchievements(userId);
        if (unobtained.length === 0)
            return [];
        const user = await this.gamificationRepo.getUser(userId);
        if (!user)
            return [];
        const [lessonCount, courseCount] = await Promise.all([
            this.gamificationRepo.getCompletedLessonCount(userId),
            this.gamificationRepo.getCompletedCourseCount(userId),
        ]);
        const stats = {
            lessons_completed: lessonCount,
            courses_completed: courseCount,
            current_streak: user.streakCurrent,
            longest_streak: user.streakLongest,
            xp_total: user.xpTotal,
            level: user.level,
        };
        const unlocked = [];
        for (const achievement of unobtained) {
            const criteria = achievement.criteria;
            const met = Object.entries(criteria).every(([key, threshold]) => (stats[key] ?? 0) >= threshold);
            if (met) {
                try {
                    await this.gamificationRepo.awardAchievement(userId, achievement.id, achievement.xpReward);
                    await this.gamificationRepo.createActivity(userId, client_1.ActivityType.ACHIEVEMENT_EARNED, { achievementId: achievement.id, slug: achievement.slug });
                    unlocked.push({
                        id: achievement.id,
                        slug: achievement.slug,
                        title: achievement.title,
                        description: achievement.description,
                        iconUrl: achievement.iconUrl,
                        xpReward: achievement.xpReward,
                    });
                }
                catch (error) {
                    this.logger.warn(`Achievement ${achievement.slug} already awarded to ${userId}`);
                }
            }
        }
        return unlocked;
    }
    async updateStreak(userId) {
        const user = await this.gamificationRepo.getUser(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastEntry = await this.gamificationRepo.getLastStreakEntry(userId);
        const lastDate = lastEntry
            ? new Date(lastEntry.date.toISOString().split('T')[0])
            : null;
        if (lastDate && lastDate.getTime() === today.getTime()) {
            return this.buildStreakInfo(user, today, true);
        }
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        let newStreak = user.streakCurrent;
        if (!lastDate) {
            newStreak = 1;
        }
        else if (lastDate.getTime() === yesterday.getTime()) {
            newStreak = user.streakCurrent + 1;
        }
        else {
            const twoDaysAgo = new Date(today);
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
            if (lastDate.getTime() === twoDaysAgo.getTime() && user.streakFreezes > 0) {
                await this.gamificationRepo.consumeStreakFreeze(userId);
                newStreak = user.streakCurrent + 1;
                this.logger.log(`Streak freeze consumed for user ${userId}`);
            }
            else {
                newStreak = 1;
            }
        }
        const streakBonus = STREAK_MILESTONES[newStreak] ?? 0;
        if (streakBonus > 0) {
            await this.gamificationRepo.awardXp(userId, streakBonus, client_1.XpSource.STREAK_BONUS, undefined, `${newStreak}-day streak milestone`);
            await this.gamificationRepo.createActivity(userId, client_1.ActivityType.STREAK_MILESTONE, { streak: newStreak, bonus: streakBonus });
        }
        let freezeEarned = false;
        if (newStreak > 0 && newStreak % FREEZE_MILESTONE_INTERVAL === 0) {
            freezeEarned = true;
        }
        const newLongest = Math.max(user.streakLongest, newStreak);
        const updatedUser = await this.gamificationRepo.updateUserStreak(userId, {
            streakCurrent: newStreak,
            streakLongest: newLongest,
            ...(freezeEarned ? { streakFreezes: user.streakFreezes + 1 } : {}),
        });
        await this.gamificationRepo.upsertStreakEntry(userId, today);
        return {
            currentStreak: updatedUser.streakCurrent,
            longestStreak: updatedUser.streakLongest,
            freezesAvailable: updatedUser.streakFreezes,
            lastActivityDate: today.toISOString(),
            todayCompleted: true,
        };
    }
    async createActivity(userId, type, data) {
        await this.gamificationRepo.createActivity(userId, type, data);
    }
    async processLessonCompletion(userId, lessonId, xpAmount) {
        const xpResult = await this.awardXp(userId, xpAmount, client_1.XpSource.LESSON_COMPLETE, lessonId, 'Lesson completion');
        const streakInfo = await this.updateStreak(userId);
        await this.createActivity(userId, client_1.ActivityType.LESSON_COMPLETED, {
            lessonId,
            xpEarned: xpAmount,
        });
        const achievementsUnlocked = await this.evaluateAchievements(userId);
        return {
            xp: xpResult,
            streak: streakInfo,
            achievementsUnlocked,
        };
    }
    async claimDailyBonus(userId) {
        const alreadyClaimed = await this.gamificationRepo.hasDailyBonusToday(userId);
        if (alreadyClaimed) {
            throw new common_1.BadRequestException('Daily bonus already claimed today');
        }
        const streakInfo = await this.updateStreak(userId);
        const streakBonus = STREAK_MILESTONES[streakInfo.currentStreak] ?? 0;
        const totalXp = DAILY_BONUS_BASE_XP + streakBonus;
        await this.gamificationRepo.awardXp(userId, totalXp, client_1.XpSource.DAILY_BONUS, undefined, `Daily claim (streak: ${streakInfo.currentStreak})`);
        const freezeEarned = streakInfo.currentStreak > 0 &&
            streakInfo.currentStreak % FREEZE_MILESTONE_INTERVAL === 0;
        return {
            success: true,
            baseXp: DAILY_BONUS_BASE_XP,
            streakBonus,
            totalXp,
            streak: streakInfo,
            freezeEarned: freezeEarned || undefined,
        };
    }
    async getStreakInfo(userId) {
        const user = await this.gamificationRepo.getUser(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastEntry = await this.gamificationRepo.getLastStreakEntry(userId);
        const lastDate = lastEntry
            ? new Date(lastEntry.date.toISOString().split('T')[0])
            : null;
        const todayCompleted = lastDate !== null && lastDate.getTime() === today.getTime();
        return this.buildStreakInfo(user, lastDate, todayCompleted);
    }
    buildStreakInfo(user, lastDate, todayCompleted) {
        return {
            currentStreak: user.streakCurrent,
            longestStreak: user.streakLongest,
            freezesAvailable: user.streakFreezes,
            lastActivityDate: lastDate?.toISOString() ?? null,
            todayCompleted,
        };
    }
};
exports.GamificationService = GamificationService;
exports.GamificationService = GamificationService = GamificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gamification_repository_1.GamificationRepository])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map