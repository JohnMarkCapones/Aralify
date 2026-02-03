import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtPayload } from './strategies/jwt.strategy';
import { UpdateProfileDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ============================================================================
  // User Validation & Sync
  // ============================================================================

  /**
   * Validates the JWT payload and returns/creates the user
   * This syncs Supabase Auth users with our local database
   */
  async validateUser(payload: JwtPayload): Promise<User | null> {
    this.logger.log(`=== validateUser START ===`);
    this.logger.log(`Payload sub: ${payload.sub}`);
    this.logger.log(`Payload email: ${payload.email}`);

    const supabaseUserId = payload.sub;
    const email = payload.email;

    // Try to find user by Supabase ID (stored in our user.id)
    this.logger.log(`Looking for user by ID: ${supabaseUserId}`);
    let user = await this.prisma.user.findUnique({
      where: { id: supabaseUserId },
    });
    this.logger.log(`Found by ID: ${user ? 'YES' : 'NO'}`);

    // If not found by ID, try by email (for existing users)
    if (!user && email) {
      this.logger.log(`Looking for user by email: ${email}`);
      user = await this.prisma.user.findUnique({
        where: { email },
      });
      this.logger.log(`Found by email: ${user ? 'YES' : 'NO'}`);

      // Update the user ID to match Supabase ID if found by email
      if (user && user.id !== supabaseUserId) {
        this.logger.log(`Updating user ID from ${user.id} to ${supabaseUserId}`);
        user = await this.prisma.user.update({
          where: { email },
          data: { id: supabaseUserId },
        });
      }
    }

    // Auto-create user if they don't exist (first login via Supabase)
    if (!user && email) {
      this.logger.log(`*** CREATING NEW USER ***`);
      this.logger.log(`Supabase ID: ${supabaseUserId}`);
      this.logger.log(`Email: ${email}`);
      try {
        user = await this.createUserFromSupabase(supabaseUserId, email);
        this.logger.log(`User created successfully: ${user.id}`);
      } catch (error) {
        this.logger.error(`Failed to create user: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }

    if (user) {
      // Update last login
      this.logger.log(`Updating lastLoginAt for user: ${user.id}`);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    this.logger.log(`=== validateUser END - User: ${user?.email || 'NULL'} ===`);
    return user;
  }

  /**
   * Creates a new user from Supabase Auth data
   */
  private async createUserFromSupabase(
    supabaseUserId: string,
    email: string,
  ): Promise<User> {
    const username = await this.generateUniqueUsername(email);

    const user = await this.prisma.user.create({
      data: {
        id: supabaseUserId,
        email,
        username,
        displayName: username,
        isVerified: true, // Supabase handles email verification
      },
    });

    // Create default settings for new user
    await this.createDefaultSettings(user.id);

    return user;
  }

  /**
   * Generates a unique username from email
   */
  private async generateUniqueUsername(email: string): Promise<string> {
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

  /**
   * Create default settings for a new user
   */
  private async createDefaultSettings(userId: string): Promise<void> {
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

  // ============================================================================
  // User Profile
  // ============================================================================

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  /**
   * Get user with all settings
   */
  async getUserWithSettings(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        settings: true,
        notificationSettings: true,
        privacySettings: true,
      },
    });
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: UpdateProfileDto): Promise<User> {
    // Check username uniqueness if updating
    if (data.username) {
      const existing = await this.prisma.user.findUnique({
        where: { username: data.username },
      });

      if (existing && existing.id !== userId) {
        throw new ConflictException('Username already taken');
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

  // ============================================================================
  // Session Management
  // ============================================================================

  /**
   * Create a new session
   */
  async createSession(
    userId: string,
    data: { deviceInfo?: string; ipAddress?: string; deviceId?: string },
  ) {
    const token = this.generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

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

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId: string) {
    return this.prisma.userSession.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Revoke a specific session
   */
  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const session = await this.prisma.userSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await this.prisma.userSession.delete({
      where: { id: sessionId },
    });
  }

  /**
   * Revoke all sessions for a user
   */
  async revokeAllSessions(userId: string): Promise<void> {
    await this.prisma.userSession.deleteMany({
      where: { userId },
    });
  }

  /**
   * Generate a random session token
   */
  private generateSessionToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  // ============================================================================
  // Account Management
  // ============================================================================

  /**
   * Delete user account (soft delete - anonymize data)
   */
  async deleteAccount(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Anonymize user data instead of hard delete
    const anonymizedEmail = `deleted_${userId}@deleted.local`;
    const anonymizedUsername = `deleted_${userId}`;

    await this.prisma.$transaction([
      // Anonymize user
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
      // Delete all sessions
      this.prisma.userSession.deleteMany({
        where: { userId },
      }),
      // Delete OAuth accounts
      this.prisma.oAuthAccount.deleteMany({
        where: { userId },
      }),
      // Delete password reset tokens
      this.prisma.passwordResetToken.deleteMany({
        where: { userId },
      }),
    ]);

    this.logger.log(`Account deleted (anonymized) for user: ${userId}`);
  }

  // ============================================================================
  // OAuth Account Management
  // ============================================================================

  /**
   * Link an OAuth account
   */
  async linkOAuthAccount(
    userId: string,
    provider: string,
    providerId: string,
    tokens?: { accessToken?: string; refreshToken?: string },
  ) {
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

  /**
   * Unlink an OAuth account
   */
  async unlinkOAuthAccount(userId: string, provider: string): Promise<void> {
    await this.prisma.oAuthAccount.delete({
      where: {
        userId_provider: { userId, provider },
      },
    });
  }

  /**
   * Get linked OAuth accounts for a user
   */
  async getLinkedOAuthAccounts(userId: string) {
    return this.prisma.oAuthAccount.findMany({
      where: { userId },
      select: {
        provider: true,
        providerId: true,
        createdAt: true,
      },
    });
  }
}
