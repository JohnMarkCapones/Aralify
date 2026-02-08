import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import {
  Judge0SubmissionRequest,
  Judge0SubmissionResponse,
  Judge0StatusId,
  CircuitBreakerState,
} from '../interfaces';

const CIRCUIT_BREAKER_THRESHOLD = 5;
const CIRCUIT_BREAKER_COOLDOWN_MS = 30_000;
const CIRCUIT_BREAKER_WINDOW_MS = 60_000;

@Injectable()
export class Judge0Service {
  private readonly logger = new Logger(Judge0Service.name);
  private readonly client: AxiosInstance;
  private readonly circuitBreaker: CircuitBreakerState = {
    failures: 0,
    lastFailure: null,
    isOpen: false,
    openedAt: null,
  };

  constructor(private readonly configService: ConfigService) {
    const baseURL = this.configService.get<string>(
      'JUDGE0_API_URL',
      'http://localhost:2358',
    );
    const apiKey = this.configService.get<string>('JUDGE0_API_KEY', '');
    const timeout = this.configService.get<number>(
      'JUDGE0_TIMEOUT_MS',
      10000,
    );

    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'X-Auth-Token': apiKey } : {}),
      },
    });
  }

  /**
   * Submit a single code execution and wait for result (synchronous mode)
   */
  async submitAndWait(
    request: Judge0SubmissionRequest,
  ): Promise<Judge0SubmissionResponse> {
    this.checkCircuitBreaker();

    try {
      const response = await this.client.post<Judge0SubmissionResponse>(
        '/submissions?base64_encoded=true&wait=true',
        request,
      );

      this.onSuccess();
      return this.decodeResponse(response.data);
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  /**
   * Submit a batch of submissions and poll for results.
   * Falls back to sequential submitAndWait if batch endpoint is unavailable.
   */
  async submitBatch(
    requests: Judge0SubmissionRequest[],
  ): Promise<Judge0SubmissionResponse[]> {
    this.checkCircuitBreaker();

    try {
      // Try batch submission
      const response = await this.client.post<{ token?: string }[]>(
        '/submissions/batch?base64_encoded=true',
        { submissions: requests },
      );

      const tokens = response.data.map((r) => r.token).filter(Boolean);

      if (tokens.length === 0) {
        throw new Error('No tokens returned from batch submission');
      }

      // Poll for results
      const results = await this.pollBatchResults(tokens as string[]);
      this.onSuccess();
      return results;
    } catch (error) {
      // If batch endpoint is unavailable (404), fall back to sequential
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        this.logger.warn(
          'Batch endpoint unavailable, falling back to sequential submissions',
        );
        return this.submitSequential(requests);
      }

      this.onFailure();
      throw error;
    }
  }

  /**
   * Check if Judge0 is healthy
   */
  async isHealthy(): Promise<boolean> {
    try {
      const response = await this.client.get('/system_info', {
        timeout: 3000,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private async submitSequential(
    requests: Judge0SubmissionRequest[],
  ): Promise<Judge0SubmissionResponse[]> {
    const results: Judge0SubmissionResponse[] = [];
    for (const request of requests) {
      const result = await this.submitAndWait(request);
      results.push(result);
    }
    return results;
  }

  private async pollBatchResults(
    tokens: string[],
    maxAttempts = 20,
    intervalMs = 500,
  ): Promise<Judge0SubmissionResponse[]> {
    const tokenParam = tokens.join(',');

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await this.client.get<{
        submissions: Judge0SubmissionResponse[];
      }>(`/submissions/batch?tokens=${tokenParam}&base64_encoded=true`);

      const submissions = response.data.submissions;
      const allDone = submissions.every(
        (s) =>
          s.status.id !== Judge0StatusId.IN_QUEUE &&
          s.status.id !== Judge0StatusId.PROCESSING,
      );

      if (allDone) {
        return submissions.map((s) => this.decodeResponse(s));
      }

      await this.sleep(intervalMs);
    }

    // Return whatever we have after max attempts
    this.logger.warn(
      `Batch polling timed out after ${maxAttempts} attempts for tokens: ${tokenParam}`,
    );
    const finalResponse = await this.client.get<{
      submissions: Judge0SubmissionResponse[];
    }>(`/submissions/batch?tokens=${tokenParam}&base64_encoded=true`);

    return finalResponse.data.submissions.map((s) => this.decodeResponse(s));
  }

  private decodeResponse(
    response: Judge0SubmissionResponse,
  ): Judge0SubmissionResponse {
    return {
      ...response,
      stdout: this.decodeBase64(response.stdout),
      stderr: this.decodeBase64(response.stderr),
      compile_output: this.decodeBase64(response.compile_output),
    };
  }

  private decodeBase64(value: string | null): string | null {
    if (!value) return null;
    try {
      return Buffer.from(value, 'base64').toString('utf-8');
    } catch {
      return value;
    }
  }

  // ---------------------------------------------------------------------------
  // Circuit breaker
  // ---------------------------------------------------------------------------

  private checkCircuitBreaker(): void {
    if (!this.circuitBreaker.isOpen) return;

    const now = Date.now();
    const elapsed = now - (this.circuitBreaker.openedAt ?? 0);

    if (elapsed >= CIRCUIT_BREAKER_COOLDOWN_MS) {
      // Half-open: allow one request through
      this.logger.log('Circuit breaker entering half-open state');
      this.circuitBreaker.isOpen = false;
      this.circuitBreaker.failures = CIRCUIT_BREAKER_THRESHOLD - 1; // One more failure re-opens
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

    // Reset if last failure was outside the window
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

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
