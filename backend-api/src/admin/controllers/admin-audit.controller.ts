import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuditLogService } from '../services/audit-log.service';
import { AdminOnly } from '../decorators';
import {
  GetAuditLogsQueryDto,
  AuditLogListResponseDto,
  AuditLogDetailDto,
} from '../dto';

@ApiTags('Admin - Audit')
@Controller('api/v1/admin/audit')
@AdminOnly()
export class AdminAuditController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()

  @ApiOperation({ summary: 'Get audit logs with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated audit logs',
    type: AuditLogListResponseDto,
  })
  async getAuditLogs(
    @Query() query: GetAuditLogsQueryDto,
  ): Promise<AuditLogListResponseDto> {
    return this.auditLogService.findAll(query);
  }

  @Get(':id')

  @ApiOperation({ summary: 'Get a specific audit log entry' })
  @ApiParam({ name: 'id', description: 'Audit log ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns audit log details',
    type: AuditLogDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Audit log not found' })
  async getAuditLogById(@Param('id') id: string): Promise<AuditLogDetailDto> {
    return this.auditLogService.findById(id);
  }
}
