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
exports.GetBadgesQueryDto = exports.GetAchievementsQueryDto = exports.GetXpHistoryQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GetXpHistoryQueryDto {
}
exports.GetXpHistoryQueryDto = GetXpHistoryQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50, description: 'Number of records to return' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], GetXpHistoryQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0, description: 'Number of records to skip' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GetXpHistoryQueryDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'LESSON_COMPLETE',
        enum: ['LESSON_COMPLETE', 'QUIZ_COMPLETE', 'CHALLENGE_COMPLETE', 'STREAK_BONUS', 'ACHIEVEMENT', 'DAILY_BONUS', 'EVENT'],
        description: 'Filter by XP source',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetXpHistoryQueryDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-01', description: 'Filter from date (ISO format)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetXpHistoryQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-31', description: 'Filter to date (ISO format)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetXpHistoryQueryDto.prototype, "endDate", void 0);
class GetAchievementsQueryDto {
}
exports.GetAchievementsQueryDto = GetAchievementsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'completion',
        description: 'Filter by achievement category',
        enum: ['completion', 'streak', 'mastery', 'social', 'secret'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetAchievementsQueryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Include secret achievements' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetAchievementsQueryDto.prototype, "includeSecret", void 0);
class GetBadgesQueryDto {
}
exports.GetBadgesQueryDto = GetBadgesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Only return displayed badges' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetBadgesQueryDto.prototype, "displayedOnly", void 0);
//# sourceMappingURL=gamification-query.dto.js.map