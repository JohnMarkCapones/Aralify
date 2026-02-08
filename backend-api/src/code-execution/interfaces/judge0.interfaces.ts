/**
 * Judge0 API TypeScript interfaces
 * @see https://ce.judge0.com/#submissions-submission
 */

export interface Judge0SubmissionRequest {
  source_code: string; // Base64 encoded
  language_id: number;
  stdin?: string; // Base64 encoded
  expected_output?: string; // Base64 encoded
  cpu_time_limit?: number; // seconds
  memory_limit?: number; // KB
}

export interface Judge0SubmissionResponse {
  token: string;
  stdout: string | null; // Base64 encoded
  stderr: string | null; // Base64 encoded
  compile_output: string | null; // Base64 encoded
  message: string | null;
  status: Judge0Status;
  time: string | null; // seconds
  memory: number | null; // KB
}

export interface Judge0Status {
  id: Judge0StatusId;
  description: string;
}

export interface Judge0BatchResponse {
  submissions: Judge0SubmissionResponse[];
}

/**
 * Judge0 status IDs
 * @see https://ce.judge0.com/#statuses-and-languages-statuses
 */
export enum Judge0StatusId {
  IN_QUEUE = 1,
  PROCESSING = 2,
  ACCEPTED = 3,
  WRONG_ANSWER = 4,
  TIME_LIMIT_EXCEEDED = 5,
  COMPILATION_ERROR = 6,
  RUNTIME_ERROR_SIGSEGV = 7,
  RUNTIME_ERROR_SIGXFSZ = 8,
  RUNTIME_ERROR_SIGFPE = 9,
  RUNTIME_ERROR_SIGABRT = 10,
  RUNTIME_ERROR_NZEC = 11,
  RUNTIME_ERROR_OTHER = 12,
  INTERNAL_ERROR = 13,
  EXEC_FORMAT_ERROR = 14,
}

export function isRuntimeError(statusId: Judge0StatusId): boolean {
  return statusId >= Judge0StatusId.RUNTIME_ERROR_SIGSEGV
    && statusId <= Judge0StatusId.RUNTIME_ERROR_OTHER;
}
