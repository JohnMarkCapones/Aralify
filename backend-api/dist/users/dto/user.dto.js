"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityDto = exports.ChallengeHistoryItemDto = exports.UserCertificateDto = exports.UserDetailedStatsDto = exports.DifficultyBreakdownDto = exports.XpDataPointDto = exports.UserCourseDto = exports.PublicUserStatsDto = exports.UserStatsDto = exports.UserSettingsDto = exports.PrivacySettingsDto = exports.NotificationSettingsDto = exports.PublicUserProfileDto = exports.UserProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserProfileDto {
}
exports.UserProfileDto = UserProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'johndoe' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/avatar.jpg' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'I love coding!' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'en' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "locale", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Asia/Manila' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "xpTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "streakCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "streakLongest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USER', enum: ['USER', 'MODERATOR', 'ADMIN'] }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserProfileDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], UserProfileDto.prototype, "onboardingCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "lastActiveAt", void 0);
class PublicUserProfileDto {
}
exports.PublicUserProfileDto = PublicUserProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'johndoe' }),
    __metadata("design:type", String)
], PublicUserProfileDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe' }),
    __metadata("design:type", Object)
], PublicUserProfileDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/avatar.jpg' }),
    __metadata("design:type", Object)
], PublicUserProfileDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'I love coding!' }),
    __metadata("design:type", Object)
], PublicUserProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2500, description: 'Only visible if privacy allows' }),
    __metadata("design:type", Object)
], PublicUserProfileDto.prototype, "xpTotal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'Only visible if privacy allows' }),
    __metadata("design:type", Object)
], PublicUserProfileDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 7, description: 'Only visible if privacy allows' }),
    __metadata("design:type", Object)
], PublicUserProfileDto.prototype, "streakCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", String)
], PublicUserProfileDto.prototype, "createdAt", void 0);
class NotificationSettingsDto {
}
exports.NotificationSettingsDto = NotificationSettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], NotificationSettingsDto.prototype, "emailEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], NotificationSettingsDto.prototype, "pushEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], NotificationSettingsDto.prototype, "streakReminders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], NotificationSettingsDto.prototype, "achievementNotifs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], NotificationSettingsDto.prototype, "socialNotifs", void 0);
class PrivacySettingsDto {
}
exports.PrivacySettingsDto = PrivacySettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PUBLIC', enum: ['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE'] }),
    __metadata("design:type", String)
], PrivacySettingsDto.prototype, "profileVisibility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PrivacySettingsDto.prototype, "showProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PrivacySettingsDto.prototype, "showActivity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EVERYONE', enum: ['EVERYONE', 'FRIENDS_ONLY', 'NONE'] }),
    __metadata("design:type", String)
], PrivacySettingsDto.prototype, "allowMessages", void 0);
class UserSettingsDto {
}
exports.UserSettingsDto = UserSettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dark', enum: ['light', 'dark', 'auto'] }),
    __metadata("design:type", String)
], UserSettingsDto.prototype, "theme", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'vs-dark' }),
    __metadata("design:type", String)
], UserSettingsDto.prototype, "codeEditorTheme", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", Number)
], UserSettingsDto.prototype, "fontSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], UserSettingsDto.prototype, "dailyGoalMins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MEDIUM', enum: ['EASY', 'MEDIUM', 'HARD'] }),
    __metadata("design:type", String)
], UserSettingsDto.prototype, "difficultyPref", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: NotificationSettingsDto }),
    __metadata("design:type", NotificationSettingsDto)
], UserSettingsDto.prototype, "notifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PrivacySettingsDto }),
    __metadata("design:type", PrivacySettingsDto)
], UserSettingsDto.prototype, "privacy", void 0);
class UserStatsDto {
}
exports.UserStatsDto = UserStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "xpTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "streakCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "streakLongest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "coursesStarted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "coursesCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "lessonsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 300 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "totalTimeSpentMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "achievementsEarned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "badgesEarned", void 0);
class PublicUserStatsDto {
}
exports.PublicUserStatsDto = PublicUserStatsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2500, description: 'Only visible if privacy allows' }),
    __metadata("design:type", Object)
], PublicUserStatsDto.prototype, "xpTotal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'Only visible if privacy allows' }),
    __metadata("design:type", Object)
], PublicUserStatsDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Only visible if privacy allows' }),
    __metadata("design:type", Object)
], PublicUserStatsDto.prototype, "coursesCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'Only visible if privacy allows' }),
    __metadata("design:type", Object)
], PublicUserStatsDto.prototype, "achievementsEarned", void 0);
class UserCourseDto {
}
exports.UserCourseDto = UserCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], UserCourseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'python-basics' }),
    __metadata("design:type", String)
], UserCourseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Python Basics' }),
    __metadata("design:type", String)
], UserCourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Learn the fundamentals of Python' }),
    __metadata("design:type", Object)
], UserCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'python' }),
    __metadata("design:type", String)
], UserCourseDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/icon.png' }),
    __metadata("design:type", Object)
], UserCourseDto.prototype, "iconUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#3B82F6' }),
    __metadata("design:type", Object)
], UserCourseDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 65.5 }),
    __metadata("design:type", Number)
], UserCourseDto.prototype, "completionPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1200 }),
    __metadata("design:type", Number)
], UserCourseDto.prototype, "totalXpEarned", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", Object)
], UserCourseDto.prototype, "lastActivityAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", String)
], UserCourseDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-02-01T00:00:00.000Z' }),
    __metadata("design:type", Object)
], UserCourseDto.prototype, "completedAt", void 0);
class XpDataPointDto {
}
exports.XpDataPointDto = XpDataPointDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15' }),
    __metadata("design:type", String)
], XpDataPointDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150 }),
    __metadata("design:type", Number)
], XpDataPointDto.prototype, "xp", void 0);
class DifficultyBreakdownDto {
}
exports.DifficultyBreakdownDto = DifficultyBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], DifficultyBreakdownDto.prototype, "easy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], DifficultyBreakdownDto.prototype, "medium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], DifficultyBreakdownDto.prototype, "hard", void 0);
class UserDetailedStatsDto {
}
exports.UserDetailedStatsDto = UserDetailedStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [XpDataPointDto] }),
    __metadata("design:type", Array)
], UserDetailedStatsDto.prototype, "xpOverTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DifficultyBreakdownDto }),
    __metadata("design:type", DifficultyBreakdownDto)
], UserDetailedStatsDto.prototype, "difficultyBreakdown", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    __metadata("design:type", Number)
], UserDetailedStatsDto.prototype, "averageTimePerDayMins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500 }),
    __metadata("design:type", Number)
], UserDetailedStatsDto.prototype, "totalXp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], UserDetailedStatsDto.prototype, "lessonsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], UserDetailedStatsDto.prototype, "currentStreak", void 0);
class UserCertificateDto {
}
exports.UserCertificateDto = UserCertificateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], UserCertificateDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'python-basics' }),
    __metadata("design:type", String)
], UserCertificateDto.prototype, "courseSlug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Python Basics' }),
    __metadata("design:type", String)
], UserCertificateDto.prototype, "courseTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-02-01T00:00:00.000Z' }),
    __metadata("design:type", String)
], UserCertificateDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3500 }),
    __metadata("design:type", Number)
], UserCertificateDto.prototype, "totalXpEarned", void 0);
class ChallengeHistoryItemDto {
}
exports.ChallengeHistoryItemDto = ChallengeHistoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], ChallengeHistoryItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clxchallenge123' }),
    __metadata("design:type", String)
], ChallengeHistoryItemDto.prototype, "challengeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Two Sum' }),
    __metadata("design:type", String)
], ChallengeHistoryItemDto.prototype, "challengeTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PASSED', enum: ['SUBMITTED', 'PASSED', 'FAILED'] }),
    __metadata("design:type", String)
], ChallengeHistoryItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ChallengeHistoryItemDto.prototype, "attemptNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], ChallengeHistoryItemDto.prototype, "xpAwarded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", String)
], ChallengeHistoryItemDto.prototype, "createdAt", void 0);
class UserActivityDto {
}
exports.UserActivityDto = UserActivityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], UserActivityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LESSON_COMPLETED' }),
    __metadata("design:type", String)
], UserActivityDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], UserActivityDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", String)
], UserActivityDto.prototype, "createdAt", void 0);
//# sourceMappingURL=user.dto.js.map