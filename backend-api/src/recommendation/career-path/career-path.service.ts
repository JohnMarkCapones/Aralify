import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { RecommendationRepository } from '../recommendation.repository';

@Injectable()
export class CareerPathService {
  private readonly logger = new Logger(CareerPathService.name);

  constructor(private readonly repository: RecommendationRepository) {}

  async findAll() {
    const paths = await this.repository.findAllCareerPaths({ isPublished: true });

    return paths.map((path: any) => ({
      id: path.id,
      slug: path.slug,
      title: path.title,
      description: path.description,
      shortDescription: path.shortDescription,
      industry: path.industry,
      estimatedHours: path.estimatedHours,
      marketDemand: path.marketDemand,
      totalNodes: path._count?.nodes || 0,
      enrollmentCount: path._count?.enrollments || 0,
      color: path.color,
      iconUrl: path.iconUrl,
    }));
  }

  async findBySlug(slug: string) {
    const path = await this.repository.findCareerPathBySlug(slug);

    if (!path || !path.isPublished) {
      throw new NotFoundException('Career path not found');
    }

    return {
      id: path.id,
      slug: path.slug,
      title: path.title,
      description: path.description,
      shortDescription: path.shortDescription,
      industry: path.industry,
      estimatedHours: path.estimatedHours,
      marketDemand: path.marketDemand,
      salaryImpact: path.salaryImpact,
      analyticalReq: path.analyticalReq,
      outcomes: path.outcomes || [],
      enrollmentCount: path._count?.enrollments || 0,
      color: path.color,
      iconUrl: path.iconUrl,
      nodes: path.nodes.map((node: any) => ({
        id: node.id,
        skillName: node.skillName,
        description: node.description,
        orderIndex: node.orderIndex,
        isRequired: node.isRequired,
        estimatedHours: node.estimatedHours,
        courseId: node.course?.id,
        courseSlug: node.course?.slug,
        courseTitle: node.course?.title,
        prerequisiteIds: node.prerequisites.map((p: any) => p.prerequisiteId),
      })),
    };
  }

  async enroll(slug: string, userId: string) {
    const path = await this.repository.findCareerPathBySlug(slug);

    if (!path || !path.isPublished) {
      throw new NotFoundException('Career path not found');
    }

    const firstNode = path.nodes[0];

    await this.repository.enrollUserInPath(
      userId,
      path.id,
      firstNode?.id,
    );

    this.logger.log(`User ${userId} enrolled in career path ${slug}`);

    return {
      success: true,
      careerPathId: path.id,
      title: path.title,
      firstNodeId: firstNode?.id,
      firstNodeName: firstNode?.skillName,
      firstCourseSlug: firstNode?.course?.slug,
    };
  }

  async getProgress(slug: string, userId: string) {
    const path = await this.repository.findCareerPathBySlug(slug);

    if (!path) {
      throw new NotFoundException('Career path not found');
    }

    const enrollment = await this.repository.getUserCareerPath(userId, path.id);

    if (!enrollment) {
      throw new NotFoundException('Not enrolled in this career path');
    }

    // Calculate node completion based on course progress
    const nodeStatuses = await Promise.all(
      path.nodes.map(async (node: any) => {
        let isCompleted = false;
        if (node.courseId) {
          // Check if user has started/completed the course
          // A node is "completed" if user has ≥ 80% completion on the linked course
          const lessons = await this.repository.getNextUncompletedLessons(
            userId,
            node.courseId,
            1,
          );
          isCompleted = lessons.length === 0; // no uncompleted lessons = done
        }

        return {
          id: node.id,
          skillName: node.skillName,
          description: node.description,
          orderIndex: node.orderIndex,
          isRequired: node.isRequired,
          estimatedHours: node.estimatedHours,
          courseId: node.course?.id,
          courseSlug: node.course?.slug,
          courseTitle: node.course?.title,
          prerequisiteIds: node.prerequisites.map((p: any) => p.prerequisiteId),
          isCompleted,
        };
      }),
    );

    const completedCount = nodeStatuses.filter((n: any) => n.isCompleted).length;
    const totalNodes = nodeStatuses.length;
    const completionPercentage =
      totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100 * 10) / 10 : 0;

    return {
      careerPathId: path.id,
      title: path.title,
      status: enrollment.status,
      completionPercentage,
      nodesCompleted: completedCount,
      totalNodes,
      currentNodeId: enrollment.currentNodeId,
      currentNodeName:
        nodeStatuses.find((n: any) => n.id === enrollment.currentNodeId)?.skillName || null,
      startedAt: enrollment.startedAt,
      completedAt: enrollment.completedAt,
      nodes: nodeStatuses,
    };
  }

  async getUserPaths(userId: string) {
    const enrollments = await this.repository.getUserCareerPaths(userId);

    return enrollments.map((enrollment: any) => ({
      careerPathId: enrollment.careerPathId,
      title: enrollment.careerPath.title,
      status: enrollment.status,
      currentNodeId: enrollment.currentNodeId,
      startedAt: enrollment.startedAt,
      totalNodes: enrollment.careerPath.nodes.length,
    }));
  }

  async updateStatus(slug: string, userId: string, status: string) {
    const path = await this.repository.findCareerPathBySlug(slug);

    if (!path) {
      throw new NotFoundException('Career path not found');
    }

    const validStatuses = ['ACTIVE', 'PAUSED', 'ABANDONED'];
    if (!validStatuses.includes(status)) {
      throw new NotFoundException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    await this.repository.updateUserCareerPath(userId, path.id, {
      status: status as any,
    });

    return { success: true, status };
  }
}
