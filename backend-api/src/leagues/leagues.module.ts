import { Module } from '@nestjs/common';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { LeaguesRepository } from './leagues.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LeaguesController],
  providers: [LeaguesService, LeaguesRepository],
  exports: [LeaguesService],
})
export class LeaguesModule {}
