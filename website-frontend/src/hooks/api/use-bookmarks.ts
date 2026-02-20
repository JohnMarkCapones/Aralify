"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarksApi } from "@/lib/api";

export function useBookmarks(params?: { type?: string }) {
  return useQuery({
    queryKey: ["bookmarks", params],
    queryFn: () => bookmarksApi.list(params),
    retry: false,
  });
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { lessonId?: string; courseId?: string; type: string; notes?: string }) =>
      bookmarksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookmarksApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}
