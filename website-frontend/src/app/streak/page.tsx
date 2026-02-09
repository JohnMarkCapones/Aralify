"use client";

import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Flame, Zap, Calendar, Shield, Trophy, Star, Target, Clock, Snowflake, ArrowRight, TrendingUp } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";

// Generate a mock heatmap for the last 12 weeks
function generateHeatmap() {
  const weeks: { day: number; intensity: number }[][] = [];
  for (let w = 0; w < 16; w++) {
    const week: { day: number; intensity: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const isRecent = w > 12;
      const rand = Math.random();
      week.push({
        day: d,
        intensity: isRecent
          ? rand > 0.1 ? (rand > 0.5 ? 3 : 2) : 0
          : rand > 0.3 ? (rand > 0.7 ? 3 : rand > 0.5 ? 2 : 1) : 0,
      });
    }
    weeks.push(week);
  }
  return weeks;
}

const heatmap = generateHeatmap();
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const streakStats = [
  { label: "Current Streak", value: "12 days", icon: <Flame size={24} />, color: "text-orange-500" },
  { label: "Longest Streak", value: "45 days", icon: <Trophy size={24} />, color: "text-accent" },
  { label: "Total Active Days", value: "156", icon: <Calendar size={24} />, color: "text-primary" },
  { label: "Freeze Tokens", value: "2 left", icon: <Snowflake size={24} />, color: "text-secondary" },
];

const milestones = [
  { days: 3, reward: "50 XP", achieved: true },
  { days: 7, reward: "150 XP + Badge", achieved: true },
  { days: 14, reward: "300 XP", achieved: false },
  { days: 30, reward: "500 XP + Badge", achieved: false },
  { days: 60, reward: "1,000 XP", achieved: false },
  { days: 100, reward: "2,000 XP + Badge", achieved: false },
  { days: 365, reward: "10,000 XP + Legendary Badge", achieved: false },
];

const weeklyActivity = [
  { day: "Mon", lessons: 3, xp: 350 },
  { day: "Tue", lessons: 2, xp: 200 },
  { day: "Wed", lessons: 4, xp: 500 },
  { day: "Thu", lessons: 1, xp: 100 },
  { day: "Fri", lessons: 3, xp: 450 },
  { day: "Sat", lessons: 5, xp: 600 },
  { day: "Sun", lessons: 2, xp: 250 },
];

const intensityColors = [
  "bg-muted/50",
  "bg-green-200 dark:bg-green-900/40",
  "bg-green-400 dark:bg-green-700",
  "bg-green-600 dark:bg-green-500",
];

export default function StreakPage() {
  const maxXp = Math.max(...weeklyActivity.map((d) => d.xp));

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Flame size={14} /> Streak Tracker
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">YOUR STREAK</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Consistency beats intensity. Track your daily learning streak, earn milestone rewards, and never break the chain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {streakStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-background neo-brutal-border neo-brutal-shadow-sm rounded-xl text-center"
              >
                <div className={`mx-auto mb-2 ${stat.color}`}>{stat.icon}</div>
                <div className="font-black text-2xl">{stat.value}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="lg:col-span-2 space-y-12">
              {/* Heatmap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">ACTIVITY HEATMAP</h2>
                <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 overflow-x-auto">
                  <div className="flex gap-1 min-w-[600px]">
                    {/* Day labels */}
                    <div className="flex flex-col gap-1 mr-2">
                      {dayLabels.map((d) => (
                        <div key={d} className="h-4 flex items-center text-[10px] font-bold text-muted-foreground">{d}</div>
                      ))}
                    </div>
                    {/* Weeks */}
                    {heatmap.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1">
                        {week.map((cell, di) => (
                          <motion.div
                            key={di}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: (wi * 7 + di) * 0.005 }}
                            className={`w-4 h-4 rounded-sm neo-brutal-border ${intensityColors[cell.intensity]}`}
                            title={`Intensity: ${cell.intensity}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4 justify-end">
                    <span className="text-[10px] font-bold text-muted-foreground">Less</span>
                    {intensityColors.map((c, i) => (
                      <div key={i} className={`w-3 h-3 rounded-sm ${c} neo-brutal-border`} />
                    ))}
                    <span className="text-[10px] font-bold text-muted-foreground">More</span>
                  </div>
                </div>
              </motion.div>

              {/* Weekly XP Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">THIS WEEK</h2>
                <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
                  <div className="flex items-end gap-3 h-48">
                    {weeklyActivity.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-black text-primary">{day.xp}</span>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(day.xp / maxXp) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg neo-brutal-border min-h-[8px]"
                        />
                        <span className="text-xs font-bold text-muted-foreground">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-border">
                    <span className="text-sm font-bold text-muted-foreground">Total: <span className="font-black text-foreground">2,450 XP</span></span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                      <TrendingUp size={14} /> +18% vs last week
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Current Streak Card */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-6 text-white text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-5xl mb-2"
                >
                  🔥
                </motion.div>
                <div className="text-5xl font-black">12</div>
                <div className="font-black uppercase text-sm tracking-widest opacity-80">Day Streak</div>
                <div className="mt-4 text-sm font-bold opacity-70">
                  Next milestone: <span className="text-white font-black">14 days</span>
                </div>
                <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-[85%]" />
                </div>
              </div>

              {/* Freeze Tokens */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
                <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Snowflake size={16} className="text-secondary" /> Streak Freezes
                </h3>
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  Use a freeze to protect your streak on days you can&apos;t practice. You have <span className="font-black text-foreground">2 tokens</span> remaining.
                </p>
                <div className="flex gap-2 mb-4">
                  {[1, 2].map((t) => (
                    <div key={t} className="w-12 h-12 bg-secondary/10 neo-brutal-border rounded-xl flex items-center justify-center">
                      <Snowflake size={20} className="text-secondary" />
                    </div>
                  ))}
                  <div className="w-12 h-12 bg-muted/30 neo-brutal-border rounded-xl flex items-center justify-center opacity-30">
                    <Snowflake size={20} className="text-muted-foreground" />
                  </div>
                </div>
                <NeoButton variant="outline" size="sm" className="w-full">
                  Earn More Tokens
                </NeoButton>
              </div>

              {/* Milestones */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
                <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Target size={16} className="text-primary" /> Streak Milestones
                </h3>
                <div className="space-y-3">
                  {milestones.map((m, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        m.achieved ? "bg-green-100/50 dark:bg-green-900/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {m.achieved ? (
                          <Star size={14} className="text-accent fill-accent" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground" />
                        )}
                        <span className={`text-sm font-bold ${m.achieved ? "text-foreground" : "text-muted-foreground"}`}>
                          {m.days} days
                        </span>
                      </div>
                      <span className="text-xs font-black text-primary">{m.reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
