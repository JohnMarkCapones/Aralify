"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { mockCourseDetails } from "@/lib/data/dashboard";
import { CourseHero } from "./_components/course-hero";
import { LevelSection } from "./_components/level-section";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = mockCourseDetails[courseId];

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold">Course not found</p>
        <Link href="/dashboard/courses" className="text-sm text-primary hover:underline mt-2 inline-block">
          Back to courses
        </Link>
      </div>
    );
  }

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
            defaultOpen={i === activeLevelIndex}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
