"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Star, Cpu, Zap, Shield, Rocket } from "lucide-react";
import {
  Navbar,
  Hero,
  BentoGrids,
  LanguageSection,
  SecuritySection,
  Testimonials,
  Leaderboard,
  Subscription,
  Footer,
} from "@/components/landing";
import { NeoButton } from "@/components/ui/neo-button";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary selection:text-white scroll-smooth overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-3 bg-primary z-[110] origin-left border-b-4 border-black"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="relative">
        <Hero />

        {/* Animated Marquee Banner */}
        <div className="bg-black text-white py-10 border-y-4 border-black overflow-hidden rotate-[-2deg] scale-105 z-20 relative">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-display font-black text-4xl flex gap-16 items-center"
          >
            {Array(10).fill("ARALIFY.MASTER() ★ NO_PLACEHOLDERS ★ REAL_SKILLS ★").map((text, i) => (
              <span key={i} className="flex items-center gap-16 uppercase tracking-widest italic">
                {text} <Star className="text-primary fill-primary scale-125" />
              </span>
            ))}
          </motion.div>
        </div>

        <LanguageSection />
        <BentoGrids />
        <SecuritySection />

        {/* Why Aralify Section */}
        <section className="py-32 bg-primary/5 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                  WHY <br/> <span className="text-primary">ARALIFY</span>?
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: <Cpu />, title: "Low Level Mastery", desc: "We don't just teach frameworks. We teach how they work under the hood." },
                    { icon: <Zap />, title: "Hyper-Performance", desc: "Our interactive IDE runs at 60fps directly in your browser." },
                    { icon: <Shield />, title: "Production Ready", desc: "Every project you build is ready to be deployed to the cloud." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-6 p-8 bg-white neo-brutal-border neo-brutal-shadow rounded-3xl group hover:-translate-y-2 transition-transform">
                      <div className="p-4 bg-black text-white rounded-2xl group-hover:bg-primary transition-colors">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase mb-1">{feature.title}</h3>
                        <p className="font-bold text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-secondary neo-brutal-border -z-10 rounded-full blur-[100px] opacity-20" />
                <div className="aspect-square bg-white neo-brutal-border neo-brutal-shadow-lg rounded-[4rem] p-12 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  <div className="text-center space-y-8 z-10">
                    <Rocket size={120} className="mx-auto text-primary animate-bounce" />
                    <div className="text-4xl font-black uppercase tracking-tighter">Ready for take-off?</div>
                    <NeoButton size="lg" variant="primary" className="text-2xl h-20 px-12">GET STARTED</NeoButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Testimonials />
        <Leaderboard />

        {/* Second Marquee Banner */}
        <div className="relative py-20 bg-black overflow-hidden border-y-4 border-black">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-display font-black text-3xl flex gap-12 items-center text-white"
          >
            {Array(10).fill("MASTER THE ART OF CODING ★ JOIN 500K+ ENGINEERS ★ ").map((text, i) => (
              <span key={i} className="flex items-center gap-12 uppercase">
                {text} <div className="w-4 h-4 bg-secondary rounded-full" />
              </span>
            ))}
          </motion.div>
        </div>

        <Subscription />

        <Footer />
      </main>
    </div>
  );
}
