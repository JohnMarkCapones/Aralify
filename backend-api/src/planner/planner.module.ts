import { Module } from '@nestjs/common';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';
import { PlannerRepository } from './planner.repository';

@Module({
  controllers: [PlannerController],
  providers: [PlannerService, PlannerRepository],
  exports: [PlannerService],
})
export class PlannerModule {}
