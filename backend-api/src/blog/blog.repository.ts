import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: {
    category?: string;
    page: number;
    limit: number;
  }): Promise<{ data: any[]; total: number }> {
    const where: any = {
      isPublished: true,
    };

    if (options.category) {
      where.category = options.category;
    }

    const skip = (options.page - 1) * options.limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: options.limit,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          coverImageUrl: true,
          category: true,
          tags: true,
          authorName: true,
          publishedAt: true,
        },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return { data, total };
  }

  async findBySlug(slug: string) {
    return this.prisma.blogPost.findUnique({
      where: {
        slug,
        isPublished: true,
      },
    });
  }
}
