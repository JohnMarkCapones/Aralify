"use client";

import Image from "next/image";
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
    image: "/bento-playground.png",
    imageClass: "right-32 top-4 w-[65%] h-full",
    decoration: "playground",
  },
  {
    title: "GLOBAL LEADERBOARD",
    desc: "Compete with learners worldwide and climb the ranks.",
    icon: <Globe className="w-7 h-7" />,
    color: "bg-secondary",
    size: "md:col-span-1 md:row-span-1",
    image: "/bento-leaderboard.png",
    imageClass: "right-2 -top-10 w-full h-full",
    decoration: "leaderboard",
  },
  {
    title: "SQL VISUALIZER",
    desc: "Master database queries with interactive diagrams.",
    icon: <Database className="w-7 h-7" />,
    color: "bg-accent",
    size: "md:col-span-1 md:row-span-1",
    image: "/bento-sql.png",
    imageClass: "right-2 top-0 w-[65%] h-[65%]",
    decoration: "sql",
  },
  {
    title: "DEBUGGING TOOLS",
    desc: "Visual debugger that helps you understand error patterns.",
    icon: <Binary className="w-7 h-7" />,
    color: "bg-card",
    size: "md:col-span-1 md:row-span-1",
    image: "/bento-debug.png",
    imageClass: "right-16 -top-2 w-[65%] h-[65%]",
    decoration: "debug",
  },
  {
    title: "SYSTEM DESIGN",
    desc: "Learn to architect scalable applications from scratch.",
    icon: <Code2 className="w-7 h-7" />,
    color: "bg-muted",
    size: "md:col-span-2 md:row-span-1",
    image: "/bento-system.png",
    imageClass: "right-16 -top-4 w-[55%] h-full",
    decoration: "system",
  },
];


