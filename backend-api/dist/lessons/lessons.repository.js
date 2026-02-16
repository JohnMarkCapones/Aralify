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
                        titleEn: true,
                        titleFil: true,
                        courseId: true,
                        orderIndex: true,
                        course: {
                            select: {
                                slug: true,
                                title: true,
                                language: true,
                                titleEn: true,
                                titleFil: true,
                            },
                        },
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
                        titleEn: true,
                        titleFil: true,
                        courseId: true,
                        orderIndex: true,
                        course: {
                            select: {
                                slug: true,
                                title: true,
                                language: true,
                                titleEn: true,
                                titleFil: true,
                            },
                        },
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
    async getQuizById(quizId) {
        return this.prisma.quiz.findUnique({
            where: { id: quizId },
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
    async createQuizAnswer(data) {
        return this.prisma.userQuizAnswer.create({
            data: {
                userId: data.userId,
                quizId: data.quizId,
                answer: data.answer,
                isCorrect: data.isCorrect,
                attemptNumber: data.attemptNumber,
                xpAwarded: data.xpAwarded,
                timeSpentSeconds: data.timeSpentSeconds,
            },
        });
    }
    async getQuizAttemptCount(userId, quizId) {
        return this.prisma.userQuizAnswer.count({
            where: { userId, quizId },
        });
    }
    async hasCorrectAnswer(userId, quizId) {
        const correctAnswer = await this.prisma.userQuizAnswer.findFirst({
            where: { userId, quizId, isCorrect: true },
        });
        return !!correctAnswer;
    }
    async getQuizResultsForLesson(userId, lessonId) {
        const quizzes = await this.prisma.quiz.findMany({
            where: { lessonId },
            orderBy: { orderIndex: 'asc' },
        });
        const quizIds = quizzes.map((q) => q.id);
        const answers = await this.prisma.userQuizAnswer.findMany({
            where: {
                userId,
                quizId: { in: quizIds },
            },
            orderBy: { createdAt: 'desc' },
        });
        const answersByQuiz = new Map();
        for (const answer of answers) {
            if (!answersByQuiz.has(answer.quizId)) {
                answersByQuiz.set(answer.quizId, []);
            }
            answersByQuiz.get(answer.quizId).push(answer);
        }
        return { quizzes, answersByQuiz };
    }
    async getUserQuizScoreForLesson(userId, lessonId) {
        const quizzes = await this.prisma.quiz.findMany({
            where: { lessonId },
            select: { id: true },
        });
        if (quizzes.length === 0) {
            return { correct: 0, total: 0 };
        }
        const quizIds = quizzes.map((q) => q.id);
        const correctQuizzes = await this.prisma.userQuizAnswer.groupBy({
            by: ['quizId'],
            where: {
                userId,
                quizId: { in: quizIds },
                isCorrect: true,
            },
        });
        return {
            correct: correctQuizzes.length,
            total: quizzes.length,
        };
    }
    async getHintUnlockCount(userId, targetType, targetId) {
        return this.prisma.userHintUnlock.count({
            where: { userId, targetType, targetId },
        });
    }
    async getHintUnlocks(userId, targetType, targetId) {
        return this.prisma.userHintUnlock.findMany({
            where: { userId, targetType, targetId },
            orderBy: { hintIndex: 'asc' },
        });
    }
    async createHintUnlock(data) {
        return this.prisma.userHintUnlock.create({
            data: {
                userId: data.userId,
                targetType: data.targetType,
                targetId: data.targetId,
                hintIndex: data.hintIndex,
            },
        });
    }
    async hasHintUnlock(userId, targetType, targetId, hintIndex) {
        const unlock = await this.prisma.userHintUnlock.findUnique({
            where: {
                userId_targetType_targetId_hintIndex: {
                    userId,
                    targetType,
                    targetId,
                    hintIndex,
                },
            },
        });
        return !!unlock;
    }
    async createChallengeSubmission(data) {
        return this.prisma.challengeSubmission.create({
            data: {
                userId: data.userId,
                challengeId: data.challengeId,
                code: data.code,
                languageId: data.languageId,
                status: data.status,
                attemptNumber: data.attemptNumber,
                xpAwarded: data.xpAwarded ?? 0,
                timeSpentSeconds: data.timeSpentSeconds,
                testResults: data.testResults,
            },
        });
    }
    async getChallengeAttemptCount(userId, challengeId) {
        return this.prisma.challengeSubmission.count({
            where: { userId, challengeId },
        });
    }
    async hasPassedChallenge(userId, challengeId) {
        const passed = await this.prisma.challengeSubmission.findFirst({
            where: { userId, challengeId, status: 'PASSED' },
        });
        return !!passed;
    }
    async createQuiz(lessonId, data) {
        let orderIndex = data.orderIndex;
        if (orderIndex === undefined) {
            const lastQuiz = await this.prisma.quiz.findFirst({
                where: { lessonId },
                orderBy: { orderIndex: 'desc' },
            });
            orderIndex = lastQuiz ? lastQuiz.orderIndex + 1 : 0;
        }
        return this.prisma.quiz.create({
            data: {
                lessonId,
                type: data.type,
                question: data.question,
                options: data.options,
                correctAnswer: data.correctAnswer,
                explanation: data.explanation,
                hints: data.hints,
                difficulty: data.difficulty,
                orderIndex,
            },
        });
    }
    async updateQuiz(quizId, data) {
        return this.prisma.quiz.update({
            where: { id: quizId },
            data: {
                type: data.type,
                question: data.question,
                options: data.options,
                correctAnswer: data.correctAnswer,
                explanation: data.explanation,
                hints: data.hints,
                difficulty: data.difficulty,
                orderIndex: data.orderIndex,
            },
        });
    }
    async deleteQuiz(quizId) {
        return this.prisma.quiz.delete({
            where: { id: quizId },
        });
    }
    async bulkCreateQuizzes(lessonId, quizzes) {
        const lastQuiz = await this.prisma.quiz.findFirst({
            where: { lessonId },
            orderBy: { orderIndex: 'desc' },
        });
        let nextOrderIndex = lastQuiz ? lastQuiz.orderIndex + 1 : 0;
        const createdQuizzes = [];
        for (const quiz of quizzes) {
            const created = await this.prisma.quiz.create({
                data: {
                    lessonId,
                    type: quiz.type,
                    question: quiz.question,
                    options: quiz.options,
                    correctAnswer: quiz.correctAnswer,
                    explanation: quiz.explanation,
                    hints: quiz.hints,
                    difficulty: quiz.difficulty,
                    orderIndex: quiz.orderIndex ?? nextOrderIndex++,
                },
            });
            createdQuizzes.push(created);
        }
        return createdQuizzes;
    }
    async getLessonById(lessonId) {
        return this.prisma.lesson.findUnique({
            where: { id: lessonId },
        });
    }
    async findSiblingLessons(levelId, currentOrderIndex, difficulty) {
        const [previous, next] = await Promise.all([
            this.prisma.lesson.findFirst({
                where: {
                    levelId,
                    difficulty,
                    orderIndex: { lt: currentOrderIndex },
                    isPublished: true,
                },
                orderBy: { orderIndex: 'desc' },
                select: { id: true, slug: true, title: true },
            }),
            this.prisma.lesson.findFirst({
                where: {
                    levelId,
                    difficulty,
                    orderIndex: { gt: currentOrderIndex },
                    isPublished: true,
                },
                orderBy: { orderIndex: 'asc' },
                select: { id: true, slug: true, title: true },
            }),
        ]);
        return { previous, next };
    }
    async findBySlug(slug, difficulty) {
        return this.prisma.lesson.findFirst({
            where: {
                slug,
                ...(difficulty ? { difficulty } : {}),
                isPublished: true,
            },
            include: {
                level: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        titleEn: true,
                        titleFil: true,
                        courseId: true,
                        orderIndex: true,
                        course: {
                            select: {
                                slug: true,
                                title: true,
                                language: true,
                                titleEn: true,
                                titleFil: true,
                            },
                        },
                    },
                },
                quizzes: {
                    orderBy: { orderIndex: 'asc' },
                },
                challenges: true,
            },
        });
    }
};
exports.LessonsRepository = LessonsRepository;
exports.LessonsRepository = LessonsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonsRepository);
//# sourceMappingURL=lessons.repository.js.map