"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartDisplayProps {
  current: number;
  max: number;
}

export function HeartDisplay({ current, max }: HeartDisplayProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < current;
        return (
          <AnimatePresence key={i} mode="wait">
            {isFilled ? (
              <motion.div
                key="filled"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, rotate: -30 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Heart
                  size={20}
                  className="fill-red-500 text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]"
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Heart size={20} className="text-muted-foreground/30" />
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </div>
  );
}
