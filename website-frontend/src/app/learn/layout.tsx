"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Suspense } from "react";

function CloseButton() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId") || "crs_001";

  return (
    <Link
      href={`/dashboard/courses/${courseId}`}
      className="p-2 rounded-xl border border-border/40 hover:border-border hover:bg-muted/40 transition-colors"
      aria-label="Close lesson"
    >
      <X size={20} />
    </Link>
  );
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col">
      {/* Minimal top bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <Suspense fallback={<div className="w-9 h-9" />}>
            <CloseButton />
          </Suspense>
          <span className="text-sm font-display font-bold uppercase tracking-wider text-muted-foreground">
            Aralify
          </span>
          <div id="learn-header-actions" className="flex items-center gap-2 min-w-[36px] justify-end" />
        </div>
      </header>

      {/* Lesson content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
