import { Module } from '@nestjs/common';
import { LeaderboardsController } from './leaderboards.controller';
import { LeaderboardsService } from './leaderboards.service';
import { LeaderboardsRepository } from './leaderboards.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LeaderboardsController],
  providers: [LeaderboardsService, LeaderboardsRepository],
  exports: [LeaderboardsService],
})
export class LeaderboardsModule {}
