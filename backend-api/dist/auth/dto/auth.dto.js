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
exports.RegisterSessionDto = exports.UpdateSettingsDto = exports.UpdateProfileDto = exports.SessionInfoDto = exports.UserProfileDto = exports.UserSettingsDto = exports.AuthStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AuthStatusDto {
}
exports.AuthStatusDto = AuthStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ok' }),
    __metadata("design:type", String)
], AuthStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Auth service is running' }),
    __metadata("design:type", String)
], AuthStatusDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", String)
], AuthStatusDto.prototype, "timestamp", void 0);
class UserSettingsDto {
}
exports.UserSettingsDto = UserSettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dark' }),
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
    (0, swagger_1.ApiProperty)({ example: 'MEDIUM' }),
    __metadata("design:type", String)
], UserSettingsDto.prototype, "difficultyPref", void 0);
class UserProfileDto {
}
exports.UserProfileDto = UserProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user_123' }),
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
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
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
    (0, swagger_1.ApiProperty)({ example: 'UTC' }),
    __metadata("design:type", String)
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
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UserSettingsDto }),
    __metadata("design:type", UserSettingsDto)
], UserProfileDto.prototype, "settings", void 0);
class SessionInfoDto {
}
exports.SessionInfoDto = SessionInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sess_123' }),
    __metadata("design:type", String)
], SessionInfoDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", String)
], SessionInfoDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-02-15T00:00:00.000Z' }),
    __metadata("design:type", String)
], SessionInfoDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Chrome/120.0 on Windows' }),
    __metadata("design:type", String)
], SessionInfoDto.prototype, "deviceInfo", void 0);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'johndoe', minLength: 3, maxLength: 30 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe', maxLength: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/avatar.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'I love coding!', maxLength: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'en', enum: ['en', 'fil'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "locale", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Asia/Manila' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "timezone", void 0);
class UpdateSettingsDto {
}
exports.UpdateSettingsDto = UpdateSettingsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'dark', enum: ['light', 'dark', 'auto'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "theme", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'vs-dark' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "codeEditorTheme", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 14 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSettingsDto.prototype, "fontSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 30 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSettingsDto.prototype, "dailyGoalMins", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MEDIUM', enum: ['EASY', 'MEDIUM', 'HARD'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "difficultyPref", void 0);
class RegisterSessionDto {
}
exports.RegisterSessionDto = RegisterSessionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'device_abc123' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterSessionDto.prototype, "deviceId", void 0);
//# sourceMappingURL=auth.dto.js.map