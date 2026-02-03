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
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map