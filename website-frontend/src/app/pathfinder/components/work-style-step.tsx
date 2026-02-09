"use client";

import { motion } from "framer-motion";
import { Map, Compass, Hammer, Swords } from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  {
    id: "structured_path",
    name: "Structured Path",
    desc: "Follow a clear roadmap step by step",
    Icon: Map,
  },
  {
    id: "explore_freely",
    name: "Explore Freely",
    desc: "Browse and pick what interests me",
    Icon: Compass,
  },
  {
    id: "project_based",
    name: "Project-Based",
    desc: "Learn by building real projects",
    Icon: Hammer,
  },
  {
    id: "challenge_driven",
    name: "Challenge-Driven",
    desc: "Solve puzzles and coding challenges",
    Icon: Swords,
  },
];

interface Props {
  selected: string;
  setSelected: (v: string) => void;
}

export function WorkStyleStep({ selected, setSelected }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-2 tracking-tighter"
      >
        HOW DO YOU LEARN BEST?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        Pick your preferred learning style
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <SelectionCard
              selected={selected === opt.id}
              onClick={() => setSelected(opt.id)}
              className="h-full"
            >
              <div className="flex items-center gap-4 py-2">
                <opt.Icon className="w-10 h-10 shrink-0" />
                <div>
                  <span className="font-display font-bold text-sm uppercase block">
                    {opt.name}
                  </span>
                  <span className="text-xs opacity-70">{opt.desc}</span>
                </div>
              </div>
            </SelectionCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
