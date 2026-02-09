// ─── Admin Dashboard Mock Data & Types ───────────────────────────────────────
// All types shaped to match real API response contracts for trivial future integration.

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AdminMetrics {
  users: {
    total: number;
    active: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
    banned: number;
  };
  content: {
    totalCourses: number;
    publishedCourses: number;
    totalLevels: number;
    publishedLevels: number;
    totalLessons: number;
    publishedLessons: number;
  };
  engagement: {
    totalXpAwarded: number;
    totalCompletions: number;
    avgCompletionRate: number;
    dau: number;
    mau: number;
    avgStreak: number;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  xpTotal: number;
  level: number;
  streakCurrent: number;
  isBanned: boolean;
  banReason?: string;
  bannedAt?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  lastActiveAt: string;
  avatarUrl: string;
  signupMethod?: string;
  coursesEnrolled?: number;
  lessonsCompleted?: number;
  achievementsCount?: number;
}

export interface AdminCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  language: string;
  iconUrl: string;
  color: string;
  orderIndex: number;
  isPublished: boolean;
  enrollmentCount: number;
  completionRate: number;
  createdAt: string;
  updatedAt: string;
  levels: AdminLevel[];
}

export interface AdminLevel {
  id: string;
  title: string;
  slug: string;
  orderIndex: number;
  isPublished: boolean;
  lessonCount: number;
  lessons: AdminLesson[];
}

export interface AdminLesson {
  id: string;
  title: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  xpReward: number;
  orderIndex: number;
  isPublished: boolean;
  content?: string;
  quizQuestions?: number;
  codeChallenge?: boolean;
  minQuizScore?: number;
  timeLimitSeconds?: number;
}

export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  adminAvatarUrl: string;
  action: string;
  entityType: "USER" | "COURSE" | "LEVEL" | "LESSON" | "ACHIEVEMENT" | "BADGE" | "SYSTEM";
  entityId: string;
  description: string;
  oldValue?: string;
  newValue?: string;
  ipAddress: string;
  userAgent?: string;
  createdAt: string;
}

export interface ModerationReport {
  id: string;
  reporterName: string;
  reporterAvatar: string;
  contentPreview: string;
  reason: string;
  status: "PENDING" | "REVIEWED" | "DISMISSED";
  entityType: string;
  entityId: string;
  createdAt: string;
}

export interface FlaggedComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  lessonTitle: string;
  reportsCount: number;
  status: "VISIBLE" | "HIDDEN" | "DELETED";
  createdAt: string;
}

export interface AdminAchievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconUrl: string;
  category: "LEARNING" | "SOCIAL" | "STREAK" | "MASTERY" | "SPECIAL";
  xpReward: number;
  criteria: string;
  isSecret: boolean;
  unlockedByCount: number;
}

export interface AdminBadge {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconUrl: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  awardedCount: number;
}

export interface SystemHealth {
  database: "healthy" | "degraded" | "down";
  uptime: number;
  version: string;
  environment: string;
  lastChecked: string;
}

export interface UserActivity {
  id: string;
  text: string;
  xp: string;
  time: string;
  type: "completion" | "achievement" | "rank" | "streak" | "enrollment";
}

