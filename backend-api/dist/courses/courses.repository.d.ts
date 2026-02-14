import { PrismaService } from '../prisma/prisma.service';
export declare class CoursesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(options?: {
        language?: string;
        isPublished?: boolean;
        orderBy?: 'popular' | 'newest' | 'alphabetical';
    }): Promise<({
        _count: {
            levels: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        language: string;
        isPublished: boolean;
        slug: string;
        title: string;
        titleEn: string | null;
        titleFil: string | null;
        descriptionEn: string | null;
        descriptionFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
        estimatedHours: number | null;
        deletedAt: Date | null;
    })[]>;
    findBySlug(slug: string): Promise<({
        levels: ({
            lessons: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: import("@prisma/client/runtime/library").JsonValue | null;
                isPublished: boolean;
                slug: string;
                title: string;
                titleEn: string | null;
                titleFil: string | null;
                orderIndex: number;
                deletedAt: Date | null;
                levelId: string;
                difficulty: import(".prisma/client").$Enums.Difficulty;
                xpReward: number;
                estimatedTimeMinutes: number | null;
                minQuizScore: number | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            isPublished: boolean;
            slug: string;
            title: string;
            titleEn: string | null;
            titleFil: string | null;
            descriptionEn: string | null;
            descriptionFil: string | null;
            orderIndex: number;
            deletedAt: Date | null;
            courseId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        language: string;
        isPublished: boolean;
        slug: string;
        title: string;
        titleEn: string | null;
        titleFil: string | null;
        descriptionEn: string | null;
        descriptionFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
        estimatedHours: number | null;
        deletedAt: Date | null;
    }) | null>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        language: string;
        isPublished: boolean;
        slug: string;
        title: string;
        titleEn: string | null;
        titleFil: string | null;
        descriptionEn: string | null;
        descriptionFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
        estimatedHours: number | null;
        deletedAt: Date | null;
    } | null>;
    getLevels(courseId: string): Promise<({
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: import("@prisma/client/runtime/library").JsonValue | null;
            isPublished: boolean;
            slug: string;
            title: string;
            titleEn: string | null;
            titleFil: string | null;
            orderIndex: number;
            deletedAt: Date | null;
            levelId: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            xpReward: number;
            estimatedTimeMinutes: number | null;
            minQuizScore: number | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isPublished: boolean;
        slug: string;
        title: string;
        titleEn: string | null;
        titleFil: string | null;
        descriptionEn: string | null;
        descriptionFil: string | null;
        orderIndex: number;
        deletedAt: Date | null;
        courseId: string;
    })[]>;
    getUserProgress(userId: string, courseId: string): Promise<{
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
    getUserLevelUnlocks(userId: string, courseId: string): Promise<{
        id: string;
        userId: string;
        levelId: string;
        unlockedAt: Date;
    }[]>;
    getUserLessonProgress(userId: string, courseId: string): Promise<({
        lesson: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: import("@prisma/client/runtime/library").JsonValue | null;
            isPublished: boolean;
            slug: string;
            title: string;
            titleEn: string | null;
            titleFil: string | null;
            orderIndex: number;
            deletedAt: Date | null;
            levelId: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            xpReward: number;
            estimatedTimeMinutes: number | null;
            minQuizScore: number | null;
        };
    } & {
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
    })[]>;
    createUserProgress(userId: string, courseId: string): Promise<{
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
    }>;
    updateUserProgress(userId: string, courseId: string, data: {
        completionPercentage?: number;
        masteryPercentage?: number;
        totalXpEarned?: number;
        timeSpentSeconds?: number;
        lastActivityAt?: Date;
        completedAt?: Date;
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
    }>;
    unlockFirstLevel(userId: string, courseId: string): Promise<{
        id: string;
        userId: string;
        levelId: string;
        unlockedAt: Date;
    } | null>;
}
