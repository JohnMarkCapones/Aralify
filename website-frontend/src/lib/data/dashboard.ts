// ─── Types ──────────────────────────────────────────────────────────────────

export interface DashboardUserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  rank: number;
  totalUsers: number;
  dailyGoal: number;
  dailyProgress: number;
  coursesEnrolled: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  challengesCompleted: number;
  achievementsUnlocked: number;
  badgesEarned: number;
  joinedAt: string;
  equippedBadgeIds: string[];
  followingCount: number;
  followersCount: number;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  currentLesson: string;
  xpEarned: number;
  lastStudied: string;
  status: "in_progress" | "completed" | "not_started";
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "learning" | "mastery" | "streak" | "social" | "special";
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  maxProgress: number;
  xpReward: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
  earnedAt: string | null;
  hint: string;
  category: string;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  level: number;
  xp: number;
  streak: number;
  isCurrentUser: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  language: string;
  xpReward: number;
  multiplier: number;
  timeLimit: number;
  completed: boolean;
  resetsAt: string;
}

export interface ChallengeHistoryEntry {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  language: string;
  xpEarned: number;
  completed: boolean;
  completedAt: string;
  timeTaken: number;
}

export interface ActivityItem {
  id: string;
  type: "lesson" | "challenge" | "achievement" | "social" | "badge" | "streak" | "xp";
  title: string;
  description: string;
  xp: number | null;
  timestamp: string;
  icon: string;
  relatedUrl?: string;
}

export interface Certificate {
  id: string;
  courseName: string;
  courseSlug: string;
  issuedAt: string;
  grade: string;
  xpTotal: number;
  downloadUrl: string;
  color: string;
}

export interface BookmarkedLesson {
  id: string;
  title: string;
  courseName: string;
  courseSlug: string;
  savedAt: string;
  notes: string;
  status: "to_review" | "completed" | "in_progress";
  difficulty: "easy" | "medium" | "hard";
}

export interface StudyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  period: "daily" | "weekly" | "monthly";
  category: "lessons" | "xp" | "challenges" | "time";
}

export interface ScheduleDay {
  day: string;
  shortDay: string;
  planned: number;
  completed: number;
  isToday: boolean;
}

export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  level: number;
  xp: number;
  streak: number;
  isFollowing: boolean;
  isFollowedBy: boolean;
  lastActive: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

export const mockUserProfile: DashboardUserProfile = {
  id: "usr_001",
  username: "juan_dev",
  displayName: "Juan Dela Cruz",
  email: "juan@aralify.com",
  avatarUrl: null,
  level: 12,
  xp: 8_450,
  xpToNextLevel: 10_000,
  streak: 14,
  longestStreak: 21,
  rank: 42,
  totalUsers: 1_312,
  dailyGoal: 500,
  dailyProgress: 350,
  coursesEnrolled: 5,
  coursesCompleted: 2,
  lessonsCompleted: 87,
  challengesCompleted: 34,
  achievementsUnlocked: 8,
  badgesEarned: 5,
  joinedAt: "2025-09-15T08:00:00Z",
  equippedBadgeIds: ["bdg_001", "bdg_002", "bdg_003", "bdg_004", "bdg_005"],
  followingCount: 6,
  followersCount: 5,
};

