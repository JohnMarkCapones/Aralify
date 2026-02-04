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
exports.LevelSystemInfoDto = exports.XpSourceInfoDto = exports.RankInfoDto = exports.LevelThresholdDto = exports.MilestonesResponseDto = exports.NearAchievementDto = exports.StreakMilestoneInfoDto = exports.LevelMilestoneDto = exports.GamificationProfileDto = exports.ProfileBadgesDto = exports.ProfileAchievementsDto = exports.ProfileStreakDto = exports.BadgeDisplayResponseDto = exports.BadgesResponseDto = exports.BadgeDto = exports.AchievementsResponseDto = exports.AchievementSummaryDto = exports.AchievementDto = exports.ClaimDailyBonusResponseDto = exports.StreakInfoDto = exports.StreakMilestoneDto = exports.StreakHistoryItemDto = exports.DailyBonusInfoDto = exports.NextMilestoneDto = exports.XpHistoryResponseDto = exports.XpTransactionDto = exports.XpInfoDto = exports.LevelProgressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LevelProgressDto {
}
exports.LevelProgressDto = LevelProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3162, description: 'XP required for current level' }),
    __metadata("design:type", Number)
], LevelProgressDto.prototype, "currentLevelXp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4472, description: 'XP required for next level' }),
    __metadata("design:type", Number)
], LevelProgressDto.prototype, "nextLevelXp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, description: 'XP earned within current level' }),
    __metadata("design:type", Number)
], LevelProgressDto.prototype, "progressXp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 38.2, description: 'Progress percentage to next level' }),
    __metadata("design:type", Number)
], LevelProgressDto.prototype, "progressPercentage", void 0);
class XpInfoDto {
}
exports.XpInfoDto = XpInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3662, description: 'Total XP earned' }),
    __metadata("design:type", Number)
], XpInfoDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Current level' }),
    __metadata("design:type", Number)
], XpInfoDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Developer', description: 'Current rank title' }),
    __metadata("design:type", String)
], XpInfoDto.prototype, "rankTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LevelProgressDto }),
    __metadata("design:type", LevelProgressDto)
], XpInfoDto.prototype, "progress", void 0);
class XpTransactionDto {
}
exports.XpTransactionDto = XpTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], XpTransactionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'XP amount' }),
    __metadata("design:type", Number)
], XpTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LESSON_COMPLETE', enum: ['LESSON_COMPLETE', 'QUIZ_COMPLETE', 'CHALLENGE_COMPLETE', 'STREAK_BONUS', 'ACHIEVEMENT', 'DAILY_BONUS', 'EVENT'] }),
    __metadata("design:type", String)
], XpTransactionDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'clx1234567890', description: 'Source entity ID' }),
    __metadata("design:type", Object)
], XpTransactionDto.prototype, "sourceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Completed: Python Basics - Variables (medium)' }),
    __metadata("design:type", Object)
], XpTransactionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00.000Z' }),
    __metadata("design:type", Date)
], XpTransactionDto.prototype, "createdAt", void 0);
class XpHistoryResponseDto {
}
exports.XpHistoryResponseDto = XpHistoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [XpTransactionDto] }),
    __metadata("design:type", Array)
], XpHistoryResponseDto.prototype, "transactions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'Total number of transactions' }),
    __metadata("design:type", Number)
], XpHistoryResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], XpHistoryResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], XpHistoryResponseDto.prototype, "offset", void 0);
class NextMilestoneDto {
}
exports.NextMilestoneDto = NextMilestoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, description: 'Days required for milestone' }),
    __metadata("design:type", Number)
], NextMilestoneDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'XP bonus for milestone' }),
    __metadata("design:type", Number)
], NextMilestoneDto.prototype, "xpBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Monthly Master', description: 'Milestone name' }),
    __metadata("design:type", String)
], NextMilestoneDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, description: 'Days remaining to reach milestone' }),
    __metadata("design:type", Number)
], NextMilestoneDto.prototype, "daysRemaining", void 0);
class DailyBonusInfoDto {
}
exports.DailyBonusInfoDto = DailyBonusInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether daily bonus can be claimed' }),
    __metadata("design:type", Boolean)
], DailyBonusInfoDto.prototype, "canClaim", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'XP amount for daily bonus' }),
    __metadata("design:type", Number)
], DailyBonusInfoDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-14T10:30:00.000Z', description: 'Last claim timestamp' }),
    __metadata("design:type", Object)
], DailyBonusInfoDto.prototype, "lastClaimAt", void 0);
class StreakHistoryItemDto {
}
exports.StreakHistoryItemDto = StreakHistoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15' }),
    __metadata("design:type", Date)
], StreakHistoryItemDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], StreakHistoryItemDto.prototype, "completed", void 0);
class StreakMilestoneDto {
}
exports.StreakMilestoneDto = StreakMilestoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], StreakMilestoneDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], StreakMilestoneDto.prototype, "xpBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Week Warrior' }),
    __metadata("design:type", String)
], StreakMilestoneDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], StreakMilestoneDto.prototype, "achieved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], StreakMilestoneDto.prototype, "daysRemaining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], StreakMilestoneDto.prototype, "progress", void 0);
class StreakInfoDto {
}
exports.StreakInfoDto = StreakInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23, description: 'Current streak in days' }),
    __metadata("design:type", Number)
], StreakInfoDto.prototype, "currentStreak", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45, description: 'Longest streak ever' }),
    __metadata("design:type", Number)
], StreakInfoDto.prototype, "longestStreak", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Number of streak freezes available' }),
    __metadata("design:type", Number)
], StreakInfoDto.prototype, "freezesAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Maximum streak freezes that can be held' }),
    __metadata("design:type", Number)
], StreakInfoDto.prototype, "maxFreezes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether streak is currently active' }),
    __metadata("design:type", Boolean)
], StreakInfoDto.prototype, "isStreakActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Whether streak is at risk of breaking' }),
    __metadata("design:type", Boolean)
], StreakInfoDto.prototype, "streakAtRisk", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-15', description: 'Last activity date' }),
    __metadata("design:type", Object)
], StreakInfoDto.prototype, "lastActivityDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: NextMilestoneDto }),
    __metadata("design:type", Object)
], StreakInfoDto.prototype, "nextMilestone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StreakMilestoneDto] }),
    __metadata("design:type", Array)
], StreakInfoDto.prototype, "milestones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DailyBonusInfoDto }),
    __metadata("design:type", DailyBonusInfoDto)
], StreakInfoDto.prototype, "dailyBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StreakHistoryItemDto] }),
    __metadata("design:type", Array)
], StreakInfoDto.prototype, "recentHistory", void 0);
class ClaimDailyBonusResponseDto {
}
exports.ClaimDailyBonusResponseDto = ClaimDailyBonusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ClaimDailyBonusResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'XP earned from daily bonus' }),
    __metadata("design:type", Number)
], ClaimDailyBonusResponseDto.prototype, "xpEarned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Whether bonus was already claimed today' }),
    __metadata("design:type", Boolean)
], ClaimDailyBonusResponseDto.prototype, "alreadyClaimed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23 }),
    __metadata("design:type", Number)
], ClaimDailyBonusResponseDto.prototype, "currentStreak", void 0);
class AchievementDto {
}
exports.AchievementDto = AchievementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], AchievementDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'first-lesson' }),
    __metadata("design:type", String)
], AchievementDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'First Steps' }),
    __metadata("design:type", String)
], AchievementDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete your first lesson' }),
    __metadata("design:type", String)
], AchievementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/icon.png' }),
    __metadata("design:type", Object)
], AchievementDto.prototype, "iconUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], AchievementDto.prototype, "xpReward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'completion' }),
    __metadata("design:type", String)
], AchievementDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], AchievementDto.prototype, "isSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AchievementDto.prototype, "isUnlocked", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-15T10:30:00.000Z' }),
    __metadata("design:type", Object)
], AchievementDto.prototype, "unlockedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Progress percentage (0-100)' }),
    __metadata("design:type", Number)
], AchievementDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Current progress value' }),
    __metadata("design:type", Number)
], AchievementDto.prototype, "currentValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Target value for completion' }),
    __metadata("design:type", Number)
], AchievementDto.prototype, "targetValue", void 0);
class AchievementSummaryDto {
}
exports.AchievementSummaryDto = AchievementSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, description: 'Total visible achievements' }),
    __metadata("design:type", Number)
], AchievementSummaryDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Unlocked achievements count' }),
    __metadata("design:type", Number)
], AchievementSummaryDto.prototype, "unlocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 33.3, description: 'Completion progress percentage' }),
    __metadata("design:type", Number)
], AchievementSummaryDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 250, description: 'Total XP earned from achievements' }),
    __metadata("design:type", Number)
], AchievementSummaryDto.prototype, "totalXpEarned", void 0);
class AchievementsResponseDto {
}
exports.AchievementsResponseDto = AchievementsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AchievementDto] }),
    __metadata("design:type", Array)
], AchievementsResponseDto.prototype, "achievements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Achievements grouped by category' }),
    __metadata("design:type", Object)
], AchievementsResponseDto.prototype, "byCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AchievementSummaryDto }),
    __metadata("design:type", AchievementSummaryDto)
], AchievementsResponseDto.prototype, "summary", void 0);
class BadgeDto {
}
exports.BadgeDto = BadgeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], BadgeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'python-master' }),
    __metadata("design:type", String)
], BadgeDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Python Master' }),
    __metadata("design:type", String)
], BadgeDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete all Python courses' }),
    __metadata("design:type", String)
], BadgeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/badge.png' }),
    __metadata("design:type", Object)
], BadgeDto.prototype, "iconUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'epic', enum: ['common', 'rare', 'epic', 'legendary'] }),
    __metadata("design:type", String)
], BadgeDto.prototype, "rarity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00.000Z' }),
    __metadata("design:type", Date)
], BadgeDto.prototype, "earnedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], BadgeDto.prototype, "isDisplayed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Object)
], BadgeDto.prototype, "displayOrder", void 0);
class BadgesResponseDto {
}
exports.BadgesResponseDto = BadgesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BadgeDto] }),
    __metadata("design:type", Array)
], BadgesResponseDto.prototype, "badges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Badges grouped by rarity' }),
    __metadata("design:type", Object)
], BadgesResponseDto.prototype, "byRarity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], BadgesResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], BadgesResponseDto.prototype, "displayedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], BadgesResponseDto.prototype, "maxDisplay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], BadgesResponseDto.prototype, "canDisplayMore", void 0);
class BadgeDisplayResponseDto {
}
exports.BadgeDisplayResponseDto = BadgeDisplayResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], BadgeDisplayResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BadgeDto }),
    __metadata("design:type", BadgeDto)
], BadgeDisplayResponseDto.prototype, "badge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    __metadata("design:type", Number)
], BadgeDisplayResponseDto.prototype, "displayedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], BadgeDisplayResponseDto.prototype, "maxDisplay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Badge is already displayed' }),
    __metadata("design:type", String)
], BadgeDisplayResponseDto.prototype, "message", void 0);
class ProfileStreakDto {
}
exports.ProfileStreakDto = ProfileStreakDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23 }),
    __metadata("design:type", Number)
], ProfileStreakDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    __metadata("design:type", Number)
], ProfileStreakDto.prototype, "longest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Streak freezes available' }),
    __metadata("design:type", Number)
], ProfileStreakDto.prototype, "freezesAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Max freezes that can be held' }),
    __metadata("design:type", Number)
], ProfileStreakDto.prototype, "maxFreezes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ProfileStreakDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], ProfileStreakDto.prototype, "atRisk", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-15' }),
    __metadata("design:type", Object)
], ProfileStreakDto.prototype, "lastActivityDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: NextMilestoneDto }),
    __metadata("design:type", Object)
], ProfileStreakDto.prototype, "nextMilestone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DailyBonusInfoDto }),
    __metadata("design:type", DailyBonusInfoDto)
], ProfileStreakDto.prototype, "dailyBonus", void 0);
class ProfileAchievementsDto {
}
exports.ProfileAchievementsDto = ProfileAchievementsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], ProfileAchievementsDto.prototype, "unlocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], ProfileAchievementsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 33.3 }),
    __metadata("design:type", Number)
], ProfileAchievementsDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 250 }),
    __metadata("design:type", Number)
], ProfileAchievementsDto.prototype, "totalXpEarned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AchievementDto], description: 'Recent unlocked achievements' }),
    __metadata("design:type", Array)
], ProfileAchievementsDto.prototype, "recent", void 0);
class ProfileBadgesDto {
}
exports.ProfileBadgesDto = ProfileBadgesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], ProfileBadgesDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BadgeDto], description: 'Displayed badges on profile' }),
    __metadata("design:type", Array)
], ProfileBadgesDto.prototype, "displayed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], ProfileBadgesDto.prototype, "maxDisplay", void 0);
class GamificationProfileDto {
}
exports.GamificationProfileDto = GamificationProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User basic info' }),
    __metadata("design:type", Object)
], GamificationProfileDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: XpInfoDto }),
    __metadata("design:type", XpInfoDto)
], GamificationProfileDto.prototype, "xp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProfileStreakDto }),
    __metadata("design:type", ProfileStreakDto)
], GamificationProfileDto.prototype, "streak", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProfileAchievementsDto }),
    __metadata("design:type", ProfileAchievementsDto)
], GamificationProfileDto.prototype, "achievements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProfileBadgesDto }),
    __metadata("design:type", ProfileBadgesDto)
], GamificationProfileDto.prototype, "badges", void 0);
class LevelMilestoneDto {
}
exports.LevelMilestoneDto = LevelMilestoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], LevelMilestoneDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 11 }),
    __metadata("design:type", Number)
], LevelMilestoneDto.prototype, "next", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 810, description: 'XP needed to reach next level' }),
    __metadata("design:type", Number)
], LevelMilestoneDto.prototype, "xpToNextLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    __metadata("design:type", Number)
], LevelMilestoneDto.prototype, "xpProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 38.2 }),
    __metadata("design:type", Number)
], LevelMilestoneDto.prototype, "progressPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Developer' }),
    __metadata("design:type", String)
], LevelMilestoneDto.prototype, "nextRankTitle", void 0);
class StreakMilestoneInfoDto {
}
exports.StreakMilestoneInfoDto = StreakMilestoneInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23 }),
    __metadata("design:type", Number)
], StreakMilestoneInfoDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], StreakMilestoneInfoDto.prototype, "nextMilestoneDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Monthly Master' }),
    __metadata("design:type", String)
], StreakMilestoneInfoDto.prototype, "milestoneName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], StreakMilestoneInfoDto.prototype, "daysRemaining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], StreakMilestoneInfoDto.prototype, "xpReward", void 0);
class NearAchievementDto {
}
exports.NearAchievementDto = NearAchievementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], NearAchievementDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ten-lessons' }),
    __metadata("design:type", String)
], NearAchievementDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lesson Master' }),
    __metadata("design:type", String)
], NearAchievementDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete 10 lessons' }),
    __metadata("design:type", String)
], NearAchievementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80, description: 'Progress percentage' }),
    __metadata("design:type", Number)
], NearAchievementDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], NearAchievementDto.prototype, "currentValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], NearAchievementDto.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], NearAchievementDto.prototype, "xpReward", void 0);
class MilestonesResponseDto {
}
exports.MilestonesResponseDto = MilestonesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: LevelMilestoneDto }),
    __metadata("design:type", LevelMilestoneDto)
], MilestonesResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: StreakMilestoneInfoDto }),
    __metadata("design:type", Object)
], MilestonesResponseDto.prototype, "streak", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Achievements near completion' }),
    __metadata("design:type", Object)
], MilestonesResponseDto.prototype, "achievements", void 0);
class LevelThresholdDto {
}
exports.LevelThresholdDto = LevelThresholdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], LevelThresholdDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3162 }),
    __metadata("design:type", Number)
], LevelThresholdDto.prototype, "xpRequired", void 0);
class RankInfoDto {
}
exports.RankInfoDto = RankInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], RankInfoDto.prototype, "minLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Developer' }),
    __metadata("design:type", String)
], RankInfoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3162 }),
    __metadata("design:type", Number)
], RankInfoDto.prototype, "xpRequired", void 0);
class XpSourceInfoDto {
}
exports.XpSourceInfoDto = XpSourceInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LESSON_COMPLETE' }),
    __metadata("design:type", String)
], XpSourceInfoDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete a lesson' }),
    __metadata("design:type", String)
], XpSourceInfoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Base XP or "varies"' }),
    __metadata("design:type", Object)
], XpSourceInfoDto.prototype, "baseXp", void 0);
class LevelSystemInfoDto {
}
exports.LevelSystemInfoDto = LevelSystemInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Level formula details' }),
    __metadata("design:type", Object)
], LevelSystemInfoDto.prototype, "formula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LevelThresholdDto] }),
    __metadata("design:type", Array)
], LevelSystemInfoDto.prototype, "levels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RankInfoDto] }),
    __metadata("design:type", Array)
], LevelSystemInfoDto.prototype, "ranks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [XpSourceInfoDto] }),
    __metadata("design:type", Array)
], LevelSystemInfoDto.prototype, "xpSources", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'XP multipliers by difficulty' }),
    __metadata("design:type", Object)
], LevelSystemInfoDto.prototype, "difficultyMultipliers", void 0);
//# sourceMappingURL=gamification-response.dto.js.map