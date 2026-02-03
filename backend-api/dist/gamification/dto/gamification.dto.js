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
exports.GamificationResultDto = exports.DailyClaimResponseDto = exports.StreakInfoDto = exports.AchievementUnlockDto = exports.XpAwardResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class XpAwardResultDto {
}
exports.XpAwardResultDto = XpAwardResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Amount of XP awarded' }),
    __metadata("design:type", Number)
], XpAwardResultDto.prototype, "xpAwarded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1200, description: 'New total XP' }),
    __metadata("design:type", Number)
], XpAwardResultDto.prototype, "newTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Current level after XP award' }),
    __metadata("design:type", Number)
], XpAwardResultDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Whether the user leveled up from this XP award',
    }),
    __metadata("design:type", Boolean)
], XpAwardResultDto.prototype, "leveledUp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 5,
        description: 'Previous level before this XP award (only if leveled up)',
    }),
    __metadata("design:type", Number)
], XpAwardResultDto.prototype, "previousLevel", void 0);
class AchievementUnlockDto {
}
exports.AchievementUnlockDto = AchievementUnlockDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], AchievementUnlockDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'first-lesson' }),
    __metadata("design:type", String)
], AchievementUnlockDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'First Steps' }),
    __metadata("design:type", String)
], AchievementUnlockDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete your first lesson' }),
    __metadata("design:type", String)
], AchievementUnlockDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/badge.png' }),
    __metadata("design:type", Object)
], AchievementUnlockDto.prototype, "iconUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Bonus XP earned from this achievement' }),
    __metadata("design:type", Number)
], AchievementUnlockDto.prototype, "xpReward", void 0);
class StreakInfoDto {
}
exports.StreakInfoDto = StreakInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, description: 'Current streak in days' }),
    __metadata("design:type", Number)
], StreakInfoDto.prototype, "currentStreak", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14, description: 'Longest streak ever achieved' }),
    __metadata("design:type", Number)
], StreakInfoDto.prototype, "longestStreak", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Number of streak freezes available' }),
    __metadata("design:type", Number)
], StreakInfoDto.prototype, "freezesAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2024-01-15T00:00:00.000Z',
        description: 'Date of last activity (streak entry)',
    }),
    __metadata("design:type", Object)
], StreakInfoDto.prototype, "lastActivityDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether the user has already logged activity today',
    }),
    __metadata("design:type", Boolean)
], StreakInfoDto.prototype, "todayCompleted", void 0);
class DailyClaimResponseDto {
}
exports.DailyClaimResponseDto = DailyClaimResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], DailyClaimResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Base XP from daily claim' }),
    __metadata("design:type", Number)
], DailyClaimResponseDto.prototype, "baseXp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Bonus XP from streak milestone' }),
    __metadata("design:type", Number)
], DailyClaimResponseDto.prototype, "streakBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60, description: 'Total XP earned from daily claim' }),
    __metadata("design:type", Number)
], DailyClaimResponseDto.prototype, "totalXp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StreakInfoDto }),
    __metadata("design:type", StreakInfoDto)
], DailyClaimResponseDto.prototype, "streak", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Whether a streak freeze was earned at this milestone',
    }),
    __metadata("design:type", Boolean)
], DailyClaimResponseDto.prototype, "freezeEarned", void 0);
class GamificationResultDto {
}
exports.GamificationResultDto = GamificationResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: XpAwardResultDto }),
    __metadata("design:type", XpAwardResultDto)
], GamificationResultDto.prototype, "xp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StreakInfoDto }),
    __metadata("design:type", StreakInfoDto)
], GamificationResultDto.prototype, "streak", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AchievementUnlockDto], description: 'Achievements unlocked from this action' }),
    __metadata("design:type", Array)
], GamificationResultDto.prototype, "achievementsUnlocked", void 0);
//# sourceMappingURL=gamification.dto.js.map