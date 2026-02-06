"use client";

import { motion } from "framer-motion";
import { BookOpen, SlidersHorizontal, Trophy, ArrowRight } from "lucide-react";
import { FloatingShapes, GridPattern } from "@/components/effects";

const steps = [
  {
    number: "01",
    icon: <BookOpen size={32} />,
    title: "Pick a Course",
    description: "Browse 50+ courses across Python, JavaScript, TypeScript, and more. Each course is structured into bite-sized lessons.",
    color: "bg-primary text-white",
  },
  {
    number: "02",
    icon: <SlidersHorizontal size={32} />,
    title: "Choose Your Difficulty",
    description: "Every lesson has Easy, Medium, and Hard tiers. Start where you're comfortable and level up when you're ready.",
    color: "bg-secondary text-white",
  },
  {
    number: "03",
    icon: <Trophy size={32} />,
    title: "Earn XP & Level Up",
    description: "Complete challenges to earn XP (1x, 2x, or 3x multipliers), maintain streaks, unlock badges, and climb the leaderboard.",
    color: "bg-accent text-accent-foreground",
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-background relative">
      <GridPattern />
      <FloatingShapes shapes={[
        { type: "circle", size: 25, x: "8%", y: "20%", color: "bg-primary", delay: 0, duration: 9 },
        { type: "diamond", size: 20, x: "92%", y: "30%", color: "bg-secondary", delay: 1, duration: 11 },
        { type: "cross", size: 18, x: "5%", y: "70%", color: "bg-accent", delay: 2, duration: 8 },
        { type: "square", size: 22, x: "88%", y: "80%", color: "bg-primary", delay: 1.5, duration: 10, rotate: 45 },
      ]} />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">HOW IT WORKS</h2>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
            Get started in under 2 minutes. No setup, no credit card, no friction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-1 bg-border z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 text-center"
            >
              {/* Step number */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-12 h-12 neo-brutal-border neo-brutal-shadow-sm bg-card font-display font-black text-lg mb-6 rounded-full"
              >
                {step.number}
              </motion.div>

              {/* Icon card */}
              <div className={`${step.color} neo-brutal-border neo-brutal-shadow-lg p-8 rounded-2xl mb-6 mx-auto max-w-xs`}>
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-2xl font-black uppercase mb-3">{step.title}</h3>
                <p className="font-medium opacity-90 leading-relaxed text-sm">{step.description}</p>
              </div>

              {/* Arrow between steps (mobile) */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight size={24} className="text-muted-foreground rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
