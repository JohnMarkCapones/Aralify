"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Zap, BookOpen, Target, Clock, TrendingUp, Flame, Trophy, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { ChartCard } from "../_components/chart-card";
import {
  mockUserProfile as mockUser,
  mockXpHistory7d,
  mockXpHistory30d,
  mockWeeklyHeatmap,
  mockCourseRadar,
  mockDifficultyBreakdown,
  mockTimeSpent,
} from "@/lib/data/dashboard";
import { useUserStats, useGamificationProfile, useXpHistory } from "@/hooks/api";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

type Range = "7d" | "30d";

const statCardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" as const },
  }),
};

interface ColoredStatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  subtitle?: string;
  accentColor: string;
  index: number;
}

function ColoredStatCard({ icon, iconBg, label, value, trend, subtitle, accentColor, index }: ColoredStatCardProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={statCardVariants}
      whileHover={{ y: -3 }}
      className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden"
    >
      <div className={cn("h-1 bg-gradient-to-r", accentColor)} />
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", iconBg)}>
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            {subtitle && (
              <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-md",
                trend.positive
                  ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30"
                  : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30"
              )}
            >
              {trend.positive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsPage() {
  const [range, setRange] = useState<Range>("7d");
  const { data: stats } = useUserStats();
  const { data: gamification } = useGamificationProfile();

  const user = {
    xp: gamification?.xpTotal ?? stats?.totalXp ?? mockUser.xp,
    lessonsCompleted: stats?.lessonsCompleted ?? mockUser.lessonsCompleted,
    challengesCompleted: stats?.challengesCompleted ?? mockUser.challengesCompleted,
  };

  // TODO: Replace with real XP history data from useXpHistory() when chart data format is available
  const xpData = range === "7d" ? mockXpHistory7d : mockXpHistory30d;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stats & Progress"
        description="Track your learning journey"
        actions={
          <div className="flex rounded-lg border border-border/50 bg-background overflow-hidden">
            {(["7d", "30d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        }
      />

      {/* Stats row — colorful version */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <ColoredStatCard
          icon={<Zap size={16} className="text-amber-500" />}
          iconBg="bg-amber-100 dark:bg-amber-950/40"
          label="Total XP"
          value={user.xp}
          trend={{ value: 12, positive: true }}
          accentColor="from-amber-400 to-yellow-500"
          index={0}
        />
        <ColoredStatCard
          icon={<BookOpen size={16} className="text-blue-500" />}
          iconBg="bg-blue-100 dark:bg-blue-950/40"
          label="Lessons Done"
          value={user.lessonsCompleted}
          subtitle="This month: 18"
          accentColor="from-blue-400 to-cyan-500"
          index={1}
        />
        <ColoredStatCard
          icon={<Target size={16} className="text-emerald-500" />}
          iconBg="bg-emerald-100 dark:bg-emerald-950/40"
          label="Challenges"
          value={user.challengesCompleted}
          subtitle="Win rate: 85%"
          accentColor="from-emerald-400 to-teal-500"
          index={2}
        />
        <ColoredStatCard
          icon={<Clock size={16} className="text-purple-500" />}
          iconBg="bg-purple-100 dark:bg-purple-950/40"
          label="Study Time"
          value="42h"
          subtitle="This month"
          accentColor="from-purple-400 to-fuchsia-500"
          index={3}
        />
      </div>

      {/* XP Over Time + Time by Day */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard
          title="XP Over Time"
          subtitle={range === "7d" ? "Last 7 days" : "Last 4 weeks"}
          actions={
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                <TrendingUp size={11} className="text-blue-500" />
              </div>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={xpData}>
              <defs>
                <linearGradient id="d_xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${Number(v).toLocaleString()} XP`, "XP Earned"]} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#d_xpGrad)" name="XP" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Time Spent"
          subtitle="Minutes per day this week"
          actions={
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                <BarChart3 size={11} className="text-purple-500" />
              </div>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockTimeSpent}>
              <defs>
                <linearGradient id="d_barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${v} min`, "Time"]} />
              <Bar dataKey="value" fill="url(#d_barGrad)" radius={[4, 4, 0, 0]} name="Minutes" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Activity Heatmap */}
      <ChartCard
        title="Activity Heatmap"
        subtitle="When you study the most (hover for details)"
        actions={
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
              <Flame size={11} className="text-emerald-500" />
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex gap-0.5">
              <div className="w-10 shrink-0" />
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} className="flex-1 text-center text-[9px] text-muted-foreground">{h}</div>
              ))}
            </div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="flex gap-0.5 mb-0.5">
                <div className="w-10 shrink-0 text-[10px] text-muted-foreground flex items-center font-medium">{day}</div>
                {Array.from({ length: 24 }, (_, h) => {
                  const point = mockWeeklyHeatmap.find((p) => p.day === day && p.hour === h);
                  const val = point?.value || 0;
                  const maxVal = 100;
                  const opacity = Math.min(val / maxVal, 1);
                  return (
                    <div
                      key={h}
                      className="flex-1 h-6 rounded-sm cursor-default transition-transform hover:scale-110"
                      style={{ backgroundColor: `rgba(59, 130, 246, ${opacity * 0.7 + 0.05})` }}
                      title={`${day} ${h}:00 — ${val} min`}
                    />
                  );
                })}
              </div>
            ))}
            <div className="flex items-center justify-end gap-2 mt-3">
              <span className="text-[10px] text-muted-foreground font-medium">Less</span>
              {[0.1, 0.25, 0.45, 0.65, 0.85].map((op) => (
                <div key={op} className="w-4 h-4 rounded-sm" style={{ backgroundColor: `rgba(59, 130, 246, ${op})` }} />
              ))}
              <span className="text-[10px] text-muted-foreground font-medium">More</span>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Course Radar + Difficulty Breakdown */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard
          title="Course Progress"
          subtitle="Completion by course"
          actions={
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                <Trophy size={11} className="text-blue-500" />
              </div>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={mockCourseRadar}>
              <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
              <Radar name="Progress" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${v}%`, "Completion"]} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Difficulty Breakdown"
          subtitle="Lessons completed by difficulty"
          actions={
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                <Target size={11} className="text-amber-500" />
              </div>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={mockDifficultyBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {mockDifficultyBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${v}%`, "Share"]} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
