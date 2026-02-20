import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProgressStatus, HintTargetType, QuizType, Difficulty } from '@prisma/client';

@Injectable()
export class LessonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        level: {
          select: {
            id: true,
            slug: true,
            title: true,
            titleEn: true,
            titleFil: true,
            courseId: true,
            orderIndex: true,
            course: {
              select: {
                slug: true,
                title: true,
                language: true,
                titleEn: true,
                titleFil: true,
              },
            },
          },
        },
        quizzes: {
          orderBy: { orderIndex: 'asc' },
        },
        challenges: true,
      },
    });
  }

  async findByIdWithProgress(id: string, userId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        level: {
          select: {
            id: true,
            slug: true,
            title: true,
            titleEn: true,
            titleFil: true,
            courseId: true,
            orderIndex: true,
            course: {
              select: {
                slug: true,
                title: true,
                language: true,
                titleEn: true,
                titleFil: true,
              },
            },
          },
        },
        quizzes: {
          orderBy: { orderIndex: 'asc' },
        },
        challenges: true,
      },
    });

    if (!lesson) return null;

    const progress = await this.prisma.userLessonProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId: id },
      },
    });

    return { lesson, progress };
  }

  async findQuizzesByLessonId(lessonId: string) {
    return this.prisma.quiz.findMany({
      where: { lessonId },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findChallengesByLessonId(lessonId: string) {
    return this.prisma.codeChallenge.findMany({
      where: { lessonId },
    });
  }

  async getQuizById(quizId: string) {
    return this.prisma.quiz.findUnique({
      where: { id: quizId },
    });
  }

  async getChallengeById(challengeId: string) {
    return this.prisma.codeChallenge.findUnique({
      where: { id: challengeId },
    });
  }

  async getUserProgress(userId: string, lessonId: string) {
    return this.prisma.userLessonProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });
  }

  async createUserProgress(userId: string, lessonId: string) {
    return this.prisma.userLessonProgress.create({
      data: {
        userId,
        lessonId,
        status: ProgressStatus.IN_PROGRESS,
        xpEarned: 0,
      },
    });
  }

  async upsertUserProgress(
    userId: string,
    lessonId: string,
    data: {
      status?: ProgressStatus;
      score?: number;
      xpEarned?: number;
      timeSpent?: number;
      completedAt?: Date;
    },
  ) {
    return this.prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: data,
      create: {
        userId,
        lessonId,
        status: data.status || ProgressStatus.IN_PROGRESS,
        score: data.score,
        xpEarned: data.xpEarned || 0,
        timeSpent: data.timeSpent,
        completedAt: data.completedAt,
      },
    });
  }

  async isLevelUnlocked(userId: string, levelId: string) {
    // Check if level is the first level in its course (always accessible)
    const level = await this.prisma.level.findUnique({
      where: { id: levelId },
    });

    if (!level) return false;

    // First level (orderIndex 0) is always accessible
    if (level.orderIndex === 0) return true;

    // Check for explicit unlock record
    const unlock = await this.prisma.userLevelUnlock.findUnique({
      where: {
        userId_levelId: { userId, levelId },
      },
    });

    return !!unlock;
  }

  async getNextLevel(currentLevelId: string) {
    const currentLevel = await this.prisma.level.findUnique({
      where: { id: currentLevelId },
    });

    if (!currentLevel) return null;

    return this.prisma.level.findFirst({
      where: {
        courseId: currentLevel.courseId,
        orderIndex: currentLevel.orderIndex + 1,
      },
    });
  }

  async unlockLevel(userId: string, levelId: string) {
    return this.prisma.userLevelUnlock.upsert({
      where: {
        userId_levelId: { userId, levelId },
      },
      update: {},
      create: {
        userId,
        levelId,
      },
    });
  }

  async hasCompletedAnyLessonInLevel(userId: string, levelId: string) {
    const completed = await this.prisma.userLessonProgress.findFirst({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        lesson: {
          levelId,
        },
      },
    });

    return !!completed;
  }

  async updateCourseProgress(
    userId: string,
    courseId: string,
    data: {
      totalXpEarned?: number;
      timeSpentSeconds?: number;
    },
  ) {
    // Get current progress
    const currentProgress = await this.prisma.userCourseProgress.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (!currentProgress) return null;

    return this.prisma.userCourseProgress.update({
      where: {
        userId_courseId: { userId, courseId },
      },
      data: {
        totalXpEarned: data.totalXpEarned !== undefined
          ? currentProgress.totalXpEarned + data.totalXpEarned
          : undefined,
        timeSpentSeconds: data.timeSpentSeconds !== undefined
          ? currentProgress.timeSpentSeconds + data.timeSpentSeconds
          : undefined,
        lastActivityAt: new Date(),
      },
    });
  }

  // ============================================================================
  // Quiz Answer Tracking
  // ============================================================================

  async createQuizAnswer(data: {
    userId: string;
    quizId: string;
    answer: string;
    isCorrect: boolean;
    attemptNumber: number;
    xpAwarded: number;
    timeSpentSeconds?: number;
  }) {
    return this.prisma.userQuizAnswer.create({
      data: {
        userId: data.userId,
        quizId: data.quizId,
        answer: data.answer,
        isCorrect: data.isCorrect,
        attemptNumber: data.attemptNumber,
        xpAwarded: data.xpAwarded,
        timeSpentSeconds: data.timeSpentSeconds,
      },
    });
  }

  async getQuizAttemptCount(userId: string, quizId: string): Promise<number> {
    return this.prisma.userQuizAnswer.count({
      where: { userId, quizId },
    });
  }

  async hasCorrectAnswer(userId: string, quizId: string): Promise<boolean> {
    const correctAnswer = await this.prisma.userQuizAnswer.findFirst({
      where: { userId, quizId, isCorrect: true },
    });
    return !!correctAnswer;
  }

  async getQuizResultsForLesson(userId: string, lessonId: string) {
    // Get all quizzes for the lesson
    const quizzes = await this.prisma.quiz.findMany({
      where: { lessonId },
      orderBy: { orderIndex: 'asc' },
    });

    // Get all user answers for these quizzes
    const quizIds = quizzes.map((q) => q.id);
    const answers = await this.prisma.userQuizAnswer.findMany({
      where: {
        userId,
        quizId: { in: quizIds },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Group answers by quizId
    const answersByQuiz = new Map<string, typeof answers>();
    for (const answer of answers) {
      if (!answersByQuiz.has(answer.quizId)) {
        answersByQuiz.set(answer.quizId, []);
      }
      answersByQuiz.get(answer.quizId)!.push(answer);
    }

    return { quizzes, answersByQuiz };
  }

  async getUserQuizScoreForLesson(
    userId: string,
    lessonId: string,
  ): Promise<{ correct: number; total: number }> {
    const quizzes = await this.prisma.quiz.findMany({
      where: { lessonId },
      select: { id: true },
    });

    if (quizzes.length === 0) {
      return { correct: 0, total: 0 };
    }

    const quizIds = quizzes.map((q) => q.id);

    // Count quizzes with at least one correct answer
    const correctQuizzes = await this.prisma.userQuizAnswer.groupBy({
      by: ['quizId'],
      where: {
        userId,
        quizId: { in: quizIds },
        isCorrect: true,
      },
    });

    return {
      correct: correctQuizzes.length,
      total: quizzes.length,
    };
  }

  // ============================================================================
  // Hint Unlock Tracking
  // ============================================================================

  async getHintUnlockCount(
    userId: string,
    targetType: HintTargetType,
    targetId: string,
  ): Promise<number> {
    return this.prisma.userHintUnlock.count({
      where: { userId, targetType, targetId },
    });
  }

  async getHintUnlocks(
    userId: string,
    targetType: HintTargetType,
    targetId: string,
  ) {
    return this.prisma.userHintUnlock.findMany({
      where: { userId, targetType, targetId },
      orderBy: { hintIndex: 'asc' },
    });
  }

  async createHintUnlock(data: {
    userId: string;
    targetType: HintTargetType;
    targetId: string;
    hintIndex: number;
  }) {
    return this.prisma.userHintUnlock.create({
      data: {
        userId: data.userId,
        targetType: data.targetType,
        targetId: data.targetId,
        hintIndex: data.hintIndex,
      },
    });
  }

  async hasHintUnlock(
    userId: string,
    targetType: HintTargetType,
    targetId: string,
    hintIndex: number,
  ): Promise<boolean> {
    const unlock = await this.prisma.userHintUnlock.findUnique({
      where: {
        userId_targetType_targetId_hintIndex: {
          userId,
          targetType,
          targetId,
          hintIndex,
        },
      },
    });
    return !!unlock;
  }

  // ============================================================================
  // Challenge Submission Tracking
  // ============================================================================

  async createChallengeSubmission(data: {
    userId: string;
    challengeId: string;
    code: string;
    languageId: number;
    status: string;
    attemptNumber: number;
    xpAwarded?: number;
    timeSpentSeconds?: number;
    testResults?: any;
  }) {
    return this.prisma.challengeSubmission.create({
      data: {
        userId: data.userId,
        challengeId: data.challengeId,
        code: data.code,
        languageId: data.languageId,
        status: data.status,
        attemptNumber: data.attemptNumber,
        xpAwarded: data.xpAwarded ?? 0,
        timeSpentSeconds: data.timeSpentSeconds,
        testResults: data.testResults,
      },
    });
  }

  async getChallengeAttemptCount(
    userId: string,
    challengeId: string,
  ): Promise<number> {
    return this.prisma.challengeSubmission.count({
      where: { userId, challengeId },
    });
  }

  async hasPassedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<boolean> {
    const passed = await this.prisma.challengeSubmission.findFirst({
      where: { userId, challengeId, status: 'PASSED' },
    });
    return !!passed;
  }

  // ============================================================================
  // Admin Quiz CRUD
  // ============================================================================

  async createQuiz(
    lessonId: string,
    data: {
      type: QuizType;
      question: string;
      options?: any;
      correctAnswer: string;
      explanation?: string;
      hints?: string[];
      difficulty?: Difficulty;
      orderIndex?: number;
    },
  ) {
    // Get next order index if not specified
    let orderIndex = data.orderIndex;
    if (orderIndex === undefined) {
      const lastQuiz = await this.prisma.quiz.findFirst({
        where: { lessonId },
        orderBy: { orderIndex: 'desc' },
      });
      orderIndex = lastQuiz ? lastQuiz.orderIndex + 1 : 0;
    }

    return this.prisma.quiz.create({
      data: {
        lessonId,
        type: data.type,
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
        hints: data.hints,
        difficulty: data.difficulty,
        orderIndex,
      },
    });
  }

  async updateQuiz(
    quizId: string,
    data: {
      type?: QuizType;
      question?: string;
      options?: any;
      correctAnswer?: string;
      explanation?: string;
      hints?: string[];
      difficulty?: Difficulty;
      orderIndex?: number;
    },
  ) {
    return this.prisma.quiz.update({
      where: { id: quizId },
      data: {
        type: data.type,
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
        hints: data.hints,
        difficulty: data.difficulty,
        orderIndex: data.orderIndex,
      },
    });
  }

  async deleteQuiz(quizId: string) {
    return this.prisma.quiz.delete({
      where: { id: quizId },
    });
  }

  async bulkCreateQuizzes(
    lessonId: string,
    quizzes: Array<{
      type: QuizType;
      question: string;
      options?: any;
      correctAnswer: string;
      explanation?: string;
      hints?: string[];
      difficulty?: Difficulty;
      orderIndex?: number;
    }>,
  ) {
    // Get the starting order index
    const lastQuiz = await this.prisma.quiz.findFirst({
      where: { lessonId },
      orderBy: { orderIndex: 'desc' },
    });
    let nextOrderIndex = lastQuiz ? lastQuiz.orderIndex + 1 : 0;

    const createdQuizzes = [];
    for (const quiz of quizzes) {
      const created = await this.prisma.quiz.create({
        data: {
          lessonId,
          type: quiz.type,
          question: quiz.question,
          options: quiz.options,
          correctAnswer: quiz.correctAnswer,
          explanation: quiz.explanation,
          hints: quiz.hints,
          difficulty: quiz.difficulty,
          orderIndex: quiz.orderIndex ?? nextOrderIndex++,
        },
      });
      createdQuizzes.push(created);
    }

    return createdQuizzes;
  }

  async getLessonById(lessonId: string) {
    return this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
  }

  async findSiblingLessons(levelId: string, currentOrderIndex: number, difficulty: Difficulty) {
    const [previous, next] = await Promise.all([
      this.prisma.lesson.findFirst({
        where: {
          levelId,
          difficulty,
          orderIndex: { lt: currentOrderIndex },
          isPublished: true,
        },
        orderBy: { orderIndex: 'desc' },
        select: { id: true, slug: true, title: true },
      }),
      this.prisma.lesson.findFirst({
        where: {
          levelId,
          difficulty,
          orderIndex: { gt: currentOrderIndex },
          isPublished: true,
        },
        orderBy: { orderIndex: 'asc' },
        select: { id: true, slug: true, title: true },
      }),
    ]);

    return { previous, next };
  }

  async findBySlug(slug: string, difficulty?: Difficulty) {
    return this.prisma.lesson.findFirst({
      where: {
        slug,
        ...(difficulty ? { difficulty } : {}),
        isPublished: true,
      },
      include: {
        level: {
          select: {
            id: true,
            slug: true,
            title: true,
            titleEn: true,
            titleFil: true,
            courseId: true,
            orderIndex: true,
            course: {
              select: {
                slug: true,
                title: true,
                language: true,
                titleEn: true,
                titleFil: true,
              },
            },
          },
        },
        quizzes: {
          orderBy: { orderIndex: 'asc' },
        },
        challenges: true,
      },
    });
  }
}
