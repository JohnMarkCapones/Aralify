import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthService } from '../auth.service';

export interface JwtPayload {
  sub: string; // Supabase user ID
  email?: string;
  role?: string;
  aud?: string;
  exp?: number;
  iat?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const supabaseUrl = configService.get<string>('SUPABASE_URL') ||
                        configService.get<string>('NEXT_PUBLIC_SUPABASE_URL') ||
                        'https://uqjajnsxkpegzpbsmzkq.supabase.co';

    // Use JWKS endpoint for ES256 token verification
    const jwksUri = `${supabaseUrl}/auth/v1/.well-known/jwks.json`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwksUri,
      }),
      algorithms: ['ES256'],
    });

    this.logger.log(`JwtStrategy initialized with JWKS: ${jwksUri}`);
  }

  async validate(payload: JwtPayload) {
    this.logger.log(`Validating JWT for user: ${payload.sub}, email: ${payload.email}`);

    if (!payload.sub) {
      this.logger.error('Invalid token payload - missing sub');
      throw new UnauthorizedException('Invalid token payload');
    }

    // Get or create user in our database
    const user = await this.authService.validateUser(payload);

    if (!user) {
      this.logger.error('User not found after validation');
      throw new UnauthorizedException('User not found');
    }

    this.logger.log(`User validated: ${user.email}`);
    return user;
  }
}
