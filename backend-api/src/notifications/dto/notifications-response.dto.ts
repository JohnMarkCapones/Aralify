import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';

export class NotificationDto {
  @ApiProperty({ example: 'clxyz123' })
  id!: string;

  @ApiProperty({
    example: 'ACHIEVEMENT_EARNED',
    description: 'Type of notification',
    enum: NotificationType,
  })
  type!: NotificationType;

  @ApiProperty({ example: 'Achievement Unlocked!' })
  title!: string;

  @ApiProperty({ example: "You earned 'First Steps'" })
  message!: string;

  @ApiPropertyOptional({
    example: { achievementId: 'clxyz456', achievementSlug: 'first-steps' },
    description: 'Additional notification data',
  })
  data?: Record<string, unknown> | null;

  @ApiProperty({ example: false })
  isRead!: boolean;

  @ApiPropertyOptional({ example: '2025-01-15T10:35:00.000Z' })
  readAt?: string | null;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  createdAt!: string;
}

export class NotificationsListResponseDto {
  @ApiProperty({ type: [NotificationDto] })
  notifications!: NotificationDto[];

  @ApiProperty({ example: 5 })
  unread_count!: number;

  @ApiProperty({ example: true })
  has_more!: boolean;
}

export class MarkReadResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty()
  notification!: NotificationDto;
}

export class MarkAllReadResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 5 })
  marked_count!: number;
}

export class DeleteNotificationResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;
}

export class ClearNotificationsResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 10 })
  deleted_count!: number;
}

export class UnreadCountResponseDto {
  @ApiProperty({ example: 3 })
  unread_count!: number;
}

export class SubscribeResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'clxyz789' })
  subscription_id!: string;
}

export class UnsubscribeResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;
}
