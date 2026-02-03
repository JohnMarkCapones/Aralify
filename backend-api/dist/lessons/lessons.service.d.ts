import { LessonsRepository } from './lessons.repository';
import { CompleteLessonDto, UnlockHintDto } from './dto';
import { GamificationService } from '../gamification/services';
export declare class LessonsService {
    private readonly lessonsRepository;
    private readonly gamificationService;
    private readonly logger;
    constructor(lessonsRepository: LessonsRepository, gamificationService: GamificationService);
    findById(id: string, userId?: string): Promise<{
        id: any;
        slug: any;
        title: {
            en: any;
            fil: null;
        };
        content: any;
        difficulty: any;
        xpReward: any;
        orderIndex: any;
        level: {
            id: any;
            slug: any;
            title: {
                en: any;
                fil: null;
            };
            courseId: any;
        };
        quizzes: any;
        challenges: any;
        userProgress: {
            status: any;
            score: any;
            xpEarned: any;
            timeSpentSeconds: any;
            completedAt: any;
        } | null;
    }>;
    startLesson(lessonId: string, userId: string): Promise<{
        success: boolean;
        lessonId: string;
        progress: {
            status: any;
            score: any;
            xpEarned: any;
            timeSpentSeconds: any;
            completedAt: any;
        };
    }>;
    completeLesson(lessonId: string, userId: string, dto: CompleteLessonDto): Promise<{
        success: boolean;
        lessonId: string;
        xpEarned: number;
        xpMultiplier: number;
        baseXp: number;
        levelUnlocked: boolean;
        progress: {
            status: any;
            score: any;
            xpEarned: any;
            timeSpentSeconds: any;
            completedAt: any;
        };
        nextLevelId?: undefined;
        gamification?: undefined;
    } | {
        success: boolean;
        lessonId: string;
        xpEarned: number;
        xpMultiplier: number;
        baseXp: number;
        levelUnlocked: boolean;
        nextLevelId: string | undefined;
        progress: {
            status: any;
            score: any;
            xpEarned: any;
            timeSpentSeconds: any;
            completedAt: any;
        };
        gamification: {
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
        } | undefined;
    }>;
    getQuizzes(lessonId: string): Promise<{
        lessonId: string;
        quizzes: {
            id: string;
            type: import(".prisma/client").$Enums.QuizType;
            question: string;
            options: import("@prisma/client/runtime/library").JsonValue;
            explanation: string | null;
            orderIndex: number;
        }[];
        totalCount: number;
    }>;
    getChallenges(lessonId: string): Promise<{
        lessonId: string;
        challenges: {
            id: string;
            title: string;
            description: string;
            starterCode: string | null;
            languageId: number;
        }[];
        totalCount: number;
    }>;
    getHints(lessonId: string, userId: string, challengeId: string): Promise<{
        lessonId: string;
        challengeId: string;
        hints: {
            index: number;
            content: string | undefined;
            isUnlocked: boolean;
        }[];
        totalHints: number;
        unlockedCount: number;
    }>;
    unlockHint(lessonId: string, userId: string, dto: UnlockHintDto): Promise<{
        success: boolean;
        hint: {
            index: number;
            content: string;
            isUnlocked: boolean;
        };
        unlockedCount: number;
        totalHints: number;
    }>;
    private formatLessonDetail;
    private formatProgress;
}
