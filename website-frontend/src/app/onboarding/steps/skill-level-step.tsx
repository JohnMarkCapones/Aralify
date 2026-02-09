"use client";

import { motion } from "framer-motion";
import { Sprout, Zap, Rocket, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILL_LEVELS = [
  {
    id: "COMPLETE_BEGINNER",
    title: "TOTAL NEWBIE",
    description: "Never written a line of code",
    Icon: Leaf,
    color: "bg-emerald-500",
    selectedBg: "bg-emerald-500 text-white",
  },
  {
    id: "SOME_EXPERIENCE",
    title: "EXPLORED A BIT",
    description: "Done some tutorials or courses",
    Icon: Sprout,
    color: "bg-blue-500",
    selectedBg: "bg-blue-500 text-white",
  },
  {
    id: "INTERMEDIATE",
    title: "GETTING GOOD",
    description: "Can build small projects on my own",
    Icon: Zap,
    color: "bg-purple-500",
    selectedBg: "bg-purple-500 text-white",
  },
  {
    id: "ADVANCED",
    title: "SEND IT",
    description: "Ready for advanced challenges",
    Icon: Rocket,
    color: "bg-orange-500",
    selectedBg: "bg-orange-500 text-white",
  },
];

interface SkillLevelStepProps {
  skillLevel: string;
  setSkillLevel: (level: string) => void;
}

export function SkillLevelStep({
  skillLevel,
  setSkillLevel,
}: SkillLevelStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-bold uppercase text-center mb-8"
      >
        WHAT&apos;S YOUR LEVEL?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SKILL_LEVELS.map((level, i) => {
          const selected = skillLevel === level.id;
          return (
            <motion.button
              key={level.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.03, x: -2, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSkillLevel(level.id)}
              className={cn(
                "relative p-6 rounded-2xl neo-brutal-border text-left transition-all",
                selected
                  ? `${level.selectedBg} neo-brutal-shadow-lg scale-[1.02]`
                  : "bg-card text-card-foreground neo-brutal-shadow hover:neo-brutal-shadow-lg"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl neo-brutal-border flex items-center justify-center flex-shrink-0",
                    selected ? "bg-white/20" : level.color
                  )}
                >
                  <level.Icon
                    className={cn(
                      "w-6 h-6",
                      selected ? "text-white" : "text-white"
                    )}
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg uppercase">
                    {level.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm mt-1",
                      selected ? "text-white/80" : "text-muted-foreground"
                    )}
                  >
                    {level.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
