import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CareerPathService } from './career-path.service';
import { Public, CurrentUser } from '../../auth/decorators';

@ApiTags('Career Paths')
@Controller('api/v1/career-paths')
export class CareerPathController {
  constructor(private readonly careerPathService: CareerPathService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List all published career paths' })
  @ApiResponse({ status: 200, description: 'Returns list of career paths' })
  async findAll() {
    return this.careerPathService.findAll();
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Get career path details with skill nodes' })
  @ApiParam({ name: 'slug', example: 'frontend-developer' })
  @ApiResponse({ status: 200, description: 'Returns career path with nodes' })
  @ApiResponse({ status: 404, description: 'Career path not found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.careerPathService.findBySlug(slug);
  }

  @Post(':slug/enroll')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Enroll in a career path',
    description: 'Start following a career path. Creates progress tracking and suggests first course.',
  })
  @ApiParam({ name: 'slug', example: 'frontend-developer' })
  @ApiResponse({ status: 201, description: 'Enrolled successfully' })
  @ApiResponse({ status: 404, description: 'Career path not found' })
  async enroll(
    @Param('slug') slug: string,
    @CurrentUser() user: User,
  ) {
    return this.careerPathService.enroll(slug, user.id);
  }

  @Get(':slug/progress')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's progress in a career path" })
  @ApiParam({ name: 'slug', example: 'frontend-developer' })
  @ApiResponse({ status: 200, description: 'Returns career path progress' })
  @ApiResponse({ status: 404, description: 'Career path not found or not enrolled' })
  async getProgress(
    @Param('slug') slug: string,
    @CurrentUser() user: User,
  ) {
    return this.careerPathService.getProgress(slug, user.id);
  }

  @Get('user/enrolled')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all career paths the user is enrolled in' })
  @ApiResponse({ status: 200, description: 'Returns enrolled career paths' })
  async getUserPaths(@CurrentUser() user: User) {
    return this.careerPathService.getUserPaths(user.id);
  }

  @Patch(':slug/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update career path status (pause/resume/abandon)' })
  @ApiParam({ name: 'slug', example: 'frontend-developer' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  async updateStatus(
    @Param('slug') slug: string,
    @CurrentUser() user: User,
    @Body() body: { status: string },
  ) {
    return this.careerPathService.updateStatus(slug, user.id, body.status);
  }
}
