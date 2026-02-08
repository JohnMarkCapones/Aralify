"use client";

import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Award, Lock, Star, Flame, Zap, Target, Trophy, Code2, BookOpen, Users, Clock, Shield, Sparkles } from "lucide-react";

const badgeCategories = [
  {
    name: "Learning",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    badges: [
      { name: "First Steps", emoji: "👶", desc: "Complete your first lesson", earned: true, xp: 50 },
      { name: "Quick Learner", emoji: "📚", desc: "Complete 5 lessons in one day", earned: true, xp: 100 },
      { name: "Course Finisher", emoji: "🎓", desc: "Complete an entire course", earned: true, xp: 500 },
      { name: "Polyglot", emoji: "🌐", desc: "Complete courses in 3 different languages", earned: false, xp: 750 },
      { name: "Knowledge Seeker", emoji: "🧠", desc: "Complete 50 lessons total", earned: false, xp: 1000 },
      { name: "Master Scholar", emoji: "🏛️", desc: "Complete all available courses", earned: false, xp: 5000 },
    ],
  },
  {
    name: "Streaks",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
    badges: [
      { name: "3-Day Streak", emoji: "🔥", desc: "Maintain a 3-day learning streak", earned: true, xp: 50 },
      { name: "7-Day Streak", emoji: "🔥", desc: "Maintain a 7-day learning streak", earned: true, xp: 150 },
      { name: "30-Day Streak", emoji: "💪", desc: "Maintain a 30-day learning streak", earned: false, xp: 500 },
      { name: "100-Day Legend", emoji: "⚡", desc: "Maintain a 100-day learning streak", earned: false, xp: 2000 },
      { name: "365 Unstoppable", emoji: "👑", desc: "A full year without missing a day", earned: false, xp: 10000 },
    ],
  },
  {
    name: "Challenges",
    color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    badges: [
      { name: "Challenger", emoji: "⚔️", desc: "Complete your first daily challenge", earned: true, xp: 100 },
      { name: "Speed Demon", emoji: "🚀", desc: "Solve a challenge in under 2 minutes", earned: true, xp: 200 },
      { name: "Perfect Score", emoji: "🎯", desc: "Get 100% on a Hard difficulty challenge", earned: false, xp: 500 },
      { name: "Challenge King", emoji: "👑", desc: "Complete 50 daily challenges", earned: false, xp: 1500 },
      { name: "Unbeatable", emoji: "🏆", desc: "Win 10 weekly challenges in a row", earned: false, xp: 3000 },
    ],
  },
  {
    name: "Social",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    badges: [
      { name: "Community Member", emoji: "🤝", desc: "Join the Aralify community", earned: true, xp: 25 },
      { name: "Helpful Hand", emoji: "🙌", desc: "Get 10 upvotes on a discussion reply", earned: false, xp: 200 },
      { name: "Mentor", emoji: "🧑‍🏫", desc: "Help 25 learners in discussions", earned: false, xp: 500 },
      { name: "Influencer", emoji: "📢", desc: "Get 100 followers", earned: false, xp: 750 },
      { name: "Community Hero", emoji: "🦸", desc: "Top contributor for a month", earned: false, xp: 2000 },
    ],
  },
  {
    name: "Difficulty",
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
    badges: [
      { name: "Easy Rider", emoji: "🟢", desc: "Complete 10 Easy-tier lessons", earned: true, xp: 100 },
      { name: "Stepping Up", emoji: "🟡", desc: "Complete 10 Medium-tier lessons", earned: false, xp: 300 },
      { name: "Hard Mode", emoji: "🔴", desc: "Complete 10 Hard-tier lessons", earned: false, xp: 750 },
      { name: "XP Maximizer", emoji: "💎", desc: "Earn 10,000 XP from Hard-tier alone", earned: false, xp: 2000 },
      { name: "The Elite", emoji: "🏅", desc: "Complete every lesson on Hard", earned: false, xp: 10000 },
    ],
  },
];

const stats = [
  { label: "Badges Earned", value: "7 / 26", icon: <Award size={20} /> },
  { label: "Total Badge XP", value: "1,175", icon: <Zap size={20} /> },
  { label: "Rarest Badge", value: "Speed Demon", icon: <Sparkles size={20} /> },
  { label: "Next Badge", value: "30-Day Streak", icon: <Target size={20} /> },
];

export default function BadgesPage() {
  const totalBadges = badgeCategories.reduce((a, c) => a + c.badges.length, 0);
  const earnedBadges = badgeCategories.reduce((a, c) => a + c.badges.filter((b) => b.earned).length, 0);

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Award size={14} /> Achievement System
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">BADGES</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Earn badges by completing milestones, maintaining streaks, and conquering challenges. Collect them all to prove your skills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 bg-background neo-brutal-border rounded-xl"
              >
                <div className="p-2 bg-primary/10 text-primary rounded-lg">{stat.icon}</div>
                <div>
                  <div className="font-black text-lg">{stat.value}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-muted-foreground">Collection Progress</span>
              <span className="text-sm font-black text-primary">{earnedBadges} / {totalBadges}</span>
            </div>
            <div className="h-4 bg-muted neo-brutal-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(earnedBadges / totalBadges) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Badge Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-16">
          {badgeCategories.map((category, ci) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 font-black text-sm uppercase rounded-full neo-brutal-border ${category.color}`}>
                  {category.name}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  {category.badges.filter((b) => b.earned).length} / {category.badges.length} earned
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.badges.map((badge, bi) => (
                  <motion.div
                    key={bi}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: bi * 0.06 }}
                    whileHover={badge.earned ? { y: -4 } : undefined}
                    className={`p-5 neo-brutal-border rounded-xl transition-shadow ${
                      badge.earned
                        ? "bg-card neo-brutal-shadow-sm hover:neo-brutal-shadow"
                        : "bg-muted/30 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{badge.emoji}</span>
                      {badge.earned ? (
                        <span className="text-xs font-black text-green-600 dark:text-green-400 flex items-center gap-1 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full">
                          <Star size={10} className="fill-current" /> Earned
                        </span>
                      ) : (
                        <Lock size={16} className="text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-black text-base">{badge.name}</h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">{badge.desc}</p>
                    <div className="mt-3 pt-3 border-t border-border flex items-center gap-1 text-xs font-black text-primary">
                      <Zap size={10} /> +{badge.xp} XP
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
