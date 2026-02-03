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
exports.LessonsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let LessonsRepository = class LessonsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.lesson.findUnique({
            where: { id },
            include: {
                level: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        courseId: true,
                        orderIndex: true,
                    },
                },
                quizzes: {
                    orderBy: { orderIndex: 'asc' },
                },
                challenges: true,
            },
        });
    }
    async findByIdWithProgress(id, userId) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id },
            include: {
                level: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        courseId: true,
                        orderIndex: true,
                    },
                },
                quizzes: {
                    orderBy: { orderIndex: 'asc' },
                },
                challenges: true,
            },
        });
        if (!lesson)
            return null;
        const progress = await this.prisma.userLessonProgress.findUnique({
            where: {
                userId_lessonId: { userId, lessonId: id },
            },
        });
        return { lesson, progress };
    }
    async findQuizzesByLessonId(lessonId) {
        return this.prisma.quiz.findMany({
            where: { lessonId },
            orderBy: { orderIndex: 'asc' },
        });
    }
    async findChallengesByLessonId(lessonId) {
        return this.prisma.codeChallenge.findMany({
            where: { lessonId },
        });
    }
    async getChallengeById(challengeId) {
        return this.prisma.codeChallenge.findUnique({
            where: { id: challengeId },
        });
    }
    async getUserProgress(userId, lessonId) {
        return this.prisma.userLessonProgress.findUnique({
            where: {
                userId_lessonId: { userId, lessonId },
            },
        });
    }
    async createUserProgress(userId, lessonId) {
        return this.prisma.userLessonProgress.create({
            data: {
                userId,
                lessonId,
                status: client_1.ProgressStatus.IN_PROGRESS,
                xpEarned: 0,
            },
        });
    }
    async upsertUserProgress(userId, lessonId, data) {
        return this.prisma.userLessonProgress.upsert({
            where: {
                userId_lessonId: { userId, lessonId },
            },
            update: data,
            create: {
                userId,
                lessonId,
                status: data.status || client_1.ProgressStatus.IN_PROGRESS,
                score: data.score,
                xpEarned: data.xpEarned || 0,
                timeSpent: data.timeSpent,
                completedAt: data.completedAt,
            },
        });
    }
    async isLevelUnlocked(userId, levelId) {
        const level = await this.prisma.level.findUnique({
            where: { id: levelId },
        });
        if (!level)
            return false;
        if (level.orderIndex === 0)
            return true;
        const unlock = await this.prisma.userLevelUnlock.findUnique({
            where: {
                userId_levelId: { userId, levelId },
            },
        });
        return !!unlock;
    }
    async getNextLevel(currentLevelId) {
        const currentLevel = await this.prisma.level.findUnique({
            where: { id: currentLevelId },
        });
        if (!currentLevel)
            return null;
        return this.prisma.level.findFirst({
            where: {
                courseId: currentLevel.courseId,
                orderIndex: currentLevel.orderIndex + 1,
            },
        });
    }
    async unlockLevel(userId, levelId) {
        return this.prisma.userLevelUnlock.upsert({
            where: {
                userId_levelId: { userId, levelId },
            },
            update: {},
            create: {
                userId,
                levelId,
            },
        });
    }
    async hasCompletedAnyLessonInLevel(userId, levelId) {
        const completed = await this.prisma.userLessonProgress.findFirst({
            where: {
                userId,
                status: client_1.ProgressStatus.COMPLETED,
                lesson: {
                    levelId,
                },
            },
        });
        return !!completed;
    }
    async updateCourseProgress(userId, courseId, data) {
        const currentProgress = await this.prisma.userCourseProgress.findUnique({
            where: {
                userId_courseId: { userId, courseId },
            },
        });
        if (!currentProgress)
            return null;
        return this.prisma.userCourseProgress.update({
            where: {
                userId_courseId: { userId, courseId },
            },
            data: {
                totalXpEarned: data.totalXpEarned !== undefined
                    ? currentProgress.totalXpEarned + data.totalXpEarned
                    : undefined,
                timeSpentSeconds: data.timeSpentSeconds !== undefined
                    ? currentProgress.timeSpentSeconds + data.timeSpentSeconds
                    : undefined,
                lastActivityAt: new Date(),
            },
        });
    }
    async getUserHintUnlocks(userId, challengeId) {
        return { unlockedCount: 1 };
    }
};
exports.LessonsRepository = LessonsRepository;
exports.LessonsRepository = LessonsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonsRepository);
//# sourceMappingURL=lessons.repository.js.map