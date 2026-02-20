import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { UserProfileDto, PublicUserProfileDto, UserSettingsDto, UserStatsDto, PublicUserStatsDto, UpdateProfileDto, UpdateSettingsDto, CompleteOnboardingDto, OnboardingStatusDto, UserCourseDto, UserDetailedStatsDto, UserCertificateDto, ChallengeHistoryItemDto, UserActivityDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: User): Promise<UserProfileDto>;
    updateProfile(user: User, dto: UpdateProfileDto): Promise<UserProfileDto>;
    getSettings(user: User): Promise<UserSettingsDto>;
    updateSettings(user: User, dto: UpdateSettingsDto): Promise<UserSettingsDto>;
    getStats(user: User): Promise<UserStatsDto>;
    getUserCourses(user: User): Promise<UserCourseDto[]>;
    getDetailedStats(user: User, range?: string): Promise<UserDetailedStatsDto>;
    getCertificates(user: User): Promise<UserCertificateDto[]>;
    getChallengeHistory(user: User, page?: number, limit?: number): Promise<{
        data: ChallengeHistoryItemDto[];
        total: number;
    }>;
    getUserActivities(user: User, type?: string, page?: number, limit?: number): Promise<{
        data: UserActivityDto[];
        total: number;
    }>;
    getOnboardingStatus(user: User): Promise<OnboardingStatusDto>;
    completeOnboarding(user: User, dto: CompleteOnboardingDto): Promise<{
        success: boolean;
        xpAwarded: number;
    }>;
    skipOnboarding(user: User): Promise<{
        success: boolean;
    }>;
    getPublicProfile(username: string, user?: User): Promise<PublicUserProfileDto>;
    getPublicStats(username: string, user?: User): Promise<PublicUserStatsDto>;
}
