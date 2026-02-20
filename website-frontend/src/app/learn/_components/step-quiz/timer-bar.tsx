"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimerBarProps {
  duration: number; // seconds
  isPaused: boolean;
  onTimeUp: () => void;
  isActive: boolean; // timer should be running
}

export function TimerBar({ duration, isPaused, onTimeUp, isActive }: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCalledTimeUp = useRef(false);

  // Reset when duration changes (new question)
  useEffect(() => {
    setTimeLeft(duration);
    hasCalledTimeUp.current = false;
  }, [duration]);

  useEffect(() => {
    if (!isActive || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (!hasCalledTimeUp.current) {
            hasCalledTimeUp.current = true;
            // Use setTimeout to avoid state update during render
            setTimeout(onTimeUp, 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isPaused, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isLow = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  return (
    <div className="w-full space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isPaused && (
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider animate-pulse">
              Frozen
            </span>
          )}
        </div>
        <span
          className={cn(
            "text-xs font-bold tabular-nums transition-colors",
            isCritical
              ? "text-red-500 animate-pulse"
              : isLow
              ? "text-amber-500"
              : "text-muted-foreground"
          )}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full transition-colors duration-500",
            isCritical
              ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
              : isLow
              ? "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.4)]"
              : "bg-primary"
          )}
          initial={{ width: "100%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "linear" }}
        />
      </div>
    </div>
  );
}
