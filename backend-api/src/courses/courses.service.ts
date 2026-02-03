import { Injectable, NotFoundException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async findAll(options?: {
    language?: string;
    sort?: 'popular' | 'newest' | 'alphabetical';
    userId?: string;
  }) {
    const courses = await this.coursesRepository.findAll({
      language: options?.language,
      isPublished: true,
      orderBy: options?.sort,
    });

    // If user is authenticated, include their progress
    if (options?.userId) {
      const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
          const progress = await this.coursesRepository.getUserProgress(
            options.userId!,
            course.id,
          );
          return {
            ...this.formatCourse(course),
            userProgress: progress
              ? {
                  completionPercentage: progress.completionPercentage,
                  startedAt: progress.startedAt,
                  lastActivityAt: progress.lastActivityAt,
                }
              : null,
          };
        }),
      );
      return coursesWithProgress;
    }

    return courses.map((course) => this.formatCourse(course));
  }

  async findBySlug(slug: string, userId?: string) {
    const course = await this.coursesRepository.findBySlug(slug);

    if (!course || !course.isPublished) {
      throw new NotFoundException('Course not found');
    }

    const formattedCourse = this.formatCourseDetail(course);

    if (userId) {
      const progress = await this.coursesRepository.getUserProgress(
        userId,
        course.id,
      );
      return {
        ...formattedCourse,
        userProgress: progress
          ? {
              completionPercentage: progress.completionPercentage,
              masteryPercentage: progress.masteryPercentage,
              totalXpEarned: progress.totalXpEarned,
              startedAt: progress.startedAt,
              lastActivityAt: progress.lastActivityAt,
            }
          : null,
      };
    }

    return formattedCourse;
  }

  async getProgress(slug: string, userId: string) {
    const course = await this.coursesRepository.findBySlug(slug);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const progress = await this.coursesRepository.getUserProgress(
      userId,
      course.id,
    );

    if (!progress) {
      return {
        courseId: course.id,
        completionPercentage: 0,
        masteryPercentage: 0,
        levelsUnlocked: 0,
        levelsCompleted: 0,
        lessonsCompleted: 0,
        totalXpEarned: 0,
        timeSpentSeconds: 0,
        lastActivity: null,
        levelProgress: [],
      };
    }

    const levelUnlocks = await this.coursesRepository.getUserLevelUnlocks(
      userId,
      course.id,
    );
    const lessonProgress = await this.coursesRepository.getUserLessonProgress(
      userId,
      course.id,
    );

    const completedLessons = lessonProgress.filter(
      (lp) => lp.status === 'COMPLETED',
    );

    return {
      courseId: course.id,
      completionPercentage: progress.completionPercentage,
      masteryPercentage: progress.masteryPercentage,
      levelsUnlocked: levelUnlocks.length,
      levelsCompleted: this.calculateCompletedLevels(
        course.levels,
        lessonProgress,
      ),
      lessonsCompleted: completedLessons.length,
      totalXpEarned: progress.totalXpEarned,
      timeSpentSeconds: progress.timeSpentSeconds,
      lastActivity: progress.lastActivityAt,
      levelProgress: this.buildLevelProgress(
        course.levels,
        levelUnlocks,
        lessonProgress,
      ),
    };
  }

  async getLevels(slug: string, userId?: string) {
    const course = await this.coursesRepository.findBySlug(slug);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const levels = await this.coursesRepository.getLevels(course.id);

    if (userId) {
      const levelUnlocks = await this.coursesRepository.getUserLevelUnlocks(
        userId,
        course.id,
      );
      const unlockedLevelIds = new Set(levelUnlocks.map((lu) => lu.levelId));

      return levels.map((level, index) => ({
        ...this.formatLevel(level),
        isLocked: index === 0 ? false : !unlockedLevelIds.has(level.id),
      }));
    }

    return levels.map((level) => this.formatLevel(level));
  }

  async startCourse(slug: string, userId: string) {
    const course = await this.coursesRepository.findBySlug(slug);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check if user already started
    let progress = await this.coursesRepository.getUserProgress(
      userId,
      course.id,
    );

    if (!progress) {
      progress = await this.coursesRepository.createUserProgress(
        userId,
        course.id,
      );
      // Unlock first level
      await this.coursesRepository.unlockFirstLevel(userId, course.id);
    }

    return {
      success: true,
      courseProgress: {
        courseId: course.id,
        startedAt: progress.startedAt,
        completionPercentage: progress.completionPercentage,
      },
    };
  }

  // Helper methods
  private formatCourse(course: any) {
    return {
      id: course.id,
      slug: course.slug,
      language: course.language,
      title: {
        en: course.titleEn,
        fil: course.titleFil,
      },
      description: {
        en: course.descriptionEn,
        fil: course.descriptionFil,
      },
      iconUrl: course.iconUrl,
      color: course.color,
      totalLevels: course._count?.levels || course.levels?.length || 0,
      estimatedHours: course.estimatedHours,
    };
  }

  private formatCourseDetail(course: any) {
    const totalLessons = course.levels.reduce(
      (acc: number, level: any) => acc + level.lessons.length,
      0,
    );

    return {
      id: course.id,
      slug: course.slug,
      language: course.language,
      title: {
        en: course.titleEn,
        fil: course.titleFil,
      },
      description: {
        en: course.descriptionEn,
        fil: course.descriptionFil,
      },
      iconUrl: course.iconUrl,
      color: course.color,
      totalLevels: course.levels?.length || 0,
      levels: course.levels.map((level: any) => this.formatLevel(level)),
      totalLessons,
      estimatedHours: course.estimatedHours,
      isPublished: course.isPublished,
    };
  }

  private formatLevel(level: any) {
    return {
      id: level.id,
      slug: level.slug,
      title: {
        en: level.titleEn,
        fil: level.titleFil,
      },
      description: {
        en: level.descriptionEn,
        fil: level.descriptionFil,
      },
      orderIndex: level.orderIndex,
      lessons: level.lessons?.map((lesson: any) => ({
        id: lesson.id,
        difficulty: lesson.difficulty.toLowerCase(),
        title: {
          en: lesson.titleEn,
          fil: lesson.titleFil,
        },
        xpReward: lesson.xpReward,
        estimatedTimeMinutes: lesson.estimatedTimeMinutes,
      })),
    };
  }

  private calculateCompletedLevels(levels: any[], lessonProgress: any[]) {
    let completedLevels = 0;

    for (const level of levels) {
      const levelLessonIds = level.lessons.map((l: any) => l.id);
      const completedInLevel = lessonProgress.filter(
        (lp) =>
          levelLessonIds.includes(lp.lessonId) && lp.status === 'COMPLETED',
      );

      // Level is complete if at least one lesson tier is completed
      if (completedInLevel.length > 0) {
        completedLevels++;
      }
    }

    return completedLevels;
  }

  private buildLevelProgress(
    levels: any[],
    levelUnlocks: any[],
    lessonProgress: any[],
  ) {
    const unlockedLevelIds = new Set(levelUnlocks.map((lu) => lu.levelId));

    return levels.map((level) => {
      const levelLessons = lessonProgress.filter(
        (lp) => lp.lesson.levelId === level.id,
      );

      return {
        levelId: level.id,
        isUnlocked: unlockedLevelIds.has(level.id),
        easyCompleted: levelLessons.some(
          (lp) => lp.lesson.difficulty === 'EASY' && lp.status === 'COMPLETED',
        ),
        mediumCompleted: levelLessons.some(
          (lp) =>
            lp.lesson.difficulty === 'MEDIUM' && lp.status === 'COMPLETED',
        ),
        hardCompleted: levelLessons.some(
          (lp) => lp.lesson.difficulty === 'HARD' && lp.status === 'COMPLETED',
        ),
      };
    });
  }
}
