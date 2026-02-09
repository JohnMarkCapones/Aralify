import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { UserProfileDto, PublicUserProfileDto, UserSettingsDto, UserStatsDto, PublicUserStatsDto, UpdateProfileDto, UpdateSettingsDto, CompleteOnboardingDto, OnboardingStatusDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: User): Promise<UserProfileDto>;
    updateProfile(user: User, dto: UpdateProfileDto): Promise<UserProfileDto>;
    getSettings(user: User): Promise<UserSettingsDto>;
    updateSettings(user: User, dto: UpdateSettingsDto): Promise<UserSettingsDto>;
    getStats(user: User): Promise<UserStatsDto>;
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
