import { Module } from '@nestjs/common';
import { GamificationModule } from '../gamification/gamification.module';
import { LeaguesModule } from '../leagues/leagues.module';
import { LeaderboardsModule } from '../leaderboards/leaderboards.module';
import { XpDecayJob, LeaguePromotionJob, LeaderboardSnapshotJob } from './jobs';

@Module({
  imports: [GamificationModule, LeaguesModule, LeaderboardsModule],
  providers: [XpDecayJob, LeaguePromotionJob, LeaderboardSnapshotJob],
})
export class SchedulingModule {}
