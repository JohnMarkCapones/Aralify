import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LessonsService } from './lessons.service';
import { Public, CurrentUser } from '../auth/decorators';
import {
  LessonDetailDto,
  StartLessonResponseDto,
  CompleteLessonResponseDto,
  LessonQuizzesResponseDto,
  LessonChallengesResponseDto,
  LessonHintsResponseDto,
  UnlockHintResponseDto,
  SubmitQuizAnswerResponseDto,
  CompleteLessonDto,
  SubmitQuizAnswerDto,
  UnlockHintDto,
  QuizResultsResponseDto,
  QuizHintsResponseDto,
  UnlockQuizHintResponseDto,
  UnlockQuizHintDto,
  SubmitChallengeDto,
  ChallengeSubmissionResponseDto,
} from './dto';
import { QuizService } from './services/quiz.service';
import { ChallengeService } from './services/challenge.service';

@ApiTags('Lessons')
@Controller('api/v1/lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly quizService: QuizService,
    private readonly challengeService: ChallengeService,
  ) {}

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get lesson content with quizzes and challenges' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns lesson details with content',
    type: LessonDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async findById(
    @Param('id') id: string,
    @CurrentUser() user?: User,
  ): Promise<LessonDetailDto> {
    return this.lessonsService.findById(id, user?.id);
  }

  @Post(':id/start')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start a lesson and create progress record' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson started successfully',
    type: StartLessonResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Level not unlocked' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async startLesson(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<StartLessonResponseDto> {
    return this.lessonsService.startLesson(id, user.id);
  }

  @Post(':id/complete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete a lesson and award XP with difficulty multiplier' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson completed successfully',
    type: CompleteLessonResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Lesson must be started before completing' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async completeLesson(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: CompleteLessonDto,
  ): Promise<CompleteLessonResponseDto> {
    return this.lessonsService.completeLesson(id, user.id, dto);
  }

  @Get(':id/quizzes')
  @Public()
  @ApiOperation({ summary: 'Get quiz questions for a lesson (answers excluded)' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns quiz questions without correct answers',
    type: LessonQuizzesResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getQuizzes(@Param('id') id: string): Promise<LessonQuizzesResponseDto> {
    return this.lessonsService.getQuizzes(id);
  }

  @Post(':id/quizzes/:quizId/answer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit an answer to a quiz question' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiParam({ name: 'quizId', example: 'quiz-clx123-0', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Answer checked, XP awarded if correct',
    type: SubmitQuizAnswerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or quiz not found' })
  async submitQuizAnswer(
    @Param('id') id: string,
    @Param('quizId') quizId: string,
    @CurrentUser() user: User,
    @Body() dto: SubmitQuizAnswerDto,
  ): Promise<SubmitQuizAnswerResponseDto> {
    return this.lessonsService.submitQuizAnswer(id, quizId, user.id, dto);
  }

  @Get(':id/quizzes/results')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get quiz results for a lesson' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns quiz results with score percentage and per-question breakdown',
    type: QuizResultsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getQuizResults(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<QuizResultsResponseDto> {
    return this.quizService.getQuizResults(id, user.id);
  }

  @Get(':id/quizzes/:quizId/hints')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get hints for a quiz with unlock status' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiParam({ name: 'quizId', example: 'quiz-clx123-0', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns quiz hints with unlock status',
    type: QuizHintsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or quiz not found' })
  async getQuizHints(
    @Param('id') id: string,
    @Param('quizId') quizId: string,
    @CurrentUser() user: User,
  ): Promise<QuizHintsResponseDto> {
    return this.quizService.getQuizHints(id, quizId, user.id);
  }

  @Post(':id/quizzes/:quizId/hint-unlock')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unlock a quiz hint' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiParam({ name: 'quizId', example: 'quiz-clx123-0', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Hint unlocked successfully',
    type: UnlockQuizHintResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid hint index or already unlocked' })
  @ApiResponse({ status: 404, description: 'Lesson or quiz not found' })
  async unlockQuizHint(
    @Param('id') id: string,
    @Param('quizId') quizId: string,
    @CurrentUser() user: User,
    @Body() dto: UnlockQuizHintDto,
  ): Promise<UnlockQuizHintResponseDto> {
    return this.quizService.unlockQuizHint(id, quizId, user.id, dto.hintIndex);
  }

  @Get(':id/challenges')
  @Public()
  @ApiOperation({ summary: 'Get code challenges for a lesson (solutions excluded)' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns challenges without solution code',
    type: LessonChallengesResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getChallenges(@Param('id') id: string): Promise<LessonChallengesResponseDto> {
    return this.lessonsService.getChallenges(id);
  }

  @Post(':id/challenges/:challengeId/submit')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit code for a challenge (storage only, no execution)' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiParam({ name: 'challengeId', example: 'clx0987654321', description: 'Challenge ID' })
  @ApiResponse({
    status: 200,
    description: 'Code submitted successfully',
    type: ChallengeSubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or challenge not found' })
  async submitChallenge(
    @Param('id') id: string,
    @Param('challengeId') challengeId: string,
    @CurrentUser() user: User,
    @Body() dto: SubmitChallengeDto,
  ): Promise<ChallengeSubmissionResponseDto> {
    return this.challengeService.submitChallenge(
      id,
      challengeId,
      user.id,
      dto.code,
      dto.languageId,
      dto.timeSpentSeconds,
    );
  }

  @Get(':id/hints')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get hints for a challenge with unlock status' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiQuery({ name: 'challengeId', example: 'clx0987654321', description: 'Challenge ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns hints with unlock status',
    type: LessonHintsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or challenge not found' })
  async getHints(
    @Param('id') id: string,
    @Query('challengeId') challengeId: string,
    @CurrentUser() user: User,
  ): Promise<LessonHintsResponseDto> {
    return this.lessonsService.getHints(id, user.id, challengeId);
  }

  @Post(':id/hint-unlock')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unlock the next hint for a challenge' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Hint unlocked successfully',
    type: UnlockHintResponseDto,
  })
  @ApiResponse({ status: 400, description: 'All hints already unlocked' })
  @ApiResponse({ status: 404, description: 'Lesson or challenge not found' })
  async unlockHint(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UnlockHintDto,
  ): Promise<UnlockHintResponseDto> {
    return this.lessonsService.unlockHint(id, user.id, dto);
  }
}
