import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type SearchType = 'courses' | 'lessons' | 'challenges' | 'users';

@Injectable()
export class SearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchAll(q: string, type?: SearchType, limit: number = 10) {
    if (type) {
      switch (type) {
        case 'courses':
          return {
            courses: await this.searchCourses(q, limit),
            lessons: [],
            challenges: [],
            users: [],
          };
        case 'lessons':
          return {
            courses: [],
            lessons: await this.searchLessons(q, limit),
            challenges: [],
            users: [],
          };
        case 'challenges':
          return {
            courses: [],
            lessons: [],
            challenges: await this.searchChallenges(q, limit),
            users: [],
          };
        case 'users':
          return {
            courses: [],
            lessons: [],
            challenges: [],
            users: await this.searchUsers(q, limit),
          };
      }
    }

    const [courses, lessons, challenges, users] = await Promise.all([
      this.searchCourses(q, limit),
      this.searchLessons(q, limit),
      this.searchChallenges(q, limit),
      this.searchUsers(q, limit),
    ]);

    return { courses, lessons, challenges, users };
  }

  async searchCourses(q: string, limit: number) {
    return this.prisma.course.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        language: true,
        iconUrl: true,
      },
      take: limit,
    });
  }

  async searchLessons(q: string, limit: number) {
    return this.prisma.lesson.findMany({
      where: {
        isPublished: true,
        title: { contains: q, mode: 'insensitive' },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        difficulty: true,
        level: {
          select: {
            course: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
      take: limit,
    });
  }

  async searchChallenges(q: string, limit: number) {
    return this.prisma.codeChallenge.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        languageId: true,
      },
      take: limit,
    });
  }

  async searchUsers(q: string, limit: number) {
    return this.prisma.user.findMany({
      where: {
        isActive: true,
        isBanned: false,
        OR: [
          { username: { contains: q, mode: 'insensitive' } },
          { displayName: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
      },
      take: limit,
    });
  }
}
