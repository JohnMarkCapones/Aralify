"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  Code,
  FileText,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Terminal,
  Zap,
  Star,
  Trophy,
  Eye,
  EyeOff,
  Copy,
  Download,
} from "lucide-react";
import Link from "next/link";

const difficultyTiers = [
  { label: "EASY", xp: "1x", multiplier: 1, xpAmount: 100, color: "bg-green-500 text-white", borderColor: "border-green-500", ringColor: "ring-green-500/30" },
  { label: "MEDIUM", xp: "2x", multiplier: 2, xpAmount: 200, color: "bg-yellow-500 text-white", borderColor: "border-yellow-500", ringColor: "ring-yellow-500/30" },
  { label: "HARD", xp: "3x", multiplier: 3, xpAmount: 300, color: "bg-red-500 text-white", borderColor: "border-red-500", ringColor: "ring-red-500/30" },
];

const instructions = [
  "Create a function called `fibonacci` that takes a number `n` as input.",
  "The function should return the nth number in the Fibonacci sequence.",
  "Use recursion or iteration — your choice.",
  "Handle edge cases: `fibonacci(0)` should return `0`, `fibonacci(1)` should return `1`.",
];

const hints = [
  "The Fibonacci sequence starts: 0, 1, 1, 2, 3, 5, 8, 13...",
  "Each number is the sum of the two preceding ones.",
  "For a recursive approach, think about the base cases first.",
];

const mockCode = `def fibonacci(n):
    """Return the nth Fibonacci number."""
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

# Test your function
for i in range(10):
    print(fibonacci(i), end=" ")`;

const testCases = [
  { input: "fibonacci(0)", expected: "0", passed: true },
  { input: "fibonacci(1)", expected: "1", passed: true },
  { input: "fibonacci(5)", expected: "5", passed: true },
  { input: "fibonacci(10)", expected: "55", passed: true },
  { input: "fibonacci(20)", expected: "6765", passed: true },
];

