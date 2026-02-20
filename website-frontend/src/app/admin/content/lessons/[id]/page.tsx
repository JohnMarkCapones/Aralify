"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, Upload, BookOpen, Code2, HelpCircle,
  Settings, Plus, Trash2,
} from "lucide-react";
import { StatusBadge } from "../../../_components/status-badge";
import { cn } from "@/lib/utils";
import { mockCourses } from "@/lib/data/admin";

export default function AdminLessonEditorPage() {
  const { id } = useParams<{ id: string }>();

  let foundLesson = null;
  let parentCourse = null;
  for (const course of mockCourses) {
    for (const level of course.levels) {
      const lesson = level.lessons.find((l) => l.id === id);
      if (lesson) {
        foundLesson = lesson;
        parentCourse = course;
        break;
      }
    }
    if (foundLesson) break;
  }

  const lesson = foundLesson || mockCourses[0].levels[0].lessons[0];
  const course = parentCourse || mockCourses[0];

  const mockQuizQuestions = [
    { id: "q1", type: "Multiple Choice", question: "What is the output of print('Hello')?", options: ["Hello", "hello", "Error", "None"], correct: "Hello", hint: "Remember, print outputs exactly what's in the string." },
    { id: "q2", type: "True/False", question: "Python is a compiled language.", options: ["True", "False"], correct: "False", hint: "Think about how Python code is executed." },
    { id: "q3", type: "Fill Blank", question: "The function to get user input is ____().", options: [], correct: "input", hint: "It's a built-in function." },
  ];

  const inputCls = "w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";
  const textareaCls = "w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";
  const labelCls = "text-xs font-medium text-muted-foreground mb-1.5 block";

  return (
    <div className="space-y-6">
      <Link
        href={`/admin/content/courses/${course.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} /> Back to {course.title}
      </Link>

      {/* Lesson header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-semibold tracking-tight">{lesson.title}</h1>
            <StatusBadge status={lesson.difficulty} />
            <StatusBadge status={lesson.isPublished ? "PUBLISHED" : "DRAFT"} />
          </div>
          <p className="text-sm text-muted-foreground">{course.title} &middot; {lesson.slug}</p>
        </div>
        <div className="flex gap-2">
          <button className="h-8 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
            <Save size={13} /> Save Draft
          </button>
          <button className="h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
            <Upload size={13} /> Save & Publish
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-primary" /> Basic Info
          </h3>
          <div className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title</label>
                <input defaultValue={lesson.title} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Slug</label>
                <input defaultValue={lesson.slug} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Difficulty</label>
              <div className="flex gap-2">
                {(["EASY", "MEDIUM", "HARD"] as const).map((diff) => (
                  <button
                    key={diff}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-medium border transition-colors",
                      lesson.difficulty === diff
                        ? diff === "EASY"
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : diff === "MEDIUM"
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "bg-red-500 text-white border-red-500"
                        : "border-border/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {diff.charAt(0) + diff.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>XP Reward</label>
                <input type="number" defaultValue={lesson.xpReward} className={cn(inputCls, "w-32")} />
              </div>
              <div>
                <label className={labelCls}>Order Index</label>
                <input type="number" defaultValue={lesson.orderIndex} className={cn(inputCls, "w-32")} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-blue-500" /> Lesson Content
          </h3>
          <div>
            <label className={labelCls}>Content (JSON)</label>
            <textarea
              rows={8}
              defaultValue={JSON.stringify({ sections: [{ type: "text", content: "Lesson content goes here..." }] }, null, 2)}
              className={cn(textareaCls, "font-mono text-xs")}
            />
          </div>
        </div>

        {/* Quiz Questions */}
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <HelpCircle size={16} className="text-purple-500" /> Quiz Questions
          </h3>
          <div className="space-y-4">
            {mockQuizQuestions.map((q, i) => (
              <div key={q.id} className="p-4 rounded-lg bg-muted/30 border border-border/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Question {i + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <select defaultValue={q.type} className="h-7 px-2 rounded-lg border border-border/50 bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Multiple Choice</option>
                      <option>Fill Blank</option>
                      <option>True/False</option>
                      <option>Code</option>
                    </select>
                    <button className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <input defaultValue={q.question} placeholder="Question text" className={inputCls} />
                {q.options.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.options.map((opt, j) => (
                      <input
                        key={j}
                        defaultValue={opt}
                        className={cn(
                          inputCls,
                          "text-xs",
                          opt === q.correct && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                        )}
                      />
                    ))}
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground">Hint</label>
                  <input defaultValue={q.hint} className={cn(inputCls, "text-xs mt-1")} />
                </div>
              </div>
            ))}
            <button className="h-8 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
              <Plus size={13} /> Add Question
            </button>
          </div>
        </div>

        {/* Code Challenge */}
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Code2 size={16} className="text-emerald-500" /> Code Challenge
          </h3>
          <div className="grid gap-4">
            <div>
              <label className={labelCls}>Starter Code</label>
              <textarea rows={5} defaultValue={'# Write your solution here\ndef solve():\n    pass'} className={cn(textareaCls, "font-mono text-xs")} />
            </div>
            <div>
              <label className={labelCls}>Solution Code</label>
              <textarea rows={5} defaultValue={'def solve():\n    return "Hello, World!"'} className={cn(textareaCls, "font-mono text-xs")} />
            </div>
            <div>
              <label className={labelCls}>Test Cases (JSON)</label>
              <textarea rows={4} defaultValue={JSON.stringify([{ input: "", expectedOutput: "Hello, World!" }], null, 2)} className={cn(textareaCls, "font-mono text-xs")} />
            </div>
            <div>
              <label className={labelCls}>Hints</label>
              <textarea rows={2} defaultValue="Think about what the function should return." className={textareaCls} />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Settings size={16} className="text-gray-500" /> Lesson Settings
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Min Quiz Score (%)</label>
              <input type="number" defaultValue={lesson.minQuizScore || 70} className={cn(inputCls, "w-24")} />
            </div>
            <div>
              <label className={labelCls}>Time Limit (sec)</label>
              <input type="number" defaultValue={lesson.timeLimitSeconds || 0} placeholder="0 = none" className={cn(inputCls, "w-24")} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked={lesson.isPublished} className="w-4 h-4 rounded border-border/50 accent-primary" />
                <span className="text-sm font-medium">Published</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
