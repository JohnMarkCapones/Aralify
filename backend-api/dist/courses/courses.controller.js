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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const courses_service_1 = require("./courses.service");
const decorators_1 = require("../auth/decorators");
const dto_1 = require("./dto");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async findAll(query) {
        return this.coursesService.findAll({
            language: query.language,
            sort: query.sort,
        });
    }
    async findBySlug(slug) {
        return this.coursesService.findBySlug(slug);
    }
    async getProgress(slug, user) {
        return this.coursesService.getProgress(slug, user.id);
    }
    async getLevels(slug) {
        return this.coursesService.getLevels(slug);
    }
    async startCourse(slug, user) {
        return this.coursesService.startCourse(slug, user.id);
    }
    async getCertificate(slug, user) {
        return {
            message: 'Certificate generation not yet implemented',
            courseSlug: slug,
            userId: user.id,
        };
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all published courses' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns list of courses',
        type: [dto_1.CourseListItemDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetCoursesQueryDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get detailed course information with all levels' }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'python-basics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns course details',
        type: dto_1.CourseDetailDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':slug/progress'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get user's detailed progress in a specific course" }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'python-basics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns course progress',
        type: dto_1.CourseProgressDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getProgress", null);
__decorate([
    (0, common_1.Get)(':slug/levels'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all levels for a specific course' }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'python-basics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns list of levels',
        type: [dto_1.LevelDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getLevels", null);
__decorate([
    (0, common_1.Post)(':slug/start'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mark course as started by user' }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'python-basics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Course started successfully',
        type: dto_1.StartCourseResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "startCourse", null);
__decorate([
    (0, common_1.Get)(':slug/certificate'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get or generate completion certificate for course' }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'python-basics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns certificate URL' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found or not completed' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCertificate", null);
exports.CoursesController = CoursesController = __decorate([
    (0, swagger_1.ApiTags)('Courses'),
    (0, common_1.Controller)('api/v1/courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map