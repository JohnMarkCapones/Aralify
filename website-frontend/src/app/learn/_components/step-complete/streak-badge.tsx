"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-950/20"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <Flame size={28} className="text-orange-500" />
      </motion.div>
      <div>
        <p className="text-2xl font-display font-bold text-orange-600 dark:text-orange-400">
          {streak} Day Streak!
        </p>
        <p className="text-xs text-muted-foreground">
          Keep it going! Practice tomorrow to continue.
        </p>
      </div>
    </motion.div>
  );
}
