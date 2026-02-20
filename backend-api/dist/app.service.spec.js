"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
describe('AppService', () => {
    let service;
    let prismaService;
    const mockPrismaService = {
        healthCheck: jest.fn().mockResolvedValue({
            status: 'connected',
            latency: 10,
        }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                app_service_1.AppService,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();
        service = module.get(app_service_1.AppService);
        prismaService = module.get(prisma_service_1.PrismaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getHello', () => {
        it('should return welcome message', () => {
            expect(service.getHello()).toBe('Aralify API is running!');
        });
    });
    describe('healthCheck', () => {
        it('should return healthy status when database is connected', async () => {
            const result = await service.healthCheck();
            expect(result.status).toBe('healthy');
            expect(result.timestamp).toBeDefined();
            expect(result.database.status).toBe('connected');
            expect(result.database.latency).toBe(10);
        });
        it('should return degraded status when database is disconnected', async () => {
            mockPrismaService.healthCheck.mockResolvedValueOnce({
                status: 'disconnected',
            });
            const result = await service.healthCheck();
            expect(result.status).toBe('degraded');
            expect(result.database.status).toBe('disconnected');
        });
    });
});
//# sourceMappingURL=app.service.spec.js.map