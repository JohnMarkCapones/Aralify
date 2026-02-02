import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { UserProfileDto, UpdateProfileDto, SessionInfoDto, AuthStatusDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getStatus(): AuthStatusDto;
    getMe(user: User): Promise<UserProfileDto>;
    updateMe(user: User, updateDto: UpdateProfileDto): Promise<UserProfileDto>;
    registerSession(user: User, userAgent: string, forwardedFor: string, body: {
        deviceId?: string;
    }): Promise<SessionInfoDto>;
    getSessions(user: User): Promise<SessionInfoDto[]>;
    revokeSession(user: User, sessionId: string): Promise<void>;
    logout(user: User): Promise<void>;
    deleteAccount(user: User): Promise<void>;
    private mapToProfileDto;
}
