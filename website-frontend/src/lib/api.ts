import { createClient } from "@/lib/supabase/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getAuthToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      message: res.statusText,
    }));
    throw new ApiError(
      res.status,
      error.message || `API error: ${res.status}`,
      error.code,
      error.details
    );
  }

  // Handle 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authApi = {
  getMe: () => api.get<AuthUserProfile>("/api/v1/auth/me"),
  registerSession: () => api.post<SessionInfo>("/api/v1/auth/session"),
  logout: () => api.post<void>("/api/v1/auth/logout"),
};

// ─── Courses API ──────────────────────────────────────────────────────────────

export const coursesApi = {
  findAll: (params?: { search?: string; difficulty?: string; topic?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.difficulty) query.set("difficulty", params.difficulty);
    if (params?.topic) query.set("topic", params.topic);
    const qs = query.toString();
    return api.get<CourseListItem[]>(`/api/v1/courses${qs ? `?${qs}` : ""}`);
  },
  findBySlug: (slug: string) =>
    api.get<CourseDetail>(`/api/v1/courses/${slug}`),
  getProgress: (slug: string) =>
    api.get<CourseProgress>(`/api/v1/courses/${slug}/progress`),
  getLevels: (slug: string) =>
    api.get<CourseLevel[]>(`/api/v1/courses/${slug}/levels`),
  start: (slug: string) =>
    api.post<{ success: boolean }>(`/api/v1/courses/${slug}/start`),
};

// ─── Lessons API ──────────────────────────────────────────────────────────────

export const lessonsApi = {
  findById: (id: string) => api.get<LessonDetail>(`/api/v1/lessons/${id}`),
  findBySlug: (slug: string, difficulty?: string) => {
    const qs = difficulty ? `?difficulty=${difficulty}` : "";
    return api.get<LessonDetail>(`/api/v1/lessons/by-slug/${slug}${qs}`);
  },
  start: (id: string) =>
    api.post<StartLessonResponse>(`/api/v1/lessons/${id}/start`),
  complete: (id: string, data: { score?: number; timeSpentSeconds?: number }) =>
    api.post<CompleteLessonResponse>(`/api/v1/lessons/${id}/complete`, data),
  submitQuiz: (lessonId: string, data: { answers: Record<string, string> }) =>
    api.post<QuizSubmitResponse>(`/api/v1/lessons/${lessonId}/quiz/submit`, data),
  submitChallenge: (
    lessonId: string,
    challengeId: string,
    data: { code: string; languageId: number; timeSpentSeconds?: number }
  ) =>
    api.post<ChallengeSubmitResponse>(
      `/api/v1/lessons/${lessonId}/challenges/${challengeId}/submit`,
      data
    ),
};

// ─── Gamification API ─────────────────────────────────────────────────────────

export const gamificationApi = {
  getProfile: () =>
    api.get<GamificationProfile>("/api/v1/gamification/profile"),
  getStreak: () => api.get<StreakInfo>("/api/v1/gamification/streak"),
  claimDailyBonus: () =>
    api.post<DailyBonusResponse>("/api/v1/gamification/daily-claim"),
  getAchievements: (params?: { category?: string; unlocked?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.unlocked !== undefined)
      query.set("unlocked", String(params.unlocked));
    const qs = query.toString();
    return api.get<AchievementItem[]>(
      `/api/v1/gamification/achievements${qs ? `?${qs}` : ""}`
    );
  },
  getBadges: () => api.get<BadgeItem[]>("/api/v1/gamification/badges"),
  getMilestones: () =>
    api.get<MilestoneItem[]>("/api/v1/gamification/milestones"),
  getXpHistory: (params?: { limit?: number; offset?: number }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.offset) query.set("offset", String(params.offset));
    const qs = query.toString();
    return api.get<XpHistoryResponse>(
      `/api/v1/gamification/xp-history${qs ? `?${qs}` : ""}`
    );
  },
};

// ─── Users API ────────────────────────────────────────────────────────────────

