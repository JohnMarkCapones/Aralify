import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { Public } from '../auth/decorators';
import {
  BlogPostListItemDto,
  BlogPostDetailDto,
  BlogPostListResponseDto,
} from './dto';

@ApiTags('Blog')
@Controller('api/v1/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List published blog posts' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of published blog posts',
    type: BlogPostListResponseDto,
  })
  async findAll(
    @Query('category') category?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<BlogPostListResponseDto> {
    return this.blogService.findAll({
      category,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Get a blog post by slug' })
  @ApiParam({ name: 'slug', example: 'introducing-aralify' })
  @ApiResponse({
    status: 200,
    description: 'Returns the full blog post',
    type: BlogPostDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findBySlug(@Param('slug') slug: string): Promise<BlogPostDetailDto> {
    return this.blogService.findBySlug(slug);
  }
}
