import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

export const CONTENT_ADMIN_KEY = 'contentAdmin';

@Injectable()
export class ContentAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isContentAdmin = this.reflector.getAllAndOverride<boolean>(
      CONTENT_ADMIN_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If not marked as content admin, allow access
    if (!isContentAdmin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    // Both ADMIN and MODERATOR can access content management
    if (user.role !== UserRole.ADMIN && user.role !== UserRole.MODERATOR) {
      throw new ForbiddenException('Content admin access required');
    }

    return true;
  }
}
