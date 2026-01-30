// Re-export Prisma types for convenience
export type {
  User,
  Course,
  Level,
  Lesson,
  Quiz,
  CodeChallenge,
  UserProgress,
  Achievement,
  Badge,
} from "@prisma/client";

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Difficulty enum (mirrors Prisma)
export type Difficulty = "EASY" | "MEDIUM" | "HARD";

// XP Multipliers
export const XP_MULTIPLIERS: Record<Difficulty, number> = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};
