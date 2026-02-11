"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardTilt } from "@/components/effects/CardTilt";
import { XpProgressBar } from "./xp-progress-bar";
import type { EnrolledCourse } from "@/lib/data/dashboard";

interface QuestCardProps {
  course: EnrolledCourse;
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function QuestCard({ course }: QuestCardProps) {
  return (
    <CardTilt intensity={5}>
      <Link href="/dashboard/courses" className="block">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center gap-4 p-4 rounded-xl card-elevated bg-background group transition-shadow hover:card-elevated-hover"
        >
          {/* Course icon */}
          <div
            className="w-12 h-12 rounded-xl border border-border/20 flex items-center justify-center text-2xl shrink-0"
            style={{ backgroundColor: course.color + "15" }}
          >
            {course.icon}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold truncate">{course.title}</p>
              <span
                className={cn(
                  "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0",
                  difficultyColors[course.difficulty]
                )}
              >
                {course.difficulty}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {course.completedLessons}/{course.totalLessons} lessons
            </p>
            <XpProgressBar
              current={course.completedLessons}
              max={course.totalLessons}
              size="sm"
              showLabel={false}
              shimmer
            />
          </div>

          {/* XP + arrow */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-bold text-primary">+{course.xpEarned} XP</span>
            <ChevronRight
              size={16}
              className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors"
            />
          </div>
        </motion.div>
      </Link>
    </CardTilt>
  );
}
