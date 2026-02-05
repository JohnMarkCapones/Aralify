import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { AdminCoursesRepository } from '../repositories/admin-courses.repository';
import { AuditLogService } from './audit-log.service';
import { AdminRequestContext } from '../types';
import {
  GetAdminCoursesQueryDto,
  CreateCourseDto,
  UpdateCourseDto,
  CreateLevelDto,
  UpdateLevelDto,
  CreateLessonDto,
  UpdateLessonDto,
  AdminCourseDto,
  AdminCourseDetailDto,
  AdminLevelDto,
  AdminLevelDetailDto,
  AdminLessonDto,
  AdminCourseListResponseDto,
  PublishResponseDto,
  DeleteContentResponseDto,
} from '../dto';

@Injectable()
export class AdminCoursesService {
  constructor(
    private readonly adminCoursesRepository: AdminCoursesRepository,
    private readonly auditLogService: AuditLogService,
  ) {}

  // ============================================================================
  // Courses
  // ============================================================================

  async findAllCourses(query: GetAdminCoursesQueryDto): Promise<AdminCourseListResponseDto> {
    const result = await this.adminCoursesRepository.findManyCourses({
      pagination: {
        page: query.page,
        limit: query.limit,
      },
      language: query.language,
      isPublished: query.isPublished,
      search: query.search,
    });

    return {
      data: result.data.map((course) => this.formatCourse(course)),
      pagination: result.pagination,
    };
  }

  async findCourseById(id: string): Promise<AdminCourseDetailDto> {
    const course = await this.adminCoursesRepository.findCourseById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.formatCourseDetail(course);
  }

  async createCourse(
    dto: CreateCourseDto,
    context: AdminRequestContext,
  ): Promise<AdminCourseDto> {
    try {
      const course = await this.adminCoursesRepository.createCourse(dto);

      await this.auditLogService.log(
        AuditAction.CONTENT_CREATED,
        'Course',
        course.id,
        context,
        {
          newValue: { slug: dto.slug, title: dto.title, language: dto.language },
        },
      );

      return this.formatCourse({
        ...course,
        totalLevels: 0,
        totalLessons: 0,
        enrolledUsers: 0,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Course with this slug already exists');
      }
      throw error;
    }
  }

  async updateCourse(
    id: string,
    dto: UpdateCourseDto,
    context: AdminRequestContext,
  ): Promise<AdminCourseDto> {
    const existing = await this.adminCoursesRepository.findCourseById(id);

    if (!existing) {
      throw new NotFoundException('Course not found');
    }

    const oldValue = {
      slug: existing.slug,
      title: existing.title,
      language: existing.language,
    };

    try {
      const updated = await this.adminCoursesRepository.updateCourse(id, dto);

      await this.auditLogService.log(
        AuditAction.CONTENT_UPDATED,
        'Course',
        id,
        context,
        {
          oldValue,
          newValue: { ...dto } as Record<string, unknown>,
        },
      );

      return this.formatCourse({
        ...updated,
        totalLevels: existing.totalLevels,
        totalLessons: existing.totalLessons,
        enrolledUsers: existing.enrolledUsers,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Course with this slug already exists');
      }
      throw error;
    }
  }

  async deleteCourse(
    id: string,
    context: AdminRequestContext,
  ): Promise<DeleteContentResponseDto> {
    const existing = await this.adminCoursesRepository.findCourseById(id);

    if (!existing) {
      throw new NotFoundException('Course not found');
    }

    await this.adminCoursesRepository.deleteCourse(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_DELETED,
      'Course',
      id,
      context,
      {
        oldValue: { slug: existing.slug, title: existing.title },
      },
    );

    return {
      success: true,
      message: 'Course has been deleted',
    };
  }

  async publishCourse(
    id: string,
    context: AdminRequestContext,
  ): Promise<PublishResponseDto> {
    const existing = await this.adminCoursesRepository.findCourseById(id);

    if (!existing) {
      throw new NotFoundException('Course not found');
    }

    await this.adminCoursesRepository.publishCourse(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_PUBLISHED,
      'Course',
      id,
      context,
      {
        oldValue: { isPublished: false },
        newValue: { isPublished: true },
      },
    );

    return {
      success: true,
      message: 'Course has been published',
    };
  }

  async unpublishCourse(
    id: string,
    context: AdminRequestContext,
  ): Promise<PublishResponseDto> {
    const existing = await this.adminCoursesRepository.findCourseById(id);

    if (!existing) {
      throw new NotFoundException('Course not found');
    }

    await this.adminCoursesRepository.unpublishCourse(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_UNPUBLISHED,
      'Course',
      id,
      context,
      {
        oldValue: { isPublished: true },
        newValue: { isPublished: false },
      },
    );

    return {
      success: true,
      message: 'Course has been unpublished',
    };
  }

  // ============================================================================
  // Levels
  // ============================================================================

  async createLevel(
    dto: CreateLevelDto,
    context: AdminRequestContext,
  ): Promise<AdminLevelDto> {
    try {
      const level = await this.adminCoursesRepository.createLevel(dto);

      await this.auditLogService.log(
        AuditAction.CONTENT_CREATED,
        'Level',
        level.id,
        context,
        {
          newValue: { courseId: dto.courseId, slug: dto.slug, title: dto.title },
        },
      );

      return this.formatLevel({ ...level, totalLessons: 0 });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Level with this slug already exists in this course');
      }
      if (error.code === 'P2003') {
        throw new NotFoundException('Course not found');
      }
      throw error;
    }
  }

  async updateLevel(
    id: string,
    dto: UpdateLevelDto,
    context: AdminRequestContext,
  ): Promise<AdminLevelDto> {
    const existing = await this.adminCoursesRepository.findLevelById(id);

    if (!existing) {
      throw new NotFoundException('Level not found');
    }

    const oldValue = {
      slug: existing.slug,
      title: existing.title,
    };

    try {
      const updated = await this.adminCoursesRepository.updateLevel(id, dto);

      await this.auditLogService.log(
        AuditAction.CONTENT_UPDATED,
        'Level',
        id,
        context,
        {
          oldValue,
          newValue: { ...dto } as Record<string, unknown>,
        },
      );

      return this.formatLevel({ ...updated, totalLessons: existing._count.lessons });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Level with this slug already exists in this course');
      }
      throw error;
    }
  }

