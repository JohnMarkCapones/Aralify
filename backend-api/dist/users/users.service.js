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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getProfile(userId) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.formatUserProfile(user);
    }
    async updateProfile(userId, dto) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.usersRepository.updateProfile(userId, {
            displayName: dto.displayName,
            bio: dto.bio,
            locale: dto.locale,
            timezone: dto.timezone,
        });
        return this.formatUserProfile(updatedUser);
    }
    async getPublicProfile(username, viewerId) {
        const user = await this.usersRepository.findByUsernameWithSettings(username);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const privacySettings = user.privacySettings;
        const canView = await this.canViewProfile(viewerId, user.id, privacySettings);
        if (!canView) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.formatPublicProfile(user, privacySettings);
    }
    async getSettings(userId) {
        const user = await this.usersRepository.findByIdWithSettings(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.formatUserSettings(user);
    }
    async updateSettings(userId, dto) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const userSettingsData = {};
        const notificationSettingsData = {};
        const privacySettingsData = {};
        if (dto.theme !== undefined)
            userSettingsData.theme = dto.theme;
        if (dto.codeEditorTheme !== undefined)
            userSettingsData.codeEditorTheme = dto.codeEditorTheme;
        if (dto.fontSize !== undefined)
            userSettingsData.fontSize = dto.fontSize;
        if (dto.dailyGoalMins !== undefined)
            userSettingsData.dailyGoalMins = dto.dailyGoalMins;
        if (dto.difficultyPref !== undefined)
            userSettingsData.difficultyPref = dto.difficultyPref;
        if (dto.emailEnabled !== undefined)
            notificationSettingsData.emailEnabled = dto.emailEnabled;
        if (dto.pushEnabled !== undefined)
            notificationSettingsData.pushEnabled = dto.pushEnabled;
        if (dto.streakReminders !== undefined)
            notificationSettingsData.streakReminders = dto.streakReminders;
        if (dto.achievementNotifs !== undefined)
            notificationSettingsData.achievementNotifs = dto.achievementNotifs;
        if (dto.socialNotifs !== undefined)
            notificationSettingsData.socialNotifs = dto.socialNotifs;
        if (dto.profileVisibility !== undefined)
            privacySettingsData.profileVisibility = dto.profileVisibility;
        if (dto.showProgress !== undefined)
            privacySettingsData.showProgress = dto.showProgress;
        if (dto.showActivity !== undefined)
            privacySettingsData.showActivity = dto.showActivity;
        if (dto.allowMessages !== undefined)
            privacySettingsData.allowMessages = dto.allowMessages;
        if (Object.keys(userSettingsData).length > 0) {
            await this.usersRepository.updateUserSettings(userId, userSettingsData);
        }
        if (Object.keys(notificationSettingsData).length > 0) {
            await this.usersRepository.updateNotificationSettings(userId, notificationSettingsData);
        }
        if (Object.keys(privacySettingsData).length > 0) {
            await this.usersRepository.updatePrivacySettings(userId, privacySettingsData);
        }
        const updatedUser = await this.usersRepository.findByIdWithSettings(userId);
        return this.formatUserSettings(updatedUser);
    }
    async getStats(userId) {
        const stats = await this.usersRepository.getUserStats(userId);
        if (!stats) {
            throw new common_1.NotFoundException('User not found');
        }
        return stats;
    }
    async getPublicStats(username, viewerId) {
        const user = await this.usersRepository.findByUsernameWithSettings(username);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const privacySettings = user.privacySettings;
        const canView = await this.canViewProfile(viewerId, user.id, privacySettings);
        if (!canView) {
            throw new common_1.NotFoundException('User not found');
        }
        const stats = await this.usersRepository.getUserStats(user.id);
        if (!stats) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.formatPublicStats(stats, privacySettings);
    }
    async getOnboardingStatus(userId) {
        const status = await this.usersRepository.getOnboardingStatus(userId);
        if (!status) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            onboardingCompleted: status.onboardingCompleted,
            onboardingStep: status.onboardingStep,
        };
    }
    async completeOnboarding(userId, dto) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const avatarUrl = dto.avatarPreset
            ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.avatarPreset}`
            : undefined;
        await this.usersRepository.completeOnboarding(userId, {
            displayName: dto.displayName,
            avatarUrl,
            skillLevel: dto.skillLevel,
            interestedLanguages: dto.interestedLanguages,
            learningGoals: dto.learningGoals,
            dailyCommitmentMins: dto.dailyCommitmentMins,
        });
        return { success: true, xpAwarded: 100 };
    }
    async skipOnboarding(userId) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.usersRepository.skipOnboarding(userId);
        return { success: true };
    }
    async getUserCourses(userId) {
        const progress = await this.usersRepository.getUserCourses(userId);
        return progress.map((p) => ({
            id: p.course.id,
            slug: p.course.slug,
            title: p.course.title,
            description: p.course.description,
            language: p.course.language,
            iconUrl: p.course.iconUrl,
            color: p.course.color,
            completionPercentage: p.completionPercentage,
            totalXpEarned: p.totalXpEarned,
            lastActivityAt: p.lastActivityAt?.toISOString() ?? null,
            startedAt: p.startedAt.toISOString(),
            completedAt: p.completedAt?.toISOString() ?? null,
        }));
    }
    async getDetailedStats(userId, range) {
        const user = await this.usersRepository.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const days = range === '30d' ? 30 : 7;
        const since = new Date();
        since.setDate(since.getDate() - days);
        const [xpTransactions, difficultyBreakdown, timeSpent, lessonsCompleted] = await Promise.all([
            this.usersRepository.getXpOverTime(userId, since),
            this.usersRepository.getDifficultyBreakdown(userId),
            this.usersRepository.getTimeSpentInRange(userId, since),
            this.usersRepository.getUserStats(userId),
        ]);
        const xpByDate = new Map();
        for (const tx of xpTransactions) {
            const dateKey = tx.createdAt.toISOString().split('T')[0];
            xpByDate.set(dateKey, (xpByDate.get(dateKey) || 0) + tx.amount);
        }
        const xpOverTime = Array.from(xpByDate.entries()).map(([date, xp]) => ({
            date,
            xp,
        }));
        return {
            xpOverTime,
            difficultyBreakdown,
            averageTimePerDayMins: Math.round(timeSpent / 60 / days),
            totalXp: user.xpTotal,
            lessonsCompleted: lessonsCompleted?.lessonsCompleted ?? 0,
            currentStreak: user.streakCurrent,
        };
    }
    async getCertificates(userId) {
        const completed = await this.usersRepository.getCompletedCourses(userId);
        return completed.map((p) => ({
            courseId: p.course.id,
            courseSlug: p.course.slug,
            courseTitle: p.course.title,
            completedAt: p.completedAt.toISOString(),
            totalXpEarned: p.totalXpEarned,
        }));
    }
    async getChallengeHistory(userId, page, limit) {
        const result = await this.usersRepository.getChallengeHistory(userId, page, limit);
        return {
            data: result.data.map((s) => ({
                id: s.id,
                challengeId: s.challenge.id,
                challengeTitle: s.challenge.title,
                status: s.status,
                attemptNumber: s.attemptNumber,
                xpAwarded: s.xpAwarded,
                createdAt: s.createdAt.toISOString(),
            })),
            total: result.total,
        };
    }
    async getUserActivities(userId, options) {
        const result = await this.usersRepository.getUserActivities(userId, options);
        return {
            data: result.data.map((a) => ({
                id: a.id,
                type: a.type,
                data: a.data,
                createdAt: a.createdAt.toISOString(),
            })),
            total: result.total,
        };
    }
    async canViewProfile(viewerId, targetUserId, privacySettings) {
        const visibility = privacySettings?.profileVisibility ?? client_1.ProfileVisibility.PUBLIC;
        if (visibility === client_1.ProfileVisibility.PUBLIC) {
            return true;
        }
        if (visibility === client_1.ProfileVisibility.PRIVATE) {
            return viewerId === targetUserId;
        }
        if (visibility === client_1.ProfileVisibility.FRIENDS_ONLY) {
            if (!viewerId)
                return false;
            if (viewerId === targetUserId)
                return true;
            return this.usersRepository.isFollowing(viewerId, targetUserId);
        }
        return false;
    }
    formatUserProfile(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            locale: user.locale ?? 'en',
            timezone: user.timezone,
            xpTotal: user.xpTotal,
            level: user.level,
            streakCurrent: user.streakCurrent,
            streakLongest: user.streakLongest,
            role: user.role,
            isVerified: user.isVerified,
            onboardingCompleted: user.onboardingCompleted,
            createdAt: user.createdAt.toISOString(),
            lastActiveAt: user.lastActiveAt?.toISOString() ?? null,
        };
    }
    formatPublicProfile(user, privacySettings) {
        const showProgress = privacySettings?.showProgress ?? true;
        const showActivity = privacySettings?.showActivity ?? true;
        return {
            username: user.username,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            bio: showActivity ? user.bio : null,
            xpTotal: showProgress ? user.xpTotal : null,
            level: showProgress ? user.level : null,
            streakCurrent: showProgress ? user.streakCurrent : null,
            createdAt: user.createdAt.toISOString(),
        };
    }
    formatUserSettings(user) {
        const settings = user.settings;
        const notificationSettings = user.notificationSettings;
        const privacySettings = user.privacySettings;
        return {
            theme: settings?.theme ?? 'auto',
            codeEditorTheme: settings?.codeEditorTheme ?? 'vs-dark',
            fontSize: settings?.fontSize ?? 14,
            dailyGoalMins: settings?.dailyGoalMins ?? 30,
            difficultyPref: settings?.difficultyPref ?? 'MEDIUM',
            notifications: {
                emailEnabled: notificationSettings?.emailEnabled ?? true,
                pushEnabled: notificationSettings?.pushEnabled ?? true,
                streakReminders: notificationSettings?.streakReminders ?? true,
                achievementNotifs: notificationSettings?.achievementNotifs ?? true,
                socialNotifs: notificationSettings?.socialNotifs ?? true,
            },
            privacy: {
                profileVisibility: privacySettings?.profileVisibility ?? 'PUBLIC',
                showProgress: privacySettings?.showProgress ?? true,
                showActivity: privacySettings?.showActivity ?? true,
                allowMessages: privacySettings?.allowMessages ?? 'EVERYONE',
            },
        };
    }
    formatPublicStats(stats, privacySettings) {
        const showProgress = privacySettings?.showProgress ?? true;
        if (!showProgress) {
            return {
                xpTotal: null,
                level: null,
                coursesCompleted: null,
                achievementsEarned: null,
            };
        }
        return {
            xpTotal: stats.xpTotal,
            level: stats.level,
            coursesCompleted: stats.coursesCompleted,
            achievementsEarned: stats.achievementsEarned,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map