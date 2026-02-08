"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Database, Binary, Code2, Play } from "lucide-react";
import { DotPattern } from "@/components/effects";

const bentoItems = [
  {
    title: "CODE PLAYGROUND",
    desc: "Write and run code in 50+ languages with our cloud-based editor.",
    icon: <Cpu className="w-7 h-7" />,
    color: "bg-primary",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    title: "GLOBAL LEADERBOARD",
    desc: "Compete with learners worldwide and climb the ranks.",
    icon: <Globe className="w-7 h-7" />,
    color: "bg-secondary",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    title: "SQL VISUALIZER",
    desc: "Master database queries with interactive diagrams.",
    icon: <Database className="w-7 h-7" />,
    color: "bg-accent",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    title: "DEBUGGING TOOLS",
    desc: "Visual debugger that helps you understand error patterns.",
    icon: <Binary className="w-7 h-7" />,
    color: "bg-card",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    title: "SYSTEM DESIGN",
    desc: "Learn to architect scalable applications from scratch.",
    icon: <Code2 className="w-7 h-7" />,
    color: "bg-muted",
    size: "md:col-span-2 md:row-span-1",
  },
];

export function BentoGrids() {
  return (
    <section className="py-32 container mx-auto px-4 relative">
      <DotPattern />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-8xl font-black mb-4 uppercase leading-none tracking-tighter">
          EVERYTHING YOU NEED
        </h2>
        <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
          A complete toolkit for learning to code, from interactive lessons to real-world projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-[250px]">
        {bentoItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px hsl(var(--border))" }}
            className={`
              ${item.size} ${item.color}
              neo-brutal-border neo-brutal-shadow p-8
              flex flex-col justify-between group cursor-pointer
              rounded-2xl relative overflow-hidden
            `}
          >
            <div className="bg-foreground text-background p-3 w-fit rounded-xl group-hover:bg-primary group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>

            <div className="z-10">
              <h3 className="text-2xl font-black mb-2 uppercase leading-none">{item.title}</h3>
              <p className="font-medium text-lg opacity-80 leading-snug">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 max-w-5xl mx-auto relative group"
      >
        <div className="absolute -inset-3 bg-primary neo-brutal-border -z-10 rounded-2xl rotate-1 group-hover:rotate-0 transition-transform" />
        <div className="relative aspect-video bg-foreground rounded-xl neo-brutal-border neo-brutal-shadow-lg overflow-hidden flex items-center justify-center cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div className="text-white">
              <h4 className="text-2xl font-black mb-1 uppercase tracking-tighter">SEE ARALIFY IN ACTION</h4>
              <p className="font-medium opacity-70">Watch how learners go from zero to building real projects.</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 bg-white dark:bg-card rounded-full flex items-center justify-center neo-brutal-border z-20"
          >
            <Play className="fill-foreground ml-1" size={32} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
