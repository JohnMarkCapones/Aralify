import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { ContentAdmin } from '../decorators';
import {
  DashboardOverviewDto,
  DashboardMetricsDto,
  RecentSignupsResponseDto,
  SystemHealthDto,
} from '../dto';

@ApiTags('Admin - Dashboard')
@Controller('api/v1/admin/dashboard')
@ContentAdmin()
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Get()

  @ApiOperation({ summary: 'Get full dashboard overview' })
  @ApiResponse({
    status: 200,
    description: 'Returns dashboard overview with metrics, recent signups, activity, and health',
    type: DashboardOverviewDto,
  })
  async getDashboard(): Promise<DashboardOverviewDto> {
    return this.adminDashboardService.getDashboardOverview();
  }

  @Get('metrics')

  @ApiOperation({ summary: 'Get dashboard metrics only' })
  @ApiResponse({
    status: 200,
    description: 'Returns dashboard metrics',
    type: DashboardMetricsDto,
  })
  async getMetrics(): Promise<DashboardMetricsDto> {
    return this.adminDashboardService.getMetrics();
  }

  @Get('recent-signups')

  @ApiOperation({ summary: 'Get recent user signups' })
  @ApiQuery({ name: 'limit', required: false, example: 20, description: 'Number of results' })
  @ApiResponse({
    status: 200,
    description: 'Returns recent signups',
    type: RecentSignupsResponseDto,
  })
  async getRecentSignups(
    @Query('limit') limit?: number,
  ): Promise<RecentSignupsResponseDto> {
    return this.adminDashboardService.getRecentSignups(limit || 20);
  }

  @Get('health')

  @ApiOperation({ summary: 'Get system health status' })
  @ApiResponse({
    status: 200,
    description: 'Returns system health',
    type: SystemHealthDto,
  })
  async getHealth(): Promise<SystemHealthDto> {
    return this.adminDashboardService.getHealth();
  }
}
