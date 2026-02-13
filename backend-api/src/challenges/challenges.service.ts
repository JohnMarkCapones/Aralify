import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengesRepository } from './challenges.repository';

@Injectable()
export class ChallengesService {
  constructor(private readonly challengesRepository: ChallengesRepository) {}

  async findAll(options: {
    difficulty?: string;
    language?: number;
    page: number;
    limit: number;
  }) {
    const [challenges, total] = await this.challengesRepository.findMany({
      difficulty: options.difficulty,
      language: options.language,
      page: options.page,
      limit: options.limit,
    });

    return {
      data: challenges.map((challenge) => this.formatListItem(challenge)),
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async getDailyChallenge() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyChallenge =
      await this.challengesRepository.findDailyChallenge(today);

    if (!dailyChallenge) {
      throw new NotFoundException('No daily challenge set for today');
    }

    return {
      date: dailyChallenge.date,
      challenge: this.formatListItem(dailyChallenge.challenge),
    };
  }

  async findById(id: string) {
    const challenge = await this.challengesRepository.findById(id);

    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    return this.formatDetail(challenge);
  }

  // Helper methods
  private formatListItem(challenge: any) {
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      languageId: challenge.languageId,
      difficulty: challenge.lesson?.difficulty?.toLowerCase() ?? null,
      submissionCount: challenge._count?.submissions ?? 0,
    };
  }

  private formatDetail(challenge: any) {
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      starterCode: challenge.starterCode,
      testCases: challenge.testCases,
      hints: challenge.hints,
      languageId: challenge.languageId,
      lessonTitle: challenge.lesson?.title ?? null,
    };
  }
}
