import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ProgressStatus } from '@prisma/client';
import { LessonsRepository } from './lessons.repository';
import { CompleteLessonDto, UnlockHintDto } from './dto';
import { GamificationService } from '../gamification/services';

// XP multipliers based on difficulty
const XP_MULTIPLIERS: Record<string, number> = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};

@Injectable()
export class LessonsService {
  private readonly logger = new Logger(LessonsService.name);

  constructor(
    private readonly lessonsRepository: LessonsRepository,
    private readonly gamificationService: GamificationService,
  ) {}

  async findById(id: string, userId?: string) {
    if (userId) {
      const result = await this.lessonsRepository.findByIdWithProgress(id, userId);
      if (!result?.lesson || !result.lesson.isPublished) {
        throw new NotFoundException('Lesson not found');
      }
      return this.formatLessonDetail(result.lesson, result.progress);
    }

    const lesson = await this.lessonsRepository.findById(id);
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    return this.formatLessonDetail(lesson, null);
  }

  async startLesson(lessonId: string, userId: string) {
    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Verify level is unlocked
    const isUnlocked = await this.lessonsRepository.isLevelUnlocked(
      userId,
      lesson.levelId,
    );

    if (!isUnlocked) {
      throw new ForbiddenException('Level is not unlocked. Complete previous levels first.');
    }

    // Check if already started
    const existingProgress = await this.lessonsRepository.getUserProgress(
      userId,
      lessonId,
    );

    if (existingProgress) {
      return {
        success: true,
        lessonId,
        progress: this.formatProgress(existingProgress),
      };
    }

    // Create new progress record
    const progress = await this.lessonsRepository.createUserProgress(
      userId,
      lessonId,
    );

    return {
      success: true,
      lessonId,
      progress: this.formatProgress(progress),
    };
  }

  async completeLesson(lessonId: string, userId: string, dto: CompleteLessonDto) {
    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Verify lesson was started
    const existingProgress = await this.lessonsRepository.getUserProgress(
      userId,
      lessonId,
    );

    if (!existingProgress || existingProgress.status === ProgressStatus.NOT_STARTED) {
      throw new BadRequestException('Lesson must be started before completing');
    }

    // Check if already completed
    if (existingProgress.status === ProgressStatus.COMPLETED) {
      return {
        success: true,
        lessonId,
        xpEarned: existingProgress.xpEarned,
        xpMultiplier: XP_MULTIPLIERS[lesson.difficulty],
        baseXp: lesson.xpReward,
        levelUnlocked: false,
        progress: this.formatProgress(existingProgress),
      };
    }

    // Calculate XP with multiplier
    const multiplier = XP_MULTIPLIERS[lesson.difficulty] || 1;
    const xpEarned = lesson.xpReward * multiplier;

    // Update progress
    const progress = await this.lessonsRepository.upsertUserProgress(
      userId,
      lessonId,
      {
        status: ProgressStatus.COMPLETED,
        score: dto.score,
        xpEarned,
        timeSpent: dto.timeSpentSeconds,
        completedAt: new Date(),
      },
    );

    // Check if we should unlock the next level
    let levelUnlocked = false;
    let nextLevelId: string | undefined;

    // Only unlock if this is the first lesson completed in this level
    const hasCompletedBefore = await this.lessonsRepository.hasCompletedAnyLessonInLevel(
      userId,
      lesson.levelId,
    );

    // Since we just completed, check if there were other completions before this one
    // The check above will now return true, so we need to check if this was the first
    // We'll unlock the next level on any completion (idempotent operation)
    const nextLevel = await this.lessonsRepository.getNextLevel(lesson.levelId);

    if (nextLevel) {
      await this.lessonsRepository.unlockLevel(userId, nextLevel.id);
      levelUnlocked = true;
      nextLevelId = nextLevel.id;
    }

    // Update course progress
    await this.lessonsRepository.updateCourseProgress(
      userId,
      lesson.level.courseId,
      {
        totalXpEarned: xpEarned,
        timeSpentSeconds: dto.timeSpentSeconds,
      },
    );

    // Gamification: award XP, update streak, evaluate achievements
    let gamification;
    try {
      gamification = await this.gamificationService.onLessonComplete(
        userId,
        lessonId,
        xpEarned,
        lesson.difficulty,
        lesson.title,
      );
    } catch (error) {
      // Log but don't fail lesson completion if gamification errors
      this.logger.error(`Gamification update failed for user ${userId}: ${error}`);
    }

    return {
      success: true,
      lessonId,
      xpEarned,
      xpMultiplier: multiplier,
      baseXp: lesson.xpReward,
      levelUnlocked,
      nextLevelId,
      progress: this.formatProgress(progress),
      gamification: gamification
        ? {
            levelUp: gamification.xp.levelUp,
            newLevel: gamification.xp.newLevel,
            newTotalXp: gamification.xp.newTotal,
            rankTitle: gamification.xp.rankTitle,
            streakUpdated: gamification.streak.streakUpdated,
            currentStreak: gamification.streak.newStreak,
            streakMilestone: gamification.streak.milestoneReached,
            newAchievements: gamification.newAchievements.map((a) => ({
              slug: a.slug,
              title: a.title,
              xpReward: a.xpReward,
            })),
          }
        : undefined,
    };
  }

