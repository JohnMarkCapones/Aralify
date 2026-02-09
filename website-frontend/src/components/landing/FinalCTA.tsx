"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { FloatingShapes, MagneticButton } from "@/components/effects";

export function FinalCTA() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden noise-overlay">
      <FloatingShapes shapes={[
        { type: "ring", size: 90, x: "5%", y: "10%", color: "border-white", delay: 0, duration: 14 },
        { type: "circle", size: 30, x: "90%", y: "20%", color: "bg-white", delay: 1, duration: 10 },
        { type: "diamond", size: 35, x: "85%", y: "75%", color: "bg-white", delay: 2, duration: 12 },
        { type: "cross", size: 25, x: "10%", y: "85%", color: "bg-white", delay: 1.5, duration: 9 },
        { type: "square", size: 20, x: "50%", y: "5%", color: "bg-white", delay: 3, duration: 11, rotate: 45 },
        { type: "circle", size: 15, x: "30%", y: "90%", color: "bg-white", delay: 0.5, duration: 8 },
      ]} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest neo-brutal-border-white"
          >
            <Sparkles size={16} /> START YOUR JOURNEY TODAY
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            READY TO WRITE<br />YOUR FIRST LINE<br />OF CODE?
          </h2>

          <p className="text-xl font-medium opacity-80 max-w-xl mx-auto leading-relaxed">
            Join 2,500+ learners already building real skills with Aralify. Free forever on the Hobbyist plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <MagneticButton>
              <NeoButton size="lg" variant="accent" className="text-xl h-16 px-12 group relative animate-pulse-ring">
                GET STARTED FREE <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </NeoButton>
            </MagneticButton>
            <MagneticButton>
              <NeoButton size="lg" variant="outline" className="text-xl h-16 px-12 neo-brutal-border-white text-white hover:bg-white/10">
                VIEW COURSES
              </NeoButton>
            </MagneticButton>
          </div>

          <p className="text-sm font-medium opacity-50">
            No credit card required. Start learning in under 2 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
