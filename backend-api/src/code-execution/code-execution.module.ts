import { Module } from '@nestjs/common';
import { LessonsModule } from '../lessons/lessons.module';
import { GamificationModule } from '../gamification/gamification.module';
import { CodeExecutionController } from './code-execution.controller';
import { CodeExecutionService, PistonService } from './services';

@Module({
  imports: [LessonsModule, GamificationModule],
  controllers: [CodeExecutionController],
  providers: [CodeExecutionService, PistonService],
  exports: [CodeExecutionService],
})
export class CodeExecutionModule {}