export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: "crs_001",
    title: "Python Fundamentals",
    slug: "python-fundamentals",
    description: "Master the basics of Python programming",
    icon: "🐍",
    color: "#3b82f6",
    progress: 72,
    totalLessons: 25,
    completedLessons: 18,
    currentLesson: "List Comprehensions",
    xpEarned: 2_400,
    lastStudied: "2026-02-09T08:30:00Z",
    status: "in_progress",
    difficulty: "beginner",
  },
  {
    id: "crs_002",
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    description: "Learn JavaScript from scratch",
    icon: "⚡",
    color: "#f59e0b",
    progress: 45,
    totalLessons: 30,
    completedLessons: 14,
    currentLesson: "Async/Await Patterns",
    xpEarned: 1_800,
    lastStudied: "2026-02-08T15:20:00Z",
    status: "in_progress",
    difficulty: "beginner",
  },
  {
    id: "crs_003",
    title: "Data Structures & Algorithms",
    slug: "data-structures-algorithms",
    description: "Essential CS fundamentals for coding interviews",
    icon: "🧮",
    color: "#8b5cf6",
    progress: 20,
    totalLessons: 40,
    completedLessons: 8,
    currentLesson: "Binary Search Trees",
    xpEarned: 1_200,
    lastStudied: "2026-02-07T10:15:00Z",
    status: "in_progress",
    difficulty: "intermediate",
  },
  {
    id: "crs_004",
    title: "HTML & CSS Basics",
    slug: "html-css-basics",
    description: "Build beautiful web pages from scratch",
    icon: "🎨",
    color: "#10b981",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    currentLesson: "Course Complete",
    xpEarned: 3_000,
    lastStudied: "2026-01-28T12:00:00Z",
    status: "completed",
    difficulty: "beginner",
  },
  {
    id: "crs_005",
    title: "Git & GitHub",
    slug: "git-github",
    description: "Version control for modern developers",
    icon: "🔀",
    color: "#ef4444",
    progress: 100,
    totalLessons: 15,
    completedLessons: 15,
    currentLesson: "Course Complete",
    xpEarned: 2_250,
    lastStudied: "2026-01-15T09:00:00Z",
    status: "completed",
    difficulty: "beginner",
  },
];

