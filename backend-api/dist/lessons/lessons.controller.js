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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lessons_service_1 = require("./lessons.service");
const decorators_1 = require("../auth/decorators");
const dto_1 = require("./dto");
let LessonsController = class LessonsController {
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    async findById(id, user) {
        return this.lessonsService.findById(id, user?.id);
    }
    async startLesson(id, user) {
        return this.lessonsService.startLesson(id, user.id);
    }
    async completeLesson(id, user, dto) {
        return this.lessonsService.completeLesson(id, user.id, dto);
    }
    async getQuizzes(id) {
        return this.lessonsService.getQuizzes(id);
    }
    async getChallenges(id) {
        return this.lessonsService.getChallenges(id);
    }
    async getHints(id, challengeId, user) {
        return this.lessonsService.getHints(id, user.id, challengeId);
    }
    async unlockHint(id, user, dto) {
        return this.lessonsService.unlockHint(id, user.id, dto);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson content with quizzes and challenges' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns lesson details with content',
        type: dto_1.LessonDetailDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Start a lesson and create progress record' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lesson started successfully',
        type: dto_1.StartLessonResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Level not unlocked' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "startLesson", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Complete a lesson and award XP with difficulty multiplier' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lesson completed successfully',
        type: dto_1.CompleteLessonResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Lesson must be started before completing' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CompleteLessonDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "completeLesson", null);
__decorate([
    (0, common_1.Get)(':id/quizzes'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get quiz questions for a lesson (answers excluded)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns quiz questions without correct answers',
        type: dto_1.LessonQuizzesResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getQuizzes", null);
__decorate([
    (0, common_1.Get)(':id/challenges'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get code challenges for a lesson (solutions excluded)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns challenges without solution code',
        type: dto_1.LessonChallengesResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getChallenges", null);
__decorate([
    (0, common_1.Get)(':id/hints'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get hints for a challenge with unlock status' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' }),
    (0, swagger_1.ApiQuery)({ name: 'challengeId', example: 'clx0987654321', description: 'Challenge ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns hints with unlock status',
        type: dto_1.LessonHintsResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson or challenge not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('challengeId')),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "getHints", null);
__decorate([
    (0, common_1.Post)(':id/hint-unlock'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Unlock the next hint for a challenge' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Hint unlocked successfully',
        type: dto_1.UnlockHintResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'All hints already unlocked' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson or challenge not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.UnlockHintDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "unlockHint", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiTags)('Lessons'),
    (0, common_1.Controller)('api/v1/lessons'),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map