import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
        database: {
            status: "connected" | "disconnected";
            latency?: number;
        };
    }>;
}
