"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboCounterProps {
  combo: number;
}

export function ComboCounter({ combo }: ComboCounterProps) {
  if (combo < 2) return null;

  const tier = combo >= 5 ? "fire" : combo >= 3 ? "hot" : "warm";

  return (
    <AnimatePresence>
      <motion.div
        key={combo}
        initial={{ scale: 0.5, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-display font-bold text-sm",
          tier === "fire" &&
            "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
          tier === "hot" &&
            "border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
          tier === "warm" &&
            "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400"
        )}
      >
        {tier === "fire" ? (
          <motion.div
            animate={{ rotate: [-5, 5, -5], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Flame size={16} />
          </motion.div>
        ) : (
          <Zap size={14} />
        )}
        <span>{combo}x Combo!</span>
      </motion.div>
    </AnimatePresence>
  );
}
