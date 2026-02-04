"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BadgesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const gamification_repository_1 = require("../gamification.repository");
const MAX_DISPLAYED_BADGES = 5;
const BADGE_CRITERIA = {
    newcomer: async () => true,
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
        const lessons = await repo.getUserLessonStats(userId);
        return lessons.completedCount >= 10;
    },
    'speed-demon': async (userId, repo) => {
        return repo.hasFastCompletion(userId, 300);
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
    founder: async () => false,
};
let BadgesService = BadgesService_1 = class BadgesService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(BadgesService_1.name);
    }
    async getBadges(userId, options) {
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
        const byRarity = formattedBadges.reduce((acc, badge) => {
            if (!acc[badge.rarity]) {
                acc[badge.rarity] = [];
            }
            acc[badge.rarity].push(badge);
            return acc;
        }, {});
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
    async setDisplayed(userId, badgeId, displayOrder) {
        const userBadge = await this.repository.getUserBadge(userId, badgeId);
        if (!userBadge) {
            throw new common_1.NotFoundException('Badge not found or not owned by user');
        }
        if (userBadge.isDisplayed) {
            return {
                success: true,
                badge: this.formatUserBadge(userBadge),
                message: 'Badge is already displayed',
            };
        }
        const displayedCount = await this.repository.getDisplayedBadgeCount(userId);
        if (displayedCount >= MAX_DISPLAYED_BADGES) {
            throw new common_1.BadRequestException(`Maximum of ${MAX_DISPLAYED_BADGES} badges can be displayed. Remove a badge first.`);
        }
        const order = displayOrder ?? displayedCount + 1;
        const updatedBadge = await this.repository.setBadgeDisplayed(userId, badgeId, true, order);
        return {
            success: true,
            badge: this.formatUserBadge(updatedBadge),
            displayedCount: displayedCount + 1,
            maxDisplay: MAX_DISPLAYED_BADGES,
        };
    }
    async removeDisplay(userId, badgeId) {
        const userBadge = await this.repository.getUserBadge(userId, badgeId);
        if (!userBadge) {
            throw new common_1.NotFoundException('Badge not found or not owned by user');
        }
        if (!userBadge.isDisplayed) {
            return {
                success: true,
                badge: this.formatUserBadge(userBadge),
                message: 'Badge is not currently displayed',
            };
        }
        const updatedBadge = await this.repository.setBadgeDisplayed(userId, badgeId, false);
        const displayedCount = await this.repository.getDisplayedBadgeCount(userId);
        return {
            success: true,
            badge: this.formatUserBadge(updatedBadge),
            displayedCount,
            maxDisplay: MAX_DISPLAYED_BADGES,
        };
    }
    async evaluateForUser(userId) {
        const ownedBadges = await this.repository.getUserBadges(userId);
        const ownedSlugs = new Set(ownedBadges.map((ub) => ub.badge.slug));
        const newlyAwarded = [];
        for (const [slug, check] of Object.entries(BADGE_CRITERIA)) {
            if (ownedSlugs.has(slug))
                continue;
            try {
                const earned = await check(userId, this.repository);
                if (!earned)
                    continue;
                const badge = await this.repository.getBadgeBySlug(slug);
                if (!badge)
                    continue;
                await this.repository.awardBadge(userId, badge.id);
                newlyAwarded.push(slug);
                await this.repository.createActivity({
                    userId,
                    type: 'BADGE_EARNED',
                    data: { badgeId: badge.id, slug: badge.slug, title: badge.title },
                });
                this.logger.log(`User ${userId} earned badge: ${badge.title}`);
            }
            catch (error) {
                this.logger.warn(`Badge evaluation failed for ${slug}: ${error}`);
            }
        }
        return newlyAwarded;
    }
    async getDisplayedBadges(userId) {
        return this.getBadges(userId, { displayedOnly: true });
    }
    formatUserBadge(userBadge) {
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
};
exports.BadgesService = BadgesService;
exports.BadgesService = BadgesService = BadgesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gamification_repository_1.GamificationRepository])
], BadgesService);
//# sourceMappingURL=badges.service.js.map