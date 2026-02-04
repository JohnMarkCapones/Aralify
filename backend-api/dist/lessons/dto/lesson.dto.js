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
exports.UnlockHintResponseDto = exports.SubmitQuizAnswerResponseDto = exports.LessonHintsResponseDto = exports.LessonChallengesResponseDto = exports.LessonQuizzesResponseDto = exports.CompleteLessonResponseDto = exports.StartLessonResponseDto = exports.LessonDetailDto = exports.UserLessonProgressDto = exports.HintDto = exports.ChallengeSummaryDto = exports.QuizSummaryDto = exports.I18nTextDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class I18nTextDto {
}
exports.I18nTextDto = I18nTextDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Variables and Data Types' }),
    __metadata("design:type", String)
], I18nTextDto.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Mga Variable at Uri ng Data', nullable: true }),
    __metadata("design:type", Object)
], I18nTextDto.prototype, "fil", void 0);
class QuizSummaryDto {
}
exports.QuizSummaryDto = QuizSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], QuizSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['MULTIPLE_CHOICE', 'FILL_BLANK', 'CODE_COMPLETION', 'TRUE_FALSE'] }),
    __metadata("design:type", String)
], QuizSummaryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'What is the correct way to declare a variable in Python?' }),
    __metadata("design:type", String)
], QuizSummaryDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['x = 5', 'var x = 5', 'int x = 5', 'let x = 5'],
        description: 'Options for multiple choice questions',
        nullable: true,
    }),
    __metadata("design:type", Object)
], QuizSummaryDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Variables in Python are dynamically typed...', nullable: true }),
    __metadata("design:type", Object)
], QuizSummaryDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], QuizSummaryDto.prototype, "orderIndex", void 0);
class ChallengeSummaryDto {
}
exports.ChallengeSummaryDto = ChallengeSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], ChallengeSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Calculate the Sum' }),
    __metadata("design:type", String)
], ChallengeSummaryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Write a function that calculates the sum of two numbers.' }),
    __metadata("design:type", String)
], ChallengeSummaryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'def add(a, b):\n    # Your code here\n    pass', nullable: true }),
    __metadata("design:type", Object)
], ChallengeSummaryDto.prototype, "starterCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 71, description: 'Judge0 language ID' }),
    __metadata("design:type", Number)
], ChallengeSummaryDto.prototype, "languageId", void 0);
class HintDto {
}
exports.HintDto = HintDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], HintDto.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Try using the + operator' }),
    __metadata("design:type", String)
], HintDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], HintDto.prototype, "isUnlocked", void 0);
class UserLessonProgressDto {
}
exports.UserLessonProgressDto = UserLessonProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'] }),
    __metadata("design:type", String)
], UserLessonProgressDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85, nullable: true }),
    __metadata("design:type", Object)
], UserLessonProgressDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], UserLessonProgressDto.prototype, "xpEarned", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 300, nullable: true }),
    __metadata("design:type", Object)
], UserLessonProgressDto.prototype, "timeSpentSeconds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-15T10:30:00.000Z', nullable: true }),
    __metadata("design:type", Object)
], UserLessonProgressDto.prototype, "completedAt", void 0);
class LessonDetailDto {
}
exports.LessonDetailDto = LessonDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], LessonDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'variables-intro' }),
    __metadata("design:type", String)
], LessonDetailDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: I18nTextDto }),
    __metadata("design:type", I18nTextDto)
], LessonDetailDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lesson content (text, code examples)',
        example: { sections: [{ type: 'text', content: 'Welcome to...' }] },
    }),
    __metadata("design:type", Object)
], LessonDetailDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['easy', 'medium', 'hard'] }),
    __metadata("design:type", String)
], LessonDetailDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], LessonDetailDto.prototype, "xpReward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], LessonDetailDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Level information',
        example: { id: 'clx123', slug: 'variables', title: { en: 'Variables' } },
    }),
    __metadata("design:type", Object)
], LessonDetailDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [QuizSummaryDto] }),
    __metadata("design:type", Array)
], LessonDetailDto.prototype, "quizzes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ChallengeSummaryDto] }),
    __metadata("design:type", Array)
], LessonDetailDto.prototype, "challenges", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UserLessonProgressDto }),
    __metadata("design:type", Object)
], LessonDetailDto.prototype, "userProgress", void 0);
class StartLessonResponseDto {
}
exports.StartLessonResponseDto = StartLessonResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], StartLessonResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], StartLessonResponseDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: UserLessonProgressDto,
        description: 'Initial progress record',
    }),
    __metadata("design:type", UserLessonProgressDto)
], StartLessonResponseDto.prototype, "progress", void 0);
class CompleteLessonResponseDto {
}
exports.CompleteLessonResponseDto = CompleteLessonResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CompleteLessonResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], CompleteLessonResponseDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'XP earned with multiplier applied' }),
    __metadata("design:type", Number)
], CompleteLessonResponseDto.prototype, "xpEarned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'XP multiplier based on difficulty (1x=Easy, 2x=Medium, 3x=Hard)' }),
    __metadata("design:type", Number)
], CompleteLessonResponseDto.prototype, "xpMultiplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Base XP before multiplier' }),
    __metadata("design:type", Number)
], CompleteLessonResponseDto.prototype, "baseXp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Whether this completion unlocked the next level' }),
    __metadata("design:type", Boolean)
], CompleteLessonResponseDto.prototype, "levelUnlocked", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'clx9876543210', description: 'ID of newly unlocked level' }),
    __metadata("design:type", String)
], CompleteLessonResponseDto.prototype, "nextLevelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserLessonProgressDto }),
    __metadata("design:type", UserLessonProgressDto)
], CompleteLessonResponseDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Gamification results (XP, streak, achievements) from this completion',
    }),
    __metadata("design:type", Object)
], CompleteLessonResponseDto.prototype, "gamification", void 0);
class LessonQuizzesResponseDto {
}
exports.LessonQuizzesResponseDto = LessonQuizzesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], LessonQuizzesResponseDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [QuizSummaryDto] }),
    __metadata("design:type", Array)
], LessonQuizzesResponseDto.prototype, "quizzes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], LessonQuizzesResponseDto.prototype, "totalCount", void 0);
class LessonChallengesResponseDto {
}
exports.LessonChallengesResponseDto = LessonChallengesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], LessonChallengesResponseDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ChallengeSummaryDto] }),
    __metadata("design:type", Array)
], LessonChallengesResponseDto.prototype, "challenges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], LessonChallengesResponseDto.prototype, "totalCount", void 0);
class LessonHintsResponseDto {
}
exports.LessonHintsResponseDto = LessonHintsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], LessonHintsResponseDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx0987654321' }),
    __metadata("design:type", String)
], LessonHintsResponseDto.prototype, "challengeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [HintDto] }),
    __metadata("design:type", Array)
], LessonHintsResponseDto.prototype, "hints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], LessonHintsResponseDto.prototype, "totalHints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], LessonHintsResponseDto.prototype, "unlockedCount", void 0);
class SubmitQuizAnswerResponseDto {
}
exports.SubmitQuizAnswerResponseDto = SubmitQuizAnswerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], SubmitQuizAnswerResponseDto.prototype, "correct", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Variables in Python are dynamically typed...' }),
    __metadata("design:type", Object)
], SubmitQuizAnswerResponseDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 25, description: 'XP earned (only if correct)' }),
    __metadata("design:type", Number)
], SubmitQuizAnswerResponseDto.prototype, "xpEarned", void 0);
class UnlockHintResponseDto {
}
exports.UnlockHintResponseDto = UnlockHintResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UnlockHintResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: HintDto, description: 'The newly unlocked hint' }),
    __metadata("design:type", HintDto)
], UnlockHintResponseDto.prototype, "hint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], UnlockHintResponseDto.prototype, "unlockedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], UnlockHintResponseDto.prototype, "totalHints", void 0);
//# sourceMappingURL=lesson.dto.js.map