export const usersApi = {
  getProfile: () => api.get<UserProfile>("/api/v1/users/me/profile"),
  getStats: () => api.get<UserStats>("/api/v1/users/me/stats"),
  getSettings: () => api.get<UserSettings>("/api/v1/users/me/settings"),
  updateSettings: (data: Partial<UserSettings>) =>
    api.patch<UserSettings>("/api/v1/users/me/settings", data),
  updateProfile: (data: Partial<UserProfile>) =>
    api.patch<UserProfile>("/api/v1/users/me/profile", data),
  getCourses: () => api.get<UserCourseEntry[]>("/api/v1/users/me/courses"),
  completeOnboarding: (data: Record<string, unknown>) =>
    api.post("/api/v1/users/me/onboarding", data),
};

// ─── Leaderboard API ──────────────────────────────────────────────────────────

export const leaderboardApi = {
  getGlobal: (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return api.get<LeaderboardResponse>(
      `/api/v1/leaderboards/global${qs ? `?${qs}` : ""}`
    );
  },
  getWeekly: () =>
    api.get<LeaderboardResponse>("/api/v1/leaderboards/weekly"),
  getMonthly: () =>
    api.get<LeaderboardResponse>("/api/v1/leaderboards/monthly"),
  getFriends: () =>
    api.get<LeaderboardResponse>("/api/v1/leaderboards/friends"),
  getCourse: (courseId: string) =>
    api.get<LeaderboardResponse>(`/api/v1/leaderboards/course/${courseId}`),
  getUserRanks: () => api.get<UserRanks>("/api/v1/leaderboards/me/ranks"),
};

// ─── Onboarding API ──────────────────────────────────────────────────────────

export const onboardingApi = {
  getStatus: () =>
    api.get<OnboardingStatus>("/api/v1/users/onboarding/status"),
  complete: (data: CompleteOnboardingPayload) =>
    api.put<{ success: boolean; xpAwarded: number }>(
      "/api/v1/users/onboarding/complete",
      data
    ),
  skip: () =>
    api.put<{ success: boolean }>("/api/v1/users/onboarding/skip"),
};

// ─── Social / Activity Feed API ─────────────────────────────────────────────

export const socialApi = {
  getFeed: (params?: { limit?: number; offset?: number; type?: string }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.offset) query.set("offset", String(params.offset));
    if (params?.type) query.set("type", params.type);
    const qs = query.toString();
    return api.get<ActivityFeedResponse>(
      `/api/v1/social/feed${qs ? `?${qs}` : ""}`
    );
  },
  getUserActivity: (
    username: string,
    params?: { limit?: number; offset?: number }
  ) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.offset) query.set("offset", String(params.offset));
    const qs = query.toString();
    return api.get<ActivityFeedResponse>(
      `/api/v1/social/users/${username}/activity${qs ? `?${qs}` : ""}`
    );
  },
};

// ─── Recommendation API ──────────────────────────────────────────────────────

export const recommendationApi = {
  submitAssessment: (data: AssessmentPayload) =>
    api.post<AssessmentResponse>("/api/v1/recommendations/assess", data),
  getProfile: () =>
    api.get<LearningProfile>("/api/v1/recommendations/profile"),
  getRecommendedPaths: () =>
    api.get<{ recommendations: PathRecommendation[] }>(
      "/api/v1/recommendations/paths"
    ),
  getNextLesson: () =>
    api.get<NextLessonResponse>("/api/v1/recommendations/next-lesson"),
  recalibrate: () =>
    api.post<RecalibrateResponse>("/api/v1/recommendations/recalibrate"),
  dismissRecommendation: (id: string) =>
    api.post(`/api/v1/recommendations/dismiss/${id}`),
  getCollaborativeRecs: () =>
    api.get<CollaborativeRec[]>("/api/v1/recommendations/similar-users"),
  generateStudyPlan: (data: {
    careerPathId?: string;
    dailyMinutes?: number;
  }) =>
    api.post<StudyPlanResponse>("/api/v1/recommendations/study-plan", data),
  getStudyPlan: () =>
    api.get<StudyPlanResponse>("/api/v1/recommendations/study-plan"),
  getTodayPlan: () =>
    api.get<TodayPlanResponse>("/api/v1/recommendations/study-plan/today"),
  completeItem: (itemId: string) =>
    api.post(
      `/api/v1/recommendations/study-plan/items/${itemId}/complete`
    ),
  updatePlan: (
    planId: string,
    data: { status?: string; dailyMinutes?: number }
  ) =>
    api.patch(`/api/v1/recommendations/study-plan/${planId}`, data),
};

