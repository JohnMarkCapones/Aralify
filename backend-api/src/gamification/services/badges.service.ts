import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { GamificationRepository } from '../gamification.repository';

const MAX_DISPLAYED_BADGES = 5;

@Injectable()
export class BadgesService {
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
