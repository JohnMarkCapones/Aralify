import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Public, CurrentUser } from '../auth/decorators';
import { ShowcaseService } from './showcase.service';
import {
  CreateShowcaseDto,
  UpdateShowcaseDto,
  ShowcaseProjectDto,
  ShowcaseListResponseDto,
} from './dto';

@ApiTags('Showcase')
@Controller('api/v1/showcase')
export class ShowcaseController {
  constructor(private readonly showcaseService: ShowcaseService) {}

  // ── List Approved Projects ────────────────────────────────

  @Get()
  @Public()
  @ApiOperation({ summary: 'List approved showcase projects' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of approved projects',
    type: ShowcaseListResponseDto,
  })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<ShowcaseListResponseDto> {
    return this.showcaseService.findAll({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 12,
    });
  }

  // ── Get Project by Slug ───────────────────────────────────

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Get showcase project details by slug' })
  @ApiParam({ name: 'slug', description: 'Project slug', example: 'my-awesome-project-a1b2' })
  @ApiResponse({
    status: 200,
    description: 'Returns project details',
    type: ShowcaseProjectDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findBySlug(@Param('slug') slug: string): Promise<ShowcaseProjectDto> {
    return this.showcaseService.findBySlug(slug);
  }

  // ── Submit Project ────────────────────────────────────────

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a new showcase project' })
  @ApiResponse({
    status: 201,
    description: 'Project submitted successfully',
    type: ShowcaseProjectDto,
  })
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreateShowcaseDto,
  ): Promise<ShowcaseProjectDto> {
    return this.showcaseService.create(user.id, dto);
  }

  // ── Update Own Project ────────────────────────────────────

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update own showcase project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    type: ShowcaseProjectDto,
  })
  @ApiResponse({ status: 403, description: 'Not the project owner' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateShowcaseDto,
  ): Promise<ShowcaseProjectDto> {
    return this.showcaseService.update(user.id, id, dto);
  }

  // ── Delete Own Project ────────────────────────────────────

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete own showcase project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 403, description: 'Not the project owner' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async remove(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.showcaseService.remove(user.id, id);
  }
}
