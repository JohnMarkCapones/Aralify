"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Rocket, ArrowRight, GraduationCap, Code2, Globe, Flame, Trophy, Target, Users, BarChart3, Sparkles } from "lucide-react";
import {
  Navbar,
  Hero,
  HowItWorks,
  BentoGrids,
  LanguageSection,
  CoursePreview,
  SecuritySection,
  Comparison,
  Testimonials,
  Leaderboard,
  MobilePreview,
  Subscription,
  FAQ,
  FinalCTA,
  Footer,
  StudentJourney,
  CommunityHighlights,
  Partners,
  PathFinderCTA,
} from "@/components/landing";
import { NeoButton } from "@/components/ui/neo-button";
import { CursorGlow, FloatingShapes, GradientOrbs, DotPattern, AnimatedCounter, MagneticButton } from "@/components/effects";
import { MobileBottomNav } from "@/components/navigation";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary selection:text-white scroll-smooth overflow-x-hidden">
      <CursorGlow />

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="relative pb-20 lg:pb-0">
        <Hero />

        {/* Marquee Banner */}
        <div className="surface-inverted py-5 border-y-4 border-border overflow-hidden rotate-[-1deg] scale-[1.02] z-20 relative noise-overlay">
          <div className="animate-marquee whitespace-nowrap font-display font-black text-2xl sm:text-3xl flex gap-12 items-center w-max">
            {Array(2).fill(null).map((_, setIdx) => (
              <span key={setIdx} className="flex items-center gap-12 uppercase tracking-widest">
                LEARN BY DOING <span className="text-primary animate-pulse">*</span>
                {" "}50+ LANGUAGES <span className="text-secondary animate-pulse" style={{ animationDelay: "0.5s" }}>*</span>
                {" "}EARN XP & BADGES <span className="text-accent animate-pulse" style={{ animationDelay: "1s" }}>*</span>
                {" "}REAL CODE EXECUTION <span className="text-primary animate-pulse" style={{ animationDelay: "1.5s" }}>*</span>
                {" "}JOIN THE COMMUNITY <span className="text-secondary animate-pulse" style={{ animationDelay: "2s" }}>*</span>
              </span>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <section className="py-16 bg-card border-b-4 border-border relative">
          <DotPattern />
          <div className="container mx-auto px-4 relative z-10">
            <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">
              Built with industry-standard tools
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {[
                { name: "Next.js", icon: <Globe size={28} /> },
                { name: "TypeScript", icon: <Code2 size={28} /> },
                { name: "PostgreSQL", icon: <Cpu size={28} /> },
                { name: "Judge0", icon: <Zap size={28} /> },
                { name: "NestJS", icon: <Shield size={28} /> },
                { name: "Supabase", icon: <GraduationCap size={28} /> },
              ].map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 font-display font-black text-lg uppercase opacity-50 hover:opacity-100 transition-opacity cursor-default"
                >
                  {tool.icon}
                  <span>{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <PathFinderCTA />
        <LanguageSection />
        <CoursePreview />
        <BentoGrids />
        <SecuritySection />

        {/* Why Aralify Section */}
        <section className="py-32 bg-primary/5 overflow-hidden relative">
          <GradientOrbs orbs={[
            { color: "bg-primary/15", size: 350, x: "5%", y: "10%", delay: 0, duration: 20 },
            { color: "bg-secondary/10", size: 250, x: "75%", y: "60%", delay: 3, duration: 15 },
          ]} />
          <FloatingShapes shapes={[
            { type: "circle", size: 30, x: "92%", y: "15%", color: "bg-primary", delay: 0, duration: 8 },
            { type: "square", size: 20, x: "3%", y: "80%", color: "bg-secondary", delay: 1, duration: 10, rotate: 45 },
            { type: "diamond", size: 24, x: "88%", y: "75%", color: "bg-accent", delay: 2, duration: 9 },
            { type: "cross", size: 18, x: "50%", y: "5%", color: "bg-primary", delay: 1.5, duration: 11 },
            { type: "ring", size: 50, x: "95%", y: "50%", color: "border-secondary", delay: 0.5, duration: 13 },
          ]} />
          <div className="container mx-auto px-4 relative z-10">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-accent px-5 py-2 neo-brutal-border neo-brutal-shadow-sm rotate-[-1deg] mb-6"
              >
                <Sparkles size={16} />
                <span className="font-display font-black text-sm uppercase tracking-widest">What Sets Us Apart</span>
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter mb-4">
                WHY <span className="text-primary">ARALIFY</span>?
              </h2>
              <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
                Not just another coding platform. We built Aralify around the science of motivation — so you actually finish what you start.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
              {/* Left: Feature list */}
              <div className="space-y-5">
                {[
                  { icon: <Target size={22} />, title: "Difficulty Tiers", desc: "Every lesson has Easy, Medium, and Hard modes. Start where you're comfortable, level up when you're ready.", tag: "CORE", tagColor: "bg-primary text-white" },
                  { icon: <Zap size={22} />, title: "Real Code Execution", desc: "Write and run code in 50+ languages with Judge0 sandbox — directly in your browser. Zero setup.", tag: "LIVE", tagColor: "bg-green-500 text-white" },
                  { icon: <Flame size={22} />, title: "XP Multipliers", desc: "Earn 1x, 2x, or 3x XP based on difficulty. Hard mode rewards bold learners with triple the experience.", tag: "GAMIFIED", tagColor: "bg-accent text-accent-foreground" },
                  { icon: <Trophy size={22} />, title: "Streaks & Leaderboards", desc: "Daily streaks keep you accountable. Weekly leaderboards keep you competitive. Badges mark your milestones.", tag: "SOCIAL", tagColor: "bg-secondary text-white" },
                  { icon: <Users size={22} />, title: "Built for Filipinos", desc: "Filipino language support coming soon. Course content designed for the PH tech job market and local career paths.", tag: "LOCAL", tagColor: "bg-primary text-white" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ x: 6, boxShadow: "8px 8px 0px 0px hsl(var(--border))" }}
                    className="flex gap-5 p-5 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl group cursor-default transition-shadow"
                  >
                    <div className="p-3 bg-foreground text-background rounded-xl group-hover:bg-primary group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shrink-0 h-fit">
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-lg font-black uppercase">{feature.title}</h3>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border ${feature.tagColor}`}>
                          {feature.tag}
                        </span>
                      </div>
                      <p className="font-medium text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right: Interactive dashboard mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative lg:sticky lg:top-28"
              >
                {/* Tilted bg accent */}
                <div className="absolute -inset-3 bg-primary/10 neo-brutal-border rounded-3xl rotate-2 -z-10" />

                <div className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-3xl overflow-hidden">
                  {/* Dashboard header */}
                  <div className="bg-[hsl(222,47%,11%)] dark:bg-[hsl(222,47%,6%)] px-6 py-4 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-auto text-white font-mono text-xs tracking-wider flex items-center gap-2">
                      <BarChart3 size={14} /> Learner Dashboard
                    </span>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Profile row */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full neo-brutal-border overflow-hidden bg-primary/20 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=aralify-demo" alt="Demo learner" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-lg">Juan Dela Cruz</div>
                        <div className="text-sm font-medium text-muted-foreground">Level 12 · Python Track</div>
                      </div>
                      <div className="flex items-center gap-1 bg-accent px-3 py-1.5 neo-brutal-border rounded-full shrink-0">
                        <Flame size={14} />
                        <span className="font-black text-sm">12 day streak</span>
                      </div>
                    </div>

                    {/* XP progress bar */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold text-muted-foreground">Level Progress</span>
                        <span className="text-sm font-black text-primary">2,340 / 3,000 XP</span>
                      </div>
                      <div className="h-4 bg-muted rounded-full neo-brutal-border overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "78%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Total XP", value: 12450, suffix: "", icon: <Zap size={16} className="text-primary" />, color: "bg-primary/10" },
                        { label: "Courses", value: 4, suffix: " done", icon: <GraduationCap size={16} className="text-secondary" />, color: "bg-secondary/10" },
                        { label: "Challenges", value: 87, suffix: " solved", icon: <Target size={16} className="text-accent-foreground" />, color: "bg-accent/30" },
                        { label: "Global Rank", value: 156, prefix: "#", suffix: "", icon: <Trophy size={16} className="text-primary" />, color: "bg-primary/10" },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className={`${stat.color} p-4 rounded-xl neo-brutal-border`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {stat.icon}
                            <span className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</span>
                          </div>
                          <AnimatedCounter
                            target={stat.value}
                            prefix={stat.prefix || ""}
                            suffix={stat.suffix}
                            duration={2}
                            className="text-2xl font-black"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Recent achievements */}
                    <div>
                      <div className="text-xs font-black uppercase text-muted-foreground mb-3 tracking-wider">Recent Achievements</div>
                      <div className="flex gap-2">
                        {[
                          { emoji: "🔥", name: "7-Day Streak", color: "bg-orange-100 dark:bg-orange-950/30" },
                          { emoji: "⚡", name: "Speed Demon", color: "bg-yellow-100 dark:bg-yellow-950/30" },
                          { emoji: "🎯", name: "Perfect Score", color: "bg-green-100 dark:bg-green-950/30" },
                          { emoji: "🏆", name: "Top 200", color: "bg-blue-100 dark:bg-blue-950/30" },
                        ].map((badge, i) => (
                          <motion.div
                            key={badge.name}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 300 }}
                            whileHover={{ y: -4, scale: 1.1 }}
                            className={`${badge.color} p-2.5 rounded-xl neo-brutal-border flex flex-col items-center gap-1 flex-1 cursor-default`}
                          >
                            <span className="text-lg">{badge.emoji}</span>
                            <span className="text-[9px] font-black uppercase leading-tight text-center">{badge.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty selector preview */}
                    <div className="bg-muted/50 p-4 rounded-xl neo-brutal-border">
                      <div className="text-xs font-black uppercase text-muted-foreground mb-3 tracking-wider">Current Lesson: Variables & Types</div>
                      <div className="flex gap-2">
                        {[
                          { label: "EASY", xp: "1x XP", color: "bg-green-500 text-white", active: false },
                          { label: "MEDIUM", xp: "2x XP", color: "bg-yellow-500 text-white", active: true },
                          { label: "HARD", xp: "3x XP", color: "bg-red-500 text-white", active: false },
                        ].map((tier) => (
                          <motion.div
                            key={tier.label}
                            whileHover={{ y: -2 }}
                            className={`flex-1 p-3 rounded-xl neo-brutal-border text-center cursor-default transition-all ${
                              tier.active
                                ? `${tier.color} neo-brutal-shadow-sm`
                                : "bg-card opacity-60 hover:opacity-100"
                            }`}
                          >
                            <div className="font-black text-xs">{tier.label}</div>
                            <div className={`text-[10px] font-bold ${tier.active ? "opacity-80" : "text-muted-foreground"}`}>{tier.xp}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <MagneticButton>
                <NeoButton size="lg" variant="primary" className="text-xl h-16 px-12 group relative animate-pulse-ring">
                  START YOUR JOURNEY <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                </NeoButton>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        <StudentJourney />
        <Comparison />
        <CommunityHighlights />
        <Testimonials />
        <Leaderboard />
        <MobilePreview />
        <Partners />
        <Subscription />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
      <MobileBottomNav onMorePress={() => setMobileMenuOpen(true)} />
    </div>
  );
}
