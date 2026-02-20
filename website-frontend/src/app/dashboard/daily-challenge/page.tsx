"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target, Clock, Zap, Trophy, CheckCircle, XCircle,
  Flame, ArrowRight, Timer, Code2, ChevronRight,
  Sparkles, Shield, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { useGamificationProfile, useStreak, useDailyChallenge } from "@/hooks/api";

const DIFFICULTY_COLORS = {
  easy: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/30", glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30", glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]" },
  hard: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30", glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]" },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function DailyChallengePage() {
  const { data: dailyData } = useDailyChallenge();
  const challenge = dailyData
    ? {
        id: dailyData.id,
        title: dailyData.title,
        description: dailyData.description,
        difficulty: dailyData.difficulty as "easy" | "medium" | "hard",
        language: dailyData.language,
        xpReward: dailyData.xpReward,
        multiplier: dailyData.multiplier,
        timeLimit: dailyData.timeLimit,
        completed: dailyData.completed,
        resetsAt: dailyData.resetsAt,
      }
    : {
        id: "",
        title: "Loading...",
        description: "",
        difficulty: "easy" as const,
        language: "Python",
        xpReward: 0,
        multiplier: 1,
        timeLimit: 30,
        completed: false,
        resetsAt: new Date(Date.now() + 86400000).toISOString(),
      };
  const diff = DIFFICULTY_COLORS[challenge.difficulty];
  const [timeLeft, setTimeLeft] = useState("");
  const { data: gamification } = useGamificationProfile();
  const { data: streakInfo } = useStreak();
  const currentStreak = streakInfo?.current ?? gamification?.streak?.current ?? 0;

  useEffect(() => {
    function updateTimer() {
      const now = new Date();
      const reset = new Date(challenge.resetsAt);
      const d = reset.getTime() - now.getTime();
      if (d <= 0) { setTimeLeft("Resetting..."); return; }
      const h = Math.floor(d / 3_600_000);
      const m = Math.floor((d % 3_600_000) / 60_000);
      const s = Math.floor((d % 60_000) / 1_000);
      setTimeLeft(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    }
    updateTimer();
    const interval = setInterval(updateTimer, 1_000);
    return () => clearInterval(interval);
  }, [challenge.resetsAt]);

  const completedCount = gamification?.achievements?.unlocked ?? 0;
  const totalXp = gamification?.xp?.total ?? 0;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08 }}
      className="space-y-6"
    >
      <PageHeader
        title="Daily Challenge"
        description="Solve a new coding challenge every day"
        icon={Target}
        actions={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <Clock size={14} className="text-orange-400" />
            <span className="font-mono text-sm font-bold tabular-nums text-orange-400">{timeLeft}</span>
          </div>
        }
      />

      {/* Stat pills */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <Flame size={16} className="text-orange-500" />, label: "Streak", value: `${currentStreak} days`, gradient: "from-orange-500/10 to-orange-500/5", accent: "border-orange-500/20" },
          { icon: <Trophy size={16} className="text-amber-500" />, label: "Completed", value: `${completedCount}/${completedCount}`, gradient: "from-amber-500/10 to-amber-500/5", accent: "border-amber-500/20" },
          { icon: <Zap size={16} className="text-primary" />, label: "Total XP", value: totalXp.toLocaleString(), gradient: "from-primary/10 to-primary/5", accent: "border-primary/20" },
          { icon: <Star size={16} className="text-purple-500" />, label: "Multiplier", value: `${challenge.multiplier}x`, gradient: "from-purple-500/10 to-purple-500/5", accent: "border-purple-500/20" },
        ].map((s) => (
          <div key={s.label} className={cn("p-4 rounded-xl bg-gradient-to-br card-elevated border", s.gradient, s.accent)}>
            <div className="flex items-center gap-2 mb-1.5">
              {s.icon}
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-lg font-semibold">{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Today's Challenge — Hero card */}
      <motion.div
        variants={item}
        className={cn(
          "relative rounded-2xl border-2 overflow-hidden",
          diff.border, diff.glow
        )}
      >
        {/* Decorative gradient orbs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-orange-500/8 to-amber-500/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-br from-primary/5 to-cyan-500/5 blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border/20 flex items-center justify-between bg-muted/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                <Target size={20} className="text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Today&apos;s Challenge</h3>
                <p className="text-[10px] text-muted-foreground">Solve to earn XP and keep your streak</p>
              </div>
            </div>
            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full", diff.bg, diff.text)}>
              {challenge.difficulty}
            </span>
          </div>

          {/* Body */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
            <p className="text-sm text-muted-foreground mb-5 max-w-xl">{challenge.description}</p>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-muted/40 border border-border/20">
                <Code2 size={13} className="text-blue-400" /> {challenge.language}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-muted/40 border border-border/20">
                <Timer size={13} className="text-muted-foreground" /> {challenge.timeLimit} min
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                <Zap size={13} /> {challenge.xpReward} XP
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500">
                <Sparkles size={13} /> x{challenge.multiplier} = {challenge.xpReward * challenge.multiplier} XP
              </span>
            </div>

            <Link
              href="/dashboard/challenges/chal_001"
              className="inline-flex bg-primary text-primary-foreground rounded-xl px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-all items-center gap-2 shadow-lg shadow-primary/20"
            >
              Start Challenge <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Streak Multiplier — visual tiers */}
      <motion.div variants={item} className="bg-background rounded-xl border border-border/50 card-elevated overflow-hidden">
        <div className="px-5 py-4 border-b border-border/20 flex items-center gap-2">
          <Flame size={14} className="text-orange-400" />
          <h3 className="text-sm font-semibold">Streak Multiplier</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { days: "1-6 days", multi: "1x", icon: <Shield size={20} />, active: currentStreak < 7, color: "blue" },
              { days: "7-13 days", multi: "2x", icon: <Flame size={20} />, active: currentStreak >= 7 && currentStreak < 14, color: "orange" },
              { days: "14+ days", multi: "3x", icon: <Sparkles size={20} />, active: currentStreak >= 14, color: "purple" },
            ].map((tier) => {
              const colors = {
                blue: { bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-500", glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
                orange: { bg: "from-orange-500/10 to-orange-500/5", border: "border-orange-500/30", text: "text-orange-500", glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)]" },
                purple: { bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30", text: "text-purple-500", glow: "shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
              }[tier.color]!;

              return (
                <div
                  key={tier.days}
                  className={cn(
                    "rounded-xl border-2 p-4 text-center transition-all bg-gradient-to-b",
                    tier.active
                      ? cn(colors.border, colors.bg, colors.glow)
                      : "border-border/20 opacity-40"
                  )}
                >
                  <div className={cn("mx-auto mb-2", tier.active ? colors.text : "text-muted-foreground")}>
                    {tier.icon}
                  </div>
                  <p className={cn("text-2xl font-bold", tier.active && colors.text)}>{tier.multi}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tier.days}</p>
                  {tier.active && (
                    <p className={cn("text-[10px] font-bold mt-1.5 uppercase tracking-wider", colors.text)}>Active</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Challenge Summary */}
      <motion.div variants={item} className="bg-background rounded-xl border border-border/50 card-elevated p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock size={14} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold">Challenge Progress</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Keep completing daily challenges to earn XP and maintain your streak!
        </p>
      </motion.div>
    </motion.div>
  );
}
