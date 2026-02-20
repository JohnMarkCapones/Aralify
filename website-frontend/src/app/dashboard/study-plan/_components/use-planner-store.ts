"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PlannerTask {
  id: string;
  title: string;
  estimatedMins: number;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  category: "lesson" | "review" | "challenge" | "practice" | "other";
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface PlannerGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  category: "lessons" | "xp" | "challenges" | "time";
  weekStart: string; // ISO date of week start
}

interface PlannerData {
  tasks: PlannerTask[];
  goals: PlannerGoal[];
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "aralify-study-planner";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function getWeekStartStr(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  d.setDate(diff);
  return d.toISOString().split("T")[0];
}

export function getWeekDates(date: Date = new Date()): Date[] {
  const start = new Date(getWeekStartStr(date));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function readStorage(): PlannerData {
  if (typeof window === "undefined") return { tasks: [], goals: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tasks: [], goals: [] };
    return JSON.parse(raw) as PlannerData;
  } catch {
    return { tasks: [], goals: [] };
  }
}

function writeStorage(data: PlannerData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function usePlannerStore() {
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [goals, setGoals] = useState<PlannerGoal[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const data = readStorage();
    // Auto-reset goals for new week
    const currentWeek = getWeekStartStr();
    const resetGoals = data.goals.map((g) =>
      g.weekStart !== currentWeek ? { ...g, current: 0, weekStart: currentWeek } : g
    );
    setTasks(data.tasks);
    setGoals(resetGoals);
    setHydrated(true);
    if (resetGoals !== data.goals) {
      writeStorage({ tasks: data.tasks, goals: resetGoals });
    }
  }, []);

  // Persist helper
  const persist = useCallback((newTasks: PlannerTask[], newGoals: PlannerGoal[]) => {
    writeStorage({ tasks: newTasks, goals: newGoals });
  }, []);

  // ─── Task CRUD ──────────────────────────────────────────────────────────

  const addTask = useCallback(
    (task: Omit<PlannerTask, "id" | "isCompleted" | "createdAt">) => {
      setTasks((prev) => {
        const newTask: PlannerTask = {
          ...task,
          id: generateId(),
          isCompleted: false,
          createdAt: new Date().toISOString(),
        };
        const next = [...prev, newTask];
        persist(next, goals);
        return next;
      });
    },
    [goals, persist]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<PlannerTask, "id" | "createdAt">>) => {
      setTasks((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t));
        persist(next, goals);
        return next;
      });
    },
    [goals, persist]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => {
        const next = prev.filter((t) => t.id !== id);
        persist(next, goals);
        return next;
      });
    },
    [goals, persist]
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) => {
        const next = prev.map((t) =>
          t.id === id
            ? {
                ...t,
                isCompleted: !t.isCompleted,
                completedAt: !t.isCompleted ? new Date().toISOString() : undefined,
              }
            : t
        );
        persist(next, goals);
        return next;
      });
    },
    [goals, persist]
  );

  // ─── Goal CRUD ──────────────────────────────────────────────────────────

  const addGoal = useCallback(
    (goal: Omit<PlannerGoal, "id" | "current" | "weekStart">) => {
      setGoals((prev) => {
        const newGoal: PlannerGoal = {
          ...goal,
          id: generateId(),
          current: 0,
          weekStart: getWeekStartStr(),
        };
        const next = [...prev, newGoal];
        persist(tasks, next);
        return next;
      });
    },
    [tasks, persist]
  );

  const updateGoal = useCallback(
    (id: string, updates: Partial<Omit<PlannerGoal, "id" | "weekStart">>) => {
      setGoals((prev) => {
        const next = prev.map((g) => (g.id === id ? { ...g, ...updates } : g));
        persist(tasks, next);
        return next;
      });
    },
    [tasks, persist]
  );

  const deleteGoal = useCallback(
    (id: string) => {
      setGoals((prev) => {
        const next = prev.filter((g) => g.id !== id);
        persist(tasks, next);
        return next;
      });
    },
    [tasks, persist]
  );

  const incrementGoal = useCallback(
    (id: string, amount: number = 1) => {
      setGoals((prev) => {
        const next = prev.map((g) =>
          g.id === id ? { ...g, current: Math.min(g.current + amount, g.target) } : g
        );
        persist(tasks, next);
        return next;
      });
    },
    [tasks, persist]
  );

  // ─── Derived helpers ────────────────────────────────────────────────────

  const getTasksForDate = useCallback(
    (date: string) => tasks.filter((t) => t.date === date),
    [tasks]
  );

  const getTasksForWeek = useCallback(() => {
    const weekDates = getWeekDates().map((d) => d.toISOString().split("T")[0]);
    return tasks.filter((t) => weekDates.includes(t.date));
  }, [tasks]);

  return {
    tasks,
    goals,
    hydrated,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addGoal,
    updateGoal,
    deleteGoal,
    incrementGoal,
    getTasksForDate,
    getTasksForWeek,
  };
}
