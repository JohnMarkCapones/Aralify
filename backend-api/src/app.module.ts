import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { UsersModule } from './users/users.module';
import { GamificationModule } from './gamification/gamification.module';
import { SocialModule } from './social/social.module';
import { LeaderboardsModule } from './leaderboards/leaderboards.module';
import { AdminModule } from './admin/admin.module';
import { JwtAuthGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    CoursesModule,
    LessonsModule,
    UsersModule,
    GamificationModule,
    SocialModule,
    LeaderboardsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global JWT guard - all routes require auth by default
    // Use @Public() decorator to make routes public
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
