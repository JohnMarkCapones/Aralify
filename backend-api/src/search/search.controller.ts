import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import { Public } from '../auth/decorators';
import { SearchResultsDto } from './dto';
import { SearchType } from './search.repository';

@ApiTags('Search')
@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Unified search across courses, lessons, challenges, and users' })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Search term',
    example: 'python',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['courses', 'lessons', 'challenges', 'users'],
    description: 'Filter by content type. If omitted, searches all types.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum results per type (default 10)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns search results grouped by type',
    type: SearchResultsDto,
  })
  async search(
    @Query('q') q: string,
    @Query('type') type?: SearchType,
    @Query('limit') limit?: number,
  ): Promise<SearchResultsDto> {
    return this.searchService.search(
      q,
      type,
      limit ? Number(limit) : 10,
    );
  }
}
