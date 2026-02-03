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
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        orderIndex: number;
        isPublished: boolean;
        titleEn: string | null;
        titleFil: string | null;
        language: string;
        iconUrl: string | null;
        color: string | null;
    })[]>;
    findBySlug(slug: string): Promise<({
        levels: ({
            lessons: {
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
            }[];
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            orderIndex: number;
            isPublished: boolean;
            courseId: string;
        })[];
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        orderIndex: number;
        isPublished: boolean;
        titleEn: string | null;
        titleFil: string | null;
        language: string;
        iconUrl: string | null;
        color: string | null;
    }) | null>;
    findById(id: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        orderIndex: number;
        isPublished: boolean;
        titleEn: string | null;
        titleFil: string | null;
        language: string;
        iconUrl: string | null;
        color: string | null;
    } | null>;
    getLevels(courseId: string): Promise<({
        lessons: {
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
        }[];
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        orderIndex: number;
        isPublished: boolean;
        courseId: string;
    })[]>;
    getUserProgress(userId: string, courseId: string): Promise<{
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
    getUserLevelUnlocks(userId: string, courseId: string): Promise<{
        id: string;
        userId: string;
        levelId: string;
        unlockedAt: Date;
    }[]>;
    getUserLessonProgress(userId: string, courseId: string): Promise<({
        lesson: {
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
    } & {
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
    })[]>;
    createUserProgress(userId: string, courseId: string): Promise<{
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
        completedAt: Date | null;
        timeSpentSeconds: number;
        completionPercentage: number;
        masteryPercentage: number;
        totalXpEarned: number;
        startedAt: Date;
        lastActivityAt: Date | null;
    }>;
    unlockFirstLevel(userId: string, courseId: string): Promise<{
        id: string;
        userId: string;
        levelId: string;
        unlockedAt: Date;
    } | null>;
}
