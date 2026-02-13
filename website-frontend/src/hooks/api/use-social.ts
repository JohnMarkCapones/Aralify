"use client";

import { useQuery } from "@tanstack/react-query";
import { socialApi } from "@/lib/api";

export function useActivityFeed(params?: {
  limit?: number;
  offset?: number;
  type?: string;
}) {
  return useQuery({
    queryKey: ["social", "feed", params],
    queryFn: () => socialApi.getFeed(params),
    retry: false,
  });
}

export function useUserActivity(
  username: string,
  params?: { limit?: number; offset?: number }
) {
  return useQuery({
    queryKey: ["social", "activity", username, params],
    queryFn: () => socialApi.getUserActivity(username, params),
    enabled: !!username,
    retry: false,
  });
}
