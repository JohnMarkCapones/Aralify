import { XpSource, ActivityType } from '@prisma/client';
import { GamificationRepository } from './gamification.repository';
import { XpAwardResultDto, AchievementUnlockDto, StreakInfoDto, DailyClaimResponseDto, GamificationResultDto } from './dto';
export declare class GamificationService {
    private readonly gamificationRepo;
    private readonly logger;
    constructor(gamificationRepo: GamificationRepository);
    awardXp(userId: string, amount: number, source: XpSource, sourceId?: string, description?: string): Promise<XpAwardResultDto>;
    evaluateAchievements(userId: string): Promise<AchievementUnlockDto[]>;
    updateStreak(userId: string): Promise<StreakInfoDto>;
    createActivity(userId: string, type: ActivityType, data?: any): Promise<void>;
    processLessonCompletion(userId: string, lessonId: string, xpAmount: number): Promise<GamificationResultDto>;
    claimDailyBonus(userId: string): Promise<DailyClaimResponseDto>;
    getStreakInfo(userId: string): Promise<StreakInfoDto>;
    private buildStreakInfo;
}
