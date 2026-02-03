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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(payload) {
        this.logger.log(`=== validateUser START ===`);
        this.logger.log(`Payload sub: ${payload.sub}`);
        this.logger.log(`Payload email: ${payload.email}`);
        const supabaseUserId = payload.sub;
        const email = payload.email;
        this.logger.log(`Looking for user by ID: ${supabaseUserId}`);
        let user = await this.prisma.user.findUnique({
            where: { id: supabaseUserId },
        });
        this.logger.log(`Found by ID: ${user ? 'YES' : 'NO'}`);
        if (!user && email) {
            this.logger.log(`Looking for user by email: ${email}`);
            user = await this.prisma.user.findUnique({
                where: { email },
            });
            this.logger.log(`Found by email: ${user ? 'YES' : 'NO'}`);
            if (user && user.id !== supabaseUserId) {
                this.logger.log(`Updating user ID from ${user.id} to ${supabaseUserId}`);
                user = await this.prisma.user.update({
                    where: { email },
                    data: { id: supabaseUserId },
                });
            }
        }
        if (!user && email) {
            this.logger.log(`*** CREATING NEW USER ***`);
            this.logger.log(`Supabase ID: ${supabaseUserId}`);
            this.logger.log(`Email: ${email}`);
            try {
                user = await this.createUserFromSupabase(supabaseUserId, email);
                this.logger.log(`User created successfully: ${user.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to create user: ${error instanceof Error ? error.message : String(error)}`);
                throw error;
            }
        }
        if (user) {
            this.logger.log(`Updating lastLoginAt for user: ${user.id}`);
            await this.prisma.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date() },
            });
        }
        this.logger.log(`=== validateUser END - User: ${user?.email || 'NULL'} ===`);
        return user;
    }
    async createUserFromSupabase(supabaseUserId, email) {
        const username = await this.generateUniqueUsername(email);
        const user = await this.prisma.user.create({
            data: {
                id: supabaseUserId,
                email,
                username,
                displayName: username,
                isVerified: true,
            },
        });
        await this.createDefaultSettings(user.id);
        return user;
    }
    async generateUniqueUsername(email) {
        const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        let username = base;
        let counter = 0;
        while (true) {
            const existing = await this.prisma.user.findUnique({
                where: { username },
            });
            if (!existing) {
                return username;
            }
            counter++;
            username = `${base}_${counter}`;
        }
    }
    async createDefaultSettings(userId) {
        await this.prisma.$transaction([
            this.prisma.userSettings.create({
                data: {
                    userId,
                    theme: 'auto',
                    codeEditorTheme: 'vs-dark',
                    fontSize: 14,
                    dailyGoalMins: 30,
                    difficultyPref: 'MEDIUM',
                },
            }),
            this.prisma.notificationSettings.create({
                data: {
                    userId,
                    emailEnabled: true,
                    pushEnabled: true,
                    streakReminders: true,
                    achievementNotifs: true,
                    socialNotifs: true,
                },
            }),
            this.prisma.privacySettings.create({
                data: {
                    userId,
                    profileVisibility: 'PUBLIC',
                    showProgress: true,
                    showActivity: true,
                    allowMessages: 'EVERYONE',
                },
            }),
        ]);
    }
    async getUserById(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
    async getUserWithSettings(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                settings: true,
                notificationSettings: true,
                privacySettings: true,
            },
        });
    }
    async updateProfile(userId, data) {
        if (data.username) {
            const existing = await this.prisma.user.findUnique({
                where: { username: data.username },
            });
            if (existing && existing.id !== userId) {
                throw new common_1.ConflictException('Username already taken');
            }
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: data.username,
                displayName: data.displayName,
                avatarUrl: data.avatarUrl,
                bio: data.bio,
                locale: data.locale,
                timezone: data.timezone,
            },
        });
    }
    async createSession(userId, data) {
        const token = this.generateSessionToken();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        return this.prisma.userSession.create({
            data: {
                userId,
                token,
                deviceInfo: data.deviceInfo,
                ipAddress: data.ipAddress,
                expiresAt,
            },
        });
    }
    async getUserSessions(userId) {
        return this.prisma.userSession.findMany({
            where: {
                userId,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async revokeSession(userId, sessionId) {
        const session = await this.prisma.userSession.findFirst({
            where: { id: sessionId, userId },
        });
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        await this.prisma.userSession.delete({
            where: { id: sessionId },
        });
    }
    async revokeAllSessions(userId) {
        await this.prisma.userSession.deleteMany({
            where: { userId },
        });
    }
    generateSessionToken() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 64; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }
    async deleteAccount(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const anonymizedEmail = `deleted_${userId}@deleted.local`;
        const anonymizedUsername = `deleted_${userId}`;
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    email: anonymizedEmail,
                    username: anonymizedUsername,
                    displayName: 'Deleted User',
                    avatarUrl: null,
                    bio: null,
                    passwordHash: null,
                },
            }),
            this.prisma.userSession.deleteMany({
                where: { userId },
            }),
            this.prisma.oAuthAccount.deleteMany({
                where: { userId },
            }),
            this.prisma.passwordResetToken.deleteMany({
                where: { userId },
            }),
        ]);
        this.logger.log(`Account deleted (anonymized) for user: ${userId}`);
    }
    async linkOAuthAccount(userId, provider, providerId, tokens) {
        return this.prisma.oAuthAccount.upsert({
            where: {
                userId_provider: { userId, provider },
            },
            update: {
                providerId,
                accessToken: tokens?.accessToken,
                refreshToken: tokens?.refreshToken,
            },
            create: {
                userId,
                provider,
                providerId,
                accessToken: tokens?.accessToken,
                refreshToken: tokens?.refreshToken,
            },
        });
    }
    async unlinkOAuthAccount(userId, provider) {
        await this.prisma.oAuthAccount.delete({
            where: {
                userId_provider: { userId, provider },
            },
        });
    }
    async getLinkedOAuthAccounts(userId) {
        return this.prisma.oAuthAccount.findMany({
            where: { userId },
            select: {
                provider: true,
                providerId: true,
                createdAt: true,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map