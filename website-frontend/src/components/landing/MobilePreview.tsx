"use client";

import { motion } from "framer-motion";
import { Smartphone, Wifi, WifiOff, Bell, Trophy } from "lucide-react";
import { FloatingShapes } from "@/components/effects";

export function MobilePreview() {
  return (
    <section className="py-32 bg-foreground text-background overflow-hidden relative noise-overlay">
      <FloatingShapes shapes={[
        { type: "ring", size: 70, x: "5%", y: "10%", color: "border-white", delay: 0, duration: 14 },
        { type: "circle", size: 25, x: "92%", y: "20%", color: "bg-white", delay: 1, duration: 10 },
        { type: "diamond", size: 30, x: "88%", y: "80%", color: "bg-white", delay: 2, duration: 11 },
        { type: "cross", size: 20, x: "8%", y: "75%", color: "bg-white", delay: 1.5, duration: 9 },
        { type: "square", size: 18, x: "50%", y: "5%", color: "bg-white", delay: 3, duration: 8, rotate: 45 },
      ]} />
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
              {/* Phone frame */}
              <div className="w-72 h-[580px] bg-background rounded-[3rem] neo-brutal-border-white p-3 relative">
                {/* Screen */}
                <div className="w-full h-full bg-card rounded-[2.4rem] overflow-hidden relative">
                  {/* Status bar */}
                  <div className="h-12 bg-primary flex items-center justify-between px-6">
                    <span className="text-white font-mono text-xs">9:41</span>
                    <Wifi size={14} className="text-white" />
                  </div>

                  {/* App content mockup */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Smartphone size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="font-black text-foreground text-sm">Welcome back!</div>
                        <div className="text-xs text-muted-foreground font-medium">Day 12 streak</div>
                      </div>
                    </div>

                    {/* XP bar */}
                    <div className="bg-muted rounded-full h-3 neo-brutal-border overflow-hidden">
                      <div className="bg-primary h-full w-[65%] rounded-full" />
                    </div>
                    <div className="text-xs font-bold text-muted-foreground text-right">1,240 / 2,000 XP</div>

                    {/* Course cards */}
                    {["Python Basics", "JS Functions"].map((title, i) => (
                      <div key={i} className="p-4 bg-background neo-brutal-border rounded-xl">
                        <div className="font-black text-sm text-foreground">{title}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-1">Continue lesson {i + 4}</div>
                        <div className="mt-2 bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-secondary h-full rounded-full" style={{ width: `${45 + i * 20}%` }} />
                        </div>
                      </div>
                    ))}

                    {/* Achievement */}
                    <div className="p-3 bg-accent/20 neo-brutal-border rounded-xl flex items-center gap-3">
                      <Trophy size={20} className="text-accent shrink-0" />
                      <div>
                        <div className="font-black text-xs text-foreground">New Badge!</div>
                        <div className="text-xs text-muted-foreground">7-Day Streak Master</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
