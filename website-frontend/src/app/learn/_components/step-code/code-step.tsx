"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, SkipForward } from "lucide-react";
import { CodeEditor } from "@/app/dashboard/courses/[courseId]/lessons/[lessonId]/_components/code-editor";
import { OutputPanel } from "@/app/dashboard/courses/[courseId]/lessons/[lessonId]/_components/output-panel";
import { DifficultySelector } from "@/app/dashboard/courses/[courseId]/lessons/[lessonId]/_components/difficulty-selector";
import { NeoButton } from "@/components/ui/neo-button";
import type { LessonFlowData } from "@/lib/data/lesson-flow";
import type { TestCase } from "@/lib/data/dashboard";

interface CodeStepProps {
  lesson: LessonFlowData;
  onComplete: (testsPassed: number, difficulty: "easy" | "medium" | "hard") => void;
}

export function CodeStep({ lesson, onComplete }: CodeStepProps) {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const tier = lesson.tiers.find((t) => t.difficulty === difficulty) || lesson.tiers[0];

  const [code, setCode] = useState(tier.starterCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestCase[] | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleDifficultyChange = useCallback(
    (d: "easy" | "medium" | "hard") => {
      setDifficulty(d);
      const newTier = lesson.tiers.find((t) => t.difficulty === d);
      if (newTier) setCode(newTier.starterCode);
      setOutput("");
      setTestResults(null);
      setHasSubmitted(false);
    },
    [lesson.tiers]
  );

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setOutput("");
    // Simulate code execution
    setTimeout(() => {
      setOutput(`>>> Running ${lesson.language} code...\n\nHello, World!\n`);
      setIsRunning(false);
    }, 1200);
  }, [lesson.language]);

  const handleSubmit = useCallback(() => {
    setIsRunning(true);
    setOutput("");
    // Simulate test execution
    setTimeout(() => {
      const results: TestCase[] = lesson.testCases.map((tc) => ({
        ...tc,
        passed: Math.random() > 0.3, // Simulate passing
      }));
      setTestResults(results);
      setOutput(
        `>>> Running tests...\n\n${results.filter((r) => r.passed).length}/${results.length} tests passed`
      );
      setIsRunning(false);
      setHasSubmitted(true);
    }, 1500);
  }, [lesson.testCases]);

  const handleReset = useCallback(() => {
    setCode(tier.starterCode);
    setOutput("");
    setTestResults(null);
    setHasSubmitted(false);
  }, [tier.starterCode]);

  const testsPassed = testResults?.filter((t) => t.passed).length ?? 0;
  const allPassed = testResults !== null && testsPassed === testResults.length;

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Task header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-display font-bold">{lesson.title}: Code Challenge</h3>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </div>
        <DifficultySelector selected={difficulty} onSelect={handleDifficultyChange} />
      </div>

      {/* Code editor + output */}
      <div className="flex-1 grid grid-rows-[1fr_auto] rounded-xl border border-border/30 overflow-hidden min-h-[400px]">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={lesson.language}
          onRun={handleRun}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isRunning={isRunning}
        />
        <div className="h-[180px]">
          <OutputPanel
            output={output}
            testResults={testResults}
            isRunning={isRunning}
          />
        </div>
      </div>

      {/* Continue buttons */}
      {hasSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 pt-2"
        >
          {allPassed ? (
            <NeoButton
              variant="primary"
              size="md"
              onClick={() => onComplete(testsPassed, difficulty)}
            >
              Continue
              <ArrowRight size={16} className="ml-2" />
            </NeoButton>
          ) : (
            <>
              <NeoButton
                variant="outline"
                size="sm"
                onClick={() => onComplete(testsPassed, difficulty)}
              >
                <SkipForward size={14} className="mr-1" />
                Continue Anyway
              </NeoButton>
              <NeoButton variant="primary" size="sm" onClick={handleSubmit}>
                Try Again
              </NeoButton>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
