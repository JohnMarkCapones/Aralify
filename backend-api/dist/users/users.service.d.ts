import { UsersRepository } from './users.repository';
import { UpdateProfileDto, UpdateSettingsDto } from './dto';
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
    private canViewProfile;
    private formatUserProfile;
    private formatPublicProfile;
    private formatUserSettings;
    private formatPublicStats;
}
