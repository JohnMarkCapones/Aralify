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
export declare class UserCourseDto {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    language: string;
    iconUrl?: string | null;
    color?: string | null;
    completionPercentage: number;
    totalXpEarned: number;
    lastActivityAt?: string | null;
    startedAt: string;
    completedAt?: string | null;
}
export declare class XpDataPointDto {
    date: string;
    xp: number;
}
export declare class DifficultyBreakdownDto {
    easy: number;
    medium: number;
    hard: number;
}
export declare class TimeSpentDataPointDto {
    date: string;
    minutes: number;
}
export declare class ActivityHeatmapPointDto {
    day: string;
    hour: number;
    value: number;
}
export declare class UserDetailedStatsDto {
    xpOverTime: XpDataPointDto[];
    difficultyBreakdown: DifficultyBreakdownDto;
    averageTimePerDayMins: number;
    totalXp: number;
    lessonsCompleted: number;
    currentStreak: number;
    timeSpentByDay: TimeSpentDataPointDto[];
    activityHeatmap: ActivityHeatmapPointDto[];
}
export declare class UserCertificateDto {
    id: string;
    courseId: string;
    courseSlug: string;
    courseTitle: string;
    completedAt: string;
    totalXpEarned: number;
    grade: string;
    color?: string | null;
    downloadUrl: string;
}
export declare class ChallengeHistoryItemDto {
    id: string;
    challengeId: string;
    challengeTitle: string;
    status: string;
    attemptNumber: number;
    xpAwarded: number;
    createdAt: string;
}
export declare class UserActivityDto {
    id: string;
    type: string;
    data?: any;
    createdAt: string;
}
