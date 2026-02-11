"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

interface XpBurstProps {
  xp: number;
  multiplier: number;
}

export function XpBurst({ xp, multiplier }: XpBurstProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
      className="relative flex flex-col items-center"
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 2, opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />

      {/* XP counter */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedCounter
            target={xp}
            prefix="+"
            suffix=" XP"
            duration={1.5}
            className="text-5xl sm:text-6xl font-display font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent"
          />
        </motion.div>

        {multiplier > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
            className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700"
          >
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {multiplier}x Multiplier!
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
