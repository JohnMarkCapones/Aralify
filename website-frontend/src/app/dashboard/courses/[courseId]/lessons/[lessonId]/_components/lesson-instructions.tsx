"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { DifficultySelector } from "./difficulty-selector";
import type { LessonDetail } from "@/lib/data/dashboard";

interface LessonInstructionsProps {
  lesson: LessonDetail;
  selectedDifficulty: "easy" | "medium" | "hard";
  onDifficultyChange: (d: "easy" | "medium" | "hard") => void;
}

export function LessonInstructions({
  lesson,
  selectedDifficulty,
  onDifficultyChange,
}: LessonInstructionsProps) {
  const [revealedHints, setRevealedHints] = useState(0);

  const revealNextHint = () => {
    if (revealedHints < lesson.hints.length) {
      setRevealedHints((p) => p + 1);
    }
  };

  // Simple markdown-like rendering for instructions
  const renderInstructions = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeKey = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${codeKey++}`}
              className="bg-muted/50 border border-border/30 rounded-lg p-3 text-xs font-mono overflow-x-auto my-2"
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      if (line.startsWith("# ")) {
        elements.push(
          <h2 key={i} className="text-base font-bold mt-4 mb-2">
            {line.slice(2)}
          </h2>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h3 key={i} className="text-sm font-semibold mt-3 mb-1.5">
            {line.slice(3)}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="text-sm text-muted-foreground ml-4 list-disc">
            {renderInlineCode(line.slice(2))}
          </li>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {renderInlineCode(line)}
          </p>
        );
      }
    }

    return elements;
  };

  const renderInlineCode = (text: string) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="bg-muted/60 px-1.5 py-0.5 rounded text-xs font-mono text-foreground"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      // Handle bold
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bp, j) => {
        if (bp.startsWith("**") && bp.endsWith("**")) {
          return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
        }
        return bp;
      });
    });
  };

  const currentTier = lesson.tiers.find((t) => t.difficulty === selectedDifficulty);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <h2 className="text-base font-bold mb-2">{lesson.title}</h2>
        <DifficultySelector
          selected={selectedDifficulty}
          onSelect={onDifficultyChange}
        />
        {currentTier && (
          <p className="text-[11px] text-muted-foreground mt-2 italic">
            {currentTier.description}
          </p>
        )}
      </div>

      {/* Instructions body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5">
        {renderInstructions(lesson.instructions)}
      </div>

      {/* Hints section */}
      <div className="p-4 border-t border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={14} className="text-amber-500" />
          <span className="text-xs font-semibold">
            Hints ({revealedHints}/{lesson.hints.length})
          </span>
        </div>

        <AnimatePresence>
          {lesson.hints.slice(0, revealedHints).map((hint, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-xs text-muted-foreground bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/30 dark:border-amber-800/30 rounded-lg p-2.5 mb-1.5"
            >
              {renderInlineCode(hint)}
            </motion.p>
          ))}
        </AnimatePresence>

        {revealedHints < lesson.hints.length && (
          <button
            onClick={revealNextHint}
            className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
          >
            Show hint {revealedHints + 1}
          </button>
        )}
      </div>

      {/* Prev / Next nav */}
      <div className="p-4 border-t border-border/30 flex items-center justify-between">
        {lesson.prevLessonId ? (
          <Link
            href={`/dashboard/courses/${lesson.courseId}/lessons/${lesson.prevLessonId}`}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={14} /> Previous
          </Link>
        ) : (
          <div />
        )}
        {lesson.nextLessonId ? (
          <Link
            href={`/dashboard/courses/${lesson.courseId}/lessons/${lesson.nextLessonId}`}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Next <ChevronRight size={14} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
