"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Palette,
  FlaskConical,
  Pen,
  Music,
  Briefcase,
  Puzzle,
  Globe,
} from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "math", name: "Math", desc: "Numbers, algebra, logic", Icon: Calculator },
  { id: "art_design", name: "Art & Design", desc: "Drawing, colors, layouts", Icon: Palette },
  { id: "science", name: "Science", desc: "Experiments and discovery", Icon: FlaskConical },
  { id: "writing", name: "Writing", desc: "Stories, blogs, essays", Icon: Pen },
  { id: "music", name: "Music", desc: "Rhythm, sound, creativity", Icon: Music },
  { id: "business", name: "Business", desc: "Money, markets, strategy", Icon: Briefcase },
  { id: "puzzles", name: "Puzzles & Games", desc: "Brain teasers and challenges", Icon: Puzzle },
  { id: "social_studies", name: "Social Studies", desc: "People, culture, society", Icon: Globe },
];

interface Props {
  selected: string[];
  setSelected: (v: string[]) => void;
}

export function SubjectInterestsStep({ selected, setSelected }: Props) {
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
        WHAT SUBJECTS DO YOU ENJOY?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        Select all that apply
      </motion.p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
          >
            <SelectionCard
              selected={selected.includes(opt.id)}
              onClick={() => toggle(opt.id)}
              className="h-full"
            >
              <div className="flex flex-col items-center gap-2 py-3">
                <opt.Icon className="w-7 h-7" />
                <span className="font-display font-bold text-xs uppercase text-center">
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
