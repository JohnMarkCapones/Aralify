import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options?: {
    language?: string;
    isPublished?: boolean;
    orderBy?: 'popular' | 'newest' | 'alphabetical';
  }) {
    const where: Prisma.CourseWhereInput = {};

    if (options?.language) {
      where.language = options.language;
    }

    if (options?.isPublished !== undefined) {
      where.isPublished = options.isPublished;
    }

    let orderBy: Prisma.CourseOrderByWithRelationInput = { orderIndex: 'asc' };

    if (options?.orderBy === 'newest') {
      orderBy = { createdAt: 'desc' };
    } else if (options?.orderBy === 'alphabetical') {
      orderBy = { titleEn: 'asc' };
    }

    return this.prisma.course.findMany({
      where,
      orderBy,
      include: {
        levels: {
          where: { isPublished: true },
          orderBy: { orderIndex: 'asc' },
        },
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
          where: { isPublished: true },
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              where: { isPublished: true },
              orderBy: { difficulty: 'asc' },
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
      where: {
        courseId,
        isPublished: true,
      },
      orderBy: { orderIndex: 'asc' },
      include: {
        lessons: {
          where: { isPublished: true },
          orderBy: { difficulty: 'asc' },
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

  async createUserProgress(userId: string, courseId: string) {
    return this.prisma.userCourseProgress.create({
      data: {
        userId,
        courseId,
      },
    });
  }

  async updateUserProgress(
    userId: string,
    courseId: string,
    data: Prisma.UserCourseProgressUpdateInput,
  ) {
    return this.prisma.userCourseProgress.update({
      where: {
        userId_courseId: { userId, courseId },
      },
      data,
    });
  }

  async unlockFirstLevel(userId: string, courseId: string) {
    const firstLevel = await this.prisma.level.findFirst({
      where: { courseId, isPublished: true },
      orderBy: { orderIndex: 'asc' },
    });

    if (!firstLevel) return null;

    return this.prisma.userLevelUnlock.upsert({
      where: {
        userId_levelId: { userId, levelId: firstLevel.id },
      },
      create: {
        userId,
        levelId: firstLevel.id,
      },
      update: {},
    });
  }

  async getUserLevelUnlocks(userId: string, courseId: string) {
    return this.prisma.userLevelUnlock.findMany({
      where: {
        userId,
        level: { courseId },
      },
      include: { level: true },
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
        lesson: {
          include: { level: true },
        },
      },
    });
  }
}
