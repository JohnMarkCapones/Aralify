"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LessonStep } from "@/lib/data/lesson-flow";

const steps: { key: LessonStep; label: string }[] = [
  { key: "learn", label: "Learn" },
  { key: "quiz", label: "Quiz" },
  { key: "code", label: "Code" },
  { key: "complete", label: "Complete" },
];

/**
 * Maps every LessonStep (including transition screens) to a progress-bar index.
 * "intro" → -1  (nothing highlighted, pre-step)
 * "learn" → 0
 * "quiz-brief" → 0  (learn completed, same highlight as learn)
 * "quiz" → 1
 * "code" → 2
 * "complete" → 3
 */
const stepIndex: Record<LessonStep, number> = {
  intro: -1,
  learn: 0,
  "quiz-brief": 0,
  quiz: 1,
  code: 2,
  complete: 3,
};

const stepLabel: Record<LessonStep, string> = {
  intro: "Intro",
  learn: "Learn",
  "quiz-brief": "Quiz",
  quiz: "Quiz",
  code: "Code",
  complete: "Complete",
};

interface LessonProgressBarProps {
  currentStep: LessonStep;
}

export function LessonProgressBar({ currentStep }: LessonProgressBarProps) {
  const currentIdx = stepIndex[currentStep];
  const displayLabel = stepLabel[currentStep];
  const displayStepNum = Math.max(currentIdx + 1, 1);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      {/* Step label */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {displayLabel}
        </span>
        <span className="text-[10px] font-medium text-muted-foreground/60">
          Step {displayStepNum}/4
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-1.5">
        {steps.map((step, i) => (
          <div
            key={step.key}
            className={cn(
              "relative h-2 flex-1 rounded-full overflow-hidden",
              "bg-muted/50 border border-border/20"
            )}
          >
            {i <= currentIdx && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/80"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 0.4,
                  delay: i === currentIdx ? 0.1 : 0,
                  ease: "easeOut",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
