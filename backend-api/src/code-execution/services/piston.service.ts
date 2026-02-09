import {
  Injectable,
  Logger,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import {
  PistonExecuteRequest,
  PistonExecuteResponse,
  LANGUAGE_MAP,
  CircuitBreakerState,
} from '../interfaces';

const CIRCUIT_BREAKER_THRESHOLD = 5;
const CIRCUIT_BREAKER_COOLDOWN_MS = 30_000;
const CIRCUIT_BREAKER_WINDOW_MS = 60_000;

@Injectable()
export class PistonService {
  private readonly logger = new Logger(PistonService.name);
  private readonly client: AxiosInstance;
  private readonly circuitBreaker: CircuitBreakerState = {
    failures: 0,
    lastFailure: null,
    isOpen: false,
    openedAt: null,
  };

  constructor(private readonly configService: ConfigService) {
    const baseURL = this.configService.get<string>(
      'PISTON_API_URL',
      'http://localhost:2000',
    );
    const timeout = this.configService.get<number>(
      'PISTON_TIMEOUT_MS',
      10000,
    );

    this.client = axios.create({
      baseURL,
      timeout,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Execute a single code submission (synchronous — Piston always blocks).
   */
  async execute(
    request: PistonExecuteRequest,
  ): Promise<PistonExecuteResponse> {
    this.checkCircuitBreaker();

    try {
      const response = await this.client.post<PistonExecuteResponse>(
        '/api/v2/execute',
        request,
      );
      this.onSuccess();
      return response.data;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  /**
   * Execute multiple requests sequentially.
   * Piston has no batch endpoint, so we loop.
   */
  async executeAll(
    requests: PistonExecuteRequest[],
  ): Promise<PistonExecuteResponse[]> {
    const results: PistonExecuteResponse[] = [];
    for (const request of requests) {
      const result = await this.execute(request);
      results.push(result);
    }
    return results;
  }

  /**
   * Check if Piston is healthy by fetching available runtimes.
   */
  async isHealthy(): Promise<boolean> {
    try {
      const response = await this.client.get('/api/v2/runtimes', {
        timeout: 3000,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  /**
   * Map a numeric language ID to Piston language + version.
   * Throws BadRequestException if the language ID is not supported.
   */
  mapLanguageId(languageId: number): { language: string; version: string } {
    const mapping = LANGUAGE_MAP[languageId];
    if (!mapping) {
      throw new BadRequestException(
        `Unsupported language ID: ${languageId}. Supported IDs: ${Object.keys(LANGUAGE_MAP).join(', ')}`,
      );
    }
    return mapping;
  }

  // ---------------------------------------------------------------------------
  // Circuit breaker
  // ---------------------------------------------------------------------------

  private checkCircuitBreaker(): void {
    if (!this.circuitBreaker.isOpen) return;

    const now = Date.now();
    const elapsed = now - (this.circuitBreaker.openedAt ?? 0);

    if (elapsed >= CIRCUIT_BREAKER_COOLDOWN_MS) {
      this.logger.log('Circuit breaker entering half-open state');
      this.circuitBreaker.isOpen = false;
      this.circuitBreaker.failures = CIRCUIT_BREAKER_THRESHOLD - 1;
      return;
    }

    throw new ServiceUnavailableException(
      'Code execution service is temporarily unavailable. Please try again later.',
    );
  }

  private onSuccess(): void {
    if (this.circuitBreaker.failures > 0) {
      this.logger.log('Circuit breaker reset after successful request');
    }
    this.circuitBreaker.failures = 0;
    this.circuitBreaker.lastFailure = null;
    this.circuitBreaker.isOpen = false;
    this.circuitBreaker.openedAt = null;
  }

  private onFailure(): void {
    const now = Date.now();

    if (
      this.circuitBreaker.lastFailure &&
      now - this.circuitBreaker.lastFailure > CIRCUIT_BREAKER_WINDOW_MS
    ) {
      this.circuitBreaker.failures = 0;
    }

    this.circuitBreaker.failures++;
    this.circuitBreaker.lastFailure = now;

    if (this.circuitBreaker.failures >= CIRCUIT_BREAKER_THRESHOLD) {
      this.circuitBreaker.isOpen = true;
      this.circuitBreaker.openedAt = now;
      this.logger.error(
        `Circuit breaker OPEN after ${this.circuitBreaker.failures} failures`,
      );
    }
  }
}
