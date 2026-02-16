"use client";

import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Award, Lock, Star, Flame, Zap, Target, Trophy, Code2, BookOpen, Users, Clock, Shield, Sparkles, Loader2 } from "lucide-react";
import { useBadges } from "@/hooks/api";

const CATEGORY_COLORS: Record<string, string> = {
  learning: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  streaks: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
  challenges: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
  social: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
  difficulty: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
};

export default function BadgesPage() {
  const { data: apiBadges, isLoading } = useBadges();

  const allBadges = apiBadges ?? [];
  const totalBadges = allBadges.length;
  const earnedBadges = allBadges.filter((b) => b.earned).length;

  // Group by category
  const categoryMap = new Map<string, typeof allBadges>();
  allBadges.forEach((b) => {
    const cat = b.category || "other";
    if (!categoryMap.has(cat)) categoryMap.set(cat, []);
    categoryMap.get(cat)!.push(b);
  });

  const badgeCategories = Array.from(categoryMap.entries()).map(([name, badges]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    color: CATEGORY_COLORS[name] || "bg-gray-100 text-gray-600 dark:bg-gray-900/40 dark:text-gray-400",
    badges: badges.map((b) => ({
      name: b.name,
      emoji: b.icon,
      desc: b.description,
      earned: b.earned,
      xp: 0, // Badge XP not in API type, could be extended
    })),
  }));

  const stats = [
    { label: "Badges Earned", value: `${earnedBadges} / ${totalBadges}`, icon: <Award size={20} /> },
    { label: "Total Badge XP", value: "—", icon: <Zap size={20} /> },
    { label: "Rarest Badge", value: allBadges.filter((b) => b.earned && b.rarity === "legendary")[0]?.name || allBadges.filter((b) => b.earned && b.rarity === "epic")[0]?.name || "—", icon: <Sparkles size={20} /> },
    { label: "Next Badge", value: allBadges.find((b) => !b.earned)?.name || "All earned!", icon: <Target size={20} /> },
  ];

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
