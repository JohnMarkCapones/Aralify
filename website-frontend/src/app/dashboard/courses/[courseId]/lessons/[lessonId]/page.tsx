"use client";

import { use, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLesson } from "@/hooks/api";
import type { TestCase } from "@/lib/data/dashboard";
import { LessonInstructions } from "./_components/lesson-instructions";
import { CodeEditor } from "./_components/code-editor";
import { OutputPanel } from "./_components/output-panel";

type MobileTab = "instructions" | "code" | "output";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const { data: apiLesson, isLoading } = useLesson(lessonId);

  // Map API lesson to local shape expected by sub-components
  const lesson = apiLesson ? {
    id: apiLesson.id,
    title: apiLesson.title,
    courseId: apiLesson.courseSlug,
    courseTitle: apiLesson.courseTitle,
    order: apiLesson.orderIndex,
    instructions: apiLesson.content?.theoryCards?.map((c) => c.content).join("\n\n") ?? "",
    language: apiLesson.language,
    tiers: apiLesson.tiers?.map((t) => ({
      difficulty: t.difficulty as "easy" | "medium" | "hard",
      xpMultiplier: t.xpMultiplier,
      starterCode: t.starterCode,
      description: t.description,
    })) ?? [],
    testCases: (apiLesson.testCases ?? []).map((tc): { input: string; expectedOutput: string; description: string; passed: boolean } => ({
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      description: tc.description ?? "",
      passed: false,
    })),
    hints: apiLesson.hints ?? [],
    xpReward: apiLesson.xpReward,
    prevLessonId: apiLesson.previousLesson?.id ?? null,
    nextLessonId: apiLesson.nextLesson?.id ?? null,
  } : null;

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [code, setCode] = useState(lesson?.tiers[0]?.starterCode ?? "");
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<TestCase[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("instructions");

  const currentTier = lesson?.tiers.find((t) => t.difficulty === difficulty);
  const xpDisplay = lesson ? lesson.xpReward * (currentTier?.xpMultiplier ?? 1) : 0;

  const handleDifficultyChange = useCallback(
    (d: "easy" | "medium" | "hard") => {
      setDifficulty(d);
      const tier = lesson?.tiers.find((t) => t.difficulty === d);
      if (tier) setCode(tier.starterCode);
      setOutput("");
      setTestResults(null);
    },
    [lesson]
  );

  const handleReset = useCallback(() => {
    if (currentTier) setCode(currentTier.starterCode);
    setOutput("");
    setTestResults(null);
  }, [currentTier]);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setOutput("");
    // Simulate execution delay
    setTimeout(() => {
      setOutput(`>>> Running ${lesson?.language} code...\n\nOutput:\n(2, 1)\n("b", "a")\n\nExecution completed in 0.03s`);
      setIsRunning(false);
    }, 1500);
  }, [lesson]);

  const handleSubmit = useCallback(() => {
    setIsRunning(true);
    setTestResults(null);
    // Simulate test execution
    setTimeout(() => {
      if (lesson) {
        setTestResults(lesson.testCases);
        const passed = lesson.testCases.filter((t) => t.passed).length;
        const total = lesson.testCases.length;
        setOutput(
          `>>> Running tests...\n\n${passed}/${total} tests passed.\n${passed === total ? "All tests passed! +${xpDisplay} XP" : "Some tests failed. Try again!"}`
        );
      }
      setIsRunning(false);
    }, 1500);
  }, [lesson, xpDisplay]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold">Lesson not found</p>
        <p className="text-sm text-muted-foreground mt-1">
          This lesson doesn&apos;t have detailed content yet.
        </p>
        <Link
          href={`/dashboard/courses/${courseId}`}
          className="text-sm text-primary hover:underline mt-3 inline-block"
        >
          Back to course
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-background shrink-0">
        <Link
          href={`/dashboard/courses/${courseId}`}
          className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">{lesson.courseTitle}</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <h1 className="text-sm font-bold truncate mx-3">{lesson.title}</h1>

        <motion.div
          className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary animate-xp-shimmer shrink-0"
          key={xpDisplay}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Zap size={12} />
          +{xpDisplay} XP
        </motion.div>
      </div>

      {/* Mobile tabs */}
      <div className="flex lg:hidden border-b border-border/30 shrink-0">
        {(["instructions", "code", "output"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setMobileTab(t)}
            className={cn(
              "flex-1 py-2 text-xs font-semibold text-center transition-colors capitalize",
              mobileTab === t
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Desktop: split layout */}
      <div className="flex-1 overflow-hidden hidden lg:flex">
        {/* Left: instructions */}
        <div className="w-[40%] border-r border-border/30 overflow-hidden flex flex-col">
          <LessonInstructions
            lesson={lesson}
            selectedDifficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
        </div>

        {/* Right: editor + output */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={lesson.language}
              onRun={handleRun}
              onSubmit={handleSubmit}
              onReset={handleReset}
              isRunning={isRunning}
            />
          </div>
          <div className="h-[35%] min-h-[120px]">
            <OutputPanel
              output={output}
              testResults={testResults}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>

      {/* Mobile: tabbed layout */}
      <div className="flex-1 overflow-hidden lg:hidden">
        {mobileTab === "instructions" && (
          <div className="h-full overflow-y-auto">
            <LessonInstructions
              lesson={lesson}
              selectedDifficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
            />
          </div>
        )}
        {mobileTab === "code" && (
          <div className="h-full">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={lesson.language}
              onRun={handleRun}
              onSubmit={handleSubmit}
              onReset={handleReset}
              isRunning={isRunning}
            />
          </div>
        )}
        {mobileTab === "output" && (
          <div className="h-full">
            <OutputPanel
              output={output}
              testResults={testResults}
              isRunning={isRunning}
            />
          </div>
        )}
      </div>
    </div>
  );
}
