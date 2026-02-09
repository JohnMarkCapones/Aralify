const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("aralify-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
};

// ─── Recommendation API ─────────────────────────────────────────────────────

export const recommendationApi = {
  submitAssessment: (data: AssessmentPayload) =>
    api.post<AssessmentResponse>("/api/v1/recommendations/assess", data),
  getProfile: () =>
    api.get<LearningProfile>("/api/v1/recommendations/profile"),
  getRecommendedPaths: () =>
    api.get<{ recommendations: PathRecommendation[] }>("/api/v1/recommendations/paths"),
  getNextLesson: () =>
    api.get<NextLessonResponse>("/api/v1/recommendations/next-lesson"),
  recalibrate: () =>
    api.post<RecalibrateResponse>("/api/v1/recommendations/recalibrate"),
  dismissRecommendation: (id: string) =>
    api.post(`/api/v1/recommendations/dismiss/${id}`),
  getCollaborativeRecs: () =>
    api.get<CollaborativeRec[]>("/api/v1/recommendations/similar-users"),
  generateStudyPlan: (data: { careerPathId?: string; dailyMinutes?: number }) =>
    api.post<StudyPlanResponse>("/api/v1/recommendations/study-plan", data),
  getStudyPlan: () =>
    api.get<StudyPlanResponse>("/api/v1/recommendations/study-plan"),
  getTodayPlan: () =>
    api.get<TodayPlanResponse>("/api/v1/recommendations/study-plan/today"),
  completeItem: (itemId: string) =>
    api.post(`/api/v1/recommendations/study-plan/items/${itemId}/complete`),
  updatePlan: (planId: string, data: { status?: string; dailyMinutes?: number }) =>
    api.patch(`/api/v1/recommendations/study-plan/${planId}`, data),
};

export const careerPathApi = {
  getAll: () =>
    api.get<CareerPathListItem[]>("/api/v1/career-paths"),
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