export interface DailySignup {
  date: string;
  count: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const mockDashboardMetrics: AdminMetrics = {
  users: {
    total: 12847,
    active: 4231,
    newToday: 47,
    newThisWeek: 312,
    newThisMonth: 1204,
    banned: 23,
  },
  content: {
    totalCourses: 8,
    publishedCourses: 6,
    totalLevels: 32,
    publishedLevels: 28,
    totalLessons: 186,
    publishedLessons: 164,
  },
  engagement: {
    totalXpAwarded: 2847500,
    totalCompletions: 18432,
    avgCompletionRate: 67.3,
    dau: 1847,
    mau: 8234,
    avgStreak: 4.2,
  },
};

export const mockRecentSignups: AdminUser[] = [
  { id: "u1", email: "maria.santos@email.com", username: "mariasantos", displayName: "Maria Santos", role: "USER", xpTotal: 0, level: 1, streakCurrent: 0, isBanned: false, isVerified: true, isActive: true, createdAt: "2026-02-09T08:30:00Z", lastActiveAt: "2026-02-09T08:30:00Z", avatarUrl: "", signupMethod: "Google" },
  { id: "u2", email: "juan.delacruz@email.com", username: "juandc", displayName: "Juan Dela Cruz", role: "USER", xpTotal: 0, level: 1, streakCurrent: 0, isBanned: false, isVerified: false, isActive: true, createdAt: "2026-02-09T07:15:00Z", lastActiveAt: "2026-02-09T07:15:00Z", avatarUrl: "", signupMethod: "Email" },
  { id: "u3", email: "ana.reyes@email.com", username: "anareyes", displayName: "Ana Reyes", role: "USER", xpTotal: 50, level: 1, streakCurrent: 1, isBanned: false, isVerified: true, isActive: true, createdAt: "2026-02-09T06:45:00Z", lastActiveAt: "2026-02-09T07:00:00Z", avatarUrl: "", signupMethod: "GitHub" },
  { id: "u4", email: "carlo.garcia@email.com", username: "carlog", displayName: "Carlo Garcia", role: "USER", xpTotal: 0, level: 1, streakCurrent: 0, isBanned: false, isVerified: true, isActive: true, createdAt: "2026-02-09T05:30:00Z", lastActiveAt: "2026-02-09T05:30:00Z", avatarUrl: "", signupMethod: "Google" },
  { id: "u5", email: "bea.villanueva@email.com", username: "beavill", displayName: "Bea Villanueva", role: "USER", xpTotal: 0, level: 1, streakCurrent: 0, isBanned: false, isVerified: false, isActive: true, createdAt: "2026-02-08T22:10:00Z", lastActiveAt: "2026-02-08T22:10:00Z", avatarUrl: "", signupMethod: "Email" },
  { id: "u6", email: "miguel.ramos@email.com", username: "miguelr", displayName: "Miguel Ramos", role: "USER", xpTotal: 100, level: 2, streakCurrent: 1, isBanned: false, isVerified: true, isActive: true, createdAt: "2026-02-08T20:00:00Z", lastActiveAt: "2026-02-09T06:00:00Z", avatarUrl: "", signupMethod: "GitHub" },
  { id: "u7", email: "sofia.mendoza@email.com", username: "sofiamend", displayName: "Sofia Mendoza", role: "USER", xpTotal: 0, level: 1, streakCurrent: 0, isBanned: false, isVerified: true, isActive: true, createdAt: "2026-02-08T18:30:00Z", lastActiveAt: "2026-02-08T18:30:00Z", avatarUrl: "", signupMethod: "Email" },
  { id: "u8", email: "marco.bautista@email.com", username: "marcob", displayName: "Marco Bautista", role: "USER", xpTotal: 0, level: 1, streakCurrent: 0, isBanned: false, isVerified: false, isActive: true, createdAt: "2026-02-08T16:45:00Z", lastActiveAt: "2026-02-08T16:45:00Z", avatarUrl: "", signupMethod: "Google" },
];

export const mockSystemHealth: SystemHealth = {
  database: "healthy",
  uptime: 864000,
  version: "1.0.0",
  environment: "production",
  lastChecked: "2026-02-09T09:00:00Z",
};

export const mockUsers: AdminUser[] = [
  { id: "u1", email: "maria.santos@email.com", username: "mariasantos", displayName: "Maria Santos", role: "USER", xpTotal: 8450, level: 12, streakCurrent: 15, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-08-15T10:00:00Z", lastActiveAt: "2026-02-09T08:30:00Z", avatarUrl: "", coursesEnrolled: 3, lessonsCompleted: 45, achievementsCount: 8 },
  { id: "u2", email: "juan.delacruz@email.com", username: "juandc", displayName: "Juan Dela Cruz", role: "USER", xpTotal: 12300, level: 18, streakCurrent: 32, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-06-20T14:00:00Z", lastActiveAt: "2026-02-09T07:00:00Z", avatarUrl: "", coursesEnrolled: 4, lessonsCompleted: 78, achievementsCount: 15 },
  { id: "u3", email: "ana.reyes@email.com", username: "anareyes", displayName: "Ana Reyes", role: "MODERATOR", xpTotal: 15600, level: 22, streakCurrent: 45, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-05-10T09:00:00Z", lastActiveAt: "2026-02-09T09:00:00Z", avatarUrl: "", coursesEnrolled: 5, lessonsCompleted: 92, achievementsCount: 20 },
  { id: "u4", email: "carlo.garcia@email.com", username: "carlog", displayName: "Carlo Garcia", role: "USER", xpTotal: 3200, level: 6, streakCurrent: 0, isBanned: true, banReason: "Spam and abusive comments", bannedAt: "2026-01-28T12:00:00Z", isVerified: true, isActive: false, createdAt: "2025-09-01T11:00:00Z", lastActiveAt: "2026-01-28T12:00:00Z", avatarUrl: "", coursesEnrolled: 2, lessonsCompleted: 18, achievementsCount: 3 },
  { id: "u5", email: "bea.villanueva@email.com", username: "beavill", displayName: "Bea Villanueva", role: "USER", xpTotal: 6700, level: 10, streakCurrent: 7, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-07-12T16:00:00Z", lastActiveAt: "2026-02-08T20:00:00Z", avatarUrl: "", coursesEnrolled: 3, lessonsCompleted: 38, achievementsCount: 6 },
  { id: "u6", email: "admin@aralify.com", username: "admin", displayName: "System Admin", role: "ADMIN", xpTotal: 0, level: 1, streakCurrent: 0, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-01-01T00:00:00Z", lastActiveAt: "2026-02-09T09:00:00Z", avatarUrl: "", coursesEnrolled: 0, lessonsCompleted: 0, achievementsCount: 0 },
  { id: "u7", email: "miguel.ramos@email.com", username: "miguelr", displayName: "Miguel Ramos", role: "USER", xpTotal: 9800, level: 14, streakCurrent: 20, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-06-01T08:00:00Z", lastActiveAt: "2026-02-09T06:00:00Z", avatarUrl: "", coursesEnrolled: 4, lessonsCompleted: 56, achievementsCount: 11 },
  { id: "u8", email: "sofia.mendoza@email.com", username: "sofiamend", displayName: "Sofia Mendoza", role: "USER", xpTotal: 4500, level: 8, streakCurrent: 3, isBanned: false, isVerified: false, isActive: true, createdAt: "2025-10-05T13:00:00Z", lastActiveAt: "2026-02-07T18:00:00Z", avatarUrl: "", coursesEnrolled: 2, lessonsCompleted: 24, achievementsCount: 4 },
  { id: "u9", email: "marco.bautista@email.com", username: "marcob", displayName: "Marco Bautista", role: "USER", xpTotal: 11200, level: 16, streakCurrent: 0, isBanned: false, isVerified: true, isActive: false, createdAt: "2025-04-20T10:00:00Z", lastActiveAt: "2026-01-15T14:00:00Z", avatarUrl: "", coursesEnrolled: 3, lessonsCompleted: 62, achievementsCount: 12 },
  { id: "u10", email: "isabelle.cruz@email.com", username: "isacruz", displayName: "Isabelle Cruz", role: "USER", xpTotal: 7800, level: 11, streakCurrent: 12, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-07-30T15:00:00Z", lastActiveAt: "2026-02-09T07:30:00Z", avatarUrl: "", coursesEnrolled: 3, lessonsCompleted: 42, achievementsCount: 9 },
  { id: "u11", email: "paolo.rivera@email.com", username: "paolor", displayName: "Paolo Rivera", role: "USER", xpTotal: 2100, level: 4, streakCurrent: 0, isBanned: true, banReason: "Multiple account violations", bannedAt: "2026-02-01T10:00:00Z", isVerified: true, isActive: false, createdAt: "2025-11-10T09:00:00Z", lastActiveAt: "2026-02-01T10:00:00Z", avatarUrl: "", coursesEnrolled: 1, lessonsCompleted: 12, achievementsCount: 2 },
  { id: "u12", email: "rina.aquino@email.com", username: "rinaaq", displayName: "Rina Aquino", role: "MODERATOR", xpTotal: 13400, level: 19, streakCurrent: 28, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-05-25T11:00:00Z", lastActiveAt: "2026-02-09T08:00:00Z", avatarUrl: "", coursesEnrolled: 4, lessonsCompleted: 84, achievementsCount: 17 },
  { id: "u13", email: "daniel.lim@email.com", username: "danlim", displayName: "Daniel Lim", role: "USER", xpTotal: 5600, level: 9, streakCurrent: 5, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-08-22T14:00:00Z", lastActiveAt: "2026-02-08T21:00:00Z", avatarUrl: "", coursesEnrolled: 2, lessonsCompleted: 30, achievementsCount: 5 },
  { id: "u14", email: "grace.tan@email.com", username: "gracetan", displayName: "Grace Tan", role: "USER", xpTotal: 16200, level: 23, streakCurrent: 50, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-03-15T08:00:00Z", lastActiveAt: "2026-02-09T09:00:00Z", avatarUrl: "", coursesEnrolled: 6, lessonsCompleted: 98, achievementsCount: 22 },
  { id: "u15", email: "jayson.flores@email.com", username: "jaysonf", displayName: "Jayson Flores", role: "USER", xpTotal: 1800, level: 3, streakCurrent: 1, isBanned: false, isVerified: false, isActive: true, createdAt: "2025-12-01T10:00:00Z", lastActiveAt: "2026-02-06T16:00:00Z", avatarUrl: "", coursesEnrolled: 1, lessonsCompleted: 8, achievementsCount: 1 },
  { id: "u16", email: "kristine.navarro@email.com", username: "kristinen", displayName: "Kristine Navarro", role: "USER", xpTotal: 7200, level: 10, streakCurrent: 9, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-08-05T12:00:00Z", lastActiveAt: "2026-02-09T05:00:00Z", avatarUrl: "", coursesEnrolled: 3, lessonsCompleted: 40, achievementsCount: 7 },
  { id: "u17", email: "renz.castillo@email.com", username: "renzc", displayName: "Renz Castillo", role: "USER", xpTotal: 950, level: 2, streakCurrent: 0, isBanned: false, isVerified: true, isActive: false, createdAt: "2026-01-15T09:00:00Z", lastActiveAt: "2026-01-20T14:00:00Z", avatarUrl: "", coursesEnrolled: 1, lessonsCompleted: 5, achievementsCount: 0 },
  { id: "u18", email: "angel.sy@email.com", username: "angelsy", displayName: "Angel Sy", role: "USER", xpTotal: 10500, level: 15, streakCurrent: 18, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-06-10T16:00:00Z", lastActiveAt: "2026-02-09T08:00:00Z", avatarUrl: "", coursesEnrolled: 4, lessonsCompleted: 58, achievementsCount: 13 },
  { id: "u19", email: "mark.padilla@email.com", username: "markp", displayName: "Mark Padilla", role: "USER", xpTotal: 4100, level: 7, streakCurrent: 2, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-09-20T11:00:00Z", lastActiveAt: "2026-02-08T19:00:00Z", avatarUrl: "", coursesEnrolled: 2, lessonsCompleted: 22, achievementsCount: 4 },
  { id: "u20", email: "chloe.wong@email.com", username: "chloew", displayName: "Chloe Wong", role: "USER", xpTotal: 8900, level: 13, streakCurrent: 14, isBanned: false, isVerified: true, isActive: true, createdAt: "2025-07-18T09:00:00Z", lastActiveAt: "2026-02-09T07:45:00Z", avatarUrl: "", coursesEnrolled: 3, lessonsCompleted: 48, achievementsCount: 10 },
];

export const mockCourses: AdminCourse[] = [
  {
    id: "c1", title: "Python Fundamentals", slug: "python-fundamentals", description: "Learn Python from scratch with hands-on coding exercises.", language: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB", orderIndex: 1, isPublished: true, enrollmentCount: 3245, completionRate: 72, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2026-01-15T00:00:00Z",
    levels: [
      { id: "l1", title: "Getting Started", slug: "getting-started", orderIndex: 1, isPublished: true, lessonCount: 6, lessons: [
        { id: "ls1", title: "Hello World", slug: "hello-world", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: true, quizQuestions: 3, codeChallenge: true },
        { id: "ls2", title: "Variables & Types", slug: "variables-types", difficulty: "EASY", xpReward: 50, orderIndex: 2, isPublished: true, quizQuestions: 5, codeChallenge: true },
        { id: "ls3", title: "Basic Operations", slug: "basic-operations", difficulty: "EASY", xpReward: 50, orderIndex: 3, isPublished: true, quizQuestions: 4, codeChallenge: true },
        { id: "ls4", title: "Strings", slug: "strings", difficulty: "MEDIUM", xpReward: 100, orderIndex: 4, isPublished: true, quizQuestions: 5, codeChallenge: true },
        { id: "ls5", title: "Input/Output", slug: "input-output", difficulty: "EASY", xpReward: 50, orderIndex: 5, isPublished: true, quizQuestions: 3, codeChallenge: false },
        { id: "ls6", title: "Review Quiz", slug: "review-quiz", difficulty: "MEDIUM", xpReward: 100, orderIndex: 6, isPublished: true, quizQuestions: 10, codeChallenge: false },
      ]},
      { id: "l2", title: "Control Flow", slug: "control-flow", orderIndex: 2, isPublished: true, lessonCount: 5, lessons: [
        { id: "ls7", title: "If/Else Statements", slug: "if-else", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: true, quizQuestions: 4, codeChallenge: true },
        { id: "ls8", title: "For Loops", slug: "for-loops", difficulty: "MEDIUM", xpReward: 100, orderIndex: 2, isPublished: true, quizQuestions: 5, codeChallenge: true },
        { id: "ls9", title: "While Loops", slug: "while-loops", difficulty: "MEDIUM", xpReward: 100, orderIndex: 3, isPublished: true, quizQuestions: 4, codeChallenge: true },
        { id: "ls10", title: "Nested Loops", slug: "nested-loops", difficulty: "HARD", xpReward: 150, orderIndex: 4, isPublished: true, quizQuestions: 5, codeChallenge: true },
        { id: "ls11", title: "Error Handling", slug: "error-handling", difficulty: "HARD", xpReward: 150, orderIndex: 5, isPublished: false, quizQuestions: 4, codeChallenge: true },
      ]},
    ],
  },
  {
    id: "c2", title: "JavaScript Essentials", slug: "javascript-essentials", description: "Master JavaScript for web development.", language: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E", orderIndex: 2, isPublished: true, enrollmentCount: 2890, completionRate: 65, createdAt: "2025-03-15T00:00:00Z", updatedAt: "2026-01-20T00:00:00Z",
    levels: [
      { id: "l3", title: "JS Basics", slug: "js-basics", orderIndex: 1, isPublished: true, lessonCount: 8, lessons: [
        { id: "ls12", title: "Variables (let, const, var)", slug: "variables", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: true },
        { id: "ls13", title: "Data Types", slug: "data-types", difficulty: "EASY", xpReward: 50, orderIndex: 2, isPublished: true },
        { id: "ls14", title: "Functions", slug: "functions", difficulty: "MEDIUM", xpReward: 100, orderIndex: 3, isPublished: true },
        { id: "ls15", title: "Arrays & Objects", slug: "arrays-objects", difficulty: "MEDIUM", xpReward: 100, orderIndex: 4, isPublished: true },
      ]},
    ],
  },
  {
    id: "c3", title: "React From Zero", slug: "react-from-zero", description: "Build modern UIs with React.", language: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB", orderIndex: 3, isPublished: true, enrollmentCount: 1856, completionRate: 58, createdAt: "2025-05-01T00:00:00Z", updatedAt: "2026-02-01T00:00:00Z",
    levels: [
      { id: "l4", title: "React Basics", slug: "react-basics", orderIndex: 1, isPublished: true, lessonCount: 6, lessons: [
        { id: "ls16", title: "JSX & Components", slug: "jsx-components", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: true },
        { id: "ls17", title: "Props & State", slug: "props-state", difficulty: "MEDIUM", xpReward: 100, orderIndex: 2, isPublished: true },
        { id: "ls18", title: "Event Handling", slug: "event-handling", difficulty: "MEDIUM", xpReward: 100, orderIndex: 3, isPublished: true },
      ]},
    ],
  },
  {
    id: "c4", title: "TypeScript Mastery", slug: "typescript-mastery", description: "Level up with TypeScript types and patterns.", language: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6", orderIndex: 4, isPublished: true, enrollmentCount: 1420, completionRate: 55, createdAt: "2025-06-01T00:00:00Z", updatedAt: "2026-01-25T00:00:00Z",
    levels: [
      { id: "l5", title: "TS Basics", slug: "ts-basics", orderIndex: 1, isPublished: true, lessonCount: 5, lessons: [
        { id: "ls19", title: "Type Annotations", slug: "type-annotations", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: true },
        { id: "ls20", title: "Interfaces", slug: "interfaces", difficulty: "MEDIUM", xpReward: 100, orderIndex: 2, isPublished: true },
      ]},
    ],
  },
  {
    id: "c5", title: "Node.js Backend", slug: "node-backend", description: "Build server-side applications with Node.js.", language: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933", orderIndex: 5, isPublished: true, enrollmentCount: 980, completionRate: 48, createdAt: "2025-07-01T00:00:00Z", updatedAt: "2026-01-30T00:00:00Z",
    levels: [
      { id: "l6", title: "Node Basics", slug: "node-basics", orderIndex: 1, isPublished: true, lessonCount: 4, lessons: [
        { id: "ls21", title: "Modules & NPM", slug: "modules-npm", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: true },
        { id: "ls22", title: "HTTP Server", slug: "http-server", difficulty: "MEDIUM", xpReward: 100, orderIndex: 2, isPublished: true },
      ]},
    ],
  },
  {
    id: "c6", title: "HTML & CSS Basics", slug: "html-css-basics", description: "Learn the building blocks of the web.", language: "HTML/CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26", orderIndex: 6, isPublished: true, enrollmentCount: 4120, completionRate: 78, createdAt: "2025-02-01T00:00:00Z", updatedAt: "2025-12-15T00:00:00Z",
    levels: [
      { id: "l7", title: "HTML Fundamentals", slug: "html-fundamentals", orderIndex: 1, isPublished: true, lessonCount: 6, lessons: [
        { id: "ls23", title: "Elements & Tags", slug: "elements-tags", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: true },
        { id: "ls24", title: "Forms", slug: "forms", difficulty: "MEDIUM", xpReward: 100, orderIndex: 2, isPublished: true },
      ]},
    ],
  },
  {
    id: "c7", title: "SQL for Beginners", slug: "sql-beginners", description: "Master database queries with SQL.", language: "SQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791", orderIndex: 7, isPublished: false, enrollmentCount: 0, completionRate: 0, createdAt: "2026-01-20T00:00:00Z", updatedAt: "2026-02-05T00:00:00Z",
    levels: [
      { id: "l8", title: "SQL Basics", slug: "sql-basics", orderIndex: 1, isPublished: false, lessonCount: 4, lessons: [
        { id: "ls25", title: "SELECT Queries", slug: "select-queries", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: false },
        { id: "ls26", title: "WHERE & Filtering", slug: "where-filtering", difficulty: "EASY", xpReward: 50, orderIndex: 2, isPublished: false },
      ]},
    ],
  },
  {
    id: "c8", title: "Git & GitHub", slug: "git-github", description: "Version control essentials for developers.", language: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032", orderIndex: 8, isPublished: false, enrollmentCount: 0, completionRate: 0, createdAt: "2026-02-01T00:00:00Z", updatedAt: "2026-02-08T00:00:00Z",
    levels: [
      { id: "l9", title: "Git Basics", slug: "git-basics", orderIndex: 1, isPublished: false, lessonCount: 5, lessons: [
        { id: "ls27", title: "Init & Commit", slug: "init-commit", difficulty: "EASY", xpReward: 50, orderIndex: 1, isPublished: false },
      ]},
    ],
  },
];

export const mockAuditLogs: AuditLogEntry[] = [
  { id: "al1", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "USER_BANNED", entityType: "USER", entityId: "u4", description: "Banned user carlog for spam and abusive comments", oldValue: JSON.stringify({ isBanned: false }), newValue: JSON.stringify({ isBanned: true, banReason: "Spam and abusive comments" }), ipAddress: "203.0.113.45", createdAt: "2026-01-28T12:00:00Z" },
  { id: "al2", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "COURSE_PUBLISHED", entityType: "COURSE", entityId: "c5", description: "Published course 'Node.js Backend'", oldValue: JSON.stringify({ isPublished: false }), newValue: JSON.stringify({ isPublished: true }), ipAddress: "203.0.113.45", createdAt: "2026-01-30T10:00:00Z" },
  { id: "al3", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "ROLE_CHANGED", entityType: "USER", entityId: "u3", description: "Changed role of anareyes from USER to MODERATOR", oldValue: JSON.stringify({ role: "USER" }), newValue: JSON.stringify({ role: "MODERATOR" }), ipAddress: "203.0.113.45", createdAt: "2026-01-25T14:00:00Z" },
  { id: "al4", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "LESSON_CREATED", entityType: "LESSON", entityId: "ls11", description: "Created lesson 'Error Handling' in Python Fundamentals", ipAddress: "203.0.113.45", createdAt: "2026-01-22T09:00:00Z" },
  { id: "al5", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "COURSE_CREATED", entityType: "COURSE", entityId: "c7", description: "Created course 'SQL for Beginners'", ipAddress: "203.0.113.45", createdAt: "2026-01-20T11:00:00Z" },
  { id: "al6", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "USER_BANNED", entityType: "USER", entityId: "u11", description: "Banned user paolor for multiple account violations", oldValue: JSON.stringify({ isBanned: false }), newValue: JSON.stringify({ isBanned: true, banReason: "Multiple account violations" }), ipAddress: "203.0.113.45", createdAt: "2026-02-01T10:00:00Z" },
  { id: "al7", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "LESSON_UPDATED", entityType: "LESSON", entityId: "ls4", description: "Updated lesson 'Strings' XP reward from 75 to 100", oldValue: JSON.stringify({ xpReward: 75 }), newValue: JSON.stringify({ xpReward: 100 }), ipAddress: "203.0.113.45", createdAt: "2026-01-18T15:00:00Z" },
  { id: "al8", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "ACHIEVEMENT_CREATED", entityType: "ACHIEVEMENT", entityId: "a1", description: "Created achievement 'First Steps'", ipAddress: "203.0.113.45", createdAt: "2026-01-15T10:00:00Z" },
  { id: "al9", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "SYSTEM_SETTINGS_UPDATED", entityType: "SYSTEM", entityId: "settings", description: "Updated max daily XP from 500 to 1000", oldValue: JSON.stringify({ maxDailyXp: 500 }), newValue: JSON.stringify({ maxDailyXp: 1000 }), ipAddress: "203.0.113.45", createdAt: "2026-01-12T08:00:00Z" },
  { id: "al10", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "ROLE_CHANGED", entityType: "USER", entityId: "u12", description: "Changed role of rinaaq from USER to MODERATOR", oldValue: JSON.stringify({ role: "USER" }), newValue: JSON.stringify({ role: "MODERATOR" }), ipAddress: "203.0.113.45", createdAt: "2026-01-10T16:00:00Z" },
  { id: "al11", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "COURSE_UPDATED", entityType: "COURSE", entityId: "c1", description: "Updated course 'Python Fundamentals' description", ipAddress: "203.0.113.45", createdAt: "2026-01-08T11:00:00Z" },
  { id: "al12", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "USER_UNBANNED", entityType: "USER", entityId: "u17", description: "Unbanned user renzc after appeal review", oldValue: JSON.stringify({ isBanned: true }), newValue: JSON.stringify({ isBanned: false }), ipAddress: "203.0.113.45", createdAt: "2026-01-05T09:00:00Z" },
  { id: "al13", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "LESSON_PUBLISHED", entityType: "LESSON", entityId: "ls10", description: "Published lesson 'Nested Loops'", oldValue: JSON.stringify({ isPublished: false }), newValue: JSON.stringify({ isPublished: true }), ipAddress: "203.0.113.45", createdAt: "2026-01-03T14:00:00Z" },
  { id: "al14", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "BADGE_CREATED", entityType: "BADGE", entityId: "b1", description: "Created badge 'Early Adopter'", ipAddress: "203.0.113.45", createdAt: "2025-12-28T10:00:00Z" },
  { id: "al15", adminId: "u6", adminName: "System Admin", adminAvatarUrl: "", action: "LESSON_DELETED", entityType: "LESSON", entityId: "ls_old1", description: "Deleted deprecated lesson 'Legacy Syntax'", ipAddress: "203.0.113.45", createdAt: "2025-12-20T16:00:00Z" },
];

export const mockReports: ModerationReport[] = [
  { id: "r1", reporterName: "Maria Santos", reporterAvatar: "", contentPreview: "This solution is stolen from StackOverflow without attribution...", reason: "Plagiarism", status: "PENDING", entityType: "comment", entityId: "cm1", createdAt: "2026-02-08T14:00:00Z" },
  { id: "r2", reporterName: "Juan Dela Cruz", reporterAvatar: "", contentPreview: "Buy cheap followers at spamsite.com! Best deals...", reason: "Spam", status: "PENDING", entityType: "comment", entityId: "cm2", createdAt: "2026-02-08T10:00:00Z" },
  { id: "r3", reporterName: "Bea Villanueva", reporterAvatar: "", contentPreview: "You're so stupid if you can't solve this basic problem...", reason: "Harassment", status: "PENDING", entityType: "comment", entityId: "cm3", createdAt: "2026-02-07T18:00:00Z" },
  { id: "r4", reporterName: "Miguel Ramos", reporterAvatar: "", contentPreview: "The instructor clearly doesn't know what they're talking about...", reason: "Inappropriate Content", status: "REVIEWED", entityType: "comment", entityId: "cm4", createdAt: "2026-02-06T12:00:00Z" },
  { id: "r5", reporterName: "Sofia Mendoza", reporterAvatar: "", contentPreview: "Check out my YouTube channel for REAL tutorials...", reason: "Spam", status: "DISMISSED", entityType: "comment", entityId: "cm5", createdAt: "2026-02-05T09:00:00Z" },
  { id: "r6", reporterName: "Daniel Lim", reporterAvatar: "", contentPreview: "This code has a security vulnerability that could be exploited...", reason: "Security Concern", status: "PENDING", entityType: "comment", entityId: "cm6", createdAt: "2026-02-09T06:00:00Z" },
  { id: "r7", reporterName: "Grace Tan", reporterAvatar: "", contentPreview: "Multiple users are using similar code submissions in Challenge #42...", reason: "Cheating", status: "REVIEWED", entityType: "challenge_submission", entityId: "cs1", createdAt: "2026-02-04T15:00:00Z" },
  { id: "r8", reporterName: "Angel Sy", reporterAvatar: "", contentPreview: "User profile contains offensive language and inappropriate links...", reason: "Inappropriate Profile", status: "PENDING", entityType: "user_profile", entityId: "u_report1", createdAt: "2026-02-08T20:00:00Z" },
];

export const mockFlaggedComments: FlaggedComment[] = [
  { id: "fc1", authorName: "Carlo Garcia", authorAvatar: "", content: "Buy cheap followers at spamsite.com! Best deals you'll ever find!", lessonTitle: "Hello World", reportsCount: 5, status: "VISIBLE", createdAt: "2026-02-08T10:00:00Z" },
  { id: "fc2", authorName: "Unknown User", authorAvatar: "", content: "You're so stupid if you can't solve this basic problem. Go learn something else.", lessonTitle: "Variables & Types", reportsCount: 3, status: "VISIBLE", createdAt: "2026-02-07T18:00:00Z" },
  { id: "fc3", authorName: "Paolo Rivera", authorAvatar: "", content: "This whole course is garbage and the instructor is clueless.", lessonTitle: "For Loops", reportsCount: 4, status: "HIDDEN", createdAt: "2026-02-06T14:00:00Z" },
  { id: "fc4", authorName: "Test Account", authorAvatar: "", content: "asdfjkl; test test test spam spam", lessonTitle: "If/Else Statements", reportsCount: 2, status: "VISIBLE", createdAt: "2026-02-07T08:00:00Z" },
  { id: "fc5", authorName: "Maria Santos", authorAvatar: "", content: "Great explanation! But I think the example on line 5 has a typo.", lessonTitle: "Strings", reportsCount: 1, status: "VISIBLE", createdAt: "2026-02-05T16:00:00Z" },
  { id: "fc6", authorName: "Bot Account", authorAvatar: "", content: "Click here for free premium access! Limited time offer!!!", lessonTitle: "Functions", reportsCount: 8, status: "VISIBLE", createdAt: "2026-02-08T22:00:00Z" },
  { id: "fc7", authorName: "Anonymous", authorAvatar: "", content: "The solution they gave is wrong. Here's a link to the actual solution: malicious-site.com", lessonTitle: "Arrays & Objects", reportsCount: 6, status: "HIDDEN", createdAt: "2026-02-04T12:00:00Z" },
  { id: "fc8", authorName: "Juan Dela Cruz", authorAvatar: "", content: "Can someone explain step 3? I'm having trouble understanding the recursion.", lessonTitle: "Nested Loops", reportsCount: 0, status: "VISIBLE", createdAt: "2026-02-09T07:00:00Z" },
  { id: "fc9", authorName: "Suspicious User", authorAvatar: "", content: "I've completed all challenges using my AI tool. Want access? DM me.", lessonTitle: "While Loops", reportsCount: 4, status: "VISIBLE", createdAt: "2026-02-07T20:00:00Z" },
  { id: "fc10", authorName: "Kristine Navarro", authorAvatar: "", content: "This was really helpful! I finally understand how closures work. Thanks!", lessonTitle: "Functions", reportsCount: 0, status: "VISIBLE", createdAt: "2026-02-08T15:00:00Z" },
];

export const mockAchievements: AdminAchievement[] = [
  { id: "a1", slug: "first-steps", title: "First Steps", description: "Complete your first lesson", iconUrl: "/achievements/first-steps.svg", category: "LEARNING", xpReward: 50, criteria: "lessons_completed >= 1", isSecret: false, unlockedByCount: 8432 },
  { id: "a2", slug: "code-warrior", title: "Code Warrior", description: "Complete 10 code challenges", iconUrl: "/achievements/code-warrior.svg", category: "MASTERY", xpReward: 200, criteria: "challenges_completed >= 10", isSecret: false, unlockedByCount: 2341 },
  { id: "a3", slug: "streak-master", title: "Streak Master", description: "Maintain a 30-day streak", iconUrl: "/achievements/streak-master.svg", category: "STREAK", xpReward: 500, criteria: "streak_current >= 30", isSecret: false, unlockedByCount: 456 },
  { id: "a4", slug: "social-butterfly", title: "Social Butterfly", description: "Follow 10 other learners", iconUrl: "/achievements/social-butterfly.svg", category: "SOCIAL", xpReward: 100, criteria: "following_count >= 10", isSecret: false, unlockedByCount: 1823 },
  { id: "a5", slug: "perfect-score", title: "Perfect Score", description: "Score 100% on any quiz", iconUrl: "/achievements/perfect-score.svg", category: "MASTERY", xpReward: 150, criteria: "quiz_perfect_scores >= 1", isSecret: false, unlockedByCount: 3567 },
  { id: "a6", slug: "night-owl", title: "Night Owl", description: "Complete a lesson between midnight and 5 AM", iconUrl: "/achievements/night-owl.svg", category: "SPECIAL", xpReward: 75, criteria: "lesson_completed_night", isSecret: true, unlockedByCount: 892 },
  { id: "a7", slug: "polyglot", title: "Polyglot", description: "Enroll in courses with 3 different languages", iconUrl: "/achievements/polyglot.svg", category: "LEARNING", xpReward: 300, criteria: "unique_course_languages >= 3", isSecret: false, unlockedByCount: 678 },
  { id: "a8", slug: "speed-demon", title: "Speed Demon", description: "Complete a Hard lesson in under 5 minutes", iconUrl: "/achievements/speed-demon.svg", category: "MASTERY", xpReward: 250, criteria: "hard_lesson_under_5min", isSecret: true, unlockedByCount: 123 },
  { id: "a9", slug: "helping-hand", title: "Helping Hand", description: "Have 5 comments liked by other users", iconUrl: "/achievements/helping-hand.svg", category: "SOCIAL", xpReward: 100, criteria: "comment_likes_received >= 5", isSecret: false, unlockedByCount: 1245 },
  { id: "a10", slug: "course-completer", title: "Course Completer", description: "Complete an entire course", iconUrl: "/achievements/course-completer.svg", category: "LEARNING", xpReward: 1000, criteria: "courses_completed >= 1", isSecret: false, unlockedByCount: 1567 },
];

export const mockBadges: AdminBadge[] = [
  { id: "b1", slug: "early-adopter", title: "Early Adopter", description: "Joined during beta period", iconUrl: "/badges/early-adopter.svg", rarity: "EPIC", awardedCount: 234 },
  { id: "b2", slug: "rising-star", title: "Rising Star", description: "Reached Level 10", iconUrl: "/badges/rising-star.svg", rarity: "COMMON", awardedCount: 3456 },
  { id: "b3", slug: "python-master", title: "Python Master", description: "Completed all Python courses", iconUrl: "/badges/python-master.svg", rarity: "RARE", awardedCount: 892 },
  { id: "b4", slug: "streak-legend", title: "Streak Legend", description: "100-day learning streak", iconUrl: "/badges/streak-legend.svg", rarity: "LEGENDARY", awardedCount: 45 },
  { id: "b5", slug: "top-contributor", title: "Top Contributor", description: "Top 10 on monthly leaderboard", iconUrl: "/badges/top-contributor.svg", rarity: "EPIC", awardedCount: 120 },
  { id: "b6", slug: "bug-hunter", title: "Bug Hunter", description: "Reported 3 valid bugs", iconUrl: "/badges/bug-hunter.svg", rarity: "RARE", awardedCount: 67 },
  { id: "b7", slug: "first-blood", title: "First Blood", description: "First to complete a new lesson", iconUrl: "/badges/first-blood.svg", rarity: "COMMON", awardedCount: 2345 },
  { id: "b8", slug: "mentor", title: "Mentor", description: "Helped 50 learners through comments", iconUrl: "/badges/mentor.svg", rarity: "LEGENDARY", awardedCount: 23 },
];

export const mockRecentActivity: UserActivity[] = [
  { id: "act1", text: "New user maria.santos signed up via Google", xp: "", time: "30 min ago", type: "enrollment" },
  { id: "act2", text: "juandc completed 'For Loops' (Hard) — Python Fundamentals", xp: "+150 XP", time: "45 min ago", type: "completion" },
  { id: "act3", text: "anareyes earned 'Streak Master' achievement", xp: "+500 XP", time: "1h ago", type: "achievement" },
  { id: "act4", text: "gracetan reached Level 23", xp: "", time: "2h ago", type: "rank" },
  { id: "act5", text: "miguelr started a 20-day streak", xp: "+100 XP", time: "3h ago", type: "streak" },
];

export const mockDailySignups: DailySignup[] = [
  { date: "Feb 3", count: 38 },
  { date: "Feb 4", count: 42 },
  { date: "Feb 5", count: 35 },
  { date: "Feb 6", count: 51 },
  { date: "Feb 7", count: 44 },
  { date: "Feb 8", count: 56 },
  { date: "Feb 9", count: 47 },
];

// ─── Extended Chart Data ─────────────────────────────────────────────────────

export interface ChartPoint {
  name: string;
  value: number;
  prev?: number;
}

export interface MultiSeriesPoint {
  name: string;
  [key: string]: string | number;
}

// 30-day user growth trend
export const mockUserGrowthTrend: MultiSeriesPoint[] = [
  { name: "Jan 11", users: 10240, active: 3100 },
  { name: "Jan 13", users: 10380, active: 3150 },
  { name: "Jan 15", users: 10520, active: 3200 },
  { name: "Jan 17", users: 10680, active: 3280 },
  { name: "Jan 19", users: 10850, active: 3320 },
  { name: "Jan 21", users: 10990, active: 3400 },
  { name: "Jan 23", users: 11150, active: 3500 },
  { name: "Jan 25", users: 11340, active: 3580 },
  { name: "Jan 27", users: 11520, active: 3650 },
  { name: "Jan 29", users: 11700, active: 3720 },
  { name: "Jan 31", users: 11890, active: 3800 },
  { name: "Feb 2", users: 12100, active: 3900 },
  { name: "Feb 4", users: 12320, active: 4020 },
  { name: "Feb 6", users: 12540, active: 4100 },
  { name: "Feb 8", users: 12720, active: 4180 },
  { name: "Feb 9", users: 12847, active: 4231 },
];

// DAU/MAU over 30 days
export const mockDAUTrend: MultiSeriesPoint[] = [
  { name: "Jan 11", dau: 1520, mau: 7200 },
  { name: "Jan 14", dau: 1580, mau: 7350 },
  { name: "Jan 17", dau: 1620, mau: 7500 },
  { name: "Jan 20", dau: 1690, mau: 7650 },
  { name: "Jan 23", dau: 1710, mau: 7800 },
  { name: "Jan 26", dau: 1740, mau: 7900 },
  { name: "Jan 29", dau: 1780, mau: 8000 },
  { name: "Feb 1", dau: 1800, mau: 8050 },
  { name: "Feb 4", dau: 1820, mau: 8120 },
  { name: "Feb 7", dau: 1840, mau: 8200 },
  { name: "Feb 9", dau: 1847, mau: 8234 },
];

// XP awarded per day (last 14 days)
export const mockXpTrend: ChartPoint[] = [
  { name: "Jan 27", value: 42500 },
  { name: "Jan 28", value: 38900 },
  { name: "Jan 29", value: 45200 },
  { name: "Jan 30", value: 41800 },
  { name: "Jan 31", value: 47300 },
  { name: "Feb 1", value: 35600 },
  { name: "Feb 2", value: 32100 },
  { name: "Feb 3", value: 44800 },
  { name: "Feb 4", value: 46200 },
  { name: "Feb 5", value: 43100 },
  { name: "Feb 6", value: 48700 },
  { name: "Feb 7", value: 45900 },
  { name: "Feb 8", value: 51200 },
  { name: "Feb 9", value: 39800 },
];

// Lesson completions per day
export const mockCompletionsTrend: ChartPoint[] = [
  { name: "Jan 27", value: 285 },
  { name: "Jan 28", value: 312 },
  { name: "Jan 29", value: 298 },
  { name: "Jan 30", value: 325 },
  { name: "Jan 31", value: 340 },
  { name: "Feb 1", value: 220 },
  { name: "Feb 2", value: 195 },
  { name: "Feb 3", value: 310 },
  { name: "Feb 4", value: 328 },
  { name: "Feb 5", value: 305 },
  { name: "Feb 6", value: 345 },
  { name: "Feb 7", value: 332 },
  { name: "Feb 8", value: 365 },
  { name: "Feb 9", value: 290 },
];

// Funnel data
export const mockFunnelData: ChartPoint[] = [
  { name: "Signed Up", value: 12847 },
  { name: "First Lesson", value: 8432 },
  { name: "Enrolled Course", value: 6120 },
  { name: "Completed Level", value: 3890 },
  { name: "Completed Course", value: 1567 },
];

// Cohort retention (signup week → retention %)
export const mockCohortRetention = [
  { week: "Dec W1", w1: 100, w2: 72, w3: 58, w4: 48, w5: 42, w6: 38, w7: 35, w8: 33 },
  { week: "Dec W2", w1: 100, w2: 75, w3: 61, w4: 52, w5: 45, w6: 40, w7: 37, w8: 0 },
  { week: "Dec W3", w1: 100, w2: 70, w3: 55, w4: 46, w5: 40, w6: 36, w7: 0, w8: 0 },
  { week: "Dec W4", w1: 100, w2: 73, w3: 60, w4: 50, w5: 43, w6: 0, w7: 0, w8: 0 },
  { week: "Jan W1", w1: 100, w2: 76, w3: 63, w4: 53, w5: 0, w6: 0, w7: 0, w8: 0 },
  { week: "Jan W2", w1: 100, w2: 74, w3: 59, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0 },
  { week: "Jan W3", w1: 100, w2: 71, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0 },
  { week: "Jan W4", w1: 100, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0 },
];

// Activity heatmap (day × hour)
export const mockActivityHeatmap = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data: { day: string; hour: number; value: number }[] = [];
  days.forEach((day) => {
    for (let h = 0; h < 24; h++) {
      const isWeekend = day === "Sat" || day === "Sun";
      const isPeak = h >= 19 && h <= 22;
      const isMorning = h >= 8 && h <= 11;
      const base = isWeekend ? 30 : 50;
      const peak = isPeak ? 80 : isMorning ? 40 : 0;
      const noise = Math.floor(Math.random() * 20);
      const nightPenalty = h >= 0 && h <= 5 ? -30 : 0;
      data.push({ day, hour: h, value: Math.max(0, base + peak + noise + nightPenalty) });
    }
  });
  return data;
})();

// Device breakdown
export const mockDeviceData: ChartPoint[] = [
  { name: "Mobile", value: 5842 },
  { name: "Desktop", value: 5478 },
  { name: "Tablet", value: 1527 },
];

// Browser breakdown
export const mockBrowserData: ChartPoint[] = [
  { name: "Chrome", value: 6420 },
  { name: "Safari", value: 2890 },
  { name: "Firefox", value: 1830 },
  { name: "Edge", value: 1205 },
  { name: "Other", value: 502 },
];

// Region breakdown
export const mockRegionData: ChartPoint[] = [
  { name: "NCR", value: 4230 },
  { name: "Region IV-A", value: 2150 },
  { name: "Region III", value: 1840 },
  { name: "Region VII", value: 1320 },
  { name: "Region XI", value: 980 },
  { name: "Region VI", value: 870 },
  { name: "Other", value: 1457 },
];

// XP distribution by level bracket
export const mockXpDistribution: ChartPoint[] = [
  { name: "0-1K", value: 3240 },
  { name: "1K-3K", value: 2890 },
  { name: "3K-5K", value: 2150 },
  { name: "5K-8K", value: 1820 },
  { name: "8K-12K", value: 1450 },
  { name: "12K-15K", value: 780 },
  { name: "15K+", value: 517 },
];

// Revenue mock (monthly)
export const mockRevenueTrend: MultiSeriesPoint[] = [
  { name: "Sep", revenue: 12400, subscribers: 248 },
  { name: "Oct", revenue: 15600, subscribers: 312 },
  { name: "Nov", revenue: 18200, subscribers: 364 },
  { name: "Dec", revenue: 16800, subscribers: 336 },
  { name: "Jan", revenue: 22400, subscribers: 448 },
  { name: "Feb", revenue: 24800, subscribers: 496 },
];

// Difficulty completion rates per course
export const mockDifficultyRates: MultiSeriesPoint[] = [
  { name: "Python", easy: 92, medium: 74, hard: 48 },
  { name: "JavaScript", easy: 89, medium: 68, hard: 42 },
  { name: "React", easy: 85, medium: 62, hard: 38 },
  { name: "TypeScript", easy: 82, medium: 58, hard: 35 },
  { name: "Node.js", easy: 80, medium: 55, hard: 30 },
  { name: "HTML/CSS", easy: 95, medium: 82, hard: 65 },
];

// ─── Real-Time Monitoring Data ────────────────────────────────────────────────

export interface RealtimeMetrics {
  activeUsers: number;
  activeSessions: number;
  codeExecutions: number;
  wsConnections: number;
  avgResponseMs: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  queueDepth: number;
}

export const mockRealtimeMetrics: RealtimeMetrics = {
  activeUsers: 342,
  activeSessions: 287,
  codeExecutions: 18,
  wsConnections: 156,
  avgResponseMs: 127,
  errorRate: 0.3,
  cpuUsage: 42,
  memoryUsage: 68,
  queueDepth: 5,
};

// Last 60 minutes of request throughput
export const mockRequestsPerMinute: ChartPoint[] = Array.from({ length: 60 }, (_, i) => ({
  name: `${59 - i}m`,
  value: Math.floor(80 + Math.random() * 120 + (i > 40 ? 40 : 0)),
})).reverse();

// Last 60 minutes of active users
export const mockActiveUsersTimeline: ChartPoint[] = Array.from({ length: 60 }, (_, i) => ({
  name: `${59 - i}m`,
  value: Math.floor(280 + Math.random() * 80 + (i > 30 ? 30 : 0)),
})).reverse();

// Response time percentiles (last hour)
export const mockResponseTimeP50: ChartPoint[] = Array.from({ length: 30 }, (_, i) => ({
  name: `${29 - i}m`,
  value: Math.floor(80 + Math.random() * 60),
})).reverse();

// Active courses right now
export const mockActiveCoursesNow = [
  { course: "Python Fundamentals", activeUsers: 124, currentLesson: "For Loops" },
  { course: "JavaScript Essentials", activeUsers: 89, currentLesson: "Functions" },
  { course: "React From Zero", activeUsers: 56, currentLesson: "Props & State" },
  { course: "HTML & CSS Basics", activeUsers: 42, currentLesson: "Forms" },
  { course: "TypeScript Mastery", activeUsers: 31, currentLesson: "Interfaces" },
];

// Live activity feed
export const mockLiveActivity = [
  { id: "la1", text: "mariasantos completed 'For Loops'", time: "just now", type: "completion" as const },
  { id: "la2", text: "juandc started 'Arrays & Objects'", time: "15s ago", type: "enrollment" as const },
  { id: "la3", text: "anareyes earned 'Code Warrior' badge", time: "32s ago", type: "achievement" as const },
  { id: "la4", text: "gracetan submitted code challenge #42", time: "1m ago", type: "completion" as const },
  { id: "la5", text: "miguelr reached Level 15", time: "1m ago", type: "rank" as const },
  { id: "la6", text: "beavill started 'Python Fundamentals'", time: "2m ago", type: "enrollment" as const },
  { id: "la7", text: "isacruz completed daily streak (12 days)", time: "2m ago", type: "streak" as const },
  { id: "la8", text: "New user signup: paulo.garcia@email.com", time: "3m ago", type: "enrollment" as const },
  { id: "la9", text: "chloew earned 'Perfect Score' achievement", time: "4m ago", type: "achievement" as const },
  { id: "la10", text: "danlim completed 'Variables & Types'", time: "5m ago", type: "completion" as const },
];

// Error log
export const mockRecentErrors = [
  { id: "e1", message: "Code execution timeout (Piston)", count: 3, lastSeen: "2m ago", severity: "warning" as const },
  { id: "e2", message: "Rate limit exceeded: /api/execute", count: 1, lastSeen: "8m ago", severity: "info" as const },
  { id: "e3", message: "Database connection pool exhausted", count: 0, lastSeen: "45m ago", severity: "error" as const },
  { id: "e4", message: "Redis cache miss ratio > 10%", count: 2, lastSeen: "12m ago", severity: "warning" as const },
];

// ─── Gamification Config Data ────────────────────────────────────────────────

export interface XpMultiplierConfig {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  baseXp: number;
  multiplier: number;
  effectiveXp: number;
}

export const mockXpMultipliers: XpMultiplierConfig[] = [
  { difficulty: "EASY", baseXp: 50, multiplier: 1.0, effectiveXp: 50 },
  { difficulty: "MEDIUM", baseXp: 50, multiplier: 2.0, effectiveXp: 100 },
  { difficulty: "HARD", baseXp: 50, multiplier: 3.0, effectiveXp: 150 },
];

export const mockStreakBonuses = [
  { days: 3, bonusXp: 25, label: "3-Day Streak" },
  { days: 7, bonusXp: 75, label: "Week Warrior" },
  { days: 14, bonusXp: 150, label: "Two Weeks Strong" },
  { days: 30, bonusXp: 500, label: "Monthly Master" },
  { days: 100, bonusXp: 2000, label: "Centurion" },
];

export const mockLevelThresholds = [
  { level: 1, xpRequired: 0 },
  { level: 2, xpRequired: 100 },
  { level: 5, xpRequired: 800 },
  { level: 10, xpRequired: 4000 },
  { level: 15, xpRequired: 10000 },
  { level: 20, xpRequired: 20000 },
  { level: 25, xpRequired: 35000 },
];

// Achievement unlock rate over time
export const mockAchievementUnlockTrend: MultiSeriesPoint[] = [
  { name: "Oct", learning: 320, mastery: 180, social: 90, streak: 60, special: 25 },
  { name: "Nov", learning: 410, mastery: 230, social: 120, streak: 85, special: 35 },
  { name: "Dec", learning: 480, mastery: 260, social: 145, streak: 110, special: 42 },
  { name: "Jan", learning: 560, mastery: 310, social: 175, streak: 140, special: 58 },
  { name: "Feb", learning: 620, mastery: 350, social: 200, streak: 165, special: 70 },
];

// Badge rarity distribution
export const mockBadgeRarityDistribution: ChartPoint[] = [
  { name: "Common", value: 5801 },
  { name: "Rare", value: 959 },
  { name: "Epic", value: 354 },
  { name: "Legendary", value: 68 },
];

// ─── Reports Data ────────────────────────────────────────────────────────────

export interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: "users" | "content" | "engagement" | "revenue";
  lastGenerated?: string;
  frequency?: "daily" | "weekly" | "monthly" | "on-demand";
}

export const mockReportTemplates: ReportTemplate[] = [
  { id: "rpt1", title: "User Growth Report", description: "New signups, active users, and churn metrics", category: "users", lastGenerated: "2026-02-09T06:00:00Z", frequency: "daily" },
  { id: "rpt2", title: "Content Performance", description: "Course enrollments, completion rates, and popular lessons", category: "content", lastGenerated: "2026-02-09T06:00:00Z", frequency: "weekly" },
  { id: "rpt3", title: "Engagement Summary", description: "XP awarded, streaks, achievements, and session metrics", category: "engagement", lastGenerated: "2026-02-03T06:00:00Z", frequency: "weekly" },
  { id: "rpt4", title: "Revenue Overview", description: "Subscription revenue, MRR, churn, and forecasting", category: "revenue", lastGenerated: "2026-02-01T06:00:00Z", frequency: "monthly" },
  { id: "rpt5", title: "Moderation Activity", description: "Reports handled, bans issued, and comment moderation", category: "users", lastGenerated: "2026-02-08T06:00:00Z", frequency: "daily" },
  { id: "rpt6", title: "Gamification Effectiveness", description: "Achievement unlock rates, badge distribution, and XP trends", category: "engagement", lastGenerated: "2026-01-31T06:00:00Z", frequency: "monthly" },
  { id: "rpt7", title: "Course Difficulty Analysis", description: "Completion rates by difficulty, dropout points, and time spent", category: "content", frequency: "on-demand" },
  { id: "rpt8", title: "User Retention Cohort", description: "Weekly cohort retention analysis with dropoff points", category: "users", lastGenerated: "2026-02-03T06:00:00Z", frequency: "weekly" },
];

export const mockScheduledExports = [
  { id: "exp1", name: "Weekly User CSV", format: "CSV", schedule: "Every Monday 6:00 AM", lastRun: "2026-02-03T06:00:00Z", status: "active" as const },
  { id: "exp2", name: "Monthly Revenue PDF", format: "PDF", schedule: "1st of month 8:00 AM", lastRun: "2026-02-01T08:00:00Z", status: "active" as const },
  { id: "exp3", name: "Daily Engagement JSON", format: "JSON", schedule: "Daily 12:00 AM", lastRun: "2026-02-09T00:00:00Z", status: "active" as const },
  { id: "exp4", name: "Quarterly Analytics", format: "PDF", schedule: "Quarterly", lastRun: "2026-01-01T06:00:00Z", status: "paused" as const },
];

// XP level curve (current vs ideal)
export const mockXpLevelCurve: MultiSeriesPoint[] = [
  { name: "1", current: 0, ideal: 0 },
  { name: "2", current: 100, ideal: 100 },
  { name: "3", current: 250, ideal: 300 },
  { name: "5", current: 800, ideal: 900 },
  { name: "8", current: 2200, ideal: 2500 },
  { name: "10", current: 4000, ideal: 4500 },
  { name: "12", current: 6500, ideal: 7200 },
  { name: "15", current: 10000, ideal: 12000 },
  { name: "18", current: 15000, ideal: 18500 },
  { name: "20", current: 20000, ideal: 25000 },
  { name: "25", current: 35000, ideal: 45000 },
];
