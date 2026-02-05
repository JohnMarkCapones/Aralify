import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuditAction, UserRole } from '@prisma/client';
import { AdminUsersRepository } from '../repositories/admin-users.repository';
import { AuditLogService } from './audit-log.service';
import { AdminRequestContext } from '../types';
import {
  GetUsersQueryDto,
  BanUserDto,
  UnbanUserDto,
  ChangeUserRoleDto,
  DeleteUserDto,
  AdminUserDto,
  AdminUserDetailDto,
  AdminUserListResponseDto,
  BanUserResponseDto,
  UnbanUserResponseDto,
  ChangeRoleResponseDto,
  DeleteUserResponseDto,
} from '../dto';

@Injectable()
export class AdminUsersService {
  private readonly logger = new Logger(AdminUsersService.name);

  constructor(
    private readonly adminUsersRepository: AdminUsersRepository,
    private readonly auditLogService: AuditLogService,
  ) {}

  async findAll(query: GetUsersQueryDto): Promise<AdminUserListResponseDto> {
    const result = await this.adminUsersRepository.findMany({
      pagination: {
        page: query.page,
        limit: query.limit,
      },
      filters: {
        search: query.search,
        role: query.role,
        isBanned: query.isBanned,
        isActive: query.isActive,
      },
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    return {
      data: result.data.map((user) => this.formatUser(user)),
      pagination: result.pagination,
    };
  }

  async findById(id: string): Promise<AdminUserDetailDto> {
    const user = await this.adminUsersRepository.findByIdWithStats(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatUserDetail(user);
  }

  async banUser(
    id: string,
    dto: BanUserDto,
    context: AdminRequestContext,
  ): Promise<BanUserResponseDto> {
    const user = await this.adminUsersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (id === context.adminId) {
      throw new ForbiddenException('Cannot ban yourself');
    }

    if (user.isBanned) {
      throw new BadRequestException('User is already banned');
    }

    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot ban admin users');
    }

    const oldValue = {
      isBanned: user.isBanned,
      bannedAt: user.bannedAt,
      banReason: user.banReason,
    };

    const updatedUser = await this.adminUsersRepository.banUser(id, {
      banReason: dto.reason,
      bannedBy: context.adminId,
      bannedUntil: dto.bannedUntil ? new Date(dto.bannedUntil) : undefined,
    });

    await this.logAudit(
      AuditAction.USER_BANNED,
      'User',
      id,
      context,
      {
        oldValue,
        newValue: {
          isBanned: true,
          bannedAt: updatedUser.bannedAt,
          banReason: dto.reason,
          bannedUntil: dto.bannedUntil,
        },
        reason: dto.reason,
      },
    );

    return {
      success: true,
      message: 'User has been banned',
      user: this.formatUser(updatedUser),
    };
  }

  async unbanUser(
    id: string,
    dto: UnbanUserDto,
    context: AdminRequestContext,
  ): Promise<UnbanUserResponseDto> {
    const user = await this.adminUsersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isBanned) {
      throw new BadRequestException('User is not banned');
    }

    const oldValue = {
      isBanned: user.isBanned,
      bannedAt: user.bannedAt,
      banReason: user.banReason,
      bannedUntil: user.bannedUntil,
    };

    const updatedUser = await this.adminUsersRepository.unbanUser(id);

    await this.logAudit(
      AuditAction.USER_UNBANNED,
      'User',
      id,
      context,
      {
        oldValue,
        newValue: { isBanned: false },
        reason: dto.reason,
      },
    );

    return {
      success: true,
      message: 'User ban has been lifted',
      user: this.formatUser(updatedUser),
    };
  }

  async changeRole(
    id: string,
    dto: ChangeUserRoleDto,
    context: AdminRequestContext,
  ): Promise<ChangeRoleResponseDto> {
    const user = await this.adminUsersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === dto.role) {
      throw new BadRequestException(`User already has role ${dto.role}`);
    }

    // Prevent demoting other admins (only self or super admin could do this)
    if (user.role === UserRole.ADMIN && id !== context.adminId) {
      throw new ForbiddenException('Cannot change role of other admin users');
    }

    const oldValue = { role: user.role };

    const updatedUser = await this.adminUsersRepository.updateRole(id, dto.role);

    await this.logAudit(
      AuditAction.USER_ROLE_CHANGED,
      'User',
      id,
      context,
      {
        oldValue,
        newValue: { role: dto.role },
        reason: dto.reason,
      },
    );

    return {
      success: true,
      message: `User role updated to ${dto.role}`,
      user: this.formatUser(updatedUser),
    };
  }

  async deleteUser(
    id: string,
    dto: DeleteUserDto,
    context: AdminRequestContext,
  ): Promise<DeleteUserResponseDto> {
    const user = await this.adminUsersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (id === context.adminId) {
      throw new ForbiddenException('Cannot delete yourself');
    }

    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot delete admin users');
    }

    const oldValue = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    await this.adminUsersRepository.deleteUser(id);

    await this.logAudit(
      AuditAction.USER_DELETED,
      'User',
      id,
      context,
      {
        oldValue,
        reason: dto.reason,
      },
    );

    return {
      success: true,
      message: 'User account has been deleted',
    };
  }

  private async logAudit(
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
    try {
      await this.auditLogService.log(action, entityType, entityId, context, options);
    } catch (error) {
      this.logger.warn(
        `Failed to log audit: ${action} ${entityType}/${entityId}: ${error}`,
      );
    }
  }

  private formatUser(user: any): AdminUserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      xpTotal: user.xpTotal,
      level: user.level,
      streakCurrent: user.streakCurrent,
      isVerified: user.isVerified,
      isActive: user.isActive,
      isBanned: user.isBanned,
      bannedAt: user.bannedAt,
      bannedUntil: user.bannedUntil,
      banReason: user.banReason,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      lastActiveAt: user.lastActiveAt,
      hasGoogleAuth: !!user.googleId,
      hasGithubAuth: !!user.githubId,
      hasFacebookAuth: !!user.facebookId,
    };
  }

  private formatUserDetail(user: any): AdminUserDetailDto {
    return {
      ...this.formatUser(user),
      coursesStarted: user.coursesStarted,
      coursesCompleted: user.coursesCompleted,
      lessonsCompleted: user.lessonsCompleted,
      achievementsEarned: user.achievementsEarned,
      totalTimeSpent: user.totalTimeSpent,
    };
  }
}
