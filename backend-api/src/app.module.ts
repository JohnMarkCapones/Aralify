import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
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
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CodeExecutionModule } from './code-execution/code-execution.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { ChallengesModule } from './challenges/challenges.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { PlannerModule } from './planner/planner.module';
import { BlogModule } from './blog/blog.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { SearchModule } from './search/search.module';
import { LeaguesModule } from './leagues/leagues.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { JwtAuthGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    CoursesModule,
    LessonsModule,
    UsersModule,
    GamificationModule,
    SocialModule,
    LeaderboardsModule,
    AdminModule,
    CommentsModule,
    NotificationsModule,
    CodeExecutionModule,
    RecommendationModule,
    ChallengesModule,
    BookmarksModule,
    PlannerModule,
    BlogModule,
    ShowcaseModule,
    SearchModule,
    LeaguesModule,
    SchedulingModule,
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
