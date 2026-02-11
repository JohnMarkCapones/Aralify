"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MultipleChoiceQuestion } from "@/lib/data/lesson-flow";

function getCorrectFeedback(combo: number): string {
  if (combo >= 5) return "Unstoppable!";
  if (combo >= 3) return "You're on fire!";
  if (combo >= 2) return "Nice streak!";
  return "Correct!";
}

interface QuestionMultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
  eliminatedIndices?: number[];
  showHint?: boolean;
  timedOut?: boolean;
  combo?: number;
}

export function QuestionMultipleChoice({
  question,
  onAnswer,
  eliminatedIndices = [],
  showHint = false,
  timedOut = false,
  combo = 0,
}: QuestionMultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Handle time-up
  useEffect(() => {
    if (timedOut && !answered) {
      setAnswered(true);
      onAnswer(false);
    }
  }, [timedOut, answered, onAnswer]);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    const correct = index === question.correctIndex;
    onAnswer(correct);
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg sm:text-xl font-display font-bold text-center">
        {question.question}
      </h3>

      {/* Hint */}
      <AnimatePresence>
        {showHint && question.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 px-4 py-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 max-w-md mx-auto"
          >
            <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400">{question.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3 max-w-md mx-auto">
        {question.options.map((option, i) => {
          const isEliminated = eliminatedIndices.includes(i);
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          const showResult = answered;

          if (isEliminated) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 1, height: "auto" }}
                animate={{ opacity: 0.15, height: "auto" }}
                className="w-full text-left px-4 py-3.5 rounded-xl border-2 border-border/10 text-sm font-medium line-through text-muted-foreground/30 pointer-events-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold w-5">
                    {String.fromCharCode(65 + i)})
                  </span>
                  <span>{option}</span>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileTap={!answered ? { scale: 0.97 } : undefined}
              className={cn(
                "w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all",
                !showResult &&
                  "border-border/40 hover:border-border hover:bg-muted/20",
                showResult && isCorrect &&
                  "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400",
                showResult && isSelected && !isCorrect &&
                  "border-red-500 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400",
                showResult && !isSelected && !isCorrect &&
                  "border-border/20 opacity-50",
                timedOut && !isCorrect && "opacity-50"
              )}
              disabled={answered}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-5">
                    {String.fromCharCode(65 + i)})
                  </span>
                  <span>{option}</span>
                </div>
                {showResult && isCorrect && (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle size={18} className="text-red-500 shrink-0" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-center p-4 rounded-xl text-sm max-w-md mx-auto",
            timedOut
              ? "bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
              : selected === question.correctIndex
              ? "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
              : "bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
          )}
        >
          <p className="font-semibold mb-1">
            {timedOut
              ? "Time's up!"
              : selected === question.correctIndex
              ? getCorrectFeedback(combo)
              : "Not quite!"}
          </p>
          <p className="text-muted-foreground text-xs">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
