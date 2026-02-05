import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction, Prisma } from '@prisma/client';
import { AuditLogEntry, PaginationParams } from '../types';

@Injectable()
export class AuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AuditLogEntry) {
    return this.prisma.auditLog.create({
      data: {
        adminId: data.adminId,
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        oldValue: data.oldValue as Prisma.InputJsonValue,
        newValue: data.newValue as Prisma.InputJsonValue,
        description: data.reason,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
      include: {
        admin: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.auditLog.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
      },
    });
  }

  async findMany(options: {
    pagination: PaginationParams;
    adminId?: string;
    action?: AuditAction;
    entityType?: string;
    entityId?: string;
    from?: Date;
    to?: Date;
  }) {
    const { pagination, adminId, action, entityType, entityId, from, to } = options;
    const page = pagination.page || 1;
    const limit = pagination.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.AuditLogWhereInput = {};

    if (adminId) {
      where.adminId = adminId;
    }

    if (action) {
      where.action = action;
    }

    if (entityType) {
      where.entityType = entityType;
    }

    if (entityId) {
      where.entityId = entityId;
    }

    if (from || to) {
      where.createdAt = {};
      if (from) {
        where.createdAt.gte = from;
      }
      if (to) {
        where.createdAt.lte = to;
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: {
              id: true,
              username: true,
              displayName: true,
            },
          },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByEntity(entityType: string, entityId: string) {
    return this.prisma.auditLog.findMany({
      where: {
        entityType,
        entityId,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        admin: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
      },
    });
  }

  async findByAdmin(adminId: string, limit = 50) {
    return this.prisma.auditLog.findMany({
      where: { adminId },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        admin: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
      },
    });
  }
}
