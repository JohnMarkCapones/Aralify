/**
 * Streak System Constants
 * Defines streak milestones and bonus XP
 */

// Streak milestones with XP bonuses
export const STREAK_MILESTONES: { days: number; xpBonus: number; name: string }[] = [
  { days: 3, xpBonus: 25, name: '3-Day Streak' },
  { days: 7, xpBonus: 50, name: 'Week Warrior' },
  { days: 14, xpBonus: 100, name: 'Two Week Champion' },
  { days: 30, xpBonus: 200, name: 'Monthly Master' },
  { days: 60, xpBonus: 400, name: 'Double Month' },
  { days: 100, xpBonus: 750, name: 'Century Coder' },
  { days: 180, xpBonus: 1000, name: 'Half Year Hero' },
  { days: 365, xpBonus: 2000, name: 'Year of Code' },
];

// Daily bonus configuration
export const DAILY_BONUS = {
  BASE_XP: 10,
  STREAK_MULTIPLIER_THRESHOLD: 7, // After 7 days, bonus increases
  MAX_BONUS_MULTIPLIER: 2.0, // Maximum 2x daily bonus
} as const;

// Streak freeze configuration (for future premium feature)
export const STREAK_FREEZE = {
  MAX_FREEZES: 2,
  FREEZE_DURATION_HOURS: 24,
} as const;

/**
 * Get streak milestone XP bonus for a given streak
 */
export function getStreakMilestoneBonus(streakDays: number): {
  milestone: { days: number; xpBonus: number; name: string } | null;
  isMilestone: boolean;
} {
  const milestone = STREAK_MILESTONES.find((m) => m.days === streakDays);
  return {
    milestone: milestone || null,
    isMilestone: !!milestone,
  };
}

/**
 * Get the next upcoming milestone for a streak
 */
export function getNextMilestone(
  currentStreak: number,
): { days: number; xpBonus: number; name: string; daysRemaining: number } | null {
  const next = STREAK_MILESTONES.find((m) => m.days > currentStreak);
  if (!next) return null;
  return {
    ...next,
    daysRemaining: next.days - currentStreak,
  };
}

/**
 * Calculate daily bonus based on streak
 */
export function calculateDailyBonus(streakDays: number): number {
  if (streakDays < DAILY_BONUS.STREAK_MULTIPLIER_THRESHOLD) {
    return DAILY_BONUS.BASE_XP;
  }

  // Gradually increase bonus after threshold
  const bonusMultiplier = Math.min(
    DAILY_BONUS.MAX_BONUS_MULTIPLIER,
    1 + (streakDays - DAILY_BONUS.STREAK_MULTIPLIER_THRESHOLD) * 0.05,
  );

  return Math.floor(DAILY_BONUS.BASE_XP * bonusMultiplier);
}

/**
 * Check if a date is today (in user's timezone or UTC)
 */
export function isToday(date: Date, timezone?: string): boolean {
  const now = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const todayStr = now.toISOString().split('T')[0];
  return dateStr === todayStr;
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = date.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  return dateStr === yesterdayStr;
}

/**
 * Check if a date is exactly two days ago
 */
export function isTwoDaysAgo(date: Date): boolean {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const dateStr = date.toISOString().split('T')[0];
  const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];
  return dateStr === twoDaysAgoStr;
}

/**
 * Get all milestones with progress info
 */
export function getMilestonesWithProgress(currentStreak: number) {
  return STREAK_MILESTONES.map((milestone) => ({
    ...milestone,
    achieved: currentStreak >= milestone.days,
    daysRemaining: Math.max(0, milestone.days - currentStreak),
    progress: Math.min(100, (currentStreak / milestone.days) * 100),
  }));
}