  async deleteLevel(
    id: string,
    context: AdminRequestContext,
  ): Promise<DeleteContentResponseDto> {
    const existing = await this.adminCoursesRepository.findLevelById(id);

    if (!existing) {
      throw new NotFoundException('Level not found');
    }

    await this.adminCoursesRepository.deleteLevel(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_DELETED,
      'Level',
      id,
      context,
      {
        oldValue: { slug: existing.slug, title: existing.title },
      },
    );

    return {
      success: true,
      message: 'Level has been deleted',
    };
  }

  async publishLevel(
    id: string,
    context: AdminRequestContext,
  ): Promise<PublishResponseDto> {
    const existing = await this.adminCoursesRepository.findLevelById(id);

    if (!existing) {
      throw new NotFoundException('Level not found');
    }

    await this.adminCoursesRepository.publishLevel(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_PUBLISHED,
      'Level',
      id,
      context,
      {
        oldValue: { isPublished: false },
        newValue: { isPublished: true },
      },
    );

    return {
      success: true,
      message: 'Level has been published',
    };
  }

  async unpublishLevel(
    id: string,
    context: AdminRequestContext,
  ): Promise<PublishResponseDto> {
    const existing = await this.adminCoursesRepository.findLevelById(id);

    if (!existing) {
      throw new NotFoundException('Level not found');
    }

    await this.adminCoursesRepository.unpublishLevel(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_UNPUBLISHED,
      'Level',
      id,
      context,
      {
        oldValue: { isPublished: true },
        newValue: { isPublished: false },
      },
    );

    return {
      success: true,
      message: 'Level has been unpublished',
    };
  }

  // ============================================================================
  // Lessons
  // ============================================================================

