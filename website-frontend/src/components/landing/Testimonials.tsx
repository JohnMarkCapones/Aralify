"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { DotPattern, FloatingShapes } from "@/components/effects";

const testimonials = [
  {
    name: "Maria Santos",
    role: "CS Student, UP Diliman",
    text: "The difficulty tiers are a game-changer. I started on Easy and now I'm tackling Hard challenges. The XP system keeps me coming back every day.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
  },
  {
    name: "James Reyes",
    role: "Career Switcher",
    text: "I tried Codecademy and freeCodeCamp before, but Aralify's real code execution and instant feedback made everything click. Got my first dev job in 6 months.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
  },
  {
    name: "Angela Cruz",
    role: "Bootcamp Graduate",
    text: "The leaderboard and streaks kept me accountable. I learned more in 3 months on Aralify than I did in my entire bootcamp. Highly recommend.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Angela"
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-muted/20 relative overflow-hidden">
      <DotPattern />
      <FloatingShapes shapes={[
        { type: "circle", size: 25, x: "5%", y: "20%", color: "bg-primary", delay: 0, duration: 10 },
        { type: "diamond", size: 22, x: "92%", y: "30%", color: "bg-accent", delay: 1.5, duration: 9 },
        { type: "cross", size: 18, x: "88%", y: "80%", color: "bg-secondary", delay: 2, duration: 11 },
      ]} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">WHAT LEARNERS SAY</h2>
          <p className="text-lg font-medium text-muted-foreground">Real stories from real people building real skills.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "8px 8px 0px 0px hsl(var(--border))" }}
              className="p-8 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl relative transition-shadow"
            >
              <Quote className="absolute -top-5 -left-5 text-primary w-10 h-10 p-2 bg-foreground text-background rounded-xl neo-brutal-border" />
              <p className="text-lg font-medium leading-relaxed mb-6 text-muted-foreground">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3 border-t-2 border-border pt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full neo-brutal-border" loading="lazy" />
                <div>
                  <div className="font-black text-base">{t.name}</div>
                  <div className="font-medium text-primary text-sm">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
