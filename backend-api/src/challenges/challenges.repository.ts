import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallengesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: {
    difficulty?: string;
    language?: number;
    page: number;
    limit: number;
  }): Promise<[any[], number]> {
    const where: any = {};

    if (options.difficulty) {
      where.lesson = {
        ...where.lesson,
        difficulty: options.difficulty.toUpperCase(),
      };
    }

    if (options.language !== undefined) {
      where.languageId = options.language;
    }

    const skip = (options.page - 1) * options.limit;

    const [challenges, total] = await Promise.all([
      this.prisma.codeChallenge.findMany({
        where,
        skip,
        take: options.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          lesson: {
            select: {
              title: true,
              difficulty: true,
            },
          },
          _count: {
            select: { submissions: true },
          },
        },
      }),
      this.prisma.codeChallenge.count({ where }),
    ]);

    return [challenges, total];
  }

  async findDailyChallenge(date: Date) {
    return this.prisma.dailyChallenge.findUnique({
      where: { date },
      include: {
        challenge: {
          include: {
            lesson: {
              select: {
                title: true,
                difficulty: true,
              },
            },
            _count: {
              select: { submissions: true },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.codeChallenge.findUnique({
      where: { id },
      include: {
        lesson: {
          select: {
            title: true,
            difficulty: true,
          },
        },
      },
    });
  }
}
