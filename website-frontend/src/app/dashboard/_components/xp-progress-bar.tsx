"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface XpProgressBarProps {
  current: number;
  max: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  shimmer?: boolean;
  className?: string;
}

export function XpProgressBar({
  current,
  max,
  size = "md",
  showLabel = true,
  shimmer = false,
  className,
}: XpProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  const sizeStyles = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            XP
          </span>
          <span className="text-xs font-bold">
            {current.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      )}
      <div
        className={cn(
          "relative w-full rounded-full border border-border/20 overflow-hidden bg-muted/50",
          sizeStyles[size]
        )}
      >
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary",
            shimmer && "animate-xp-shimmer",
            "shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
        {/* Counter overlay for lg size */}
        {size === "lg" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white drop-shadow-sm">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