export default function LessonPage() {
  const [selectedTier, setSelectedTier] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [completed, setCompleted] = useState(false);

  const tier = difficultyTiers[selectedTier];

  return (
    <PageShell>
      {/* Lesson Header */}
      <section className="py-6 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link
                href="/courses/python-fundamentals"
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-2 group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Python Fundamentals — Module 3
              </Link>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                LESSON 8: RECURSION & FIBONACCI
              </h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
                <Clock size={14} /> ~15 min
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
                <BookOpen size={14} /> Exercise
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty Selector */}
      <section className="py-4 bg-muted/30 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Difficulty:</span>
            <div className="flex gap-2">
              {difficultyTiers.map((t, i) => (
                <motion.button
                  key={t.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTier(i)}
                  className={`px-4 py-2 neo-brutal-border rounded-xl font-black text-xs uppercase transition-all ${
                    selectedTier === i
                      ? `${t.color} neo-brutal-shadow-sm ring-4 ${t.ringColor}`
                      : "bg-card opacity-60 hover:opacity-100"
                  }`}
                >
                  {t.label} · {t.xp} XP
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Editor Layout */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Left: Instructions */}
            <div className="space-y-6">
              {/* Instructions Card */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b-2 border-border flex items-center gap-2">
                  <FileText size={16} className="text-primary" />
                  <span className="font-black text-sm uppercase tracking-wider">Instructions</span>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    Write a function that calculates numbers in the Fibonacci sequence using recursion. The Fibonacci sequence is a series where each number is the sum of the two preceding ones.
                  </p>
                  <div className="space-y-2">
                    {instructions.map((inst, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-2"
                      >
                        <span className="w-6 h-6 bg-primary/10 text-primary font-black text-xs flex items-center justify-center rounded-md shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium">{inst}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hints */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow-sm rounded-2xl overflow-hidden">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-accent" />
                    <span className="font-black text-sm uppercase tracking-wider">Hints</span>
                    <span className="text-xs font-bold text-muted-foreground">({hints.length} available)</span>
                  </div>
                  <motion.div animate={{ rotate: showHints ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {showHints && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 space-y-2">
                        {hints.map((hint, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-accent/10 rounded-lg">
                            <Lightbulb size={12} className="text-accent mt-0.5 shrink-0" />
                            <span className="text-sm font-medium">{hint}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Test Cases */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow-sm rounded-2xl overflow-hidden">
                <button
                  onClick={() => setShowTests(!showTests)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-secondary" />
                    <span className="font-black text-sm uppercase tracking-wider">Test Cases</span>
                  </div>
                  <motion.div animate={{ rotate: showTests ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {showTests && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 space-y-2">
                        {testCases.map((tc, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg font-mono text-sm">
                            <span>{tc.input}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">→ {tc.expected}</span>
                              {showOutput && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                  <CheckCircle size={14} className="text-green-500" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Code Editor */}
            <div className="space-y-4">
              <div className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl overflow-hidden">
                {/* Editor header */}
                <div className="bg-[hsl(222,47%,11%)] dark:bg-[hsl(222,47%,6%)] px-6 py-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-auto text-white/60 font-mono text-xs flex items-center gap-2">
                    <Code size={12} /> solution.py
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="text-white/40 hover:text-white/80 transition-colors"><Copy size={12} /></button>
                    <button className="text-white/40 hover:text-white/80 transition-colors"><RotateCcw size={12} /></button>
                  </div>
                </div>

                {/* Code area */}
                <div className="bg-[#0d1117] p-6 min-h-[350px] font-mono text-sm">
                  {mockCode.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-right mr-4 text-white/20 select-none text-xs">{i + 1}</span>
                      <span className="text-green-300 whitespace-pre">{line}</span>
                    </div>
                  ))}
                </div>

                {/* Action bar */}
                <div className="p-4 border-t border-border bg-card flex items-center gap-3">
                  <NeoButton
                    variant="primary"
                    size="sm"
                    className="gap-2"
                    onClick={() => { setShowOutput(true); setShowTests(true); }}
                  >
                    <Play size={14} className="fill-white" /> RUN CODE
                  </NeoButton>
                  <NeoButton
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      setShowOutput(true);
                      setShowTests(true);
                      setCompleted(true);
                    }}
                  >
                    <CheckCircle size={14} /> SUBMIT
                  </NeoButton>
                  <div className="ml-auto flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Terminal size={12} /> Python 3.11
                  </div>
                </div>
              </div>

              {/* Output panel */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden">
                <div className="px-6 py-3 border-b border-border flex items-center gap-2">
                  <Terminal size={14} className="text-muted-foreground" />
                  <span className="font-black text-xs uppercase tracking-wider">Output</span>
                </div>
                <div className="bg-[#0d1117] p-6 min-h-[120px] font-mono text-sm">
                  {showOutput ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="text-green-400 mb-2">$ python solution.py</div>
                      <div className="text-white/80">0 1 1 2 3 5 8 13 21 34</div>
                      <div className="mt-3 pt-3 border-t border-white/10 text-green-400 flex items-center gap-2">
                        <CheckCircle size={14} /> All 5 test cases passed!
                      </div>
                      <div className="text-white/30 text-xs mt-2">
                        Execution time: 23ms · Memory: 2.1 MB
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-white/20 text-xs">Run your code to see output...</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Completion Reward Modal */}
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setCompleted(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 40 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 40 }}
                  transition={{ type: "spring", bounce: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-3xl p-8 max-w-md w-full text-center space-y-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">LESSON COMPLETE!</h2>
                  <div className="bg-primary/10 neo-brutal-border rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-2xl font-black text-primary">
                      <Zap size={24} /> +{tier.xpAmount} XP
                    </div>
                    <div className="text-sm font-bold text-muted-foreground">
                      {tier.label} Tier · {tier.xp} Multiplier
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <NeoButton variant="outline" className="flex-1" onClick={() => setCompleted(false)}>
                      Review
                    </NeoButton>
                    <NeoButton variant="primary" className="flex-1 gap-2">
                      Next Lesson <ArrowRight size={14} />
                    </NeoButton>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-6 bg-card border-t-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Link href="#" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Previous: Functions
            </Link>
            <Link href="#" className="flex items-center gap-2 text-sm font-bold text-primary group">
              Next: Memoization
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
