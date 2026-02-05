import { AuditAction, UserRole } from '@prisma/client';

export interface AdminRequestContext {
  adminId: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuditLogEntry {
  adminId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  isBanned?: boolean;
  isActive?: boolean;
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  totalCourses: number;
  publishedCourses: number;
  totalLessons: number;
  publishedLessons: number;
  totalXpAwarded: number;
  averageCompletionRate: number;
}

export interface SystemHealth {
  database: 'healthy' | 'degraded' | 'down';
  lastChecked: Date;
  uptime: number;
}
