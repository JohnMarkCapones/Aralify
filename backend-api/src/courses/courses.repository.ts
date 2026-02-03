import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options?: {
    language?: string;
    isPublished?: boolean;
    orderBy?: 'popular' | 'newest' | 'alphabetical';
  }) {
    const where: any = {};

    if (options?.language) {
      where.language = options.language;
    }

    if (options?.isPublished !== undefined) {
      where.isPublished = options.isPublished;
    }

    let orderBy: any = { orderIndex: 'asc' };

    if (options?.orderBy === 'newest') {
      orderBy = { createdAt: 'desc' };
    } else if (options?.orderBy === 'alphabetical') {
      orderBy = { titleEn: 'asc' };
    }

    return this.prisma.course.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: { levels: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: { slug },
      include: {
        levels: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async getLevels(courseId: string) {
    return this.prisma.level.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      include: {
        lessons: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }

  async getUserProgress(userId: string, courseId: string) {
    return this.prisma.userCourseProgress.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });
  }

  async getUserLevelUnlocks(userId: string, courseId: string) {
    return this.prisma.userLevelUnlock.findMany({
      where: {
        userId,
        level: { courseId },
      },
    });
  }

  async getUserLessonProgress(userId: string, courseId: string) {
    return this.prisma.userLessonProgress.findMany({
      where: {
        userId,
        lesson: {
          level: { courseId },
        },
      },
      include: {
        lesson: true,
      },
    });
  }

  async createUserProgress(userId: string, courseId: string) {
    return this.prisma.userCourseProgress.create({
      data: {
        userId,
        courseId,
        completionPercentage: 0,
        masteryPercentage: 0,
        totalXpEarned: 0,
        timeSpentSeconds: 0,
      },
    });
  }

  async updateUserProgress(
    userId: string,
    courseId: string,
    data: {
      completionPercentage?: number;
      masteryPercentage?: number;
      totalXpEarned?: number;
      timeSpentSeconds?: number;
      lastActivityAt?: Date;
      completedAt?: Date;
    },
  ) {
    return this.prisma.userCourseProgress.update({
      where: {
        userId_courseId: { userId, courseId },
      },
      data: {
        ...data,
        lastActivityAt: new Date(),
      },
    });
  }

  async unlockFirstLevel(userId: string, courseId: string) {
    const firstLevel = await this.prisma.level.findFirst({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
    });

    if (firstLevel) {
      return this.prisma.userLevelUnlock.upsert({
        where: {
          userId_levelId: { userId, levelId: firstLevel.id },
        },
        update: {},
        create: {
          userId,
          levelId: firstLevel.id,
        },
      });
    }

    return null;
  }
}
