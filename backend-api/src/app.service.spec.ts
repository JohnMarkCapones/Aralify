import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppService', () => {
  let service: AppService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    healthCheck: jest.fn().mockResolvedValue({
      status: 'connected',
      latency: 10,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    prismaService = module.get<PrismaService>(PrismaService);
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
