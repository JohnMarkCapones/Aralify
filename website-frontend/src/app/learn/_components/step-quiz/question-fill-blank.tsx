"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";
import type { FillBlankQuestion } from "@/lib/data/lesson-flow";

function getCorrectFeedback(combo: number): string {
  if (combo >= 5) return "Unstoppable!";
  if (combo >= 3) return "You're on fire!";
  if (combo >= 2) return "Nice streak!";
  return "Correct!";
}

interface QuestionFillBlankProps {
  question: FillBlankQuestion;
  onAnswer: (correct: boolean) => void;
  showHint?: boolean;
  timedOut?: boolean;
  combo?: number;
}

export function QuestionFillBlank({
  question,
  onAnswer,
  showHint = false,
  timedOut = false,
  combo = 0,
}: QuestionFillBlankProps) {
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (timedOut && !answered) {
      setAnswered(true);
      onAnswer(false);
    }
  }, [timedOut, answered, onAnswer]);

  const handleSubmit = () => {
    if (!input.trim() || answered) return;
    setAnswered(true);
    const correct = input.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    onAnswer(correct);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const isCorrect = input.trim().toLowerCase() === question.correctAnswer.toLowerCase();
  const parts = question.codeTemplate.split("___BLANK___");

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

      {/* Code template with input */}
      <div className="max-w-md mx-auto rounded-xl border border-border/30 overflow-hidden bg-zinc-950 p-4">
        <div
          className="flex items-center flex-wrap gap-0 text-sm"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <span className="text-zinc-400">{parts[0]}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={answered}
            className={cn(
              "bg-zinc-800 border-2 border-dashed rounded-lg px-3 py-1.5 text-sm outline-none min-w-[100px] max-w-[160px] text-center",
              !answered && "border-primary/50 text-emerald-400 focus:border-primary",
              answered && isCorrect && "border-emerald-500 text-emerald-400",
              answered && !isCorrect && "border-red-500 text-red-400"
            )}
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            placeholder="..."
            autoFocus
          />
          <span className="text-zinc-400">{parts[1]}</span>
        </div>
      </div>

      {/* Submit button */}
      {!answered && !timedOut && (
        <div className="text-center">
          <NeoButton
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!input.trim()}
          >
            Check Answer
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
            timedOut
              ? "bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
              : isCorrect
              ? "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
              : "bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            {timedOut ? (
              <XCircle size={18} className="text-red-500" />
            ) : isCorrect ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <XCircle size={18} className="text-red-500" />
            )}
            <p className="font-semibold">
              {timedOut
                ? "Time's up!"
                : isCorrect
                ? getCorrectFeedback(combo)
                : `Not quite! The answer is: ${question.correctAnswer}`}
            </p>
          </div>
          <p className="text-muted-foreground text-xs">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
