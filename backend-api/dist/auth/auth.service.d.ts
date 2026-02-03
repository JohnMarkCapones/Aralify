import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtPayload } from './strategies/jwt.strategy';
import { UpdateProfileDto } from './dto';
export declare class AuthService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    validateUser(payload: JwtPayload): Promise<User | null>;
    private createUserFromSupabase;
    private generateUniqueUsername;
    private createDefaultSettings;
    getUserById(userId: string): Promise<User | null>;
    getUserWithSettings(userId: string): Promise<({
        settings: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            theme: string;
            codeEditorTheme: string;
            fontSize: number;
            dailyGoalMins: number;
            difficultyPref: import(".prisma/client").$Enums.Difficulty;
        } | null;
        notificationSettings: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            emailEnabled: boolean;
            pushEnabled: boolean;
            streakReminders: boolean;
            achievementNotifs: boolean;
            socialNotifs: boolean;
        } | null;
        privacySettings: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            profileVisibility: import(".prisma/client").$Enums.ProfileVisibility;
            showProgress: boolean;
            showActivity: boolean;
            allowMessages: import(".prisma/client").$Enums.AllowMessages;
        } | null;
    } & {
        id: string;
        email: string;
        username: string;
        passwordHash: string | null;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        locale: string | null;
        timezone: string | null;
        xpTotal: number;
        level: number;
        streakCurrent: number;
        streakLongest: number;
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
        lastActiveAt: Date | null;
    }) | null>;
    updateProfile(userId: string, data: UpdateProfileDto): Promise<User>;
    createSession(userId: string, data: {
        deviceInfo?: string;
        ipAddress?: string;
        deviceId?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        token: string;
        deviceInfo: string | null;
        ipAddress: string | null;
        expiresAt: Date;
    }>;
    getUserSessions(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        token: string;
        deviceInfo: string | null;
        ipAddress: string | null;
        expiresAt: Date;
    }[]>;
    revokeSession(userId: string, sessionId: string): Promise<void>;
    revokeAllSessions(userId: string): Promise<void>;
    private generateSessionToken;
    deleteAccount(userId: string): Promise<void>;
    linkOAuthAccount(userId: string, provider: string, providerId: string, tokens?: {
        accessToken?: string;
        refreshToken?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        provider: string;
        providerId: string;
        accessToken: string | null;
        refreshToken: string | null;
    }>;
    unlinkOAuthAccount(userId: string, provider: string): Promise<void>;
    getLinkedOAuthAccounts(userId: string): Promise<{
        createdAt: Date;
        provider: string;
        providerId: string;
    }[]>;
}
