import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { RecommendationService } from './recommendation.service';
import { CurrentUser, OptionalAuth } from '../auth/decorators';
import {
  SubmitAssessmentDto,
  GenerateStudyPlanDto,
  UpdateStudyPlanDto,
} from './dto';
import { StudyPlanService } from './services/study-plan.service';

@ApiTags('Recommendations')
@Controller('api/v1/recommendations')
export class RecommendationController {
  constructor(
    private readonly recommendationService: RecommendationService,
    private readonly studyPlanService: StudyPlanService,
  ) {}

  // ========================================================================
  // Assessment & Profile
  // ========================================================================

  @Post('assess')
  @OptionalAuth()
  @ApiOperation({
    summary: 'Submit profiling assessment',
    description:
      'Submit the onboarding assessment quiz answers. Returns learning profile and recommended career paths ranked by match score. Works for both authenticated and guest users.',
  })
  @ApiResponse({ status: 201, description: 'Assessment processed, recommendations generated' })
  async submitAssessment(
    @CurrentUser() user: User | null,
    @Body() dto: SubmitAssessmentDto,
  ) {
    return this.recommendationService.submitAssessment(user?.id ?? null, dto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user learning profile' })
  @ApiResponse({ status: 200, description: 'Returns the user learning profile' })
  async getProfile(@CurrentUser() user: User) {
    const profile = await this.recommendationService.getProfile(user.id);
    if (!profile) {
      return { message: 'No learning profile found. Complete the assessment first.' };
    }
    return profile;
  }

  // ========================================================================
  // Path Recommendations
  // ========================================================================

  @Get('paths')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get recommended career paths',
    description: 'Returns career paths ranked by match score based on user profile.',
  })
  @ApiResponse({ status: 200, description: 'Returns ranked career path recommendations' })
  async getRecommendedPaths(@CurrentUser() user: User) {
    return this.recommendationService.getRecommendedPaths(user.id);
  }

  // ========================================================================
  // Next Lesson
  // ========================================================================

  @Get('next-lesson')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get next recommended lesson',
    description:
      'Returns the next recommended lesson based on career path progress, adaptive difficulty, and engagement signals.',
  })
  @ApiResponse({ status: 200, description: 'Returns next lesson recommendation' })
  async getNextLesson(@CurrentUser() user: User) {
    return this.recommendationService.getNextLesson(user.id);
  }

  // ========================================================================
  // Difficulty Calibration
  // ========================================================================

  @Post('recalibrate')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Recalibrate difficulty',
    description:
      'Force a difficulty recalibration based on recent performance data. Returns old and new difficulty scores with explanation.',
  })
  @ApiResponse({ status: 200, description: 'Recalibration result' })
  async recalibrate(@CurrentUser() user: User) {
    return this.recommendationService.recalibrate(user.id);
  }

  // ========================================================================
  // Recommendation Actions
  // ========================================================================

  @Post('dismiss/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dismiss a recommendation' })
  @ApiResponse({ status: 200, description: 'Recommendation dismissed' })
  async dismissRecommendation(@Param('id') id: string) {
    return this.recommendationService.dismissRecommendation(id);
  }

  // ========================================================================
  // Collaborative Filtering
  // ========================================================================

  @Get('similar-users')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get collaborative recommendations',
    description: 'Courses recommended by users with similar profiles.',
  })
  @ApiResponse({ status: 200, description: 'Returns collaborative course recommendations' })
  async getCollaborativeRecommendations(@CurrentUser() user: User) {
    return this.recommendationService.getCollaborativeRecommendations(user.id);
  }

  // ========================================================================
  // Study Plan
  // ========================================================================

  @Post('study-plan')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Generate a new study plan',
    description: 'Creates a daily study plan based on career path and time commitment.',
  })
  @ApiResponse({ status: 201, description: 'Study plan generated' })
  async generateStudyPlan(
    @CurrentUser() user: User,
    @Body() dto: GenerateStudyPlanDto,
  ) {
    return this.studyPlanService.generatePlan(user.id, {
      careerPathId: dto.careerPathId,
      dailyMinutes: dto.dailyMinutes,
    });
  }

  @Get('study-plan')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get active study plan' })
  @ApiResponse({ status: 200, description: 'Returns the active study plan' })
  async getStudyPlan(@CurrentUser() user: User) {
    const plan = await this.studyPlanService.getActivePlan(user.id);
    if (!plan) {
      return { message: 'No active study plan. Generate one first.' };
    }
    return plan;
  }

  @Get('study-plan/today')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get today's study plan items" })
  @ApiResponse({ status: 200, description: "Returns today's plan items" })
  async getTodayPlan(@CurrentUser() user: User) {
    const today = await this.studyPlanService.getTodayPlan(user.id);
    if (!today) {
      return { message: 'No active study plan.' };
    }
    return today;
  }

  @Post('study-plan/items/:itemId/complete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark a study plan item as completed' })
  @ApiResponse({ status: 200, description: 'Item marked as completed' })
  async completeStudyPlanItem(@Param('itemId') itemId: string) {
    return this.studyPlanService.completeItem(itemId);
  }

  @Patch('study-plan/:planId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update study plan (pause/resume, change daily minutes)' })
  @ApiResponse({ status: 200, description: 'Plan updated' })
  async updateStudyPlan(
    @Param('planId') planId: string,
    @Body() dto: UpdateStudyPlanDto,
  ) {
    return this.studyPlanService.updatePlan(planId, dto);
  }
}
