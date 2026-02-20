"use client";

import { motion } from "framer-motion";
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

interface PowerupBarProps {
  powerups: Powerup[];
  onUsePowerup: (type: PowerupType) => void;
  disabled: boolean;
  /** Which powerups can be used on the current question type */
  allowedTypes?: PowerupType[];
}

export function PowerupBar({
  powerups,
  onUsePowerup,
  disabled,
  allowedTypes,
}: PowerupBarProps) {
  return (
    <div className="flex items-center gap-2">
      {powerups.map((powerup) => {
        const Icon = iconMap[powerup.icon as keyof typeof iconMap];
        const isExhausted = powerup.uses <= 0;
        const isDisallowed = allowedTypes && !allowedTypes.includes(powerup.type);
        const isDisabled = disabled || isExhausted || isDisallowed;

        return (
          <motion.button
            key={powerup.type}
            onClick={() => !isDisabled && onUsePowerup(powerup.type)}
            whileHover={!isDisabled ? { scale: 1.1, y: -2 } : undefined}
            whileTap={!isDisabled ? { scale: 0.9 } : undefined}
            disabled={isDisabled}
            className={cn(
              "relative flex flex-col items-center gap-0.5 p-2 rounded-xl border-2 transition-all min-w-[56px]",
              isDisabled
                ? "border-border/20 opacity-30 cursor-not-allowed"
                : "border-primary/30 bg-primary/5 hover:border-primary hover:bg-primary/10 cursor-pointer"
            )}
            title={`${powerup.label}: ${powerup.description}`}
          >
            {Icon && <Icon size={18} className={isDisabled ? "text-muted-foreground" : "text-primary"} />}
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              {powerup.label}
            </span>

            {/* Uses badge */}
            <span
              className={cn(
                "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center",
                isExhausted
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {powerup.uses}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
