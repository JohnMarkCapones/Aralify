"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { DotPattern } from "@/components/effects";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Award, Star, Zap, Flame, Trophy, Crown, TrendingUp, Loader2 } from "lucide-react";
import {
  useGlobalLeaderboard,
  useWeeklyLeaderboard,
  useMonthlyLeaderboard,
  useUserRanks,
} from "@/hooks/api";
import type { LeaderboardEntry } from "@/lib/api";

type TabOption = "weekly" | "monthly" | "alltime";

const tabs: { key: TabOption; label: string }[] = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "alltime", label: "All Time" },
];

const tabHeadings: Record<TabOption, string> = {
  weekly: "TOP PERFORMERS THIS WEEK",
  monthly: "TOP PERFORMERS THIS MONTH",
  alltime: "ALL-TIME LEGENDS",
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabOption>("weekly");

  const { data: globalData, isLoading: loadingGlobal } = useGlobalLeaderboard({ limit: 20 });
  const { data: weeklyData, isLoading: loadingWeekly } = useWeeklyLeaderboard();
  const { data: monthlyData, isLoading: loadingMonthly } = useMonthlyLeaderboard();
  const { data: ranks } = useUserRanks();

  const isLoading =
    (activeTab === "weekly" && loadingWeekly) ||
    (activeTab === "monthly" && loadingMonthly) ||
    (activeTab === "alltime" && loadingGlobal);

  const activeData =
    activeTab === "weekly"
      ? weeklyData
      : activeTab === "monthly"
        ? monthlyData
        : globalData;

  const entries = activeData?.entries ?? [];
  const leaderboardUsers = entries.map((e) => ({
    rank: e.rank,
    name: e.displayName || e.username,
    xp: e.xp,
    level: e.level,
    streak: e.streak,
    avatar: e.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${e.username}`,
    isYou: e.isCurrentUser,
  }));

  const top3 = leaderboardUsers.slice(0, 3);
  const currentUser = leaderboardUsers.find((u) => u.isYou);

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border relative overflow-hidden">
        <DotPattern />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-4">
              LEADERBOARD
            </h1>
            <p className="text-lg font-medium text-muted-foreground max-w-xl mx-auto">
              See who&apos;s climbing the ranks. Compete, earn XP, and claim your spot at the top.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Tab Bar */}
      <section className="py-8 border-b-4 border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 font-display font-black uppercase tracking-wider text-sm neo-brutal-border rounded-full transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-white neo-brutal-shadow"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4"
          >
            <span className="inline-block bg-foreground text-background px-6 py-2 neo-brutal-border rotate-1 font-black text-base">
              {tabHeadings[activeTab]}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-20 bg-primary/10 relative overflow-hidden">
        <DotPattern />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-center gap-6 min-h-[420px] max-w-4xl mx-auto">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="w-full md:w-1/4 bg-card neo-brutal-border neo-brutal-shadow h-[320px] flex flex-col items-center justify-end p-6 relative rounded-2xl"
            >
              <div className="absolute -top-14">
                <div className="p-2 bg-secondary rounded-full neo-brutal-border">
                  <Avatar className="w-20 h-20 border-3 border-border">
                    <AvatarImage src={top3[1].avatar} />
                    <AvatarFallback>2</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="text-center mb-6">
                <Award className="mx-auto mb-2 text-secondary" size={28} />
                <h3 className="text-2xl font-black">{top3[1].name}</h3>
                <p className="text-sm font-bold text-muted-foreground">Level {top3[1].level}</p>
                <p className="font-mono text-lg font-bold bg-secondary/20 px-4 rounded-full mt-1">
                  {top3[1].xp.toLocaleString()} XP
                </p>
              </div>
              <div className="absolute bottom-4 right-4 text-5xl font-black opacity-10">#2</div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="w-full md:w-1/3 bg-accent neo-brutal-border neo-brutal-shadow-lg h-[400px] flex flex-col items-center justify-end p-6 relative z-10 rounded-2xl"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16"
              >
                <div className="p-2.5 bg-card rounded-full neo-brutal-border">
                  <Avatar className="w-28 h-28 border-4 border-border">
                    <AvatarImage src={top3[0].avatar} />
                    <AvatarFallback>1</AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>
              <div className="text-center mb-8">
                <Crown className="mx-auto mb-2 fill-foreground" size={40} />
                <h3 className="text-3xl font-black">{top3[0].name}</h3>
                <p className="text-sm font-bold text-muted-foreground">Level {top3[0].level}</p>
                <p className="font-mono text-xl font-black bg-foreground text-background px-6 py-1 rounded-full mt-1">
                  {top3[0].xp.toLocaleString()} XP
                </p>
              </div>
              <div className="absolute top-8 right-8 flex gap-1">
                <Zap size={20} className="fill-foreground" />
                <Zap size={20} className="fill-foreground" />
              </div>
              <div className="absolute bottom-4 left-4 text-7xl font-black opacity-15">#1</div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="w-full md:w-1/4 bg-muted neo-brutal-border neo-brutal-shadow h-[280px] flex flex-col items-center justify-end p-6 relative rounded-2xl"
            >
              <div className="absolute -top-14">
                <div className="p-2 bg-primary rounded-full neo-brutal-border">
                  <Avatar className="w-18 h-18 border-3 border-border">
                    <AvatarImage src={top3[2].avatar} />
                    <AvatarFallback>3</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="text-center mb-4">
                <Star className="mx-auto mb-2 text-primary" size={24} />
                <h3 className="text-xl font-black">{top3[2].name}</h3>
                <p className="text-sm font-bold text-muted-foreground">Level {top3[2].level}</p>
                <p className="font-mono text-base font-bold bg-primary/20 px-4 rounded-full mt-1">
                  {top3[2].xp.toLocaleString()} XP
                </p>
              </div>
              <div className="absolute bottom-4 right-4 text-4xl font-black opacity-10">#3</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Rankings Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-center mb-10">
            FULL RANKINGS
          </h2>

          {/* Table Header */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-[60px_1fr_80px_100px_80px] md:grid-cols-[80px_1fr_100px_120px_100px] gap-2 px-4 py-3 bg-foreground text-background neo-brutal-border rounded-t-2xl font-display font-black text-xs uppercase tracking-widest">
              <div>Rank</div>
              <div>User</div>
              <div className="text-center">Level</div>
              <div className="text-center">XP</div>
              <div className="text-center">
                <Flame size={14} className="inline mr-1" />
                Streak
              </div>
            </div>

            {/* Table Rows */}
            <div className="neo-brutal-border border-t-0 rounded-b-2xl overflow-hidden">
              {leaderboardUsers.map((user, i) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ x: 4, backgroundColor: "hsl(var(--primary) / 0.05)" }}
                  className={`grid grid-cols-[60px_1fr_80px_100px_80px] md:grid-cols-[80px_1fr_100px_120px_100px] gap-2 px-4 py-3 items-center transition-colors ${
                    user.isYou
                      ? "bg-primary/10 border-l-4 border-l-primary"
                      : i % 2 === 0
                      ? "bg-card"
                      : "bg-muted/30"
                  } ${i < leaderboardUsers.length - 1 ? "border-b border-border/30" : ""}`}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-1">
                    {user.rank <= 3 ? (
                      <span className={`font-black text-lg ${
                        user.rank === 1 ? "text-accent" : user.rank === 2 ? "text-secondary" : "text-primary"
                      }`}>
                        #{user.rank}
                      </span>
                    ) : (
                      <span className="font-bold text-muted-foreground">#{user.rank}</span>
                    )}
                    {user.rank <= 3 && <Trophy size={14} className="text-accent" />}
                  </div>

                  {/* User */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-8 h-8 shrink-0 neo-brutal-border">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-black text-sm truncate">{user.name}</span>
                    {user.isYou && (
                      <span className="bg-primary text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border shrink-0">
                        YOU
                      </span>
                    )}
                  </div>

                  {/* Level */}
                  <div className="text-center font-bold text-sm">{user.level}</div>

                  {/* XP */}
                  <div className="text-center font-mono font-bold text-sm">
                    {user.xp.toLocaleString()}
                  </div>

                  {/* Streak */}
                  <div className="text-center flex items-center justify-center gap-1">
                    <Flame size={14} className={user.streak >= 20 ? "text-orange-500" : "text-muted-foreground"} />
                    <span className="font-bold text-sm">{user.streak}d</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Your Position Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-8"
          >
            <div className="bg-primary/10 neo-brutal-border neo-brutal-shadow rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary text-white rounded-full neo-brutal-border">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="font-black text-lg uppercase">Your Position: #{currentUser?.rank ?? ranks?.global ?? "—"}</p>
                  <p className="text-sm font-medium text-muted-foreground">Keep grinding to climb the ranks!</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-black text-2xl text-primary">{currentUser?.xp?.toLocaleString() ?? "—"}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="font-black text-2xl">{currentUser?.streak ?? "—"}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                    <Flame size={12} /> Streak
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
