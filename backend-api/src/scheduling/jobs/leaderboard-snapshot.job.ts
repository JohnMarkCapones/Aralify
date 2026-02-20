import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LeaderboardsService } from '../../leaderboards/leaderboards.service';

@Injectable()
export class LeaderboardSnapshotJob {
  private readonly logger = new Logger(LeaderboardSnapshotJob.name);

  constructor(private readonly leaderboardsService: LeaderboardsService) {}

  @Cron('0 */6 * * *') // Every 6 hours
  async handleSnapshotGeneration() {
    this.logger.log('Starting leaderboard snapshot generation...');
    const result = await this.leaderboardsService.generateSnapshots();
    this.logger.log(
      `Leaderboard snapshots generated: ${result.snapshotsCreated} snapshots created`,
    );
  }
}
