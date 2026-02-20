"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, PlayCircle, CheckCircle2, Zap } from "lucide-react";
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
          ? "border-border/20 opacity-40 cursor-not-allowed bg-muted/10"
          : isCompleted
          ? "border-emerald-200/50 dark:border-emerald-500/10 bg-emerald-50/50 dark:bg-emerald-950/10 hover:border-emerald-300/50"
          : "border-border/40 hover:border-border cursor-pointer",
        isCurrent && "border-primary/50 bg-primary/5 ring-2 ring-primary/20"
      )}
    >
      {/* Status icon */}
      <div className="shrink-0">
        {isLocked ? (
          <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center">
            <Lock size={14} className="text-muted-foreground/50" />
          </div>
        ) : isCompleted ? (
          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
            <CheckCircle2 size={14} className="text-emerald-500" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center relative">
            <PlayCircle size={14} className="text-primary" />
            {isCurrent && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        )}
      </div>

      {/* Order number */}
      <span className="text-xs font-bold text-muted-foreground w-5 text-center shrink-0">
        {lesson.order}
      </span>

      {/* Title */}
      <span className={cn(
        "text-sm font-medium flex-1 min-w-0 truncate",
        isLocked && "text-muted-foreground",
        isCompleted && "text-emerald-800 dark:text-emerald-300"
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

      {/* XP with colored badge */}
      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold shrink-0 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
        <Zap size={9} />
        +{lesson.xpReward}
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
