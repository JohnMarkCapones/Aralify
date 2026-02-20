"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonsApi } from "@/lib/api";

export function useLesson(id: string) {
  return useQuery({
    queryKey: ["lessons", id],
    queryFn: () => lessonsApi.findById(id),
    enabled: !!id,
  });
}

export function useStartLesson() {
  return useMutation({
    mutationFn: ({ id, difficulty }: { id: string; difficulty: string }) =>
      lessonsApi.start(id, { difficulty }),
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      difficulty,
      score,
    }: {
      id: string;
      difficulty: string;
      score?: number;
    }) => lessonsApi.complete(id, { difficulty, score }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["gamification"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      answers,
    }: {
      lessonId: string;
      answers: Record<string, string>;
    }) => lessonsApi.submitQuiz(lessonId, { answers }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification"] });
    },
  });
}

export function useSubmitChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      code,
      language,
      difficulty,
    }: {
      lessonId: string;
      code: string;
      language: string;
      difficulty: string;
    }) => lessonsApi.submitChallenge(lessonId, { code, language, difficulty }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification"] });
    },
  });
}
