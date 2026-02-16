import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShowcaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly userSelect = {
    username: true,
    displayName: true,
    avatarUrl: true,
  };

  async findMany(options: { page: number; limit: number }) {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.showcaseProject.findMany({
        where: { status: 'APPROVED' },
        include: {
          user: { select: this.userSelect },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      this.prisma.showcaseProject.count({
        where: { status: 'APPROVED' },
      }),
    ]);

    return { data, total };
  }

  async findBySlug(slug: string) {
    return this.prisma.showcaseProject.findUnique({
      where: { slug },
      include: {
        user: { select: this.userSelect },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.showcaseProject.findUnique({
      where: { id },
    });
  }

  async create(data: {
    userId: string;
    slug: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
    tags?: string[];
  }) {
    return this.prisma.showcaseProject.create({
      data: {
        userId: data.userId,
        slug: data.slug,
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        liveUrl: data.liveUrl,
        repoUrl: data.repoUrl,
        tags: data.tags ?? undefined,
      },
      include: {
        user: { select: this.userSelect },
      },
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      thumbnailUrl?: string;
      liveUrl?: string;
      repoUrl?: string;
      tags?: string[];
    },
  ) {
    // Filter out undefined values to avoid overwriting with undefined
    const updateData: Record<string, any> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.thumbnailUrl !== undefined) updateData.thumbnailUrl = data.thumbnailUrl;
    if (data.liveUrl !== undefined) updateData.liveUrl = data.liveUrl;
    if (data.repoUrl !== undefined) updateData.repoUrl = data.repoUrl;
    if (data.tags !== undefined) updateData.tags = data.tags;

    return this.prisma.showcaseProject.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: this.userSelect },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.showcaseProject.delete({
      where: { id },
    });
  }
}
