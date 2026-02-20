import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import {
  BlogPostListResponseDto,
  BlogPostDetailDto,
} from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async findAll(options: {
    category?: string;
    page: number;
    limit: number;
  }): Promise<BlogPostListResponseDto> {
    const page = Math.max(1, options.page);
    const limit = Math.min(50, Math.max(1, options.limit));

    const { data, total } = await this.blogRepository.findMany({
      category: options.category,
      page,
      limit,
    });

    return {
      data: data.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        coverImageUrl: post.coverImageUrl,
        category: post.category,
        tags: (post.tags as string[]) ?? [],
        authorName: post.authorName,
        publishedAt: post.publishedAt,
      })),
      total,
      page,
      limit,
    };
  }

  async findBySlug(slug: string): Promise<BlogPostDetailDto> {
    const post = await this.blogRepository.findBySlug(slug);

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImageUrl: post.coverImageUrl,
      category: post.category,
      tags: (post.tags as string[]) ?? [],
      authorName: post.authorName,
      publishedAt: post.publishedAt,
      content: post.content,
    };
  }
}
