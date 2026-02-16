import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators';
import { PlannerService } from './planner.service';
import {
  CreateGoalDto,
  CreateTaskDto,
  PlannerGoalDto,
  PlannerTaskDto,
  UpdateGoalDto,
  UpdateTaskDto,
} from './dto';

@ApiTags('Planner')
@ApiBearerAuth()
@Controller('api/v1/planner')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  // ── Goals ─────────────────────────────────────────────

  @Get('goals')
  @ApiOperation({ summary: 'List planner goals' })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'] })
  @ApiResponse({ status: 200, description: 'Goals list', type: [PlannerGoalDto] })
  async getGoals(
    @CurrentUser() user: User,
    @Query('status') status?: string,
  ): Promise<PlannerGoalDto[]> {
    return this.plannerService.findGoals(user.id, status);
  }

  @Post('goals')
  @ApiOperation({ summary: 'Create a planner goal' })
  @ApiResponse({ status: 201, description: 'Goal created', type: PlannerGoalDto })
  async createGoal(
    @CurrentUser() user: User,
    @Body() dto: CreateGoalDto,
  ): Promise<PlannerGoalDto> {
    return this.plannerService.createGoal(user.id, dto);
  }

  @Put('goals/:id')
  @ApiOperation({ summary: 'Update a planner goal' })
  @ApiParam({ name: 'id', description: 'ID of the goal' })
  @ApiResponse({ status: 200, description: 'Goal updated', type: PlannerGoalDto })
  @ApiResponse({ status: 403, description: 'Cannot update this goal' })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  async updateGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateGoalDto,
  ): Promise<PlannerGoalDto> {
    return this.plannerService.updateGoal(user.id, id, dto);
  }

  @Delete('goals/:id')
  @ApiOperation({ summary: 'Delete a planner goal' })
  @ApiParam({ name: 'id', description: 'ID of the goal' })
  @ApiResponse({ status: 200, description: 'Goal deleted' })
  @ApiResponse({ status: 403, description: 'Cannot delete this goal' })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  async deleteGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    return this.plannerService.deleteGoal(user.id, id);
  }

  // ── Tasks ─────────────────────────────────────────────

  @Get('tasks')
  @ApiOperation({ summary: 'List planner tasks' })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'] })
  @ApiQuery({ name: 'date', required: false, description: 'Filter by due date (ISO date string)' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 20)' })
  @ApiResponse({ status: 200, description: 'Tasks list' })
  async getTasks(
    @CurrentUser() user: User,
    @Query('status') status?: string,
    @Query('date') date?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.plannerService.findTasks(user.id, {
      status,
      date,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Post('tasks')
  @ApiOperation({ summary: 'Create a planner task' })
  @ApiResponse({ status: 201, description: 'Task created', type: PlannerTaskDto })
  async createTask(
    @CurrentUser() user: User,
    @Body() dto: CreateTaskDto,
  ): Promise<PlannerTaskDto> {
    return this.plannerService.createTask(user.id, dto);
  }

  @Put('tasks/:id')
  @ApiOperation({ summary: 'Update a planner task' })
  @ApiParam({ name: 'id', description: 'ID of the task' })
  @ApiResponse({ status: 200, description: 'Task updated', type: PlannerTaskDto })
  @ApiResponse({ status: 403, description: 'Cannot update this task' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updateTask(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<PlannerTaskDto> {
    return this.plannerService.updateTask(user.id, id, dto);
  }

  @Delete('tasks/:id')
  @ApiOperation({ summary: 'Delete a planner task' })
  @ApiParam({ name: 'id', description: 'ID of the task' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  @ApiResponse({ status: 403, description: 'Cannot delete this task' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async deleteTask(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    return this.plannerService.deleteTask(user.id, id);
  }
}