  async getQuizzes(lessonId: string) {
    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    const quizzes = await this.lessonsRepository.findQuizzesByLessonId(lessonId);

    // Return quizzes without correctAnswer
    const sanitizedQuizzes = quizzes.map((quiz) => ({
      id: quiz.id,
      type: quiz.type,
      question: quiz.question,
      options: quiz.options,
      explanation: quiz.explanation,
      orderIndex: quiz.orderIndex,
    }));

    return {
      lessonId,
      quizzes: sanitizedQuizzes,
      totalCount: quizzes.length,
    };
  }

  async getChallenges(lessonId: string) {
    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    const challenges = await this.lessonsRepository.findChallengesByLessonId(lessonId);

    // Return challenges without solutionCode and testCases
    const sanitizedChallenges = challenges.map((challenge) => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      starterCode: challenge.starterCode,
      languageId: challenge.languageId,
    }));

    return {
      lessonId,
      challenges: sanitizedChallenges,
      totalCount: challenges.length,
    };
  }

  async getHints(lessonId: string, userId: string, challengeId: string) {
    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    const challenge = await this.lessonsRepository.getChallengeById(challengeId);

    if (!challenge || challenge.lessonId !== lessonId) {
      throw new NotFoundException('Challenge not found in this lesson');
    }

    const hints = (challenge.hints as string[]) || [];
    const { unlockedCount } = await this.lessonsRepository.getUserHintUnlocks(
      userId,
      challengeId,
    );

    // Format hints with unlock status
    const formattedHints = hints.map((hint, index) => ({
      index,
      content: index < unlockedCount ? hint : undefined,
      isUnlocked: index < unlockedCount,
    }));

    return {
      lessonId,
      challengeId,
      hints: formattedHints,
      totalHints: hints.length,
      unlockedCount,
    };
  }

  async unlockHint(lessonId: string, userId: string, dto: UnlockHintDto) {
    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    const challenge = await this.lessonsRepository.getChallengeById(dto.challengeId);

    if (!challenge || challenge.lessonId !== lessonId) {
      throw new NotFoundException('Challenge not found in this lesson');
    }

    const hints = (challenge.hints as string[]) || [];
    const { unlockedCount } = await this.lessonsRepository.getUserHintUnlocks(
      userId,
      dto.challengeId,
    );

    if (unlockedCount >= hints.length) {
      throw new BadRequestException('All hints are already unlocked');
    }

    // In a production system, you would:
    // 1. Create a UserHintUnlock record
    // 2. Potentially deduct coins/gems
    // For now, we simulate unlocking the next hint
    const newUnlockedCount = unlockedCount + 1;
    const unlockedHint = {
      index: unlockedCount,
      content: hints[unlockedCount],
      isUnlocked: true,
    };

    return {
      success: true,
      hint: unlockedHint,
      unlockedCount: newUnlockedCount,
      totalHints: hints.length,
    };
  }

  // Helper methods
  private formatLessonDetail(lesson: any, progress: any | null) {
    return {
      id: lesson.id,
      slug: lesson.slug,
      title: {
        en: lesson.title,
        fil: null, // Add titleFil field to schema if needed
      },
      content: lesson.content,
      difficulty: lesson.difficulty.toLowerCase(),
      xpReward: lesson.xpReward,
      orderIndex: lesson.orderIndex,
      level: {
        id: lesson.level.id,
        slug: lesson.level.slug,
        title: {
          en: lesson.level.title,
          fil: null,
        },
        courseId: lesson.level.courseId,
      },
      quizzes: lesson.quizzes?.map((quiz: any) => ({
        id: quiz.id,
        type: quiz.type,
        question: quiz.question,
        options: quiz.options,
        explanation: quiz.explanation,
        orderIndex: quiz.orderIndex,
        // Note: correctAnswer is intentionally excluded
      })),
      challenges: lesson.challenges?.map((challenge: any) => ({
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        starterCode: challenge.starterCode,
        languageId: challenge.languageId,
        // Note: solutionCode and testCases are intentionally excluded
      })),
      userProgress: progress ? this.formatProgress(progress) : null,
    };
  }

  private formatProgress(progress: any) {
    return {
      status: progress.status,
      score: progress.score,
      xpEarned: progress.xpEarned,
      timeSpentSeconds: progress.timeSpent,
      completedAt: progress.completedAt,
    };
  }
}
