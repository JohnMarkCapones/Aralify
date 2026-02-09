"use client";

import { useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { mockEnrolledCourses } from "@/lib/data/dashboard";

type Filter = "all" | "in_progress" | "completed";

export default function CoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredCourses = filter === "all"
    ? mockEnrolledCourses
    : mockEnrolledCourses.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Courses"
        description={`${mockEnrolledCourses.length} courses enrolled`}
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {(["all", "in_progress", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  filter === f ? "bg-background card-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f === "in_progress" ? "In Progress" : f === "all" ? "All" : "Completed"}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden hover:border-border transition-colors"
          >
            <div className="h-1.5" style={{ backgroundColor: course.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: course.color + "15" }}
                >
                  {course.icon}
                </div>
                <span className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full",
                  course.status === "completed"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                )}>
                  {course.status === "completed" ? "Completed" : "In Progress"}
                </span>
              </div>

              <h3 className="text-sm font-semibold mb-1">{course.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{course.description}</p>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{course.progress}%</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                <span>{course.xpEarned.toLocaleString()} XP</span>
              </div>

              {course.status === "in_progress" && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Current lesson</p>
                      <p className="text-xs font-medium">{course.currentLesson}</p>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      Continue <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-muted-foreground mt-2">
                Last studied: {new Date(course.lastStudied).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No courses found</p>
          <p className="text-xs mt-1">Try changing the filter</p>
        </div>
      )}
    </div>
  );
}
