"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Zap, BookOpen, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { StatCard } from "../_components/stat-card";
import { ChartCard } from "../_components/chart-card";
import {
  mockUserProfile as user,
  mockXpHistory7d,
  mockXpHistory30d,
  mockWeeklyHeatmap,
  mockCourseRadar,
  mockDifficultyBreakdown,
  mockTimeSpent,
} from "@/lib/data/dashboard";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

type Range = "7d" | "30d";

export default function StatsPage() {
  const [range, setRange] = useState<Range>("7d");

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

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Zap size={16} />} label="Total XP" value={user.xp} trend={{ value: 12, positive: true }} />
        <StatCard icon={<BookOpen size={16} />} label="Lessons Done" value={user.lessonsCompleted} subtitle="This month: 18" />
        <StatCard icon={<Target size={16} />} label="Challenges" value={user.challengesCompleted} subtitle="Win rate: 85%" />
        <StatCard icon={<Clock size={16} />} label="Study Time" value="42h" subtitle="This month" />
      </div>

      {/* XP Over Time + Time by Day */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="XP Over Time" subtitle={range === "7d" ? "Last 7 days" : "Last 4 weeks"}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={xpData}>
              <defs>
                <linearGradient id="d_xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${Number(v).toLocaleString()} XP`, "XP Earned"]} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#d_xpGrad)" name="XP" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Time Spent" subtitle="Minutes per day this week">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockTimeSpent}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${v} min`, "Time"]} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="Minutes" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Activity Heatmap */}
      <ChartCard title="Activity Heatmap" subtitle="When you study the most (hover for details)">
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
                <div className="w-10 shrink-0 text-[10px] text-muted-foreground flex items-center">{day}</div>
                {Array.from({ length: 24 }, (_, h) => {
                  const point = mockWeeklyHeatmap.find((p) => p.day === day && p.hour === h);
                  const val = point?.value || 0;
                  const maxVal = 100;
                  const opacity = Math.min(val / maxVal, 1);
                  return (
                    <div
                      key={h}
                      className="flex-1 h-6 rounded-sm cursor-default"
                      style={{ backgroundColor: `rgba(59, 130, 246, ${opacity * 0.7 + 0.05})` }}
                      title={`${day} ${h}:00 — ${val} min`}
                    />
                  );
                })}
              </div>
            ))}
            <div className="flex items-center justify-end gap-2 mt-3">
              <span className="text-[10px] text-muted-foreground">Less</span>
              {[0.1, 0.25, 0.45, 0.65, 0.85].map((op) => (
                <div key={op} className="w-4 h-4 rounded-sm" style={{ backgroundColor: `rgba(59, 130, 246, ${op})` }} />
              ))}
              <span className="text-[10px] text-muted-foreground">More</span>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Course Radar + Difficulty Breakdown */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Course Progress" subtitle="Completion by course">
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

        <ChartCard title="Difficulty Breakdown" subtitle="Lessons completed by difficulty">
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
