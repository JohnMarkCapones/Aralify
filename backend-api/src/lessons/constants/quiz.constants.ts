import { Difficulty } from '@prisma/client';

/**
 * XP rewards for quiz questions based on difficulty
 */
export const QUIZ_XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  EASY: 15,
  MEDIUM: 25,
  HARD: 40,
};

/**
 * Multiplier for first-attempt correct answers
 */
export const FIRST_ATTEMPT_MULTIPLIER = 1.5;

/**
 * Bonus XP for achieving a perfect score (100%) on all quizzes in a lesson
 */
export const PERFECT_SCORE_BONUS = 50;

/**
 * Default XP when difficulty is not specified (falls back to MEDIUM)
 */
export const DEFAULT_QUIZ_XP = QUIZ_XP_BY_DIFFICULTY.MEDIUM;
