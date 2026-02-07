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
exports.PublicUserStatsDto = exports.UserStatsDto = exports.UserSettingsDto = exports.PrivacySettingsDto = exports.NotificationSettingsDto = exports.PublicUserProfileDto = exports.UserProfileDto = void 0;
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
//# sourceMappingURL=user.dto.js.map