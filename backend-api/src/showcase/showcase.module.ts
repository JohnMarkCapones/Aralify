import { Module } from '@nestjs/common';
import { ShowcaseController } from './showcase.controller';
import { ShowcaseService } from './showcase.service';
import { ShowcaseRepository } from './showcase.repository';

@Module({
  controllers: [ShowcaseController],
  providers: [ShowcaseService, ShowcaseRepository],
  exports: [ShowcaseService],
})
export class ShowcaseModule {}
