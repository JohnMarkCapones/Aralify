import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LeaguesService } from '../../leagues/leagues.service';

@Injectable()
export class LeaguePromotionJob {
  private readonly logger = new Logger(LeaguePromotionJob.name);

  constructor(private readonly leaguesService: LeaguesService) {}

  @Cron('0 0 * * 1') // Every Monday at 00:00 UTC
  async handleWeeklyPromotions() {
    this.logger.log('Starting weekly league promotion job...');
    const result = await this.leaguesService.processWeeklyPromotions();
    this.logger.log(
      `League promotions complete: ${result.promoted} promoted, ${result.demoted} demoted, ${result.stayed} stayed`,
    );
  }
}
