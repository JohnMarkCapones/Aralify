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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../auth/decorators");
const services_1 = require("./services");
const dto_1 = require("./dto");
let GamificationController = class GamificationController {
    constructor(gamificationService, xpService, streaksService, achievementsService, badgesService) {
        this.gamificationService = gamificationService;
        this.xpService = xpService;
        this.streaksService = streaksService;
        this.achievementsService = achievementsService;
        this.badgesService = badgesService;
    }
    async getProfile(user) {
        return this.gamificationService.getProfile(user.id);
    }
    async getAchievements(user, query) {
        return this.achievementsService.getAchievements(user.id, {
            category: query.category,
            includeSecret: query.includeSecret,
        });
    }
    async getBadges(user, query) {
        return this.badgesService.getBadges(user.id, {
            displayedOnly: query.displayedOnly,
        });
    }
    async displayBadge(badgeId, user, dto) {
        return this.badgesService.setDisplayed(user.id, badgeId, dto.displayOrder);
    }
    async hideBadge(badgeId, user) {
        return this.badgesService.removeDisplay(user.id, badgeId);
    }
    async getStreakInfo(user) {
        return this.streaksService.getStreakInfo(user.id);
    }
    async claimDailyBonus(user) {
        return this.streaksService.claimDailyBonus(user.id);
    }
    async getXpHistory(user, query) {
        return this.xpService.getXpHistory(user.id, {
            limit: query.limit,
            offset: query.offset,
            source: query.source,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
        });
    }
    async getLevelSystemInfo() {
        return this.xpService.getLevelSystemInfo();
    }
    async getMilestones(user) {
        return this.gamificationService.getMilestones(user.id);
    }
};
exports.GamificationController = GamificationController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get full gamification profile for current user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns gamification profile with XP, streaks, achievements, and badges',
        type: dto_1.GamificationProfileDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('achievements'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all achievements with progress for current user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns achievements with progress and summary',
        type: dto_1.AchievementsResponseDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.GetAchievementsQueryDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getAchievements", null);
__decorate([
    (0, common_1.Get)('badges'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get user's earned badges" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns badges grouped by rarity',
        type: dto_1.BadgesResponseDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.GetBadgesQueryDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getBadges", null);
__decorate([
    (0, common_1.Post)('badges/:id/display'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Show badge on profile (max 5 displayed)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Badge ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Badge display status updated',
        type: dto_1.BadgeDisplayResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Maximum badges already displayed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Badge not found or not owned' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.SetBadgeDisplayDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "displayBadge", null);
__decorate([
    (0, common_1.Delete)('badges/:id/display'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hide badge from profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Badge ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Badge removed from display',
        type: dto_1.BadgeDisplayResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Badge not found or not owned' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "hideBadge", null);
__decorate([
    (0, common_1.Get)('streak'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get detailed streak information' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns streak info with milestones and daily bonus status',
        type: dto_1.StreakInfoDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getStreakInfo", null);
__decorate([
    (0, common_1.Post)('daily-claim'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Claim daily login bonus XP' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Daily bonus claimed successfully or already claimed',
        type: dto_1.ClaimDailyBonusResponseDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "claimDailyBonus", null);
__decorate([
    (0, common_1.Get)('xp-history'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get XP transaction history' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns paginated XP transaction history',
        type: dto_1.XpHistoryResponseDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.GetXpHistoryQueryDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getXpHistory", null);
__decorate([
    (0, common_1.Get)('levels'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get level system information (public)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns level formula, thresholds, ranks, and XP sources',
        type: dto_1.LevelSystemInfoDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getLevelSystemInfo", null);
__decorate([
    (0, common_1.Get)('milestones'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get upcoming milestones and progress' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns next level, streak milestone, and near-completion achievements',
        type: dto_1.MilestonesResponseDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getMilestones", null);
exports.GamificationController = GamificationController = __decorate([
    (0, swagger_1.ApiTags)('Gamification'),
    (0, common_1.Controller)('api/v1/gamification'),
    __metadata("design:paramtypes", [services_1.GamificationService,
        services_1.XpService,
        services_1.StreaksService,
        services_1.AchievementsService,
        services_1.BadgesService])
], GamificationController);
//# sourceMappingURL=gamification.controller.js.map