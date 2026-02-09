"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowRight, Clock, Brain, Sparkles } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";

export function PathFinderCTA() {
  return (
    <section className="py-24 bg-primary/5 border-y-4 border-border relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent px-5 py-2 neo-brutal-border neo-brutal-shadow-sm rotate-[-1deg] mb-8"
          >
            <Compass size={16} />
            <span className="font-display font-black text-sm uppercase tracking-widest">
              Not Sure Where to Start?
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-4"
          >
            FIND YOUR <span className="text-primary">PERFECT PATH</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Take our quick personality quiz and discover which tech career fits you best.
            No tech knowledge required — just answer honestly and let our AI do the matching.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {[
              { label: "13 Questions", Icon: Brain },
              { label: "3-4 Minutes", Icon: Clock },
              { label: "AI-Powered", Icon: Sparkles },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 bg-card neo-brutal-border rounded-full px-4 py-2"
              >
                <stat.Icon size={14} className="text-primary" />
                <span className="text-sm font-black uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/pathfinder">
              <NeoButton size="lg" variant="primary" className="text-xl h-16 px-12 group">
                TAKE THE QUIZ <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
              </NeoButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
