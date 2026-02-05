import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { CONTENT_ADMIN_KEY, ContentAdminGuard } from '../guards/content-admin.guard';

/**
 * Decorator that restricts access to ADMIN or MODERATOR roles.
 * Use this for content management (courses, levels, lessons) and dashboard view.
 */
export const ContentAdmin = () =>
  applyDecorators(
    SetMetadata(CONTENT_ADMIN_KEY, true),
    UseGuards(ContentAdminGuard),
    ApiBearerAuth(),
    ApiForbiddenResponse({ description: 'Content admin access required' }),
  );
