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
        title: string;
        language: string;
        isPublished: boolean;
        slug: string;
        titleEn: string | null;
        titleFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
    })[]>;
    findBySlug(slug: string): Promise<({
        levels: ({
            lessons: {
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
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            isPublished: boolean;
            slug: string;
            orderIndex: number;
            courseId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        language: string;
        isPublished: boolean;
        slug: string;
        titleEn: string | null;
        titleFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
    }) | null>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        language: string;
        isPublished: boolean;
        slug: string;
        titleEn: string | null;
        titleFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
    } | null>;
    getLevels(courseId: string): Promise<({
        lessons: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        isPublished: boolean;
        slug: string;
        orderIndex: number;
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
            title: string;
            isPublished: boolean;
            slug: string;
            orderIndex: number;
            levelId: string;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            xpReward: number;
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