function BentoDecoration({ type }: { type: string }) {
  switch (type) {
    case "playground":
      return (
        <>
          {/* Floating grid pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.07] pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid-pg" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pg)" />
            </svg>
          </div>
          {/* Floating circles */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-8 w-16 h-16 rounded-full border-[3px] border-current opacity-10 pointer-events-none"
          />
          <motion.div
            animate={{ y: [6, -6, 6], x: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-16 w-8 h-8 rounded-lg border-[3px] border-current opacity-10 rotate-45 pointer-events-none"
          />
          {/* Code bracket shapes */}
          <div className="absolute top-14 right-6 text-5xl font-black opacity-[0.06] pointer-events-none select-none">
            {"{ }"}
          </div>
        </>
      );

    case "leaderboard":
      return (
        <>
          {/* Diagonal stripes */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="stripes-lb" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stripes-lb)" />
            </svg>
          </div>
          {/* Trophy/podium shapes */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 w-10 h-10 border-[3px] border-current opacity-10 pointer-events-none"
            style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
          />
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 right-6 pointer-events-none opacity-[0.08]"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
            </svg>
          </motion.div>
        </>
      );

    case "sql":
      return (
        <>
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="dots-sql" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-sql)" />
            </svg>
          </div>
          {/* Database cylinder shape */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-14 left-6 opacity-[0.08] pointer-events-none"
          >
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="18" cy="8" rx="14" ry="6" />
              <line x1="4" y1="8" x2="4" y2="36" />
              <line x1="32" y1="8" x2="32" y2="36" />
              <ellipse cx="18" cy="36" rx="14" ry="6" />
            </svg>
          </motion.div>
          {/* Small floating diamond */}
          <motion.div
            animate={{ y: [-5, 5, -5], x: [3, -3, 3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-5 right-5 w-5 h-5 border-2 border-current opacity-10 rotate-45 pointer-events-none"
          />
        </>
      );

    case "debug":
      return (
        <>
          {/* Cross-hatch pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="cross-db" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 0 8 L 16 8 M 8 0 L 8 16" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cross-db)" />
            </svg>
          </div>
          {/* Bug/target rings */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-14 right-6 pointer-events-none"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="1">
              <circle cx="20" cy="20" r="16" />
              <circle cx="20" cy="20" r="10" />
              <circle cx="20" cy="20" r="4" />
              <line x1="20" y1="0" x2="20" y2="8" />
              <line x1="20" y1="32" x2="20" y2="40" />
              <line x1="0" y1="20" x2="8" y2="20" />
              <line x1="32" y1="20" x2="40" y2="20" />
            </svg>
          </motion.div>
          {/* Small floating triangle */}
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-6 right-6 w-6 h-6 border-2 border-current opacity-10 pointer-events-none"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </>
      );

    case "system":
      return (
        <>
          {/* Node graph — left side */}
          <div className="absolute left-0 top-0 w-[50%] h-full opacity-[0.07] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 300 250">
              {/* Nodes */}
              <circle cx="60" cy="50" r="8" fill="currentColor" />
              <circle cx="140" cy="40" r="6" fill="currentColor" />
              <circle cx="100" cy="120" r="10" fill="currentColor" />
              <circle cx="200" cy="80" r="7" fill="currentColor" />
              <circle cx="40" cy="140" r="5" fill="currentColor" />
              <circle cx="170" cy="160" r="6" fill="currentColor" />
              <circle cx="240" cy="140" r="5" fill="currentColor" />
              {/* Lines */}
              <line x1="60" y1="50" x2="140" y2="40" stroke="currentColor" strokeWidth="1.5" />
              <line x1="60" y1="50" x2="100" y2="120" stroke="currentColor" strokeWidth="1.5" />
              <line x1="140" y1="40" x2="200" y2="80" stroke="currentColor" strokeWidth="1.5" />
              <line x1="100" y1="120" x2="170" y2="160" stroke="currentColor" strokeWidth="1.5" />
              <line x1="200" y1="80" x2="240" y2="140" stroke="currentColor" strokeWidth="1.5" />
              <line x1="40" y1="140" x2="100" y2="120" stroke="currentColor" strokeWidth="1.5" />
              <line x1="170" y1="160" x2="240" y2="140" stroke="currentColor" strokeWidth="1.5" />
              <line x1="140" y1="40" x2="100" y2="120" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          {/* Floating hexagon — left */}
          <motion.div
            animate={{ rotate: [0, 60, 0], y: [-3, 3, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-28 opacity-[0.08] pointer-events-none"
          >
            <svg width="44" height="50" viewBox="0 0 44 50" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,2 42,14 42,36 22,48 2,36 2,14" />
            </svg>
          </motion.div>
          {/* Floating circle — left */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], y: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-8 w-10 h-10 rounded-full border-[3px] border-current opacity-10 pointer-events-none"
          />
          {/* Small diamond — left */}
          <motion.div
            animate={{ rotate: [45, 135, 45], x: [-3, 3, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 left-24 w-5 h-5 border-2 border-current opacity-10 pointer-events-none"
          />
          {/* Dot — left */}
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-10 w-3 h-3 bg-current opacity-[0.06] rounded-full pointer-events-none"
          />
          {/* Small square — left */}
          <motion.div
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 left-44 w-4 h-4 border-2 border-current opacity-[0.08] rounded-sm pointer-events-none"
          />
          {/* === Right side shapes === */}
          {/* Floating triangle — right */}
          <motion.div
            animate={{ rotate: [0, 180, 360], y: [-3, 3, -3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-5 right-6 w-7 h-7 border-2 border-current opacity-10 pointer-events-none"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
          {/* Floating circle — right */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [3, -3, 3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute bottom-10 right-10 w-8 h-8 rounded-full border-[3px] border-current opacity-[0.08] pointer-events-none"
          />
          {/* Small cross — right */}
          <motion.div
            animate={{ rotate: [0, 45, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-14 right-14 opacity-[0.08] pointer-events-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="0" x2="8" y2="16" />
              <line x1="0" y1="8" x2="16" y2="8" />
            </svg>
          </motion.div>
          {/* Dot — right */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute bottom-20 right-6 w-3 h-3 bg-current opacity-[0.06] rounded-full pointer-events-none"
          />
        </>
      );

    default:
      return null;
  }
}

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
            {/* Decorative shapes */}
            <BentoDecoration type={item.decoration} />

            <div className="bg-foreground text-background p-3 w-fit rounded-xl group-hover:bg-primary group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10">
              {item.icon}
            </div>

            {item.image && (
              <div className={`absolute ${item.imageClass} pointer-events-none select-none`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain object-right-top drop-shadow-lg group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-300 p-4"
                />
              </div>
            )}


            <div className="z-10">
              <h3 className="text-2xl font-black mb-2 uppercase leading-none">{item.title}</h3>
              <p className={`font-medium text-lg opacity-80 leading-snug ${item.title === "CODE PLAYGROUND" ? "max-w-[60%]" : ""}`}>{item.desc}</p>
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
