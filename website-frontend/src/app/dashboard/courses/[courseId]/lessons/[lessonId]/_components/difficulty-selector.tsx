"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DifficultySelectorProps {
  selected: "easy" | "medium" | "hard";
  onSelect: (difficulty: "easy" | "medium" | "hard") => void;
}

const tiers = [
  { key: "easy" as const, label: "Easy", multiplier: "1x", color: "emerald" },
  { key: "medium" as const, label: "Medium", multiplier: "2x", color: "amber" },
  { key: "hard" as const, label: "Hard", multiplier: "3x", color: "red" },
] as const;

const selectedStyles = {
  easy: "bg-emerald-500 text-white border-emerald-500",
  medium: "bg-amber-500 text-white border-amber-500",
  hard: "bg-red-500 text-white border-red-500",
};

const unselectedStyles = {
  easy: "border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30",
  medium: "border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/30",
  hard: "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/30",
};

export function DifficultySelector({ selected, onSelect }: DifficultySelectorProps) {
  return (
    <div className="flex gap-2">
      {tiers.map((tier) => (
        <motion.button
          key={tier.key}
          onClick={() => onSelect(tier.key)}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors",
            selected === tier.key
              ? selectedStyles[tier.key]
              : unselectedStyles[tier.key]
          )}
        >
          {selected === tier.key && (
            <motion.div
              layoutId="difficulty-bg"
              className="absolute inset-0 rounded-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">
            {tier.label} ({tier.multiplier})
          </span>
        </motion.button>
      ))}
    </div>
  );
}
