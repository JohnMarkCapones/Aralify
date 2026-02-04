import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
export interface JwtPayload {
    sub: string;
    email?: string;
    role?: string;
    aud?: string;
    exp?: number;
    iat?: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly authService;
    private readonly logger;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        level: number;
        id: string;
        email: string;
        username: string;
        passwordHash: string | null;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        locale: string | null;
        timezone: string | null;
        xpTotal: number;
        streakCurrent: number;
        streakLongest: number;
        streakFreezes: number;
        lastDailyClaimAt: Date | null;
        googleId: string | null;
        githubId: string | null;
        facebookId: string | null;
        isVerified: boolean;
        isActive: boolean;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
        lastActiveAt: Date | null;
    }>;
}
export {};
