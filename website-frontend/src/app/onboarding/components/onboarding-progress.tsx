"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 7;

export function OnboardingProgress({ currentStep }: { currentStep: number }) {
  const progress = (currentStep / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              initial={false}
              animate={{
                scale: i === currentStep ? 1.3 : 1,
                backgroundColor:
                  i <= currentStep
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
              }}
              className={cn(
                "w-3 h-3 rounded-full neo-brutal-border transition-colors",
                i <= currentStep ? "neo-brutal-shadow-sm" : ""
              )}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-muted rounded-full neo-brutal-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center mt-1 font-mono">
        {currentStep + 1} / {TOTAL_STEPS}
      </p>
    </div>
  );
}
