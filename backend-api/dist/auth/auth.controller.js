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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const decorators_1 = require("./decorators");
const dto_1 = require("./dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getStatus() {
        return {
            status: 'ok',
            message: 'Auth service is running',
            timestamp: new Date().toISOString(),
        };
    }
    async getMe(user) {
        const fullUser = await this.authService.getUserWithSettings(user.id);
        return this.mapToProfileDto(fullUser || user);
    }
    async updateMe(user, updateDto) {
        const updated = await this.authService.updateProfile(user.id, updateDto);
        return this.mapToProfileDto(updated);
    }
    async registerSession(user, userAgent, forwardedFor, body) {
        const ipAddress = forwardedFor?.split(',')[0]?.trim() || 'unknown';
        const session = await this.authService.createSession(user.id, {
            deviceInfo: userAgent,
            ipAddress,
            deviceId: body.deviceId,
        });
        return {
            sessionId: session.id,
            createdAt: session.createdAt.toISOString(),
            expiresAt: session.expiresAt.toISOString(),
            deviceInfo: session.deviceInfo || undefined,
        };
    }
    async getSessions(user) {
        const sessions = await this.authService.getUserSessions(user.id);
        return sessions.map((s) => ({
            sessionId: s.id,
            createdAt: s.createdAt.toISOString(),
            expiresAt: s.expiresAt.toISOString(),
            deviceInfo: s.deviceInfo || undefined,
        }));
    }
    async revokeSession(user, sessionId) {
        await this.authService.revokeSession(user.id, sessionId);
    }
    async logout(user) {
        await this.authService.revokeAllSessions(user.id);
    }
    async deleteAccount(user) {
        await this.authService.deleteAccount(user.id);
    }
    mapToProfileDto(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            locale: user.locale,
            timezone: user.timezone,
            xpTotal: user.xpTotal,
            level: user.level,
            streakCurrent: user.streakCurrent,
            streakLongest: user.streakLongest,
            role: user.role,
            isVerified: user.isVerified,
            createdAt: user.createdAt.toISOString(),
            settings: user.settings
                ? {
                    theme: user.settings.theme,
                    codeEditorTheme: user.settings.codeEditorTheme,
                    fontSize: user.settings.fontSize,
                    dailyGoalMins: user.settings.dailyGoalMins,
                    difficultyPref: user.settings.difficultyPref,
                }
                : undefined,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('status'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check auth service status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Auth service is running' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", dto_1.AuthStatusDto)
], AuthController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current authenticated user profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns user profile',
        type: dto_1.UserProfileDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.Post)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully',
        type: dto_1.UserProfileDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Post)('session'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new session (call after login)' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Session registered',
        type: dto_1.SessionInfoDto,
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Headers)('user-agent')),
    __param(2, (0, common_1.Headers)('x-forwarded-for')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerSession", null);
__decorate([
    (0, common_1.Get)('sessions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active sessions for current user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns list of active sessions',
        type: [dto_1.SessionInfoDto],
    }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Delete)('sessions/:sessionId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke a specific session' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Session revoked' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeSession", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Logout - revoke all sessions' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'All sessions revoked' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Delete)('account'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user account (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Account deleted' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('api/v1/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map