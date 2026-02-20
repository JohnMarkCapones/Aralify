"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Brain,
  ClipboardList,
  MessageCircle,
  Hammer,
} from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "creative", name: "The Creative", desc: "You love making things look good and inventing new ideas", Icon: Palette },
  { id: "analytical", name: "The Problem-Solver", desc: "You enjoy figuring out puzzles and logical solutions", Icon: Brain },
  { id: "organizer", name: "The Organizer", desc: "You like planning, systems, and keeping things running", Icon: ClipboardList },
  { id: "communicator", name: "The People Person", desc: "You enjoy collaborating, teaching, and connecting", Icon: MessageCircle },
  { id: "builder", name: "The Builder", desc: "You want to create tangible things and see real results", Icon: Hammer },
];

interface Props {
  selected: string;
  setSelected: (v: string) => void;
}

export function PersonalityStep({ selected, setSelected }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-2 tracking-tighter"
      >
        HOW WOULD YOUR FRIENDS DESCRIBE YOU?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        Pick the one that fits you best
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
