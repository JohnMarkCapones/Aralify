import { UsersRepository } from './users.repository';
import { UpdateProfileDto, UpdateSettingsDto, CompleteOnboardingDto, OnboardingStatusDto } from './dto';
import { UserProfileDto, PublicUserProfileDto, UserSettingsDto, UserStatsDto, PublicUserStatsDto } from './dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getProfile(userId: string): Promise<UserProfileDto>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserProfileDto>;
    getPublicProfile(username: string, viewerId?: string): Promise<PublicUserProfileDto>;
    getSettings(userId: string): Promise<UserSettingsDto>;
    updateSettings(userId: string, dto: UpdateSettingsDto): Promise<UserSettingsDto>;
    getStats(userId: string): Promise<UserStatsDto>;
    getPublicStats(username: string, viewerId?: string): Promise<PublicUserStatsDto>;
    getOnboardingStatus(userId: string): Promise<OnboardingStatusDto>;
    completeOnboarding(userId: string, dto: CompleteOnboardingDto): Promise<{
        success: boolean;
        xpAwarded: number;
    }>;
    skipOnboarding(userId: string): Promise<{
        success: boolean;
    }>;
    private canViewProfile;
    private formatUserProfile;
    private formatPublicProfile;
    private formatUserSettings;
    private formatPublicStats;
}
