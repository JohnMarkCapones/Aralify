"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ChevronDown, ChevronRight, Eye, EyeOff,
  Trash2, Plus, Save, Upload, Users, BarChart3, Clock,
  GraduationCap,
} from "lucide-react";
import { StatusBadge } from "../../../_components/status-badge";
import { ConfirmDialog } from "../../../_components/confirm-dialog";
import { mockCourses } from "@/lib/data/admin";

export default function AdminCourseEditorPage() {
  const { id } = useParams<{ id: string }>();
  const course = mockCourses.find((c) => c.id === id) || mockCourses[0];

  const [expandedLevels, setExpandedLevels] = useState<string[]>([course.levels[0]?.id || ""]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; name: string } | null>(null);

  const toggleLevel = (levelId: string) => {
    setExpandedLevels((prev) =>
      prev.includes(levelId) ? prev.filter((id) => id !== levelId) : [...prev, levelId]
    );
  };

  const totalLessons = course.levels.reduce((a, l) => a + l.lessons.length, 0);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/content"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} /> Back to Content
      </Link>

      {/* Course header */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <div className="h-1.5" style={{ backgroundColor: course.color }} />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div
              className="w-12 h-12 rounded-lg border border-border/30 flex items-center justify-center shrink-0"
              style={{ backgroundColor: course.color + "15" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.iconUrl} alt={course.title} className="w-7 h-7" loading="lazy" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-semibold tracking-tight">{course.title}</h1>
                <StatusBadge status={course.isPublished ? "PUBLISHED" : "DRAFT"} />
              </div>
              <p className="text-sm text-muted-foreground">{course.slug} &middot; {course.language}</p>
            </div>
            <div className="flex gap-2">
              <button className="h-8 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
                <Save size={13} /> Save
              </button>
              <button className="h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                <Upload size={13} /> Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Edit form */}
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
              <GraduationCap size={16} className="text-primary" /> Course Details
            </h3>
            <div className="grid gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
                <input defaultValue={course.title} className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
                <textarea
                  defaultValue={course.description}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Slug (read-only)</label>
                  <input defaultValue={course.slug} readOnly className="w-full h-9 px-3 rounded-lg border border-border/50 bg-muted/50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Language</label>
                  <select defaultValue={course.language} className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Python</option>
                    <option>JavaScript</option>
                    <option>TypeScript</option>
                    <option>HTML/CSS</option>
                    <option>SQL</option>
                    <option>Git</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Icon URL</label>
                  <input defaultValue={course.iconUrl} className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Color</label>
                  <div className="flex gap-2">
                    <input defaultValue={course.color} className="flex-1 h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
                    <div className="w-9 h-9 rounded-lg border border-border/30 shrink-0" style={{ backgroundColor: course.color }} />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Order Index</label>
                <input type="number" defaultValue={course.orderIndex} className="w-24 h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
              </div>
            </div>
          </div>

          {/* Levels accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Levels</h2>
              <button className="h-8 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
                <Plus size={14} /> Add Level
              </button>
            </div>

            {course.levels.map((level) => {
              const isExpanded = expandedLevels.includes(level.id);
              return (
                <div key={level.id} className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleLevel(level.id)}
                    className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                      <span className="text-sm font-medium">{level.title}</span>
                      <StatusBadge status={level.isPublished ? "PUBLISHED" : "DRAFT"} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {level.lessons.length} lessons
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border/50">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2">Lesson</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 hidden sm:table-cell">Difficulty</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 hidden md:table-cell">XP</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2">Status</th>
                            <th className="text-right text-xs font-medium text-muted-foreground px-5 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {level.lessons.map((lesson) => (
                            <tr key={lesson.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                              <td className="px-5 py-2.5">
                                <span className="text-sm font-medium">{lesson.title}</span>
                              </td>
                              <td className="px-3 py-2.5 hidden sm:table-cell">
                                <StatusBadge status={lesson.difficulty} />
                              </td>
                              <td className="px-3 py-2.5 hidden md:table-cell">
                                <span className="text-sm font-medium">{lesson.xpReward}</span>
                              </td>
                              <td className="px-3 py-2.5">
                                <StatusBadge status={lesson.isPublished ? "PUBLISHED" : "DRAFT"} />
                              </td>
                              <td className="px-5 py-2.5">
                                <div className="flex justify-end gap-1">
                                  <Link href={`/admin/content/lessons/${lesson.id}`}>
                                    <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Edit">
                                      <Eye size={14} />
                                    </button>
                                  </Link>
                                  <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title={lesson.isPublished ? "Unpublish" : "Publish"}>
                                    {lesson.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                                  </button>
                                  <button
                                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"
                                    title="Delete"
                                    onClick={() => {
                                      setDeleteTarget({ type: "lesson", name: lesson.title });
                                      setDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="px-5 py-3 border-t border-border/30">
                        <button className="h-7 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
                          <Plus size={13} /> Add Lesson
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold mb-4">Course Stats</h3>
            <div className="space-y-3">
              {[
                { icon: <Users size={14} />, label: "Enrollments", value: course.enrollmentCount.toLocaleString() },
                { icon: <BarChart3 size={14} />, label: "Completion Rate", value: `${course.completionRate}%` },
                { icon: <Clock size={14} />, label: "Avg. Time", value: "~45 min" },
                { icon: <GraduationCap size={14} />, label: "Total Lessons", value: String(totalLessons) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    {item.icon} {item.label}
                  </span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={`Delete ${deleteTarget?.type || "item"}`}
        description={`Permanently delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={() => setDeleteDialogOpen(false)}
        destructive
        confirmText="Delete"
        requireConfirmation="DELETE"
      />
    </div>
  );
}
