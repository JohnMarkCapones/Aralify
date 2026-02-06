import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators';
import { NotificationsService } from './notifications.service';
import {
  NotificationsQueryDto,
  SubscribePushDto,
  UnsubscribePushDto,
  NotificationsListResponseDto,
  UnreadCountResponseDto,
  MarkReadResponseDto,
  MarkAllReadResponseDto,
  DeleteNotificationResponseDto,
  ClearNotificationsResponseDto,
  SubscribeResponseDto,
  UnsubscribeResponseDto,
} from './dto';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('api/v1/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get notifications list' })
  @ApiResponse({
    status: 200,
    description: 'Notifications retrieved successfully',
    type: NotificationsListResponseDto,
  })
  async getNotifications(
    @Query() query: NotificationsQueryDto,
    @CurrentUser() user: User,
  ): Promise<NotificationsListResponseDto> {
    return this.notificationsService.getNotifications(
      user.id,
      query.unread,
      query.limit,
      query.offset,
    );
  }

  @Get('count')
  @ApiOperation({ summary: 'Get unread notifications count' })
  @ApiResponse({
    status: 200,
    description: 'Unread count retrieved successfully',
    type: UnreadCountResponseDto,
  })
  async getUnreadCount(
    @CurrentUser() user: User,
  ): Promise<UnreadCountResponseDto> {
    return this.notificationsService.getUnreadCount(user.id);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read',
    type: MarkReadResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Cannot access this notification' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async markAsRead(
    @Param('id') notificationId: string,
    @CurrentUser() user: User,
  ): Promise<MarkReadResponseDto> {
    return this.notificationsService.markAsRead(user.id, notificationId);
  }

  @Put('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({
    status: 200,
    description: 'All notifications marked as read',
    type: MarkAllReadResponseDto,
  })
  async markAllAsRead(
    @CurrentUser() user: User,
  ): Promise<MarkAllReadResponseDto> {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification deleted successfully',
    type: DeleteNotificationResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Cannot delete this notification',
  })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async deleteNotification(
    @Param('id') notificationId: string,
    @CurrentUser() user: User,
  ): Promise<DeleteNotificationResponseDto> {
    return this.notificationsService.deleteNotification(user.id, notificationId);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear all read notifications' })
  @ApiResponse({
    status: 200,
    description: 'Read notifications cleared successfully',
    type: ClearNotificationsResponseDto,
  })
  async clearReadNotifications(
    @CurrentUser() user: User,
  ): Promise<ClearNotificationsResponseDto> {
    return this.notificationsService.clearReadNotifications(user.id);
  }

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe device to push notifications' })
  @ApiResponse({
    status: 201,
    description: 'Device subscribed successfully',
    type: SubscribeResponseDto,
  })
  async subscribePush(
    @Body() dto: SubscribePushDto,
    @CurrentUser() user: User,
  ): Promise<SubscribeResponseDto> {
    return this.notificationsService.subscribePush(
      user.id,
      dto.deviceToken,
      dto.deviceType,
      dto.deviceId,
    );
  }

  @Delete('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe device from push notifications' })
  @ApiResponse({
    status: 200,
    description: 'Device unsubscribed successfully',
    type: UnsubscribeResponseDto,
  })
  async unsubscribePush(
    @Body() dto: UnsubscribePushDto,
    @CurrentUser() user: User,
  ): Promise<UnsubscribeResponseDto> {
    return this.notificationsService.unsubscribePush(user.id, dto.deviceToken);
  }
}