export const careerPathApi = {
  getAll: () => api.get<CareerPathListItem[]>("/api/v1/career-paths"),
  getBySlug: (slug: string) =>
    api.get<CareerPathDetail>("/api/v1/career-paths/" + slug),
  enroll: (slug: string) =>
    api.post<EnrollResponse>(`/api/v1/career-paths/${slug}/enroll`),
  getProgress: (slug: string) =>
    api.get<CareerPathProgress>(`/api/v1/career-paths/${slug}/progress`),
  getUserPaths: () =>
    api.get<UserCareerPathEntry[]>("/api/v1/career-paths/user/enrolled"),
};

// ─── Types ──────────────────────────────────────────────────────────────────

// Auth types
export interface AuthUserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  xpTotal: number;
  level: number;
  streakCurrent: number;
  role: string;
  createdAt: string;
}

export interface SessionInfo {
  sessionId: string;
  expiresAt: string;
}

// Course types
export interface CourseListItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  language: string;
  icon: string;
  color: string;
  difficulty: string;
  topics: string[];
  lessons: number;
  hours: number;
  rating: number;
  students: number;
}

export interface CourseDetail extends CourseListItem {
  longDescription: string;
  learningOutcomes: string[];
  prerequisites: string[];
  syllabus: CourseSyllabusModule[];
  instructor?: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    courses: number;
    students: number;
  };
  reviews?: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface CourseSyllabusModule {
  title: string;
  lessons: number;
  description?: string;
  lessonList?: {
    title: string;
    topics?: { title: string; duration: string; type: string }[];
  }[];
}

export interface CourseProgress {
  courseId: string;
  completionPercentage: number;
  completedLessons: number;
  totalLessons: number;
  currentLessonId?: string;
  currentLessonTitle?: string;
  xpEarned: number;
  startedAt: string;
  lastActivityAt: string;
}

export interface CourseLevel {
  id: string;
  title: string;
  orderIndex: number;
  lessons: {
    id: string;
    title: string;
    slug: string;
    orderIndex: number;
    isCompleted: boolean;
  }[];
  isUnlocked: boolean;
}

// Lesson types
export interface LessonDetail {
  id: string;
  slug: string;
  title: string;
  content: {
    theoryCards: {
      id: string;
      title: string;
      content: string;
      codeExample?: string;
      tip?: string;
    }[];
    quizQuestions: {
      type: string;
      id: string;
      question: string;
      options?: string[];
      correctIndex?: number;
      correctAnswer?: string | boolean;
      codeTemplate?: string;
      lines?: string[];
      correctOrder?: number[];
      explanation: string;
      hint?: string;
    }[];
  };
  difficulty: string;
  xpReward: number;
  estimatedTimeMinutes: number | null;
  orderIndex: number;
  courseSlug: string;
  courseTitle: string;
  language: string;
  level: { id: string; slug: string; title: string };
  quizzes: {
    id: string;
    type: string;
    question: string;
    options?: unknown;
    explanation?: string | null;
    orderIndex: number;
  }[];
  challenges: {
    id: string;
    title: string;
    description: string;
    starterCode?: string | null;
    languageId: number;
  }[];
  testCases: { input: string; expectedOutput: string; description?: string }[];
  hints: string[];
  tiers: { difficulty: string; xpMultiplier: number; starterCode: string; description: string }[];
  previousLesson: { id: string; slug: string; title: string } | null;
  nextLesson: { id: string; slug: string; title: string } | null;
  userProgress: {
    status: string;
    score?: number | null;
    xpEarned: number;
    timeSpentSeconds?: number | null;
    completedAt?: string | null;
  } | null;
}

