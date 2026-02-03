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
var StreaksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreaksService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const gamification_repository_1 = require("../gamification.repository");
const xp_service_1 = require("./xp.service");
const constants_1 = require("../constants");
let StreaksService = StreaksService_1 = class StreaksService {
    constructor(repository, xpService) {
        this.repository = repository;
        this.xpService = xpService;
        this.logger = new common_1.Logger(StreaksService_1.name);
    }
    async updateStreak(userId) {
        const user = await this.repository.getUserGamificationData(userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        const lastStreakDay = await this.repository.getLastStreakDay(userId);
        const today = new Date();
        const previousStreak = user.streakCurrent;
        let newStreak = previousStreak;
        let xpAwarded = 0;
        let milestoneReached = null;
        if (lastStreakDay && (0, constants_1.isToday)(lastStreakDay.date)) {
            return {
                streakUpdated: false,
                newStreak: previousStreak,
                previousStreak,
                milestoneReached: null,
                xpAwarded: 0,
            };
        }
        if (lastStreakDay && (0, constants_1.isYesterday)(lastStreakDay.date)) {
            newStreak = previousStreak + 1;
        }
        else if (lastStreakDay) {
            newStreak = 1;
        }
        else {
            newStreak = 1;
        }
        await this.repository.recordStreakDay(userId, today);
        const newLongest = Math.max(user.streakLongest, newStreak);
        await this.repository.updateUserStreak(userId, {
            streakCurrent: newStreak,
            streakLongest: newLongest,
            lastActiveAt: today,
        });
        const { milestone, isMilestone } = (0, constants_1.getStreakMilestoneBonus)(newStreak);
        if (isMilestone && milestone) {
            milestoneReached = milestone;
            const result = await this.xpService.awardXp(userId, milestone.xpBonus, client_1.XpSource.STREAK_BONUS, undefined, `Streak milestone: ${milestone.name}`);
            xpAwarded = result.xpAwarded;
            await this.repository.createActivity({
                userId,
                type: 'STREAK_MILESTONE',
                data: {
                    streak: newStreak,
                    milestoneName: milestone.name,
                    xpBonus: milestone.xpBonus,
                },
            });
            this.logger.log(`User ${userId} reached streak milestone: ${milestone.name} (${newStreak} days)`);
        }
        return {
            streakUpdated: true,
            newStreak,
            previousStreak,
            milestoneReached,
            xpAwarded,
        };
    }
    async claimDailyBonus(userId) {
        const user = await this.repository.getUserGamificationData(userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        if (user.lastDailyClaimAt && (0, constants_1.isToday)(user.lastDailyClaimAt)) {
            return {
                success: false,
                xpEarned: 0,
                alreadyClaimed: true,
                currentStreak: user.streakCurrent,
            };
        }
        const bonusXp = (0, constants_1.calculateDailyBonus)(user.streakCurrent);
        await this.xpService.awardXp(userId, bonusXp, client_1.XpSource.DAILY_BONUS, undefined, `Daily login bonus (streak: ${user.streakCurrent})`);
        await this.repository.updateLastDailyClaim(userId);
        this.logger.log(`User ${userId} claimed daily bonus: ${bonusXp} XP (streak: ${user.streakCurrent})`);
        return {
            success: true,
            xpEarned: bonusXp,
            alreadyClaimed: false,
            currentStreak: user.streakCurrent,
        };
    }
    async getStreakInfo(userId) {
        const user = await this.repository.getUserGamificationData(userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        const lastStreakDay = await this.repository.getLastStreakDay(userId);
        const history = await this.repository.getStreakHistory(userId, 30);
        let isStreakActive = true;
        if (lastStreakDay) {
            const isActiveToday = (0, constants_1.isToday)(lastStreakDay.date);
            const isActiveYesterday = (0, constants_1.isYesterday)(lastStreakDay.date);
            isStreakActive = isActiveToday || isActiveYesterday;
        }
        else {
            isStreakActive = false;
        }
        const streakAtRisk = lastStreakDay
            ? !(0, constants_1.isToday)(lastStreakDay.date) && (0, constants_1.isYesterday)(lastStreakDay.date)
            : false;
        const nextMilestone = (0, constants_1.getNextMilestone)(user.streakCurrent);
        const milestonesProgress = (0, constants_1.getMilestonesWithProgress)(user.streakCurrent);
        const canClaimDailyBonus = !user.lastDailyClaimAt || !(0, constants_1.isToday)(user.lastDailyClaimAt);
        const dailyBonusAmount = (0, constants_1.calculateDailyBonus)(user.streakCurrent);
        return {
            currentStreak: user.streakCurrent,
            longestStreak: user.streakLongest,
            isStreakActive,
            streakAtRisk,
            lastActivityDate: lastStreakDay?.date || null,
            nextMilestone,
            milestones: milestonesProgress,
            dailyBonus: {
                canClaim: canClaimDailyBonus,
                amount: dailyBonusAmount,
                lastClaimAt: user.lastDailyClaimAt,
            },
            recentHistory: history.map((h) => ({
                date: h.date,
                completed: h.completed,
            })),
        };
    }
};
exports.StreaksService = StreaksService;
exports.StreaksService = StreaksService = StreaksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gamification_repository_1.GamificationRepository,
        xp_service_1.XpService])
], StreaksService);
//# sourceMappingURL=streaks.service.js.map