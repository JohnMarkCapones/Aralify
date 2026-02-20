import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { AdminQuizController } from './admin-quiz.controller';
import { LessonsService } from './lessons.service';
import { LessonsRepository } from './lessons.repository';
import { QuizService } from './services/quiz.service';
import { ChallengeService } from './services/challenge.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GamificationModule } from '../gamification/gamification.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, GamificationModule, AuthModule],
  controllers: [LessonsController, AdminQuizController],
  providers: [LessonsService, LessonsRepository, QuizService, ChallengeService],
  exports: [LessonsService, LessonsRepository, QuizService, ChallengeService],
})
export class LessonsModule {}