export interface StartLessonResponse {
  success: boolean;
  lessonId: string;
  startedAt: string;
}

export interface CompleteLessonResponse {
  success: boolean;
  xpAwarded: number;
  multiplier: number;
  totalXp: number;
  newLevel?: number;
  achievementsUnlocked?: { id: string; name: string; icon: string }[];
  streakUpdated: boolean;
  currentStreak: number;
}

export interface QuizSubmitResponse {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  xpAwarded: number;
  feedback: { questionId: string; correct: boolean; explanation?: string }[];
}

export interface ChallengeSubmitResponse {
  success: boolean;
  output: string;
  executionTime: number;
  memoryUsed: number;
  testResults: { input: string; expected: string; actual: string; passed: boolean }[];
  allPassed: boolean;
  xpAwarded: number;
}

// Gamification types
export interface GamificationProfile {
  xpTotal: number;
  level: number;
  xpToNextLevel: number;
  xpProgress: number;
  streak: number;
  longestStreak: number;
  rank: number;
  achievementsCount: number;
  badgesCount: number;
}

export interface StreakInfo {
  current: number;
  longest: number;
  lastActivityDate: string;
  dailyBonusClaimed: boolean;
  streakFreezeAvailable: boolean;
}

export interface DailyBonusResponse {
  xpAwarded: number;
  currentStreak: number;
  message: string;
}

export interface AchievementItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  maxProgress: number;
  xpReward: number;
  rarity: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: string;
  earned: boolean;
  earnedAt: string | null;
  category: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  completedAt: string | null;
  xpReward: number;
}

export interface XpHistoryResponse {
  entries: {
    id: string;
    amount: number;
    source: string;
    description: string;
    createdAt: string;
  }[];
  total: number;
}

// User types
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  xpTotal: number;
  level: number;
  streakCurrent: number;
  joinedAt: string;
}

export interface UserStats {
  coursesEnrolled: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  challengesCompleted: number;
  totalXp: number;
  achievementsUnlocked: number;
  badgesEarned: number;
  rank: number;
  totalUsers: number;
}

export interface UserSettings {
  language: string;
  theme: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  profileVisibility: string;
  dailyGoalMinutes: number;
}

export interface UserCourseEntry {
  id: string;
  courseId: string;
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
  difficulty: string;
}

// Leaderboard types
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

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  total: number;
  currentUserRank?: number;
}

export interface UserRanks {
  global: number;
  weekly: number;
  monthly: number;
  totalUsers: number;
}

// Recommendation types (kept from original)
export interface AssessmentPayload {
  motivation: string[];
  dreamProject?: string[];
  subjectInterests?: string[];
  personalityType?: string;
  industryInterests: string[];
  workStyle: string;
  mathComfort?: string;
  dailyRoutine?: string;
  timeHorizon: string;
  background: string;
  contentPreference?: string;
  analyticalScore: number;
  contextProfile: string;
  dailyCommitmentMins?: number;
}

