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
exports.GetLevelsQueryDto = exports.GetCoursesQueryDto = exports.StartCourseResponseDto = exports.CourseProgressResponseDto = exports.CourseProgressDto = exports.LevelProgressDto = exports.CourseDetailDto = exports.LevelDto = exports.LessonSummaryDto = exports.CourseListItemDto = exports.I18nTextDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class I18nTextDto {
}
exports.I18nTextDto = I18nTextDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Python Basics' }),
    __metadata("design:type", String)
], I18nTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Batayan ng Python' }),
    __metadata("design:type", String)
], I18nTextDto.prototype, "fil", void 0);
class CourseListItemDto {
}
exports.CourseListItemDto = CourseListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], CourseListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'python-basics' }),
    __metadata("design:type", String)
], CourseListItemDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'python' }),
    __metadata("design:type", String)
], CourseListItemDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: I18nTextDto }),
    __metadata("design:type", I18nTextDto)
], CourseListItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: I18nTextDto }),
    __metadata("design:type", I18nTextDto)
], CourseListItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/python-icon.png' }),
    __metadata("design:type", String)
], CourseListItemDto.prototype, "iconUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#3776AB' }),
    __metadata("design:type", String)
], CourseListItemDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], CourseListItemDto.prototype, "totalLevels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], CourseListItemDto.prototype, "estimatedHours", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User progress information if authenticated',
        example: {
            completionPercentage: 45.5,
            startedAt: '2024-01-01T00:00:00.000Z',
            lastActivityAt: '2024-01-15T00:00:00.000Z',
        },
    }),
    __metadata("design:type", Object)
], CourseListItemDto.prototype, "userProgress", void 0);
class LessonSummaryDto {
}
exports.LessonSummaryDto = LessonSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], LessonSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['easy', 'medium', 'hard'] }),
    __metadata("design:type", String)
], LessonSummaryDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: I18nTextDto }),
    __metadata("design:type", I18nTextDto)
], LessonSummaryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], LessonSummaryDto.prototype, "xpReward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], LessonSummaryDto.prototype, "estimatedTimeMinutes", void 0);
class LevelDto {
}
exports.LevelDto = LevelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], LevelDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'variables-and-types' }),
    __metadata("design:type", String)
], LevelDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: I18nTextDto }),
    __metadata("design:type", I18nTextDto)
], LevelDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: I18nTextDto }),
    __metadata("design:type", I18nTextDto)
], LevelDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], LevelDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [LessonSummaryDto] }),
    __metadata("design:type", Array)
], LevelDto.prototype, "lessons", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    __metadata("design:type", Boolean)
], LevelDto.prototype, "isLocked", void 0);
class CourseDetailDto extends CourseListItemDto {
}
exports.CourseDetailDto = CourseDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LevelDto] }),
    __metadata("design:type", Array)
], CourseDetailDto.prototype, "levels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], CourseDetailDto.prototype, "totalLessons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CourseDetailDto.prototype, "isPublished", void 0);
class LevelProgressDto {
}
exports.LevelProgressDto = LevelProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], LevelProgressDto.prototype, "levelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], LevelProgressDto.prototype, "isUnlocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], LevelProgressDto.prototype, "easyCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], LevelProgressDto.prototype, "mediumCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], LevelProgressDto.prototype, "hardCompleted", void 0);
class CourseProgressDto {
}
exports.CourseProgressDto = CourseProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], CourseProgressDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45.5 }),
    __metadata("design:type", Number)
], CourseProgressDto.prototype, "completionPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 33.3 }),
    __metadata("design:type", Number)
], CourseProgressDto.prototype, "masteryPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], CourseProgressDto.prototype, "levelsUnlocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], CourseProgressDto.prototype, "levelsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], CourseProgressDto.prototype, "lessonsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500 }),
    __metadata("design:type", Number)
], CourseProgressDto.prototype, "totalXpEarned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3600 }),
    __metadata("design:type", Number)
], CourseProgressDto.prototype, "timeSpentSeconds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Date, example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", Object)
], CourseProgressDto.prototype, "lastActivity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LevelProgressDto] }),
    __metadata("design:type", Array)
], CourseProgressDto.prototype, "levelProgress", void 0);
class CourseProgressResponseDto {
}
exports.CourseProgressResponseDto = CourseProgressResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], CourseProgressResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], CourseProgressResponseDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], CourseProgressResponseDto.prototype, "completionPercentage", void 0);
class StartCourseResponseDto {
}
exports.StartCourseResponseDto = StartCourseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], StartCourseResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CourseProgressResponseDto }),
    __metadata("design:type", CourseProgressResponseDto)
], StartCourseResponseDto.prototype, "courseProgress", void 0);
class GetCoursesQueryDto {
}
exports.GetCoursesQueryDto = GetCoursesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'python', description: 'Filter by programming language' }),
    __metadata("design:type", String)
], GetCoursesQueryDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['popular', 'newest', 'alphabetical'], description: 'Sort order' }),
    __metadata("design:type", String)
], GetCoursesQueryDto.prototype, "sort", void 0);
class GetLevelsQueryDto {
}
exports.GetLevelsQueryDto = GetLevelsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['easy', 'medium', 'hard'], description: 'Filter by difficulty' }),
    __metadata("design:type", String)
], GetLevelsQueryDto.prototype, "difficulty", void 0);
//# sourceMappingURL=course.dto.js.map