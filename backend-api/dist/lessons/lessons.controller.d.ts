import { User } from '@prisma/client';
import { LessonsService } from './lessons.service';
import { LessonDetailDto, StartLessonResponseDto, CompleteLessonResponseDto, LessonQuizzesResponseDto, LessonChallengesResponseDto, LessonHintsResponseDto, UnlockHintResponseDto, CompleteLessonDto, UnlockHintDto } from './dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    findById(id: string, user?: User): Promise<LessonDetailDto>;
    startLesson(id: string, user: User): Promise<StartLessonResponseDto>;
    completeLesson(id: string, user: User, dto: CompleteLessonDto): Promise<CompleteLessonResponseDto>;
    getQuizzes(id: string): Promise<LessonQuizzesResponseDto>;
    getChallenges(id: string): Promise<LessonChallengesResponseDto>;
    getHints(id: string, challengeId: string, user: User): Promise<LessonHintsResponseDto>;
    unlockHint(id: string, user: User, dto: UnlockHintDto): Promise<UnlockHintResponseDto>;
}
