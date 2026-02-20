"use client";

import { motion } from "framer-motion";
import { Coffee, Clock, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const COMMITMENTS = [
  {
    id: 10,
    title: "CHILL",
    description: "A few minutes of learning",
    Icon: Coffee,
    weeklyXp: 350,
    color: "bg-emerald-500",
    selectedBg: "bg-emerald-500 text-white",
  },
  {
    id: 20,
    title: "STEADY",
    description: "Building a habit",
    Icon: Clock,
    weeklyXp: 700,
    color: "bg-blue-500",
    selectedBg: "bg-blue-500 text-white",
  },
  {
    id: 30,
    title: "FOCUSED",
    description: "Serious about progress",
    Icon: Target,
    weeklyXp: 1050,
    recommended: true,
    color: "bg-purple-500",
    selectedBg: "bg-purple-500 text-white",
  },
  {
    id: 60,
    title: "BEAST MODE",
    description: "Maximum growth speed",
    Icon: Flame,
    weeklyXp: 2100,
    color: "bg-orange-500",
    selectedBg: "bg-orange-500 text-white",
  },
];

interface CommitmentStepProps {
  dailyMins: number;
  setDailyMins: (mins: number) => void;
}

export function CommitmentStep({
  dailyMins,
  setDailyMins,
}: CommitmentStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-bold uppercase text-center mb-8"
      >
        DAILY GOAL
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMMITMENTS.map((c, i) => {
          const selected = dailyMins === c.id;
          return (
            <motion.button
              key={c.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.03, x: -2, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setDailyMins(c.id)}
              className={cn(
                "relative p-5 rounded-2xl neo-brutal-border text-left transition-all",
                selected
                  ? `${c.selectedBg} neo-brutal-shadow-lg`
                  : "bg-card text-card-foreground neo-brutal-shadow hover:neo-brutal-shadow-lg"
              )}
            >
              {c.recommended && (
                <span
                  className={cn(
                    "absolute -top-2 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full neo-brutal-border",
                    selected
                      ? "bg-white text-purple-600"
                      : "bg-accent text-accent-foreground"
                  )}
                >
                  Recommended
                </span>
              )}
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl neo-brutal-border flex items-center justify-center flex-shrink-0",
                    selected ? "bg-white/20" : c.color
                  )}
                >
                  <c.Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold uppercase">
                    {c.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs",
                      selected ? "text-white/80" : "text-muted-foreground"
                    )}
                  >
                    {c.id} min/day &middot; {c.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <span
                      className={cn(
                        "text-xs font-bold",
                        selected ? "text-white/90" : "text-primary"
                      )}
                    >
                      ~
                    </span>
                    <AnimatedCounter
                      target={selected ? c.weeklyXp : c.weeklyXp}
                      suffix=" XP/week"
                      className={cn(
                        "text-xs font-bold",
                        selected ? "text-white/90" : "text-primary"
                      )}
                    />
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-muted-foreground text-center mt-6"
      >
        You can change this anytime in settings
      </motion.p>
    </div>
  );
}