export const mockAchievements: UserAchievement[] = [
  // Unlocked (8)
  { id: "ach_001", name: "First Steps", description: "Complete your first lesson", icon: "👣", category: "learning", unlocked: true, unlockedAt: "2025-09-15T10:00:00Z", progress: 1, maxProgress: 1, xpReward: 50, rarity: "common" },
  { id: "ach_002", name: "Quick Learner", description: "Complete 10 lessons", icon: "📚", category: "learning", unlocked: true, unlockedAt: "2025-10-01T14:30:00Z", progress: 10, maxProgress: 10, xpReward: 100, rarity: "common" },
  { id: "ach_003", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", category: "streak", unlocked: true, unlockedAt: "2025-10-22T08:00:00Z", progress: 7, maxProgress: 7, xpReward: 150, rarity: "common" },
  { id: "ach_004", name: "Bug Squasher", description: "Fix 5 code challenges on first try", icon: "🐛", category: "mastery", unlocked: true, unlockedAt: "2025-11-05T16:20:00Z", progress: 5, maxProgress: 5, xpReward: 200, rarity: "rare" },
  { id: "ach_005", name: "Social Butterfly", description: "Follow 5 other learners", icon: "🦋", category: "social", unlocked: true, unlockedAt: "2025-11-10T11:00:00Z", progress: 5, maxProgress: 5, xpReward: 100, rarity: "common" },
  { id: "ach_006", name: "Course Champion", description: "Complete your first course", icon: "🏆", category: "learning", unlocked: true, unlockedAt: "2026-01-15T09:00:00Z", progress: 1, maxProgress: 1, xpReward: 500, rarity: "rare" },
  { id: "ach_007", name: "Streak Master", description: "Maintain a 14-day streak", icon: "⚡", category: "streak", unlocked: true, unlockedAt: "2026-02-05T08:00:00Z", progress: 14, maxProgress: 14, xpReward: 300, rarity: "rare" },
  { id: "ach_008", name: "Challenge Accepted", description: "Complete 25 code challenges", icon: "💪", category: "mastery", unlocked: true, unlockedAt: "2026-02-01T19:45:00Z", progress: 25, maxProgress: 25, xpReward: 250, rarity: "rare" },
  // Locked (7)
  { id: "ach_009", name: "Lesson Legend", description: "Complete 100 lessons", icon: "📖", category: "learning", unlocked: false, unlockedAt: null, progress: 87, maxProgress: 100, xpReward: 500, rarity: "epic" },
  { id: "ach_010", name: "Streak Legend", description: "Maintain a 30-day streak", icon: "🌟", category: "streak", unlocked: false, unlockedAt: null, progress: 14, maxProgress: 30, xpReward: 500, rarity: "epic" },
  { id: "ach_011", name: "Polyglot Coder", description: "Complete courses in 3 languages", icon: "🌍", category: "mastery", unlocked: false, unlockedAt: null, progress: 2, maxProgress: 3, xpReward: 400, rarity: "epic" },
  { id: "ach_012", name: "Community Leader", description: "Have 20 followers", icon: "👑", category: "social", unlocked: false, unlockedAt: null, progress: 8, maxProgress: 20, xpReward: 300, rarity: "rare" },
  { id: "ach_013", name: "Speed Demon", description: "Complete 10 challenges under time limit", icon: "⏱️", category: "mastery", unlocked: false, unlockedAt: null, progress: 6, maxProgress: 10, xpReward: 350, rarity: "epic" },
  { id: "ach_014", name: "Perfectionist", description: "Get 100% on 5 quizzes", icon: "💯", category: "mastery", unlocked: false, unlockedAt: null, progress: 3, maxProgress: 5, xpReward: 300, rarity: "rare" },
  { id: "ach_015", name: "Legendary Learner", description: "Reach Level 25", icon: "🏅", category: "special", unlocked: false, unlockedAt: null, progress: 12, maxProgress: 25, xpReward: 1000, rarity: "legendary" },
];

export const mockBadges: UserBadge[] = [
  // Earned (5)
  { id: "bdg_001", name: "Python Pioneer", description: "Started the Python course", icon: "🐍", rarity: "common", earned: true, earnedAt: "2025-09-16T10:00:00Z", hint: "Begin the Python Fundamentals course", category: "Course" },
  { id: "bdg_002", name: "Early Bird", description: "Completed a lesson before 7 AM", icon: "🌅", rarity: "rare", earned: true, earnedAt: "2025-10-05T06:45:00Z", hint: "Complete any lesson before 7:00 AM", category: "Special" },
  { id: "bdg_003", name: "HTML Hero", description: "Completed HTML & CSS course", icon: "🎨", rarity: "rare", earned: true, earnedAt: "2026-01-28T12:00:00Z", hint: "Complete the HTML & CSS Basics course", category: "Course" },
  { id: "bdg_004", name: "Git Guru", description: "Completed Git & GitHub course", icon: "🔀", rarity: "rare", earned: true, earnedAt: "2026-01-15T09:00:00Z", hint: "Complete the Git & GitHub course", category: "Course" },
  { id: "bdg_005", name: "Streak Starter", description: "Reached a 7-day streak", icon: "🔥", rarity: "common", earned: true, earnedAt: "2025-10-22T08:00:00Z", hint: "Maintain a 7-day learning streak", category: "Streak" },
  // Unearned (5)
  { id: "bdg_006", name: "JS Jedi", description: "Complete the JavaScript course", icon: "⚡", rarity: "epic", earned: false, earnedAt: null, hint: "Complete JavaScript Essentials to earn this badge", category: "Course" },
  { id: "bdg_007", name: "Algorithm Ace", description: "Complete the DSA course", icon: "🧮", rarity: "legendary", earned: false, earnedAt: null, hint: "Complete Data Structures & Algorithms", category: "Course" },
  { id: "bdg_008", name: "Night Owl", description: "Complete a lesson after midnight", icon: "🦉", rarity: "rare", earned: false, earnedAt: null, hint: "Complete any lesson between 12 AM and 4 AM", category: "Special" },
  { id: "bdg_009", name: "Streak Legend", description: "Reach a 30-day streak", icon: "💫", rarity: "epic", earned: false, earnedAt: null, hint: "Maintain a 30-day learning streak", category: "Streak" },
  { id: "bdg_010", name: "Grand Master", description: "Reach Level 25", icon: "👑", rarity: "legendary", earned: false, earnedAt: null, hint: "Reach Level 25 to claim the ultimate badge", category: "Special" },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, id: "u01", username: "maria_codes", displayName: "Maria Santos", avatarUrl: null, level: 24, xp: 28_500, streak: 45, isCurrentUser: false },
  { rank: 2, id: "u02", username: "carlo_dev", displayName: "Carlo Reyes", avatarUrl: null, level: 22, xp: 25_200, streak: 32, isCurrentUser: false },
  { rank: 3, id: "u03", username: "anna_tech", displayName: "Anna Lim", avatarUrl: null, level: 21, xp: 23_800, streak: 28, isCurrentUser: false },
  { rank: 4, id: "u04", username: "miguel_py", displayName: "Miguel Garcia", avatarUrl: null, level: 20, xp: 22_100, streak: 25, isCurrentUser: false },
  { rank: 5, id: "u05", username: "sophia_js", displayName: "Sophia Cruz", avatarUrl: null, level: 19, xp: 20_400, streak: 22, isCurrentUser: false },
  { rank: 6, id: "u06", username: "mark_algo", displayName: "Mark Rivera", avatarUrl: null, level: 18, xp: 19_000, streak: 20, isCurrentUser: false },
  { rank: 7, id: "u07", username: "jessica_ui", displayName: "Jessica Tan", avatarUrl: null, level: 17, xp: 17_500, streak: 18, isCurrentUser: false },
  { rank: 8, id: "u08", username: "kevin_sys", displayName: "Kevin Mendoza", avatarUrl: null, level: 17, xp: 16_800, streak: 15, isCurrentUser: false },
  { rank: 9, id: "u09", username: "lauren_web", displayName: "Lauren Villanueva", avatarUrl: null, level: 16, xp: 15_200, streak: 14, isCurrentUser: false },
  { rank: 10, id: "u10", username: "ryan_code", displayName: "Ryan Pascual", avatarUrl: null, level: 15, xp: 14_100, streak: 12, isCurrentUser: false },
  { rank: 11, id: "u11", username: "diana_sql", displayName: "Diana Ramos", avatarUrl: null, level: 15, xp: 13_500, streak: 11, isCurrentUser: false },
  { rank: 12, id: "u12", username: "paulo_api", displayName: "Paulo Bautista", avatarUrl: null, level: 14, xp: 12_800, streak: 10, isCurrentUser: false },
  { rank: 13, id: "u13", username: "iris_css", displayName: "Iris Gonzales", avatarUrl: null, level: 14, xp: 11_900, streak: 9, isCurrentUser: false },
  { rank: 14, id: "u14", username: "joel_git", displayName: "Joel Aquino", avatarUrl: null, level: 13, xp: 11_200, streak: 8, isCurrentUser: false },
  { rank: 15, id: "u15", username: "nina_react", displayName: "Nina Torres", avatarUrl: null, level: 13, xp: 10_500, streak: 7, isCurrentUser: false },
  { rank: 42, id: "usr_001", username: "juan_dev", displayName: "Juan Dela Cruz", avatarUrl: null, level: 12, xp: 8_450, streak: 14, isCurrentUser: true },
  { rank: 43, id: "u43", username: "chris_ml", displayName: "Chris Padilla", avatarUrl: null, level: 11, xp: 8_200, streak: 6, isCurrentUser: false },
  { rank: 44, id: "u44", username: "grace_ts", displayName: "Grace Fernandez", avatarUrl: null, level: 11, xp: 7_900, streak: 5, isCurrentUser: false },
  { rank: 45, id: "u45", username: "leo_rust", displayName: "Leo Manalo", avatarUrl: null, level: 10, xp: 7_400, streak: 4, isCurrentUser: false },
  { rank: 46, id: "u46", username: "trisha_go", displayName: "Trisha Aguilar", avatarUrl: null, level: 10, xp: 7_000, streak: 3, isCurrentUser: false },
];

