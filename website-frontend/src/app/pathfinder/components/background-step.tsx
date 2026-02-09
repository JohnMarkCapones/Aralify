"use client";

import { motion } from "framer-motion";
import { HelpCircle, Lightbulb, BookOpen, School, Briefcase } from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "never", name: "Never Coded", desc: "Complete beginner", Icon: HelpCircle },
  { id: "tried_once", name: "Tried Once", desc: "Dabbled briefly", Icon: Lightbulb },
  { id: "some_tutorials", name: "Some Tutorials", desc: "Self-taught basics", Icon: BookOpen },
  { id: "school_course", name: "School Course", desc: "Formal education", Icon: School },
  { id: "professional", name: "Professional", desc: "Work experience", Icon: Briefcase },
];

interface Props {
  selected: string;
  setSelected: (v: string) => void;
}

export function BackgroundStep({ selected, setSelected }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-2 tracking-tighter"
      >
        CODING EXPERIENCE?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        Be honest — there&apos;s no wrong answer!
      </motion.p>
      <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
        {OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
          >
            <SelectionCard
              selected={selected === opt.id}
              onClick={() => setSelected(opt.id)}
            >
              <div className="flex items-center gap-4 py-1">
                <opt.Icon className="w-8 h-8 shrink-0" />
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
