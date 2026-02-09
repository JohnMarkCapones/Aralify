export declare class AuthStatusDto {
    status: string;
    message: string;
    timestamp: string;
}
export declare class AuthUserSettingsDto {
    theme: string;
    codeEditorTheme: string;
    fontSize: number;
    dailyGoalMins: number;
    difficultyPref: string;
}
export declare class AuthUserProfileDto {
    id: string;
    email: string;
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    bio?: string | null;
    locale: string;
    timezone: string;
    xpTotal: number;
    level: number;
    streakCurrent: number;
    streakLongest: number;
    role: string;
    isVerified: boolean;
    createdAt: string;
    settings?: AuthUserSettingsDto;
}
export declare class SessionInfoDto {
    sessionId: string;
    createdAt: string;
    expiresAt: string;
    deviceInfo?: string;
}
export declare class AuthUpdateProfileDto {
    username?: string;
    displayName?: string;
    avatarUrl?: string;
    bio?: string;
    locale?: string;
    timezone?: string;
}
export declare class RegisterSessionDto {
    deviceId?: string;
}
