"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { NeoButton } from "@/components/ui/neo-button";
import { Code, Sparkles, Box, Binary, Cpu, Layout, Layers, Terminal, ChevronRight, ChevronLeft, ArrowRight, Globe } from "lucide-react";
import { useRef, useState } from "react";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "COMPILE.SUCCESS()",
      icon: <Code size={24}/>,
      stats: { label: "Cluster_Health", value: "98%" },
      grid: [
        { icon: <Cpu size={32} />, label: "Core_9", color: "bg-muted hover:bg-primary group-hover:text-white" },
        { icon: <Binary size={32} />, label: "Stream_X", color: "bg-accent" }
      ],
      pill: "ELITE_DEV"
    },
    {
      title: "SYSTEM.DEPLOY()",
      icon: <Layers size={24}/>,
      stats: { label: "Edge_Latency", value: "12ms" },
      grid: [
        { icon: <Globe size={32} />, label: "Global_v4", color: "bg-secondary" },
        { icon: <Layout size={32} />, label: "Frame_OS", color: "bg-muted" }
      ],
      pill: "CLOUD_ARCH"
    },
    {
      title: "NEURAL.INIT()",
      icon: <Sparkles size={24}/>,
      stats: { label: "Model_Load", value: "100%" },
      grid: [
        { icon: <Terminal size={32} />, label: "AI_Prompt", color: "bg-primary text-white" },
        { icon: <Box size={32} />, label: "Tensor_X", color: "bg-accent" }
      ],
      pill: "AI_GEN_V2"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const slide = heroSlides[currentSlide];

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center pt-24 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: y1, rotate }} className="absolute top-[10%] left-[5%] w-32 h-32 bg-primary neo-brutal-border opacity-20" />
        <motion.div style={{ y: y2, rotate: -rotate }} className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-secondary rounded-full neo-brutal-border opacity-10" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-primary/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          style={{ scale: textScale }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10 text-center lg:text-left"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="inline-flex items-center gap-2 bg-secondary px-6 py-2 neo-brutal-border neo-brutal-shadow-sm rotate-[-1deg] mb-4 cursor-pointer"
          >
            <Binary size={18} />
            <span className="font-display font-black text-sm uppercase tracking-widest">ARALIFY.VERSION(2.0)</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black leading-[0.8] tracking-tighter">
            CODE THE <br/>
            <span className="text-primary underline decoration-[12px] decoration-black">IMPOSSIBLE</span> <br/>
            <span className="text-stroke">WITH ARALIFY</span>
          </h1>

          <p className="text-2xl font-bold max-w-xl mx-auto lg:mx-0 leading-tight opacity-80">
            Aralify isn&apos;t just a platform—it&apos;s a high-performance ecosystem. Master production engineering with interactive 3D systems and the world&apos;s fastest cloud IDE.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NeoButton size="lg" variant="primary" className="text-2xl h-24 px-16 uppercase tracking-widest group">
                Enter Portal <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </NeoButton>
            </motion.div>
            <NeoButton size="lg" variant="outline" className="text-2xl h-24 px-16 uppercase tracking-widest">View Curriculum</NeoButton>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-10 pt-10">
            <div className="flex -space-x-6">
               {[1,2,3,4,5].map(i => (
                 <motion.div
                    key={i}
                    whileHover={{ y: -15, scale: 1.1, zIndex: 50 }}
                    className="w-16 h-16 rounded-full border-4 border-black bg-white neo-brutal-shadow-sm overflow-hidden cursor-pointer"
                 >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=aralify${i}`} alt="user" />
                 </motion.div>
               ))}
            </div>
            <div className="font-display font-black">
              <span className="text-4xl block leading-none">850K+</span>
              ENG_ACTIVE
            </div>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative h-[600px] w-full hidden lg:flex items-center justify-center perspective-1000"
        >
            <div className="absolute left-0 right-0 flex justify-between px-4 z-50">
              <button onClick={prevSlide} className="p-3 bg-white neo-brutal-border neo-brutal-shadow hover:bg-primary transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="p-3 bg-white neo-brutal-border neo-brutal-shadow hover:bg-primary transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100, rotateY: 45 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -45 }}
                whileHover={{ rotateY: 10, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-[480px] h-[480px] bg-white neo-brutal-border neo-brutal-shadow-lg rounded-[3.5rem] p-12 relative preserve-3d group cursor-crosshair"
              >
                <div className="absolute top-0 left-0 w-full h-14 bg-black flex items-center px-8 gap-3 rounded-t-[3.3rem]">
                    <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <span className="ml-auto text-white font-mono text-xs opacity-50 tracking-widest flex items-center gap-2">
                      <Terminal size={14} /> {slide.title}
                    </span>
                </div>

                <div className="mt-10 flex flex-col gap-8 font-mono font-bold text-xl">
                    <div className="flex items-center justify-between text-primary">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">{slide.icon}</div>
                          <span>{slide.title}</span>
                        </div>
                        <Sparkles className="text-accent animate-spin" style={{ animationDuration: '3s' }} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs opacity-50 uppercase tracking-widest">
                        <span>{slide.stats.label}</span>
                        <span>{slide.stats.value}</span>
                      </div>
                      <div className="h-5 bg-gray-100 rounded-full w-full relative overflow-hidden border-2 border-black">
                          <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: slide.stats.value }}
                              className="absolute top-0 left-0 h-full bg-primary"
                          />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {slide.grid.map((g, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.05 }} className={`h-28 ${g.color} neo-brutal-border rounded-3xl flex items-center justify-center flex-col gap-2 transition-colors`}>
                              {g.icon}
                              <span className="text-xs uppercase font-black">{g.label}</span>
                          </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, -50, 0], rotate: [5, -10, 5] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -right-20 top-24 w-48 h-20 bg-primary neo-brutal-border neo-brutal-shadow-lg flex items-center justify-center rounded-full text-white font-black italic text-2xl z-50"
                >
                    {slide.pill}
                </motion.div>
              </motion.div>
            </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
