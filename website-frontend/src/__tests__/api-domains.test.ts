import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock Supabase client
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: { access_token: "test-token" } },
      }),
    },
  }),
}));

import {
  authApi,
  coursesApi,
  lessonsApi,
  gamificationApi,
  usersApi,
  leaderboardApi,
  onboardingApi,
  socialApi,
} from "@/lib/api";

function mockFetch(data: unknown = {}, status = 200) {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
    ok: true,
    status,
    json: () => Promise.resolve(data),
  });
}

describe("Domain API Wrappers", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("authApi", () => {
    it("getMe calls GET /api/v1/auth/me", async () => {
      const user = { id: "1", email: "test@test.com" };
      mockFetch(user);
      const result = await authApi.getMe();
      expect(result).toEqual(user);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/me"),
        expect.any(Object)
      );
    });

    it("registerSession calls POST /api/v1/auth/session", async () => {
      mockFetch({ sessionId: "s1" });
      await authApi.registerSession();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/session"),
        expect.objectContaining({ method: "POST" })
      );
    });

    it("logout calls POST /api/v1/auth/logout", async () => {
      mockFetch(undefined, 204);
      await authApi.logout();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/logout"),
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  describe("coursesApi", () => {
    it("findAll calls GET /api/v1/courses", async () => {
      mockFetch([]);
      await coursesApi.findAll();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/courses"),
        expect.any(Object)
      );
    });

    it("findAll with filters appends query params", async () => {
      mockFetch([]);
      await coursesApi.findAll({ search: "python", difficulty: "Beginner" });
      const calledUrl = (global.fetch as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as string;
      expect(calledUrl).toContain("search=python");
      expect(calledUrl).toContain("difficulty=Beginner");
    });

    it("findBySlug calls GET /api/v1/courses/:slug", async () => {
      mockFetch({ slug: "python" });
      await coursesApi.findBySlug("python");
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/courses/python"),
        expect.any(Object)
      );
    });

    it("start calls POST /api/v1/courses/:slug/start", async () => {
      mockFetch({ success: true });
      await coursesApi.start("python");
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/courses/python/start"),
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  describe("lessonsApi", () => {
    it("findById calls GET /api/v1/lessons/:id", async () => {
      mockFetch({ id: "l1" });
      await lessonsApi.findById("l1");
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/lessons/l1"),
        expect.any(Object)
      );
    });

    it("complete calls POST /api/v1/lessons/:id/complete", async () => {
      mockFetch({ xpAwarded: 100 });
      await lessonsApi.complete("l1", { difficulty: "EASY" });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/lessons/l1/complete"),
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  describe("gamificationApi", () => {
    it("getProfile calls GET /api/v1/gamification/profile", async () => {
      mockFetch({ xpTotal: 500 });
      await gamificationApi.getProfile();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/gamification/profile"),
        expect.any(Object)
      );
    });

    it("claimDailyBonus calls POST /api/v1/gamification/daily-claim", async () => {
      mockFetch({ xpAwarded: 50 });
      await gamificationApi.claimDailyBonus();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/gamification/daily-claim"),
        expect.objectContaining({ method: "POST" })
      );
    });

    it("getAchievements with filters appends query params", async () => {
      mockFetch([]);
      await gamificationApi.getAchievements({
        category: "learning",
        unlocked: true,
      });
      const calledUrl = (global.fetch as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as string;
      expect(calledUrl).toContain("category=learning");
      expect(calledUrl).toContain("unlocked=true");
    });
  });

  describe("usersApi", () => {
    it("getProfile calls GET /api/v1/users/me/profile", async () => {
      mockFetch({ id: "1" });
      await usersApi.getProfile();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/users/me/profile"),
        expect.any(Object)
      );
    });

    it("updateSettings calls PATCH /api/v1/users/me/settings", async () => {
      mockFetch({});
      await usersApi.updateSettings({ language: "fil" });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/users/me/settings"),
        expect.objectContaining({ method: "PATCH" })
      );
    });
  });

  describe("leaderboardApi", () => {
    it("getGlobal with pagination appends query params", async () => {
      mockFetch({ entries: [] });
      await leaderboardApi.getGlobal({ page: 2, limit: 10 });
      const calledUrl = (global.fetch as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as string;
      expect(calledUrl).toContain("page=2");
      expect(calledUrl).toContain("limit=10");
    });
  });

  describe("onboardingApi", () => {
    it("getStatus calls GET /api/v1/users/onboarding/status", async () => {
      mockFetch({ onboardingCompleted: false });
      await onboardingApi.getStatus();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/users/onboarding/status"),
        expect.any(Object)
      );
    });

    it("complete calls PUT /api/v1/users/onboarding/complete", async () => {
      mockFetch({ success: true, xpAwarded: 100 });
      await onboardingApi.complete({
        displayName: "John",
        interestedLanguages: ["python"],
        skillLevel: "beginner",
        learningGoals: ["career"],
        dailyCommitmentMins: 30,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/users/onboarding/complete"),
        expect.objectContaining({ method: "PUT" })
      );
    });

    it("skip calls PUT /api/v1/users/onboarding/skip", async () => {
      mockFetch({ success: true });
      await onboardingApi.skip();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/users/onboarding/skip"),
        expect.objectContaining({ method: "PUT" })
      );
    });
  });

  describe("socialApi", () => {
    it("getFeed calls GET /api/v1/social/feed", async () => {
      mockFetch({ activities: [], total: 0 });
      await socialApi.getFeed({ limit: 10 });
      const calledUrl = (global.fetch as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as string;
      expect(calledUrl).toContain("/api/v1/social/feed");
      expect(calledUrl).toContain("limit=10");
    });
  });
});
