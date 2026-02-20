"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const courses_module_1 = require("./courses/courses.module");
const lessons_module_1 = require("./lessons/lessons.module");
const users_module_1 = require("./users/users.module");
const gamification_module_1 = require("./gamification/gamification.module");
const social_module_1 = require("./social/social.module");
const leaderboards_module_1 = require("./leaderboards/leaderboards.module");
const admin_module_1 = require("./admin/admin.module");
const comments_module_1 = require("./comments/comments.module");
const notifications_module_1 = require("./notifications/notifications.module");
const code_execution_module_1 = require("./code-execution/code-execution.module");
const recommendation_module_1 = require("./recommendation/recommendation.module");
const challenges_module_1 = require("./challenges/challenges.module");
const bookmarks_module_1 = require("./bookmarks/bookmarks.module");
const planner_module_1 = require("./planner/planner.module");
const blog_module_1 = require("./blog/blog.module");
const showcase_module_1 = require("./showcase/showcase.module");
const search_module_1 = require("./search/search.module");
const leagues_module_1 = require("./leagues/leagues.module");
const scheduling_module_1 = require("./scheduling/scheduling.module");
const guards_1 = require("./auth/guards");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 60,
                }]),
            event_emitter_1.EventEmitterModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            courses_module_1.CoursesModule,
            lessons_module_1.LessonsModule,
            users_module_1.UsersModule,
            gamification_module_1.GamificationModule,
            social_module_1.SocialModule,
            leaderboards_module_1.LeaderboardsModule,
            admin_module_1.AdminModule,
            comments_module_1.CommentsModule,
            notifications_module_1.NotificationsModule,
            code_execution_module_1.CodeExecutionModule,
            recommendation_module_1.RecommendationModule,
            challenges_module_1.ChallengesModule,
            bookmarks_module_1.BookmarksModule,
            planner_module_1.PlannerModule,
            blog_module_1.BlogModule,
            showcase_module_1.ShowcaseModule,
            search_module_1.SearchModule,
            leagues_module_1.LeaguesModule,
            scheduling_module_1.SchedulingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map