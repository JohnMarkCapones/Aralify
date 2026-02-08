"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle, Sparkles } from "lucide-react";

// ─── Token-based syntax highlighting ─────────────────────────────────────────

type Token = { text: string; color: string };
type CodeLine = Token[];

interface CodeSlide {
  label: string;
  fileName: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  lines: CodeLine[];
  output: string;
  xp: string;
}

const SLIDES: CodeSlide[] = [
  {
    label: "Python Basics",
    fileName: "main.py",
    difficulty: "EASY",
    lines: [
      [
        { text: "def ", color: "#C4B5FD" },
        { text: "greet", color: "#93C5FD" },
        { text: "(name):", color: "#9CA3AF" },
      ],
      [
        { text: '    return ', color: "#C4B5FD" },
        { text: 'f"Hello, ', color: "#86EFAC" },
        { text: "{name}", color: "#FCA5A5" },
        { text: '!"', color: "#86EFAC" },
      ],
      [],
      [
        { text: "print", color: "#93C5FD" },
        { text: "(greet(", color: "#9CA3AF" },
        { text: '"World"', color: "#86EFAC" },
        { text: "))", color: "#9CA3AF" },
      ],
    ],
    output: "Hello, World!",
    xp: "+50 XP",
  },
  {
    label: "JavaScript",
    fileName: "app.js",
    difficulty: "MEDIUM",
    lines: [
      [
        { text: "const ", color: "#C4B5FD" },
        { text: "nums ", color: "#F472B6" },
        { text: "= [", color: "#9CA3AF" },
        { text: "1", color: "#FCA5A5" },
        { text: ", ", color: "#9CA3AF" },
        { text: "2", color: "#FCA5A5" },
        { text: ", ", color: "#9CA3AF" },
        { text: "3", color: "#FCA5A5" },
        { text: ", ", color: "#9CA3AF" },
        { text: "4", color: "#FCA5A5" },
        { text: ", ", color: "#9CA3AF" },
        { text: "5", color: "#FCA5A5" },
        { text: "];", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "const ", color: "#C4B5FD" },
        { text: "sum ", color: "#F472B6" },
        { text: "= ", color: "#9CA3AF" },
        { text: "nums", color: "#F472B6" },
        { text: ".reduce", color: "#93C5FD" },
        { text: "(", color: "#9CA3AF" },
      ],
      [
        { text: "  (a, b)", color: "#FCA5A5" },
        { text: " => ", color: "#C4B5FD" },
        { text: "a + b", color: "#F472B6" },
        { text: ", ", color: "#9CA3AF" },
        { text: "0", color: "#FCA5A5" },
      ],
      [
        { text: ");", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "console", color: "#F472B6" },
        { text: ".log", color: "#93C5FD" },
        { text: "(sum);", color: "#9CA3AF" },
      ],
    ],
    output: "15",
    xp: "+100 XP (2x)",
  },
  {
    label: "Daily Challenge",
    fileName: "challenge.js",
    difficulty: "HARD",
    lines: [
      [
        { text: "function ", color: "#C4B5FD" },
        { text: "fibonacci", color: "#93C5FD" },
        { text: "(n) {", color: "#9CA3AF" },
      ],
      [
        { text: "  if ", color: "#C4B5FD" },
        { text: "(n <= ", color: "#9CA3AF" },
        { text: "1", color: "#FCA5A5" },
        { text: ") return ", color: "#C4B5FD" },
        { text: "n;", color: "#FCA5A5" },
      ],
      [
        { text: "  return ", color: "#C4B5FD" },
        { text: "fibonacci", color: "#93C5FD" },
        { text: "(n - ", color: "#9CA3AF" },
        { text: "1", color: "#FCA5A5" },
        { text: ")", color: "#9CA3AF" },
      ],
      [
        { text: "       + ", color: "#9CA3AF" },
        { text: "fibonacci", color: "#93C5FD" },
        { text: "(n - ", color: "#9CA3AF" },
        { text: "2", color: "#FCA5A5" },
        { text: ");", color: "#9CA3AF" },
      ],
      [
        { text: "}", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "console", color: "#F472B6" },
        { text: ".log", color: "#93C5FD" },
        { text: "(fibonacci(", color: "#9CA3AF" },
        { text: "10", color: "#FCA5A5" },
        { text: "));", color: "#9CA3AF" },
      ],
    ],
    output: "All tests passed!",
    xp: "+150 XP (3x)",
  },
];

// ─── Flatten tokens for character-by-character typing ────────────────────────

