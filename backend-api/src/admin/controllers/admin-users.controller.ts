import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminOnly } from '../decorators';
import { CurrentUser } from '../../auth/decorators';
import {
  GetUsersQueryDto,
  BanUserDto,
  UnbanUserDto,
  ChangeUserRoleDto,
  DeleteUserDto,
  AdminUserListResponseDto,
  AdminUserDetailDto,
  BanUserResponseDto,
  UnbanUserResponseDto,
  ChangeRoleResponseDto,
  DeleteUserResponseDto,
} from '../dto';
import { AdminRequestContext } from '../types';

@ApiTags('Admin - Users')
@Controller('api/v1/admin/users')
@AdminOnly()
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()

  @ApiOperation({ summary: 'List all users with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated user list',
    type: AdminUserListResponseDto,
  })
  async getUsers(
    @Query() query: GetUsersQueryDto,
  ): Promise<AdminUserListResponseDto> {
    return this.adminUsersService.findAll(query);
  }

  @Get(':id')

  @ApiOperation({ summary: 'Get detailed user information' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns user details',
    type: AdminUserDetailDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: string): Promise<AdminUserDetailDto> {
    return this.adminUsersService.findById(id);
  }

  @Post(':id/ban')

  @ApiOperation({ summary: 'Ban a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User banned successfully',
    type: BanUserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'User already banned' })
  @ApiResponse({ status: 403, description: 'Cannot ban admin users' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async banUser(
    @Param('id') id: string,
    @Body() dto: BanUserDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<BanUserResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminUsersService.banUser(id, dto, context);
  }

  @Post(':id/unban')

  @ApiOperation({ summary: 'Unban a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User unbanned successfully',
    type: UnbanUserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'User not banned' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async unbanUser(
    @Param('id') id: string,
    @Body() dto: UnbanUserDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<UnbanUserResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminUsersService.unbanUser(id, dto, context);
  }

  @Put(':id/role')

  @ApiOperation({ summary: 'Change user role' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    type: ChangeRoleResponseDto,
  })
  @ApiResponse({ status: 400, description: 'User already has this role' })
  @ApiResponse({ status: 403, description: 'Cannot change admin role' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async changeUserRole(
    @Param('id') id: string,
    @Body() dto: ChangeUserRoleDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<ChangeRoleResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminUsersService.changeRole(id, dto, context);
  }

  @Delete(':id')

  @ApiOperation({ summary: 'Delete a user account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: DeleteUserResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Cannot delete admin users' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(
    @Param('id') id: string,
    @Body() dto: DeleteUserDto,
    @CurrentUser() admin: User,
    @Req() request: any,
  ): Promise<DeleteUserResponseDto> {
    const context = this.getRequestContext(admin, request);
    return this.adminUsersService.deleteUser(id, dto, context);
  }

  private getRequestContext(admin: User, request: any): AdminRequestContext {
    return {
      adminId: admin.id,
      ipAddress: request.ip || request.headers?.['x-forwarded-for'],
      userAgent: request.headers?.['user-agent'],
    };
  }
}
