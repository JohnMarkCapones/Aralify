import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { CurrentUser } from '../auth/decorators';
import { BookmarksService } from './bookmarks.service';
import {
  CreateBookmarkDto,
  BookmarkDto,
  BookmarkListResponseDto,
  DeleteBookmarkResponseDto,
} from './dto';

@ApiTags('Bookmarks')
@ApiBearerAuth()
@Controller('api/v1/bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // ── List Bookmarks ──────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List bookmarks for the authenticated user' })
  @ApiQuery({
    name: 'targetType',
    required: false,
    enum: ['LESSON', 'CHALLENGE', 'COURSE'],
    description: 'Filter bookmarks by target type',
  })
  @ApiResponse({ status: 200, description: 'Bookmarks list', type: BookmarkListResponseDto })
  async findAll(
    @CurrentUser() user: User,
    @Query('targetType') targetType?: 'LESSON' | 'CHALLENGE' | 'COURSE',
  ): Promise<BookmarkListResponseDto> {
    const bookmarks = await this.bookmarksService.findAll(user.id, targetType);
    return { bookmarks };
  }

  // ── Create Bookmark ─────────────────────────────────────

  @Post()
  @ApiOperation({ summary: 'Create a bookmark' })
  @ApiResponse({ status: 201, description: 'Bookmark created', type: BookmarkDto })
  @ApiResponse({ status: 400, description: 'Already bookmarked' })
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreateBookmarkDto,
  ): Promise<BookmarkDto> {
    return this.bookmarksService.create(user.id, dto);
  }

  // ── Delete Bookmark ─────────────────────────────────────

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bookmark' })
  @ApiParam({ name: 'id', description: 'ID of the bookmark' })
  @ApiResponse({ status: 200, description: 'Bookmark deleted', type: DeleteBookmarkResponseDto })
  @ApiResponse({ status: 403, description: 'Cannot delete another user\'s bookmark' })
  @ApiResponse({ status: 404, description: 'Bookmark not found' })
  async remove(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<DeleteBookmarkResponseDto> {
    await this.bookmarksService.remove(user.id, id);
    return { success: true };
  }
}
