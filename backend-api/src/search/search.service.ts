import { Injectable } from '@nestjs/common';
import { SearchRepository, SearchType } from './search.repository';
import {
  SearchResultsDto,
  SearchCourseResultDto,
  SearchLessonResultDto,
  SearchChallengeResultDto,
  SearchUserResultDto,
} from './dto';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async search(
    q: string,
    type?: SearchType,
    limit: number = 10,
  ): Promise<SearchResultsDto> {
    const results = await this.searchRepository.searchAll(q, type, limit);

    return {
      courses: results.courses.map(
        (course): SearchCourseResultDto => ({
          id: course.id,
          slug: course.slug,
          title: course.title,
          description: course.description,
          language: course.language,
          iconUrl: course.iconUrl,
          type: 'course',
        }),
      ),
      lessons: results.lessons.map(
        (lesson: any): SearchLessonResultDto => ({
          id: lesson.id,
          slug: lesson.slug,
          title: lesson.title,
          difficulty: lesson.difficulty,
          courseSlug: lesson.level?.course?.slug ?? null,
          type: 'lesson',
        }),
      ),
      challenges: results.challenges.map(
        (challenge): SearchChallengeResultDto => ({
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          languageId: challenge.languageId,
          type: 'challenge',
        }),
      ),
      users: results.users.map(
        (user): SearchUserResultDto => ({
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
          type: 'user',
        }),
      ),
    };
  }
}
