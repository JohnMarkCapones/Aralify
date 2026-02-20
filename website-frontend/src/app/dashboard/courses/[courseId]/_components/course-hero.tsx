"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, Clock, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { XpProgressBar } from "@/app/dashboard/_components/xp-progress-bar";
import type { CourseDetail } from "@/lib/data/dashboard";

interface CourseHeroProps {
  course: CourseDetail;
}

const difficultyColors = {
  beginner: "bg-emerald-100 text-emerald-700 ring-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 ring-amber-500/30 dark:bg-amber-950/40 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 ring-red-500/30 dark:bg-red-950/40 dark:text-red-400",
};

export function CourseHero({ course }: CourseHeroProps) {
  const totalXp = course.levels
    .flatMap((l) => l.lessons)
    .reduce((sum, les) => sum + les.xpReward, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border/40 overflow-hidden bg-background"
    >
      {/* Gradient banner area */}
      <div
        className="h-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${course.color}20, ${course.color}40, ${course.color}15)` }}
      >
        {/* Decorative blur orbs */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-30"
          style={{ backgroundColor: course.color }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-2xl opacity-20"
          style={{ backgroundColor: course.color }}
        />
      </div>

      <div className="p-5 sm:p-6 -mt-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Icon + info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-lg border-2 border-background"
                style={{ backgroundColor: course.color + "25" }}
              >
                {course.icon}
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-xl tracking-tight truncate">{course.title}</h2>
                <p className="text-xs text-muted-foreground">by {course.instructor}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 max-w-xl">{course.description}</p>

            {/* Difficulty badge with ring */}
            <span className={cn(
              "text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize ring-2",
              difficultyColors[course.difficulty]
            )}>
              {course.difficulty}
            </span>
          </div>

          {/* Progress ring with glow */}
          <div className="flex items-center justify-center shrink-0">
            <div className="relative w-20 h-20">
              <div
                className="absolute inset-0 rounded-full blur-md opacity-20"
                style={{ backgroundColor: course.color }}
              />
              <svg className="w-20 h-20 -rotate-90 relative z-10" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke={course.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 34}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 34 * (1 - course.progress / 100),
                  }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <AnimatedCounter
                  target={course.progress}
                  suffix="%"
                  className="text-sm font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats row with colored icon backgrounds */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {[
            { icon: BookOpen, label: "Lessons", value: `${course.completedLessons}/${course.totalLessons}`, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-950/40" },
            { icon: Zap, label: "XP Earned", value: `${course.xpEarned.toLocaleString()}/${totalXp.toLocaleString()}`, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950/40" },
            { icon: Clock, label: "Est. Time", value: `~${course.estimatedHours} hrs`, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-950/40" },
            { icon: Code2, label: "Language", value: course.language, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-950/40" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/20 border border-border/20"
            >
              <div className={cn("w-7 h-7 rounded-md flex items-center justify-center shrink-0", stat.bg)}>
                <stat.icon size={13} className={stat.color} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                <p className="text-xs font-semibold truncate">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="mt-5">
          <XpProgressBar
            current={course.completedLessons}
            max={course.totalLessons}
            size="sm"
            showLabel={false}
            shimmer={false}
          />
          <p className="text-[10px] text-muted-foreground mt-1.5">
            {course.progress}% complete — {course.totalLessons - course.completedLessons} lessons remaining
          </p>
        </div>
      </div>
    </motion.div>
  );
}
