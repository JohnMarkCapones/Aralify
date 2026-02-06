"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { NeoButton } from "@/components/ui/neo-button";
import { Code, Sparkles, CheckCircle, Terminal, ChevronRight, ChevronLeft, ArrowRight, Trophy, BookOpen, Flame } from "lucide-react";
import { useRef, useState } from "react";
import { GradientOrbs, FloatingShapes, GridPattern, MagneticButton, CardTilt } from "@/components/effects";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Interactive Lessons",
      icon: <BookOpen size={24} />,
      description: "Choose your difficulty: Easy, Medium, or Hard. Every lesson adapts to your skill level.",
      preview: {
        label: "Python Basics",
        difficulty: "EASY",
        code: 'print("Hello, World!")',
        output: "Hello, World!",
        xp: "+50 XP"
      },
      color: "bg-primary"
    },
    {
      title: "Real Code Execution",
      icon: <Terminal size={24} />,
      description: "Write and run real code in 50+ languages directly in your browser. No setup needed.",
      preview: {
        label: "JavaScript",
        difficulty: "MEDIUM",
        code: "const sum = [1,2,3].reduce((a,b) => a + b, 0);",
        output: "6",
        xp: "+100 XP (2x)"
      },
      color: "bg-secondary"
    },
    {
      title: "Earn & Compete",
      icon: <Trophy size={24} />,
      description: "Gain XP, maintain streaks, unlock achievements, and climb the leaderboard.",
      preview: {
        label: "Daily Challenge",
        difficulty: "HARD",
        code: "function fibonacci(n) { ... }",
        output: "All tests passed!",
        xp: "+150 XP (3x)"
      },
      color: "bg-accent"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const slide = heroSlides[currentSlide];

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      <GridPattern />
      <GradientOrbs orbs={[
        { color: "bg-primary/20", size: 400, x: "0%", y: "20%", delay: 0, duration: 18 },
        { color: "bg-secondary/15", size: 300, x: "70%", y: "50%", delay: 2, duration: 14 },
        { color: "bg-accent/10", size: 200, x: "40%", y: "80%", delay: 4, duration: 16 },
      ]} />
      <FloatingShapes shapes={[
        { type: "circle", size: 50, x: "5%", y: "15%", color: "bg-primary", delay: 0, duration: 10 },
        { type: "square", size: 35, x: "85%", y: "20%", color: "bg-secondary", delay: 1, duration: 12, rotate: 45 },
        { type: "ring", size: 70, x: "90%", y: "70%", color: "border-primary", delay: 2, duration: 14 },
        { type: "cross", size: 28, x: "15%", y: "85%", color: "bg-accent", delay: 0.5, duration: 9 },
        { type: "diamond", size: 30, x: "75%", y: "10%", color: "bg-muted", delay: 3, duration: 11 },
        { type: "circle", size: 20, x: "50%", y: "5%", color: "bg-secondary", delay: 1.5, duration: 8 },
      ]} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-accent px-5 py-2 neo-brutal-border neo-brutal-shadow-sm rotate-[-1deg] cursor-default"
          >
            <Flame size={18} />
            <span className="font-display font-black text-sm uppercase tracking-widest">Now in Open Beta</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter">
            LEARN TO CODE.<br />
            <span className="text-primary">LEVEL UP.</span><br />
            GET HIRED.
          </h1>

          <p className="text-lg sm:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed text-muted-foreground">
            Interactive programming courses with difficulty tiers, XP rewards, streaks, and real code execution. Master coding at your own pace -- from beginner to job-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <MagneticButton>
              <NeoButton size="lg" variant="primary" className="text-lg sm:text-xl h-16 sm:h-20 px-10 sm:px-14 uppercase tracking-wider group relative animate-pulse-ring">
                Start Learning Free <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </NeoButton>
            </MagneticButton>
            <MagneticButton>
              <NeoButton size="lg" variant="outline" className="text-lg sm:text-xl h-16 sm:h-20 px-10 sm:px-14 uppercase tracking-wider">
                View Courses
              </NeoButton>
            </MagneticButton>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-3 border-border bg-card neo-brutal-shadow-sm overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=aralify${i}`} alt="Community member" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-display font-black text-2xl leading-none">2,500+</div>
              <div className="text-sm font-medium text-muted-foreground">learners enrolled</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Product Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          {/* Desktop carousel controls */}
          <div className="absolute left-0 right-0 flex justify-between px-2 z-50 hidden lg:flex">
            <button onClick={prevSlide} className="p-2.5 bg-card neo-brutal-border neo-brutal-shadow hover:bg-primary hover:text-white transition-colors rounded-xl" aria-label="Previous slide">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="p-2.5 bg-card neo-brutal-border neo-brutal-shadow hover:bg-primary hover:text-white transition-colors rounded-xl" aria-label="Next slide">
              <ChevronRight size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-[480px] bg-card neo-brutal-border neo-brutal-shadow-lg rounded-3xl overflow-hidden animate-shimmer"
            >
              {/* Terminal header */}
              <div className="w-full h-12 bg-foreground flex items-center px-6 gap-2.5">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-auto text-background font-mono text-xs tracking-wider flex items-center gap-2">
                  <Terminal size={14} /> {slide.preview.label}
                </span>
              </div>

              <div className="p-8 space-y-6">
                {/* Lesson header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 ${slide.color} text-white rounded-xl neo-brutal-border`}>
                      {slide.icon}
                    </div>
                    <div>
                      <div className="font-black text-lg">{slide.title}</div>
                      <div className="text-sm text-muted-foreground font-medium">{slide.description.slice(0, 50)}...</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-black uppercase neo-brutal-border rounded-full ${
                    slide.preview.difficulty === "EASY" ? "bg-green-200 text-green-800" :
                    slide.preview.difficulty === "MEDIUM" ? "bg-yellow-200 text-yellow-800" :
                    "bg-red-200 text-red-800"
                  }`}>
                    {slide.preview.difficulty}
                  </span>
                </div>

                {/* Code preview */}
                <div className="bg-foreground text-background rounded-xl p-5 font-mono text-sm neo-brutal-border">
                  <div className="text-muted opacity-60 mb-1">// Your code</div>
                  <div className="text-primary font-bold">{slide.preview.code}</div>
                </div>

                {/* Output */}
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl neo-brutal-border border-green-500">
                  <CheckCircle size={20} className="text-green-600 shrink-0" />
                  <div className="font-mono font-bold text-green-700 dark:text-green-400 text-sm">{slide.preview.output}</div>
                  <div className="ml-auto flex items-center gap-1 text-primary font-black text-sm">
                    <Sparkles size={14} /> {slide.preview.xp}
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-3 h-3 rounded-full neo-brutal-border transition-colors ${i === currentSlide ? "bg-primary" : "bg-muted"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile swipe controls */}
          <div className="flex lg:hidden justify-center gap-4 absolute -bottom-14">
            <button onClick={prevSlide} className="p-2 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl" aria-label="Previous slide">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextSlide} className="p-2 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl" aria-label="Next slide">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
