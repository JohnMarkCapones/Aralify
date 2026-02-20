import { Module } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { GamificationRepository } from './gamification.repository';
import {
  GamificationService,
  XpService,
  StreaksService,
  AchievementsService,
  BadgesService,
  XpDecayService,
} from './services';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GamificationController],
  providers: [
    GamificationRepository,
    XpService,
    StreaksService,
    AchievementsService,
    BadgesService,
    XpDecayService,
    GamificationService,
  ],
  exports: [
    GamificationService,
    XpService,
    StreaksService,
    AchievementsService,
    BadgesService,
    XpDecayService,
  ],
})
export class GamificationModule {}
