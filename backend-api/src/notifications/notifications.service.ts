import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeviceType, Notification, NotificationType } from '@prisma/client';
import { NotificationsRepository } from './notifications.repository';
import {
  ClearNotificationsResponseDto,
  DeleteNotificationResponseDto,
  MarkAllReadResponseDto,
  MarkReadResponseDto,
  NotificationDto,
  NotificationsListResponseDto,
  SubscribeResponseDto,
  UnreadCountResponseDto,
  UnsubscribeResponseDto,
} from './dto';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  // ── Public API Methods ───────────────────────────────────

  async getNotifications(
    userId: string,
    unread?: boolean,
    limit?: number,
    offset?: number,
  ): Promise<NotificationsListResponseDto> {
    const l = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const o = offset ?? 0;

    const { notifications, total, unreadCount } =
      await this.notificationsRepository.getNotifications(userId, unread, l, o);

    return {
      notifications: notifications.map((n) => this.formatNotification(n)),
      unread_count: unreadCount,
      has_more: o + l < total,
    };
  }

  async getUnreadCount(userId: string): Promise<UnreadCountResponseDto> {
    const unreadCount =
      await this.notificationsRepository.getUnreadCount(userId);

    return { unread_count: unreadCount };
  }

  async markAsRead(
    userId: string,
    notificationId: string,
  ): Promise<MarkReadResponseDto> {
    const notification =
      await this.notificationsRepository.getNotificationById(notificationId);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('Cannot access this notification');
    }

    const updated =
      await this.notificationsRepository.markAsRead(notificationId);

    return {
      success: true,
      notification: this.formatNotification(updated),
    };
  }

  async markAllAsRead(userId: string): Promise<MarkAllReadResponseDto> {
    const markedCount =
      await this.notificationsRepository.markAllAsRead(userId);

    return {
      success: true,
      marked_count: markedCount,
    };
  }

  async deleteNotification(
    userId: string,
    notificationId: string,
  ): Promise<DeleteNotificationResponseDto> {
    const notification =
      await this.notificationsRepository.getNotificationById(notificationId);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('Cannot delete this notification');
    }

    await this.notificationsRepository.deleteNotification(notificationId);

    return { success: true };
  }

  async clearReadNotifications(
    userId: string,
  ): Promise<ClearNotificationsResponseDto> {
    const deletedCount =
      await this.notificationsRepository.deleteReadNotifications(userId);

    return {
      success: true,
      deleted_count: deletedCount,
    };
  }

  async subscribePush(
    userId: string,
    deviceToken: string,
    deviceType: DeviceType,
    deviceId?: string,
  ): Promise<SubscribeResponseDto> {
    const subscription =
      await this.notificationsRepository.createPushSubscription(
        userId,
        deviceToken,
        deviceType,
        deviceId,
      );

    return {
      success: true,
      subscription_id: subscription.id,
    };
  }

  async unsubscribePush(
    userId: string,
    deviceToken: string,
  ): Promise<UnsubscribeResponseDto> {
    await this.notificationsRepository.deletePushSubscription(
      userId,
      deviceToken,
    );

    return { success: true };
  }

  // ── Internal Methods (for other services) ────────────────

  async notify(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>,
  ): Promise<Notification> {
    return this.notificationsRepository.createNotification(
      userId,
      type,
      title,
      message,
      data,
    );
  }

  async notifyAchievement(
    userId: string,
    achievementTitle: string,
    achievementId?: string,
  ): Promise<void> {
    await this.notify(
      userId,
      NotificationType.ACHIEVEMENT_EARNED,
      'Achievement Unlocked!',
      `You earned '${achievementTitle}'`,
      achievementId ? { achievementId } : undefined,
    );
  }

  async notifyBadge(
    userId: string,
    badgeTitle: string,
    badgeId?: string,
  ): Promise<void> {
    await this.notify(
      userId,
      NotificationType.BADGE_EARNED,
      'New Badge!',
      `You earned the '${badgeTitle}' badge`,
      badgeId ? { badgeId } : undefined,
    );
  }

  async notifyLevelUp(userId: string, newLevel: number): Promise<void> {
    await this.notify(
      userId,
      NotificationType.LEVEL_UP,
      'Level Up!',
      `You reached Level ${newLevel}`,
      { level: newLevel },
    );
  }

  async notifyNewFollower(
    userId: string,
    followerUsername: string,
    followerId?: string,
  ): Promise<void> {
    await this.notify(
      userId,
      NotificationType.NEW_FOLLOWER,
      'New Follower',
      `@${followerUsername} started following you`,
      followerId ? { followerId, followerUsername } : { followerUsername },
    );
  }

  async notifyCommentReply(
    userId: string,
    replierUsername: string,
    lessonTitle: string,
    commentId?: string,
  ): Promise<void> {
    await this.notify(
      userId,
      NotificationType.COMMENT_REPLY,
      'New Reply',
      `@${replierUsername} replied to your comment on '${lessonTitle}'`,
      { replierUsername, lessonTitle, ...(commentId && { commentId }) },
    );
  }

  async notifyCommentLike(
    userId: string,
    likerUsername: string,
    commentId?: string,
  ): Promise<void> {
    await this.notify(
      userId,
      NotificationType.COMMENT_LIKE,
      'Comment Liked',
      `@${likerUsername} liked your comment`,
      { likerUsername, ...(commentId && { commentId }) },
    );
  }

  async notifyStreakReminder(
    userId: string,
    currentStreak: number,
  ): Promise<void> {
    await this.notify(
      userId,
      NotificationType.STREAK_REMINDER,
      'Keep your streak!',
      `Don't forget to practice today. You're on a ${currentStreak}-day streak!`,
      { currentStreak },
    );
  }

  async notifyStreakBroken(userId: string, lostStreak: number): Promise<void> {
    await this.notify(
      userId,
      NotificationType.STREAK_BROKEN,
      'Streak Lost',
      `Your ${lostStreak}-day streak has ended. Start a new one today!`,
      { lostStreak },
    );
  }

  async notifyCourseUpdate(
    userId: string,
    courseName: string,
    courseId?: string,
  ): Promise<void> {
    await this.notify(
      userId,
      NotificationType.COURSE_UPDATE,
      'Course Updated',
      `${courseName} has new content`,
      { courseName, ...(courseId && { courseId }) },
    );
  }

  async notifySystem(
    userId: string,
    title: string,
    message: string,
    data?: Record<string, unknown>,
  ): Promise<void> {
    await this.notify(userId, NotificationType.SYSTEM, title, message, data);
  }

  // ── Private Helpers ──────────────────────────────────────

  private formatNotification(notification: Notification): NotificationDto {
    return {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      data: notification.data as Record<string, unknown> | null,
      isRead: notification.isRead,
      readAt: notification.readAt?.toISOString() ?? null,
      createdAt: notification.createdAt.toISOString(),
    };
  }
}
