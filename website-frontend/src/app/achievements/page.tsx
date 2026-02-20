"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { GridPattern, AnimatedCounter } from "@/components/effects";
import { Lock, Trophy, Loader2 } from "lucide-react";
import { useAchievements } from "@/hooks/api";

type Category = "all" | string;

const categories: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "learning", label: "Learning" },
  { key: "streaks", label: "Streaks" },
  { key: "social", label: "Social" },
  { key: "mastery", label: "Mastery" },
];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { data: apiAchievements, isLoading } = useAchievements();

  const achievements = (apiAchievements ?? []).map((a) => ({
    id: a.id,
    emoji: a.icon,
    title: a.name,
    description: a.description,
    xp: a.xpReward,
    category: a.category,
    unlocked: a.unlocked,
    earnedDate: a.unlockedAt
      ? new Date(a.unlockedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : undefined,
  }));

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const filtered =
    activeCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  if (isLoading) {
    return (
      <PageShell>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border relative overflow-hidden">
        <GridPattern />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-4">
              ACHIEVEMENTS
            </h1>
            <p className="text-lg font-medium text-muted-foreground max-w-xl mx-auto mb-8">
              Unlock badges, earn XP rewards, and prove your coding mastery.
            </p>
            <div className="inline-flex items-center gap-3 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl px-8 py-4">
              <Trophy size={28} className="text-primary" />
              <div className="flex items-baseline gap-2">
                <AnimatedCounter
                  target={unlockedCount}
                  duration={1.5}
                  className="text-4xl font-display font-black text-primary"
                />
                <span className="text-2xl font-display font-black text-muted-foreground">
                  / {totalCount} Unlocked
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b-4 border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 font-display font-black uppercase tracking-wider text-sm neo-brutal-border rounded-full transition-all ${
                  activeCategory === cat.key
                    ? "bg-primary text-white neo-brutal-shadow"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {filtered.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={achievement.unlocked ? { y: -6, scale: 1.02 } : {}}
                className={`relative p-5 neo-brutal-border rounded-2xl text-center transition-all ${
                  achievement.unlocked
                    ? "bg-card neo-brutal-shadow cursor-default"
                    : "bg-muted/30 opacity-50 grayscale cursor-not-allowed"
                }`}
              >
                {/* Lock Overlay */}
                {!achievement.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl">
                    <div className="bg-foreground/80 p-2 rounded-full">
                      <Lock size={20} className="text-background" />
                    </div>
                  </div>
                )}

                {/* Emoji Icon */}
                <div className="text-4xl mb-3">{achievement.emoji}</div>

                {/* Title */}
                <h3 className="font-black text-sm uppercase leading-tight mb-1">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-xs font-medium text-muted-foreground leading-snug mb-3">
                  {achievement.description}
                </p>

                {/* XP Reward */}
                <div className="inline-block bg-primary/10 text-primary text-xs font-black px-2.5 py-1 rounded-full neo-brutal-border">
                  +{achievement.xp} XP
                </div>

                {/* Earned Date */}
                {achievement.unlocked && achievement.earnedDate && (
                  <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wider">
                    Earned {achievement.earnedDate}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overall Progress Bar */}
      <section className="py-12 bg-card border-t-4 border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-3">
              <span className="font-display font-black uppercase tracking-wider text-sm">
                Overall Progress
              </span>
              <span className="font-mono font-bold text-primary">
                {unlockedCount}/{totalCount} ({Math.round((unlockedCount / totalCount) * 100)}%)
              </span>
            </div>
            <div className="h-6 bg-muted rounded-full neo-brutal-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer" />
              </motion.div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-3 text-center">
              {totalCount - unlockedCount} more achievements to unlock. Keep pushing!
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
