"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Globe, Database, Binary, Code2, Plus, Play } from "lucide-react";
import { useRef } from "react";

const bentoItems = [
  {
    title: "COMPILER ENGINE",
    desc: "Blazing fast cloud-based execution for 50+ languages.",
    icon: <Cpu className="w-8 h-8" />,
    color: "bg-primary",
    size: "col-span-1 md:col-span-2 row-span-2",
    rotate: "-1deg"
  },
  {
    title: "GLOBAL RANK",
    desc: "Compare your code efficiency with elite engineers.",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-secondary",
    size: "col-span-1 row-span-1",
    rotate: "2deg"
  },
  {
    title: "SQL VISUALIZER",
    desc: "Master complex queries with interactive diagrams.",
    icon: <Database className="w-8 h-8" />,
    color: "bg-accent",
    size: "col-span-1 row-span-1",
    rotate: "-2deg"
  },
  {
    title: "L-ARCH DESIGN",
    desc: "New L-shaped architecture for high density scaling.",
    icon: <Plus className="w-8 h-8" />,
    color: "bg-white",
    size: "col-span-1 md:col-span-1 row-span-2",
    rotate: "1deg",
    isL: true
  },
  {
    title: "DEBUGGING PRO",
    desc: "Visual debugger that turns bugs into logic patterns.",
    icon: <Binary className="w-8 h-8" />,
    color: "bg-white",
    size: "col-span-1 row-span-1",
    rotate: "1deg"
  },
  {
    title: "SYSTEM DESIGN",
    desc: "Learn to architect scalable microservices from scratch.",
    icon: <Code2 className="w-8 h-8" />,
    color: "bg-muted",
    size: "col-span-1 md:col-span-2 row-span-1",
    rotate: "-1deg"
  }
];

export function BentoGrids() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className="py-32 container mx-auto px-4 overflow-hidden perspective-1000">
      <motion.div
        style={{ y, rotate }}
        className="text-center mb-20"
      >
        <h2 className="text-6xl md:text-9xl font-black mb-6 uppercase leading-none tracking-tighter">
          ADVANCED <br/>
          <span className="text-stroke">CURRICULUM</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl mx-auto auto-rows-[300px]">
        {bentoItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: 5,
              z: 50,
              boxShadow: "15px 15px 0px 0px rgba(0,0,0,1)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            viewport={{ once: true }}
            className={`
              ${item.size} ${item.color}
              neo-brutal-border neo-brutal-shadow p-10
              flex flex-col justify-between group cursor-pointer
              rounded-[2rem] relative overflow-hidden preserve-3d
              ${item.isL ? 'bg-primary/5' : ''}
            `}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
               {item.icon}
            </div>

            <div className="bg-black text-white p-4 w-fit rounded-2xl border-3 border-black group-hover:rotate-[360deg] transition-transform duration-700">
              {item.icon}
            </div>

            <div className="z-10">
              <h3 className="text-3xl font-black mb-3 uppercase leading-none">{item.title}</h3>
              <p className="font-bold text-xl opacity-90 leading-tight">{item.desc}</p>
            </div>
          </motion.div>
        ))}
        {/* Placeholder to fill the gap if needed */}
        <div className="hidden lg:block bg-accent/20 neo-brutal-border rounded-[2rem] opacity-30 border-dashed" />
      </div>

      {/* Video Section Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mt-32 max-w-6xl mx-auto relative group"
      >
        <div className="absolute -inset-4 bg-primary neo-brutal-border -z-10 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform" />
        <div className="relative aspect-video bg-black rounded-2xl neo-brutal-border neo-brutal-shadow-lg overflow-hidden flex items-center justify-center cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="text-white">
                    <h4 className="text-3xl font-black mb-2 uppercase tracking-tighter">ARALIFY PLATFORM DEMO</h4>
                    <p className="font-bold opacity-70">Watch how Aralify transforms your coding experience.</p>
                </div>
            </div>
            <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center neo-brutal-border-white neo-brutal-shadow z-20"
            >
                <Play className="fill-black ml-2" size={40} />
            </motion.div>
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </motion.div>
    </section>
  );
}
