/**
 * Piston API TypeScript interfaces
 * @see https://github.com/engineer-man/piston#api-v2
 */

export interface PistonExecuteRequest {
  language: string;
  version: string;
  files: { name?: string; content: string }[];
  stdin?: string;
  run_timeout?: number;
  compile_timeout?: number;
  run_memory_limit?: number;
}

export interface PistonExecuteResponse {
  language: string;
  version: string;
  run: PistonOutput;
  compile?: PistonOutput;
}

export interface PistonOutput {
  stdout: string;
  stderr: string;
  output: string;
  code: number | null;
  signal: string | null;
}

/**
 * Maps numeric language IDs (stored in DTOs and Prisma)
 * to Piston language name + version strings.
 */
export const LANGUAGE_MAP: Record<
  number,
  { language: string; version: string }
> = {
  71: { language: 'python', version: '3.10.0' },
  63: { language: 'javascript', version: '15.10.0' },
  62: { language: 'java', version: '15.0.2' },
  74: { language: 'typescript', version: '4.2.3' },
  50: { language: 'c', version: '10.2.0' },
  54: { language: 'c++', version: '10.2.0' },
};
