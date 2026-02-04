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
exports.GamificationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GamificationRepository = class GamificationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserGamificationData(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            return null;
        return {
            id: user.id,
            xpTotal: user.xpTotal,
            level: user.level,
            streakCurrent: user.streakCurrent,
            streakLongest: user.streakLongest,
            streakFreezes: user.streakFreezes,
            lastDailyClaimAt: user.lastDailyClaimAt,
            lastActiveAt: user.lastActiveAt,
            createdAt: user.createdAt,
        };
    }
    async awardXpAtomic(userId, amount, level, source, sourceId, description) {
        const [, user] = await this.prisma.$transaction([
            this.prisma.xpTransaction.create({
                data: { userId, amount, source, sourceId, description },
            }),
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    xpTotal: { increment: amount },
                    level,
                },
            }),
        ]);
        return user;
    }
    async updateUserStreak(userId, data) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                streakCurrent: data.streakCurrent,
                ...(data.streakLongest !== undefined && { streakLongest: data.streakLongest }),
                ...(data.streakFreezes !== undefined && { streakFreezes: data.streakFreezes }),
                ...(data.lastActiveAt && { lastActiveAt: data.lastActiveAt }),
            },
        });
    }
    async updateLastDailyClaim(userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { lastDailyClaimAt: new Date() },
        });
    }
    async createXpTransaction(data) {
        return this.prisma.xpTransaction.create({
            data: {
                userId: data.userId,
                amount: data.amount,
                source: data.source,
                sourceId: data.sourceId,
                description: data.description,
            },
        });
    }
    async getXpTransactions(userId, options) {
        const where = {
            userId,
            ...(options?.source && { source: options.source }),
            ...(options?.startDate || options?.endDate
                ? {
                    createdAt: {
                        ...(options?.startDate && { gte: options.startDate }),
                        ...(options?.endDate && { lte: options.endDate }),
                    },
                }
                : {}),
        };
        const [transactions, total] = await Promise.all([
            this.prisma.xpTransaction.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: options?.limit || 50,
                skip: options?.offset || 0,
            }),
            this.prisma.xpTransaction.count({ where }),
        ]);
        return { transactions, total };
    }
    async getXpTransactionsSummary(userId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const transactions = await this.prisma.xpTransaction.groupBy({
            by: ['source'],
            where: {
                userId,
                createdAt: { gte: startDate },
            },
            _sum: { amount: true },
            _count: true,
        });
        return transactions.map((t) => ({
            source: t.source,
            totalXp: t._sum.amount || 0,
            count: t._count,
        }));
    }
    async getAllAchievements() {
        return this.prisma.achievement.findMany({
            orderBy: [{ category: 'asc' }, { xpReward: 'asc' }],
        });
    }
    async getUserAchievements(userId) {
        return this.prisma.userAchievement.findMany({
            where: { userId },
            include: { achievement: true },
            orderBy: { unlockedAt: 'desc' },
        });
    }
    async getUserAchievementIds(userId) {
        const achievements = await this.prisma.userAchievement.findMany({
            where: { userId },
            select: { achievementId: true },
        });
        return achievements.map((a) => a.achievementId);
    }
    async awardAchievement(userId, achievementId) {
        return this.prisma.userAchievement.upsert({
            where: {
                userId_achievementId: { userId, achievementId },
            },
            update: {},
            create: {
                userId,
                achievementId,
            },
            include: { achievement: true },
        });
    }
    async getAchievementBySlug(slug) {
        return this.prisma.achievement.findUnique({
            where: { slug },
        });
    }
    async getUserBadges(userId, options) {
        return this.prisma.userBadge.findMany({
            where: {
                userId,
                ...(options?.displayedOnly && { isDisplayed: true }),
            },
            include: { badge: true },
            orderBy: options?.displayedOnly
                ? { displayOrder: 'asc' }
                : { earnedAt: 'desc' },
        });
    }
    async getUserBadgeCount(userId) {
        return this.prisma.userBadge.count({
            where: { userId },
        });
    }
    async getDisplayedBadgeCount(userId) {
        return this.prisma.userBadge.count({
            where: { userId, isDisplayed: true },
        });
    }
    async getUserBadge(userId, badgeId) {
        return this.prisma.userBadge.findUnique({
            where: {
                userId_badgeId: { userId, badgeId },
            },
            include: { badge: true },
        });
    }
    async setBadgeDisplayed(userId, badgeId, isDisplayed, displayOrder) {
        return this.prisma.userBadge.update({
            where: {
                userId_badgeId: { userId, badgeId },
            },
            data: {
                isDisplayed,
                displayOrder: isDisplayed ? displayOrder : null,
            },
            include: { badge: true },
        });
    }
    async awardBadge(userId, badgeId) {
        return this.prisma.userBadge.upsert({
            where: {
                userId_badgeId: { userId, badgeId },
            },
            update: {},
            create: {
                userId,
                badgeId,
            },
            include: { badge: true },
        });
    }
    async getBadgeBySlug(slug) {
        return this.prisma.badge.findUnique({
            where: { slug },
        });
    }
    async getStreakHistory(userId, limit = 30) {
        return this.prisma.streakHistory.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: limit,
        });
    }
    async recordStreakDay(userId, date) {
        const dateOnly = new Date(date.toISOString().split('T')[0]);
        return this.prisma.streakHistory.upsert({
            where: {
                userId_date: { userId, date: dateOnly },
            },
            update: { completed: true },
            create: {
                userId,
                date: dateOnly,
                completed: true,
            },
        });
    }
    async getLastStreakDay(userId) {
        return this.prisma.streakHistory.findFirst({
            where: { userId, completed: true },
            orderBy: { date: 'desc' },
        });
    }
    async getUserLessonStats(userId) {
        const stats = await this.prisma.userLessonProgress.groupBy({
            by: ['status'],
            where: { userId },
            _count: true,
        });
        const completedCount = stats.find((s) => s.status === 'COMPLETED')?._count || 0;
        const totalCount = stats.reduce((acc, s) => acc + s._count, 0);
        return { completedCount, totalCount };
    }
    async getUserLessonStatsByDifficulty(userId) {
        const lessons = await this.prisma.userLessonProgress.findMany({
            where: { userId, status: 'COMPLETED' },
            include: {
                lesson: {
                    select: { difficulty: true },
                },
            },
        });
        const stats = {
            EASY: 0,
            MEDIUM: 0,
            HARD: 0,
        };
        lessons.forEach((lp) => {
            stats[lp.lesson.difficulty]++;
        });
        return stats;
    }
    async getUserCourseStats(userId) {
        const courses = await this.prisma.userCourseProgress.findMany({
            where: { userId },
        });
        const completedCount = courses.filter((c) => c.completionPercentage >= 100).length;
        return {
            startedCount: courses.length,
            completedCount,
        };
    }
    async getUserSocialStats(userId) {
        const [commentCount, followerCount, followingCount] = await Promise.all([
            this.prisma.comment.count({ where: { userId } }),
            this.prisma.follow.count({ where: { followingId: userId } }),
            this.prisma.follow.count({ where: { followerId: userId } }),
        ]);
        return { commentCount, followerCount, followingCount };
    }
    async hasCompletedLessonDuringHours(userId, hourStart, hourEnd) {
        const completions = await this.prisma.userLessonProgress.findMany({
            where: { userId, status: 'COMPLETED', completedAt: { not: null } },
            select: { completedAt: true },
        });
        return completions.some((c) => {
            if (!c.completedAt)
                return false;
            const hour = c.completedAt.getUTCHours();
            return hourStart <= hourEnd
                ? hour >= hourStart && hour < hourEnd
                : hour >= hourStart || hour < hourEnd;
        });
    }
    async hasFastCompletion(userId, maxSeconds) {
        const fast = await this.prisma.userLessonProgress.findFirst({
            where: {
                userId,
                status: 'COMPLETED',
                timeSpent: { not: null, lte: maxSeconds },
            },
        });
        return !!fast;
    }
    async getCompletedLanguageCount(userId) {
        const lessons = await this.prisma.userLessonProgress.findMany({
            where: { userId, status: 'COMPLETED' },
            include: {
                lesson: {
                    include: {
                        level: {
                            include: { course: { select: { language: true } } },
                        },
                    },
                },
            },
        });
        const languages = new Set(lessons.map((lp) => lp.lesson.level.course.language));
        return languages.size;
    }
    async getLessonsCompletedToday(userId) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        return this.prisma.userLessonProgress.count({
            where: {
                userId,
                status: 'COMPLETED',
                completedAt: { gte: startOfDay },
            },
        });
    }
    async createActivity(activityData) {
        return this.prisma.activity.create({
            data: {
                userId: activityData.userId,
                type: activityData.type,
                data: (activityData.data || {}),
            },
        });
    }
};
exports.GamificationRepository = GamificationRepository;
exports.GamificationRepository = GamificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamificationRepository);
//# sourceMappingURL=gamification.repository.js.map