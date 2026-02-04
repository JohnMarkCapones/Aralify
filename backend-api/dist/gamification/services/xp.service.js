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
var XpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpService = void 0;
const common_1 = require("@nestjs/common");
const gamification_repository_1 = require("../gamification.repository");
const constants_1 = require("../constants");
let XpService = XpService_1 = class XpService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(XpService_1.name);
    }
    async awardXp(userId, amount, source, sourceId, description) {
        const user = await this.repository.getUserGamificationData(userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        const previousLevel = user.level;
        const newTotal = user.xpTotal + amount;
        const newLevel = (0, constants_1.calculateLevelFromXp)(newTotal);
        const levelUp = newLevel > previousLevel;
        const updatedUser = await this.repository.awardXpAtomic(userId, amount, newLevel, source, sourceId, description);
        if (levelUp) {
            this.logger.log(`User ${userId} leveled up from ${previousLevel} to ${newLevel}`);
            await this.repository.createActivity({
                userId,
                type: 'LEVEL_UP',
                data: {
                    previousLevel,
                    newLevel,
                    xpTotal: updatedUser.xpTotal,
                },
            });
        }
        return {
            xpAwarded: amount,
            newTotal: updatedUser.xpTotal,
            levelUp,
            previousLevel,
            newLevel,
            rankTitle: (0, constants_1.getRankTitle)(newLevel),
        };
    }
    async getXpHistory(userId, options) {
        const { transactions, total } = await this.repository.getXpTransactions(userId, options);
        return {
            transactions: transactions.map((t) => ({
                id: t.id,
                amount: t.amount,
                source: t.source,
                sourceId: t.sourceId,
                description: t.description,
                createdAt: t.createdAt,
            })),
            total,
            limit: options?.limit || 50,
            offset: options?.offset || 0,
        };
    }
    async getXpSummary(userId, days = 30) {
        return this.repository.getXpTransactionsSummary(userId, days);
    }
    calculateLevelFromXp(totalXp) {
        return (0, constants_1.calculateLevelFromXp)(totalXp);
    }
    calculateXpForLevel(level) {
        return (0, constants_1.calculateXpForLevel)(level);
    }
    getRankTitle(level) {
        return (0, constants_1.getRankTitle)(level);
    }
    getLevelProgress(totalXp) {
        return (0, constants_1.calculateLevelProgress)(totalXp);
    }
    getLevelSystemInfo() {
        return {
            formula: {
                description: 'XP required for level N = floor(100 * N^1.5)',
                baseMultiplier: 100,
                exponent: 1.5,
            },
            levels: constants_1.LEVEL_XP_THRESHOLDS,
            ranks: constants_1.RANK_TITLES.map((r) => ({
                minLevel: r.minLevel,
                title: r.title,
                xpRequired: (0, constants_1.calculateXpForLevel)(r.minLevel),
            })),
            xpSources: [
                { source: 'LESSON_COMPLETE', description: 'Complete a lesson', baseXp: 100 },
                { source: 'QUIZ_COMPLETE', description: 'Complete a quiz', baseXp: 25 },
                { source: 'CHALLENGE_COMPLETE', description: 'Complete a code challenge', baseXp: 50 },
                { source: 'DAILY_BONUS', description: 'Daily login bonus', baseXp: 10 },
                { source: 'STREAK_BONUS', description: 'Streak milestone bonus', baseXp: 'varies' },
                { source: 'ACHIEVEMENT', description: 'Unlock an achievement', baseXp: 'varies' },
            ],
            difficultyMultipliers: {
                EASY: 1,
                MEDIUM: 2,
                HARD: 3,
            },
        };
    }
};
exports.XpService = XpService;
exports.XpService = XpService = XpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gamification_repository_1.GamificationRepository])
], XpService);
//# sourceMappingURL=xp.service.js.map