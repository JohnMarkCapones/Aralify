import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportReason, UserRole } from '@prisma/client';
import { CommentsRepository } from './comments.repository';
import {
  CommentAuthorDto,
  CommentDto,
  CommentResponseDto,
  CommentsListResponseDto,
  CommentSortOrder,
  DeleteCommentResponseDto,
  LikeResponseDto,
  ReportResponseDto,
} from './dto';

const DEFAULT_LIMIT = 20;
const MAX_NESTING_DEPTH = 3;
const EDIT_WINDOW_MINUTES = 5;

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getComments(
    lessonId: string,
    sort?: CommentSortOrder,
    limit?: number,
    offset?: number,
    userId?: string,
  ): Promise<CommentsListResponseDto> {
    const l = limit ?? DEFAULT_LIMIT;
    const o = offset ?? 0;
    const s = sort ?? CommentSortOrder.NEWEST;

    const lessonExists = await this.commentsRepository.lessonExists(lessonId);
    if (!lessonExists) {
      throw new NotFoundException('Lesson not found');
    }

    const { comments, total } = await this.commentsRepository.getCommentsByLessonId(
      lessonId,
      s,
      l,
      o,
    );

    // Collect all comment IDs (including nested replies) to check liked status
    const allCommentIds = this.collectCommentIds(comments);
    const likedCommentIds = userId
      ? await this.commentsRepository.getUserLikedCommentIds(userId, allCommentIds)
      : [];

    const likedSet = new Set(likedCommentIds);

    return {
      comments: comments.map((c) => this.formatComment(c, likedSet)),
      total,
      limit: l,
      offset: o,
      has_more: o + l < total,
    };
  }

  async createComment(
    userId: string,
    lessonId: string,
    content: string,
  ): Promise<CommentResponseDto> {
    const lessonExists = await this.commentsRepository.lessonExists(lessonId);
    if (!lessonExists) {
      throw new NotFoundException('Lesson not found');
    }

    const comment = await this.commentsRepository.createComment(userId, lessonId, content);

    return {
      success: true,
      comment: this.formatComment(comment, new Set()),
    };
  }

  async updateComment(
    userId: string,
    commentId: string,
    content: string,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsRepository.getCommentById(commentId);

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }

    // Check edit window
    const editWindowEnd = new Date(comment.createdAt);
    editWindowEnd.setMinutes(editWindowEnd.getMinutes() + EDIT_WINDOW_MINUTES);

    if (new Date() > editWindowEnd) {
      throw new BadRequestException(
        `Comments can only be edited within ${EDIT_WINDOW_MINUTES} minutes of posting`,
      );
    }

    const updatedComment = await this.commentsRepository.updateComment(commentId, content);

    const likedCommentIds = await this.commentsRepository.getUserLikedCommentIds(
      userId,
      this.collectCommentIds([updatedComment]),
    );

    return {
      success: true,
      comment: this.formatComment(updatedComment, new Set(likedCommentIds)),
    };
  }

  async deleteComment(
    userId: string,
    userRole: UserRole,
    commentId: string,
  ): Promise<DeleteCommentResponseDto> {
    const comment = await this.commentsRepository.getCommentById(commentId);

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }

    const isOwner = comment.userId === userId;
    const isAdminOrMod = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;

    if (!isOwner && !isAdminOrMod) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentsRepository.softDeleteComment(commentId);

    return { success: true };
  }

  async likeComment(userId: string, commentId: string): Promise<LikeResponseDto> {
    const comment = await this.commentsRepository.getCommentById(commentId);

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }

    const likesCount = await this.commentsRepository.likeComment(userId, commentId);

    return { success: true, likesCount };
  }

  async unlikeComment(userId: string, commentId: string): Promise<LikeResponseDto> {
    const comment = await this.commentsRepository.getCommentById(commentId);

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }

    const likesCount = await this.commentsRepository.unlikeComment(userId, commentId);

    return { success: true, likesCount };
  }

  async replyToComment(
    userId: string,
    commentId: string,
    content: string,
  ): Promise<CommentResponseDto> {
    const parentComment = await this.commentsRepository.getCommentById(commentId);

    if (!parentComment || parentComment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }

    // Check nesting depth
    const depth = await this.commentsRepository.getCommentDepth(commentId);
    if (depth >= MAX_NESTING_DEPTH - 1) {
      throw new BadRequestException(
        `Maximum reply depth of ${MAX_NESTING_DEPTH} levels exceeded`,
      );
    }

    const reply = await this.commentsRepository.createReply(
      userId,
      parentComment.lessonId,
      commentId,
      content,
    );

    return {
      success: true,
      comment: this.formatComment(reply, new Set()),
    };
  }

  async reportComment(
    userId: string,
    commentId: string,
    reason: ReportReason,
    details?: string,
  ): Promise<ReportResponseDto> {
    const comment = await this.commentsRepository.getCommentById(commentId);

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId === userId) {
      throw new BadRequestException('You cannot report your own comment');
    }

    // Check if already reported by this user
    const existingReport = await this.commentsRepository.findReport(userId, commentId);
    if (existingReport) {
      throw new BadRequestException('You have already reported this comment');
    }

    const report = await this.commentsRepository.createReport(
      userId,
      commentId,
      reason,
      details,
    );

    return {
      success: true,
      reportId: report.id,
    };
  }

  private collectCommentIds(comments: any[]): string[] {
    const ids: string[] = [];

    const collect = (commentList: any[]) => {
      for (const comment of commentList) {
        ids.push(comment.id);
        if (comment.replies && comment.replies.length > 0) {
          collect(comment.replies);
        }
      }
    };

    collect(comments);
    return ids;
  }

  private formatComment(comment: any, likedSet: Set<string>): CommentDto {
    const author: CommentAuthorDto = {
      userId: comment.user.id,
      username: comment.user.username,
      displayName: comment.user.displayName,
      avatarUrl: comment.user.avatarUrl,
    };

    const replies = comment.replies
      ? comment.replies.map((r: any) => this.formatComment(r, likedSet))
      : [];

    return {
      id: comment.id,
      lessonId: comment.lessonId,
      author,
      content: comment.deletedAt ? '[deleted]' : comment.content,
      isEdited: comment.isEdited,
      likesCount: comment.likesCount ?? 0,
      isPinned: comment.isPinned ?? false,
      isDeleted: !!comment.deletedAt,
      isLikedByMe: likedSet.has(comment.id),
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      replies,
      repliesCount: replies.length,
    };
  }
}
