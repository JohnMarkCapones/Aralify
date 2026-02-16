"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "@/lib/api";

export function useCourses(filters?: {
  search?: string;
  difficulty?: string;
  topic?: string;
}) {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: () => coursesApi.findAll(filters),
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["courses", slug],
    queryFn: () => coursesApi.findBySlug(slug),
    enabled: !!slug,
  });
}

export function useCourseProgress(slug: string) {
  return useQuery({
    queryKey: ["courses", slug, "progress"],
    queryFn: () => coursesApi.getProgress(slug),
    enabled: !!slug,
    retry: false,
  });
}

export function useCourseLevels(slug: string) {
  return useQuery({
    queryKey: ["courses", slug, "levels"],
    queryFn: () => coursesApi.getLevels(slug),
    enabled: !!slug,
  });
}

export function useStartCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => coursesApi.start(slug),
    onSuccess: (_data, slug) => {
      queryClient.invalidateQueries({ queryKey: ["courses", slug, "progress"] });
      queryClient.invalidateQueries({ queryKey: ["user", "courses"] });
    },
  });
}
