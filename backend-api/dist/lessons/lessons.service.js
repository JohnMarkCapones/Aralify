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
var LessonsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const lessons_repository_1 = require("./lessons.repository");
const services_1 = require("../gamification/services");
const XP_MULTIPLIERS = {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
};
let LessonsService = LessonsService_1 = class LessonsService {
    constructor(lessonsRepository, gamificationService) {
        this.lessonsRepository = lessonsRepository;
        this.gamificationService = gamificationService;
        this.logger = new common_1.Logger(LessonsService_1.name);
    }
    async findById(id, userId) {
        if (userId) {
            const result = await this.lessonsRepository.findByIdWithProgress(id, userId);
            if (!result?.lesson || !result.lesson.isPublished) {
                throw new common_1.NotFoundException('Lesson not found');
            }
            return this.formatLessonDetail(result.lesson, result.progress);
        }
        const lesson = await this.lessonsRepository.findById(id);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return this.formatLessonDetail(lesson, null);
    }
    async startLesson(lessonId, userId) {
        const lesson = await this.lessonsRepository.findById(lessonId);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        const isUnlocked = await this.lessonsRepository.isLevelUnlocked(userId, lesson.levelId);
        if (!isUnlocked) {
            throw new common_1.ForbiddenException('Level is not unlocked. Complete previous levels first.');
        }
        const existingProgress = await this.lessonsRepository.getUserProgress(userId, lessonId);
        if (existingProgress) {
            return {
                success: true,
                lessonId,
                progress: this.formatProgress(existingProgress),
            };
        }
        const progress = await this.lessonsRepository.createUserProgress(userId, lessonId);
        return {
            success: true,
            lessonId,
            progress: this.formatProgress(progress),
        };
    }
    async completeLesson(lessonId, userId, dto) {
        const lesson = await this.lessonsRepository.findById(lessonId);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        const existingProgress = await this.lessonsRepository.getUserProgress(userId, lessonId);
        if (!existingProgress || existingProgress.status === client_1.ProgressStatus.NOT_STARTED) {
            throw new common_1.BadRequestException('Lesson must be started before completing');
        }
        if (existingProgress.status === client_1.ProgressStatus.COMPLETED) {
            return {
                success: true,
                lessonId,
                xpEarned: existingProgress.xpEarned,
                xpMultiplier: XP_MULTIPLIERS[lesson.difficulty],
                baseXp: lesson.xpReward,
                levelUnlocked: false,
                progress: this.formatProgress(existingProgress),
            };
        }
        const multiplier = XP_MULTIPLIERS[lesson.difficulty] || 1;
        const xpEarned = lesson.xpReward * multiplier;
        const progress = await this.lessonsRepository.upsertUserProgress(userId, lessonId, {
            status: client_1.ProgressStatus.COMPLETED,
            score: dto.score,
            xpEarned,
            timeSpent: dto.timeSpentSeconds,
            completedAt: new Date(),
        });
        let levelUnlocked = false;
        let nextLevelId;
        const hasCompletedBefore = await this.lessonsRepository.hasCompletedAnyLessonInLevel(userId, lesson.levelId);
        const nextLevel = await this.lessonsRepository.getNextLevel(lesson.levelId);
        if (nextLevel) {
            await this.lessonsRepository.unlockLevel(userId, nextLevel.id);
            levelUnlocked = true;
            nextLevelId = nextLevel.id;
        }
        await this.lessonsRepository.updateCourseProgress(userId, lesson.level.courseId, {
            totalXpEarned: xpEarned,
            timeSpentSeconds: dto.timeSpentSeconds,
        });
        let gamification;
        try {
            gamification = await this.gamificationService.onLessonComplete(userId, lessonId, xpEarned, lesson.difficulty, lesson.title);
        }
        catch (error) {
            this.logger.error(`Gamification update failed for user ${userId}: ${error}`);
        }
        return {
            success: true,
            lessonId,
            xpEarned,
            xpMultiplier: multiplier,
            baseXp: lesson.xpReward,
            levelUnlocked,
            nextLevelId,
            progress: this.formatProgress(progress),
            gamification: gamification
                ? {
                    levelUp: gamification.xp.levelUp,
                    newLevel: gamification.xp.newLevel,
                    newTotalXp: gamification.xp.newTotal,
                    rankTitle: gamification.xp.rankTitle,
                    streakUpdated: gamification.streak.streakUpdated,
                    currentStreak: gamification.streak.newStreak,
                    streakMilestone: gamification.streak.milestoneReached,
                    newAchievements: gamification.newAchievements.map((a) => ({
                        slug: a.slug,
                        title: a.title,
                        xpReward: a.xpReward,
                    })),
                }
                : undefined,
        };
    }
    async getQuizzes(lessonId) {
        const lesson = await this.lessonsRepository.findById(lessonId);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        const quizzes = await this.lessonsRepository.findQuizzesByLessonId(lessonId);
        const sanitizedQuizzes = quizzes.map((quiz) => ({
            id: quiz.id,
            type: quiz.type,
            question: quiz.question,
            options: quiz.options,
            explanation: quiz.explanation,
            orderIndex: quiz.orderIndex,
        }));
        return {
            lessonId,
            quizzes: sanitizedQuizzes,
            totalCount: quizzes.length,
        };
    }
    async getChallenges(lessonId) {
        const lesson = await this.lessonsRepository.findById(lessonId);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        const challenges = await this.lessonsRepository.findChallengesByLessonId(lessonId);
        const sanitizedChallenges = challenges.map((challenge) => ({
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            starterCode: challenge.starterCode,
            languageId: challenge.languageId,
        }));
        return {
            lessonId,
            challenges: sanitizedChallenges,
            totalCount: challenges.length,
        };
    }
    async getHints(lessonId, userId, challengeId) {
        const lesson = await this.lessonsRepository.findById(lessonId);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        const challenge = await this.lessonsRepository.getChallengeById(challengeId);
        if (!challenge || challenge.lessonId !== lessonId) {
            throw new common_1.NotFoundException('Challenge not found in this lesson');
        }
        const hints = challenge.hints || [];
        const { unlockedCount } = await this.lessonsRepository.getUserHintUnlocks(userId, challengeId);
        const formattedHints = hints.map((hint, index) => ({
            index,
            content: index < unlockedCount ? hint : undefined,
            isUnlocked: index < unlockedCount,
        }));
        return {
            lessonId,
            challengeId,
            hints: formattedHints,
            totalHints: hints.length,
            unlockedCount,
        };
    }
    async unlockHint(lessonId, userId, dto) {
        const lesson = await this.lessonsRepository.findById(lessonId);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        const challenge = await this.lessonsRepository.getChallengeById(dto.challengeId);
        if (!challenge || challenge.lessonId !== lessonId) {
            throw new common_1.NotFoundException('Challenge not found in this lesson');
        }
        const hints = challenge.hints || [];
        const { unlockedCount } = await this.lessonsRepository.getUserHintUnlocks(userId, dto.challengeId);
        if (unlockedCount >= hints.length) {
            throw new common_1.BadRequestException('All hints are already unlocked');
        }
        const newUnlockedCount = unlockedCount + 1;
        const unlockedHint = {
            index: unlockedCount,
            content: hints[unlockedCount],
            isUnlocked: true,
        };
        return {
            success: true,
            hint: unlockedHint,
            unlockedCount: newUnlockedCount,
            totalHints: hints.length,
        };
    }
    formatLessonDetail(lesson, progress) {
        return {
            id: lesson.id,
            slug: lesson.slug,
            title: {
                en: lesson.title,
                fil: null,
            },
            content: lesson.content,
            difficulty: lesson.difficulty.toLowerCase(),
            xpReward: lesson.xpReward,
            orderIndex: lesson.orderIndex,
            level: {
                id: lesson.level.id,
                slug: lesson.level.slug,
                title: {
                    en: lesson.level.title,
                    fil: null,
                },
                courseId: lesson.level.courseId,
            },
            quizzes: lesson.quizzes?.map((quiz) => ({
                id: quiz.id,
                type: quiz.type,
                question: quiz.question,
                options: quiz.options,
                explanation: quiz.explanation,
                orderIndex: quiz.orderIndex,
            })),
            challenges: lesson.challenges?.map((challenge) => ({
                id: challenge.id,
                title: challenge.title,
                description: challenge.description,
                starterCode: challenge.starterCode,
                languageId: challenge.languageId,
            })),
            userProgress: progress ? this.formatProgress(progress) : null,
        };
    }
    formatProgress(progress) {
        return {
            status: progress.status,
            score: progress.score,
            xpEarned: progress.xpEarned,
            timeSpentSeconds: progress.timeSpent,
            completedAt: progress.completedAt,
        };
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = LessonsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lessons_repository_1.LessonsRepository,
        services_1.GamificationService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map