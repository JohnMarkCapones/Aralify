"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestCase } from "@/lib/data/dashboard";

interface OutputPanelProps {
  output: string;
  testResults: TestCase[] | null;
  isRunning: boolean;
}

type Tab = "output" | "tests";

export function OutputPanel({ output, testResults, isRunning }: OutputPanelProps) {
  const [tab, setTab] = useState<Tab>("output");
  const [collapsed, setCollapsed] = useState(false);

  const passedCount = testResults?.filter((t) => t.passed).length ?? 0;
  const totalCount = testResults?.length ?? 0;

  return (
    <div className={cn(
      "flex flex-col border-t border-border/30 transition-all",
      collapsed ? "h-10" : "h-full"
    )}>
      {/* Header with tabs + collapse toggle */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted/10 border-b border-border/20 shrink-0">
        <div className="flex gap-1">
          {(["output", "tests"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setCollapsed(false); }}
              className={cn(
                "px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors",
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "output" ? "Output" : `Test Results${testResults ? ` (${passedCount}/${totalCount})` : ""}`}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground p-0.5"
        >
          {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto">
          {isRunning ? (
            <div className="flex items-center justify-center h-full gap-2 text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-medium">Running...</span>
            </div>
          ) : tab === "output" ? (
            <div className="p-3 font-mono text-xs bg-zinc-950 dark:bg-zinc-950 h-full">
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
                          ? "border-emerald-200/30 bg-emerald-50/30 dark:border-emerald-900/30 dark:bg-emerald-950/20"
                          : "border-red-200/30 bg-red-50/30 dark:border-red-900/30 dark:bg-red-950/20"
                      )}
                    >
                      {tc.passed ? (
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                      )}
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
}
