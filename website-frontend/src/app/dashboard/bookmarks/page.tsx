"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Trash2, BookOpen, Clock, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { mockBookmarks } from "@/lib/data/dashboard";
import type { BookmarkedLesson } from "@/lib/data/dashboard";

type Filter = "all" | BookmarkedLesson["status"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "to_review", label: "To Review" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const DIFF_COLORS: Record<string, string> = {
  easy: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  medium: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  hard: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
};

const DIFF_GRADIENT: Record<string, string> = {
  easy: "from-emerald-500 to-emerald-400",
  medium: "from-amber-500 to-amber-400",
  hard: "from-red-500 to-red-400",
};

const STATUS_DOT: Record<string, string> = {
  to_review: "bg-blue-500",
  in_progress: "bg-amber-500",
  completed: "bg-emerald-500",
};

const STATUS_TEXT: Record<string, string> = {
  to_review: "text-blue-600 dark:text-blue-400",
  in_progress: "text-amber-600 dark:text-amber-400",
  completed: "text-emerald-600 dark:text-emerald-400",
};

const STATUS_ICON_BG: Record<string, string> = {
  to_review: "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  in_progress: "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  completed: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" as const },
  }),
};

export default function BookmarksPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? mockBookmarks
    : mockBookmarks.filter((b) => b.status === filter);

  // Stats
  const toReviewCount = mockBookmarks.filter((b) => b.status === "to_review").length;
  const inProgressCount = mockBookmarks.filter((b) => b.status === "in_progress").length;
  const completedCount = mockBookmarks.filter((b) => b.status === "completed").length;

  const stats = [
    { icon: Bookmark, label: "Total", value: mockBookmarks.length, color: "text-primary", bg: "bg-primary/10" },
    { icon: BookOpen, label: "To Review", value: toReviewCount, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-950/40" },
    { icon: Clock, label: "In Progress", value: inProgressCount, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950/40" },
    { icon: CheckCircle2, label: "Completed", value: completedCount, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-950/40" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookmarks"
        description={`${mockBookmarks.length} saved lessons`}
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  filter === f.value ? "bg-background card-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-sm"
          >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((bookmark, i) => (
          <motion.div
            key={bookmark.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden"
          >
            {/* Difficulty gradient top strip */}
            <div className={cn("h-1 bg-gradient-to-r", DIFF_GRADIENT[bookmark.difficulty])} />

            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Colored bookmark icon */}
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", STATUS_ICON_BG[bookmark.status])}>
                  <Bookmark size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold">{bookmark.title}</h3>
                    <span className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize", DIFF_COLORS[bookmark.difficulty])}>
                      {bookmark.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-0.5">{bookmark.courseName}</p>

                  {/* Status with colored dot */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={cn("w-2 h-2 rounded-full", STATUS_DOT[bookmark.status])} />
                    <span className={cn("text-[11px] font-medium capitalize", STATUS_TEXT[bookmark.status])}>
                      {bookmark.status.replace("_", " ")}
                    </span>
                  </div>

                  {bookmark.notes && (
                    <p className="text-xs text-muted-foreground mt-1.5 italic">&ldquo;{bookmark.notes}&rdquo;</p>
                  )}

                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    Saved {new Date(bookmark.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>

                <div className="flex gap-1 shrink-0">
                  <button className="p-1.5 hover:bg-primary/10 rounded-lg transition-colors text-muted-foreground hover:text-primary" title="Go to lesson">
                    <ExternalLink size={14} />
                  </button>
                  <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors text-muted-foreground hover:text-red-500" title="Remove bookmark">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Bookmark size={28} className="text-primary/40" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">No bookmarks found</p>
          <p className="text-xs text-muted-foreground mt-1">Bookmark lessons to review them later</p>
        </div>
      )}
    </div>
  );
}
