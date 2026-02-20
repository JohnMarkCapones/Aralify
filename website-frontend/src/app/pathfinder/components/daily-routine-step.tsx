"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Clock,
  Home,
  Baby,
} from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "student_full", name: "Full-Time Student", desc: "School is my main focus right now", Icon: GraduationCap },
  { id: "working_full", name: "Full-Time Worker", desc: "I work a regular 9-5 job", Icon: Briefcase },
  { id: "working_part", name: "Part-Time / Freelance", desc: "I have a flexible schedule", Icon: Clock },
  { id: "stay_home", name: "At Home / Between Jobs", desc: "I have plenty of free time", Icon: Home },
  { id: "busy_parent", name: "Busy Parent / Caregiver", desc: "My time is very limited", Icon: Baby },
];

interface Props {
  selected: string;
  setSelected: (v: string) => void;
}

export function DailyRoutineStep({ selected, setSelected }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-2 tracking-tighter"
      >
        WHAT DOES YOUR TYPICAL DAY LOOK LIKE?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        This helps us plan a realistic study schedule for you
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        {OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className={i === OPTIONS.length - 1 ? "sm:col-span-2 sm:max-w-[calc(50%-0.5rem)] sm:mx-auto" : ""}
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
