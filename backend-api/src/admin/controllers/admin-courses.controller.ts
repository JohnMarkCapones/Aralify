import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AdminCoursesService } from '../services/admin-courses.service';
import { ContentAdmin } from '../decorators';
import { CurrentUser } from '../../auth/decorators';
import {
  GetAdminCoursesQueryDto,
  CreateCourseDto,
  UpdateCourseDto,
  CreateLevelDto,
  UpdateLevelDto,
  CreateLessonDto,
  UpdateLessonDto,
  AdminCourseListResponseDto,
  AdminCourseDetailDto,
  AdminCourseDto,
  AdminLevelDto,
  AdminLessonDto,
  PublishResponseDto,
  DeleteContentResponseDto,
} from '../dto';
import { AdminRequestContext } from '../types';

@ApiTags('Admin - Content')
@Controller('api/v1/admin')
export class AdminCoursesController {
  constructor(private readonly adminCoursesService: AdminCoursesService) {}

  // ============================================================================
  // Courses
  // ============================================================================

  @Get('courses')
  @ContentAdmin()
  @ApiOperation({ summary: 'List all courses with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated course list',
    type: AdminCourseListResponseDto,
  })
  async getCourses(
    @Query() query: GetAdminCoursesQueryDto,
  ): Promise<AdminCourseListResponseDto> {
    return this.adminCoursesService.findAllCourses(query);
  }

  @Get('courses/:id')
  @ContentAdmin()
  @ApiOperation({ summary: 'Get detailed course information with levels and lessons' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns course details',
    type: AdminCourseDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseById(@Param('id') id: string): Promise<AdminCourseDetailDto> {
    return this.adminCoursesService.findCourseById(id);
  }

  @Post('courses')
  @ContentAdmin()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'Course created successfully',
    type: AdminCourseDto,
  })
  @ApiResponse({ status: 409, description: 'Course with this slug already exists' })
  async createCourse(
    @Body() dto: CreateCourseDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<AdminCourseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.createCourse(dto, context);
  }

  @Put('courses/:id')
  @ContentAdmin()
  @ApiOperation({ summary: 'Update a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'Course updated successfully',
    type: AdminCourseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 409, description: 'Slug already in use' })
  async updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<AdminCourseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.updateCourse(id, dto, context);
  }

  @Delete('courses/:id')
  @ContentAdmin()
  @ApiOperation({ summary: 'Delete a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'Course deleted successfully',
    type: DeleteContentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async deleteCourse(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<DeleteContentResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.deleteCourse(id, context);
  }

  @Post('courses/:id/publish')
  @ContentAdmin()
  @ApiOperation({ summary: 'Publish a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'Course published successfully',
    type: PublishResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async publishCourse(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<PublishResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.publishCourse(id, context);
  }

  @Post('courses/:id/unpublish')
  @ContentAdmin()
  @ApiOperation({ summary: 'Unpublish a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'Course unpublished successfully',
    type: PublishResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async unpublishCourse(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<PublishResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.unpublishCourse(id, context);
  }

  // ============================================================================
  // Levels
  // ============================================================================

  @Post('levels')
  @ContentAdmin()
  @ApiOperation({ summary: 'Create a new level' })
  @ApiResponse({
    status: 201,
    description: 'Level created successfully',
    type: AdminLevelDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 409, description: 'Level with this slug already exists' })
  async createLevel(
    @Body() dto: CreateLevelDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<AdminLevelDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.createLevel(dto, context);
  }

  @Put('levels/:id')
  @ContentAdmin()
  @ApiOperation({ summary: 'Update a level' })
  @ApiParam({ name: 'id', description: 'Level ID' })
  @ApiResponse({
    status: 200,
    description: 'Level updated successfully',
    type: AdminLevelDto,
  })
  @ApiResponse({ status: 404, description: 'Level not found' })
  @ApiResponse({ status: 409, description: 'Slug already in use' })
  async updateLevel(
    @Param('id') id: string,
    @Body() dto: UpdateLevelDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<AdminLevelDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.updateLevel(id, dto, context);
  }

  @Delete('levels/:id')
  @ContentAdmin()
  @ApiOperation({ summary: 'Delete a level' })
  @ApiParam({ name: 'id', description: 'Level ID' })
  @ApiResponse({
    status: 200,
    description: 'Level deleted successfully',
    type: DeleteContentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Level not found' })
  async deleteLevel(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<DeleteContentResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.deleteLevel(id, context);
  }

  @Post('levels/:id/publish')
  @ContentAdmin()
  @ApiOperation({ summary: 'Publish a level' })
  @ApiParam({ name: 'id', description: 'Level ID' })
  @ApiResponse({
    status: 200,
    description: 'Level published successfully',
    type: PublishResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Level not found' })
  async publishLevel(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<PublishResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.publishLevel(id, context);
  }

  @Post('levels/:id/unpublish')
  @ContentAdmin()
  @ApiOperation({ summary: 'Unpublish a level' })
  @ApiParam({ name: 'id', description: 'Level ID' })
  @ApiResponse({
    status: 200,
    description: 'Level unpublished successfully',
    type: PublishResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Level not found' })
  async unpublishLevel(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<PublishResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.unpublishLevel(id, context);
  }

  // ============================================================================
  // Lessons
  // ============================================================================

  @Post('lessons')
  @ContentAdmin()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({
    status: 201,
    description: 'Lesson created successfully',
    type: AdminLessonDto,
  })
  @ApiResponse({ status: 404, description: 'Level not found' })
  @ApiResponse({ status: 409, description: 'Lesson with this slug already exists' })
  async createLesson(
    @Body() dto: CreateLessonDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<AdminLessonDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.createLesson(dto, context);
  }

  @Put('lessons/:id')
  @ContentAdmin()
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson updated successfully',
    type: AdminLessonDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiResponse({ status: 409, description: 'Slug already in use' })
  async updateLesson(
    @Param('id') id: string,
    @Body() dto: UpdateLessonDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<AdminLessonDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.updateLesson(id, dto, context);
  }

  @Delete('lessons/:id')
  @ContentAdmin()
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson deleted successfully',
    type: DeleteContentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async deleteLesson(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<DeleteContentResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.deleteLesson(id, context);
  }

  @Post('lessons/:id/publish')
  @ContentAdmin()
  @ApiOperation({ summary: 'Publish a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson published successfully',
    type: PublishResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async publishLesson(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<PublishResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.publishLesson(id, context);
  }

  @Post('lessons/:id/unpublish')
  @ContentAdmin()
  @ApiOperation({ summary: 'Unpublish a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson unpublished successfully',
    type: PublishResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async unpublishLesson(
    @Param('id') id: string,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<PublishResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminCoursesService.unpublishLesson(id, context);
  }

  private getRequestContext(admin: User, request: any): AdminRequestContext {
    return {
      adminId: admin.id,
      ipAddress: request.ip || request.headers?.['x-forwarded-for'],
      userAgent: request.headers?.['user-agent'],
    };
  }
}
