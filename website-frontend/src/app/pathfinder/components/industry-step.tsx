"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  BarChart3,
  Brain,
  Gamepad2,
  Cloud,
  Shield,
  Cpu,
} from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "web", name: "Websites & Online Stores", desc: "Build what people see in their browsers", Icon: Globe },
  { id: "mobile", name: "Phone & Tablet Apps", desc: "Create apps people download on their phones", Icon: Smartphone },
  { id: "data_science", name: "Data & Insights", desc: "Turn numbers into charts and business decisions", Icon: BarChart3 },
  { id: "ai_ml", name: "Artificial Intelligence", desc: "Build smart systems like ChatGPT", Icon: Brain },
  { id: "games", name: "Games & Interactive Media", desc: "Design and build video games", Icon: Gamepad2 },
  { id: "devops", name: "Servers & Cloud Systems", desc: "Keep websites running 24/7", Icon: Cloud },
  { id: "cybersecurity", name: "Digital Security", desc: "Protect people from hackers", Icon: Shield },
  { id: "embedded", name: "Robots & Smart Devices", desc: "Program physical things", Icon: Cpu },
];

interface Props {
  selected: string[];
  setSelected: (v: string[]) => void;
}

export function IndustryStep({ selected, setSelected }: Props) {
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
        WHAT EXCITES YOU?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        Pick the areas that spark your interest
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
