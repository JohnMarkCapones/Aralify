"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useCourse, useCourseLevels, useCourseProgress } from "@/hooks/api";
import { CourseHero } from "./_components/course-hero";
import { LevelSection } from "./_components/level-section";
import type { CourseDetail as MockCourseDetail, CourseLevel as MockCourseLevel } from "@/lib/data/dashboard";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const { data: apiCourse, isLoading: loadingCourse } = useCourse(courseId);
  const { data: apiLevels, isLoading: loadingLevels } = useCourseLevels(courseId);
  const { data: progress } = useCourseProgress(courseId);

  const isLoading = loadingCourse || loadingLevels;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!apiCourse) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold">Course not found</p>
        <Link href="/dashboard/courses" className="text-sm text-primary hover:underline mt-2 inline-block">
          Back to courses
        </Link>
      </div>
    );
  }

  // Map API levels to the shape CourseHero/LevelSection expect
  const levels: MockCourseLevel[] = (apiLevels ?? []).map((lvl) => ({
    id: lvl.id,
    title: lvl.title,
    order: lvl.orderIndex,
    lessons: lvl.lessons.map((les) => ({
      id: les.id,
      title: les.title,
      order: les.orderIndex,
      status: les.isCompleted ? "completed" as const : lvl.isUnlocked ? "available" as const : "locked" as const,
      difficulty: "easy" as const,
      xpReward: 50,
      duration: "~15 min",
    })),
  }));

  const totalLessons = levels.flatMap((l) => l.lessons).length;
  const completedLessons = levels.flatMap((l) => l.lessons).filter((l) => l.status === "completed").length;

  const course: MockCourseDetail = {
    id: apiCourse.id,
    title: apiCourse.title,
    slug: apiCourse.slug,
    description: apiCourse.description,
    icon: apiCourse.icon,
    color: apiCourse.color || "#3b82f6",
    progress: progress?.completionPercentage ?? Math.round((completedLessons / Math.max(totalLessons, 1)) * 100),
    totalLessons: progress?.totalLessons ?? totalLessons,
    completedLessons: progress?.completedLessons ?? completedLessons,
    xpEarned: progress?.xpEarned ?? 0,
    difficulty: (apiCourse.difficulty as MockCourseDetail["difficulty"]) || "beginner",
    instructor: (apiCourse as unknown as { instructor?: string }).instructor ?? "Aralify",
    estimatedHours: apiCourse.hours ?? 0,
    language: apiCourse.language,
    levels,
  };

  // Find the first level that has an available lesson (for default-open)
  const activeLevelIndex = course.levels.findIndex((lvl) =>
    lvl.lessons.some((l) => l.status === "available")
  );

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard/courses"
        className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft size={14} />
        Back to Courses
      </Link>

      {/* Hero */}
      <CourseHero course={course} />

      {/* Level sections */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Syllabus
        </h3>
        {course.levels.map((level, i) => (
          <LevelSection
            key={level.id}
            level={level}
            courseId={course.id}
            courseColor={course.color}
            defaultOpen={i === activeLevelIndex}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
