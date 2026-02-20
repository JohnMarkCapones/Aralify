import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RecommendationRepository } from '../recommendation.repository';
import { STUDY_PLAN } from '../constants/scoring.constants';
import { DifficultyCalibrationService } from './difficulty-calibration.service';

interface PlanItem {
  dayNumber: number;
  lessonId?: string;
  courseId?: string;
  type: 'LEARN' | 'REVIEW' | 'CHALLENGE' | 'REST' | 'MILESTONE';
  title?: string;
  description?: string;
  estimatedMins: number;
  orderIndex: number;
}

/**
 * Layer 7: Study Plan Generator
 *
 * Generates a concrete daily/weekly study plan by combining:
 * - Career path node order (knowledge graph traversal)
 * - User's daily commitment time
 * - Adaptive difficulty recommendations
 * - Spaced repetition review sessions (every 5th day)
 * - Rest days (every 14th day)
 * - Milestone celebrations (achievements/level completions)
 */
@Injectable()
export class StudyPlanService {
  private readonly logger = new Logger(StudyPlanService.name);

  constructor(
    private readonly repository: RecommendationRepository,
    private readonly difficultyService: DifficultyCalibrationService,
  ) {}

  /**
   * Generate a complete study plan for a user.
   * If careerPathId is provided, follows the path's node order.
   * Otherwise, generates from the user's current course progress.
   */
  async generatePlan(
    userId: string,
    options: {
      careerPathId?: string;
      dailyMinutes?: number;
    } = {},
  ) {
    const profile = await this.repository.getLearningProfile(userId);
    const dailyMinutes = options.dailyMinutes ||
      profile?.difficultyScore
        ? STUDY_PLAN.defaultDailyMinutes
        : STUDY_PLAN.defaultDailyMinutes;

    // Deactivate any existing active plans
    await this.repository.deactivateExistingPlans(userId);

    let lessons: any[] = [];
    let title = 'Personal Study Plan';

    if (options.careerPathId) {
      // Follow career path node order
      const pathData = await this.repository.findCareerPathById(options.careerPathId);
      if (!pathData) throw new NotFoundException('Career path not found');

      title = `${pathData.title} Study Plan`;

      // Collect lessons from each node's mapped course
      for (const node of pathData.nodes) {
        if (node.courseId) {
          const courseLessons = await this.repository.getNextUncompletedLessons(
            userId,
            node.courseId,
            50, // get all remaining
          );
          lessons.push(
            ...courseLessons.map((l) => ({
              ...l,
              pathNodeName: node.skillName,
            })),
          );
        }
      }
    } else {
      // No career path — pull from user's active courses
      const userPaths = await this.repository.getUserCareerPaths(userId);
      const activePath = userPaths.find((p: any) => p.status === 'ACTIVE');

      if (activePath) {
        for (const node of activePath.careerPath.nodes) {
          if (node.courseId) {
            const courseLessons = await this.repository.getNextUncompletedLessons(
              userId,
              node.courseId,
              50,
            );
            lessons.push(...courseLessons);
          }
        }
        title = `${activePath.careerPath.title} Study Plan`;
      }
    }

    if (lessons.length === 0) {
      this.logger.warn(`No uncompleted lessons found for user ${userId} study plan`);
    }

    // Build the day-by-day plan
    const planItems = this.buildDayPlan(lessons, dailyMinutes);
    const totalDays = planItems.length > 0
      ? Math.max(...planItems.map((i) => i.dayNumber))
      : 0;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + totalDays);

    const plan = await this.repository.createStudyPlan({
      userId,
      careerPathId: options.careerPathId,
      title,
      dailyMinutes,
      totalDays,
      endDate,
      items: planItems,
    });

    this.logger.log(
      `Generated study plan for user ${userId}: ${totalDays} days, ${planItems.length} items`,
    );

