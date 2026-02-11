"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { QuestCard } from "./quest-card";
import type { EnrolledCourse } from "@/lib/data/dashboard";

interface QuestBoardProps {
  courses: EnrolledCourse[];
}

export function QuestBoard({ courses }: QuestBoardProps) {
  const inProgress = courses
    .filter((c) => c.status === "in_progress")
    .slice(0, 2);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Continue Learning</h3>
        <Link
          href="/dashboard/courses"
          className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline"
        >
          View all <ChevronRight size={12} />
        </Link>
      </div>

      <div className="space-y-3">
        {inProgress.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <QuestCard course={course} />
          </motion.div>
        ))}
      </div>

      {/* Study plan link */}
      <Link
        href="/dashboard/study-plan"
        className="mt-3 flex items-center gap-2 p-3 rounded-xl border-2 border-dashed border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold">View your study plan</p>
          <p className="text-[10px] text-muted-foreground">Your weekly study schedule</p>
        </div>
        <ChevronRight
          size={14}
          className="text-muted-foreground/30 group-hover:text-primary transition-colors"
        />
      </Link>
    </section>
  );
}