  async createLesson(
    dto: CreateLessonDto,
    context: AdminRequestContext,
  ): Promise<AdminLessonDto> {
    try {
      const lesson = await this.adminCoursesRepository.createLesson(dto);

      await this.auditLogService.log(
        AuditAction.CONTENT_CREATED,
        'Lesson',
        lesson.id,
        context,
        {
          newValue: {
            levelId: dto.levelId,
            slug: dto.slug,
            title: dto.title,
            difficulty: dto.difficulty,
          },
        },
      );

      return this.formatLesson({ ...lesson, completions: 0 });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Lesson with this slug and difficulty already exists in this level');
      }
      if (error.code === 'P2003') {
        throw new NotFoundException('Level not found');
      }
      throw error;
    }
  }

  async updateLesson(
    id: string,
    dto: UpdateLessonDto,
    context: AdminRequestContext,
  ): Promise<AdminLessonDto> {
    const existing = await this.adminCoursesRepository.findLessonById(id);

    if (!existing) {
      throw new NotFoundException('Lesson not found');
    }

    const oldValue = {
      slug: existing.slug,
      title: existing.title,
      difficulty: existing.difficulty,
    };

    try {
      const updated = await this.adminCoursesRepository.updateLesson(id, dto);

      await this.auditLogService.log(
        AuditAction.CONTENT_UPDATED,
        'Lesson',
        id,
        context,
        {
          oldValue,
          newValue: { ...dto } as Record<string, unknown>,
        },
      );

      return this.formatLesson({ ...updated, completions: existing._count.progress });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Lesson with this slug and difficulty already exists in this level');
      }
      throw error;
    }
  }

  async deleteLesson(
    id: string,
    context: AdminRequestContext,
  ): Promise<DeleteContentResponseDto> {
    const existing = await this.adminCoursesRepository.findLessonById(id);

    if (!existing) {
      throw new NotFoundException('Lesson not found');
    }

    await this.adminCoursesRepository.deleteLesson(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_DELETED,
      'Lesson',
      id,
      context,
      {
        oldValue: { slug: existing.slug, title: existing.title },
      },
    );

    return {
      success: true,
      message: 'Lesson has been deleted',
    };
  }

  async publishLesson(
    id: string,
    context: AdminRequestContext,
  ): Promise<PublishResponseDto> {
    const existing = await this.adminCoursesRepository.findLessonById(id);

    if (!existing) {
      throw new NotFoundException('Lesson not found');
    }

    await this.adminCoursesRepository.publishLesson(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_PUBLISHED,
      'Lesson',
      id,
      context,
      {
        oldValue: { isPublished: false },
        newValue: { isPublished: true },
      },
    );

    return {
      success: true,
      message: 'Lesson has been published',
    };
  }

  async unpublishLesson(
    id: string,
    context: AdminRequestContext,
  ): Promise<PublishResponseDto> {
    const existing = await this.adminCoursesRepository.findLessonById(id);

    if (!existing) {
      throw new NotFoundException('Lesson not found');
    }

    await this.adminCoursesRepository.unpublishLesson(id);

    await this.auditLogService.log(
      AuditAction.CONTENT_UNPUBLISHED,
      'Lesson',
      id,
      context,
      {
        oldValue: { isPublished: true },
        newValue: { isPublished: false },
      },
    );

    return {
      success: true,
      message: 'Lesson has been unpublished',
    };
  }

  // ============================================================================
  // Formatters
  // ============================================================================

  private formatCourse(course: any): AdminCourseDto {
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      titleEn: course.titleEn,
      titleFil: course.titleFil,
      description: course.description,
      language: course.language,
      iconUrl: course.iconUrl,
      color: course.color,
      orderIndex: course.orderIndex,
      isPublished: course.isPublished,
      totalLevels: course.totalLevels,
      totalLessons: course.totalLessons,
      enrolledUsers: course.enrolledUsers,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  }

  private formatCourseDetail(course: any): AdminCourseDetailDto {
    return {
      ...this.formatCourse(course),
      levels: course.levels.map((level: any) => this.formatLevelDetail(level)),
    };
  }

  private formatLevel(level: any): AdminLevelDto {
    return {
      id: level.id,
      courseId: level.courseId,
      slug: level.slug,
      title: level.title,
      description: level.description,
      orderIndex: level.orderIndex,
      isPublished: level.isPublished,
      totalLessons: level.totalLessons,
      createdAt: level.createdAt,
      updatedAt: level.updatedAt,
    };
  }

  private formatLevelDetail(level: any): AdminLevelDetailDto {
    return {
      ...this.formatLevel(level),
      lessons: level.lessons.map((lesson: any) => this.formatLesson(lesson)),
    };
  }

  private formatLesson(lesson: any): AdminLessonDto {
    return {
      id: lesson.id,
      levelId: lesson.levelId,
      slug: lesson.slug,
      title: lesson.title,
      content: lesson.content as Record<string, unknown> | null,
      difficulty: lesson.difficulty,
      xpReward: lesson.xpReward,
      orderIndex: lesson.orderIndex,
      isPublished: lesson.isPublished,
      completions: lesson.completions,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
    };
  }
}
