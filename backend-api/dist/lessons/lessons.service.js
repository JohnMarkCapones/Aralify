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
const quiz_service_1 = require("./services/quiz.service");
const XP_MULTIPLIERS = {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
};
let LessonsService = LessonsService_1 = class LessonsService {
    constructor(lessonsRepository, gamificationService, quizService) {
        this.lessonsRepository = lessonsRepository;
        this.gamificationService = gamificationService;
        this.quizService = quizService;
        this.logger = new common_1.Logger(LessonsService_1.name);
    }
    async findById(id, userId) {
        if (userId) {
            const result = await this.lessonsRepository.findByIdWithProgress(id, userId);
            if (!result?.lesson || !result.lesson.isPublished) {
                throw new common_1.NotFoundException('Lesson not found');
            }
            return this.formatLessonDetailFull(result.lesson, result.progress);
        }
        const lesson = await this.lessonsRepository.findById(id);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return this.formatLessonDetailFull(lesson, null);
    }
    async findBySlug(slug, difficulty, userId) {
        const diffEnum = difficulty?.toUpperCase();
        const lesson = await this.lessonsRepository.findBySlug(slug, diffEnum);
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        let progress = null;
        if (userId) {
            progress = await this.lessonsRepository.getUserProgress(userId, lesson.id);
        }
        return this.formatLessonDetailFull(lesson, progress);
    }
    async submitQuizBulk(lessonId, userId, answers) {
        const lesson = await this.lessonsRepository.findById(lessonId);
        if (!lesson || !lesson.isPublished) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        const results = [];
        let totalCorrect = 0;
        let totalXp = 0;
        for (const [quizId, answer] of Object.entries(answers)) {
            try {
                const result = await this.quizService.submitQuizAnswer(lessonId, quizId, userId, answer);
                results.push({
                    questionId: quizId,
                    correct: result.correct,
                    explanation: result.explanation ?? undefined,
                    xpEarned: result.xpAwarded,
                });
                if (result.correct)
                    totalCorrect++;
                totalXp += result.xpAwarded;
            }
            catch {
                results.push({
                    questionId: quizId,
                    correct: false,
                    explanation: 'Failed to submit answer',
                    xpEarned: 0,
                });
            }
        }
        const totalQuestions = Object.keys(answers).length;
        const score = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        return {
            score,
            totalQuestions,
            correctAnswers: totalCorrect,
            passed: score >= (lesson.minQuizScore ?? 70),
            xpAwarded: totalXp,
            feedback: results,
        };
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
        if (lesson.minQuizScore !== null && lesson.minQuizScore !== undefined) {
            const { correct, total } = await this.lessonsRepository.getUserQuizScoreForLesson(userId, lessonId);
            if (total > 0) {
                const currentScore = Math.round((correct / total) * 100);
                if (currentScore < lesson.minQuizScore) {
                    throw new common_1.BadRequestException(`Quiz score too low. Current: ${currentScore}%, Required: ${lesson.minQuizScore}%`);
                }
            }
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
                    newBadges: gamification.newBadges,
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
    async submitQuizAnswer(lessonId, quizId, userId, dto) {
        const result = await this.quizService.submitQuizAnswer(lessonId, quizId, userId, dto.answer, dto.timeSpentSeconds);
        return {
            correct: result.correct,
            explanation: result.explanation,
            xpEarned: result.xpAwarded,
            attemptNumber: result.attemptNumber,
            alreadyCorrect: result.alreadyCorrect,
            firstAttemptBonus: result.firstAttemptBonus,
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
        const unlocks = await this.lessonsRepository.getHintUnlocks(userId, client_1.HintTargetType.CHALLENGE, challengeId);
        const unlockedIndices = new Set(unlocks.map((u) => u.hintIndex));
        unlockedIndices.add(0);
        const formattedHints = hints.map((hint, index) => ({
            index,
            content: unlockedIndices.has(index) ? hint : undefined,
            isUnlocked: unlockedIndices.has(index),
        }));
        return {
            lessonId,
            challengeId,
            hints: formattedHints,
            totalHints: hints.length,
            unlockedCount: Math.min(unlockedIndices.size, hints.length),
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
        const currentUnlockedCount = await this.lessonsRepository.getHintUnlockCount(userId, client_1.HintTargetType.CHALLENGE, dto.challengeId);
        const nextHintIndex = currentUnlockedCount + 1;
        if (nextHintIndex >= hints.length) {
            throw new common_1.BadRequestException('All hints are already unlocked');
        }
        const alreadyUnlocked = await this.lessonsRepository.hasHintUnlock(userId, client_1.HintTargetType.CHALLENGE, dto.challengeId, nextHintIndex);
        if (!alreadyUnlocked) {
            await this.lessonsRepository.createHintUnlock({
                userId,
                targetType: client_1.HintTargetType.CHALLENGE,
                targetId: dto.challengeId,
                hintIndex: nextHintIndex,
            });
        }
        const newUnlockedCount = currentUnlockedCount + 1 + 1;
        const unlockedHint = {
            index: nextHintIndex,
            content: hints[nextHintIndex],
            isUnlocked: true,
        };
        return {
            success: true,
            hint: unlockedHint,
            unlockedCount: Math.min(newUnlockedCount, hints.length),
            totalHints: hints.length,
        };
    }
    async formatLessonDetailFull(lesson, progress) {
        const siblings = await this.lessonsRepository.findSiblingLessons(lesson.levelId, lesson.orderIndex, lesson.difficulty);
        const content = lesson.content || {};
        const theoryCards = content.theoryCards || [];
        const quizQuestions = content.quizQuestions || [];
        const firstChallenge = lesson.challenges?.[0];
        const testCases = firstChallenge?.testCases || [];
        const hints = firstChallenge?.hints || [];
        const tiers = content.tiers || [
            { difficulty: 'easy', xpMultiplier: 1, starterCode: firstChallenge?.starterCode || '', description: 'Easy mode' },
            { difficulty: 'medium', xpMultiplier: 2, starterCode: firstChallenge?.starterCode || '', description: 'Medium mode' },
            { difficulty: 'hard', xpMultiplier: 3, starterCode: firstChallenge?.starterCode || '', description: 'Hard mode' },
        ];
        return {
            id: lesson.id,
            slug: lesson.slug,
            title: lesson.titleEn || lesson.title,
            content: {
                theoryCards,
                quizQuestions,
            },
            difficulty: lesson.difficulty.toLowerCase(),
            xpReward: lesson.xpReward,
            estimatedTimeMinutes: lesson.estimatedTimeMinutes,
            orderIndex: lesson.orderIndex,
            courseSlug: lesson.level?.course?.slug || '',
            courseTitle: lesson.level?.course?.titleEn || lesson.level?.course?.title || '',
            language: lesson.level?.course?.language || '',
            level: {
                id: lesson.level.id,
                slug: lesson.level.slug,
                title: lesson.level.titleEn || lesson.level.title,
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
            testCases,
            hints,
            tiers,
            previousLesson: siblings.previous,
            nextLesson: siblings.next,
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
        services_1.GamificationService,
        quiz_service_1.QuizService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map