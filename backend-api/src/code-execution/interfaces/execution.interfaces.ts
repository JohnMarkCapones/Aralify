/**
 * Internal domain types for code execution
 */

/** Matches the JSON structure of CodeChallenge.testCases in Prisma */
export interface TestCaseDefinition {
  input: string;
  expectedOutput: string;
}

export interface TestCaseResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string | null;
  passed: boolean;
  executionTimeMs: number | null;
  memoryUsedKb: number | null;
  status: string;
  errorOutput: string | null;
}

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  testResults: TestCaseResult[];
  passed: number;
  failed: number;
  total: number;
  overallStatus: 'PASSED' | 'FAILED' | 'ERROR';
}

export interface SubmissionResult extends ExecutionResult {
  submissionId: string;
  allTestsPassed: boolean;
  xpEarned: number;
  attemptNumber: number;
  previouslyPassed: boolean;
  gamification: {
    xpAwarded: number;
    newTotal: number;
    levelUp: boolean;
    newLevel: number;
    rankTitle: string;
  } | null;
}

export interface CircuitBreakerState {
  failures: number;
  lastFailure: number | null;
  isOpen: boolean;
  openedAt: number | null;
}
