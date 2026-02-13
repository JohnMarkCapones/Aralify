"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, usersApi } from "@/lib/api";
import type { AuthUserProfile, UserProfile } from "@/lib/api";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.getMe(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => usersApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
}

export function useRegisterSession() {
  return useMutation({
    mutationFn: () => authApi.registerSession(),
  });
}
