import { Injectable } from '@nestjs/common';
import { GoalStatus, TaskStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ── Goals ─────────────────────────────────────────────

  async findGoalsByUser(userId: string, status?: GoalStatus) {
    return this.prisma.plannerGoal.findMany({
      where: {
        userId,
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findGoalById(id: string) {
    return this.prisma.plannerGoal.findUnique({
      where: { id },
    });
  }

  async createGoal(data: {
    userId: string;
    title: string;
    description?: string;
    targetDate?: Date;
    status?: GoalStatus;
  }) {
    return this.prisma.plannerGoal.create({
      data: {
        userId: data.userId,
        title: data.title,
        description: data.description,
        targetDate: data.targetDate,
        status: data.status,
      },
    });
  }

  async updateGoal(
    id: string,
    data: {
      title?: string;
      description?: string;
      targetDate?: Date | null;
      status?: GoalStatus;
    },
  ) {
    return this.prisma.plannerGoal.update({
      where: { id },
      data,
    });
  }

  async deleteGoal(id: string) {
    return this.prisma.plannerGoal.delete({
      where: { id },
    });
  }

  // ── Tasks ─────────────────────────────────────────────

  async findTasksByUser(
    userId: string,
    options: {
      status?: TaskStatus;
      date?: Date;
      page: number;
      limit: number;
    },
  ) {
    const where: any = { userId };

    if (options.status) {
      where.status = options.status;
    }

    if (options.date) {
      // Match tasks with dueDate on the given date (start of day to end of day)
      const startOfDay = new Date(options.date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(options.date);
      endOfDay.setHours(23, 59, 59, 999);

      where.dueDate = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const skip = (options.page - 1) * options.limit;

    const [tasks, total] = await Promise.all([
      this.prisma.plannerTask.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: options.limit,
      }),
      this.prisma.plannerTask.count({ where }),
    ]);

    return { tasks, total };
  }

  async findTaskById(id: string) {
    return this.prisma.plannerTask.findUnique({
      where: { id },
    });
  }

  async createTask(data: {
    userId: string;
    goalId?: string;
    title: string;
    description?: string;
    dueDate?: Date;
    status?: TaskStatus;
  }) {
    return this.prisma.plannerTask.create({
      data: {
        userId: data.userId,
        goalId: data.goalId,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status,
      },
    });
  }

  async updateTask(
    id: string,
    data: {
      title?: string;
      description?: string;
      goalId?: string | null;
      dueDate?: Date | null;
      status?: TaskStatus;
    },
  ) {
    return this.prisma.plannerTask.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string) {
    return this.prisma.plannerTask.delete({
      where: { id },
    });
  }
}
