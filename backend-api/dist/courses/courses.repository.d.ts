import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CoursesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(options?: {
        language?: string;
        isPublished?: boolean;
        orderBy?: 'popular' | 'newest' | 'alphabetical';
    }): Promise<({
        levels: {
            isPublished: boolean;
            id: string;
            slug: string;
            titleEn: string;
            titleFil: string | null;
            descriptionEn: string | null;
            descriptionFil: string | null;
            orderIndex: number;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
        }[];
        _count: {
            levels: number;
        };
    } & {
        language: string;
        isPublished: boolean;
        id: string;
        slug: string;
        titleEn: string;
        titleFil: string | null;
        descriptionEn: string;
        descriptionFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
        estimatedHours: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findBySlug(slug: string): Promise<({
        levels: ({
            lessons: {
                content: Prisma.JsonValue;
                isPublished: boolean;
                id: string;
                titleEn: string;
                titleFil: string | null;
                orderIndex: number;
                createdAt: Date;
                updatedAt: Date;
                difficulty: import(".prisma/client").$Enums.Difficulty;
                levelId: string;
                xpReward: number;
                timeLimitSeconds: number | null;
                estimatedTimeMinutes: number;
            }[];
        } & {
            isPublished: boolean;
            id: string;
            slug: string;
            titleEn: string;
            titleFil: string | null;
            descriptionEn: string | null;
            descriptionFil: string | null;
            orderIndex: number;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
        })[];
    } & {
        language: string;
        isPublished: boolean;
        id: string;
        slug: string;
        titleEn: string;
        titleFil: string | null;
        descriptionEn: string;
        descriptionFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
        estimatedHours: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    findById(id: string): Promise<{
        language: string;
        isPublished: boolean;
        id: string;
        slug: string;
        titleEn: string;
        titleFil: string | null;
        descriptionEn: string;
        descriptionFil: string | null;
        iconUrl: string | null;
        color: string | null;
        orderIndex: number;
        estimatedHours: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getLevels(courseId: string): Promise<({
        lessons: {
            content: Prisma.JsonValue;
            isPublished: boolean;
            id: string;
            titleEn: string;
            titleFil: string | null;
            orderIndex: number;
            createdAt: Date;
            updatedAt: Date;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            levelId: string;
            xpReward: number;
            timeLimitSeconds: number | null;
            estimatedTimeMinutes: number;
        }[];
    } & {
        isPublished: boolean;
        id: string;
        slug: string;
        titleEn: string;
        titleFil: string | null;
        descriptionEn: string | null;
        descriptionFil: string | null;
        orderIndex: number;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
    })[]>;
    getUserProgress(userId: string, courseId: string): Promise<{
        id: string;
        courseId: string;
        userId: string;
        completionPercentage: number;
        masteryPercentage: number;
        totalXpEarned: number;
        timeSpentSeconds: number;
        startedAt: Date;
        completedAt: Date | null;
        lastActivityAt: Date;
    } | null>;
    createUserProgress(userId: string, courseId: string): Promise<{
        id: string;
        courseId: string;
        userId: string;
        completionPercentage: number;
        masteryPercentage: number;
        totalXpEarned: number;
        timeSpentSeconds: number;
        startedAt: Date;
        completedAt: Date | null;
        lastActivityAt: Date;
    }>;
    updateUserProgress(userId: string, courseId: string, data: Prisma.UserCourseProgressUpdateInput): Promise<{
        id: string;
        courseId: string;
        userId: string;
        completionPercentage: number;
        masteryPercentage: number;
        totalXpEarned: number;
        timeSpentSeconds: number;
        startedAt: Date;
        completedAt: Date | null;
        lastActivityAt: Date;
    }>;
    unlockFirstLevel(userId: string, courseId: string): Promise<{
        id: string;
        userId: string;
        levelId: string;
        unlockedAt: Date;
    } | null>;
    getUserLevelUnlocks(userId: string, courseId: string): Promise<({
        level: {
            isPublished: boolean;
            id: string;
            slug: string;
            titleEn: string;
            titleFil: string | null;
            descriptionEn: string | null;
            descriptionFil: string | null;
            orderIndex: number;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
        };
    } & {
        id: string;
        userId: string;
        levelId: string;
        unlockedAt: Date;
    })[]>;
    getUserLessonProgress(userId: string, courseId: string): Promise<({
        lesson: {
            level: {
                isPublished: boolean;
                id: string;
                slug: string;
                titleEn: string;
                titleFil: string | null;
                descriptionEn: string | null;
                descriptionFil: string | null;
                orderIndex: number;
                createdAt: Date;
                updatedAt: Date;
                courseId: string;
            };
        } & {
            content: Prisma.JsonValue;
            isPublished: boolean;
            id: string;
            titleEn: string;
            titleFil: string | null;
            orderIndex: number;
            createdAt: Date;
            updatedAt: Date;
            difficulty: import(".prisma/client").$Enums.Difficulty;
            levelId: string;
            xpReward: number;
            timeLimitSeconds: number | null;
            estimatedTimeMinutes: number;
        };
    } & {
        status: import(".prisma/client").$Enums.LessonStatus;
        id: string;
        userId: string;
        timeSpentSeconds: number;
        startedAt: Date | null;
        completedAt: Date | null;
        lessonId: string;
        score: number | null;
        xpEarned: number;
    })[]>;
}
