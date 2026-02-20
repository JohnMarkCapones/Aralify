import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SocialController } from './social.controller';
import { SocialRepository } from './social.repository';
import { SocialService } from './social.service';

@Module({
  imports: [PrismaModule],
  controllers: [SocialController],
  providers: [SocialService, SocialRepository],
  exports: [SocialService],
})
export class SocialModule {}
