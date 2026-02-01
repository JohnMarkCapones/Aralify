import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Aralify API is running!';
  }

  async healthCheck(): Promise<{
    status: string;
    timestamp: string;
    database: {
      status: 'connected' | 'disconnected';
      latency?: number;
    };
  }> {
    const dbHealth = await this.prisma.healthCheck();

    return {
      status: dbHealth.status === 'connected' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      database: dbHealth,
    };
  }
}
