import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Difficulty } from '@prisma/client';
import { PaginationParams } from '../types';

@Injectable()
export class AdminCoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================================================
  // Courses
  // ============================================================================

  async findManyCourses(options: {
    pagination: PaginationParams;
    language?: string;
    isPublished?: boolean;
    search?: string;
  }) {
    const { pagination, language, isPublished, search } = options;
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.CourseWhereInput = {};

    if (language) {
      where.language = language;
    }

    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleEn: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { orderIndex: 'asc' },
        include: {
          _count: {
            select: {
              levels: true,
              progress: true,
            },
          },
          levels: {
            select: {
              _count: {
                select: { lessons: true },
              },
            },
          },
        },
      }),
      this.prisma.course.count({ where }),
    ]);

    return {
      data: data.map((course) => ({
        ...course,
        totalLevels: course._count.levels,
        totalLessons: course.levels.reduce((sum, level) => sum + level._count.lessons, 0),
        enrolledUsers: course._count.progress,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            levels: true,
            progress: true,
          },
        },
        levels: {
          orderBy: { orderIndex: 'asc' },
          include: {
            _count: {
              select: { lessons: true },
            },
            lessons: {
              orderBy: { orderIndex: 'asc' },
              include: {
                _count: {
                  select: { progress: true },
                },
              },
            },
          },
        },
      },
    });

    if (!course) return null;

    return {
      ...course,
      totalLevels: course._count.levels,
      totalLessons: course.levels.reduce((sum, level) => sum + level._count.lessons, 0),
      enrolledUsers: course._count.progress,
      levels: course.levels.map((level) => ({
        ...level,
        totalLessons: level._count.lessons,
        lessons: level.lessons.map((lesson) => ({
          ...lesson,
          completions: lesson._count.progress,
        })),
      })),
    };
  }

  async createCourse(data: {
    slug: string;
    title: string;
    titleEn?: string;
    titleFil?: string;
    description?: string;
    language: string;
    iconUrl?: string;
    color?: string;
    orderIndex?: number;
  }) {
    return this.prisma.course.create({
      data: {
        slug: data.slug,
        title: data.title,
        titleEn: data.titleEn,
        titleFil: data.titleFil,
        description: data.description,
        language: data.language,
        iconUrl: data.iconUrl,
        color: data.color,
        orderIndex: data.orderIndex ?? 0,
        isPublished: false,
      },
    });
  }

  async updateCourse(id: string, data: Partial<{
    slug: string;
    title: string;
    titleEn: string;
    titleFil: string;
    description: string;
    language: string;
    iconUrl: string;
    color: string;
    orderIndex: number;
  }>) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async deleteCourse(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
  }

  async publishCourse(id: string) {
    return this.prisma.course.update({
      where: { id },
      data: { isPublished: true },
    });
  }

  async unpublishCourse(id: string) {
    return this.prisma.course.update({
      where: { id },
      data: { isPublished: false },
    });
  }

  // ============================================================================
  // Levels
  // ============================================================================

  async findLevelById(id: string) {
    return this.prisma.level.findUnique({
      where: { id },
      include: {
        _count: {
          select: { lessons: true },
        },
        lessons: {
          orderBy: { orderIndex: 'asc' },
          include: {
            _count: {
              select: { progress: true },
            },
          },
        },
      },
    });
  }

  async createLevel(data: {
    courseId: string;
    slug: string;
    title: string;
    description?: string;
    orderIndex?: number;
  }) {
    return this.prisma.level.create({
      data: {
        courseId: data.courseId,
        slug: data.slug,
        title: data.title,
        description: data.description,
        orderIndex: data.orderIndex ?? 0,
        isPublished: false,
      },
    });
  }

  async updateLevel(id: string, data: Partial<{
    slug: string;
    title: string;
    description: string;
    orderIndex: number;
  }>) {
    return this.prisma.level.update({
      where: { id },
      data,
    });
  }

  async deleteLevel(id: string) {
    return this.prisma.level.delete({
      where: { id },
    });
  }

  async publishLevel(id: string) {
    return this.prisma.level.update({
      where: { id },
      data: { isPublished: true },
    });
  }

  async unpublishLevel(id: string) {
    return this.prisma.level.update({
      where: { id },
      data: { isPublished: false },
    });
  }

  // ============================================================================
  // Lessons
  // ============================================================================

  async findLessonById(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        _count: {
          select: { progress: true },
        },
      },
    });
  }

  async createLesson(data: {
    levelId: string;
    slug: string;
    title: string;
    content?: Record<string, unknown>;
    difficulty: Difficulty;
    xpReward?: number;
    orderIndex?: number;
  }) {
    return this.prisma.lesson.create({
      data: {
        levelId: data.levelId,
        slug: data.slug,
        title: data.title,
        content: data.content as Prisma.InputJsonValue,
        difficulty: data.difficulty,
        xpReward: data.xpReward ?? 100,
        orderIndex: data.orderIndex ?? 0,
        isPublished: false,
      },
    });
  }

  async updateLesson(id: string, data: Partial<{
    slug: string;
    title: string;
    content: Record<string, unknown>;
    difficulty: Difficulty;
    xpReward: number;
    orderIndex: number;
  }>) {
    const updateData: Prisma.LessonUpdateInput = {};

    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content as Prisma.InputJsonValue;
    if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
    if (data.xpReward !== undefined) updateData.xpReward = data.xpReward;
    if (data.orderIndex !== undefined) updateData.orderIndex = data.orderIndex;

    return this.prisma.lesson.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteLesson(id: string) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }

  async publishLesson(id: string) {
    return this.prisma.lesson.update({
      where: { id },
      data: { isPublished: true },
    });
  }

  async unpublishLesson(id: string) {
    return this.prisma.lesson.update({
      where: { id },
      data: { isPublished: false },
    });
  }

  // ============================================================================
  // Stats
  // ============================================================================

  async countCourses(isPublished?: boolean) {
    const where: Prisma.CourseWhereInput = {};
    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    }
    return this.prisma.course.count({ where });
  }

  async countLevels(isPublished?: boolean) {
    const where: Prisma.LevelWhereInput = {};
    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    }
    return this.prisma.level.count({ where });
  }

  async countLessons(isPublished?: boolean) {
    const where: Prisma.LessonWhereInput = {};
    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    }
    return this.prisma.lesson.count({ where });
  }

  async countLessonCompletions() {
    return this.prisma.userLessonProgress.count({
      where: { status: 'COMPLETED' },
    });
  }
}