export const mockDailyChallenge: DailyChallenge = {
  id: "dc_today",
  title: "Reverse a Linked List",
  description: "Write a function that reverses a singly linked list in-place. Return the new head of the list.",
  difficulty: "medium",
  language: "Python",
  xpReward: 150,
  multiplier: 2,
  timeLimit: 30,
  completed: false,
  resetsAt: "2026-02-10T00:00:00Z",
};

export const mockChallengeHistory: ChallengeHistoryEntry[] = [
  { id: "ch_001", title: "Two Sum", difficulty: "easy", language: "Python", xpEarned: 100, completed: true, completedAt: "2026-02-08T14:20:00Z", timeTaken: 12 },
  { id: "ch_002", title: "Valid Parentheses", difficulty: "easy", language: "JavaScript", xpEarned: 100, completed: true, completedAt: "2026-02-07T09:15:00Z", timeTaken: 8 },
  { id: "ch_003", title: "Merge Sorted Arrays", difficulty: "medium", language: "Python", xpEarned: 300, completed: true, completedAt: "2026-02-06T16:45:00Z", timeTaken: 22 },
  { id: "ch_004", title: "Binary Search", difficulty: "easy", language: "Python", xpEarned: 100, completed: true, completedAt: "2026-02-05T11:30:00Z", timeTaken: 6 },
  { id: "ch_005", title: "String Compression", difficulty: "medium", language: "JavaScript", xpEarned: 0, completed: false, completedAt: "2026-02-04T18:00:00Z", timeTaken: 30 },
  { id: "ch_006", title: "Palindrome Check", difficulty: "easy", language: "Python", xpEarned: 100, completed: true, completedAt: "2026-02-03T10:20:00Z", timeTaken: 5 },
  { id: "ch_007", title: "Matrix Rotation", difficulty: "hard", language: "Python", xpEarned: 450, completed: true, completedAt: "2026-02-02T20:10:00Z", timeTaken: 28 },
];

