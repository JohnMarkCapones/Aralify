import { PrismaService } from '../prisma/prisma.service';
import { ProgressStatus } from '@prisma/client';
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
            question: string;
            options: import("@prisma/client/runtime/library").JsonValue | null;
            correctAnswer: string;
            explanation: string | null;
        }[];
        challenges: {
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            starterCode: string | null;
            solutionCode: string | null;
            testCases: import("@prisma/client/runtime/library").JsonValue;
            hints: import("@prisma/client/runtime/library").JsonValue | null;
            languageId: number;
        }[];
    } & {
        content: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        levelId: string;
        slug: string;
        title: string;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        xpReward: number;
        orderIndex: number;
        isPublished: boolean;
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
                question: string;
                options: import("@prisma/client/runtime/library").JsonValue | null;
                correctAnswer: string;
                explanation: string | null;
            }[];
            challenges: {
                description: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                lessonId: string;
                starterCode: string | null;
                solutionCode: string | null;
                testCases: import("@prisma/client/runtime/library").JsonValue;
                hints: import("@prisma/client/runtime/library").JsonValue | null;
                languageId: number;
            }[];
        } & {
            content: import("@prisma/client/runtime/library").JsonValue | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            levelId: string;
            slug: string;
            title: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            xpReward: number;
            orderIndex: number;
            isPublished: boolean;
        };
        progress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.ProgressStatus;
            lessonId: string;
            score: number | null;
            xpEarned: number;
            timeSpent: number | null;
            completedAt: Date | null;
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
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        lessonId: string;
        starterCode: string | null;
        solutionCode: string | null;
        testCases: import("@prisma/client/runtime/library").JsonValue;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
        languageId: number;
    }[]>;
    getChallengeById(challengeId: string): Promise<{
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        lessonId: string;
        starterCode: string | null;
        solutionCode: string | null;
        testCases: import("@prisma/client/runtime/library").JsonValue;
        hints: import("@prisma/client/runtime/library").JsonValue | null;
        languageId: number;
    } | null>;
    getUserProgress(userId: string, lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.ProgressStatus;
        lessonId: string;
        score: number | null;
        xpEarned: number;
        timeSpent: number | null;
        completedAt: Date | null;
    } | null>;
    createUserProgress(userId: string, lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.ProgressStatus;
        lessonId: string;
        score: number | null;
        xpEarned: number;
        timeSpent: number | null;
        completedAt: Date | null;
    }>;
    upsertUserProgress(userId: string, lessonId: string, data: {
        status?: ProgressStatus;
        score?: number;
        xpEarned?: number;
        timeSpent?: number;
        completedAt?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.ProgressStatus;
        lessonId: string;
        score: number | null;
        xpEarned: number;
        timeSpent: number | null;
        completedAt: Date | null;
    }>;
    isLevelUnlocked(userId: string, levelId: string): Promise<boolean>;
    getNextLevel(currentLevelId: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        orderIndex: number;
        isPublished: boolean;
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
        completedAt: Date | null;
        timeSpentSeconds: number;
        completionPercentage: number;
        masteryPercentage: number;
        totalXpEarned: number;
        startedAt: Date;
        lastActivityAt: Date | null;
    } | null>;
    getUserHintUnlocks(userId: string, challengeId: string): Promise<{
        unlockedCount: number;
    }>;
}
