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
exports.CoursesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesRepository = class CoursesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(options) {
        const where = {};
        if (options?.language) {
            where.language = options.language;
        }
        if (options?.isPublished !== undefined) {
            where.isPublished = options.isPublished;
        }
        let orderBy = { orderIndex: 'asc' };
        if (options?.orderBy === 'newest') {
            orderBy = { createdAt: 'desc' };
        }
        else if (options?.orderBy === 'alphabetical') {
            orderBy = { titleEn: 'asc' };
        }
        return this.prisma.course.findMany({
            where,
            orderBy,
            include: {
                levels: {
                    where: { isPublished: true },
                    orderBy: { orderIndex: 'asc' },
                },
                _count: {
                    select: { levels: true },
                },
            },
        });
    }
    async findBySlug(slug) {
        return this.prisma.course.findUnique({
            where: { slug },
            include: {
                levels: {
                    where: { isPublished: true },
                    orderBy: { orderIndex: 'asc' },
                    include: {
                        lessons: {
                            where: { isPublished: true },
                            orderBy: { difficulty: 'asc' },
                        },
                    },
                },
            },
        });
    }
    async findById(id) {
        return this.prisma.course.findUnique({
            where: { id },
        });
    }
    async getLevels(courseId) {
        return this.prisma.level.findMany({
            where: {
                courseId,
                isPublished: true,
            },
            orderBy: { orderIndex: 'asc' },
            include: {
                lessons: {
                    where: { isPublished: true },
                    orderBy: { difficulty: 'asc' },
                },
            },
        });
    }
    async getUserProgress(userId, courseId) {
        return this.prisma.userCourseProgress.findUnique({
            where: {
                userId_courseId: { userId, courseId },
            },
        });
    }
    async createUserProgress(userId, courseId) {
        return this.prisma.userCourseProgress.create({
            data: {
                userId,
                courseId,
            },
        });
    }
    async updateUserProgress(userId, courseId, data) {
        return this.prisma.userCourseProgress.update({
            where: {
                userId_courseId: { userId, courseId },
            },
            data,
        });
    }
    async unlockFirstLevel(userId, courseId) {
        const firstLevel = await this.prisma.level.findFirst({
            where: { courseId, isPublished: true },
            orderBy: { orderIndex: 'asc' },
        });
        if (!firstLevel)
            return null;
        return this.prisma.userLevelUnlock.upsert({
            where: {
                userId_levelId: { userId, levelId: firstLevel.id },
            },
            create: {
                userId,
                levelId: firstLevel.id,
            },
            update: {},
        });
    }
    async getUserLevelUnlocks(userId, courseId) {
        return this.prisma.userLevelUnlock.findMany({
            where: {
                userId,
                level: { courseId },
            },
            include: { level: true },
        });
    }
    async getUserLessonProgress(userId, courseId) {
        return this.prisma.userLessonProgress.findMany({
            where: {
                userId,
                lesson: {
                    level: { courseId },
                },
            },
            include: {
                lesson: {
                    include: { level: true },
                },
            },
        });
    }
};
exports.CoursesRepository = CoursesRepository;
exports.CoursesRepository = CoursesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesRepository);
//# sourceMappingURL=courses.repository.js.map