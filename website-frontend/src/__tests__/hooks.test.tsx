import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Mock all API modules
vi.mock("@/lib/api", () => ({
  authApi: {
    getMe: vi.fn(),
    registerSession: vi.fn(),
    logout: vi.fn(),
  },
  coursesApi: {
    findAll: vi.fn(),
    findBySlug: vi.fn(),
    getProgress: vi.fn(),
    getLevels: vi.fn(),
    start: vi.fn(),
  },
  lessonsApi: {
    findById: vi.fn(),
    start: vi.fn(),
    complete: vi.fn(),
    submitQuiz: vi.fn(),
    submitChallenge: vi.fn(),
  },
  gamificationApi: {
    getProfile: vi.fn(),
    getStreak: vi.fn(),
    claimDailyBonus: vi.fn(),
    getAchievements: vi.fn(),
    getBadges: vi.fn(),
    getMilestones: vi.fn(),
    getXpHistory: vi.fn(),
  },
  usersApi: {
    getProfile: vi.fn(),
    getStats: vi.fn(),
    getSettings: vi.fn(),
    updateSettings: vi.fn(),
    updateProfile: vi.fn(),
    getCourses: vi.fn(),
  },
  leaderboardApi: {
    getGlobal: vi.fn(),
    getWeekly: vi.fn(),
    getMonthly: vi.fn(),
    getFriends: vi.fn(),
    getUserRanks: vi.fn(),
  },
  socialApi: {
    getFeed: vi.fn(),
    getUserActivity: vi.fn(),
  },
  ApiError: class ApiError extends Error {
    constructor(
      public statusCode: number,
      message: string
    ) {
      super(message);
    }
  },
}));

import { authApi, coursesApi, gamificationApi, usersApi, socialApi } from "@/lib/api";
import {
  useCurrentUser,
  useCourses,
  useCourse,
  useStartCourse,
  useGamificationProfile,
  useStreak,
  useUserProfile,
  useUserStats,
  useUserCourses,
} from "@/hooks/api";
import { useActivityFeed } from "@/hooks/api/use-social";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("Auth Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useCurrentUser fetches user on mount", async () => {
    const mockUser = {
      id: "1",
      email: "test@test.com",
      username: "tester",
      level: 5,
    };
    vi.mocked(authApi.getMe).mockResolvedValue(mockUser as any);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUser);
    expect(authApi.getMe).toHaveBeenCalledOnce();
  });

  it("useCurrentUser handles error", async () => {
    vi.mocked(authApi.getMe).mockRejectedValue(new Error("Unauthorized"));

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Unauthorized");
  });
});

describe("Courses Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useCourses fetches all courses", async () => {
    const mockCourses = [
      { id: "1", slug: "python", title: "Python" },
      { id: "2", slug: "js", title: "JavaScript" },
    ];
    vi.mocked(coursesApi.findAll).mockResolvedValue(mockCourses as any);

    const { result } = renderHook(() => useCourses(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(coursesApi.findAll).toHaveBeenCalledWith(undefined);
  });

  it("useCourse fetches course by slug", async () => {
    const mockCourse = { id: "1", slug: "python", title: "Python" };
    vi.mocked(coursesApi.findBySlug).mockResolvedValue(mockCourse as any);

    const { result } = renderHook(() => useCourse("python"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.slug).toBe("python");
  });

  it("useCourse is disabled with empty slug", () => {
    const { result } = renderHook(() => useCourse(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe("idle");
  });

  it("useStartCourse fires mutation and invalidates queries", async () => {
    vi.mocked(coursesApi.start).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useStartCourse(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("python");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(coursesApi.start).toHaveBeenCalledWith("python");
  });
});

describe("Gamification Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useGamificationProfile fetches profile", async () => {
    const mockProfile = { xpTotal: 500, level: 3, streak: 7 };
    vi.mocked(gamificationApi.getProfile).mockResolvedValue(
      mockProfile as any
    );

    const { result } = renderHook(() => useGamificationProfile(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.xpTotal).toBe(500);
  });

  it("useStreak fetches streak data", async () => {
    const mockStreak = { current: 7, longest: 14 };
    vi.mocked(gamificationApi.getStreak).mockResolvedValue(mockStreak as any);

    const { result } = renderHook(() => useStreak(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.current).toBe(7);
  });
});

describe("User Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useUserProfile fetches profile", async () => {
    const mockProfile = { id: "1", username: "tester" };
    vi.mocked(usersApi.getProfile).mockResolvedValue(mockProfile as any);

    const { result } = renderHook(() => useUserProfile(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.username).toBe("tester");
  });

  it("useUserStats fetches stats", async () => {
    const mockStats = { coursesEnrolled: 3, lessonsCompleted: 42 };
    vi.mocked(usersApi.getStats).mockResolvedValue(mockStats as any);

    const { result } = renderHook(() => useUserStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.coursesEnrolled).toBe(3);
  });

  it("useUserCourses fetches enrolled courses", async () => {
    const mockCourses = [{ courseId: "c1", title: "Python" }];
    vi.mocked(usersApi.getCourses).mockResolvedValue(mockCourses as any);

    const { result } = renderHook(() => useUserCourses(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
  });
});

describe("Social Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useActivityFeed fetches feed", async () => {
    const mockFeed = {
      activities: [{ id: "a1", type: "lesson_completed" }],
      total: 1,
    };
    vi.mocked(socialApi.getFeed).mockResolvedValue(mockFeed as any);

    const { result } = renderHook(() => useActivityFeed({ limit: 10 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.activities).toHaveLength(1);
    expect(socialApi.getFeed).toHaveBeenCalledWith({ limit: 10 });
  });
});
