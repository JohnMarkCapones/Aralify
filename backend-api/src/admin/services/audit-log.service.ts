import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { AuditLogRepository } from '../repositories/audit-log.repository';
import { AuditLogEntry, AdminRequestContext } from '../types';
import { GetAuditLogsQueryDto, AuditLogDto, AuditLogDetailDto } from '../dto';

@Injectable()
export class AuditLogService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async log(
    action: AuditAction,
    entityType: string,
    entityId: string,
    context: AdminRequestContext,
    options?: {
      oldValue?: Record<string, unknown>;
      newValue?: Record<string, unknown>;
      reason?: string;
    },
  ): Promise<void> {
    const entry: AuditLogEntry = {
      adminId: context.adminId,
      action,
      entityType,
      entityId,
      oldValue: options?.oldValue,
      newValue: options?.newValue,
      reason: options?.reason,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    };

    await this.auditLogRepository.create(entry);
  }

  async findAll(query: GetAuditLogsQueryDto) {
    const result = await this.auditLogRepository.findMany({
      pagination: {
        page: query.page,
        limit: query.limit,
      },
      adminId: query.adminId,
      action: query.action,
      entityType: query.entityType,
      entityId: query.entityId,
      from: query.from ? new Date(query.from) : undefined,
      to: query.to ? new Date(query.to) : undefined,
    });

    return {
      data: result.data.map((log) => this.formatAuditLog(log)),
      pagination: result.pagination,
    };
  }

  async findById(id: string): Promise<AuditLogDetailDto> {
    const log = await this.auditLogRepository.findById(id);

    if (!log) {
      throw new NotFoundException('Audit log entry not found');
    }

    return this.formatAuditLogDetail(log);
  }

  async findByEntity(entityType: string, entityId: string) {
    const logs = await this.auditLogRepository.findByEntity(entityType, entityId);
    return logs.map((log) => this.formatAuditLog(log));
  }

  private formatAuditLog(log: any): AuditLogDto {
    return {
      id: log.id,
      admin: {
        id: log.admin.id,
        username: log.admin.username,
        displayName: log.admin.displayName,
      },
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      oldValue: log.oldValue as Record<string, unknown> | null,
      newValue: log.newValue as Record<string, unknown> | null,
      reason: log.reason,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      createdAt: log.createdAt,
    };
  }

  private formatAuditLogDetail(log: any): AuditLogDetailDto {
    return {
      ...this.formatAuditLog(log),
      entitySnapshot: log.newValue as Record<string, unknown> | undefined,
    };
  }
}
