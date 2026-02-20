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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let UsersRepository = class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async findByUsername(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    async findByIdWithSettings(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                settings: true,
                notificationSettings: true,
                privacySettings: true,
            },
        });
    }
    async findByUsernameWithSettings(username) {
        return this.prisma.user.findUnique({
            where: { username },
            include: {
                settings: true,
                notificationSettings: true,
                privacySettings: true,
            },
        });
    }
    async updateProfile(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
    async isUsernameAvailable(username, excludeUserId) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            select: { id: true },
        });
        if (!user)
            return true;
        if (excludeUserId && user.id === excludeUserId)
            return true;
        return false;
    }
    async updateUserSettings(userId, data) {
        return this.prisma.userSettings.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data,
            },
        });
    }
    async updateNotificationSettings(userId, data) {
        return this.prisma.notificationSettings.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data,
            },
        });
    }
    async updatePrivacySettings(userId, data) {
        return this.prisma.privacySettings.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data,
            },
        });
    }
    async getUserStats(userId) {
        const [user, courseProgress, lessonProgress, achievementsCount, badgesCount] = await Promise.all([
            this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    xpTotal: true,
                    level: true,
                    streakCurrent: true,
                    streakLongest: true,
                },
            }),
            this.prisma.userCourseProgress.findMany({
                where: { userId },
                select: {
                    completedAt: true,
                    timeSpentSeconds: true,
                },
            }),
            this.prisma.userLessonProgress.count({
                where: {
                    userId,
                    status: client_1.ProgressStatus.COMPLETED,
                },
            }),
            this.prisma.userAchievement.count({
                where: { userId },
            }),
            this.prisma.userBadge.count({
                where: { userId },
            }),
        ]);
        if (!user)
            return null;
        return {
            xpTotal: user.xpTotal,
            level: user.level,
            streakCurrent: user.streakCurrent,
            streakLongest: user.streakLongest,
            coursesStarted: courseProgress.length,
            coursesCompleted: courseProgress.filter((c) => c.completedAt !== null).length,
            lessonsCompleted: lessonProgress,
            totalTimeSpentMinutes: Math.floor(courseProgress.reduce((sum, c) => sum + c.timeSpentSeconds, 0) / 60),
            achievementsEarned: achievementsCount,
            badgesEarned: badgesCount,
        };
    }
    async getOnboardingStatus(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                onboardingCompleted: true,
                onboardingStep: true,
            },
        });
    }
    async completeOnboarding(userId, data) {
        const [user] = await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    displayName: data.displayName,
                    avatarUrl: data.avatarUrl,
                    onboardingCompleted: true,
                    onboardingStep: 7,
                    skillLevel: data.skillLevel,
                    interestedLanguages: data.interestedLanguages,
                    learningGoals: data.learningGoals,
                    dailyCommitmentMins: data.dailyCommitmentMins,
                    onboardingCompletedAt: new Date(),
                    xpTotal: { increment: 100 },
                },
            }),
            this.prisma.userSettings.upsert({
                where: { userId },
                update: { dailyGoalMins: data.dailyCommitmentMins },
                create: { userId, dailyGoalMins: data.dailyCommitmentMins },
            }),
            this.prisma.xpTransaction.create({
                data: {
                    userId,
                    amount: 100,
                    source: client_1.XpSource.EVENT,
                    description: 'Welcome bonus - Onboarding completed',
                },
            }),
        ]);
        return user;
    }
    async skipOnboarding(userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                onboardingCompleted: true,
                onboardingStep: 7,
                onboardingCompletedAt: new Date(),
            },
        });
    }
    async getPrivacySettings(userId) {
        return this.prisma.privacySettings.findUnique({
            where: { userId },
        });
    }
    async isFollowing(followerId, followingId) {
        const follow = await this.prisma.follow.findUnique({
            where: {
                followerId_followingId: { followerId, followingId },
            },
        });
        return !!follow;
    }
    async getUserCourses(userId) {
        return this.prisma.userCourseProgress.findMany({
            where: { userId },
            orderBy: { lastActivityAt: 'desc' },
            include: {
                course: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        description: true,
                        language: true,
                        iconUrl: true,
                        color: true,
                    },
                },
            },
        });
    }
    async getXpOverTime(userId, since) {
        return this.prisma.xpTransaction.findMany({
            where: {
                userId,
                createdAt: { gte: since },
            },
            select: {
                amount: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async getDifficultyBreakdown(userId) {
        const [easy, medium, hard] = await Promise.all([
            this.prisma.userLessonProgress.count({
                where: { userId, status: client_1.ProgressStatus.COMPLETED, lesson: { difficulty: 'EASY' } },
            }),
            this.prisma.userLessonProgress.count({
                where: { userId, status: client_1.ProgressStatus.COMPLETED, lesson: { difficulty: 'MEDIUM' } },
            }),
            this.prisma.userLessonProgress.count({
                where: { userId, status: client_1.ProgressStatus.COMPLETED, lesson: { difficulty: 'HARD' } },
            }),
        ]);
        return { easy, medium, hard };
    }
    async getTimeSpentInRange(userId, since) {
        const result = await this.prisma.userCourseProgress.aggregate({
            where: { userId, lastActivityAt: { gte: since } },
            _sum: { timeSpentSeconds: true },
        });
        return result._sum.timeSpentSeconds || 0;
    }
    async getTimeSpentByDay(userId, since) {
        const lessons = await this.prisma.userLessonProgress.findMany({
            where: {
                userId,
                status: client_1.ProgressStatus.COMPLETED,
                completedAt: { gte: since },
            },
            select: {
                timeSpent: true,
                completedAt: true,
            },
        });
        const byDate = new Map();
        for (const l of lessons) {
            if (!l.completedAt || !l.timeSpent)
                continue;
            const dateKey = l.completedAt.toISOString().split('T')[0];
            byDate.set(dateKey, (byDate.get(dateKey) || 0) + Math.round(l.timeSpent / 60));
        }
        return Array.from(byDate.entries()).map(([date, minutes]) => ({ date, minutes }));
    }
    async getActivityHeatmap(userId, since) {
        const transactions = await this.prisma.xpTransaction.findMany({
            where: {
                userId,
                createdAt: { gte: since },
            },
            select: {
                createdAt: true,
                amount: true,
            },
        });
        const grid = new Map();
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        for (const tx of transactions) {
            const d = tx.createdAt;
            const jsDay = d.getDay();
            const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
            const hour = d.getHours();
            const key = `${dayIndex}-${hour}`;
            grid.set(key, (grid.get(key) || 0) + tx.amount);
        }
        const result = [];
        for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
            for (let h = 0; h < 24; h++) {
                result.push({
                    day: days[dayIdx],
                    hour: h,
                    value: grid.get(`${dayIdx}-${h}`) || 0,
                });
            }
        }
        return result;
    }
    async calculateCourseGrade(userId, courseId) {
        const lessonProgress = await this.prisma.userLessonProgress.findMany({
            where: {
                userId,
                status: client_1.ProgressStatus.COMPLETED,
                lesson: { level: { courseId } },
            },
            select: { score: true },
        });
        if (lessonProgress.length === 0)
            return 'C';
        const scores = lessonProgress
            .map((lp) => lp.score)
            .filter((s) => s !== null && s !== undefined);
        if (scores.length === 0)
            return 'C';
        const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
        if (avg >= 97)
            return 'A+';
        if (avg >= 93)
            return 'A';
        if (avg >= 90)
            return 'A-';
        if (avg >= 87)
            return 'B+';
        if (avg >= 83)
            return 'B';
        if (avg >= 80)
            return 'B-';
        if (avg >= 77)
            return 'C+';
        return 'C';
    }
    async getCompletedCourses(userId) {
        return this.prisma.userCourseProgress.findMany({
            where: { userId, completedAt: { not: null } },
            orderBy: { completedAt: 'desc' },
            include: {
                course: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        color: true,
                    },
                },
            },
        });
    }
    async getChallengeHistory(userId, page, limit) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.challengeSubmission.findMany({
                where: { userId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    challenge: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
            }),
            this.prisma.challengeSubmission.count({ where: { userId } }),
        ]);
        return { data, total };
    }
    async getUserActivities(userId, options) {
        const skip = (options.page - 1) * options.limit;
        const where = { userId };
        if (options.type) {
            where.type = options.type;
        }
        const [data, total] = await Promise.all([
            this.prisma.activity.findMany({
                where,
                skip,
                take: options.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.activity.count({ where }),
        ]);
        return { data, total };
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map