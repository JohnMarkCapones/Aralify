"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVEL_XP_THRESHOLDS = exports.RANK_TITLES = exports.XP_REWARDS = exports.XP_DIFFICULTY_MULTIPLIERS = exports.XP_BASE_MULTIPLIER = exports.XP_LEVEL_EXPONENT = void 0;
exports.calculateXpForLevel = calculateXpForLevel;
exports.calculateLevelFromXp = calculateLevelFromXp;
exports.getRankTitle = getRankTitle;
exports.calculateLevelProgress = calculateLevelProgress;
exports.XP_LEVEL_EXPONENT = 1.5;
exports.XP_BASE_MULTIPLIER = 100;
exports.XP_DIFFICULTY_MULTIPLIERS = {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
};
exports.XP_REWARDS = {
    LESSON_COMPLETE: 100,
    QUIZ_COMPLETE: 25,
    CHALLENGE_COMPLETE: 50,
    DAILY_LOGIN: 10,
};
exports.RANK_TITLES = [
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
exports.LEVEL_XP_THRESHOLDS = [
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
function calculateXpForLevel(level) {
    if (level <= 1)
        return 0;
    return Math.floor(exports.XP_BASE_MULTIPLIER * Math.pow(level, exports.XP_LEVEL_EXPONENT));
}
function calculateLevelFromXp(totalXp) {
    if (totalXp <= 0)
        return 1;
    const level = Math.floor(Math.pow(totalXp / exports.XP_BASE_MULTIPLIER, 1 / exports.XP_LEVEL_EXPONENT));
    return Math.max(1, level);
}
function getRankTitle(level) {
    for (let i = exports.RANK_TITLES.length - 1; i >= 0; i--) {
        if (level >= exports.RANK_TITLES[i].minLevel) {
            return exports.RANK_TITLES[i].title;
        }
    }
    return exports.RANK_TITLES[0].title;
}
function calculateLevelProgress(totalXp) {
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
//# sourceMappingURL=xp.constants.js.map