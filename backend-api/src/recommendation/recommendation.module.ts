import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { RecommendationRepository } from './recommendation.repository';
import {
  ProfilingService,
  PathScoringService,
  DifficultyCalibrationService,
  CollaborativeService,
  EngagementService,
  StudyPlanService,
} from './services';
import { CareerPathController } from './career-path/career-path.controller';
import { CareerPathService } from './career-path/career-path.service';

@Module({
  imports: [PrismaModule],
  controllers: [RecommendationController, CareerPathController],
  providers: [
    RecommendationRepository,
    ProfilingService,
    PathScoringService,
    DifficultyCalibrationService,
    CollaborativeService,
    EngagementService,
    StudyPlanService,
    RecommendationService,
    CareerPathService,
  ],
  exports: [
    RecommendationService,
    DifficultyCalibrationService,
    EngagementService,
    StudyPlanService,
  ],
})
export class RecommendationModule {}
