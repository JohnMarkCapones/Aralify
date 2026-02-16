import { Injectable } from '@nestjs/common';
import { BookmarkTargetType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUser(userId: string, targetType?: BookmarkTargetType) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
        ...(targetType && { targetType }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: {
    userId: string;
    targetType: BookmarkTargetType;
    targetId: string;
    note?: string;
  }) {
    return this.prisma.bookmark.create({ data });
  }

  async findById(id: string) {
    return this.prisma.bookmark.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.prisma.bookmark.delete({
      where: { id },
    });
  }
}
