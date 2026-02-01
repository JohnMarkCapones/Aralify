import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
        database: {
            status: 'connected' | 'disconnected';
            latency?: number;
        };
    }>;
}
