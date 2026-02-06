import { Injectable } from '@nestjs/common';
import { ReportReason } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CommentSortOrder } from './dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly commentUserSelect = {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
  };

  private readonly replyInclude = {
    user: { select: this.commentUserSelect },
    replies: {
      where: { deletedAt: null },
      include: {
        user: { select: this.commentUserSelect },
        replies: {
          where: { deletedAt: null },
          include: {
            user: { select: this.commentUserSelect },
          },
          orderBy: { createdAt: 'asc' as const },
        },
      },
      orderBy: { createdAt: 'asc' as const },
    },
  };

  private getSortOrder(sort: CommentSortOrder) {
    switch (sort) {
      case CommentSortOrder.OLDEST:
        return { createdAt: 'asc' as const };
      case CommentSortOrder.POPULAR:
        return { likesCount: 'desc' as const };
      case CommentSortOrder.NEWEST:
      default:
        return { createdAt: 'desc' as const };
    }
  }

  async getCommentsByLessonId(
    lessonId: string,
    sort: CommentSortOrder,
    limit: number,
    offset: number,
  ) {
    const orderBy = this.getSortOrder(sort);

    const [comments, total] = await Promise.all([
      this.prisma.comment.findMany({
        where: {
          lessonId,
          parentId: null,
          deletedAt: null,
        },
        include: {
          user: { select: this.commentUserSelect },
          replies: {
            where: { deletedAt: null },
            include: this.replyInclude,
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy,
        take: limit,
        skip: offset,
      }),
      this.prisma.comment.count({
        where: {
          lessonId,
          parentId: null,
          deletedAt: null,
        },
      }),
    ]);

    return { comments, total };
  }

  async getUserLikedCommentIds(userId: string, commentIds: string[]): Promise<string[]> {
    if (commentIds.length === 0) return [];

    const likes = await this.prisma.commentLike.findMany({
      where: {
        userId,
        commentId: { in: commentIds },
      },
      select: { commentId: true },
    });

    return likes.map((like) => like.commentId);
  }

  async getCommentById(commentId: string) {
    return this.prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: { select: this.commentUserSelect },
        replies: {
          where: { deletedAt: null },
          include: this.replyInclude,
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async createComment(userId: string, lessonId: string, content: string) {
    return this.prisma.comment.create({
      data: {
        userId,
        lessonId,
        content,
      },
      include: {
        user: { select: this.commentUserSelect },
        replies: true,
      },
    });
  }

  async createReply(userId: string, lessonId: string, parentId: string, content: string) {
    return this.prisma.comment.create({
      data: {
        userId,
        lessonId,
        parentId,
        content,
      },
      include: {
        user: { select: this.commentUserSelect },
        replies: true,
      },
    });
  }

  async updateComment(commentId: string, content: string) {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
        isEdited: true,
      },
      include: {
        user: { select: this.commentUserSelect },
        replies: {
          where: { deletedAt: null },
          include: this.replyInclude,
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async softDeleteComment(commentId: string) {
    await this.prisma.comment.update({
      where: { id: commentId },
      data: {
        deletedAt: new Date(),
        content: '[deleted]',
      },
    });
  }

  async likeComment(userId: string, commentId: string): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      // Check if already liked
      const existingLike = await tx.commentLike.findUnique({
        where: { userId_commentId: { userId, commentId } },
      });

      if (!existingLike) {
        await tx.commentLike.create({
          data: { userId, commentId },
        });

        await tx.comment.update({
          where: { id: commentId },
          data: { likesCount: { increment: 1 } },
        });
      }

      const comment = await tx.comment.findUnique({
        where: { id: commentId },
        select: { likesCount: true },
      });

      return comment?.likesCount ?? 0;
    });
  }

  async unlikeComment(userId: string, commentId: string): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      const existingLike = await tx.commentLike.findUnique({
        where: { userId_commentId: { userId, commentId } },
      });

      if (existingLike) {
        await tx.commentLike.delete({
          where: { userId_commentId: { userId, commentId } },
        });

        await tx.comment.update({
          where: { id: commentId },
          data: { likesCount: { decrement: 1 } },
        });
      }

      const comment = await tx.comment.findUnique({
        where: { id: commentId },
        select: { likesCount: true },
      });

      return comment?.likesCount ?? 0;
    });
  }

  async findLike(userId: string, commentId: string) {
    return this.prisma.commentLike.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });
  }

  async getCommentDepth(commentId: string): Promise<number> {
    let depth = 0;
    let currentId: string | null = commentId;

    while (currentId) {
      const result: { parentId: string | null } | null =
        await this.prisma.comment.findUnique({
          where: { id: currentId },
          select: { parentId: true },
        });

      if (!result || !result.parentId) {
        break;
      }

      depth++;
      currentId = result.parentId;
    }

    return depth;
  }

  async createReport(
    userId: string,
    commentId: string,
    reason: ReportReason,
    details?: string,
  ) {
    return this.prisma.commentReport.create({
      data: {
        userId,
        commentId,
        reason,
        details,
      },
    });
  }

  async findReport(userId: string, commentId: string) {
    return this.prisma.commentReport.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });
  }

  async lessonExists(lessonId: string): Promise<boolean> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true },
    });

    return !!lesson;
  }
}