export const mockActivities: ActivityItem[] = [
  // Today
  { id: "act_001", type: "lesson", title: "Completed List Comprehensions", description: "Python Fundamentals — Lesson 18", xp: 80, timestamp: "2026-02-09T08:30:00Z", icon: "📖" },
  { id: "act_002", type: "streak", title: "14-Day Streak!", description: "You've been learning for 14 days straight", xp: 50, timestamp: "2026-02-09T08:30:00Z", icon: "🔥" },
  { id: "act_003", type: "xp", title: "Daily Goal Progress", description: "350/500 XP earned today", xp: null, timestamp: "2026-02-09T07:00:00Z", icon: "🎯" },
  // Yesterday
  { id: "act_004", type: "lesson", title: "Completed Async/Await Patterns", description: "JavaScript Essentials — Lesson 14", xp: 80, timestamp: "2026-02-08T15:20:00Z", icon: "📖" },
  { id: "act_005", type: "challenge", title: "Solved Two Sum", description: "Daily Challenge — Easy difficulty", xp: 100, timestamp: "2026-02-08T14:20:00Z", icon: "⚔️" },
  { id: "act_006", type: "achievement", title: "Unlocked Streak Master", description: "Maintained a 14-day streak", xp: 300, timestamp: "2026-02-08T08:00:00Z", icon: "🏆" },
  { id: "act_007", type: "social", title: "New Follower", description: "nina_react started following you", xp: null, timestamp: "2026-02-08T12:30:00Z", icon: "👤" },
  // This Week
  { id: "act_008", type: "lesson", title: "Completed Binary Search Trees", description: "DSA — Lesson 8", xp: 120, timestamp: "2026-02-07T10:15:00Z", icon: "📖" },
  { id: "act_009", type: "challenge", title: "Solved Valid Parentheses", description: "Daily Challenge — Easy difficulty", xp: 100, timestamp: "2026-02-07T09:15:00Z", icon: "⚔️" },
  { id: "act_010", type: "lesson", title: "Completed Hash Maps", description: "DSA — Lesson 7", xp: 120, timestamp: "2026-02-06T17:00:00Z", icon: "📖" },
  { id: "act_011", type: "challenge", title: "Solved Merge Sorted Arrays", description: "Daily Challenge — Medium difficulty", xp: 300, timestamp: "2026-02-06T16:45:00Z", icon: "⚔️" },
  { id: "act_012", type: "badge", title: "Earned Streak Master badge", description: "Maintained a 14-day learning streak", xp: 100, timestamp: "2026-02-05T08:00:00Z", icon: "🏅" },
  { id: "act_013", type: "lesson", title: "Completed Recursion Intro", description: "DSA — Lesson 6", xp: 120, timestamp: "2026-02-05T14:30:00Z", icon: "📖" },
  { id: "act_014", type: "challenge", title: "Solved Binary Search", description: "Daily Challenge — Easy difficulty", xp: 100, timestamp: "2026-02-05T11:30:00Z", icon: "⚔️" },
  { id: "act_015", type: "social", title: "Started following mark_algo", description: "You're now following Mark Rivera", xp: null, timestamp: "2026-02-04T20:00:00Z", icon: "👤" },
  { id: "act_016", type: "challenge", title: "Failed String Compression", description: "Daily Challenge — Medium difficulty", xp: 0, timestamp: "2026-02-04T18:00:00Z", icon: "⚔️" },
  { id: "act_017", type: "lesson", title: "Completed Stacks & Queues", description: "DSA — Lesson 5", xp: 120, timestamp: "2026-02-04T10:00:00Z", icon: "📖" },
  { id: "act_018", type: "lesson", title: "Completed Linked Lists", description: "DSA — Lesson 4", xp: 120, timestamp: "2026-02-03T15:20:00Z", icon: "📖" },
  { id: "act_019", type: "challenge", title: "Solved Palindrome Check", description: "Daily Challenge — Easy difficulty", xp: 100, timestamp: "2026-02-03T10:20:00Z", icon: "⚔️" },
  { id: "act_020", type: "challenge", title: "Solved Matrix Rotation", description: "Daily Challenge — Hard difficulty", xp: 450, timestamp: "2026-02-02T20:10:00Z", icon: "⚔️" },
];

