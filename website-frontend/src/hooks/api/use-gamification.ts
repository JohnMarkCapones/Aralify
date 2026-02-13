"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamificationApi } from "@/lib/api";

export function useGamificationProfile() {
  return useQuery({
    queryKey: ["gamification", "profile"],
    queryFn: () => gamificationApi.getProfile(),
    retry: false,
  });
}

export function useStreak() {
  return useQuery({
    queryKey: ["gamification", "streak"],
    queryFn: () => gamificationApi.getStreak(),
    retry: false,
  });
}

export function useClaimDailyBonus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => gamificationApi.claimDailyBonus(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification", "streak"] });
      queryClient.invalidateQueries({ queryKey: ["gamification", "profile"] });
    },
  });
}

export function useAchievements(params?: {
  category?: string;
  unlocked?: boolean;
}) {
  return useQuery({
    queryKey: ["gamification", "achievements", params],
    queryFn: () => gamificationApi.getAchievements(params),
  });
}

export function useBadges() {
  return useQuery({
    queryKey: ["gamification", "badges"],
    queryFn: () => gamificationApi.getBadges(),
  });
}

export function useMilestones() {
  return useQuery({
    queryKey: ["gamification", "milestones"],
    queryFn: () => gamificationApi.getMilestones(),
  });
}

export function useXpHistory(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ["gamification", "xp-history", params],
    queryFn: () => gamificationApi.getXpHistory(params),
  });
}
