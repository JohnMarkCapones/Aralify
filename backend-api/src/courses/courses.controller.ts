import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import {
  CourseListItemDto,
  CourseDetailDto,
  CourseProgressDto,
  LevelDto,
  StartCourseResponseDto,
  GetCoursesQueryDto,
} from './dto';

@ApiTags('Courses')
@Controller('api/v1/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'List all published courses' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of courses',
    type: [CourseListItemDto],
  })
  async findAll(@Query() query: GetCoursesQueryDto): Promise<CourseListItemDto[]> {
    return this.coursesService.findAll({
      language: query.language,
      sort: query.sort,
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get detailed course information with all levels' })
  @ApiParam({ name: 'slug', example: 'python-basics' })
  @ApiResponse({
    status: 200,
    description: 'Returns course details',
    type: CourseDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async findBySlug(@Param('slug') slug: string): Promise<CourseDetailDto> {
    return this.coursesService.findBySlug(slug);
  }

  @Get(':slug/progress')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's detailed progress in a specific course" })
  @ApiParam({ name: 'slug', example: 'python-basics' })
  @ApiResponse({
    status: 200,
    description: 'Returns course progress',
    type: CourseProgressDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getProgress(@Param('slug') slug: string): Promise<CourseProgressDto> {
    // TODO: Get userId from auth guard
    const userId = 'temp-user-id';
    return this.coursesService.getProgress(slug, userId);
  }

  @Get(':slug/levels')
  @ApiOperation({ summary: 'Get all levels for a specific course' })
  @ApiParam({ name: 'slug', example: 'python-basics' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of levels',
    type: [LevelDto],
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getLevels(@Param('slug') slug: string): Promise<LevelDto[]> {
    return this.coursesService.getLevels(slug);
  }

  @Post(':slug/start')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark course as started by user' })
  @ApiParam({ name: 'slug', example: 'python-basics' })
  @ApiResponse({
    status: 200,
    description: 'Course started successfully',
    type: StartCourseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async startCourse(@Param('slug') slug: string): Promise<StartCourseResponseDto> {
    // TODO: Get userId from auth guard
    const userId = 'temp-user-id';
    return this.coursesService.startCourse(slug, userId);
  }

  @Get(':slug/certificate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get or generate completion certificate for course' })
  @ApiParam({ name: 'slug', example: 'python-basics' })
  @ApiResponse({ status: 200, description: 'Returns certificate URL' })
  @ApiResponse({ status: 404, description: 'Course not found or not completed' })
  async getCertificate(@Param('slug') slug: string) {
    // TODO: Implement certificate generation
    return {
      message: 'Certificate generation not yet implemented',
      courseSlug: slug,
    };
  }
}