export const mockCertificates: Certificate[] = [
  {
    id: "cert_001",
    courseName: "HTML & CSS Basics",
    courseSlug: "html-css-basics",
    issuedAt: "2026-01-28T12:00:00Z",
    grade: "A",
    xpTotal: 3_000,
    downloadUrl: "#",
    color: "#10b981",
  },
  {
    id: "cert_002",
    courseName: "Git & GitHub",
    courseSlug: "git-github",
    issuedAt: "2026-01-15T09:00:00Z",
    grade: "A+",
    xpTotal: 2_250,
    downloadUrl: "#",
    color: "#ef4444",
  },
];

export const mockBookmarks: BookmarkedLesson[] = [
  { id: "bk_001", title: "List Comprehensions", courseName: "Python Fundamentals", courseSlug: "python-fundamentals", savedAt: "2026-02-08T10:00:00Z", notes: "Review the nested comprehension syntax", status: "to_review", difficulty: "medium" },
  { id: "bk_002", title: "Closures & Scope", courseName: "JavaScript Essentials", courseSlug: "javascript-essentials", savedAt: "2026-02-07T14:00:00Z", notes: "Important for understanding React hooks", status: "to_review", difficulty: "hard" },
  { id: "bk_003", title: "Binary Search Trees", courseName: "Data Structures & Algorithms", courseSlug: "data-structures-algorithms", savedAt: "2026-02-06T11:00:00Z", notes: "Practice the traversal methods", status: "in_progress", difficulty: "hard" },
  { id: "bk_004", title: "CSS Grid Layout", courseName: "HTML & CSS Basics", courseSlug: "html-css-basics", savedAt: "2026-01-20T09:00:00Z", notes: "Good reference for grid templates", status: "completed", difficulty: "medium" },
  { id: "bk_005", title: "Git Branching Strategies", courseName: "Git & GitHub", courseSlug: "git-github", savedAt: "2026-01-10T16:00:00Z", notes: "Review for team collaboration", status: "completed", difficulty: "easy" },
  { id: "bk_006", title: "Decorators in Python", courseName: "Python Fundamentals", courseSlug: "python-fundamentals", savedAt: "2026-02-09T07:00:00Z", notes: "Need to understand @ syntax better", status: "to_review", difficulty: "hard" },
];

