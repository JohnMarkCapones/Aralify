"use client";

import { motion } from "framer-motion";
import {
  Play,
  BookOpen,
  Wrench,
  Layers,
} from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "video_first", name: "Watch Videos", desc: "I learn best by watching tutorials and demos", Icon: Play },
  { id: "read_first", name: "Read & Study", desc: "I prefer reading articles and documentation", Icon: BookOpen },
  { id: "hands_on", name: "Hands-On Practice", desc: "Just let me code and figure things out", Icon: Wrench },
  { id: "mixed", name: "A Mix of Everything", desc: "I like variety in my learning materials", Icon: Layers },
];

interface Props {
  selected: string;
  setSelected: (v: string) => void;
}

export function ContentPreferenceStep({ selected, setSelected }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-2 tracking-tighter"
      >
        HOW DO YOU PREFER TO LEARN?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        We&apos;ll tailor your learning experience
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
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
              <div className="flex flex-col items-center gap-2 py-3 text-center">
                <opt.Icon className="w-8 h-8" />
                <span className="font-display font-bold text-xs sm:text-sm uppercase">
                  {opt.name}
                </span>
                <span className="text-[10px] opacity-70">{opt.desc}</span>
              </div>
            </SelectionCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
