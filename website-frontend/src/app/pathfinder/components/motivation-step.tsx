"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  DollarSign,
  Heart,
  GraduationCap,
  Rocket,
  Cog,
} from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "career_change", name: "Career Change", desc: "Switch to a tech career", Icon: Briefcase },
  { id: "freelance", name: "Freelance", desc: "Work independently", Icon: DollarSign },
  { id: "hobby", name: "Just for Fun", desc: "Learn as a hobby", Icon: Heart },
  { id: "school", name: "For School", desc: "Academic requirement", Icon: GraduationCap },
  { id: "startup", name: "Build a Startup", desc: "Create my own product", Icon: Rocket },
  { id: "automate_work", name: "Automate Work", desc: "Make my job easier", Icon: Cog },
];

interface Props {
  selected: string[];
  setSelected: (v: string[]) => void;
}

export function MotivationStep({ selected, setSelected }: Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-2 tracking-tighter"
      >
        WHY DO YOU WANT TO CODE?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        Select all that apply
      </motion.p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <SelectionCard
              selected={selected.includes(opt.id)}
              onClick={() => toggle(opt.id)}
              className="h-full"
            >
              <div className="flex flex-col items-center gap-2 py-3">
                <opt.Icon className="w-8 h-8" />
                <span className="font-display font-bold text-xs sm:text-sm uppercase text-center">
                  {opt.name}
                </span>
                <span className="text-[10px] text-center opacity-70">{opt.desc}</span>
              </div>
            </SelectionCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
