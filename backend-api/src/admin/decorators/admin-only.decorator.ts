import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { ADMIN_ONLY_KEY, AdminGuard } from '../guards/admin.guard';

/**
 * Decorator that restricts access to ADMIN role only.
 * Use this for user management, audit logs, and system configuration.
 */
export const AdminOnly = () =>
  applyDecorators(
    SetMetadata(ADMIN_ONLY_KEY, true),
    UseGuards(AdminGuard),
    ApiBearerAuth(),
    ApiForbiddenResponse({ description: 'Admin access required' }),
  );
