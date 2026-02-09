"use client";

import { motion } from "framer-motion";
import { BookOpen, Code, Trophy, Rocket, Zap, CheckCircle, ArrowDown } from "lucide-react";
import { FloatingShapes } from "@/components/effects";

const steps = [
  {
    time: "Day 1",
    title: "Pick a Course",
    desc: "Browse 8+ structured courses. Choose your language, start with Easy mode, and jump into your first lesson.",
    icon: <BookOpen size={24} />,
    color: "bg-primary",
    detail: "No setup, no installs — just pick and start coding in your browser.",
  },
  {
    time: "Week 1",
    title: "Write Real Code",
    desc: "Every lesson has a built-in code editor. Write, run, and debug code in 50+ languages with instant feedback.",
    icon: <Code size={24} />,
    color: "bg-secondary",
    detail: "Judge0 sandbox executes your code safely in under 100ms.",
  },
  {
    time: "Week 2",
    title: "Level Up Difficulty",
    desc: "Feeling confident? Switch from Easy (1x XP) to Medium (2x) or Hard (3x). Harder tiers = bigger rewards.",
    icon: <Zap size={24} />,
    color: "bg-accent",
    detail: "The same lesson, three ways — so you're always challenged but never stuck.",
  },
  {
    time: "Month 1",
    title: "Earn & Compete",
    desc: "Collect badges, maintain your streak, and climb the weekly leaderboard. Your profile shows your progress.",
    icon: <Trophy size={24} />,
    color: "bg-green-500",
    detail: "Gamification keeps you motivated when willpower alone isn't enough.",
  },
  {
    time: "Month 3",
    title: "Build Real Projects",
    desc: "Course capstone projects test everything you've learned. Build portfolio-worthy apps from scratch.",
    icon: <Rocket size={24} />,
    color: "bg-primary",
    detail: "Complete the course, earn your certificate, and share it on LinkedIn.",
  },
];

export function StudentJourney() {
  return (
    <section className="py-32 overflow-hidden relative">
      <FloatingShapes shapes={[
        { type: "circle", size: 25, x: "5%", y: "15%", color: "bg-primary", delay: 0, duration: 10 },
        { type: "diamond", size: 20, x: "92%", y: "30%", color: "bg-accent", delay: 1, duration: 12 },
        { type: "cross", size: 18, x: "88%", y: "75%", color: "bg-secondary", delay: 2, duration: 9 },
      ]} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 neo-brutal-border neo-brutal-shadow-sm rotate-[-1deg] mb-6"
          >
            <Rocket size={16} />
            <span className="font-display font-black text-sm uppercase tracking-widest">Your Learning Journey</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            FROM ZERO TO<br /><span className="text-primary">BUILDING APPS</span>
          </h2>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
            Here&apos;s what a typical Aralify learner&apos;s journey looks like — from first lesson to portfolio project.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 relative"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`w-14 h-14 ${step.color} text-white neo-brutal-border rounded-2xl flex items-center justify-center z-10`}
                >
                  {step.icon}
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border relative">
                    <ArrowDown size={12} className="text-muted-foreground absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                  </div>
                )}
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ x: 6 }}
                className="pb-12 flex-1"
              >
                <div className="bg-card neo-brutal-border neo-brutal-shadow-sm rounded-2xl p-6 group hover:neo-brutal-shadow transition-shadow">
                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">{step.time}</div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{step.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-3">{step.desc}</p>
                  <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-xs font-bold text-muted-foreground">{step.detail}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
