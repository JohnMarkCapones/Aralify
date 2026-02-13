import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShowcaseRepository } from './showcase.repository';
import {
  CreateShowcaseDto,
  UpdateShowcaseDto,
  ShowcaseAuthorDto,
  ShowcaseProjectDto,
  ShowcaseListResponseDto,
} from './dto';

@Injectable()
export class ShowcaseService {
  constructor(private readonly showcaseRepository: ShowcaseRepository) {}

  async findAll(options: {
    page: number;
    limit: number;
  }): Promise<ShowcaseListResponseDto> {
    const { page, limit } = options;
    const { data, total } = await this.showcaseRepository.findMany({ page, limit });

    return {
      data: data.map((project) => this.formatProject(project)),
      total,
      page,
      limit,
    };
  }

  async findBySlug(slug: string): Promise<ShowcaseProjectDto> {
    const project = await this.showcaseRepository.findBySlug(slug);

    if (!project) {
      throw new NotFoundException('Showcase project not found');
    }

    return this.formatProject(project);
  }

  async create(userId: string, dto: CreateShowcaseDto): Promise<ShowcaseProjectDto> {
    const slug = this.generateSlug(dto.title);

    const project = await this.showcaseRepository.create({
      userId,
      slug,
      title: dto.title,
      description: dto.description,
      thumbnailUrl: dto.thumbnailUrl,
      liveUrl: dto.liveUrl,
      repoUrl: dto.repoUrl,
      tags: dto.tags,
    });

    return this.formatProject(project);
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateShowcaseDto,
  ): Promise<ShowcaseProjectDto> {
    const existing = await this.showcaseRepository.findById(id);

    if (!existing) {
      throw new NotFoundException('Showcase project not found');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenException('You can only update your own projects');
    }

    const updated = await this.showcaseRepository.update(id, {
      title: dto.title,
      description: dto.description,
      thumbnailUrl: dto.thumbnailUrl,
      liveUrl: dto.liveUrl,
      repoUrl: dto.repoUrl,
      tags: dto.tags,
    });

    return this.formatProject(updated);
  }

  async remove(userId: string, id: string): Promise<{ success: boolean }> {
    const existing = await this.showcaseRepository.findById(id);

    if (!existing) {
      throw new NotFoundException('Showcase project not found');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    await this.showcaseRepository.delete(id);

    return { success: true };
  }

  private generateSlug(title: string): string {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const randomChars = Math.random().toString(36).substring(2, 6);

    return `${base}-${randomChars}`;
  }

  private formatProject(project: any): ShowcaseProjectDto {
    const author: ShowcaseAuthorDto = {
      username: project.user.username,
      displayName: project.user.displayName,
      avatarUrl: project.user.avatarUrl,
    };

    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      description: project.description,
      thumbnailUrl: project.thumbnailUrl,
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      tags: project.tags as string[] | null,
      status: project.status,
      author,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    };
  }
}
