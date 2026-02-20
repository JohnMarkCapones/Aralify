"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Lock, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { useAchievements } from "@/hooks/api";
import type { AchievementItem } from "@/lib/api";

type Category = "all" | string;

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "learning", label: "Learning" },
  { value: "mastery", label: "Mastery" },
  { value: "streak", label: "Streak" },
  { value: "social", label: "Social" },
  { value: "special", label: "Special" },
];

const RARITY_COLORS: Record<string, string> = {
  common: "border-zinc-300 dark:border-zinc-600",
  rare: "border-blue-400 dark:border-blue-500",
  epic: "border-purple-400 dark:border-purple-500",
  legendary: "border-amber-400 dark:border-amber-500",
};

const RARITY_BG: Record<string, string> = {
  common: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  rare: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  epic: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
  legendary: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
};

const RARITY_GLOW: Record<string, string> = {
  common: "shadow-[0_0_20px_rgba(161,161,170,0.3)]",
  rare: "shadow-[0_0_20px_rgba(96,165,250,0.4)]",
  epic: "shadow-[0_0_20px_rgba(192,132,252,0.4)]",
  legendary: "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function AchievementsPage() {
  const [category, setCategory] = useState<Category>("all");
  const { data: achievements, isLoading } = useAchievements();

  const allAchievements = achievements ?? [];

  const filtered = category === "all"
    ? allAchievements
    : allAchievements.filter((a) => a.category === category);

  const unlockedCount = allAchievements.filter((a) => a.unlocked).length;

  // Next achievement to unlock
  const nextAchievement = allAchievements
    .filter((a) => !a.unlocked && a.maxProgress > 0)
    .sort((a, b) => (b.progress / b.maxProgress) - (a.progress / a.maxProgress))[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Achievements"
        description={`${unlockedCount} of ${allAchievements.length} unlocked`}
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  category === c.value ? "bg-background card-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        }
      />

      {/* Next Achievement */}
      {nextAchievement && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-5"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <ChevronRight size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">Next Achievement</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{nextAchievement.icon}</span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{nextAchievement.name}</h3>
              <p className="text-xs text-muted-foreground">{nextAchievement.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-xs">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(nextAchievement.progress / nextAchievement.maxProgress) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {nextAchievement.progress}/{nextAchievement.maxProgress}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-primary">+{nextAchievement.xpReward} XP</span>
          </div>
        </motion.div>
      )}

      {/* Achievements Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div
              className={cn(
                "bg-background rounded-xl border-2 p-4 shadow-sm transition-all",
                achievement.unlocked
                  ? cn(RARITY_COLORS[achievement.rarity], RARITY_GLOW[achievement.rarity])
                  : "border-border/30 opacity-60 grayscale hover:grayscale-0 hover:opacity-80 transition-all"
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn("text-2xl", !achievement.unlocked && "grayscale")}>
                  {achievement.unlocked ? achievement.icon : <Lock size={24} className="text-muted-foreground" />}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold truncate">{achievement.name}</h3>
                    <span className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize shrink-0", RARITY_BG[achievement.rarity])}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>

                  {achievement.unlocked ? (
                    <p className="text-[10px] text-muted-foreground mt-2">
                      Earned {new Date(achievement.unlockedAt!).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-1.5">
                    <span className="text-[10px] font-medium text-primary">+{achievement.xpReward} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Award size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No achievements in this category</p>
        </div>
      )}
    </div>
  );
}
