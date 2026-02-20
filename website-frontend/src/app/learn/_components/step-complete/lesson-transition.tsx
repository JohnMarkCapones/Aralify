"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

const TOTAL_LESSONS = 6;
const AUTO_NAVIGATE_MS = 3500;

interface LessonTransitionProps {
  /** 1-based order of the lesson just completed */
  completedLessonOrder: number;
  nextLessonTitle: string;
  onNavigate: () => void;
}

function getMotivation(completed: number, total: number): string {
  const ratio = completed / total;
  if (ratio >= 1) return "You finished the course!";
  if (ratio >= 0.8) return "Almost there — finish strong!";
  if (ratio >= 0.5) return "Halfway through — keep going!";
  if (ratio >= 0.3) return "Great momentum — don't stop now!";
  return "You're just getting started!";
}

export function LessonTransition({
  completedLessonOrder,
  nextLessonTitle,
  onNavigate,
}: LessonTransitionProps) {
  const [progressWidth, setProgressWidth] = useState(
    ((completedLessonOrder - 1) / TOTAL_LESSONS) * 100
  );

  // Animate progress bar fill after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth((completedLessonOrder / TOTAL_LESSONS) * 100);
    }, 400);
    return () => clearTimeout(timer);
  }, [completedLessonOrder]);

  // Auto-navigate after delay
  useEffect(() => {
    const timer = setTimeout(onNavigate, AUTO_NAVIGATE_MS);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  const motivation = getMotivation(completedLessonOrder, TOTAL_LESSONS);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
      onClick={onNavigate}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
        className="max-w-sm w-full mx-4 p-6 rounded-2xl border-2 border-border bg-card neo-brutal-shadow space-y-5 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
        >
          <Sparkles size={40} className="mx-auto text-primary" />
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Course Progress
          </p>
          <div className="h-3 w-full rounded-full bg-muted/50 border border-border/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
              initial={{ width: `${((completedLessonOrder - 1) / TOTAL_LESSONS) * 100}%` }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            />
          </div>
          <p className="text-sm font-display font-bold">
            {completedLessonOrder}/{TOTAL_LESSONS} lessons complete
          </p>
        </motion.div>

        {/* Motivation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-muted-foreground"
        >
          {motivation}
        </motion.p>

        {/* Next lesson preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20"
        >
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Next up
          </span>
          <ChevronRight size={14} className="text-primary" />
          <span className="text-sm font-display font-bold text-primary">
            {nextLessonTitle}
          </span>
        </motion.div>

        {/* Tap to skip hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          className="text-[10px] text-muted-foreground"
        >
          Tap anywhere to continue
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
