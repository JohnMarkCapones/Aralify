import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProgressStatus } from '@prisma/client';

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
            courseId: true,
            orderIndex: true,
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
            courseId: true,
            orderIndex: true,
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

  async getUserHintUnlocks(userId: string, challengeId: string) {
    // Store hint unlocks in a simple key-value format
    // For now, we'll use a convention where we track unlocked hint indices
    // In a production system, this could be a separate table
    // For simplicity, we'll store this in the lesson progress metadata
    // or as a separate query. Here we return a count based on a simple approach.

    // This is a placeholder - in production, you'd have a UserHintUnlock table
    // For now, return 0 (first hint always unlocked for free)
    return { unlockedCount: 1 };
  }
}
