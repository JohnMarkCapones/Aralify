"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, PlayCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardTilt } from "@/components/effects/CardTilt";
import type { CourseLesson } from "@/lib/data/dashboard";

interface LessonRowProps {
  lesson: CourseLesson;
  courseId: string;
  isCurrent: boolean;
}

const difficultyColors = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
};

export function LessonRow({ lesson, courseId, isCurrent }: LessonRowProps) {
  const isLocked = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";

  const content = (
    <motion.div
      whileHover={!isLocked ? { y: -3 } : undefined}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border transition-colors",
        isLocked
          ? "border-border/20 opacity-50 cursor-not-allowed"
          : "border-border/40 hover:border-border cursor-pointer",
        isCurrent && "border-primary/50 bg-primary/5 ring-2 ring-primary/20 animate-pulse-ring"
      )}
    >
      {/* Status icon */}
      <div className="shrink-0">
        {isLocked ? (
          <Lock size={18} className="text-muted-foreground/50" />
        ) : isCompleted ? (
          <CheckCircle2 size={18} className="text-emerald-500" />
        ) : (
          <PlayCircle size={18} className="text-primary animate-pulse" />
        )}
      </div>

      {/* Order number */}
      <span className="text-xs font-bold text-muted-foreground w-5 text-center shrink-0">
        {lesson.order}
      </span>

      {/* Title */}
      <span className={cn(
        "text-sm font-medium flex-1 min-w-0 truncate",
        isLocked && "text-muted-foreground"
      )}>
        {lesson.title}
      </span>

      {/* Difficulty badge */}
      <span className={cn(
        "text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 capitalize",
        difficultyColors[lesson.difficulty]
      )}>
        {lesson.difficulty}
      </span>

      {/* XP */}
      <span className="text-[11px] font-bold text-muted-foreground shrink-0 w-12 text-right">
        +{lesson.xpReward} XP
      </span>

      {/* Duration */}
      <span className="text-[10px] text-muted-foreground shrink-0 w-12 text-right hidden sm:inline">
        {lesson.duration}
      </span>
    </motion.div>
  );

  if (isLocked) {
    return <CardTilt intensity={3}>{content}</CardTilt>;
  }

  return (
    <CardTilt intensity={5}>
      <Link href={`/learn/${lesson.id}?courseId=${courseId}`}>
        {content}
      </Link>
    </CardTilt>
  );
}
