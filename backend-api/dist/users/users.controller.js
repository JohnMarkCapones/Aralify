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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const decorators_1 = require("../auth/decorators");
const dto_1 = require("./dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(user) {
        return this.usersService.getProfile(user.id);
    }
    async updateProfile(user, dto) {
        return this.usersService.updateProfile(user.id, dto);
    }
    async getSettings(user) {
        return this.usersService.getSettings(user.id);
    }
    async updateSettings(user, dto) {
        return this.usersService.updateSettings(user.id, dto);
    }
    async getStats(user) {
        return this.usersService.getStats(user.id);
    }
    async getUserCourses(user) {
        return this.usersService.getUserCourses(user.id);
    }
    async getDetailedStats(user, range) {
        return this.usersService.getDetailedStats(user.id, range || '7d');
    }
    async getCertificates(user) {
        return this.usersService.getCertificates(user.id);
    }
    async getChallengeHistory(user, page, limit) {
        return this.usersService.getChallengeHistory(user.id, Number(page) || 1, Number(limit) || 20);
    }
    async getUserActivities(user, type, page, limit) {
        return this.usersService.getUserActivities(user.id, {
            type,
            page: Number(page) || 1,
            limit: Number(limit) || 20,
        });
    }
    async getOnboardingStatus(user) {
        return this.usersService.getOnboardingStatus(user.id);
    }
    async completeOnboarding(user, dto) {
        return this.usersService.completeOnboarding(user.id, dto);
    }
    async skipOnboarding(user) {
        return this.usersService.skipOnboarding(user.id);
    }
    async getPublicProfile(username, user) {
        return this.usersService.getPublicProfile(username, user?.id);
    }
    async getPublicStats(username, user) {
        return this.usersService.getPublicStats(username, user?.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('user/profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get authenticated user's full profile" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the full user profile',
        type: dto_1.UserProfileDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('user/profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update profile (displayName, bio, locale, timezone)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the updated user profile',
        type: dto_1.UserProfileDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('user/settings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user settings (theme, notifications, privacy)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns combined user settings',
        type: dto_1.UserSettingsDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Put)('user/settings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update user settings' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the updated user settings',
        type: dto_1.UserSettingsDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateSettingsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Get)('user/stats'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get detailed user statistics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns aggregated user statistics',
        type: dto_1.UserStatsDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('user/courses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get enrolled courses with progress' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns enrolled courses', type: [dto_1.UserCourseDto] }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserCourses", null);
__decorate([
    (0, common_1.Get)('user/stats/detailed'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get detailed stats (XP over time, difficulty breakdown)' }),
    (0, swagger_1.ApiQuery)({ name: 'range', required: false, enum: ['7d', '30d'], example: '7d' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns detailed statistics', type: dto_1.UserDetailedStatsDto }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('range')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getDetailedStats", null);
__decorate([
    (0, common_1.Get)('user/certificates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get certificates for completed courses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns certificates', type: [dto_1.UserCertificateDto] }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCertificates", null);
__decorate([
    (0, common_1.Get)('user/challenge-history'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get past challenge submissions' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns challenge history' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getChallengeHistory", null);
__decorate([
    (0, common_1.Get)('user/activities'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get own activity history' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, description: 'Filter by activity type' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns activities' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserActivities", null);
__decorate([
    (0, common_1.Get)('users/onboarding/status'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get onboarding status' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns onboarding completion state',
        type: dto_1.OnboardingStatusDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOnboardingStatus", null);
__decorate([
    (0, common_1.Put)('users/onboarding/complete'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Complete onboarding with preferences' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Onboarding completed, XP awarded',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CompleteOnboardingDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "completeOnboarding", null);
__decorate([
    (0, common_1.Put)('users/onboarding/skip'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Skip onboarding' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Onboarding skipped',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "skipOnboarding", null);
__decorate([
    (0, common_1.Get)('users/:username'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get public profile by username' }),
    (0, swagger_1.ApiParam)({ name: 'username', example: 'johndoe' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns public profile (privacy-filtered)',
        type: dto_1.PublicUserProfileDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPublicProfile", null);
__decorate([
    (0, common_1.Get)('users/:username/stats'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get public stats by username' }),
    (0, swagger_1.ApiParam)({ name: 'username', example: 'johndoe' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns public statistics (privacy-filtered)',
        type: dto_1.PublicUserStatsDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPublicStats", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map