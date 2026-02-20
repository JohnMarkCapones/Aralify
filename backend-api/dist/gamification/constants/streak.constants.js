"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STREAK_FREEZE = exports.DAILY_BONUS = exports.STREAK_MILESTONES = void 0;
exports.getStreakMilestoneBonus = getStreakMilestoneBonus;
exports.getNextMilestone = getNextMilestone;
exports.calculateDailyBonus = calculateDailyBonus;
exports.isToday = isToday;
exports.isYesterday = isYesterday;
exports.isTwoDaysAgo = isTwoDaysAgo;
exports.getMilestonesWithProgress = getMilestonesWithProgress;
exports.STREAK_MILESTONES = [
    { days: 3, xpBonus: 25, name: '3-Day Streak' },
    { days: 7, xpBonus: 50, name: 'Week Warrior' },
    { days: 14, xpBonus: 100, name: 'Two Week Champion' },
    { days: 30, xpBonus: 200, name: 'Monthly Master' },
    { days: 60, xpBonus: 400, name: 'Double Month' },
    { days: 100, xpBonus: 750, name: 'Century Coder' },
    { days: 180, xpBonus: 1000, name: 'Half Year Hero' },
    { days: 365, xpBonus: 2000, name: 'Year of Code' },
];
exports.DAILY_BONUS = {
    BASE_XP: 10,
    STREAK_MULTIPLIER_THRESHOLD: 7,
    MAX_BONUS_MULTIPLIER: 2.0,
};
exports.STREAK_FREEZE = {
    MAX_FREEZES: 2,
    FREEZE_DURATION_HOURS: 24,
};
function getStreakMilestoneBonus(streakDays) {
    const milestone = exports.STREAK_MILESTONES.find((m) => m.days === streakDays);
    return {
        milestone: milestone || null,
        isMilestone: !!milestone,
    };
}
function getNextMilestone(currentStreak) {
    const next = exports.STREAK_MILESTONES.find((m) => m.days > currentStreak);
    if (!next)
        return null;
    return {
        ...next,
        daysRemaining: next.days - currentStreak,
    };
}
function calculateDailyBonus(streakDays) {
    if (streakDays < exports.DAILY_BONUS.STREAK_MULTIPLIER_THRESHOLD) {
        return exports.DAILY_BONUS.BASE_XP;
    }
    const bonusMultiplier = Math.min(exports.DAILY_BONUS.MAX_BONUS_MULTIPLIER, 1 + (streakDays - exports.DAILY_BONUS.STREAK_MULTIPLIER_THRESHOLD) * 0.05);
    return Math.floor(exports.DAILY_BONUS.BASE_XP * bonusMultiplier);
}
function isToday(date, timezone) {
    const now = new Date();
    const dateStr = date.toISOString().split('T')[0];
    const todayStr = now.toISOString().split('T')[0];
    return dateStr === todayStr;
}
function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = date.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    return dateStr === yesterdayStr;
}
function isTwoDaysAgo(date) {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const dateStr = date.toISOString().split('T')[0];
    const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];
    return dateStr === twoDaysAgoStr;
}
function getMilestonesWithProgress(currentStreak) {
    return exports.STREAK_MILESTONES.map((milestone) => ({
        ...milestone,
        achieved: currentStreak >= milestone.days,
        daysRemaining: Math.max(0, milestone.days - currentStreak),
        progress: Math.min(100, (currentStreak / milestone.days) * 100),
    }));
}
//# sourceMappingURL=streak.constants.js.map