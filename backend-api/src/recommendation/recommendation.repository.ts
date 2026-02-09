import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecommendationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================
  // USER LEARNING PROFILE
  // ============================================

  async upsertLearningProfile(
    userId: string,
    data: {
      motivation?: any;
      dreamProject?: any;
      subjectInterests?: any;
      personalityType?: string | null;
      industryInterests?: any;
      workStyle?: string;
      mathComfort?: string | null;
      dailyRoutine?: string | null;
      timeHorizon?: string;
      background?: string;
      contentPreference?: string | null;
      analyticalScore?: number;
      contextProfile?: string;
      difficultyScore?: number;
      lastCalibrationAt?: Date;
    },
  ) {
    return this.prisma.userLearningProfile.upsert({
      where: { userId },
      update: {
        ...data,
        motivation: data.motivation as Prisma.InputJsonValue,
        dreamProject: data.dreamProject as Prisma.InputJsonValue,
        subjectInterests: data.subjectInterests as Prisma.InputJsonValue,
        industryInterests: data.industryInterests as Prisma.InputJsonValue,
      },
      create: {
        userId,
        ...data,
        motivation: data.motivation as Prisma.InputJsonValue,
        dreamProject: data.dreamProject as Prisma.InputJsonValue,
        subjectInterests: data.subjectInterests as Prisma.InputJsonValue,
        industryInterests: data.industryInterests as Prisma.InputJsonValue,
      },
    });
  }

  async getLearningProfile(userId: string) {
    return this.prisma.userLearningProfile.findUnique({
      where: { userId },
    });
  }

  async updateDifficultyScore(userId: string, score: number) {
    return this.prisma.userLearningProfile.update({
      where: { userId },
      data: {
        difficultyScore: score,
        lastCalibrationAt: new Date(),
      },
    });
  }

  // ============================================
  // CAREER PATHS
  // ============================================

  async findAllCareerPaths(options?: { isPublished?: boolean }) {
    return this.prisma.careerPath.findMany({
      where: {
        ...(options?.isPublished !== undefined && { isPublished: options.isPublished }),
      },
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: {
          select: { nodes: true, enrollments: true },
        },
      },
    });
  }

  async findCareerPathBySlug(slug: string) {
    return this.prisma.careerPath.findUnique({
      where: { slug },
      include: {
        nodes: {
          orderBy: { orderIndex: 'asc' },
          include: {
            course: {
              select: { id: true, slug: true, title: true, language: true },
            },
            prerequisites: {
              select: { prerequisiteId: true },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });
  }

  async findCareerPathById(id: string) {
    return this.prisma.careerPath.findUnique({
      where: { id },
      include: {
        nodes: {
          orderBy: { orderIndex: 'asc' },
          include: {
            course: {
              select: { id: true, slug: true, title: true, language: true },
            },
            prerequisites: {
              select: { prerequisiteId: true },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });
  }

  async getCareerPathEnrollmentCount(careerPathId: string): Promise<number> {
    return this.prisma.userCareerPath.count({
      where: { careerPathId },
    });
  }

  async getCareerPathCompletionRate(careerPathId: string): Promise<number> {
    const [total, completed] = await Promise.all([
      this.prisma.userCareerPath.count({ where: { careerPathId } }),
      this.prisma.userCareerPath.count({
        where: { careerPathId, status: 'COMPLETED' },
      }),
    ]);
    return total > 0 ? completed / total : 0;
  }

  // ============================================
  // USER CAREER PATH ENROLLMENT
  // ============================================

  async enrollUserInPath(userId: string, careerPathId: string, firstNodeId?: string) {
    return this.prisma.userCareerPath.upsert({
      where: {
        userId_careerPathId: { userId, careerPathId },
      },
      update: {
        status: 'ACTIVE',
        currentNodeId: firstNodeId,
      },
      create: {
        userId,
        careerPathId,
        status: 'ACTIVE',
        currentNodeId: firstNodeId,
      },
    });
  }

  async getUserCareerPaths(userId: string) {
    return this.prisma.userCareerPath.findMany({
      where: { userId },
      include: {
        careerPath: {
          include: {
            nodes: {
              orderBy: { orderIndex: 'asc' },
              include: {
                course: {
                  select: { id: true, slug: true, title: true },
                },
              },
            },
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  async getUserCareerPath(userId: string, careerPathId: string) {
    return this.prisma.userCareerPath.findUnique({
      where: {
        userId_careerPathId: { userId, careerPathId },
      },
      include: {
        careerPath: {
          include: {
            nodes: {
              orderBy: { orderIndex: 'asc' },
              include: {
                course: {
                  select: { id: true, slug: true, title: true },
                },
                prerequisites: {
                  select: { prerequisiteId: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async updateUserCareerPath(
    userId: string,
    careerPathId: string,
    data: { status?: any; currentNodeId?: string; completedAt?: Date },
  ) {
    return this.prisma.userCareerPath.update({
      where: {
        userId_careerPathId: { userId, careerPathId },
      },
      data,
    });
  }

  // ============================================
  // RECOMMENDATIONS
  // ============================================

  async createRecommendations(
    recommendations: {
      userId: string;
      type: any;
      targetId: string;
      score: number;
      reasoning: any;
      rank: number;
      expiresAt?: Date;
    }[],
  ) {
    return this.prisma.recommendation.createMany({
      data: recommendations.map((r) => ({
        ...r,
        reasoning: r.reasoning as Prisma.InputJsonValue,
      })),
    });
  }

  async getActiveRecommendations(userId: string, type?: string) {
    return this.prisma.recommendation.findMany({
      where: {
        userId,
        isDismissed: false,
        ...(type && { type: type as any }),
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
      orderBy: [{ rank: 'asc' }, { score: 'desc' }],
    });
  }

  async dismissRecommendation(id: string) {
    return this.prisma.recommendation.update({
      where: { id },
      data: { isDismissed: true },
    });
  }

  async acceptRecommendation(id: string) {
    return this.prisma.recommendation.update({
      where: { id },
      data: { isAccepted: true },
    });
  }

  async clearExpiredRecommendations(userId: string) {
    return this.prisma.recommendation.deleteMany({
      where: {
        userId,
        expiresAt: { lt: new Date() },
      },
    });
  }

  // ============================================
  // STUDY PLANS
  // ============================================

  async createStudyPlan(data: {
    userId: string;
    careerPathId?: string;
    title?: string;
    dailyMinutes: number;
    totalDays: number;
    startDate?: Date;
    endDate?: Date;
    items: {
      dayNumber: number;
      lessonId?: string;
      courseId?: string;
      type: any;
      title?: string;
      description?: string;
      estimatedMins: number;
      orderIndex: number;
    }[];
  }) {
    const { items, ...planData } = data;

    return this.prisma.studyPlan.create({
      data: {
        ...planData,
        items: {
          create: items,
        },
      },
      include: {
        items: {
          orderBy: [{ dayNumber: 'asc' }, { orderIndex: 'asc' }],
        },
      },
    });
  }

  async getActiveStudyPlan(userId: string) {
    return this.prisma.studyPlan.findFirst({
      where: { userId, status: 'ACTIVE' },
      include: {
        items: {
          orderBy: [{ dayNumber: 'asc' }, { orderIndex: 'asc' }],
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStudyPlanItems(studyPlanId: string, dayNumber?: number) {
    return this.prisma.studyPlanItem.findMany({
      where: {
        studyPlanId,
        ...(dayNumber !== undefined && { dayNumber }),
      },
      orderBy: [{ dayNumber: 'asc' }, { orderIndex: 'asc' }],
    });
  }

  async completeStudyPlanItem(itemId: string) {
    return this.prisma.studyPlanItem.update({
      where: { id: itemId },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });
  }

  async updateStudyPlan(
    planId: string,
    data: { status?: any; completedDays?: number; dailyMinutes?: number },
  ) {
    return this.prisma.studyPlan.update({
      where: { id: planId },
      data,
    });
  }

  async deactivateExistingPlans(userId: string) {
    return this.prisma.studyPlan.updateMany({
      where: { userId, status: 'ACTIVE' },
      data: { status: 'PAUSED' },
    });
  }

  // ============================================
  // PERFORMANCE DATA (for ADC & engagement)
  // ============================================

  async getRecentLessonPerformance(userId: string, limit: number) {
    return this.prisma.userLessonProgress.findMany({
      where: { userId, status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
      take: limit,
      include: {
        lesson: {
          select: {
            id: true,
            difficulty: true,
            xpReward: true,
            level: {
              select: {
                course: {
                  select: { id: true, slug: true, language: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async getRecentQuizPerformance(userId: string, limit: number) {
    return this.prisma.userQuizAnswer.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        isCorrect: true,
        attemptNumber: true,
        timeSpentSeconds: true,
        createdAt: true,
      },
    });
  }

  async getRecentHintUsage(userId: string, limit: number) {
    return this.prisma.userHintUnlock.findMany({
      where: { userId },
      orderBy: { unlockedAt: 'desc' },
      take: limit,
    });
  }

  async getRecentChallengeSubmissions(userId: string, limit: number) {
    return this.prisma.challengeSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        status: true,
        attemptNumber: true,
        timeSpentSeconds: true,
        createdAt: true,
      },
    });
  }

  async getUserLastActivity(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastActiveAt: true,
        streakCurrent: true,
        streakLongest: true,
        xpTotal: true,
        level: true,
        dailyCommitmentMins: true,
      },
    });
  }

  // ============================================
  // COLLABORATIVE FILTERING DATA
  // ============================================

  async getAllUserVectors() {
    return this.prisma.user.findMany({
      where: { isActive: true, onboardingCompleted: true },
      select: {
        id: true,
        skillLevel: true,
        xpTotal: true,
        level: true,
        streakCurrent: true,
        interestedLanguages: true,
        learningGoals: true,
        createdAt: true,
        courseProgress: {
          select: {
            courseId: true,
            completionPercentage: true,
            course: { select: { language: true } },
          },
        },
        lessonProgress: {
          where: { status: 'COMPLETED' },
          select: {
            lesson: { select: { difficulty: true } },
          },
        },
      },
    });
  }

  async getUnstartedCourses(userId: string) {
    const startedCourseIds = await this.prisma.userCourseProgress.findMany({
      where: { userId },
      select: { courseId: true },
    });

    const excludeIds = startedCourseIds.map((c) => c.courseId);

    return this.prisma.course.findMany({
      where: {
        isPublished: true,
        id: { notIn: excludeIds },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        language: true,
        _count: { select: { levels: true } },
      },
    });
  }

  async getNextUncompletedLessons(userId: string, courseId: string, limit: number = 3) {
    // Get completed lesson IDs for this course
    const completedLessons = await this.prisma.userLessonProgress.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        lesson: { level: { courseId } },
      },
      select: { lessonId: true },
    });

    const completedIds = completedLessons.map((l) => l.lessonId);

    // Get unlocked levels
    const unlockedLevels = await this.prisma.userLevelUnlock.findMany({
      where: { userId, level: { courseId } },
      select: { levelId: true },
    });

    const unlockedIds = unlockedLevels.map((l) => l.levelId);

    // Get next lessons from unlocked levels that aren't completed
    return this.prisma.lesson.findMany({
      where: {
        level: { courseId },
        levelId: { in: unlockedIds },
        id: { notIn: completedIds },
        isPublished: true,
      },
      orderBy: [
        { level: { orderIndex: 'asc' } },
        { orderIndex: 'asc' },
      ],
      take: limit,
      include: {
        level: {
          select: {
            id: true,
            title: true,
            course: {
              select: { id: true, slug: true, title: true },
            },
          },
        },
      },
    });
  }
}
