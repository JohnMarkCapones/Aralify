import { PrismaService } from '../prisma/prisma.service';
import { ProgressStatus, HintTargetType, QuizType, Difficulty } from '@prisma/client';
export declare class LessonsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<({
        level: {
            id: string;
            slug: string;
            title: string;
            orderIndex: number;
            courseId: string;
        };
        quizzes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.QuizType;
            orderIndex: number;
            lessonId: string;
            difficulty: import(".prisma/client").$Enums.Difficulty | null;
            question: string;
            options: import("@prisma/client/runtime/library").JsonValue | null;
            correctAnswer: string;
            explanation: string | null;
            hints: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        challenges: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            lessonId: string;
            hints: import("@prisma/client/runtime/library").JsonValue | null;
            starterCode: string | null;
            solutionCode: string | null;
            testCases: import("@prisma/client/runtime/library").JsonValue;
            languageId: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        slug: string;
        title: string;
        orderIndex: number;
        deletedAt: Date | null;
        levelId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        xpReward: number;
        minQuizScore: number | null;
    }) | null>;
    findByIdWithProgress(id: string, userId: string): Promise<{
        lesson: {
            level: {
                id: string;
                slug: string;
                title: string;
                orderIndex: number;
                courseId: string;
            };
            quizzes: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                type: import(".prisma/client").$Enums.QuizType;
                orderIndex: number;
                lessonId: string;
                difficulty: import(".prisma/client").$Enums.Difficulty | null;
                question: string;
                options: import("@prisma/client/runtime/library").JsonValue | null;
                correctAnswer: string;
                explanation: string | null;
                hints: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
            challenges: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                title: string;
                lessonId: string;
                hints: import("@prisma/client/runtime/library").JsonValue | null;
                starterCode: string | null;
                solutionCode: string | null;
                testCases: import("@prisma/client/runtime/library").JsonValue;
                languageId: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: import("@prisma/client/runtime/library").JsonValue | null;
            isPublished: boolean;
            slug: string;
            title: string;
            orderIndex: number;
            deletedAt: Date | null;
            levelId: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            xpReward: number;
            minQuizScore: number | null;
        };
        progress: {
            status: import(".prisma/client").$Enums.ProgressStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            completedAt: Date | null;
            lessonId: string;
            score: number | null;
            xpEarned: number;
            timeSpent: number | null;
        } | null;
    } | null>;
    findQuizzesByLessonId(lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.QuizType;
        orderIndex: number;
        lessonId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        question: string;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        correctAnswer: string;
        explanation: string | null;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    findChallengesByLessonId(lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        lessonId: string;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
        starterCode: string | null;
        solutionCode: string | null;
        testCases: import("@prisma/client/runtime/library").JsonValue;
        languageId: number;
    }[]>;
    getQuizById(quizId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.QuizType;
        orderIndex: number;
        lessonId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        question: string;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        correctAnswer: string;
        explanation: string | null;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
    } | null>;
    getChallengeById(challengeId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        lessonId: string;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
        starterCode: string | null;
        solutionCode: string | null;
        testCases: import("@prisma/client/runtime/library").JsonValue;
        languageId: number;
    } | null>;
    getUserProgress(userId: string, lessonId: string): Promise<{
        status: import(".prisma/client").$Enums.ProgressStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        completedAt: Date | null;
        lessonId: string;
        score: number | null;
        xpEarned: number;
        timeSpent: number | null;
    } | null>;
    createUserProgress(userId: string, lessonId: string): Promise<{
        status: import(".prisma/client").$Enums.ProgressStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        completedAt: Date | null;
        lessonId: string;
        score: number | null;
        xpEarned: number;
        timeSpent: number | null;
    }>;
    upsertUserProgress(userId: string, lessonId: string, data: {
        status?: ProgressStatus;
        score?: number;
        xpEarned?: number;
        timeSpent?: number;
        completedAt?: Date;
    }): Promise<{
        status: import(".prisma/client").$Enums.ProgressStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        completedAt: Date | null;
        lessonId: string;
        score: number | null;
        xpEarned: number;
        timeSpent: number | null;
    }>;
    isLevelUnlocked(userId: string, levelId: string): Promise<boolean>;
    getNextLevel(currentLevelId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isPublished: boolean;
        slug: string;
        title: string;
        orderIndex: number;
        deletedAt: Date | null;
        courseId: string;
    } | null>;
    unlockLevel(userId: string, levelId: string): Promise<{
        id: string;
        userId: string;
        levelId: string;
        unlockedAt: Date;
    }>;
    hasCompletedAnyLessonInLevel(userId: string, levelId: string): Promise<boolean>;
    updateCourseProgress(userId: string, courseId: string, data: {
        totalXpEarned?: number;
        timeSpentSeconds?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        courseId: string;
        completionPercentage: number;
        masteryPercentage: number;
        totalXpEarned: number;
        timeSpentSeconds: number;
        startedAt: Date;
        lastActivityAt: Date | null;
        completedAt: Date | null;
    } | null>;
    createQuizAnswer(data: {
        userId: string;
        quizId: string;
        answer: string;
        isCorrect: boolean;
        attemptNumber: number;
        xpAwarded: number;
        timeSpentSeconds?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        timeSpentSeconds: number | null;
        answer: string;
        isCorrect: boolean;
        attemptNumber: number;
        xpAwarded: number;
        quizId: string;
    }>;
    getQuizAttemptCount(userId: string, quizId: string): Promise<number>;
    hasCorrectAnswer(userId: string, quizId: string): Promise<boolean>;
    getQuizResultsForLesson(userId: string, lessonId: string): Promise<{
        quizzes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.QuizType;
            orderIndex: number;
            lessonId: string;
            difficulty: import(".prisma/client").$Enums.Difficulty | null;
            question: string;
            options: import("@prisma/client/runtime/library").JsonValue | null;
            correctAnswer: string;
            explanation: string | null;
            hints: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        answersByQuiz: Map<string, {
            id: string;
            createdAt: Date;
            userId: string;
            timeSpentSeconds: number | null;
            answer: string;
            isCorrect: boolean;
            attemptNumber: number;
            xpAwarded: number;
            quizId: string;
        }[]>;
    }>;
    getUserQuizScoreForLesson(userId: string, lessonId: string): Promise<{
        correct: number;
        total: number;
    }>;
    getHintUnlockCount(userId: string, targetType: HintTargetType, targetId: string): Promise<number>;
    getHintUnlocks(userId: string, targetType: HintTargetType, targetId: string): Promise<{
        id: string;
        userId: string;
        unlockedAt: Date;
        targetType: import(".prisma/client").$Enums.HintTargetType;
        targetId: string;
        hintIndex: number;
    }[]>;
    createHintUnlock(data: {
        userId: string;
        targetType: HintTargetType;
        targetId: string;
        hintIndex: number;
    }): Promise<{
        id: string;
        userId: string;
        unlockedAt: Date;
        targetType: import(".prisma/client").$Enums.HintTargetType;
        targetId: string;
        hintIndex: number;
    }>;
    hasHintUnlock(userId: string, targetType: HintTargetType, targetId: string, hintIndex: number): Promise<boolean>;
    createChallengeSubmission(data: {
        userId: string;
        challengeId: string;
        code: string;
        languageId: number;
        status: string;
        attemptNumber: number;
        xpAwarded?: number;
        timeSpentSeconds?: number;
        testResults?: any;
    }): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        userId: string;
        timeSpentSeconds: number | null;
        languageId: number;
        attemptNumber: number;
        xpAwarded: number;
        code: string;
        testResults: import("@prisma/client/runtime/library").JsonValue | null;
        challengeId: string;
    }>;
    getChallengeAttemptCount(userId: string, challengeId: string): Promise<number>;
    hasPassedChallenge(userId: string, challengeId: string): Promise<boolean>;
    createQuiz(lessonId: string, data: {
        type: QuizType;
        question: string;
        options?: any;
        correctAnswer: string;
        explanation?: string;
        hints?: string[];
        difficulty?: Difficulty;
        orderIndex?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.QuizType;
        orderIndex: number;
        lessonId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        question: string;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        correctAnswer: string;
        explanation: string | null;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateQuiz(quizId: string, data: {
        type?: QuizType;
        question?: string;
        options?: any;
        correctAnswer?: string;
        explanation?: string;
        hints?: string[];
        difficulty?: Difficulty;
        orderIndex?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.QuizType;
        orderIndex: number;
        lessonId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        question: string;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        correctAnswer: string;
        explanation: string | null;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    deleteQuiz(quizId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.QuizType;
        orderIndex: number;
        lessonId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        question: string;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        correctAnswer: string;
        explanation: string | null;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    bulkCreateQuizzes(lessonId: string, quizzes: Array<{
        type: QuizType;
        question: string;
        options?: any;
        correctAnswer: string;
        explanation?: string;
        hints?: string[];
        difficulty?: Difficulty;
        orderIndex?: number;
    }>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.QuizType;
        orderIndex: number;
        lessonId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        question: string;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        correctAnswer: string;
        explanation: string | null;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getLessonById(lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        slug: string;
        title: string;
        orderIndex: number;
        deletedAt: Date | null;
        levelId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        xpReward: number;
        minQuizScore: number | null;
    } | null>;
}