    return this.formatPlan(plan);
  }

  /**
   * Get the active study plan for a user.
   */
  async getActivePlan(userId: string) {
    const plan = await this.repository.getActiveStudyPlan(userId);
    if (!plan) return null;
    return this.formatPlan(plan);
  }

  /**
   * Get today's study plan items.
   */
  async getTodayPlan(userId: string) {
    const plan = await this.repository.getActiveStudyPlan(userId);
    if (!plan) return null;

    // Calculate current day number
    const startDate = plan.startDate || plan.createdAt;
    const now = new Date();
    const daysSinceStart = Math.floor(
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const currentDay = daysSinceStart + 1;

    const todayItems = (plan.items as any[]).filter((item) => item.dayNumber === currentDay);

    return {
      dayNumber: currentDay,
      items: todayItems.map((item) => ({
        id: item.id,
        dayNumber: item.dayNumber,
        type: item.type,
        title: item.title,
        description: item.description,
        estimatedMins: item.estimatedMins,
        lessonId: item.lessonId,
        courseId: item.courseId,
        isCompleted: item.isCompleted,
        completedAt: item.completedAt,
      })),
      totalEstimatedMins: todayItems.reduce((sum: number, i: any) => sum + i.estimatedMins, 0),
      completedCount: todayItems.filter((i: any) => i.isCompleted).length,
      totalCount: todayItems.length,
      motivationalMessage: this.getMotivationalMessage(currentDay, plan.totalDays),
    };
  }

  /**
   * Mark a study plan item as completed.
   */
  async completeItem(itemId: string) {
    return this.repository.completeStudyPlanItem(itemId);
  }

  /**
   * Update plan status or settings.
   */
  async updatePlan(planId: string, data: { status?: string; dailyMinutes?: number }) {
    return this.repository.updateStudyPlan(planId, data as any);
  }

  // ========================================================================
  // Plan building algorithm
  // ========================================================================

  /**
   * Distribute lessons across days based on daily time budget.
   * Inserts review sessions every 5th day and rest days every 14th day.
   */
  private buildDayPlan(lessons: any[], dailyMinutes: number): PlanItem[] {
    const items: PlanItem[] = [];
    let currentDay = 1;
    let dayTimeUsed = 0;
    let orderIndex = 0;
    let lessonIndex = 0;
    let lessonsInCycle = 0;

    while (lessonIndex < lessons.length && currentDay <= STUDY_PLAN.maxPlanDays) {
      // Check for rest day
      if (currentDay > 1 && currentDay % STUDY_PLAN.restIntervalDays === 0) {
        items.push({
          dayNumber: currentDay,
          type: 'REST',
          title: 'Rest Day',
          description: 'Take a break! Rest is essential for learning retention.',
          estimatedMins: 0,
          orderIndex: 0,
        });
        currentDay++;
        dayTimeUsed = 0;
        continue;
      }

      // Check for review day
      if (currentDay > 1 && currentDay % STUDY_PLAN.reviewIntervalDays === 0) {
        items.push({
          dayNumber: currentDay,
          type: 'REVIEW',
          title: 'Review Session',
          description: 'Review what you\'ve learned in the past few days.',
          estimatedMins: STUDY_PLAN.reviewDurationMins,
          orderIndex: 0,
        });
        dayTimeUsed += STUDY_PLAN.reviewDurationMins;
      }

      // Fill remaining time with lessons
      while (
        lessonIndex < lessons.length &&
        dayTimeUsed + STUDY_PLAN.avgLessonDurationMins <= dailyMinutes
      ) {
        const lesson = lessons[lessonIndex];
        items.push({
          dayNumber: currentDay,
          lessonId: lesson.id,
          courseId: lesson.level?.course?.id,
          type: 'LEARN',
          title: lesson.title,
          description: lesson.pathNodeName
            ? `${lesson.pathNodeName} — ${lesson.level?.course?.title || ''}`
            : lesson.level?.course?.title,
          estimatedMins: STUDY_PLAN.avgLessonDurationMins,
          orderIndex: orderIndex++,
        });

        dayTimeUsed += STUDY_PLAN.avgLessonDurationMins;
        lessonIndex++;
        lessonsInCycle++;

        // Insert milestone every 10 lessons
        if (lessonsInCycle > 0 && lessonsInCycle % 10 === 0) {
          items.push({
            dayNumber: currentDay,
            type: 'MILESTONE',
            title: `Milestone: ${lessonsInCycle} Lessons Completed!`,
            description: 'Celebrate your progress! You\'ve come a long way.',
            estimatedMins: 0,
            orderIndex: orderIndex++,
          });
        }
      }

      // Move to next day
      currentDay++;
      dayTimeUsed = 0;
    }

    return items;
  }

  // ========================================================================
  // Helpers
  // ========================================================================

  private formatPlan(plan: any) {
    const items: any[] = plan.items || [];
    const completedItems = items.filter((i) => i.isCompleted);
    const totalItems = items.length;

    return {
      id: plan.id,
      title: plan.title,
      status: plan.status,
      dailyMinutes: plan.dailyMinutes,
      totalDays: plan.totalDays,
      completedDays: plan.completedDays,
      completionPercentage:
        totalItems > 0 ? Math.round((completedItems.length / totalItems) * 100 * 10) / 10 : 0,
      startDate: plan.startDate,
      endDate: plan.endDate,
      upcomingItems: items
        .filter((i) => !i.isCompleted)
        .slice(0, 14)
        .map((item) => ({
          id: item.id,
          dayNumber: item.dayNumber,
          type: item.type,
          title: item.title,
          description: item.description,
          estimatedMins: item.estimatedMins,
          lessonId: item.lessonId,
          courseId: item.courseId,
          isCompleted: item.isCompleted,
          completedAt: item.completedAt,
        })),
    };
  }

  private getMotivationalMessage(currentDay: number, totalDays: number): string {
    const progress = totalDays > 0 ? currentDay / totalDays : 0;

    if (currentDay === 1) return 'Welcome to your study plan! Let\'s begin your learning journey.';
    if (progress >= 0.9) return 'Almost there! You\'re in the final stretch!';
    if (progress >= 0.75) return 'Three-quarters done! The finish line is in sight.';
    if (progress >= 0.5) return 'Halfway through! You\'re making incredible progress.';
    if (progress >= 0.25) return 'A quarter done! You\'re building strong foundations.';
    if (currentDay <= 7) return 'Great start! Building a daily habit is the hardest part.';
    return 'Keep going! Consistency is the key to mastery.';
  }
}
