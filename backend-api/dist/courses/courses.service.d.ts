import { CoursesRepository } from './courses.repository';
export declare class CoursesService {
    private readonly coursesRepository;
    constructor(coursesRepository: CoursesRepository);
    findAll(options?: {
        language?: string;
        sort?: 'popular' | 'newest' | 'alphabetical';
        userId?: string;
    }): Promise<{
        id: any;
        slug: any;
        language: any;
        title: {
            en: any;
            fil: any;
        };
        description: {
            en: any;
            fil: any;
        };
        iconUrl: any;
        color: any;
        totalLevels: any;
        estimatedHours: any;
    }[]>;
    findBySlug(slug: string, userId?: string): Promise<{
        id: any;
        slug: any;
        language: any;
        title: {
            en: any;
            fil: any;
        };
        description: {
            en: any;
            fil: any;
        };
        iconUrl: any;
        color: any;
        totalLevels: any;
        levels: any;
        totalLessons: any;
        estimatedHours: any;
        isPublished: any;
    } | {
        userProgress: {
            completionPercentage: number;
            masteryPercentage: number;
            totalXpEarned: number;
            startedAt: Date;
            lastActivityAt: Date | null;
        } | null;
        id: any;
        slug: any;
        language: any;
        title: {
            en: any;
            fil: any;
        };
        description: {
            en: any;
            fil: any;
        };
        iconUrl: any;
        color: any;
        totalLevels: any;
        levels: any;
        totalLessons: any;
        estimatedHours: any;
        isPublished: any;
    }>;
    getProgress(slug: string, userId: string): Promise<{
        courseId: string;
        completionPercentage: number;
        masteryPercentage: number;
        levelsUnlocked: number;
        levelsCompleted: number;
        lessonsCompleted: number;
        totalXpEarned: number;
        timeSpentSeconds: number;
        lastActivity: Date | null;
        levelProgress: {
            levelId: any;
            isUnlocked: boolean;
            easyCompleted: boolean;
            mediumCompleted: boolean;
            hardCompleted: boolean;
        }[];
    }>;
    getLevels(slug: string, userId?: string): Promise<{
        id: any;
        slug: any;
        title: {
            en: any;
            fil: any;
        };
        description: {
            en: any;
            fil: any;
        };
        orderIndex: any;
        lessons: any;
    }[]>;
    startCourse(slug: string, userId: string): Promise<{
        success: boolean;
        courseProgress: {
            courseId: string;
            startedAt: Date;
            completionPercentage: number;
        };
    }>;
    private formatCourse;
    private formatCourseDetail;
    private formatLevel;
    private calculateCompletedLevels;
    private buildLevelProgress;
}
