"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Clock, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { type CourseListItem, type UserCourseEntry } from "@/lib/api";
import { useCourses, useUserCourses } from "@/hooks/api";

type Filter = "all" | "in_progress" | "completed";

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

// Map API course to the shape the UI expects for enrolled courses
function mapUserCourse(c: UserCourseEntry) {
  return {
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description,
    icon: c.iconUrl || "📚",
    color: c.color || "#3776AB",
    progress: c.completionPercentage,
    totalLessons: 0,
    completedLessons: 0,
    currentLesson: "Continue learning",
    xpEarned: c.totalXpEarned,
    lastStudied: c.lastActivityAt || c.startedAt || new Date().toISOString(),
    status: c.completedAt ? "completed" : ("in_progress" as const),
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
  };
}

// Map API course to discover course shape
function mapDiscoverCourse(c: any) {
  return {
    id: c.id,
    title: typeof c.title === "object" ? c.title.en || c.title.fil || "" : c.title,
    description: typeof c.description === "object" ? c.description.en || c.description.fil || "" : c.description || "",
    icon: c.iconUrl ? "📚" : "📚",
    color: c.color || "#3776AB",
    slug: c.slug,
    language: c.language,
    difficulty: "beginner" as const,
    tags: [c.language],
    lessonsCount: c.totalLessons || c.totalLevels * 3 || 12,
    estimatedHours: c.estimatedHours || 20,
    rating: 4.8,
    enrolledCount: 0,
  };
}

export default function CoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const { data: userCoursesData } = useUserCourses();
  const { data: allCoursesData } = useCourses();

  const enrolledCourses = (userCoursesData ?? []).map(mapUserCourse);
  const discoverCourses = (allCoursesData ?? []).map(mapDiscoverCourse);

  const filteredCourses = filter === "all"
    ? enrolledCourses
    : enrolledCourses.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Courses"
        description={`${enrolledCourses.length} courses enrolled`}
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
          <Link
            key={course.id}
            href={`/dashboard/courses/${course.slug || course.id}`}
            className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden hover:border-border transition-colors block"
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
                    <span className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      Continue <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-muted-foreground mt-2">
                Last studied: {new Date(course.lastStudied).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No courses found</p>
          <p className="text-xs mt-1">Try changing the filter</p>
        </div>
      )}

      {/* Discover Courses */}
      <div className="pt-4 border-t border-border/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold">Discover Courses</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Explore new skills and grow your knowledge</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {discoverCourses.map((course) => (
            <div
              key={course.id}
              className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden hover:border-border transition-colors"
            >
              {/* Color banner */}
              <div
                className="h-20 relative"
                style={{ background: `linear-gradient(135deg, ${course.color}30, ${course.color}10)` }}
              >
                <div
                  className="absolute bottom-0 left-5 translate-y-1/2 w-12 h-12 rounded-xl border-2 border-background flex items-center justify-center text-xl shadow-sm"
                  style={{ backgroundColor: course.color + "20" }}
                >
                  {course.icon}
                </div>
              </div>

              <div className="p-5 pt-8">
                {/* Title + difficulty */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold">{course.title}</h3>
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0",
                    difficultyColors[course.difficulty]
                  )}>
                    {course.difficulty}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{course.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} />
                    {course.lessonsCount} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {course.estimatedHours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-amber-500" />
                    {course.rating}
                  </span>
                </div>

                {/* Bottom: enrolled count + enroll button */}
                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Users size={11} />
                    {course.enrolledCount.toLocaleString()} enrolled
                  </span>
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
