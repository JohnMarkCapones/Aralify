"use client";

import { useState } from "react";
import {
  Gamepad2, Zap, Flame, Award, Medal, Target, TrendingUp,
  Settings, Trophy, Star, Edit3,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { PageHeader } from "../_components/page-header";
import { StatCard } from "../_components/stat-card";
import { ChartCard } from "../_components/chart-card";
import { cn } from "@/lib/utils";
import {
  mockDashboardMetrics,
  mockAchievements,
  mockBadges,
  mockXpMultipliers,
  mockStreakBonuses,
  mockLevelThresholds,
  mockXpLevelCurve,
  mockAchievementUnlockTrend,
  mockBadgeRarityDistribution,
} from "@/lib/data/admin";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
const RARITY_COLORS: Record<string, string> = {
  COMMON: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  RARE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  EPIC: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  LEGENDARY: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

const CATEGORY_COLORS: Record<string, string> = {
  LEARNING: "text-blue-500",
  MASTERY: "text-purple-500",
  SOCIAL: "text-emerald-500",
  STREAK: "text-orange-500",
  SPECIAL: "text-yellow-500",
};

type Tab = "overview" | "xp-config" | "achievements" | "badges";

export default function AdminGamificationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const m = mockDashboardMetrics;

  const inputCls = "w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <Gamepad2 size={14} /> },
    { id: "xp-config" as const, label: "XP Config", icon: <Zap size={14} /> },
    { id: "achievements" as const, label: "Achievements", icon: <Award size={14} /> },
    { id: "badges" as const, label: "Badges", icon: <Medal size={14} /> },
  ];

  const totalUnlocks = mockAchievements.reduce((a, b) => a + b.unlockedByCount, 0);
  const totalBadgesAwarded = mockBadges.reduce((a, b) => a + b.awardedCount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gamification"
        description="XP configuration, achievements, and badges"
      />

      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={<Zap size={16} />} label="Total XP Awarded" value={m.engagement.totalXpAwarded.toLocaleString()} trend={{ value: 12, positive: true }} />
            <StatCard icon={<Flame size={16} />} label="Avg Streak" value={`${m.engagement.avgStreak} days`} trend={{ value: 8, positive: true }} />
            <StatCard icon={<Award size={16} />} label="Achievements Unlocked" value={totalUnlocks.toLocaleString()} />
            <StatCard icon={<Medal size={16} />} label="Badges Awarded" value={totalBadgesAwarded.toLocaleString()} />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-4">
            <ChartCard title="Achievement Unlocks Over Time" subtitle="Monthly unlock trend by category">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockAchievementUnlockTrend}>
                  <defs>
                    {["learning", "mastery", "social", "streak", "special"].map((key, i) => (
                      <linearGradient key={key} id={`gam_${key}Grad`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS[i]} stopOpacity={0.1} />
                        <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  {["learning", "mastery", "social", "streak", "special"].map((key, i) => (
                    <Area key={key} type="monotone" dataKey={key} stroke={COLORS[i]} strokeWidth={2} fill={`url(#gam_${key}Grad)`} name={key.charAt(0).toUpperCase() + key.slice(1)} stackId="1" />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="XP Level Curve" subtitle="Current progression vs ideal curve">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockXpLevelCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} label={{ value: "Level", position: "insideBottom", offset: -5, style: { fontSize: 10 } }} />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [Number(v).toLocaleString() + " XP", ""]} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Current" />
                  <Line type="monotone" dataKey="ideal" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Ideal" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Badge Rarity + Top Achievements */}
          <div className="grid lg:grid-cols-3 gap-4">
            <ChartCard title="Badge Rarity Distribution" subtitle="Total badges awarded by rarity">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={mockBadgeRarityDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    <Cell fill="#9ca3af" />
                    <Cell fill="#3b82f6" />
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Top Achievements" subtitle="Most unlocked" noPadding className="lg:col-span-2">
              <div className="divide-y divide-border/20">
                {mockAchievements
                  .sort((a, b) => b.unlockedByCount - a.unlockedByCount)
                  .slice(0, 5)
                  .map((ach, i) => (
                    <div key={ach.id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/20 transition-colors">
                      <span className="text-xs font-medium text-muted-foreground w-5">#{i + 1}</span>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                        <Trophy size={16} className={CATEGORY_COLORS[ach.category] || "text-primary"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{ach.title}</p>
                        <p className="text-[10px] text-muted-foreground">{ach.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{ach.unlockedByCount.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">unlocks</p>
                      </div>
                    </div>
                  ))}
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* XP Config Tab */}
      {activeTab === "xp-config" && (
        <div className="space-y-6">
          {/* XP Multipliers */}
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
              <Zap size={16} className="text-yellow-500" /> XP Multipliers by Difficulty
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Difficulty</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Base XP</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Multiplier</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Effective XP</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-2.5 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockXpMultipliers.map((config) => (
                    <tr key={config.difficulty} className="border-b border-border/30 last:border-b-0">
                      <td className="py-2.5 px-3">
                        <span className={cn(
                          "inline-flex px-2.5 py-1 rounded-lg text-xs font-medium",
                          config.difficulty === "EASY" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          config.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {config.difficulty}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <input type="number" defaultValue={config.baseXp} className={cn(inputCls, "w-20")} />
                      </td>
                      <td className="py-2.5 px-3">
                        <input type="number" step="0.5" defaultValue={config.multiplier} className={cn(inputCls, "w-20")} />
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-sm font-semibold text-primary">{config.effectiveXp} XP</span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Edit">
                          <Edit3 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Streak Bonuses */}
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
              <Flame size={16} className="text-orange-500" /> Streak Bonuses
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mockStreakBonuses.map((bonus) => (
                <div key={bonus.days} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center shrink-0">
                    <Flame size={18} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{bonus.label}</p>
                    <p className="text-[10px] text-muted-foreground">{bonus.days} days</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">+{bonus.bonusXp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Level Thresholds */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
                <Target size={16} className="text-purple-500" /> Level Thresholds
              </h3>
              <div className="space-y-2">
                {mockLevelThresholds.map((lt) => (
                  <div key={lt.level} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center text-xs font-semibold text-purple-600 dark:text-purple-400">
                        {lt.level}
                      </span>
                      <span className="text-sm font-medium">Level {lt.level}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lt.xpRequired.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </div>

            <ChartCard title="XP Progression Curve" subtitle="XP needed per level">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={mockLevelThresholds}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis dataKey="level" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} label={{ value: "Level", position: "insideBottom", offset: -5, style: { fontSize: 10 } }} />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [Number(v).toLocaleString() + " XP", "Required"]} />
                  <Bar dataKey="xpRequired" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="XP Required" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Save Configuration
            </button>
            <button className="h-9 px-4 rounded-lg border border-border/50 text-sm font-medium hover:bg-muted transition-colors">
              Reset to Defaults
            </button>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {(["LEARNING", "MASTERY", "SOCIAL", "STREAK", "SPECIAL"] as const).map((cat) => {
              const count = mockAchievements.filter((a) => a.category === cat).length;
              const unlocks = mockAchievements.filter((a) => a.category === cat).reduce((s, a) => s + a.unlockedByCount, 0);
              return (
                <div key={cat} className="bg-background rounded-xl border border-border/50 shadow-sm p-3">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{cat}</p>
                  <p className="text-lg font-semibold mt-1">{count}</p>
                  <p className="text-[10px] text-muted-foreground">{unlocks.toLocaleString()} unlocks</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            {mockAchievements.map((ach) => (
              <div key={ach.id} className="bg-background rounded-xl border border-border/50 shadow-sm p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                  <Award size={20} className={CATEGORY_COLORS[ach.category] || "text-primary"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">{ach.title}</p>
                    <span className={cn(
                      "text-[10px] font-medium px-1.5 py-0.5 rounded-md",
                      ach.category === "LEARNING" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      ach.category === "MASTERY" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                      ach.category === "SOCIAL" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      ach.category === "STREAK" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    )}>
                      {ach.category}
                    </span>
                    {ach.isSecret && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">SECRET</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{ach.description}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1">{ach.criteria}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-primary">+{ach.xpReward} XP</p>
                  <p className="text-[10px] text-muted-foreground">{ach.unlockedByCount.toLocaleString()} unlocks</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === "badges" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(["COMMON", "RARE", "EPIC", "LEGENDARY"] as const).map((rarity) => {
              const badges = mockBadges.filter((b) => b.rarity === rarity);
              const total = badges.reduce((s, b) => s + b.awardedCount, 0);
              return (
                <div key={rarity} className="bg-background rounded-xl border border-border/50 shadow-sm p-3">
                  <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md", RARITY_COLORS[rarity])}>{rarity}</span>
                  <p className="text-lg font-semibold mt-2">{badges.length} badges</p>
                  <p className="text-[10px] text-muted-foreground">{total.toLocaleString()} awarded</p>
                </div>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockBadges.map((badge) => (
              <div key={badge.id} className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Medal size={20} className="text-primary" />
                  </div>
                  <span className={cn("inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium", RARITY_COLORS[badge.rarity])}>
                    {badge.rarity}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-[10px] text-muted-foreground">{badge.awardedCount.toLocaleString()} awarded</span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-muted rounded-lg transition-colors" title="Edit">
                      <Star size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
