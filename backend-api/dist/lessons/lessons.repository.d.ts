import { PrismaService } from '../prisma/prisma.service';
import { ProgressStatus } from '@prisma/client';
export declare class LessonsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<({
        level: {
            id: string;
            title: string;
            slug: string;
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
            question: string;
            options: import("@prisma/client/runtime/library").JsonValue | null;
            correctAnswer: string;
            explanation: string | null;
        }[];
        challenges: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            lessonId: string;
            starterCode: string | null;
            solutionCode: string | null;
            testCases: import("@prisma/client/runtime/library").JsonValue;
            hints: import("@prisma/client/runtime/library").JsonValue | null;
            languageId: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue | null;
        title: string;
        isPublished: boolean;
        slug: string;
        orderIndex: number;
        levelId: string;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        xpReward: number;
    }) | null>;
    findByIdWithProgress(id: string, userId: string): Promise<{
        lesson: {
            level: {
                id: string;
                title: string;
                slug: string;
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
                question: string;
                options: import("@prisma/client/runtime/library").JsonValue | null;
                correctAnswer: string;
                explanation: string | null;
            }[];
            challenges: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                title: string;
                lessonId: string;
                starterCode: string | null;
                solutionCode: string | null;
                testCases: import("@prisma/client/runtime/library").JsonValue;
                hints: import("@prisma/client/runtime/library").JsonValue | null;
                languageId: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: import("@prisma/client/runtime/library").JsonValue | null;
            title: string;
            isPublished: boolean;
            slug: string;
            orderIndex: number;
            levelId: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            xpReward: number;
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
        question: string;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        correctAnswer: string;
        explanation: string | null;
    }[]>;
    findChallengesByLessonId(lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        lessonId: string;
        starterCode: string | null;
        solutionCode: string | null;
        testCases: import("@prisma/client/runtime/library").JsonValue;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
        languageId: number;
    }[]>;
    getChallengeById(challengeId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        lessonId: string;
        starterCode: string | null;
        solutionCode: string | null;
        testCases: import("@prisma/client/runtime/library").JsonValue;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
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
        title: string;
        isPublished: boolean;
        slug: string;
        orderIndex: number;
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
    getUserHintUnlocks(userId: string, challengeId: string): Promise<{
        unlockedCount: number;
    }>;
}
