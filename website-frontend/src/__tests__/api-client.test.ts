import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock Supabase client before importing api
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: { access_token: "test-token-123" } },
      }),
    },
  }),
}));

import { api, ApiError } from "@/lib/api";

describe("API Client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should make GET requests with auth header", async () => {
    const mockData = { id: "1", name: "Test" };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    });

    const result = await api.get("/api/v1/test");

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer test-token-123",
        }),
      })
    );
    expect(result).toEqual(mockData);
  });

  it("should make POST requests with body", async () => {
    const body = { email: "test@example.com" };
    const mockResponse = { success: true };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await api.post("/api/v1/test", body);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/test",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it("should make PUT requests", async () => {
    const body = { name: "Updated" };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
    });

    await api.put("/api/v1/test", body);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/test",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify(body),
      })
    );
  });

  it("should make DELETE requests", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
    });

    await api.delete("/api/v1/test/1");

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/test/1",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it("should make PATCH requests", async () => {
    const body = { name: "Patched" };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
    });

    await api.patch("/api/v1/test", body);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/test",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify(body),
      })
    );
  });

  it("should handle 204 No Content responses", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 204,
    });

    const result = await api.delete("/api/v1/test/1");
    expect(result).toBeUndefined();
  });

  it("should throw ApiError on non-ok responses", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: () =>
        Promise.resolve({ message: "Resource not found", code: "NOT_FOUND" }),
    });

    await expect(api.get("/api/v1/missing")).rejects.toThrow(ApiError);

    try {
      await api.get("/api/v1/missing");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.statusCode).toBe(404);
      expect(apiErr.message).toBe("Resource not found");
      expect(apiErr.code).toBe("NOT_FOUND");
    }
  });

  it("should handle non-JSON error responses", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: () => Promise.reject(new Error("not json")),
    });

    await expect(api.get("/api/v1/broken")).rejects.toThrow(ApiError);

    try {
      await api.get("/api/v1/broken");
    } catch (err) {
      const apiErr = err as ApiError;
      expect(apiErr.statusCode).toBe(500);
      expect(apiErr.message).toBe("Internal Server Error");
    }
  });
});
