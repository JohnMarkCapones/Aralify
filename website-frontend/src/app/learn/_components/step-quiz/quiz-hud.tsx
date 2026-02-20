"use client";

import { motion } from "framer-motion";
import { HeartDisplay } from "./heart-display";
import { TimerBar } from "./timer-bar";
import { ComboCounter } from "./combo-counter";
import type { QuizQuestion } from "@/lib/data/lesson-flow";
import { TIMER_DURATIONS } from "@/lib/data/lesson-flow";

interface QuizHudProps {
  hearts: number;
  maxHearts: number;
  combo: number;
  questionIndex: number;
  totalQuestions: number;
  currentQuestionType: QuizQuestion["type"];
  onTimeUp: () => void;
  isTimerPaused: boolean;
  isTimerActive: boolean;
  totalXp: number;
}

export function QuizHud({
  hearts,
  maxHearts,
  combo,
  questionIndex,
  totalQuestions,
  currentQuestionType,
  onTimeUp,
  isTimerPaused,
  isTimerActive,
  totalXp,
}: QuizHudProps) {
  return (
    <div className="w-full space-y-2">
      {/* Top row: Hearts | Question counter | XP */}
      <div className="flex items-center justify-between">
        <HeartDisplay current={hearts} max={maxHearts} />
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium text-muted-foreground">
            {questionIndex + 1}/{totalQuestions}
          </span>
          <ComboCounter combo={combo} />
          <motion.div
            key={totalXp}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold text-primary"
          >
            {totalXp} XP
          </motion.div>
        </div>
      </div>

      {/* Timer bar */}
      <TimerBar
        key={`timer-${questionIndex}`}
        duration={TIMER_DURATIONS[currentQuestionType]}
        isPaused={isTimerPaused}
        onTimeUp={onTimeUp}
        isActive={isTimerActive}
      />
    </div>
  );
}
