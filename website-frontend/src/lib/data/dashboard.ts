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

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: "daily" | "weekly" | "practice";
  language: string;
  xpReward: number;
  timeLimit: number;
  tags: string[];
  completions: number;
  successRate: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ChallengeDetail {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: "daily" | "weekly" | "practice";
  language: string;
  xpReward: number;
  timeLimit: number;
  tags: string[];
  instructions: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  constraints: string[];
  examples: { input: string; output: string; explanation?: string }[];
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

export interface QuestMission {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly";
  xpReward: number;
  progress: number;
  maxProgress: number;
  icon: string;
  completed: boolean;
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

export const mockChallenges: ChallengeItem[] = [
  // Daily
  { id: "chal_001", title: "Reverse a Linked List", description: "Write a function that reverses a singly linked list in-place.", difficulty: "medium", category: "daily", language: "Python", xpReward: 150, timeLimit: 30, tags: ["Linked List", "Pointers"], completions: 1_240, successRate: 68, isFeatured: true },
  // Weekly
  { id: "chal_002", title: "Build a Mini Calculator", description: "Implement a stack-based calculator that handles +, -, *, / with proper operator precedence.", difficulty: "hard", category: "weekly", language: "Python", xpReward: 500, timeLimit: 60, tags: ["Stack", "Parsing", "Math"], completions: 340, successRate: 42, isNew: true },
  { id: "chal_003", title: "URL Shortener Logic", description: "Design the encoding/decoding logic for a URL shortener using base62.", difficulty: "medium", category: "weekly", language: "JavaScript", xpReward: 350, timeLimit: 45, tags: ["Hashing", "Design"], completions: 580, successRate: 55 },
  // Practice — Easy
  { id: "chal_004", title: "FizzBuzz", description: "Print numbers 1-100, replacing multiples of 3 with 'Fizz', 5 with 'Buzz', both with 'FizzBuzz'.", difficulty: "easy", category: "practice", language: "Python", xpReward: 50, timeLimit: 10, tags: ["Loops", "Conditionals"], completions: 5_800, successRate: 95 },
  { id: "chal_005", title: "Palindrome String", description: "Check if a given string reads the same forwards and backwards (ignoring case & spaces).", difficulty: "easy", category: "practice", language: "JavaScript", xpReward: 50, timeLimit: 10, tags: ["Strings"], completions: 4_200, successRate: 91 },
  { id: "chal_006", title: "Count Vowels", description: "Return the count of vowels in a string.", difficulty: "easy", category: "practice", language: "Python", xpReward: 30, timeLimit: 5, tags: ["Strings", "Loops"], completions: 6_100, successRate: 97 },
  // Practice — Medium
  { id: "chal_007", title: "Anagram Grouper", description: "Given a list of words, group anagrams together and return them as nested arrays.", difficulty: "medium", category: "practice", language: "Python", xpReward: 200, timeLimit: 25, tags: ["Hash Map", "Sorting"], completions: 1_800, successRate: 62 },
  { id: "chal_008", title: "Flatten Nested Arrays", description: "Write a function that deeply flattens a nested array of arbitrary depth.", difficulty: "medium", category: "practice", language: "JavaScript", xpReward: 150, timeLimit: 20, tags: ["Recursion", "Arrays"], completions: 2_300, successRate: 71 },
  { id: "chal_009", title: "Debounce Function", description: "Implement a debounce utility function from scratch.", difficulty: "medium", category: "practice", language: "JavaScript", xpReward: 200, timeLimit: 20, tags: ["Closures", "Timers"], completions: 1_500, successRate: 58, isNew: true },
  // Practice — Hard
  { id: "chal_010", title: "LRU Cache", description: "Implement a Least Recently Used cache with O(1) get and put operations.", difficulty: "hard", category: "practice", language: "Python", xpReward: 400, timeLimit: 45, tags: ["Hash Map", "Doubly Linked List"], completions: 620, successRate: 35 },
  { id: "chal_011", title: "Serialize Binary Tree", description: "Serialize and deserialize a binary tree to/from a string.", difficulty: "hard", category: "practice", language: "Python", xpReward: 450, timeLimit: 50, tags: ["Trees", "BFS/DFS"], completions: 410, successRate: 30 },
  { id: "chal_012", title: "Rate Limiter", description: "Implement a sliding window rate limiter that allows N requests per time window.", difficulty: "hard", category: "practice", language: "JavaScript", xpReward: 400, timeLimit: 40, tags: ["Design", "Queue"], completions: 380, successRate: 38 },
];

export const mockChallengeDetails: Record<string, ChallengeDetail> = {
  chal_001: {
    id: "chal_001",
    title: "Reverse a Linked List",
    difficulty: "medium",
    category: "daily",
    language: "Python",
    xpReward: 150,
    timeLimit: 30,
    tags: ["Linked List", "Pointers"],
    instructions: `# Reverse a Linked List

Given the head of a singly linked list, reverse the list and return the reversed list's head.

## Description

You are given a singly linked list where each node contains a value and a pointer to the next node. Your task is to reverse the list **in-place** — meaning you should not create a new list, but instead rearrange the existing node pointers.

## Input

- \`head\` — the head node of a singly linked list (can be \`None\` for an empty list)

## Output

- Return the new head of the reversed list

## Approach

Think about maintaining three pointers as you traverse the list:
- **prev**: the previous node (starts as \`None\`)
- **curr**: the current node being processed
- **next_node**: temporary storage for the next node before we break the link`,
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head: ListNode) -> ListNode:
    # Your code here
    pass`,
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expectedOutput: "[5, 4, 3, 2, 1]", description: "Reverse a 5-element list", passed: false },
      { input: "[1, 2]", expectedOutput: "[2, 1]", description: "Reverse a 2-element list", passed: false },
      { input: "[1]", expectedOutput: "[1]", description: "Single element list", passed: false },
      { input: "[]", expectedOutput: "[]", description: "Empty list", passed: false },
    ],
    hints: [
      "Start with `prev = None` and `curr = head`. In each step, save `curr.next`, then point `curr.next` to `prev`.",
      "After updating pointers, move both `prev` and `curr` one step forward. When `curr` becomes `None`, `prev` is the new head.",
      "The iterative approach runs in O(n) time and O(1) space — no recursion needed.",
    ],
    constraints: [
      "The number of nodes is in the range [0, 5000]",
      "Node values are in the range [-5000, 5000]",
      "You must reverse the list in-place",
    ],
    examples: [
      { input: "head = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]", explanation: "Each node's next pointer is reversed." },
      { input: "head = [1, 2]", output: "[2, 1]" },
      { input: "head = []", output: "[]", explanation: "Empty list remains empty." },
    ],
  },
  chal_004: {
    id: "chal_004",
    title: "FizzBuzz",
    difficulty: "easy",
    category: "practice",
    language: "Python",
    xpReward: 50,
    timeLimit: 10,
    tags: ["Loops", "Conditionals"],
    instructions: `# FizzBuzz

Write a function that prints numbers from 1 to n with the following rules:

## Rules

- For multiples of **3**, print \`"Fizz"\` instead of the number
- For multiples of **5**, print \`"Buzz"\` instead of the number
- For multiples of **both 3 and 5**, print \`"FizzBuzz"\`
- For all other numbers, print the number itself

## Input

- \`n\` — a positive integer

## Output

- Return a list of strings representing the FizzBuzz sequence from 1 to n`,
    starterCode: `def fizzbuzz(n: int) -> list[str]:
    # Your code here
    result = []

    return result`,
    testCases: [
      { input: "fizzbuzz(15)", expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', description: "Classic FizzBuzz up to 15", passed: false },
      { input: "fizzbuzz(3)", expectedOutput: '["1","2","Fizz"]', description: "Up to 3", passed: false },
      { input: "fizzbuzz(5)", expectedOutput: '["1","2","Fizz","4","Buzz"]', description: "Up to 5", passed: false },
      { input: "fizzbuzz(1)", expectedOutput: '["1"]', description: "Single element", passed: false },
    ],
    hints: [
      "Check for divisibility by both 3 AND 5 first (i.e. divisible by 15), before checking 3 or 5 individually.",
      "Use the modulo operator `%` to check divisibility. `n % 3 == 0` means n is divisible by 3.",
      "You can also use `divmod()` or check `not n % 3` as a Pythonic shorthand.",
    ],
    constraints: [
      "1 <= n <= 10,000",
      "Return a list of strings, not integers",
    ],
    examples: [
      { input: "n = 5", output: '["1", "2", "Fizz", "4", "Buzz"]', explanation: "3 is divisible by 3 -> Fizz. 5 is divisible by 5 -> Buzz." },
      { input: "n = 15", output: '["1", "2", "Fizz", ... "FizzBuzz"]', explanation: "15 is divisible by both 3 and 5 -> FizzBuzz." },
    ],
  },
  chal_010: {
    id: "chal_010",
    title: "LRU Cache",
    difficulty: "hard",
    category: "practice",
    language: "Python",
    xpReward: 400,
    timeLimit: 45,
    tags: ["Hash Map", "Doubly Linked List"],
    instructions: `# LRU Cache

Design and implement a data structure for a **Least Recently Used (LRU) cache**.

## Requirements

Implement the \`LRUCache\` class:

- \`LRUCache(capacity)\` — Initialize the cache with a positive capacity
- \`get(key)\` — Return the value if the key exists, otherwise return \`-1\`
- \`put(key, value)\` — Update or insert the value. If the cache exceeds capacity, evict the **least recently used** key

## Constraints

Both \`get\` and \`put\` must run in **O(1)** average time complexity.

## Approach

Use a combination of:
- A **hash map** for O(1) key lookup
- A **doubly linked list** for O(1) insertion/deletion to track usage order`,
    starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        # Your code here
        pass

    def get(self, key: int) -> int:
        # Your code here
        pass

    def put(self, key: int, value: int) -> None:
        # Your code here
        pass`,
    testCases: [
      { input: "cache = LRUCache(2); cache.put(1,1); cache.put(2,2); cache.get(1)", expectedOutput: "1", description: "Basic get after put", passed: false },
      { input: "cache.put(3,3); cache.get(2)", expectedOutput: "-1", description: "Evicts key 2 (LRU)", passed: false },
      { input: "cache.put(4,4); cache.get(1)", expectedOutput: "-1", description: "Evicts key 1 (LRU)", passed: false },
      { input: "cache.get(3)", expectedOutput: "3", description: "Key 3 still exists", passed: false },
      { input: "cache.get(4)", expectedOutput: "4", description: "Key 4 still exists", passed: false },
    ],
    hints: [
      "Use `collections.OrderedDict` for a simpler Python solution — it maintains insertion order and supports `move_to_end()`.",
      "For the classic approach: use a dict + doubly linked list. The dict maps keys to list nodes, and the list tracks usage order.",
      "When accessing a key (get or put), move it to the head of the list. When evicting, remove from the tail.",
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10,000",
      "0 <= value <= 100,000",
      "At most 200,000 calls to get and put",
      "Both get and put must be O(1) average time",
    ],
    examples: [
      { input: "LRUCache(2) -> put(1,1) -> put(2,2) -> get(1)", output: "1", explanation: "Key 1 exists, returns 1. Also marks key 1 as recently used." },
      { input: "put(3,3) -> get(2)", output: "-1", explanation: "Key 2 was evicted because it was least recently used when key 3 was added." },
    ],
  },
};

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

export const mockQuests: QuestMission[] = [
  { id: "qst_001", title: "Complete 3 Lessons", description: "Finish any 3 lessons today", type: "daily", xpReward: 150, progress: 2, maxProgress: 3, icon: "📖", completed: false },
  { id: "qst_002", title: "Earn 500 XP", description: "Earn a total of 500 XP today", type: "daily", xpReward: 100, progress: 350, maxProgress: 500, icon: "⚡", completed: false },
  { id: "qst_003", title: "Solve a Challenge", description: "Complete any coding challenge", type: "daily", xpReward: 75, progress: 1, maxProgress: 1, icon: "⚔️", completed: true },
  { id: "qst_004", title: "7-Day Streak", description: "Maintain a 7-day learning streak", type: "weekly", xpReward: 500, progress: 7, maxProgress: 7, icon: "🔥", completed: true },
  { id: "qst_005", title: "Finish a Course Level", description: "Complete all lessons in any level", type: "weekly", xpReward: 300, progress: 4, maxProgress: 8, icon: "🏆", completed: false },
  { id: "qst_006", title: "Help 3 Learners", description: "Answer questions in the community", type: "weekly", xpReward: 200, progress: 1, maxProgress: 3, icon: "🤝", completed: false },
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

export interface DiscoverCourse {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  lessonsCount: number;
  enrolledCount: number;
  rating: number;
  estimatedHours: number;
  tags: string[];
}

export const mockRecommendedCourses = [
  { id: "rec_001", title: "React & Next.js", icon: "⚛️", color: "#06b6d4", difficulty: "intermediate", lessonsCount: 35, enrolledCount: 845 },
  { id: "rec_002", title: "SQL & Databases", icon: "🗄️", color: "#8b5cf6", difficulty: "beginner", lessonsCount: 20, enrolledCount: 1_120 },
  { id: "rec_003", title: "TypeScript Mastery", icon: "🔷", color: "#3b82f6", difficulty: "intermediate", lessonsCount: 28, enrolledCount: 672 },
];

export const mockDiscoverCourses: DiscoverCourse[] = [
  { id: "disc_001", title: "React & Next.js", description: "Build modern web apps with React and the Next.js framework", icon: "⚛️", color: "#06b6d4", difficulty: "intermediate", lessonsCount: 35, enrolledCount: 845, rating: 4.8, estimatedHours: 18, tags: ["Frontend", "React"] },
  { id: "disc_002", title: "SQL & Databases", description: "Master relational databases, queries, and data modeling", icon: "🗄️", color: "#8b5cf6", difficulty: "beginner", lessonsCount: 20, enrolledCount: 1_120, rating: 4.7, estimatedHours: 10, tags: ["Backend", "Database"] },
  { id: "disc_003", title: "TypeScript Mastery", description: "Level up your JavaScript with static typing and advanced patterns", icon: "🔷", color: "#3b82f6", difficulty: "intermediate", lessonsCount: 28, enrolledCount: 672, rating: 4.9, estimatedHours: 14, tags: ["Frontend", "TypeScript"] },
  { id: "disc_004", title: "Intro to Machine Learning", description: "Learn the fundamentals of ML, from regression to neural networks", icon: "🧠", color: "#ec4899", difficulty: "advanced", lessonsCount: 32, enrolledCount: 410, rating: 4.6, estimatedHours: 22, tags: ["Data Science", "AI"] },
  { id: "disc_005", title: "Git & GitHub", description: "Version control essentials every developer needs to know", icon: "🌿", color: "#22c55e", difficulty: "beginner", lessonsCount: 12, enrolledCount: 2_340, rating: 4.9, estimatedHours: 5, tags: ["Tools", "DevOps"] },
  { id: "disc_006", title: "Node.js Backend", description: "Build scalable server-side applications with Node.js and Express", icon: "🟢", color: "#16a34a", difficulty: "intermediate", lessonsCount: 30, enrolledCount: 780, rating: 4.7, estimatedHours: 16, tags: ["Backend", "Node.js"] },
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

// 28-day streak calendar with XP intensity levels
export const mockStreakCalendar: { date: string; xp: number }[] = (() => {
  const days: { date: string; xp: number }[] = [];
  const today = new Date();
  const xpValues = [
    420, 310, 0, 180, 500, 250, 90,
    0, 380, 460, 220, 150, 0, 340,
    280, 510, 390, 0, 200, 470, 120,
    350, 440, 300, 180, 260, 480, 0,
  ];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().slice(0, 10),
      xp: xpValues[27 - i],
    });
  }
  return days;
})();

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

// ─── Course Detail Types ────────────────────────────────────────────────────

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
  passed: boolean;
}

export interface DifficultyTier {
  difficulty: "easy" | "medium" | "hard";
  xpMultiplier: number;
  starterCode: string;
  description: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  order: number;
  status: "locked" | "available" | "completed";
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  duration: string;
}

export interface CourseLevel {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  xpEarned: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  instructor: string;
  estimatedHours: number;
  language: string;
  levels: CourseLevel[];
}

export interface LessonDetail {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  order: number;
  instructions: string;
  language: string;
  tiers: DifficultyTier[];
  testCases: TestCase[];
  hints: string[];
  xpReward: number;
  prevLessonId: string | null;
  nextLessonId: string | null;
}

// ─── Mock Course Details ────────────────────────────────────────────────────

export const mockCourseDetails: Record<string, CourseDetail> = {
  crs_001: {
    id: "crs_001",
    title: "Python Fundamentals",
    slug: "python-fundamentals",
    description: "Master the basics of Python programming — from variables to data structures. Build a solid foundation for your coding journey.",
    icon: "🐍",
    color: "#3b82f6",
    progress: 72,
    totalLessons: 15,
    completedLessons: 11,
    xpEarned: 2_400,
    difficulty: "beginner",
    instructor: "Maria Santos",
    estimatedHours: 10,
    language: "Python",
    levels: [
      {
        id: "lvl_001",
        title: "Getting Started",
        order: 1,
        lessons: [
          { id: "les_001", title: "Hello World", order: 1, status: "completed", difficulty: "easy", xpReward: 40, duration: "10 min" },
          { id: "les_002", title: "Variables & Assignment", order: 2, status: "completed", difficulty: "easy", xpReward: 40, duration: "15 min" },
          { id: "les_003", title: "Data Types", order: 3, status: "completed", difficulty: "easy", xpReward: 50, duration: "15 min" },
          { id: "les_004", title: "Operators", order: 4, status: "completed", difficulty: "easy", xpReward: 50, duration: "12 min" },
          { id: "les_005", title: "Input & Output", order: 5, status: "completed", difficulty: "easy", xpReward: 50, duration: "12 min" },
        ],
      },
      {
        id: "lvl_002",
        title: "Control Flow",
        order: 2,
        lessons: [
          { id: "les_006", title: "If / Else Statements", order: 1, status: "completed", difficulty: "easy", xpReward: 60, duration: "15 min" },
          { id: "les_007", title: "For Loops", order: 2, status: "completed", difficulty: "medium", xpReward: 80, duration: "20 min" },
          { id: "les_008", title: "While Loops", order: 3, status: "completed", difficulty: "medium", xpReward: 80, duration: "18 min" },
          { id: "les_009", title: "Functions", order: 4, status: "completed", difficulty: "medium", xpReward: 100, duration: "25 min" },
          { id: "les_010", title: "Return Values", order: 5, status: "completed", difficulty: "medium", xpReward: 100, duration: "20 min" },
        ],
      },
      {
        id: "lvl_003",
        title: "Data Structures",
        order: 3,
        lessons: [
          { id: "les_011", title: "Lists", order: 1, status: "completed", difficulty: "medium", xpReward: 100, duration: "20 min" },
          { id: "les_012", title: "Tuples", order: 2, status: "available", difficulty: "medium", xpReward: 100, duration: "15 min" },
          { id: "les_013", title: "Dictionaries", order: 3, status: "locked", difficulty: "medium", xpReward: 120, duration: "25 min" },
          { id: "les_014", title: "Sets", order: 4, status: "locked", difficulty: "hard", xpReward: 120, duration: "20 min" },
          { id: "les_015", title: "List Comprehensions", order: 5, status: "locked", difficulty: "hard", xpReward: 150, duration: "25 min" },
        ],
      },
    ],
  },
  crs_002: {
    id: "crs_002",
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    description: "Learn JavaScript from scratch — DOM manipulation, async programming, and modern ES6+ features.",
    icon: "⚡",
    color: "#f59e0b",
    progress: 45,
    totalLessons: 15,
    completedLessons: 7,
    xpEarned: 1_800,
    difficulty: "beginner",
    instructor: "Carlo Reyes",
    estimatedHours: 12,
    language: "JavaScript",
    levels: [
      {
        id: "lvl_004",
        title: "JS Basics",
        order: 1,
        lessons: [
          { id: "les_016", title: "Hello JavaScript", order: 1, status: "completed", difficulty: "easy", xpReward: 40, duration: "10 min" },
          { id: "les_017", title: "Variables (let, const, var)", order: 2, status: "completed", difficulty: "easy", xpReward: 50, duration: "15 min" },
          { id: "les_018", title: "Data Types & Coercion", order: 3, status: "completed", difficulty: "easy", xpReward: 50, duration: "15 min" },
          { id: "les_019", title: "Operators & Expressions", order: 4, status: "completed", difficulty: "easy", xpReward: 50, duration: "12 min" },
          { id: "les_020", title: "Template Literals", order: 5, status: "completed", difficulty: "easy", xpReward: 40, duration: "10 min" },
        ],
      },
      {
        id: "lvl_005",
        title: "Functions & Scope",
        order: 2,
        lessons: [
          { id: "les_021", title: "Function Declarations", order: 1, status: "completed", difficulty: "medium", xpReward: 80, duration: "20 min" },
          { id: "les_022", title: "Arrow Functions", order: 2, status: "completed", difficulty: "medium", xpReward: 80, duration: "15 min" },
          { id: "les_023", title: "Closures & Scope", order: 3, status: "available", difficulty: "hard", xpReward: 120, duration: "25 min" },
          { id: "les_024", title: "Callbacks", order: 4, status: "locked", difficulty: "medium", xpReward: 100, duration: "20 min" },
          { id: "les_025", title: "Higher-Order Functions", order: 5, status: "locked", difficulty: "hard", xpReward: 120, duration: "25 min" },
        ],
      },
      {
        id: "lvl_006",
        title: "Async JavaScript",
        order: 3,
        lessons: [
          { id: "les_026", title: "Promises", order: 1, status: "locked", difficulty: "medium", xpReward: 100, duration: "20 min" },
          { id: "les_027", title: "Async / Await", order: 2, status: "locked", difficulty: "medium", xpReward: 100, duration: "20 min" },
          { id: "les_028", title: "Fetch API", order: 3, status: "locked", difficulty: "medium", xpReward: 100, duration: "25 min" },
          { id: "les_029", title: "Error Handling", order: 4, status: "locked", difficulty: "hard", xpReward: 120, duration: "20 min" },
          { id: "les_030", title: "Async Patterns", order: 5, status: "locked", difficulty: "hard", xpReward: 150, duration: "30 min" },
        ],
      },
    ],
  },
  crs_003: {
    id: "crs_003",
    title: "Data Structures & Algorithms",
    slug: "data-structures-algorithms",
    description: "Essential CS fundamentals for coding interviews — arrays, trees, graphs, sorting, and dynamic programming.",
    icon: "🧮",
    color: "#8b5cf6",
    progress: 20,
    totalLessons: 15,
    completedLessons: 3,
    xpEarned: 1_200,
    difficulty: "intermediate",
    instructor: "Mark Rivera",
    estimatedHours: 20,
    language: "Python",
    levels: [
      {
        id: "lvl_007",
        title: "Arrays & Strings",
        order: 1,
        lessons: [
          { id: "les_031", title: "Array Basics", order: 1, status: "completed", difficulty: "easy", xpReward: 60, duration: "15 min" },
          { id: "les_032", title: "Two Pointer Technique", order: 2, status: "completed", difficulty: "medium", xpReward: 100, duration: "25 min" },
          { id: "les_033", title: "Sliding Window", order: 3, status: "completed", difficulty: "medium", xpReward: 100, duration: "25 min" },
          { id: "les_034", title: "String Manipulation", order: 4, status: "available", difficulty: "medium", xpReward: 100, duration: "20 min" },
          { id: "les_035", title: "Hash Maps", order: 5, status: "locked", difficulty: "medium", xpReward: 120, duration: "25 min" },
        ],
      },
      {
        id: "lvl_008",
        title: "Linked Lists & Stacks",
        order: 2,
        lessons: [
          { id: "les_036", title: "Singly Linked Lists", order: 1, status: "locked", difficulty: "medium", xpReward: 100, duration: "25 min" },
          { id: "les_037", title: "Doubly Linked Lists", order: 2, status: "locked", difficulty: "hard", xpReward: 120, duration: "25 min" },
          { id: "les_038", title: "Stacks", order: 3, status: "locked", difficulty: "medium", xpReward: 100, duration: "20 min" },
          { id: "les_039", title: "Queues", order: 4, status: "locked", difficulty: "medium", xpReward: 100, duration: "20 min" },
          { id: "les_040", title: "Stack Applications", order: 5, status: "locked", difficulty: "hard", xpReward: 150, duration: "30 min" },
        ],
      },
      {
        id: "lvl_009",
        title: "Trees & Graphs",
        order: 3,
        lessons: [
          { id: "les_041", title: "Binary Trees", order: 1, status: "locked", difficulty: "medium", xpReward: 120, duration: "25 min" },
          { id: "les_042", title: "Binary Search Trees", order: 2, status: "locked", difficulty: "hard", xpReward: 150, duration: "30 min" },
          { id: "les_043", title: "Tree Traversals", order: 3, status: "locked", difficulty: "hard", xpReward: 150, duration: "30 min" },
          { id: "les_044", title: "Graph Basics", order: 4, status: "locked", difficulty: "hard", xpReward: 150, duration: "30 min" },
          { id: "les_045", title: "BFS & DFS", order: 5, status: "locked", difficulty: "hard", xpReward: 180, duration: "35 min" },
        ],
      },
    ],
  },
};

// ─── Mock Lesson Details ────────────────────────────────────────────────────

export const mockLessonDetails: Record<string, LessonDetail> = {
  // ── Python Fundamentals: Level 1 ──────────────────────────────────────
  les_001: {
    id: "les_001",
    title: "Hello World",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 1,
    language: "Python",
    instructions: `# Hello World

Welcome to Python! In this first lesson, you'll write your very first program — the classic **Hello World**.

## The print() Function

In Python, \`print()\` outputs text to the console:

\`\`\`python
print("Hello, World!")
\`\`\`

You can print multiple values separated by commas:

\`\`\`python
print("My name is", "Juan")
# Output: My name is Juan
\`\`\`

## String Basics

Strings are text wrapped in quotes — single \`'\` or double \`"\`:

\`\`\`python
greeting = "Kamusta"
print(greeting)
\`\`\`

## Your Task

Write a program that prints \`Hello, Aralify!\` to the console.`,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `# Print "Hello, Aralify!" below\nprint()`,
        description: "Just fill in the print statement with the correct string.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `# Store the greeting in a variable, then print it\ngreeting = ___\nprint(greeting)`,
        description: "Use a variable to store the greeting before printing.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `# Print "Hello, Aralify!" using string concatenation\n# You must use at least 2 separate strings joined with +\npass`,
        description: "Build the greeting by concatenating multiple strings together.",
      },
    ],
    testCases: [
      { input: "run program", expectedOutput: "Hello, Aralify!", description: "Prints correct greeting", passed: true },
      { input: "check output type", expectedOutput: "str", description: "Output is a string", passed: true },
    ],
    hints: [
      "Put text inside the parentheses of `print()` — don't forget the quotes!",
      "Strings can be joined with `+`: `\"Hello\" + \", \" + \"World\"`",
    ],
    xpReward: 40,
    prevLessonId: null,
    nextLessonId: "les_002",
  },
  les_002: {
    id: "les_002",
    title: "Variables & Assignment",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 2,
    language: "Python",
    instructions: `# Variables & Assignment

Variables store data that you can use and change throughout your program.

## Creating Variables

Python doesn't need a keyword like \`let\` or \`var\` — just assign a value:

\`\`\`python
name = "Juan"
age = 20
is_student = True
\`\`\`

## Naming Rules

- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive (\`name\` ≠ \`Name\`)
- Use **snake_case** by convention

## Reassignment

Variables can be updated at any time:

\`\`\`python
score = 0
score = score + 10  # now 10
score += 5          # now 15
\`\`\`

## Your Task

Create variables for a student profile: \`name\` (string), \`age\` (int), and \`gpa\` (float). Print them in the format: \`"Name: Juan, Age: 20, GPA: 3.5"\``,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `name = "Juan"\nage = 20\ngpa = 3.5\n\n# Print the profile using comma-separated print\nprint("Name:", name, "Age:", age, "GPA:", gpa)`,
        description: "Variables are pre-defined — just fix the print statement.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `# Create the three variables and use an f-string to print\npass`,
        description: "Create the variables yourself and use an f-string for formatted output.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `# Create a function that takes name, age, gpa and returns\n# the formatted string. Then call it and print the result.\ndef format_profile(name, age, gpa):\n    pass`,
        description: "Write a function that returns the formatted profile string.",
      },
    ],
    testCases: [
      { input: "check name", expectedOutput: "Juan", description: "name variable exists", passed: true },
      { input: "check age type", expectedOutput: "int", description: "age is an integer", passed: true },
      { input: "check gpa type", expectedOutput: "float", description: "gpa is a float", passed: true },
    ],
    hints: [
      "f-strings let you embed variables: `f\"Name: {name}\"`",
      "Make sure `age` is a number (no quotes), not a string.",
    ],
    xpReward: 40,
    prevLessonId: "les_001",
    nextLessonId: "les_003",
  },
  les_003: {
    id: "les_003",
    title: "Data Types",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 3,
    language: "Python",
    instructions: `# Data Types

Every value in Python has a type. The main built-in types are:

## Common Types

| Type | Example | Description |
|------|---------|-------------|
| \`int\` | \`42\` | Whole numbers |
| \`float\` | \`3.14\` | Decimal numbers |
| \`str\` | \`"hello"\` | Text |
| \`bool\` | \`True\` | True or False |

## Checking Types

Use \`type()\` to inspect a value:

\`\`\`python
print(type(42))       # <class 'int'>
print(type("hello"))  # <class 'str'>
\`\`\`

## Type Conversion

Convert between types with built-in functions:

\`\`\`python
int("42")    # → 42
str(42)      # → "42"
float(7)     # → 7.0
bool(0)      # → False
\`\`\`

## Your Task

Write a function \`classify\` that takes a value and returns its type as a string: \`"int"\`, \`"float"\`, \`"str"\`, or \`"bool"\`.`,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def classify(value):\n    if type(value) == int:\n        return "int"\n    # Add the other types below\n    pass`,
        description: "Use if/elif with type() to check each type.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def classify(value):\n    # Use isinstance() instead of type()\n    pass`,
        description: "Use isinstance() for a more Pythonic type check.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def classify(value):\n    # One-liner using type().__name__\n    pass`,
        description: "Return the type name dynamically using __name__.",
      },
    ],
    testCases: [
      { input: "classify(42)", expectedOutput: '"int"', description: "Classify integer", passed: true },
      { input: "classify(3.14)", expectedOutput: '"float"', description: "Classify float", passed: true },
      { input: 'classify("hello")', expectedOutput: '"str"', description: "Classify string", passed: true },
      { input: "classify(True)", expectedOutput: '"bool"', description: "Classify boolean", passed: false },
    ],
    hints: [
      "`type(value)` returns the type object — compare with `int`, `float`, `str`, `bool`.",
      "Be careful: `bool` is a subclass of `int` in Python — check `bool` first!",
      "Every type has a `__name__` attribute: `type(42).__name__` → `'int'`",
    ],
    xpReward: 50,
    prevLessonId: "les_002",
    nextLessonId: "les_004",
  },
  les_004: {
    id: "les_004",
    title: "Operators",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 4,
    language: "Python",
    instructions: `# Operators

Operators let you perform calculations and comparisons.

## Arithmetic Operators

\`\`\`python
10 + 3   # 13  (addition)
10 - 3   # 7   (subtraction)
10 * 3   # 30  (multiplication)
10 / 3   # 3.33 (division — always float)
10 // 3  # 3   (floor division)
10 % 3   # 1   (modulo / remainder)
10 ** 3  # 1000 (exponent)
\`\`\`

## Comparison Operators

\`\`\`python
5 == 5   # True
5 != 3   # True
5 > 3    # True
5 <= 5   # True
\`\`\`

## Your Task

Write a function \`calculator\` that takes two numbers and an operator string (\`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`) and returns the result.`,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def calculator(a, b, op):\n    if op == "+":\n        return a + b\n    # Add the other operators\n    pass`,
        description: "Use if/elif to handle each operator.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def calculator(a, b, op):\n    # Use a dictionary to map operators to functions\n    pass`,
        description: "Map operators to lambda functions in a dictionary.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def calculator(a, b, op):\n    # Use the operator module from the standard library\n    # Handle division by zero gracefully\n    pass`,
        description: "Use the operator module and handle edge cases like division by zero.",
      },
    ],
    testCases: [
      { input: 'calculator(10, 3, "+")', expectedOutput: "13", description: "Addition", passed: true },
      { input: 'calculator(10, 3, "-")', expectedOutput: "7", description: "Subtraction", passed: true },
      { input: 'calculator(10, 3, "*")', expectedOutput: "30", description: "Multiplication", passed: true },
    ],
    hints: [
      "For division, consider using `a / b` for float division.",
      "A dict approach: `ops = {'+': lambda a, b: a + b, ...}`",
    ],
    xpReward: 50,
    prevLessonId: "les_003",
    nextLessonId: "les_005",
  },
  les_005: {
    id: "les_005",
    title: "Input & Output",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 5,
    language: "Python",
    instructions: `# Input & Output

## Getting User Input

The \`input()\` function reads a line of text from the user:

\`\`\`python
name = input("What is your name? ")
print(f"Hello, {name}!")
\`\`\`

**Important:** \`input()\` always returns a **string**. Convert if needed:

\`\`\`python
age = int(input("Your age: "))
\`\`\`

## Formatted Output

f-strings are the modern way to format output:

\`\`\`python
name = "Juan"
score = 95
print(f"{name} scored {score}/100")
\`\`\`

## Your Task

Write a function \`greet_user\` that takes a \`name\` and \`age\` and returns a formatted greeting: \`"Hi <name>! You are <age> years old."\``,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def greet_user(name, age):\n    # Use an f-string\n    return f"Hi {name}! You are ___ years old."`,
        description: "Fill in the f-string template.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def greet_user(name, age):\n    # Use .format() method instead of f-string\n    pass`,
        description: "Use the .format() string method.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def greet_user(name, age):\n    # Use % formatting (old style) AND handle\n    # the case where age is a string (convert it)\n    pass`,
        description: "Use %-style formatting and handle type conversion.",
      },
    ],
    testCases: [
      { input: 'greet_user("Juan", 20)', expectedOutput: '"Hi Juan! You are 20 years old."', description: "Basic greeting", passed: true },
      { input: 'greet_user("Maria", 25)', expectedOutput: '"Hi Maria! You are 25 years old."', description: "Different name", passed: true },
    ],
    hints: [
      "f-strings: `f\"Hi {name}! You are {age} years old.\"`",
      ".format(): `\"Hi {}! You are {} years old.\".format(name, age)`",
    ],
    xpReward: 50,
    prevLessonId: "les_004",
    nextLessonId: "les_006",
  },
  // ── Python Fundamentals: Level 2 ──────────────────────────────────────
  les_006: {
    id: "les_006",
    title: "If / Else Statements",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 1,
    language: "Python",
    instructions: `# If / Else Statements

Conditional statements let your program make decisions.

## Basic Syntax

\`\`\`python
age = 18
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")
\`\`\`

## Comparison Operators

- \`==\` equal, \`!=\` not equal
- \`>\` greater, \`<\` less
- \`>=\` greater or equal, \`<=\` less or equal

## Logical Operators

Combine conditions with \`and\`, \`or\`, \`not\`:

\`\`\`python
if age >= 18 and has_id:
    print("Welcome!")
\`\`\`

## Your Task

Write a function \`grade\` that takes a numeric score (0–100) and returns the letter grade: \`"A"\` (90+), \`"B"\` (80+), \`"C"\` (70+), \`"D"\` (60+), \`"F"\` (below 60).`,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def grade(score):\n    if score >= 90:\n        return "A"\n    # Add elif/else for B, C, D, F\n    pass`,
        description: "Complete the if/elif/else chain for each grade.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def grade(score):\n    # Use a more compact approach (e.g., a loop over thresholds)\n    pass`,
        description: "Use a list of thresholds and a loop.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def grade(score):\n    # One-liner using next() + generator expression\n    # Also handle invalid scores (< 0 or > 100) by returning "Invalid"\n    pass`,
        description: "One-liner with next() + generator, plus input validation.",
      },
    ],
    testCases: [
      { input: "grade(95)", expectedOutput: '"A"', description: "A grade", passed: true },
      { input: "grade(85)", expectedOutput: '"B"', description: "B grade", passed: true },
      { input: "grade(55)", expectedOutput: '"F"', description: "F grade", passed: true },
    ],
    hints: [
      "Check from highest to lowest: 90 → A, 80 → B, etc.",
      "Threshold approach: `grades = [(90,'A'),(80,'B'),(70,'C'),(60,'D')]`",
    ],
    xpReward: 60,
    prevLessonId: "les_005",
    nextLessonId: "les_007",
  },
  les_007: {
    id: "les_007",
    title: "For Loops",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 2,
    language: "Python",
    instructions: `# For Loops

For loops iterate over sequences like lists, strings, and ranges.

## Basic For Loop

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## range() Function

\`\`\`python
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):   # 2, 3, 4, 5, 6, 7
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(i)
\`\`\`

## enumerate()

Get both index and value:

\`\`\`python
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
\`\`\`

## Your Task

Write a function \`sum_evens\` that takes a number \`n\` and returns the sum of all even numbers from 1 to \`n\` (inclusive).`,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def sum_evens(n):\n    total = 0\n    for i in range(1, n + 1):\n        # Check if i is even, then add to total\n        pass\n    return total`,
        description: "Use a for loop with an if check for even numbers.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def sum_evens(n):\n    # Use range() with a step of 2 — no if needed\n    pass`,
        description: "Use range() with step=2 to skip odd numbers entirely.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def sum_evens(n):\n    # Solve it with the math formula (no loop needed)\n    # Sum of evens from 2 to n = k*(k+1) where k = n//2\n    pass`,
        description: "Use the arithmetic series formula — O(1) with no loop.",
      },
    ],
    testCases: [
      { input: "sum_evens(10)", expectedOutput: "30", description: "Sum evens to 10", passed: true },
      { input: "sum_evens(1)", expectedOutput: "0", description: "No evens in 1", passed: true },
      { input: "sum_evens(6)", expectedOutput: "12", description: "Sum evens to 6", passed: true },
    ],
    hints: [
      "A number is even if `n % 2 == 0`.",
      "`range(2, n+1, 2)` generates only even numbers.",
      "Math formula: the sum of first k even numbers is k*(k+1).",
    ],
    xpReward: 80,
    prevLessonId: "les_006",
    nextLessonId: "les_008",
  },
  les_008: {
    id: "les_008",
    title: "While Loops",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 3,
    language: "Python",
    instructions: `# While Loops

A \`while\` loop repeats as long as a condition is true.

## Basic Syntax

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## break and continue

- \`break\` exits the loop immediately
- \`continue\` skips to the next iteration

\`\`\`python
while True:
    line = input()
    if line == "quit":
        break
    print(f"You said: {line}")
\`\`\`

## Your Task

Write a function \`countdown\` that takes a positive integer \`n\` and returns a list counting down from \`n\` to 1, followed by \`"Go!"\`.

**Example:** \`countdown(3)\` → \`[3, 2, 1, "Go!"]\``,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def countdown(n):\n    result = []\n    while n > 0:\n        result.append(n)\n        n -= 1\n    # Don't forget "Go!"\n    return result`,
        description: "Fill in the while loop to count down, then append 'Go!'.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def countdown(n):\n    # Use list(range(...)) + ["Go!"] — no while loop\n    pass`,
        description: "Use range() with a negative step and list concatenation.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def countdown(n):\n    # Recursive solution — no loops at all\n    pass`,
        description: "Implement countdown recursively without any loops.",
      },
    ],
    testCases: [
      { input: "countdown(3)", expectedOutput: '[3, 2, 1, "Go!"]', description: "Count from 3", passed: true },
      { input: "countdown(1)", expectedOutput: '[1, "Go!"]', description: "Count from 1", passed: true },
      { input: "countdown(5)", expectedOutput: '[5, 4, 3, 2, 1, "Go!"]', description: "Count from 5", passed: true },
    ],
    hints: [
      "Decrement `n` with `n -= 1` inside the loop.",
      "`list(range(n, 0, -1))` gives `[n, n-1, ..., 1]`.",
      "Recursive: base case returns `['Go!']`, recursive case returns `[n] + countdown(n-1)`.",
    ],
    xpReward: 80,
    prevLessonId: "les_007",
    nextLessonId: "les_009",
  },
  les_009: {
    id: "les_009",
    title: "Functions",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 4,
    language: "Python",
    instructions: `# Functions

Functions are reusable blocks of code defined with the \`def\` keyword.

## Defining Functions

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("Juan"))  # Hello, Juan!
\`\`\`

## Default Parameters

\`\`\`python
def power(base, exp=2):
    return base ** exp

power(3)     # 9
power(3, 3)  # 27
\`\`\`

## Multiple Return Values

\`\`\`python
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5])
\`\`\`

## Your Task

Write a function \`fizzbuzz\` that takes \`n\` and returns a list where each number 1–n is replaced by \`"Fizz"\` (divisible by 3), \`"Buzz"\` (divisible by 5), \`"FizzBuzz"\` (both), or the number itself.`,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def fizzbuzz(n):\n    result = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            result.append("FizzBuzz")\n        # Add elif for % 3, % 5, and else\n        pass\n    return result`,
        description: "Complete the classic FizzBuzz with if/elif/else.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def fizzbuzz(n):\n    # Use a list comprehension with conditional expression\n    pass`,
        description: "Solve FizzBuzz as a one-liner list comprehension.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def fizzbuzz(n):\n    # Make it extensible: accept a dict of {divisor: label}\n    # Default: {3: "Fizz", 5: "Buzz"}\n    pass`,
        description: "Generalize FizzBuzz to accept any set of divisor/label pairs.",
      },
    ],
    testCases: [
      { input: "fizzbuzz(5)", expectedOutput: '[1, 2, "Fizz", 4, "Buzz"]', description: "First 5", passed: true },
      { input: "fizzbuzz(15)[-1]", expectedOutput: '"FizzBuzz"', description: "15 is FizzBuzz", passed: true },
      { input: "len(fizzbuzz(100))", expectedOutput: "100", description: "Length check", passed: true },
    ],
    hints: [
      "Check divisibility by 15 first (both 3 and 5), then 3, then 5.",
      "List comp: `['FizzBuzz' if i%15==0 else 'Fizz' if i%3==0 else ...]`",
      "For the extensible version, loop over the divisor dict and build the label string.",
    ],
    xpReward: 100,
    prevLessonId: "les_008",
    nextLessonId: "les_010",
  },
  les_010: {
    id: "les_010",
    title: "Return Values",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 5,
    language: "Python",
    instructions: `# Return Values

The \`return\` statement sends a value back from a function to the caller.

## Basics

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 4)  # result is 7
\`\`\`

## Returning None

A function without \`return\` (or with bare \`return\`) returns \`None\`:

\`\`\`python
def say_hello(name):
    print(f"Hello, {name}!")
    # implicitly returns None
\`\`\`

## Early Returns

Use \`return\` to exit early:

\`\`\`python
def is_positive(n):
    if n <= 0:
        return False
    return True
\`\`\`

## Your Task

Write a function \`safe_divide\` that takes two numbers and returns the result of division. If the divisor is 0, return \`None\` instead of crashing.`,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def safe_divide(a, b):\n    if b == 0:\n        return None\n    # Return the division result\n    pass`,
        description: "Add the return statement for the normal division case.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def safe_divide(a, b):\n    # Use try/except ZeroDivisionError instead of an if check\n    pass`,
        description: "Handle division by zero with try/except.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def safe_divide(a, b, default=None):\n    # Return 'default' on error; also handle TypeError\n    # (e.g., if strings are passed)\n    pass`,
        description: "Handle both ZeroDivisionError and TypeError with a configurable default.",
      },
    ],
    testCases: [
      { input: "safe_divide(10, 2)", expectedOutput: "5.0", description: "Normal division", passed: true },
      { input: "safe_divide(10, 0)", expectedOutput: "None", description: "Division by zero", passed: true },
      { input: "safe_divide(0, 5)", expectedOutput: "0.0", description: "Zero numerator", passed: true },
    ],
    hints: [
      "Division in Python always returns a float: `10 / 2` → `5.0`.",
      "try/except: wrap `a / b` in a try block and catch `ZeroDivisionError`.",
    ],
    xpReward: 100,
    prevLessonId: "les_009",
    nextLessonId: "les_011",
  },
  // ── Python Fundamentals: Level 3 ──────────────────────────────────────
  les_011: {
    id: "les_011",
    title: "Lists",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 1,
    language: "Python",
    instructions: `# Lists

Lists are ordered, mutable collections — the most versatile data structure in Python.

## Creating Lists

\`\`\`python
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
empty = []
\`\`\`

## Common Operations

\`\`\`python
fruits = ["apple", "banana"]
fruits.append("cherry")      # Add to end
fruits.insert(0, "avocado")  # Insert at index
fruits.remove("banana")      # Remove by value
popped = fruits.pop()        # Remove & return last
\`\`\`

## Slicing

\`\`\`python
nums = [0, 1, 2, 3, 4, 5]
nums[1:4]    # [1, 2, 3]
nums[:3]     # [0, 1, 2]
nums[::2]    # [0, 2, 4]
nums[::-1]   # [5, 4, 3, 2, 1, 0]
\`\`\`

## Your Task

Write a function \`rotate_list\` that takes a list and a number \`k\`, and rotates the list to the right by \`k\` positions.

**Example:** \`rotate_list([1,2,3,4,5], 2)\` → \`[4,5,1,2,3]\``,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def rotate_list(lst, k):\n    if not lst:\n        return lst\n    k = k % len(lst)\n    # Use slicing to rotate\n    # Hint: lst[-k:] + lst[:-k]\n    pass`,
        description: "Use list slicing to rotate.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def rotate_list(lst, k):\n    # Use collections.deque with its rotate method\n    pass`,
        description: "Use collections.deque which has a built-in rotate().",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def rotate_list(lst, k):\n    # In-place rotation using the "reverse three times" trick\n    # 1. Reverse the whole list\n    # 2. Reverse first k elements\n    # 3. Reverse the rest\n    pass`,
        description: "Rotate in-place using the triple-reverse algorithm (O(1) extra space).",
      },
    ],
    testCases: [
      { input: "rotate_list([1,2,3,4,5], 2)", expectedOutput: "[4, 5, 1, 2, 3]", description: "Rotate right by 2", passed: true },
      { input: "rotate_list([1,2,3], 0)", expectedOutput: "[1, 2, 3]", description: "No rotation", passed: true },
      { input: "rotate_list([], 3)", expectedOutput: "[]", description: "Empty list", passed: true },
    ],
    hints: [
      "Slicing: `lst[-k:]` gives the last k elements, `lst[:-k]` gives the rest.",
      "`from collections import deque` — `d = deque(lst); d.rotate(k); return list(d)`",
      "To reverse a sublist in-place, use two pointers swapping from outside in.",
    ],
    xpReward: 100,
    prevLessonId: "les_010",
    nextLessonId: "les_012",
  },
  les_012: {
    id: "les_012",
    title: "Tuples",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 2,
    language: "Python",
    instructions: `# Tuples in Python

A **tuple** is an immutable sequence type. Once created, you cannot modify its elements. Tuples are often used to represent fixed collections of related values.

## Creating Tuples

\`\`\`python
coordinates = (3, 7)
colors = ("red", "green", "blue")
single = (42,)  # Note the trailing comma
\`\`\`

## Why Use Tuples?

- **Immutability** — they can be used as dictionary keys
- **Performance** — slightly faster than lists
- **Safety** — prevent accidental modification

## Your Task

Write a function \`swap_pair\` that takes a tuple of two elements and returns a new tuple with the elements swapped.

**Example:**
\`\`\`python
swap_pair((1, 2))  # → (2, 1)
swap_pair(("hello", "world"))  # → ("world", "hello")
\`\`\``,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def swap_pair(pair):\n    # Unpack the tuple and return swapped\n    first, second = pair\n    # Return the swapped tuple\n    pass`,
        description: "Unpack the tuple and return a new one with swapped elements.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def swap_pair(pair):\n    # Swap without unpacking — use indexing\n    pass`,
        description: "Swap elements using tuple indexing instead of unpacking.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def swap_many(t):\n    # Given a tuple of ANY even length, swap adjacent pairs\n    # (1,2,3,4) → (2,1,4,3)\n    pass`,
        description: "Generalize: swap every adjacent pair in a tuple of any even length.",
      },
    ],
    testCases: [
      { input: "swap_pair((1, 2))", expectedOutput: "(2, 1)", description: "Swap integers", passed: true },
      { input: 'swap_pair(("a", "b"))', expectedOutput: '("b", "a")', description: "Swap strings", passed: true },
      { input: "swap_pair((True, False))", expectedOutput: "(False, True)", description: "Swap booleans", passed: false },
    ],
    hints: [
      "Python lets you unpack tuples: `a, b = my_tuple`",
      "You can create a new tuple with parentheses: `(b, a)`",
      "For the hard tier, try using a list comprehension with range(0, len(t), 2) and convert back to tuple.",
    ],
    xpReward: 100,
    prevLessonId: "les_011",
    nextLessonId: "les_013",
  },
  les_015: {
    id: "les_015",
    title: "List Comprehensions",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    order: 5,
    language: "Python",
    instructions: `# List Comprehensions

List comprehensions provide a concise way to create lists. They consist of brackets containing an expression followed by a \`for\` clause, then zero or more \`for\` or \`if\` clauses.

## Basic Syntax

\`\`\`python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\`

## Nested Comprehensions

\`\`\`python
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
# → [1, 2, 3, 4, 5, 6]
\`\`\`

## Your Task

Write a function \`compress\` that takes a list of integers and returns a new list containing only the elements that appear more than once, in the order they first appear.

**Example:**
\`\`\`python
compress([1, 2, 2, 3, 3, 3, 4])  # → [2, 3]
compress([5, 5, 5])               # → [5]
compress([1, 2, 3])               # → []
\`\`\``,
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: `def compress(lst):\n    # Use a loop and a seen set\n    result = []\n    seen = set()\n    duplicates = set()\n    for item in lst:\n        if item in seen and item not in duplicates:\n            # Add to result\n            pass\n        seen.add(item)\n    return result`,
        description: "Use a loop with two sets to track seen items and duplicates.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: `def compress(lst):\n    # Solve it with list comprehension + count()\n    pass`,
        description: "Use a list comprehension with the count() method.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: `def compress(lst):\n    # One-liner using dict/Counter + list comprehension\n    # Maintain insertion order\n    pass`,
        description: "One-liner using collections.Counter and list comprehension preserving order.",
      },
    ],
    testCases: [
      { input: "compress([1, 2, 2, 3, 3, 3, 4])", expectedOutput: "[2, 3]", description: "Basic duplicates", passed: true },
      { input: "compress([])", expectedOutput: "[]", description: "Empty list", passed: false },
      { input: "compress([5, 5, 5])", expectedOutput: "[5]", description: "Single repeated item", passed: true },
      { input: "compress([1, 2, 3])", expectedOutput: "[]", description: "No duplicates", passed: true },
    ],
    hints: [
      "The `count()` method returns how many times an element appears in a list.",
      "Use a set to track which elements you've already added to avoid duplicates in the result.",
      "For the hard tier: `from collections import Counter` — Counter preserves insertion order in Python 3.7+.",
    ],
    xpReward: 150,
    prevLessonId: "les_014",
    nextLessonId: null,
  },
};
