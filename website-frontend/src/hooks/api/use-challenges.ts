"use client";

import { useQuery } from "@tanstack/react-query";
import { challengesApi } from "@/lib/api";

export function useChallengesList(params?: { difficulty?: string; language?: string }) {
  return useQuery({
    queryKey: ["challenges", "list", params],
    queryFn: () => challengesApi.list(params),
  });
}

export function useDailyChallenge() {
  return useQuery({
    queryKey: ["challenges", "daily"],
    queryFn: () => challengesApi.getDaily(),
  });
}

export function useChallengeDetail(id: string) {
  return useQuery({
    queryKey: ["challenges", "detail", id],
    queryFn: () => challengesApi.getDetail(id),
    enabled: !!id,
  });
}
