"use client";

import { useQuery } from "@tanstack/react-query";
import { leaderboardApi } from "@/lib/api";

export function useGlobalLeaderboard(params?: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["leaderboard", "global", params],
    queryFn: () => leaderboardApi.getGlobal(params),
  });
}

export function useWeeklyLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard", "weekly"],
    queryFn: () => leaderboardApi.getWeekly(),
  });
}

export function useMonthlyLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard", "monthly"],
    queryFn: () => leaderboardApi.getMonthly(),
  });
}

export function useFriendsLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard", "friends"],
    queryFn: () => leaderboardApi.getFriends(),
  });
}

export function useUserRanks() {
  return useQuery({
    queryKey: ["leaderboard", "ranks"],
    queryFn: () => leaderboardApi.getUserRanks(),
    retry: false,
  });
}