export const mockStudyGoals: StudyGoal[] = [
  { id: "sg_001", title: "Complete lessons", target: 5, current: 3, unit: "lessons", period: "weekly", category: "lessons" },
  { id: "sg_002", title: "Earn XP", target: 3_000, current: 1_850, unit: "XP", period: "weekly", category: "xp" },
  { id: "sg_003", title: "Solve challenges", target: 7, current: 5, unit: "challenges", period: "weekly", category: "challenges" },
  { id: "sg_004", title: "Study time", target: 10, current: 6.5, unit: "hours", period: "weekly", category: "time" },
];

export const mockSchedule: ScheduleDay[] = [
  { day: "Monday", shortDay: "Mon", planned: 3, completed: 3, isToday: false },
  { day: "Tuesday", shortDay: "Tue", planned: 2, completed: 2, isToday: false },
  { day: "Wednesday", shortDay: "Wed", planned: 3, completed: 3, isToday: false },
  { day: "Thursday", shortDay: "Thu", planned: 2, completed: 1, isToday: false },
  { day: "Friday", shortDay: "Fri", planned: 3, completed: 2, isToday: false },
  { day: "Saturday", shortDay: "Sat", planned: 1, completed: 0, isToday: false },
  { day: "Sunday", shortDay: "Sun", planned: 1, completed: 1, isToday: true },
];

export const mockFriends: Friend[] = [
  { id: "u03", username: "anna_tech", displayName: "Anna Lim", avatarUrl: null, level: 21, xp: 23_800, streak: 28, isFollowing: true, isFollowedBy: true, lastActive: "2026-02-09T09:00:00Z" },
  { id: "u05", username: "sophia_js", displayName: "Sophia Cruz", avatarUrl: null, level: 19, xp: 20_400, streak: 22, isFollowing: true, isFollowedBy: true, lastActive: "2026-02-09T08:30:00Z" },
  { id: "u06", username: "mark_algo", displayName: "Mark Rivera", avatarUrl: null, level: 18, xp: 19_000, streak: 20, isFollowing: true, isFollowedBy: false, lastActive: "2026-02-08T22:00:00Z" },
  { id: "u09", username: "lauren_web", displayName: "Lauren Villanueva", avatarUrl: null, level: 16, xp: 15_200, streak: 14, isFollowing: true, isFollowedBy: true, lastActive: "2026-02-09T07:00:00Z" },
  { id: "u15", username: "nina_react", displayName: "Nina Torres", avatarUrl: null, level: 13, xp: 10_500, streak: 7, isFollowing: false, isFollowedBy: true, lastActive: "2026-02-08T18:00:00Z" },
  { id: "u12", username: "paulo_api", displayName: "Paulo Bautista", avatarUrl: null, level: 14, xp: 12_800, streak: 10, isFollowing: true, isFollowedBy: false, lastActive: "2026-02-07T15:00:00Z" },
  { id: "u13", username: "iris_css", displayName: "Iris Gonzales", avatarUrl: null, level: 14, xp: 11_900, streak: 9, isFollowing: false, isFollowedBy: true, lastActive: "2026-02-08T20:00:00Z" },
  { id: "u02", username: "carlo_dev", displayName: "Carlo Reyes", avatarUrl: null, level: 22, xp: 25_200, streak: 32, isFollowing: true, isFollowedBy: true, lastActive: "2026-02-09T10:00:00Z" },
  { id: "u43", username: "chris_ml", displayName: "Chris Padilla", avatarUrl: null, level: 11, xp: 8_200, streak: 6, isFollowing: false, isFollowedBy: false, lastActive: "2026-02-06T12:00:00Z" },
  { id: "u44", username: "grace_ts", displayName: "Grace Fernandez", avatarUrl: null, level: 11, xp: 7_900, streak: 5, isFollowing: false, isFollowedBy: false, lastActive: "2026-02-05T09:00:00Z" },
];

// ─── Chart Data ─────────────────────────────────────────────────────────────

