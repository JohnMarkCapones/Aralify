export declare class UpdateProfileDto {
    displayName?: string;
    bio?: string;
    locale?: string;
    timezone?: string;
}
export declare class UpdateSettingsDto {
    theme?: string;
    codeEditorTheme?: string;
    fontSize?: number;
    dailyGoalMins?: number;
    difficultyPref?: string;
    emailEnabled?: boolean;
    pushEnabled?: boolean;
    streakReminders?: boolean;
    achievementNotifs?: boolean;
    socialNotifs?: boolean;
    profileVisibility?: string;
    showProgress?: boolean;
    showActivity?: boolean;
    allowMessages?: string;
}
