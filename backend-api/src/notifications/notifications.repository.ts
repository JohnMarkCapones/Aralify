import { Injectable } from '@nestjs/common';
import { DeviceType, NotificationType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ── Notifications ────────────────────────────────────────

  async getNotifications(
    userId: string,
    unread?: boolean,
    limit: number = 20,
    offset: number = 0,
  ) {
    const where: { userId: string; isRead?: boolean } = { userId };
    if (unread !== undefined) {
      where.isRead = !unread;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.notification.count({ where }),
      this.prisma.notification.count({ where: { userId, isRead: false } }),
    ]);

    return { notifications, total, unreadCount };
  }

  async getNotificationById(id: string) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>,
  ) {
    return this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data: data as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return result.count;
  }

  async deleteNotification(id: string): Promise<void> {
    await this.prisma.notification.delete({
      where: { id },
    });
  }

  async deleteReadNotifications(userId: string): Promise<number> {
    const result = await this.prisma.notification.deleteMany({
      where: { userId, isRead: true },
    });

    return result.count;
  }

  // ── Push Subscriptions ───────────────────────────────────

  async createPushSubscription(
    userId: string,
    deviceToken: string,
    deviceType: DeviceType,
    deviceId?: string,
  ) {
    return this.prisma.pushSubscription.upsert({
      where: {
        userId_deviceToken: { userId, deviceToken },
      },
      create: {
        userId,
        deviceToken,
        deviceType,
        deviceId,
        isActive: true,
      },
      update: {
        deviceType,
        deviceId,
        isActive: true,
        updatedAt: new Date(),
      },
    });
  }

  async deletePushSubscription(
    userId: string,
    deviceToken: string,
  ): Promise<void> {
    await this.prisma.pushSubscription.deleteMany({
      where: { userId, deviceToken },
    });
  }

  async findPushSubscription(userId: string, deviceToken: string) {
    return this.prisma.pushSubscription.findUnique({
      where: {
        userId_deviceToken: { userId, deviceToken },
      },
    });
  }

  async getActiveSubscriptions(userId: string) {
    return this.prisma.pushSubscription.findMany({
      where: { userId, isActive: true },
    });
  }
}
