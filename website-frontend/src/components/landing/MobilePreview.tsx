"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  Trophy,
  Battery,
  Signal,
  Flame,
  BookOpen,
  Code2,
  Star,
  ChevronRight,
  Play,
  Award,
  Zap,
  TrendingUp,
} from "lucide-react";
import { FloatingShapes } from "@/components/effects";

/* ── Phone screen content (3 screens that auto-cycle) ── */

function ScreenHome() {
  return (
    <div className="p-5 space-y-4">
      {/* Greeting row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Smartphone size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="font-black text-foreground text-sm">Welcome back!</div>
          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Flame size={12} className="text-orange-500" /> Day 12 streak
          </div>
        </div>
      </div>

      {/* XP bar */}
      <div className="space-y-1">
        <div className="bg-muted rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </div>
        <div className="text-[10px] font-bold text-muted-foreground text-right">
          1,240 / 2,000 XP
        </div>
      </div>

      {/* Course cards */}
      {[
        { title: "Python Basics", lesson: 4, progress: 45, color: "bg-blue-500" },
        { title: "JS Functions", lesson: 6, progress: 68, color: "bg-yellow-500" },
      ].map((course, i) => (
        <div
          key={i}
          className="p-3 bg-background rounded-xl border-2 border-foreground/10 flex items-center gap-3"
        >
          <div className={`w-9 h-9 ${course.color} rounded-lg flex items-center justify-center shrink-0`}>
            <Code2 size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-xs text-foreground">{course.title}</div>
            <div className="text-[10px] text-muted-foreground font-medium">
              Lesson {course.lesson}
            </div>
            <div className="mt-1.5 bg-muted rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
              />
            </div>
          </div>
          <ChevronRight size={14} className="text-muted-foreground shrink-0" />
        </div>
      ))}

      {/* Achievement toast */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="p-3 bg-accent/20 rounded-xl flex items-center gap-3 border-2 border-accent/30"
      >
        <Trophy size={18} className="text-accent shrink-0" />
        <div>
          <div className="font-black text-[10px] text-foreground">New Badge!</div>
          <div className="text-[10px] text-muted-foreground">7-Day Streak Master</div>
        </div>
      </motion.div>
    </div>
  );
}

function ScreenLesson() {
  return (
    <div className="p-5 space-y-4">
      {/* Lesson header */}
      <div className="space-y-1">
        <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
          Lesson 4 of 12
        </div>
        <div className="font-black text-foreground text-sm">Variables & Types</div>
        <div className="flex gap-1.5 mt-2">
          {["Easy", "Medium", "Hard"].map((diff, i) => (
            <div
              key={i}
              className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                i === 0
                  ? "bg-green-500/20 text-green-600"
                  : i === 1
                  ? "bg-yellow-500/20 text-yellow-600"
                  : "bg-red-500/20 text-red-600"
              }`}
            >
              {diff} {i === 0 ? "1x" : i === 1 ? "2x" : "3x"}
            </div>
          ))}
        </div>
      </div>

      {/* Code block mockup */}
      <div className="bg-[#1e1e2e] rounded-xl p-3 font-mono text-[10px] space-y-1">
        <div>
          <span className="text-purple-400">name</span>
          <span className="text-white"> = </span>
          <span className="text-green-400">&quot;Aralify&quot;</span>
        </div>
        <div>
          <span className="text-purple-400">level</span>
          <span className="text-white"> = </span>
          <span className="text-orange-400">12</span>
        </div>
        <div>
          <span className="text-blue-400">print</span>
          <span className="text-white">(</span>
          <span className="text-green-400">f&quot;Hello </span>
          <span className="text-white">{"{"}name{"}"}</span>
          <span className="text-green-400">&quot;</span>
          <span className="text-white">)</span>
        </div>
        <div className="pt-2 border-t border-white/10">
          <span className="text-green-300">▶ Hello Aralify</span>
        </div>
      </div>

      {/* Run button */}
      <div className="flex gap-2">
        <div className="flex-1 bg-primary text-white text-[10px] font-black uppercase text-center py-2.5 rounded-lg flex items-center justify-center gap-1.5">
          <Play size={12} fill="white" /> Run Code
        </div>
        <div className="bg-muted text-foreground text-[10px] font-black uppercase text-center py-2.5 px-4 rounded-lg">
          Hint
        </div>
      </div>

      {/* Progress chips */}
      <div className="flex items-center gap-2">
        <Zap size={14} className="text-primary" />
        <div className="text-[10px] font-bold text-muted-foreground">+40 XP on completion</div>
      </div>
    </div>
  );
}

function ScreenStats() {
  return (
    <div className="p-5 space-y-4">
      {/* Stats header */}
      <div className="flex items-center justify-between">
        <div className="font-black text-foreground text-sm">Your Progress</div>
        <div className="text-[10px] font-bold text-muted-foreground">This Week</div>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "XP Earned", value: "4,280", icon: Star, color: "text-yellow-500" },
          { label: "Streak", value: "12 days", icon: Flame, color: "text-orange-500" },
          { label: "Lessons", value: "23", icon: BookOpen, color: "text-blue-500" },
          { label: "Badges", value: "8", icon: Award, color: "text-purple-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-3 bg-background rounded-xl border-2 border-foreground/10 text-center"
          >
            <stat.icon size={18} className={`${stat.color} mx-auto mb-1`} />
            <div className="font-black text-foreground text-sm">{stat.value}</div>
            <div className="text-[9px] text-muted-foreground font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly chart mockup */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={14} className="text-primary" />
          <div className="text-[10px] font-black text-foreground">Daily Activity</div>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-primary/80 rounded-t-sm"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-muted-foreground font-medium">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="flex-1 text-center">{d}</span>
          ))}
        </div>
      </div>

      {/* Leaderboard teaser */}
      <div className="p-2.5 bg-primary/10 rounded-xl flex items-center gap-2">
        <div className="text-lg">🏆</div>
        <div className="flex-1">
          <div className="font-black text-[10px] text-foreground">#4 in Leaderboard</div>
          <div className="text-[9px] text-muted-foreground">120 XP to reach #3</div>
        </div>
        <ChevronRight size={14} className="text-muted-foreground" />
      </div>
    </div>
  );
}

const screens = [
  { id: "home", component: ScreenHome, label: "Home" },
  { id: "lesson", component: ScreenLesson, label: "Lesson" },
  { id: "stats", component: ScreenStats, label: "Stats" },
];

/* ── Screen transition variants ── */
const screenVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
  }),
};

/* ── Main component ── */
export function MobilePreview() {
  const [[activeScreen, direction], setActiveScreen] = useState([0, 0]);

  // Auto-cycle screens
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScreen(([prev]) => [(prev + 1) % screens.length, 1]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const ActiveComponent = screens[activeScreen].component;

  return (
    <section className="py-32 surface-inverted overflow-hidden relative noise-overlay">
      <FloatingShapes
        shapes={[
          { type: "ring", size: 70, x: "5%", y: "10%", color: "border-white", delay: 0, duration: 14 },
          { type: "circle", size: 25, x: "92%", y: "20%", color: "bg-white", delay: 1, duration: 10 },
          { type: "diamond", size: 30, x: "88%", y: "80%", color: "bg-white", delay: 2, duration: 11 },
          { type: "cross", size: 20, x: "8%", y: "75%", color: "bg-white", delay: 1.5, duration: 9 },
          { type: "square", size: 18, x: "50%", y: "5%", color: "bg-white", delay: 3, duration: 8, rotate: 45 },
        ]}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary px-5 py-2 neo-brutal-border-white rounded-full text-white font-black text-sm uppercase tracking-widest">
              COMING SOON
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              LEARN ON <br />THE GO
            </h2>

            <p className="text-xl font-medium opacity-60 max-w-md leading-relaxed">
              Native iOS & Android apps with offline mode. Download lessons, code on the train, sync when you&apos;re back online.
            </p>

            <div className="space-y-4">
              {[
                { icon: <WifiOff size={20} />, title: "Offline Mode", desc: "Download lessons and code without internet" },
                { icon: <Bell size={20} />, title: "Streak Reminders", desc: "Push notifications to keep your streak alive" },
                { icon: <Trophy size={20} />, title: "Full Gamification", desc: "XP, badges, and leaderboards on mobile" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-background/10 rounded-xl"
                >
                  <div className="p-2 bg-primary text-white rounded-lg shrink-0">{feature.icon}</div>
                  <div>
                    <div className="font-black text-base">{feature.title}</div>
                    <div className="text-sm font-medium opacity-60">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <div className="px-6 py-3 neo-brutal-border-white bg-background/10 rounded-xl font-black text-sm uppercase tracking-wider opacity-60 cursor-not-allowed">
                App Store - Soon
              </div>
              <div className="px-6 py-3 neo-brutal-border-white bg-background/10 rounded-xl font-black text-sm uppercase tracking-wider opacity-60 cursor-not-allowed">
                Google Play - Soon
              </div>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glow effect behind phone */}
              <div className="absolute -inset-8 bg-primary/20 rounded-[4rem] blur-3xl" />

              {/* Phone frame — realistic iPhone-style */}
              <div className="relative w-[280px] h-[580px] bg-[#1a1a1a] rounded-[3rem] shadow-2xl ring-1 ring-white/10">
                {/* Side buttons */}
                <div className="absolute -left-[3px] top-28 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute -left-[3px] top-44 w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute -left-[3px] top-60 w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-[#2a2a2a] rounded-r-sm" />

                {/* Inner bezel */}
                <div className="absolute inset-[4px] rounded-[2.7rem] bg-black overflow-hidden">
                  {/* Screen content */}
                  <div className="w-full h-full bg-card rounded-[2.7rem] overflow-hidden relative">
                    {/* Dynamic Island */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[28px] bg-black rounded-full flex items-center justify-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a2e] ring-1 ring-[#2a2a3e]" />
                    </div>

                    {/* Status bar */}
                    <div className="h-14 bg-primary flex items-end justify-between px-7 pb-1.5">
                      <span className="text-white font-mono text-[10px] font-bold">9:41</span>
                      <div className="flex items-center gap-1">
                        <Signal size={11} className="text-white" />
                        <Wifi size={11} className="text-white" />
                        <Battery size={11} className="text-white" />
                      </div>
                    </div>

                    {/* Swappable screen content */}
                    <div className="relative h-[calc(100%-3.5rem-3.5rem)] overflow-hidden">
                      <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                          key={activeScreen}
                          custom={direction}
                          variants={screenVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="absolute inset-0 overflow-y-auto"
                        >
                          <ActiveComponent />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Bottom nav bar */}
                    <div className="absolute bottom-0 inset-x-0 h-14 bg-card border-t-2 border-foreground/5 flex items-center justify-around px-4">
                      {screens.map((screen, i) => {
                        const icons = [Smartphone, BookOpen, TrendingUp];
                        const Icon = icons[i];
                        const isActive = i === activeScreen;
                        return (
                          <button
                            key={screen.id}
                            onClick={() =>
                              setActiveScreen(([prev]) => [i, i > prev ? 1 : -1])
                            }
                            className={`flex flex-col items-center gap-0.5 transition-colors ${
                              isActive ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <Icon size={18} />
                            <span className="text-[8px] font-bold">{screen.label}</span>
                            {isActive && (
                              <motion.div
                                layoutId="nav-dot"
                                className="w-1 h-1 bg-primary rounded-full"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Home indicator bar */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-foreground/20 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Screen indicator dots */}
              <div className="flex justify-center gap-2 mt-6">
                {screens.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-2 rounded-full bg-white"
                    animate={{
                      width: i === activeScreen ? 24 : 8,
                      opacity: i === activeScreen ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
