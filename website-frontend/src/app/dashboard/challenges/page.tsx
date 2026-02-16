"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target, Swords, Clock, Zap, Flame, Trophy,
  ArrowRight, Sparkles, Users, Timer, Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { useGamificationProfile, useStreak, useChallengesList, useDailyChallenge } from "@/hooks/api";
import type { ChallengeListItem } from "@/lib/api";

interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  language: string;
  xpReward: number;
  timeLimit: number;
  tags: string[];
  completions: number;
  successRate: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

type Category = "all" | "daily" | "weekly" | "practice";
type Difficulty = "all" | "easy" | "medium" | "hard";

const CATEGORIES: { value: Category; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All", icon: <Swords size={13} /> },
  { value: "daily", label: "Daily", icon: <Target size={13} /> },
  { value: "weekly", label: "Weekly", icon: <Trophy size={13} /> },
  { value: "practice", label: "Practice", icon: <Code2 size={13} /> },
];

const DIFFICULTY_COLORS = {
  easy: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20", ring: "ring-emerald-500/30" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", ring: "ring-amber-500/30" },
  hard: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20", ring: "ring-red-500/30" },
};

const CATEGORY_ACCENT: Record<string, { gradient: string; border: string; icon: string }> = {
  daily: { gradient: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/30", icon: "text-orange-400" },
  weekly: { gradient: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/30", icon: "text-purple-400" },
  practice: { gradient: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", icon: "text-blue-400" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: "easeOut" as const },
  }),
};

function ChallengeCard({ challenge, index }: { challenge: ChallengeItem; index: number }) {
  const diff = DIFFICULTY_COLORS[challenge.difficulty];
  const catAccent = CATEGORY_ACCENT[challenge.category] ?? CATEGORY_ACCENT.practice;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <Link href={`/dashboard/challenges/${challenge.id}`}>
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={cn(
            "relative p-5 rounded-xl border bg-background card-elevated overflow-hidden transition-shadow hover:card-elevated-hover group",
            catAccent.border
          )}
        >
          {/* Top gradient accent */}
          <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", catAccent.gradient)} />

          {/* Badges row */}
          <div className="flex items-center gap-2 mb-3">
            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", diff.bg, diff.text)}>
              {challenge.difficulty}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
              {challenge.category}
            </span>
            {challenge.isNew && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center gap-1">
                <Sparkles size={10} /> New
              </span>
            )}
            {challenge.isFeatured && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 flex items-center gap-1">
                <Flame size={10} /> Featured
              </span>
            )}
          </div>

          {/* Title + description */}
          <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
            {challenge.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {challenge.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {challenge.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom meta row */}
          <div className="flex items-center justify-between pt-3 border-t border-border/20">
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Code2 size={11} className={catAccent.icon} />
                {challenge.language}
              </span>
              <span className="flex items-center gap-1">
                <Timer size={11} />
                {challenge.timeLimit}m
              </span>
              <span className="flex items-center gap-1">
                <Users size={11} />
                {challenge.completions.toLocaleString()}
              </span>
            </div>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1">
              <Zap size={12} /> {challenge.xpReward} XP
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ChallengesPage() {
  const [category, setCategory] = useState<Category>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const { data: gamification } = useGamificationProfile();
  const { data: streakInfo } = useStreak();
  const { data: apiChallenges } = useChallengesList();
  const { data: dailyData } = useDailyChallenge();
  const currentStreak = streakInfo?.current ?? gamification?.streak ?? 0;

  // Map API challenges to local shape
  const allChallenges: ChallengeItem[] = (apiChallenges ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    difficulty: c.difficulty as "easy" | "medium" | "hard",
    category: "practice",
    language: c.language,
    xpReward: c.xpReward,
    timeLimit: c.timeLimit ?? 30,
    tags: c.tags,
    completions: c.completions,
    successRate: c.successRate,
  }));

  const filtered = allChallenges.filter((c) => {
    if (category !== "all" && c.category !== category) return false;
    if (difficulty !== "all" && c.difficulty !== difficulty) return false;
    return true;
  });

  const completedCount = gamification?.achievementsCount ?? 0;
  const totalXp = gamification?.xpTotal ?? 0;
  const featured = allChallenges[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Challenges"
        description="Test your skills with coding challenges"
        icon={Swords}
      />

      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <Flame size={16} className="text-orange-500" />, label: "Streak", value: `${currentStreak} days`, gradient: "from-orange-500/10 to-orange-500/5" },
          { icon: <Trophy size={16} className="text-amber-500" />, label: "Completed", value: `${completedCount}`, gradient: "from-amber-500/10 to-amber-500/5" },
          { icon: <Zap size={16} className="text-primary" />, label: "XP Earned", value: totalXp.toLocaleString(), gradient: "from-primary/10 to-primary/5" },
          { icon: <Target size={16} className="text-emerald-500" />, label: "Available", value: `${allChallenges.length}`, gradient: "from-emerald-500/10 to-emerald-500/5" },
        ].map((stat) => (
          <div key={stat.label} className={cn("p-4 rounded-xl card-elevated bg-gradient-to-br border border-border/30", stat.gradient)}>
            <div className="flex items-center gap-2 mb-1.5">
              {stat.icon}
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Featured/Daily Challenge Banner */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link href="/dashboard/daily-challenge">
            <div className="relative p-6 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/5 overflow-hidden group">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-orange-500/5 blur-3xl" />

              <div className="relative flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame size={16} className="text-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      Today&apos;s Challenge
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                      DIFFICULTY_COLORS[featured.difficulty].bg,
                      DIFFICULTY_COLORS[featured.difficulty].text,
                    )}>
                      {featured.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{featured.title}</h3>
                  <p className="text-sm text-muted-foreground">{featured.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Code2 size={12} /> {featured.language}</span>
                    <span className="flex items-center gap-1"><Timer size={12} /> {featured.timeLimit} min</span>
                    <span className="font-bold text-primary flex items-center gap-1"><Zap size={12} /> {featured.xpReward} XP</span>
                    <span className="text-muted-foreground/50">x{dailyData?.multiplier ?? 1} streak bonus</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-xl px-5 py-2.5 text-sm font-semibold group-hover:bg-primary/90 transition-colors flex items-center gap-2">
                    Start Challenge <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Category tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                category === c.value
                  ? "bg-background card-elevated text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
          {(["all", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                difficulty === d
                  ? "bg-background card-elevated text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {d === "all" ? "Any Difficulty" : d}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((challenge, i) => (
          <ChallengeCard key={challenge.id} challenge={challenge} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Swords size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No challenges match your filters</p>
          <p className="text-xs mt-1">Try a different category or difficulty</p>
        </div>
      )}

      {/* Challenge Summary */}
      <div className="bg-background rounded-xl border border-border/50 card-elevated p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock size={14} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold">Challenge Summary</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          {allChallenges.length} challenges available. Keep solving to earn XP!
        </p>
      </div>
    </div>
  );
}
