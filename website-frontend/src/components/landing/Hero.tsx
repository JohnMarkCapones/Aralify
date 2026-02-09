"use client";

import { motion } from "framer-motion";
import { NeoButton } from "@/components/ui/neo-button";
import { ArrowRight, Flame } from "lucide-react";
import { useRef } from "react";
import { GradientOrbs, FloatingShapes, GridPattern, MagneticButton, CardTilt } from "@/components/effects";
import { HeroLottieBackground } from "./HeroLottieBackground";
import { HeroCodeCard } from "./HeroCodeCard";

export function Hero() {
  const containerRef = useRef(null);

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

        {/* Right: Animated Code Card with Lottie Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          <HeroLottieBackground />
          <CardTilt className="relative z-10">
            <HeroCodeCard />
          </CardTilt>
        </motion.div>
      </div>
    </section>
  );
}
