"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Snowflake,
  ShieldCheck,
  Lightbulb,
  Zap,
  Clock,
  SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Powerup, PowerupType } from "@/lib/data/lesson-flow";

const iconMap = {
  Scissors,
  Snowflake,
  ShieldCheck,
  Lightbulb,
  Zap,
  Clock,
  SkipForward,
} as const;

const iconColors: Record<string, string> = {
  eliminate: "text-violet-500",
  freeze: "text-cyan-500",
  shield: "text-emerald-500",
  hint: "text-amber-500",
  double_xp: "text-primary",
  extra_time: "text-sky-500",
  skip: "text-rose-500",
};

const bgColors: Record<string, string> = {
  eliminate: "bg-violet-500/10",
  freeze: "bg-cyan-500/10",
  shield: "bg-emerald-500/10",
  hint: "bg-amber-500/10",
  double_xp: "bg-primary/10",
  extra_time: "bg-sky-500/10",
  skip: "bg-rose-500/10",
};

interface PowerupPanelProps {
  powerups: Powerup[];
  onUsePowerup: (type: PowerupType) => void;
  disabled: boolean;
}

export function PowerupPanel({
  powerups,
  onUsePowerup,
  disabled,
}: PowerupPanelProps) {
  const [hoveredType, setHoveredType] = useState<PowerupType | null>(null);

  return (
    <div className="space-y-1.5">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-1">
        Power-ups
      </p>
      <div className="space-y-1.5">
        {powerups.map((powerup) => {
          const Icon = iconMap[powerup.icon as keyof typeof iconMap];
          const color = iconColors[powerup.type] || "text-primary";
          const bg = bgColors[powerup.type] || "bg-primary/10";
          const isExhausted = powerup.uses <= 0;
          const isDisabled = disabled || isExhausted;
          const isHovered = hoveredType === powerup.type;

          return (
            <div key={powerup.type} className="relative">
              <motion.button
                onClick={() => !isDisabled && onUsePowerup(powerup.type)}
                onMouseEnter={() => setHoveredType(powerup.type)}
                onMouseLeave={() => setHoveredType(null)}
                whileHover={!isDisabled ? { scale: 1.03 } : undefined}
                whileTap={!isDisabled ? { scale: 0.97 } : undefined}
                disabled={isDisabled}
                className={cn(
                  "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all text-left",
                  isDisabled
                    ? "border-border/10 opacity-35 cursor-not-allowed"
                    : "border-border/20 bg-card hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                )}
              >
                <div className="relative shrink-0">
                  {Icon && (
                    <Icon
                      size={16}
                      className={isDisabled ? "text-muted-foreground/40" : color}
                    />
                  )}
                </div>
                <span className={cn(
                  "text-[11px] font-semibold flex-1 truncate",
                  isDisabled && "text-muted-foreground/50"
                )}>
                  {powerup.label}
                </span>
                <span
                  className={cn(
                    "w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0",
                    isExhausted
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {powerup.uses}
                </span>
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && !isDisabled && (
                  <motion.div
                    initial={{ opacity: 0, x: -6, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 z-50 w-48 pointer-events-none"
                  >
                    <div className="bg-card border-2 border-border rounded-xl p-2.5 neo-brutal-shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={cn("p-1 rounded-md", bg)}>
                          {Icon && <Icon size={12} className={color} />}
                        </div>
                        <span className="text-[11px] font-display font-bold uppercase tracking-wider">
                          {powerup.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {powerup.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1 text-[9px] text-muted-foreground/60">
                        <span className="font-mono font-bold">{powerup.uses}/{powerup.maxUses}</span>
                        <span>uses left</span>
                      </div>
                    </div>
                    {/* Arrow pointing left */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-[6px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-border" />
                    <div className="absolute top-1/2 -translate-y-1/2 -left-[4px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-card" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
