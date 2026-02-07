"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Briefcase,
  Brain,
  Gamepad2,
  Smile,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { SelectionCard } from "../components/selection-card";

const GOALS = [
  { id: "web-dev", name: "Build Websites", Icon: Globe },
  { id: "mobile-dev", name: "Build Apps", Icon: Smartphone },
  { id: "get-job", name: "Get a Dev Job", Icon: Briefcase },
  { id: "data-ai", name: "Data & AI", Icon: Brain },
  { id: "game-dev", name: "Game Dev", Icon: Gamepad2 },
  { id: "fun", name: "Just for Fun", Icon: Smile },
  { id: "freelance", name: "Freelance", Icon: DollarSign },
  { id: "level-up", name: "Level Up Skills", Icon: TrendingUp },
];

interface GoalsStepProps {
  selectedGoals: string[];
  setSelectedGoals: (goals: string[]) => void;
}

export function GoalsStep({
  selectedGoals,
  setSelectedGoals,
}: GoalsStepProps) {
  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-bold uppercase text-center mb-2"
      >
        WHAT&apos;S YOUR GOAL?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8"
      >
        Select at least one
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {GOALS.map((goal, i) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
          >
            <SelectionCard
              selected={selectedGoals.includes(goal.id)}
              onClick={() => toggleGoal(goal.id)}
              className="h-full"
            >
              <div className="flex flex-col items-center gap-2 py-3">
                <goal.Icon className="w-8 h-8" />
                <span className="font-display font-bold text-xs sm:text-sm uppercase text-center">
                  {goal.name}
                </span>
              </div>
            </SelectionCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
