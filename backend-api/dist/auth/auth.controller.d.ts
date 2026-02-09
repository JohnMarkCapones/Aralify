import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthUpdateProfileDto, AuthUserProfileDto, SessionInfoDto, AuthStatusDto } from './dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    getStatus(): AuthStatusDto;
    getMe(user: User): Promise<AuthUserProfileDto>;
    updateMe(user: User, updateDto: AuthUpdateProfileDto): Promise<AuthUserProfileDto>;
    registerSession(user: User, userAgent: string, forwardedFor: string, body: {
        deviceId?: string;
    }): Promise<SessionInfoDto>;
    getSessions(user: User): Promise<SessionInfoDto[]>;
    revokeSession(user: User, sessionId: string): Promise<void>;
    logout(user: User): Promise<void>;
    deleteAccount(user: User): Promise<void>;
    private mapToProfileDto;
}
