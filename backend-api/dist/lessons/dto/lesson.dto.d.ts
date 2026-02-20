export declare class I18nTextDto {
    en: string;
    fil?: string | null;
}
export declare class QuizSummaryDto {
    id: string;
    type: string;
    question: string;
    options?: any;
    explanation?: string | null;
    orderIndex: number;
}
export declare class ChallengeSummaryDto {
    id: string;
    title: string;
    description: string;
    starterCode?: string | null;
    languageId: number;
}
export declare class HintDto {
    index: number;
    content?: string;
    isUnlocked: boolean;
}
export declare class UserLessonProgressDto {
    status: string;
    score?: number | null;
    xpEarned: number;
    timeSpentSeconds?: number | null;
    completedAt?: Date | null;
}
export declare class LessonDetailDto {
    id: string;
    slug: string;
    title: string;
    content?: any;
    difficulty: string;
    xpReward: number;
    estimatedTimeMinutes?: number | null;
    orderIndex: number;
    courseSlug: string;
    courseTitle: string;
    language: string;
    level: {
        id: string;
        slug: string;
        title: string;
    };
    quizzes?: QuizSummaryDto[];
    challenges?: ChallengeSummaryDto[];
    testCases?: any[];
    hints?: string[];
    tiers?: any[];
    previousLesson?: {
        id: string;
        slug: string;
        title: string;
    } | null;
    nextLesson?: {
        id: string;
        slug: string;
        title: string;
    } | null;
    userProgress?: UserLessonProgressDto | null;
}
export declare class StartLessonResponseDto {
    success: boolean;
    lessonId: string;
    progress: UserLessonProgressDto;
}
export declare class CompleteLessonResponseDto {
    success: boolean;
    lessonId: string;
    xpEarned: number;
    xpMultiplier: number;
    baseXp: number;
    levelUnlocked?: boolean;
    nextLevelId?: string;
    progress: UserLessonProgressDto;
    gamification?: {
        levelUp: boolean;
        newLevel: number;
        newTotalXp: number;
        rankTitle: string;
        streakUpdated: boolean;
        currentStreak: number;
        streakMilestone: {
            days: number;
            xpBonus: number;
            name: string;
        } | null;
        newAchievements: {
            slug: string;
            title: string;
            xpReward: number;
        }[];
    };
}
export declare class LessonQuizzesResponseDto {
    lessonId: string;
    quizzes: QuizSummaryDto[];
    totalCount: number;
}
export declare class LessonChallengesResponseDto {
    lessonId: string;
    challenges: ChallengeSummaryDto[];
    totalCount: number;
}
export declare class LessonHintsResponseDto {
    lessonId: string;
    challengeId: string;
    hints: HintDto[];
    totalHints: number;
    unlockedCount: number;
}
export declare class SubmitQuizAnswerResponseDto {
    correct: boolean;
    explanation?: string | null;
    xpEarned?: number;
}
export declare class UnlockHintResponseDto {
    success: boolean;
    hint: HintDto;
    unlockedCount: number;
    totalHints: number;
}
