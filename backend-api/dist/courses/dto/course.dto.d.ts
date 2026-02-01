export declare class I18nTextDto {
    en: string;
    fil?: string;
}
export declare class CourseListItemDto {
    id: string;
    slug: string;
    language: string;
    title: I18nTextDto;
    description: I18nTextDto;
    iconUrl?: string;
    color?: string;
    totalLevels: number;
    estimatedHours: number;
    userProgress?: {
        completionPercentage: number;
        startedAt: Date;
        lastActivityAt: Date;
    } | null;
}
export declare class LessonSummaryDto {
    id: string;
    difficulty: string;
    title: I18nTextDto;
    xpReward: number;
    estimatedTimeMinutes: number;
}
export declare class LevelDto {
    id: string;
    slug: string;
    title: I18nTextDto;
    description: I18nTextDto;
    orderIndex: number;
    lessons?: LessonSummaryDto[];
    isLocked?: boolean;
}
export declare class CourseDetailDto extends CourseListItemDto {
    levels: LevelDto[];
    totalLessons: number;
    isPublished: boolean;
}
export declare class LevelProgressDto {
    levelId: string;
    isUnlocked: boolean;
    easyCompleted: boolean;
    mediumCompleted: boolean;
    hardCompleted: boolean;
}
export declare class CourseProgressDto {
    courseId: string;
    completionPercentage: number;
    masteryPercentage: number;
    levelsUnlocked: number;
    levelsCompleted: number;
    lessonsCompleted: number;
    totalXpEarned: number;
    timeSpentSeconds: number;
    lastActivity?: Date | null;
    levelProgress: LevelProgressDto[];
}
export declare class CourseProgressResponseDto {
    courseId: string;
    startedAt: Date;
    completionPercentage: number;
}
export declare class StartCourseResponseDto {
    success: boolean;
    courseProgress: CourseProgressResponseDto;
}
export declare class GetCoursesQueryDto {
    language?: string;
    sort?: 'popular' | 'newest' | 'alphabetical';
}
export declare class GetLevelsQueryDto {
    difficulty?: 'easy' | 'medium' | 'hard';
}
