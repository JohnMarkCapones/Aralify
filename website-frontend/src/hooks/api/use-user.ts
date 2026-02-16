"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import type { UserSettings } from "@/lib/api";

export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => usersApi.getProfile(),
    retry: false,
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: ["user", "stats"],
    queryFn: () => usersApi.getStats(),
    retry: false,
  });
}

export function useUserCourses() {
  return useQuery({
    queryKey: ["user", "courses"],
    queryFn: () => usersApi.getCourses(),
    retry: false,
  });
}

export function useUserSettings() {
  return useQuery({
    queryKey: ["user", "settings"],
    queryFn: () => usersApi.getSettings(),
    retry: false,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserSettings>) =>
      usersApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "settings"] });
    },
  });
}
