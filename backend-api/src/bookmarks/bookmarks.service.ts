import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookmarkTargetType } from '@prisma/client';
import { BookmarksRepository } from './bookmarks.repository';
import { CreateBookmarkDto, BookmarkDto } from './dto';

@Injectable()
export class BookmarksService {
  constructor(private readonly bookmarksRepository: BookmarksRepository) {}

  async findAll(
    userId: string,
    targetType?: string,
  ): Promise<BookmarkDto[]> {
    const filter = targetType
      ? (targetType as BookmarkTargetType)
      : undefined;

    const bookmarks = await this.bookmarksRepository.findByUser(userId, filter);

    return bookmarks.map((bookmark) => ({
      id: bookmark.id,
      targetType: bookmark.targetType,
      targetId: bookmark.targetId,
      note: bookmark.note,
      createdAt: bookmark.createdAt.toISOString(),
    }));
  }

  async create(userId: string, dto: CreateBookmarkDto): Promise<BookmarkDto> {
    try {
      const bookmark = await this.bookmarksRepository.create({
        userId,
        targetType: dto.targetType as BookmarkTargetType,
        targetId: dto.targetId,
        note: dto.note,
      });

      return {
        id: bookmark.id,
        targetType: bookmark.targetType,
        targetId: bookmark.targetId,
        note: bookmark.note,
        createdAt: bookmark.createdAt.toISOString(),
      };
    } catch (error: any) {
      // Prisma unique constraint violation code
      if (error?.code === 'P2002') {
        throw new BadRequestException('You have already bookmarked this item');
      }
      throw error;
    }
  }

  async remove(userId: string, id: string): Promise<void> {
    const bookmark = await this.bookmarksRepository.findById(id);

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    if (bookmark.userId !== userId) {
      throw new ForbiddenException('You can only delete your own bookmarks');
    }

    await this.bookmarksRepository.delete(id);
  }
}
