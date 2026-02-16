"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useFollowers(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ["social", "followers", params],
    queryFn: () => socialApi.getFollowers(params),
    retry: false,
  });
}

export function useFollowing(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ["social", "following", params],
    queryFn: () => socialApi.getFollowing(params),
    retry: false,
  });
}

export function useFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => socialApi.follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social", "followers"] });
      queryClient.invalidateQueries({ queryKey: ["social", "following"] });
    },
  });
}

export function useUnfollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => socialApi.unfollow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social", "followers"] });
      queryClient.invalidateQueries({ queryKey: ["social", "following"] });
    },
  });
}

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ["social", "search", query],
    queryFn: () => socialApi.searchUsers(query),
    enabled: query.length >= 2,
    retry: false,
  });
}
