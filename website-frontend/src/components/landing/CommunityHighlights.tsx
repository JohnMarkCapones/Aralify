"use client";

import { motion } from "framer-motion";
import { Users, Flame, Trophy, Zap, Star, MessageSquare, Code2, BookOpen } from "lucide-react";
import { GradientOrbs, FloatingShapes } from "@/components/effects";

const recentActivity = [
  { user: "Maria Santos", action: "earned", target: "7-Day Streak 🔥", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", time: "just now" },
  { user: "Carlo Reyes", action: "completed", target: "Python Basics", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlo", time: "2 min ago" },
  { user: "Ana Cruz", action: "solved", target: "Daily Challenge", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", time: "5 min ago" },
  { user: "Jem Villanueva", action: "ranked", target: "#1 this week", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jem", time: "12 min ago" },
  { user: "Sofia Garcia", action: "earned", target: "Speed Demon badge", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", time: "18 min ago" },
];

const communityStats = [
  { value: "2,500+", label: "Active Learners", icon: <Users size={22} /> },
  { value: "45,000+", label: "Challenges Solved", icon: <Code2 size={22} /> },
  { value: "8,300+", label: "Badges Earned", icon: <Trophy size={22} /> },
  { value: "156", label: "Avg. Daily Streak", icon: <Flame size={22} /> },
];

const badgeShowcase = [
  { emoji: "🔥", name: "Streak Master", count: 342 },
  { emoji: "⚡", name: "Speed Demon", count: 189 },
  { emoji: "🎯", name: "Perfect Score", count: 567 },
  { emoji: "🏆", name: "Top 10", count: 45 },
  { emoji: "🎓", name: "Course Complete", count: 890 },
  { emoji: "💎", name: "Hard Mode Hero", count: 123 },
];

export function CommunityHighlights() {
  return (
    <section className="py-32 bg-card overflow-hidden relative">
      <GradientOrbs orbs={[
        { color: "bg-secondary/10", size: 300, x: "5%", y: "20%", delay: 0, duration: 18 },
        { color: "bg-primary/10", size: 200, x: "80%", y: "70%", delay: 2, duration: 14 },
      ]} />
      <FloatingShapes shapes={[
        { type: "circle", size: 20, x: "92%", y: "10%", color: "bg-accent", delay: 0, duration: 10 },
        { type: "square", size: 16, x: "5%", y: "80%", color: "bg-primary", delay: 1, duration: 12, rotate: 45 },
      ]} />
      <div className="container mx-auto px-4 relative z-10">
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
            className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2 neo-brutal-border neo-brutal-shadow-sm rotate-[1deg] mb-6"
          >
            <Users size={16} />
            <span className="font-display font-black text-sm uppercase tracking-widest">Community Pulse</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            LEARNING<br /><span className="text-secondary">TOGETHER</span>
          </h2>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
            See what&apos;s happening right now in the Aralify community. Real learners, real progress, real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Live Activity Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-black text-sm uppercase tracking-widest">Live Activity</span>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 bg-background neo-brutal-border neo-brutal-shadow-sm rounded-xl transition-shadow hover:neo-brutal-shadow group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full neo-brutal-border shrink-0 group-hover:scale-110 transition-transform" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <span className="font-black text-sm">{item.user}</span>{" "}
                    <span className="text-sm font-medium text-muted-foreground">{item.action}</span>{" "}
                    <span className="font-bold text-sm text-primary">{item.target}</span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground shrink-0">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Stats + Badges */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-background neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-6 space-y-4">
              <h3 className="font-black text-sm uppercase tracking-widest">Community Stats</h3>
              {communityStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">{stat.icon}</div>
                  <div>
                    <div className="font-black text-lg">{stat.value}</div>
                    <div className="text-xs font-bold text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Popular Badges */}
            <div className="bg-background neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
              <h3 className="font-black text-sm uppercase tracking-widest mb-4">Popular Badges</h3>
              <div className="grid grid-cols-3 gap-2">
                {badgeShowcase.map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 300 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="p-3 bg-card neo-brutal-border rounded-xl text-center cursor-default"
                  >
                    <span className="text-2xl block">{badge.emoji}</span>
                    <span className="text-[9px] font-black uppercase leading-tight block mt-1">{badge.name}</span>
                    <span className="text-[9px] font-bold text-muted-foreground">{badge.count} earned</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