export interface LearningProfile {
  id: string;
  motivation: string[];
  dreamProject?: string[];
  subjectInterests?: string[];
  personalityType?: string;
  industryInterests: string[];
  workStyle: string;
  mathComfort?: string;
  dailyRoutine?: string;
  timeHorizon: string;
  background: string;
  contentPreference?: string;
  analyticalScore: number;
  contextProfile: string;
  difficultyScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScoreBreakdown {
  interestAlignment: number;
  goalAlignment: number;
  dreamProjectAlignment: number;
  personalityFit: number;
  skillGap: number;
  timeViability: number;
  marketDemand: number;
  communityPopularity: number;
  cognitiveMatch: number;
}

export interface PathRecommendation {
  id: string;
  slug: string;
  title: string;
  description: string;
  industry: string;
  estimatedHours: number;
  score: number;
  matchPercentage: number;
  scoreBreakdown: ScoreBreakdown;
  rank: number;
  marketDemand: number;
  color?: string;
  iconUrl?: string;
}

export interface AssessmentResponse {
  profile: LearningProfile;
  recommendedPaths: PathRecommendation[];
  totalPathsScored: number;
}

export interface NextLessonResponse {
  lessons: {
    lessonId: string;
    title: string;
    recommendedDifficulty: string;
    courseSlug: string;
    courseTitle: string;
    reason: string;
    estimatedXp: number;
    estimatedMinutes: number;
  }[];
  totalEstimatedMinutes: number;
  currentDifficultyLevel: string;
  difficultyScore: number;
  nudgeMessage?: string;
}

export interface RecalibrateResponse {
  previousScore: number;
  newScore: number;
  previousDifficulty: string;
  newDifficulty: string;
  explanation: string;
}

export interface CollaborativeRec {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  courseLanguage: string;
  score: number;
  recommendedBy: number;
}

export interface StudyPlanItem {
  id: string;
  dayNumber: number;
  type: "LEARN" | "REVIEW" | "CHALLENGE" | "REST" | "MILESTONE";
  title?: string;
  description?: string;
  estimatedMins: number;
  lessonId?: string;
  courseId?: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface StudyPlanResponse {
  id: string;
  title?: string;
  status: string;
  dailyMinutes: number;
  totalDays: number;
  completedDays: number;
  completionPercentage: number;
  startDate: string;
  endDate?: string;
  upcomingItems: StudyPlanItem[];
  message?: string;
}

export interface TodayPlanResponse {
  dayNumber: number;
  items: StudyPlanItem[];
  totalEstimatedMins: number;
  completedCount: number;
  totalCount: number;
  motivationalMessage?: string;
  message?: string;
}

export interface CareerPathListItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  industry: string;
  estimatedHours: number;
  marketDemand: number;
  totalNodes: number;
  enrollmentCount: number;
  color?: string;
  iconUrl?: string;
}

export interface PathNodeDetail {
  id: string;
  skillName: string;
  description?: string;
  orderIndex: number;
  isRequired: boolean;
  estimatedHours: number;
  courseId?: string;
  courseSlug?: string;
  courseTitle?: string;
  prerequisiteIds: string[];
  isCompleted?: boolean;
}

export interface CareerPathDetail extends CareerPathListItem {
  salaryImpact: number;
  analyticalReq: number;
  outcomes: string[];
  nodes: PathNodeDetail[];
}

export interface CareerPathProgress {
  careerPathId: string;
  title: string;
  status: string;
  completionPercentage: number;
  nodesCompleted: number;
  totalNodes: number;
  currentNodeId?: string;
  currentNodeName?: string;
  startedAt: string;
  completedAt?: string;
  nodes: PathNodeDetail[];
}

export interface EnrollResponse {
  success: boolean;
  careerPathId: string;
  title: string;
  firstNodeId?: string;
  firstNodeName?: string;
  firstCourseSlug?: string;
}

export interface UserCareerPathEntry {
  careerPathId: string;
  title: string;
  status: string;
  currentNodeId?: string;
  startedAt: string;
  totalNodes: number;
}

// Onboarding types
export interface OnboardingStatus {
  onboardingCompleted: boolean;
  completedAt?: string;
}

export interface CompleteOnboardingPayload {
  displayName: string;
  avatarPreset?: string;
  interestedLanguages: string[];
  skillLevel: string;
  learningGoals: string[];
  dailyCommitmentMins: number;
}

// Social / Activity Feed types
export interface ActivityFeedItem {
  id: string;
  type: string;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  data: Record<string, unknown>;
  createdAt: string;
}

export interface ActivityFeedResponse {
  activities: ActivityFeedItem[];
  total: number;
}
