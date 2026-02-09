"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen, GraduationCap, Layers, Plus, Search, Users,
  Trash2, Eye, EyeOff,
} from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { StatCard } from "../_components/stat-card";
import { StatusBadge } from "../_components/status-badge";
import { ConfirmDialog } from "../_components/confirm-dialog";
import { cn } from "@/lib/utils";
import { mockCourses, type AdminCourse } from "@/lib/data/admin";

export default function AdminContentPage() {
  const [filter, setFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(null);

  const totalLevels = mockCourses.reduce((acc, c) => acc + c.levels.length, 0);
  const totalLessons = mockCourses.reduce(
    (acc, c) => acc + c.levels.reduce((a, l) => a + l.lessons.length, 0),
    0
  );

  const filtered = useMemo(() => {
    return mockCourses.filter((c) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "PUBLISHED" && c.isPublished) ||
        (filter === "DRAFT" && !c.isPublished);
      const matchesSearch =
        !search || c.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Management"
        actions={
          <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <Plus size={16} /> Create Course
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<BookOpen size={16} />} label="Total Courses" value={mockCourses.length} />
        <StatCard icon={<Eye size={16} />} label="Published" value={mockCourses.filter((c) => c.isPublished).length} />
        <StatCard icon={<Layers size={16} />} label="Total Levels" value={totalLevels} />
        <StatCard icon={<GraduationCap size={16} />} label="Total Lessons" value={totalLessons} />
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1.5">
          {(["ALL", "PUBLISHED", "DRAFT"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/50 bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
      </div>

      {/* Course cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-1.5" style={{ backgroundColor: course.color }} />

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-border/30 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: course.color + "15" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={course.iconUrl} alt={course.title} className="w-6 h-6" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{course.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{course.slug}</p>
                  </div>
                </div>
                <StatusBadge status={course.isPublished ? "PUBLISHED" : "DRAFT"} />
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Layers size={12} /> {course.levels.length} levels
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={12} /> {course.levels.reduce((a, l) => a + l.lessons.length, 0)} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> {course.enrollmentCount.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border/30">
                <Link href={`/admin/content/courses/${course.id}`} className="flex-1">
                  <button className="w-full h-8 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors">
                    Edit
                  </button>
                </Link>
                <button className="h-8 w-8 rounded-lg border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
                  {course.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  className="h-8 w-8 rounded-lg border border-border/50 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  onClick={() => {
                    setSelectedCourse(course);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">No courses found.</p>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Course"
        description={`Permanently delete "${selectedCourse?.title}"? All levels and lessons within will be deleted too.`}
        onConfirm={() => setDeleteDialogOpen(false)}
        destructive
        confirmText="Delete Course"
        requireConfirmation="DELETE"
      />
    </div>
  );
}
