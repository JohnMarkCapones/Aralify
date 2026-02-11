"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Play, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export function CodeEditor({
  code,
  onChange,
  language,
  onRun,
  onSubmit,
  onReset,
  isRunning,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lineCount = code.split("\n").length;
  const lines = Array.from({ length: Math.max(lineCount, 10) }, (_, i) => i + 1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + "    " + code.substring(end);
        onChange(newCode);
        // Restore cursor position after state update
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        });
      }
    },
    [code, onChange]
  );

  const handleScroll = () => {
    const textarea = textareaRef.current;
    const gutter = document.getElementById("line-gutter");
    if (textarea && gutter) {
      gutter.scrollTop = textarea.scrollTop;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Language badge + toolbar top */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 bg-muted/10">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {language}
        </span>
      </div>

      {/* Editor area */}
      <div className="flex-1 flex overflow-hidden bg-zinc-950 dark:bg-zinc-950">
        {/* Line numbers gutter */}
        <div
          id="line-gutter"
          className="w-10 shrink-0 overflow-hidden select-none border-r border-zinc-800 bg-zinc-900/50 pt-3 pr-1"
        >
          {lines.map((n) => (
            <div
              key={n}
              className="text-right text-[11px] leading-[1.625rem] text-zinc-600 font-mono pr-1"
            >
              {n}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          className={cn(
            "flex-1 resize-none bg-transparent text-zinc-100 font-mono text-sm",
            "leading-[1.625rem] p-3 outline-none",
            "placeholder:text-zinc-600",
            "caret-emerald-400"
          )}
          style={{ fontFamily: "var(--font-geist-mono), monospace", tabSize: 4 }}
          placeholder="// Write your code here..."
        />
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border/30 bg-muted/10">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/30"
        >
          <RotateCcw size={13} />
          Reset
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors",
              "border-border text-foreground hover:bg-muted/40",
              isRunning && "opacity-50 cursor-not-allowed"
            )}
          >
            <Play size={13} />
            {isRunning ? "Running..." : "Run Code"}
          </button>

          <motion.button
            onClick={onSubmit}
            disabled={isRunning}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              isRunning && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send size={13} />
            Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
}
