"use client";

import { motion } from "framer-motion";
import { Zap, Timer, CalendarDays, Calendar, Infinity } from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "1_month", name: "1 Month", desc: "Sprint learner", Icon: Zap },
  { id: "3_months", name: "3 Months", desc: "Focused commitment", Icon: Timer },
  { id: "6_months", name: "6 Months", desc: "Steady pace", Icon: CalendarDays },
  { id: "1_year", name: "1 Year", desc: "Deep mastery", Icon: Calendar },
  { id: "no_rush", name: "No Rush", desc: "Learning is lifelong", Icon: Infinity },
];

interface Props {
  selected: string;
  setSelected: (v: string) => void;
}

export function TimeHorizonStep({ selected, setSelected }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-2 tracking-tighter"
      >
        WHAT&apos;S YOUR TIMELINE?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        How soon do you want to reach your goal?
      </motion.p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
        {OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className={i === OPTIONS.length - 1 ? "col-span-2 sm:col-span-1" : ""}
          >
            <SelectionCard
              selected={selected === opt.id}
              onClick={() => setSelected(opt.id)}
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
