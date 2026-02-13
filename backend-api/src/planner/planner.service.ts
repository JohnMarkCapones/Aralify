import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GoalStatus, TaskStatus } from '@prisma/client';
import { PlannerRepository } from './planner.repository';
import {
  CreateGoalDto,
  CreateTaskDto,
  PlannerGoalDto,
  PlannerTaskDto,
  UpdateGoalDto,
  UpdateTaskDto,
} from './dto';

@Injectable()
export class PlannerService {
  constructor(private readonly plannerRepository: PlannerRepository) {}

  // ── Goals ─────────────────────────────────────────────

  async findGoals(userId: string, status?: string): Promise<PlannerGoalDto[]> {
    const goalStatus = status ? (status as GoalStatus) : undefined;
    const goals = await this.plannerRepository.findGoalsByUser(userId, goalStatus);

    return goals.map((goal) => this.formatGoal(goal));
  }

  async createGoal(userId: string, dto: CreateGoalDto): Promise<PlannerGoalDto> {
    const goal = await this.plannerRepository.createGoal({
      userId,
      title: dto.title,
      description: dto.description,
      targetDate: dto.targetDate ? new Date(dto.targetDate) : undefined,
    });

    return this.formatGoal(goal);
  }

  async updateGoal(
    userId: string,
    id: string,
    dto: UpdateGoalDto,
  ): Promise<PlannerGoalDto> {
    const goal = await this.plannerRepository.findGoalById(id);

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (goal.userId !== userId) {
      throw new ForbiddenException('You can only update your own goals');
    }

    const updated = await this.plannerRepository.updateGoal(id, {
      title: dto.title,
      description: dto.description,
      targetDate: dto.targetDate !== undefined
        ? dto.targetDate ? new Date(dto.targetDate) : null
        : undefined,
      status: dto.status ? (dto.status as GoalStatus) : undefined,
    });

    return this.formatGoal(updated);
  }

  async deleteGoal(userId: string, id: string): Promise<void> {
    const goal = await this.plannerRepository.findGoalById(id);

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (goal.userId !== userId) {
      throw new ForbiddenException('You can only delete your own goals');
    }

    await this.plannerRepository.deleteGoal(id);
  }

  // ── Tasks ─────────────────────────────────────────────

  async findTasks(
    userId: string,
    options: {
      status?: string;
      date?: string;
      page?: number;
      limit?: number;
    },
  ): Promise<{ tasks: PlannerTaskDto[]; total: number; page: number; limit: number; hasMore: boolean }> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;

    const result = await this.plannerRepository.findTasksByUser(userId, {
      status: options.status ? (options.status as TaskStatus) : undefined,
      date: options.date ? new Date(options.date) : undefined,
      page,
      limit,
    });

    return {
      tasks: result.tasks.map((task) => this.formatTask(task)),
      total: result.total,
      page,
      limit,
      hasMore: page * limit < result.total,
    };
  }

  async createTask(userId: string, dto: CreateTaskDto): Promise<PlannerTaskDto> {
    // Verify goalId belongs to user if provided
    if (dto.goalId) {
      const goal = await this.plannerRepository.findGoalById(dto.goalId);

      if (!goal) {
        throw new NotFoundException('Goal not found');
      }

      if (goal.userId !== userId) {
        throw new ForbiddenException('You can only assign tasks to your own goals');
      }
    }

    const task = await this.plannerRepository.createTask({
      userId,
      goalId: dto.goalId,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      status: dto.status ? (dto.status as TaskStatus) : undefined,
    });

    return this.formatTask(task);
  }

  async updateTask(
    userId: string,
    id: string,
    dto: UpdateTaskDto,
  ): Promise<PlannerTaskDto> {
    const task = await this.plannerRepository.findTaskById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    // Verify goalId belongs to user if being changed
    if (dto.goalId) {
      const goal = await this.plannerRepository.findGoalById(dto.goalId);

      if (!goal) {
        throw new NotFoundException('Goal not found');
      }

      if (goal.userId !== userId) {
        throw new ForbiddenException('You can only assign tasks to your own goals');
      }
    }

    const updated = await this.plannerRepository.updateTask(id, {
      title: dto.title,
      description: dto.description,
      goalId: dto.goalId !== undefined ? dto.goalId || null : undefined,
      dueDate: dto.dueDate !== undefined
        ? dto.dueDate ? new Date(dto.dueDate) : null
        : undefined,
      status: dto.status ? (dto.status as TaskStatus) : undefined,
    });

    return this.formatTask(updated);
  }

  async deleteTask(userId: string, id: string): Promise<void> {
    const task = await this.plannerRepository.findTaskById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    await this.plannerRepository.deleteTask(id);
  }

  // ── Helpers ───────────────────────────────────────────

  private formatGoal(goal: any): PlannerGoalDto {
    return {
      id: goal.id,
      title: goal.title,
      description: goal.description ?? null,
      targetDate: goal.targetDate ? goal.targetDate.toISOString() : null,
      status: goal.status,
      createdAt: goal.createdAt.toISOString(),
      updatedAt: goal.updatedAt.toISOString(),
    };
  }

  private formatTask(task: any): PlannerTaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? null,
      goalId: task.goalId ?? null,
      dueDate: task.dueDate ? task.dueDate.toISOString() : null,
      status: task.status,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  }
}
