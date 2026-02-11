"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { LessonRow } from "./lesson-row";
import type { CourseLevel } from "@/lib/data/dashboard";

interface LevelSectionProps {
  level: CourseLevel;
  courseId: string;
  defaultOpen?: boolean;
  index: number;
}

export function LevelSection({ level, courseId, defaultOpen = false, index }: LevelSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const completedCount = level.lessons.filter((l) => l.status === "completed").length;
  const totalCount = level.lessons.length;
  const progress = (completedCount / totalCount) * 100;
  const allLocked = level.lessons.every((l) => l.status === "locked");

  // Find the current lesson (first available)
  const currentLessonId = level.lessons.find((l) => l.status === "available")?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-background rounded-xl border border-border/40 overflow-hidden"
    >
      {/* Header — clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 hover:bg-muted/20 transition-colors text-left"
      >
        {/* Level order */}
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
          allLocked
            ? "bg-muted text-muted-foreground"
            : completedCount === totalCount
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
            : "bg-primary/10 text-primary"
        )}>
          {allLocked ? <Lock size={14} /> : level.order}
        </div>

        {/* Title + progress text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold truncate">{level.title}</h3>
          <p className="text-[11px] text-muted-foreground">
            {completedCount}/{totalCount} completed
          </p>
        </div>

        {/* Progress bar (mini) */}
        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden shrink-0 hidden sm:block">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.div>
      </button>

      {/* Lessons list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {level.lessons.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  courseId={courseId}
                  isCurrent={lesson.id === currentLessonId}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
