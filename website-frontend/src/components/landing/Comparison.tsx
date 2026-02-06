"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { GridPattern, FloatingShapes } from "@/components/effects";

const features = [
  { feature: "Difficulty Tiers (Easy/Medium/Hard)", aralify: true, codecademy: false, freecodecamp: false, udemy: false },
  { feature: "XP Multipliers & Gamification", aralify: true, codecademy: "partial", freecodecamp: "partial", udemy: false },
  { feature: "Real Code Execution (50+ langs)", aralify: true, codecademy: true, freecodecamp: true, udemy: false },
  { feature: "Free Tier Available", aralify: true, codecademy: "partial", freecodecamp: true, udemy: false },
  { feature: "Streaks & Leaderboards", aralify: true, codecademy: true, freecodecamp: false, udemy: false },
  { feature: "Structured Learning Paths", aralify: true, codecademy: true, freecodecamp: true, udemy: false },
  { feature: "Mobile App (Offline Mode)", aralify: "soon", codecademy: true, freecodecamp: false, udemy: true },
  { feature: "Team / Enterprise Plans", aralify: true, codecademy: true, freecodecamp: false, udemy: true },
  { feature: "Filipino Language Support", aralify: "soon", codecademy: false, freecodecamp: false, udemy: false },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-green-600 mx-auto" strokeWidth={3} />;
  if (value === false) return <X size={18} className="text-red-400 mx-auto" strokeWidth={3} />;
  if (value === "partial") return <Minus size={18} className="text-yellow-500 mx-auto" strokeWidth={3} />;
  if (value === "soon") return <span className="text-xs font-black text-primary uppercase">SOON</span>;
  return null;
}

export function Comparison() {
  return (
    <section className="py-32 bg-muted/20 relative overflow-hidden">
      <GridPattern />
      <FloatingShapes shapes={[
        { type: "square", size: 20, x: "5%", y: "15%", color: "bg-primary", delay: 0, duration: 10, rotate: 45 },
        { type: "circle", size: 18, x: "93%", y: "25%", color: "bg-secondary", delay: 1, duration: 8 },
        { type: "diamond", size: 24, x: "90%", y: "80%", color: "bg-accent", delay: 2, duration: 12 },
      ]} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">WHY ARALIFY?</h2>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
            See how we compare to the alternatives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto overflow-x-auto"
        >
          <div className="min-w-[640px]">
            <table className="w-full neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden bg-card">
              <thead>
                <tr className="border-b-4 border-border">
                  <th className="text-left p-5 font-black text-lg uppercase">Feature</th>
                  <th className="p-5 font-black text-lg text-primary uppercase">Aralify</th>
                  <th className="p-5 font-black text-sm text-muted-foreground uppercase">Codecademy</th>
                  <th className="p-5 font-black text-sm text-muted-foreground uppercase">freeCodeCamp</th>
                  <th className="p-5 font-black text-sm text-muted-foreground uppercase">Udemy</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={i} className={`border-b-2 border-border hover:bg-primary/5 transition-colors ${i % 2 === 0 ? "bg-card" : "bg-background"}`}>
                    <td className="p-4 font-bold text-sm">{row.feature}</td>
                    <td className="p-4 text-center bg-primary/5"><StatusIcon value={row.aralify} /></td>
                    <td className="p-4 text-center"><StatusIcon value={row.codecademy} /></td>
                    <td className="p-4 text-center"><StatusIcon value={row.freecodecamp} /></td>
                    <td className="p-4 text-center"><StatusIcon value={row.udemy} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
