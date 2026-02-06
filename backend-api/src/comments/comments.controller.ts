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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser, OptionalAuth } from '../auth/decorators';
import { CommentsService } from './comments.service';
import {
  CommentsQueryDto,
  CommentsListResponseDto,
  CreateCommentDto,
  CommentResponseDto,
  UpdateCommentDto,
  DeleteCommentResponseDto,
  LikeResponseDto,
  CreateReplyDto,
  ReportCommentDto,
  ReportResponseDto,
} from './dto';

@ApiTags('Comments')
@Controller('api/v1')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // ── Get Comments ────────────────────────────────────────

  @Get('lessons/:lessonId/comments')
  @OptionalAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get comments for a lesson' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson' })
  @ApiResponse({ status: 200, description: 'Comments list', type: CommentsListResponseDto })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getComments(
    @Param('lessonId') lessonId: string,
    @Query() query: CommentsQueryDto,
    @CurrentUser() user: User | null,
  ): Promise<CommentsListResponseDto> {
    return this.commentsService.getComments(
      lessonId,
      query.sort,
      query.limit,
      query.offset,
      user?.id,
    );
  }

  // ── Create Comment ──────────────────────────────────────

  @Post('lessons/:lessonId/comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a comment on a lesson' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson' })
  @ApiResponse({ status: 201, description: 'Comment created', type: CommentResponseDto })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async createComment(
    @Param('lessonId') lessonId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: User,
  ): Promise<CommentResponseDto> {
    return this.commentsService.createComment(user.id, lessonId, dto.content);
  }

  // ── Update Comment ──────────────────────────────────────

  @Put('comments/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment (within 5 minutes of posting)' })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiResponse({ status: 200, description: 'Comment updated', type: CommentResponseDto })
  @ApiResponse({ status: 400, description: 'Edit window expired' })
  @ApiResponse({ status: 403, description: 'Cannot edit this comment' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async updateComment(
    @Param('id') commentId: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser() user: User,
  ): Promise<CommentResponseDto> {
    return this.commentsService.updateComment(user.id, commentId, dto.content);
  }

  // ── Delete Comment ──────────────────────────────────────

  @Delete('comments/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted', type: DeleteCommentResponseDto })
  @ApiResponse({ status: 403, description: 'Cannot delete this comment' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async deleteComment(
    @Param('id') commentId: string,
    @CurrentUser() user: User,
  ): Promise<DeleteCommentResponseDto> {
    return this.commentsService.deleteComment(user.id, user.role, commentId);
  }

  // ── Like Comment ────────────────────────────────────────

  @Post('comments/:id/like')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a comment' })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiResponse({ status: 200, description: 'Comment liked', type: LikeResponseDto })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async likeComment(
    @Param('id') commentId: string,
    @CurrentUser() user: User,
  ): Promise<LikeResponseDto> {
    return this.commentsService.likeComment(user.id, commentId);
  }

  // ── Unlike Comment ──────────────────────────────────────

  @Delete('comments/:id/like')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unlike a comment' })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiResponse({ status: 200, description: 'Comment unliked', type: LikeResponseDto })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async unlikeComment(
    @Param('id') commentId: string,
    @CurrentUser() user: User,
  ): Promise<LikeResponseDto> {
    return this.commentsService.unlikeComment(user.id, commentId);
  }

  // ── Reply to Comment ────────────────────────────────────

  @Post('comments/:id/reply')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reply to a comment (max 3 levels deep)' })
  @ApiParam({ name: 'id', description: 'ID of the parent comment' })
  @ApiResponse({ status: 201, description: 'Reply created', type: CommentResponseDto })
  @ApiResponse({ status: 400, description: 'Maximum nesting depth exceeded' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async replyToComment(
    @Param('id') commentId: string,
    @Body() dto: CreateReplyDto,
    @CurrentUser() user: User,
  ): Promise<CommentResponseDto> {
    return this.commentsService.replyToComment(user.id, commentId, dto.content);
  }

  // ── Report Comment ──────────────────────────────────────

  @Post('comments/:id/report')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Report a comment' })
  @ApiParam({ name: 'id', description: 'ID of the comment to report' })
  @ApiResponse({ status: 201, description: 'Report submitted', type: ReportResponseDto })
  @ApiResponse({ status: 400, description: 'Cannot report own comment or already reported' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async reportComment(
    @Param('id') commentId: string,
    @Body() dto: ReportCommentDto,
    @CurrentUser() user: User,
  ): Promise<ReportResponseDto> {
    return this.commentsService.reportComment(user.id, commentId, dto.reason, dto.details);
  }
}
