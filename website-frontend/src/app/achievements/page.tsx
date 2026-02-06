"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { GridPattern, AnimatedCounter } from "@/components/effects";
import { Lock, Trophy } from "lucide-react";

type Category = "all" | "learning" | "streaks" | "social" | "mastery";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "learning", label: "Learning" },
  { key: "streaks", label: "Streaks" },
  { key: "social", label: "Social" },
  { key: "mastery", label: "Mastery" },
];

interface Achievement {
  id: number;
  emoji: string;
  title: string;
  description: string;
  xp: number;
  category: "learning" | "streaks" | "social" | "mastery";
  unlocked: boolean;
  earnedDate?: string;
}

const achievements: Achievement[] = [
  // Learning
  { id: 1, emoji: "\uD83D\uDE80", title: "First Launch", description: "Complete your very first lesson", xp: 50, category: "learning", unlocked: true, earnedDate: "Jan 5, 2026" },
  { id: 2, emoji: "\uD83D\uDCDA", title: "Bookworm", description: "Complete 10 lessons in any course", xp: 200, category: "learning", unlocked: true, earnedDate: "Jan 12, 2026" },
  { id: 3, emoji: "\uD83C\uDF93", title: "Graduate", description: "Complete an entire course", xp: 500, category: "learning", unlocked: true, earnedDate: "Jan 28, 2026" },
  { id: 4, emoji: "\uD83E\uDDE0", title: "Polyglot", description: "Complete lessons in 3 different languages", xp: 300, category: "learning", unlocked: true, earnedDate: "Feb 2, 2026" },
  { id: 5, emoji: "\uD83D\uDCA1", title: "Quick Learner", description: "Complete 5 lessons in a single day", xp: 150, category: "learning", unlocked: false },

  // Streaks
  { id: 6, emoji: "\uD83D\uDD25", title: "On Fire", description: "Maintain a 7-day streak", xp: 100, category: "streaks", unlocked: true, earnedDate: "Jan 15, 2026" },
  { id: 7, emoji: "\u26A1", title: "Unstoppable", description: "Maintain a 30-day streak", xp: 500, category: "streaks", unlocked: false },
  { id: 8, emoji: "\uD83C\uDF1F", title: "Streak Master", description: "Maintain a 100-day streak", xp: 1500, category: "streaks", unlocked: false },
  { id: 9, emoji: "\uD83C\uDF05", title: "Early Bird", description: "Complete a lesson before 7 AM, 5 days in a row", xp: 200, category: "streaks", unlocked: true, earnedDate: "Jan 20, 2026" },
  { id: 10, emoji: "\uD83C\uDF19", title: "Night Owl", description: "Complete a lesson after midnight, 5 days in a row", xp: 200, category: "streaks", unlocked: false },

  // Social
  { id: 11, emoji: "\uD83E\uDD1D", title: "Social Butterfly", description: "Follow 10 other learners", xp: 100, category: "social", unlocked: true, earnedDate: "Jan 22, 2026" },
  { id: 12, emoji: "\uD83D\uDCAC", title: "Commenter", description: "Leave 20 comments on lessons", xp: 150, category: "social", unlocked: true, earnedDate: "Feb 1, 2026" },
  { id: 13, emoji: "\u2B50", title: "Fan Favorite", description: "Receive 50 likes on your comments", xp: 300, category: "social", unlocked: false },
  { id: 14, emoji: "\uD83C\uDFC6", title: "Leaderboard Regular", description: "Appear in the top 50 weekly leaderboard", xp: 250, category: "social", unlocked: true, earnedDate: "Feb 3, 2026" },
  { id: 15, emoji: "\uD83D\uDC51", title: "Top 10", description: "Reach the top 10 on any leaderboard", xp: 1000, category: "social", unlocked: false },

  // Mastery
  { id: 16, emoji: "\uD83C\uDFAF", title: "Perfect Score", description: "Get 100% on a quiz without hints", xp: 200, category: "mastery", unlocked: true, earnedDate: "Jan 18, 2026" },
  { id: 17, emoji: "\uD83D\uDCAA", title: "Hard Mode Hero", description: "Complete 10 lessons on Hard difficulty", xp: 500, category: "mastery", unlocked: true, earnedDate: "Feb 4, 2026" },
  { id: 18, emoji: "\uD83E\uDDD9", title: "Code Wizard", description: "Solve 50 code challenges", xp: 750, category: "mastery", unlocked: false },
  { id: 19, emoji: "\uD83D\uDC8E", title: "Diamond Hands", description: "Earn 10,000 total XP", xp: 1000, category: "mastery", unlocked: true, earnedDate: "Feb 5, 2026" },
  { id: 20, emoji: "\uD83C\uDF0D", title: "World Class", description: "Complete all courses on Hard difficulty", xp: 5000, category: "mastery", unlocked: false },
];

const unlockedCount = achievements.filter((a) => a.unlocked).length;
const totalCount = achievements.length;

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

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
