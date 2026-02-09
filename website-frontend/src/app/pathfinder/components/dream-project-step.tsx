"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Gamepad2,
  Bot,
  BarChart3,
  Cog,
  Users,
  Cpu,
} from "lucide-react";
import { SelectionCard } from "@/app/onboarding/components/selection-card";

const OPTIONS = [
  { id: "personal_website", name: "My Own Website", desc: "A portfolio, blog, or online store", Icon: Globe },
  { id: "mobile_app", name: "A Mobile App", desc: "An app people use on their phones", Icon: Smartphone },
  { id: "game", name: "A Video Game", desc: "An interactive game people can play", Icon: Gamepad2 },
  { id: "chatbot", name: "A Smart Assistant", desc: "A chatbot or AI that helps people", Icon: Bot },
  { id: "data_dashboard", name: "A Data Dashboard", desc: "Charts and insights from real data", Icon: BarChart3 },
  { id: "automation", name: "An Automation Tool", desc: "Something that does boring tasks for me", Icon: Cog },
  { id: "social_platform", name: "A Social Platform", desc: "A place where people connect and share", Icon: Users },
  { id: "hardware_project", name: "A Hardware Project", desc: "A robot, sensor, or smart device", Icon: Cpu },
];

interface Props {
  selected: string[];
  setSelected: (v: string[]) => void;
}

export function DreamProjectStep({ selected, setSelected }: Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 3) {
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
        WHAT DO YOU WANT TO BUILD?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 font-medium"
      >
        Pick up to 3 dream projects
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
              className={`h-full ${
                !selected.includes(opt.id) && selected.length >= 3
                  ? "opacity-40 pointer-events-none"
                  : ""
              }`}
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
