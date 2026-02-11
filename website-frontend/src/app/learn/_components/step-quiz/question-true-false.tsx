"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrueFalseQuestion } from "@/lib/data/lesson-flow";

function getCorrectFeedback(combo: number): string {
  if (combo >= 5) return "Unstoppable!";
  if (combo >= 3) return "You're on fire!";
  if (combo >= 2) return "Nice streak!";
  return "Correct!";
}

interface QuestionTrueFalseProps {
  question: TrueFalseQuestion;
  onAnswer: (correct: boolean) => void;
  showHint?: boolean;
  timedOut?: boolean;
  combo?: number;
}

export function QuestionTrueFalse({
  question,
  onAnswer,
  showHint = false,
  timedOut = false,
  combo = 0,
}: QuestionTrueFalseProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (timedOut && !answered) {
      setAnswered(true);
      onAnswer(false);
    }
  }, [timedOut, answered, onAnswer]);

  const handleSelect = (value: boolean) => {
    if (answered) return;
    setSelected(value);
    setAnswered(true);
    const correct = value === question.correctAnswer;
    onAnswer(correct);
  };

  const options = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-lg sm:text-xl font-display font-bold text-center px-4">
        {question.question}
      </h3>

      {/* Hint */}
      <AnimatePresence>
        {showHint && question.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 px-4 py-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 max-w-sm mx-auto"
          >
            <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400">{question.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 max-w-sm mx-auto">
        {options.map((opt) => {
          const isCorrect = opt.value === question.correctAnswer;
          const isSelected = opt.value === selected;
          const showResult = answered;

          return (
            <motion.button
              key={opt.label}
              onClick={() => handleSelect(opt.value)}
              whileTap={!answered ? { scale: 0.95 } : undefined}
              className={cn(
                "flex-1 py-5 rounded-xl border-2 text-lg font-display font-bold uppercase tracking-wider transition-all",
                !showResult &&
                  "border-border/40 hover:border-border hover:bg-muted/20",
                showResult && isCorrect &&
                  "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400",
                showResult && isSelected && !isCorrect &&
                  "border-red-500 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400",
                showResult && !isSelected && !isCorrect &&
                  "border-border/20 opacity-50"
              )}
              disabled={answered}
            >
              <div className="flex flex-col items-center gap-2">
                <span>{opt.label}</span>
                {showResult && isCorrect && (
                  <CheckCircle2 size={20} className="text-emerald-500" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle size={20} className="text-red-500" />
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
              : selected === question.correctAnswer
              ? "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
              : "bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
          )}
        >
          <p className="font-semibold mb-1">
            {timedOut ? "Time's up!" : selected === question.correctAnswer ? getCorrectFeedback(combo) : "Not quite!"}
          </p>
          <p className="text-muted-foreground text-xs">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
