"use client";

import { use, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, Zap, Play, Send, RotateCcw,
  Clock, Lightbulb, CheckCircle2, XCircle,
  Loader2, ChevronUp, ChevronDown, Target,
  Code2, Timer, Trophy, AlertTriangle, Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChallengeDetail } from "@/hooks/api";
import type { ChallengeDetailResponse } from "@/lib/api";

interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
  passed?: boolean;
}

/* ── Difficulty colors ──────────────────────────────────────────────── */
const DIFF = {
  easy:   { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", dot: "bg-emerald-500" },
  medium: { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30",   dot: "bg-amber-500" },
  hard:   { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30",     dot: "bg-red-500" },
};

type MobileTab = "problem" | "code" | "output";
type OutputTab = "output" | "tests";

/* ── Main page ──────────────────────────────────────────────────────── */
export default function ChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = use(params);
  const { data: challenge, isLoading } = useChallengeDetail(challengeId);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<TestCase[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("problem");
  const [outputTab, setOutputTab] = useState<OutputTab>("output");
  const [outputCollapsed, setOutputCollapsed] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [started, setStarted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize code and timer when challenge data loads
  useEffect(() => {
    if (challenge && !initialized) {
      setCode(challenge.starterCode);
      setTimeRemaining((challenge.timeLimit ?? 30) * 60);
      setInitialized(true);
    }
  }, [challenge, initialized]);

  const diff = challenge ? DIFF[challenge.difficulty as keyof typeof DIFF] ?? DIFF.easy : DIFF.easy;

  // Countdown timer
  useEffect(() => {
    if (!started || timeRemaining <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, timeRemaining]);

  // Auto-start timer on mount
  useEffect(() => { setStarted(true); }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleReset = useCallback(() => {
    if (challenge) setCode(challenge.starterCode);
    setOutput("");
    setTestResults(null);
  }, [challenge]);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setOutput("");
    setOutputTab("output");
    setOutputCollapsed(false);
    setTimeout(() => {
      setOutput(`>>> Running ${challenge?.language} code...\n\nOutput:\n[5, 4, 3, 2, 1]\n\nExecution completed in 0.04s`);
      setIsRunning(false);
    }, 1500);
  }, [challenge]);

  const handleSubmit = useCallback(() => {
    setIsRunning(true);
    setTestResults(null);
    setOutputTab("tests");
    setOutputCollapsed(false);
    setTimeout(() => {
      if (challenge) {
        // Simulate: first 2 pass, rest fail
        const results = challenge.testCases.map((tc, i) => ({ ...tc, passed: i < 2 }));
        setTestResults(results);
        const passed = results.filter((t) => t.passed).length;
        setOutput(`>>> Running tests...\n\n${passed}/${results.length} tests passed.`);
      }
      setIsRunning(false);
    }, 2000);
  }, [challenge]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newCode = code.substring(0, start) + "    " + code.substring(end);
        setCode(newCode);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4;
        });
      }
    },
    [code]
  );

  const handleScroll = () => {
    const ta = document.getElementById("challenge-textarea") as HTMLTextAreaElement | null;
    const gutter = document.getElementById("challenge-gutter");
    if (ta && gutter) gutter.scrollTop = ta.scrollTop;
  };

  /* ── Loading ─────────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  /* ── Not found ────────────────────────────────────────────────────── */
  if (!challenge) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <AlertTriangle size={40} className="mx-auto mb-3 text-amber-500 opacity-50" />
          <p className="text-lg font-semibold">Challenge not found</p>
          <p className="text-sm text-muted-foreground mt-1">This challenge doesn&apos;t exist yet.</p>
          <Link
            href="/dashboard/challenges"
            className="text-sm text-primary hover:underline mt-3 inline-block"
          >
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const lineCount = code.split("\n").length;
  const lines = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);
  const passedCount = testResults?.filter((t) => t.passed).length ?? 0;
  const totalCount = testResults?.length ?? 0;
  const isTimeLow = timeRemaining > 0 && timeRemaining <= 120;
  const isTimeUp = timeRemaining === 0;

  /* ── Problem Panel content ────────────────────────────────────────── */
  const ProblemPanel = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/30 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", diff.bg, diff.text)}>
            {challenge.difficulty}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
            {challenge.language}
          </span>
          {challenge.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-base font-bold">{challenge.title}</h2>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5 scrollbar-thin">
        {renderMarkdown(challenge.instructions)}

        {/* Constraints */}
        {challenge.constraints.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Constraints</h3>
            <ul className="space-y-1">
              {challenge.constraints.map((c, i) => (
                <li key={i} className="text-sm text-muted-foreground ml-4 list-disc">{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hints */}
      <div className="p-4 border-t border-border/30 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={14} className="text-amber-500" />
          <span className="text-xs font-semibold">Hints ({revealedHints}/{challenge.hints.length})</span>
        </div>
        <AnimatePresence>
          {challenge.hints.slice(0, revealedHints).map((hint, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-xs text-muted-foreground bg-amber-500/5 border border-amber-500/10 rounded-lg p-2.5 mb-1.5"
            >
              {hint}
            </motion.p>
          ))}
        </AnimatePresence>
        {revealedHints < challenge.hints.length && (
          <button
            onClick={() => setRevealedHints((h) => h + 1)}
            className="text-xs text-amber-500 hover:underline font-medium"
          >
            Show hint {revealedHints + 1}
          </button>
        )}
      </div>
    </div>
  );

  /* ── Code Editor ─────────────────────────────────────────────────── */
  const EditorPanel = () => (
    <div className="flex flex-col h-full">
      {/* Language bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {challenge.language}
        </span>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden bg-zinc-950">
        <div
          id="challenge-gutter"
          className="w-10 shrink-0 overflow-hidden select-none border-r border-zinc-800 bg-zinc-900/50 pt-3 pr-1"
        >
          {lines.map((n) => (
            <div key={n} className="text-right text-[11px] leading-[1.625rem] text-zinc-600 font-mono pr-1">{n}</div>
          ))}
        </div>
        <textarea
          id="challenge-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          className="flex-1 resize-none bg-transparent text-zinc-100 font-mono text-sm leading-[1.625rem] p-3 outline-none placeholder:text-zinc-600 caret-emerald-400"
          style={{ fontFamily: "var(--font-geist-mono), monospace", tabSize: 4 }}
          placeholder="// Write your solution here..."
        />
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border/30 bg-muted/10 shrink-0">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/30"
        >
          <RotateCcw size={13} /> Reset
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning || isTimeUp}
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors",
              "border-border text-foreground hover:bg-muted/40",
              (isRunning || isTimeUp) && "opacity-50 cursor-not-allowed"
            )}
          >
            <Play size={13} /> {isRunning ? "Running..." : "Run Code"}
          </button>
          <motion.button
            onClick={handleSubmit}
            disabled={isRunning || isTimeUp}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              (isRunning || isTimeUp) && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send size={13} /> Submit
          </motion.button>
        </div>
      </div>
    </div>
  );

  /* ── Output Panel ────────────────────────────────────────────────── */
  const OutputPanel = () => (
    <div className={cn("flex flex-col border-t border-border/30 transition-all", outputCollapsed ? "h-10" : "h-full")}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted/10 border-b border-border/20 shrink-0">
        <div className="flex gap-1">
          {(["output", "tests"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setOutputTab(t); setOutputCollapsed(false); }}
              className={cn(
                "px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors",
                outputTab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "output" ? "Output" : `Tests${testResults ? ` (${passedCount}/${totalCount})` : ""}`}
            </button>
          ))}
        </div>
        <button onClick={() => setOutputCollapsed(!outputCollapsed)} className="text-muted-foreground hover:text-foreground p-0.5">
          {outputCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
      {!outputCollapsed && (
        <div className="flex-1 overflow-y-auto">
          {isRunning ? (
            <div className="flex items-center justify-center h-full gap-2 text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-medium">Running...</span>
            </div>
          ) : outputTab === "output" ? (
            <div className="p-3 font-mono text-xs bg-zinc-950 h-full">
              {output ? (
                <pre className="text-emerald-400 whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-zinc-600 italic">Run your code to see output here.</span>
              )}
            </div>
          ) : (
            <div className="p-3 space-y-1.5">
              {testResults ? (
                <AnimatePresence>
                  {testResults.map((tc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        "flex items-start gap-2 p-2 rounded-lg border text-xs",
                        tc.passed
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-red-500/20 bg-red-500/5"
                      )}
                    >
                      {tc.passed
                        ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        : <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                      }
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{tc.description}</p>
                        <p className="text-muted-foreground mt-0.5">
                          Input: <code className="text-[10px] bg-muted/40 px-1 rounded">{tc.input}</code>
                        </p>
                        <p className="text-muted-foreground">
                          Expected: <code className="text-[10px] bg-muted/40 px-1 rounded">{tc.expectedOutput}</code>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <p className="text-xs text-muted-foreground italic text-center py-4">
                  Submit your code to see test results.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  /* ── Layout ──────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Top HUD bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-background shrink-0">
        <Link
          href="/dashboard/challenges"
          className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Challenges</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", diff.bg, diff.text)}>
            {challenge.difficulty}
          </span>
          <h1 className="text-sm font-bold truncate max-w-[200px] sm:max-w-none">{challenge.title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className={cn(
            "flex items-center gap-1.5 text-xs font-mono font-bold tabular-nums px-2.5 py-1 rounded-lg border transition-colors",
            isTimeUp
              ? "border-red-500/40 bg-red-500/10 text-red-400"
              : isTimeLow
                ? "border-amber-500/40 bg-amber-500/10 text-amber-400 animate-pulse"
                : "border-border/30 text-muted-foreground"
          )}>
            <Timer size={12} className={isTimeUp ? "text-red-400" : isTimeLow ? "text-amber-400" : ""} />
            {formatTime(timeRemaining)}
          </div>

          {/* XP */}
          <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary shrink-0">
            <Zap size={12} />
            +{challenge.xpReward} XP
          </div>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="flex lg:hidden border-b border-border/30 shrink-0">
        {(["problem", "code", "output"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setMobileTab(t)}
            className={cn(
              "flex-1 py-2 text-xs font-semibold text-center transition-colors capitalize",
              mobileTab === t ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Desktop: split layout */}
      <div className="flex-1 overflow-hidden hidden lg:flex">
        {/* Left: problem */}
        <div className="w-[40%] border-r border-border/30 overflow-hidden flex flex-col">
          <ProblemPanel />
        </div>

        {/* Right: editor + output */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0">
            <EditorPanel />
          </div>
          <div className="h-[35%] min-h-[120px]">
            <OutputPanel />
          </div>
        </div>
      </div>

      {/* Mobile: tabbed layout */}
      <div className="flex-1 overflow-hidden lg:hidden">
        {mobileTab === "problem" && (
          <div className="h-full overflow-y-auto"><ProblemPanel /></div>
        )}
        {mobileTab === "code" && (
          <div className="h-full"><EditorPanel /></div>
        )}
        {mobileTab === "output" && (
          <div className="h-full"><OutputPanel /></div>
        )}
      </div>

      {/* Time's up overlay */}
      <AnimatePresence>
        {isTimeUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-background rounded-2xl border border-border/50 p-8 max-w-sm mx-4 text-center shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-red-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Time&apos;s Up!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                The challenge timer has expired. You can still review your code and the problem.
              </p>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/dashboard/challenges"
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Back to Challenges
                </Link>
                <button
                  onClick={() => {
                    setTimeRemaining((challenge.timeLimit ?? 30) * 60);
                    handleReset();
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Markdown renderer ─────────────────────────────────────────────── */
function renderMarkdown(text: string) {
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
          <pre key={`code-${codeKey++}`} className="bg-muted/30 border border-border/20 rounded-lg p-3 text-xs font-mono overflow-x-auto my-2">
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

    if (inCodeBlock) { codeLines.push(line); continue; }

    if (line.startsWith("# ")) {
      elements.push(<h2 key={i} className="text-base font-bold mt-4 mb-2">{line.slice(2)}</h2>);
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={i} className="text-sm font-semibold mt-3 mb-1.5">{line.slice(3)}</h3>);
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-sm text-muted-foreground ml-4 list-disc">
          {renderInline(line.slice(2))}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-sm text-muted-foreground leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  }
  return elements;
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="bg-muted/60 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
          {part.slice(1, -1)}
        </code>
      );
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
      }
      return bp;
    });
  });
}
