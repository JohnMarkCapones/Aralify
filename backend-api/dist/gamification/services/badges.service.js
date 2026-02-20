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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const gamification_repository_1 = require("../gamification.repository");
const MAX_DISPLAYED_BADGES = 5;
let BadgesService = class BadgesService {
    constructor(repository) {
        this.repository = repository;
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
    async getDisplayedBadges(userId) {
        return this.getBadges(userId, { displayedOnly: true });
    }
    async evaluateForUser(_userId) {
        return [];
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
exports.BadgesService = BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gamification_repository_1.GamificationRepository])
], BadgesService);
//# sourceMappingURL=badges.service.js.map