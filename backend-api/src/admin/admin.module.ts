import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

// Controllers
import {
  AdminAuditController,
  AdminUsersController,
  AdminCoursesController,
  AdminDashboardController,
} from './controllers';

// Services
import {
  AuditLogService,
  AdminUsersService,
  AdminCoursesService,
  AdminDashboardService,
} from './services';

// Repositories
import {
  AuditLogRepository,
  AdminUsersRepository,
  AdminCoursesRepository,
} from './repositories';

// Guards
import { AdminGuard, ContentAdminGuard } from './guards';

@Module({
  imports: [PrismaModule],
  controllers: [
    AdminAuditController,
    AdminUsersController,
    AdminCoursesController,
    AdminDashboardController,
  ],
  providers: [
    // Services
    AuditLogService,
    AdminUsersService,
    AdminCoursesService,
    AdminDashboardService,

    // Repositories
    AuditLogRepository,
    AdminUsersRepository,
    AdminCoursesRepository,

    // Guards
    AdminGuard,
    ContentAdminGuard,
  ],
  exports: [
    AuditLogService,
    AdminUsersService,
    AdminCoursesService,
    AdminDashboardService,
  ],
})
export class AdminModule {}
