"use client";

import { useState } from "react";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
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

const STATUS_COLORS: Record<string, string> = {
  to_review: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  in_progress: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  completed: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
};

export default function BookmarksPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? mockBookmarks
    : mockBookmarks.filter((b) => b.status === filter);

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

      <div className="space-y-2">
        {filtered.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bg-background rounded-xl border border-border/50 shadow-sm p-4"
          >
            <div className="flex items-start gap-4">
              <Bookmark size={16} className="text-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold">{bookmark.title}</h3>
                  <span className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize", DIFF_COLORS[bookmark.difficulty])}>
                    {bookmark.difficulty}
                  </span>
                  <span className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize", STATUS_COLORS[bookmark.status])}>
                    {bookmark.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{bookmark.courseName}</p>
                {bookmark.notes && (
                  <p className="text-xs text-muted-foreground mt-1.5 italic">&ldquo;{bookmark.notes}&rdquo;</p>
                )}
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  Saved {new Date(bookmark.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground" title="Go to lesson">
                  <ExternalLink size={14} />
                </button>
                <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors text-muted-foreground hover:text-red-500" title="Remove bookmark">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Bookmark size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No bookmarks found</p>
          <p className="text-xs mt-1">Bookmark lessons to review them later</p>
        </div>
      )}
    </div>
  );
}
