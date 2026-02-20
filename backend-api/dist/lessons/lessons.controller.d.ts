import { User } from '@prisma/client';
import { LessonsService } from './lessons.service';
import { LessonDetailDto, StartLessonResponseDto, CompleteLessonResponseDto, LessonQuizzesResponseDto, LessonChallengesResponseDto, LessonHintsResponseDto, UnlockHintResponseDto, SubmitQuizAnswerResponseDto, CompleteLessonDto, SubmitQuizAnswerDto, UnlockHintDto, QuizResultsResponseDto, QuizHintsResponseDto, UnlockQuizHintResponseDto, UnlockQuizHintDto, SubmitChallengeDto, ChallengeSubmissionResponseDto } from './dto';
import { QuizService } from './services/quiz.service';
import { ChallengeService } from './services/challenge.service';
export declare class LessonsController {
    private readonly lessonsService;
    private readonly quizService;
    private readonly challengeService;
    constructor(lessonsService: LessonsService, quizService: QuizService, challengeService: ChallengeService);
    findBySlug(slug: string, difficulty?: string, user?: User): Promise<{
        id: any;
        slug: any;
        title: any;
        content: {
            theoryCards: any;
            quizQuestions: any;
        };
        difficulty: any;
        xpReward: any;
        estimatedTimeMinutes: any;
        orderIndex: any;
        courseSlug: any;
        courseTitle: any;
        language: any;
        level: {
            id: any;
            slug: any;
            title: any;
        };
        quizzes: any;
        challenges: any;
        testCases: any;
        hints: string[];
        tiers: any;
        previousLesson: {
            id: string;
            slug: string;
            title: string;
        } | null;
        nextLesson: {
            id: string;
            slug: string;
            title: string;
        } | null;
        userProgress: {
            status: any;
            score: any;
            xpEarned: any;
            timeSpentSeconds: any;
            completedAt: any;
        } | null;
    }>;
    findById(id: string, user?: User): Promise<LessonDetailDto>;
    startLesson(id: string, user: User): Promise<StartLessonResponseDto>;
    completeLesson(id: string, user: User, dto: CompleteLessonDto): Promise<CompleteLessonResponseDto>;
    getQuizzes(id: string): Promise<LessonQuizzesResponseDto>;
    submitQuizBulk(id: string, user: User, body: {
        answers: Record<string, string>;
    }): Promise<{
        score: number;
        totalQuestions: number;
        correctAnswers: number;
        passed: boolean;
        xpAwarded: number;
        feedback: {
            questionId: string;
            correct: boolean;
            explanation?: string;
            xpEarned: number;
        }[];
    }>;
    submitQuizAnswer(id: string, quizId: string, user: User, dto: SubmitQuizAnswerDto): Promise<SubmitQuizAnswerResponseDto>;
    getQuizResults(id: string, user: User): Promise<QuizResultsResponseDto>;
    getQuizHints(id: string, quizId: string, user: User): Promise<QuizHintsResponseDto>;
    unlockQuizHint(id: string, quizId: string, user: User, dto: UnlockQuizHintDto): Promise<UnlockQuizHintResponseDto>;
    getChallenges(id: string): Promise<LessonChallengesResponseDto>;
    submitChallenge(id: string, challengeId: string, user: User, dto: SubmitChallengeDto): Promise<ChallengeSubmissionResponseDto>;
    getHints(id: string, challengeId: string, user: User): Promise<LessonHintsResponseDto>;
    unlockHint(id: string, user: User, dto: UnlockHintDto): Promise<UnlockHintResponseDto>;
}
