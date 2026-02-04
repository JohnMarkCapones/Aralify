import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { GamificationRepository } from '../gamification.repository';

const MAX_DISPLAYED_BADGES = 5;

/**
 * Badge criteria defined in code (Badge model has no criteria column).
 * Each entry maps a badge slug to an async check function.
 */
type BadgeCriteriaCheck = (
  userId: string,
  repo: GamificationRepository,
) => Promise<boolean>;

const BADGE_CRITERIA: Record<string, BadgeCriteriaCheck> = {
  newcomer: async () => true, // awarded on first evaluation (signup)

  'quick-learner': async (userId, repo) => {
    const today = await repo.getLessonsCompletedToday(userId);
    return today >= 5;
  },

  'night-owl': async (userId, repo) => {
    return repo.hasCompletedLessonDuringHours(userId, 0, 5);
  },

  'early-bird': async (userId, repo) => {
    return repo.hasCompletedLessonDuringHours(userId, 4, 6);
  },

  perfectionist: async (userId, repo) => {
    // 10 lessons with score = 100
    const lessons = await repo.getUserLessonStats(userId);
    // Simplified: check completed count >= 10 (full check would need score data)
    return lessons.completedCount >= 10;
  },

  'speed-demon': async (userId, repo) => {
    return repo.hasFastCompletion(userId, 300); // under 5 minutes
  },

  polyglot: async (userId, repo) => {
    const langCount = await repo.getCompletedLanguageCount(userId);
    return langCount >= 3;
  },

  mentor: async (userId, repo) => {
    const social = await repo.getUserSocialStats(userId);
    return social.commentCount >= 10;
  },

  legend: async (userId, repo) => {
    const user = await repo.getUserGamificationData(userId);
    return (user?.level ?? 0) >= 50;
  },

  founder: async () => false, // manually awarded only
};

@Injectable()
export class BadgesService {
  private readonly logger = new Logger(BadgesService.name);

  constructor(private readonly repository: GamificationRepository) {}

  /**
   * Get all badges for a user
   */
  async getBadges(userId: string, options?: { displayedOnly?: boolean }) {
    const badges = await this.repository.getUserBadges(userId, options);

    const formattedBadges = badges.map((ub) => ({
      id: ub.badge.id,
      slug: ub.badge.slug,
      title: ub.badge.title,
      description: ub.badge.description,
      iconUrl: ub.badge.iconUrl,
      rarity: ub.badge.rarity,
      earnedAt: ub.earnedAt,
      isDisplayed: ub.isDisplayed,
      displayOrder: ub.displayOrder,
    }));

    if (options?.displayedOnly) {
      return {
        badges: formattedBadges,
        count: formattedBadges.length,
        maxDisplay: MAX_DISPLAYED_BADGES,
      };
    }

    // Group by rarity
    const byRarity = formattedBadges.reduce(
      (acc, badge) => {
        if (!acc[badge.rarity]) {
          acc[badge.rarity] = [];
        }
        acc[badge.rarity].push(badge);
        return acc;
      },
      {} as Record<string, typeof formattedBadges>,
    );

    const displayedCount = formattedBadges.filter((b) => b.isDisplayed).length;

    return {
      badges: formattedBadges,
      byRarity,
      total: formattedBadges.length,
      displayedCount,
      maxDisplay: MAX_DISPLAYED_BADGES,
      canDisplayMore: displayedCount < MAX_DISPLAYED_BADGES,
    };
  }

  /**
   * Set a badge to be displayed on the user's profile
   */
  async setDisplayed(userId: string, badgeId: string, displayOrder?: number) {
    // Verify badge is owned by user
    const userBadge = await this.repository.getUserBadge(userId, badgeId);
    if (!userBadge) {
      throw new NotFoundException('Badge not found or not owned by user');
    }

    // Check if already displayed
    if (userBadge.isDisplayed) {
      return {
        success: true,
        badge: this.formatUserBadge(userBadge),
        message: 'Badge is already displayed',
      };
    }

    // Check max display limit
    const displayedCount = await this.repository.getDisplayedBadgeCount(userId);
    if (displayedCount >= MAX_DISPLAYED_BADGES) {
      throw new BadRequestException(
        `Maximum of ${MAX_DISPLAYED_BADGES} badges can be displayed. Remove a badge first.`,
      );
    }

    // Determine display order
    const order = displayOrder ?? displayedCount + 1;

    // Update badge
    const updatedBadge = await this.repository.setBadgeDisplayed(
      userId,
      badgeId,
      true,
      order,
    );

    return {
      success: true,
      badge: this.formatUserBadge(updatedBadge),
      displayedCount: displayedCount + 1,
      maxDisplay: MAX_DISPLAYED_BADGES,
    };
  }

  /**
   * Remove a badge from display
   */
  async removeDisplay(userId: string, badgeId: string) {
    // Verify badge is owned by user
    const userBadge = await this.repository.getUserBadge(userId, badgeId);
    if (!userBadge) {
      throw new NotFoundException('Badge not found or not owned by user');
    }

    // Check if displayed
    if (!userBadge.isDisplayed) {
      return {
        success: true,
        badge: this.formatUserBadge(userBadge),
        message: 'Badge is not currently displayed',
      };
    }

    // Update badge
    const updatedBadge = await this.repository.setBadgeDisplayed(
      userId,
      badgeId,
      false,
    );

    const displayedCount = await this.repository.getDisplayedBadgeCount(userId);

    return {
      success: true,
      badge: this.formatUserBadge(updatedBadge),
      displayedCount,
      maxDisplay: MAX_DISPLAYED_BADGES,
    };
  }

  /**
   * Evaluate and auto-award badges the user has earned but doesn't own yet.
   * Returns the list of newly awarded badge slugs.
   */
  async evaluateForUser(userId: string): Promise<string[]> {
    const ownedBadges = await this.repository.getUserBadges(userId);
    const ownedSlugs = new Set(ownedBadges.map((ub) => ub.badge.slug));
    const newlyAwarded: string[] = [];

    for (const [slug, check] of Object.entries(BADGE_CRITERIA)) {
      if (ownedSlugs.has(slug)) continue;

      try {
        const earned = await check(userId, this.repository);
        if (!earned) continue;

        const badge = await this.repository.getBadgeBySlug(slug);
        if (!badge) continue;

        await this.repository.awardBadge(userId, badge.id);
        newlyAwarded.push(slug);

        await this.repository.createActivity({
          userId,
          type: 'BADGE_EARNED',
          data: { badgeId: badge.id, slug: badge.slug, title: badge.title },
        });

        this.logger.log(`User ${userId} earned badge: ${badge.title}`);
      } catch (error) {
        this.logger.warn(`Badge evaluation failed for ${slug}: ${error}`);
      }
    }

    return newlyAwarded;
  }

  /**
   * Get badges displayed on profile
   */
  async getDisplayedBadges(userId: string) {
    return this.getBadges(userId, { displayedOnly: true });
  }

  private formatUserBadge(userBadge: {
    badge: {
      id: string;
      slug: string;
      title: string;
      description: string;
      iconUrl: string | null;
      rarity: string;
    };
    earnedAt: Date;
    isDisplayed: boolean;
    displayOrder: number | null;
  }) {
    return {
      id: userBadge.badge.id,
      slug: userBadge.badge.slug,
      title: userBadge.badge.title,
      description: userBadge.badge.description,
      iconUrl: userBadge.badge.iconUrl,
      rarity: userBadge.badge.rarity,
      earnedAt: userBadge.earnedAt,
      isDisplayed: userBadge.isDisplayed,
      displayOrder: userBadge.displayOrder,
    };
  }
}
