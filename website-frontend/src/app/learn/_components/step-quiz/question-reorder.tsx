"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reorder } from "framer-motion";
import { GripVertical, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";
import type { ReorderQuestion } from "@/lib/data/lesson-flow";

function getCorrectFeedback(combo: number): string {
  if (combo >= 5) return "Unstoppable!";
  if (combo >= 3) return "You're on fire!";
  if (combo >= 2) return "Nice streak!";
  return "Perfect order!";
}

interface QuestionReorderProps {
  question: ReorderQuestion;
  onAnswer: (correct: boolean) => void;
  showHint?: boolean;
  timedOut?: boolean;
  combo?: number;
}

export function QuestionReorder({
  question,
  onAnswer,
  showHint = false,
  timedOut = false,
  combo = 0,
}: QuestionReorderProps) {
  const [order, setOrder] = useState<number[]>(() => {
    const indices = question.lines.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (timedOut && !answered) {
      setAnswered(true);
      const correct = order.every((val, idx) => val === question.correctOrder[idx]);
      onAnswer(correct);
    }
  }, [timedOut, answered, order, question.correctOrder, onAnswer]);

  const handleSubmit = () => {
    if (answered) return;
    setAnswered(true);
    const correct = order.every((val, idx) => val === question.correctOrder[idx]);
    onAnswer(correct);
  };

  const isCorrect = order.every((val, idx) => val === question.correctOrder[idx]);

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
            className="flex items-start gap-2 px-4 py-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 max-w-md mx-auto"
          >
            <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400">{question.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reorderable list */}
      <div className="max-w-md mx-auto">
        <Reorder.Group
          axis="y"
          values={order}
          onReorder={answered ? () => {} : setOrder}
          className="space-y-2"
        >
          {order.map((lineIdx, position) => {
            const showCorrectPosition = answered;
            const isInCorrectPosition = question.correctOrder[position] === lineIdx;

            return (
              <Reorder.Item
                key={lineIdx}
                value={lineIdx}
                dragListener={!answered}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border-2 text-sm select-none",
                  !answered && "border-border/40 bg-card cursor-grab active:cursor-grabbing",
                  showCorrectPosition && isInCorrectPosition &&
                    "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20",
                  showCorrectPosition && !isInCorrectPosition &&
                    "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                )}
              >
                <GripVertical size={16} className="text-muted-foreground/50 shrink-0" />
                <span
                  className="flex-1 font-mono text-xs sm:text-sm"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {question.lines[lineIdx]}
                </span>
                {showCorrectPosition && (
                  isInCorrectPosition ? (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle size={16} className="text-red-500 shrink-0" />
                  )
                )}
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      {/* Submit button */}
      {!answered && !timedOut && (
        <div className="text-center">
          <NeoButton variant="primary" size="sm" onClick={handleSubmit}>
            Check Order
          </NeoButton>
        </div>
      )}

      {/* Feedback */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-center p-4 rounded-xl text-sm max-w-md mx-auto",
            timedOut && !isCorrect
              ? "bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
              : isCorrect
              ? "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
              : "bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
          )}
        >
          <p className="font-semibold mb-1">
            {timedOut && !isCorrect ? "Time's up!" : isCorrect ? getCorrectFeedback(combo) : "Not quite right!"}
          </p>
          <p className="text-muted-foreground text-xs">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