export const mockXpHistory7d: ChartDataPoint[] = [
  { name: "Mon", value: 420 },
  { name: "Tue", value: 380 },
  { name: "Wed", value: 520 },
  { name: "Thu", value: 290 },
  { name: "Fri", value: 480 },
  { name: "Sat", value: 150 },
  { name: "Sun", value: 350 },
];

export const mockXpHistory30d: ChartDataPoint[] = [
  { name: "W1", value: 2_100 },
  { name: "W2", value: 2_450 },
  { name: "W3", value: 1_800 },
  { name: "W4", value: 2_590 },
];

export const mockWeeklyHeatmap = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data: { day: string; hour: number; value: number }[] = [];
  days.forEach((day) => {
    for (let h = 0; h < 24; h++) {
      let base = 0;
      if (h >= 7 && h <= 9) base = 40 + Math.floor(Math.random() * 30);
      else if (h >= 10 && h <= 12) base = 20 + Math.floor(Math.random() * 25);
      else if (h >= 13 && h <= 17) base = 30 + Math.floor(Math.random() * 40);
      else if (h >= 18 && h <= 22) base = 50 + Math.floor(Math.random() * 50);
      else base = Math.floor(Math.random() * 10);
      if (day === "Sat" || day === "Sun") base = Math.floor(base * 0.5);
      data.push({ day, hour: h, value: base });
    }
  });
  return data;
})();

export const mockCourseRadar: ChartDataPoint[] = [
  { name: "Python", value: 72 },
  { name: "JavaScript", value: 45 },
  { name: "DSA", value: 20 },
  { name: "HTML/CSS", value: 100 },
  { name: "Git", value: 100 },
];

export const mockDifficultyBreakdown: ChartDataPoint[] = [
  { name: "Easy", value: 55 },
  { name: "Medium", value: 30 },
  { name: "Hard", value: 15 },
];

export const mockTimeSpent: ChartDataPoint[] = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 30 },
  { name: "Fri", value: 55 },
  { name: "Sat", value: 20 },
  { name: "Sun", value: 40 },
];

// ─── Recommended Courses (not enrolled) ─────────────────────────────────────

export const mockRecommendedCourses = [
  { id: "rec_001", title: "React & Next.js", icon: "⚛️", color: "#06b6d4", difficulty: "intermediate", lessonsCount: 35, enrolledCount: 845 },
  { id: "rec_002", title: "SQL & Databases", icon: "🗄️", color: "#8b5cf6", difficulty: "beginner", lessonsCount: 20, enrolledCount: 1_120 },
  { id: "rec_003", title: "TypeScript Mastery", icon: "🔷", color: "#3b82f6", difficulty: "intermediate", lessonsCount: 28, enrolledCount: 672 },
];

// ─── Streak Data ────────────────────────────────────────────────────────────

export const mockWeekStreak = [
  { day: "Mon", completed: true },
  { day: "Tue", completed: true },
  { day: "Wed", completed: true },
  { day: "Thu", completed: true },
  { day: "Fri", completed: true },
  { day: "Sat", completed: true },
  { day: "Sun", completed: false },
];

// ─── Title System ────────────────────────────────────────────────────────────

const TITLES_EN: Record<number, string> = {
  1: "Apprentice",
  5: "Code Cadet",
  10: "Code Warrior",
  15: "Debugger",
  20: "Architect",
  25: "Grand Master",
};

const TITLES_FIL: Record<number, string> = {
  1: "Baguhan",
  5: "Kadete ng Code",
  10: "Mandirigma ng Code",
  15: "Tagapag-ayos",
  20: "Arkitekto",
  25: "Dakilang Maestro",
};

export function getUserTitle(level: number, locale: "en" | "fil" = "en"): string {
  const titles = locale === "fil" ? TITLES_FIL : TITLES_EN;
  const thresholds = Object.keys(titles).map(Number).sort((a, b) => b - a);
  for (const threshold of thresholds) {
    if (level >= threshold) return titles[threshold];
  }
  return locale === "fil" ? "Baguhan" : "Apprentice";
}
