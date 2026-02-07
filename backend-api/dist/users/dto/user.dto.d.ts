export declare class UserProfileDto {
    id: string;
    email: string;
    username: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    locale: string;
    timezone?: string | null;
    xpTotal: number;
    level: number;
    streakCurrent: number;
    streakLongest: number;
    role: string;
    isVerified: boolean;
    onboardingCompleted: boolean;
    createdAt: string;
    lastActiveAt?: string | null;
}
export declare class PublicUserProfileDto {
    username: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    xpTotal?: number | null;
    level?: number | null;
    streakCurrent?: number | null;
    createdAt: string;
}
export declare class NotificationSettingsDto {
    emailEnabled: boolean;
    pushEnabled: boolean;
    streakReminders: boolean;
    achievementNotifs: boolean;
    socialNotifs: boolean;
}
export declare class PrivacySettingsDto {
    profileVisibility: string;
    showProgress: boolean;
    showActivity: boolean;
    allowMessages: string;
}
export declare class UserSettingsDto {
    theme: string;
    codeEditorTheme: string;
    fontSize: number;
    dailyGoalMins: number;
    difficultyPref: string;
    notifications: NotificationSettingsDto;
    privacy: PrivacySettingsDto;
}
export declare class UserStatsDto {
    xpTotal: number;
    level: number;
    streakCurrent: number;
    streakLongest: number;
    coursesStarted: number;
    coursesCompleted: number;
    lessonsCompleted: number;
    totalTimeSpentMinutes: number;
    achievementsEarned: number;
    badgesEarned: number;
}
export declare class PublicUserStatsDto {
    xpTotal?: number | null;
    level?: number | null;
    coursesCompleted?: number | null;
    achievementsEarned?: number | null;
}
