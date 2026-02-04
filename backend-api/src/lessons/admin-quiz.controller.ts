import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { LessonsRepository } from './lessons.repository';
import { Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  AdminCreateQuizDto,
  AdminUpdateQuizDto,
  AdminBulkCreateQuizDto,
  AdminQuizResponseDto,
  AdminBulkCreateQuizResponseDto,
  AdminDeleteQuizResponseDto,
} from './dto';

@ApiTags('Admin - Quizzes')
@ApiBearerAuth()
@Controller('api/v1/admin/lessons/:lessonId/quizzes')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminQuizController {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  @Get()
  @ApiOperation({ summary: 'Get all quizzes for a lesson (admin)' })
  @ApiParam({ name: 'lessonId', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all quizzes with full details including answers',
    type: [AdminQuizResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getQuizzes(
    @Param('lessonId') lessonId: string,
  ): Promise<AdminQuizResponseDto[]> {
    const lesson = await this.lessonsRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const quizzes = await this.lessonsRepository.findQuizzesByLessonId(lessonId);
    return quizzes.map((quiz) => ({
      id: quiz.id,
      lessonId: quiz.lessonId,
      type: quiz.type,
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
      explanation: quiz.explanation,
      hints: quiz.hints as string[] | null,
      difficulty: quiz.difficulty,
      orderIndex: quiz.orderIndex,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID (admin)' })
  @ApiParam({ name: 'lessonId', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiParam({ name: 'id', example: 'quiz-clx123-0', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns quiz with full details',
    type: AdminQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or quiz not found' })
  async getQuiz(
    @Param('lessonId') lessonId: string,
    @Param('id') id: string,
  ): Promise<AdminQuizResponseDto> {
    const lesson = await this.lessonsRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const quiz = await this.lessonsRepository.getQuizById(id);
    if (!quiz || quiz.lessonId !== lessonId) {
      throw new NotFoundException('Quiz not found in this lesson');
    }

    return {
      id: quiz.id,
      lessonId: quiz.lessonId,
      type: quiz.type,
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
      explanation: quiz.explanation,
      hints: quiz.hints as string[] | null,
      difficulty: quiz.difficulty,
      orderIndex: quiz.orderIndex,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiParam({ name: 'lessonId', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 201,
    description: 'Quiz created successfully',
    type: AdminQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async createQuiz(
    @Param('lessonId') lessonId: string,
    @Body() dto: AdminCreateQuizDto,
  ): Promise<AdminQuizResponseDto> {
    const lesson = await this.lessonsRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const quiz = await this.lessonsRepository.createQuiz(lessonId, {
      type: dto.type,
      question: dto.question,
      options: dto.options,
      correctAnswer: dto.correctAnswer,
      explanation: dto.explanation,
      hints: dto.hints,
      difficulty: dto.difficulty,
      orderIndex: dto.orderIndex,
    });

    return {
      id: quiz.id,
      lessonId: quiz.lessonId,
      type: quiz.type,
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
      explanation: quiz.explanation,
      hints: quiz.hints as string[] | null,
      difficulty: quiz.difficulty,
      orderIndex: quiz.orderIndex,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a quiz' })
  @ApiParam({ name: 'lessonId', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiParam({ name: 'id', example: 'quiz-clx123-0', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz updated successfully',
    type: AdminQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or quiz not found' })
  async updateQuiz(
    @Param('lessonId') lessonId: string,
    @Param('id') id: string,
    @Body() dto: AdminUpdateQuizDto,
  ): Promise<AdminQuizResponseDto> {
    const lesson = await this.lessonsRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const existingQuiz = await this.lessonsRepository.getQuizById(id);
    if (!existingQuiz || existingQuiz.lessonId !== lessonId) {
      throw new NotFoundException('Quiz not found in this lesson');
    }

    const quiz = await this.lessonsRepository.updateQuiz(id, {
      type: dto.type,
      question: dto.question,
      options: dto.options,
      correctAnswer: dto.correctAnswer,
      explanation: dto.explanation,
      hints: dto.hints,
      difficulty: dto.difficulty,
      orderIndex: dto.orderIndex,
    });

    return {
      id: quiz.id,
      lessonId: quiz.lessonId,
      type: quiz.type,
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
      explanation: quiz.explanation,
      hints: quiz.hints as string[] | null,
      difficulty: quiz.difficulty,
      orderIndex: quiz.orderIndex,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiParam({ name: 'lessonId', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiParam({ name: 'id', example: 'quiz-clx123-0', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz deleted successfully',
    type: AdminDeleteQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or quiz not found' })
  async deleteQuiz(
    @Param('lessonId') lessonId: string,
    @Param('id') id: string,
  ): Promise<AdminDeleteQuizResponseDto> {
    const lesson = await this.lessonsRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const existingQuiz = await this.lessonsRepository.getQuizById(id);
    if (!existingQuiz || existingQuiz.lessonId !== lessonId) {
      throw new NotFoundException('Quiz not found in this lesson');
    }

    await this.lessonsRepository.deleteQuiz(id);

    return {
      success: true,
      deletedId: id,
    };
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Bulk create quizzes' })
  @ApiParam({ name: 'lessonId', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 201,
    description: 'Quizzes created successfully',
    type: AdminBulkCreateQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async bulkCreateQuizzes(
    @Param('lessonId') lessonId: string,
    @Body() dto: AdminBulkCreateQuizDto,
  ): Promise<AdminBulkCreateQuizResponseDto> {
    const lesson = await this.lessonsRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const quizzes = await this.lessonsRepository.bulkCreateQuizzes(
      lessonId,
      dto.quizzes.map((q) => ({
        type: q.type,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        hints: q.hints,
        difficulty: q.difficulty,
        orderIndex: q.orderIndex,
      })),
    );

    return {
      success: true,
      createdCount: quizzes.length,
      quizzes: quizzes.map((quiz) => ({
        id: quiz.id,
        lessonId: quiz.lessonId,
        type: quiz.type,
        question: quiz.question,
        options: quiz.options,
        correctAnswer: quiz.correctAnswer,
        explanation: quiz.explanation,
        hints: quiz.hints as string[] | null,
        difficulty: quiz.difficulty,
        orderIndex: quiz.orderIndex,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
      })),
    };
  }
}