function flattenSnippet(lines: CodeLine[]) {
  const chars: { char: string; color: string }[] = [];

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (line.length === 0) {
      chars.push({ char: "\n", color: "#9CA3AF" });
    } else {
      for (const token of line) {
        for (const ch of token.text) {
          chars.push({ char: ch, color: token.color });
        }
      }
      chars.push({ char: "\n", color: "#9CA3AF" });
    }
  }

  return chars;
}

// ─── Typing animation hook ──────────────────────────────────────────────────

function useTypingAnimation(lines: CodeLine[], speed = 35) {
  const chars = flattenSnippet(lines);
  const totalChars = chars.length;
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisibleCount(0);
    setDone(false);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= totalChars) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [totalChars, speed]);

  // Build visible lines from flat char array
  const visibleChars = chars.slice(0, visibleCount);
  const renderedLines: { tokens: { char: string; color: string }[] }[] = [];
  let currentLine: { char: string; color: string }[] = [];

  for (const ch of visibleChars) {
    if (ch.char === "\n") {
      renderedLines.push({ tokens: [...currentLine] });
      currentLine = [];
    } else {
      currentLine.push({ char: ch.char, color: ch.color });
    }
  }
  if (currentLine.length > 0) {
    renderedLines.push({ tokens: currentLine });
  }

  return { renderedLines, done, cursorLine: renderedLines.length - 1 };
}

// ─── Main HeroCodeCard component ────────────────────────────────────────────

export function HeroCodeCard() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  const slide = SLIDES[slideIndex];
  const { renderedLines, done, cursorLine } = useTypingAnimation(slide.lines, 40);

  const advanceSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setCycleKey((prev) => prev + 1);
  }, []);

  // Auto-cycle: after typing is done, wait 2.5s then advance
  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(advanceSlide, 2500);
    return () => clearTimeout(timeout);
  }, [done, cycleKey, advanceSlide]);

  const difficultyColors =
    slide.difficulty === "EASY"
      ? "bg-green-200 text-green-800 dark:bg-green-900/40 dark:text-green-300"
      : slide.difficulty === "MEDIUM"
        ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
        : "bg-red-200 text-red-800 dark:bg-red-900/40 dark:text-red-300";

  return (
    <div className="w-full max-w-[480px] bg-card neo-brutal-border neo-brutal-shadow-lg rounded-3xl overflow-hidden">
      {/* Terminal header */}
      <div className="w-full h-12 bg-foreground flex items-center px-6 gap-2.5">
        <div className="w-3 h-3 rounded-full bg-destructive" />
        <div className="w-3 h-3 rounded-full bg-accent" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-auto text-background font-mono text-xs tracking-wider flex items-center gap-2">
          <Terminal size={14} />
          {slide.fileName}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-primary text-[10px]"
            >
              typing...
            </motion.span>
          )}
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-5">
        {/* Lesson header */}
        <div className="flex items-center justify-between">
          <div className="font-black text-lg">{slide.label}</div>
          <span
            className={`px-3 py-1 text-xs font-black uppercase neo-brutal-border rounded-full ${difficultyColors}`}
          >
            {slide.difficulty}
          </span>
        </div>

        {/* Code area with typing animation */}
        <div className="bg-[#0d1117] text-white rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm neo-brutal-border min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cycleKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderedLines.map((line, li) => (
                <div key={li} className="flex">
                  <span className="w-5 text-right mr-3 text-white/20 select-none flex-shrink-0 text-[10px]">
                    {li + 1}
                  </span>
                  <span className="flex-1 whitespace-pre">
                    {line.tokens.map((t, ti) => (
                      <span key={ti} style={{ color: t.color }}>
                        {t.char}
                      </span>
                    ))}
                    {li === cursorLine && (
                      <motion.span
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          times: [0, 0.5, 0.5, 1],
                        }}
                        className="inline-block w-[6px] h-[13px] bg-white/80 ml-px translate-y-[2px]"
                      />
                    )}
                  </span>
                </div>
              ))}
              {/* Fill empty lines to keep consistent height */}
              {renderedLines.length < 7 &&
                Array.from({ length: 7 - renderedLines.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="flex">
                    <span className="w-5 text-right mr-3 text-white/20 select-none flex-shrink-0 text-[10px]">
                      {renderedLines.length + i + 1}
                    </span>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Output + XP reveal (appears after typing finishes) */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl neo-brutal-border border-green-500"
            >
              <CheckCircle size={20} className="text-green-600 shrink-0" />
              <div className="font-mono font-bold text-green-700 dark:text-green-400 text-sm">
                {slide.output}
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
                className="ml-auto flex items-center gap-1 text-primary font-black text-sm"
              >
                <Sparkles size={14} /> {slide.xp}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide progress dots */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full neo-brutal-border transition-all duration-300 ${
                i === slideIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
