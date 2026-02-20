/**
 * XP System Constants
 * Defines level formula, XP sources, multipliers, and rank titles
 */

// XP required for a level = floor(100 * level^1.5)
export const XP_LEVEL_EXPONENT = 1.5;
export const XP_BASE_MULTIPLIER = 100;

// Difficulty multipliers for lessons
export const XP_DIFFICULTY_MULTIPLIERS = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
} as const;

// XP Decay settings
export const XP_DECAY = {
  INACTIVE_DAYS_THRESHOLD: 7,
  DAILY_DECAY_AMOUNT: 25,
  MIN_XP: 0,
} as const;

// Base XP rewards
export const XP_REWARDS = {
  LESSON_COMPLETE: 100,
  QUIZ_COMPLETE: 25,
  CHALLENGE_COMPLETE: 50,
  DAILY_LOGIN: 10,
} as const;

// Rank titles based on level
export const RANK_TITLES: { minLevel: number; title: string }[] = [
  { minLevel: 1, title: 'Novice' },
  { minLevel: 5, title: 'Apprentice' },
  { minLevel: 10, title: 'Developer' },
  { minLevel: 15, title: 'Skilled Developer' },
  { minLevel: 20, title: 'Senior Developer' },
  { minLevel: 30, title: 'Expert' },
  { minLevel: 40, title: 'Master' },
  { minLevel: 50, title: 'Grandmaster' },
  { minLevel: 75, title: 'Legend' },
  { minLevel: 100, title: 'Mythic' },
];

// Level thresholds for quick reference
export const LEVEL_XP_THRESHOLDS = [
  { level: 1, xpRequired: 0 },
  { level: 5, xpRequired: 1118 },
  { level: 10, xpRequired: 3162 },
  { level: 15, xpRequired: 5809 },
  { level: 20, xpRequired: 8944 },
  { level: 30, xpRequired: 16432 },
  { level: 40, xpRequired: 25298 },
  { level: 50, xpRequired: 35355 },
  { level: 75, xpRequired: 64952 },
  { level: 100, xpRequired: 100000 },
];

/**
 * Calculate XP required to reach a specific level
 */
export function calculateXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(XP_BASE_MULTIPLIER * Math.pow(level, XP_LEVEL_EXPONENT));
}

/**
 * Calculate level from total XP
 */
export function calculateLevelFromXp(totalXp: number): number {
  if (totalXp <= 0) return 1;
  // Reverse the formula: level = (totalXp / 100)^(1/1.5)
  const level = Math.floor(Math.pow(totalXp / XP_BASE_MULTIPLIER, 1 / XP_LEVEL_EXPONENT));
  return Math.max(1, level);
}

/**
 * Get rank title for a given level
 */
export function getRankTitle(level: number): string {
  for (let i = RANK_TITLES.length - 1; i >= 0; i--) {
    if (level >= RANK_TITLES[i].minLevel) {
      return RANK_TITLES[i].title;
    }
  }
  return RANK_TITLES[0].title;
}

/**
 * Calculate XP progress within current level
 */
export function calculateLevelProgress(totalXp: number): {
  currentLevel: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressXp: number;
  progressPercentage: number;
} {
  const currentLevel = calculateLevelFromXp(totalXp);
  const currentLevelXp = calculateXpForLevel(currentLevel);
  const nextLevelXp = calculateXpForLevel(currentLevel + 1);
  const progressXp = totalXp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const progressPercentage = xpNeeded > 0 ? (progressXp / xpNeeded) * 100 : 100;

  return {
    currentLevel,
    currentLevelXp,
    nextLevelXp,
    progressXp,
    progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
  };
}
