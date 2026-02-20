"use client";

import { useState } from "react";
import {
  Users, UserPlus, Flame, Target, TrendingUp,
  Zap, Clock, RefreshCw, BarChart3, Globe, Smartphone,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { PageHeader } from "../_components/page-header";
import { StatCard } from "../_components/stat-card";
import { ChartCard } from "../_components/chart-card";
import { cn } from "@/lib/utils";
import {
  mockDashboardMetrics,
  mockUserGrowthTrend,
  mockDAUTrend,
  mockXpTrend,
  mockCompletionsTrend,
  mockFunnelData,
  mockCohortRetention,
  mockActivityHeatmap,
  mockDeviceData,
  mockBrowserData,
  mockRegionData,
  mockXpDistribution,
  mockDifficultyRates,
  mockCourses,
} from "@/lib/data/admin";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

type DateRange = "7d" | "30d" | "90d";

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<DateRange>("30d");
  const m = mockDashboardMetrics;

  // XP breakdown
  const xpBreakdown = [
    { name: "Lessons", value: 42 },
    { name: "Challenges", value: 25 },
    { name: "Streaks", value: 15 },
    { name: "Achievements", value: 12 },
    { name: "Daily Bonus", value: 6 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Comprehensive platform analytics and insights"
        actions={
          <div className="flex rounded-lg border border-border/50 bg-background overflow-hidden">
            {(["7d", "30d", "90d"] as const).map((r) => (
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
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard icon={<Users size={16} />} label="DAU" value={m.engagement.dau} trend={{ value: 5, positive: true }} />
        <StatCard icon={<Users size={16} />} label="MAU" value={m.engagement.mau} trend={{ value: 8, positive: true }} />
        <StatCard icon={<UserPlus size={16} />} label={`New Users (${range})`} value={range === "7d" ? m.users.newThisWeek : m.users.newThisMonth} />
        <StatCard icon={<Flame size={16} />} label="Avg Streak" value={`${m.engagement.avgStreak} days`} />
        <StatCard icon={<Target size={16} />} label="Avg Completion" value={`${m.engagement.avgCompletionRate}%`} />
      </div>

      {/* Main Charts Row 1: User Growth + DAU/MAU */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="User Growth Trend" subtitle="Total vs active users">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockUserGrowthTrend}>
              <defs>
                <linearGradient id="a_userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="a_activeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fill="url(#a_userGrad)" name="Total" />
              <Area type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} fill="url(#a_activeGrad)" name="Active" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="DAU / MAU Trend" subtitle="Daily & monthly active users">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockDAUTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="dau" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="DAU" />
              <Line type="monotone" dataKey="mau" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="MAU" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: XP Trend + Completions */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="XP Awarded" subtitle="Daily XP distribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockXpTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [Number(v).toLocaleString() + " XP", "XP Awarded"]} />
              <Bar dataKey="value" fill="#f59e0b" radius={[3, 3, 0, 0]} name="XP" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Lesson Completions" subtitle="Daily completion count">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockCompletionsTrend}>
              <defs>
                <linearGradient id="a_compGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#a_compGrad)" name="Completions" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Conversion Funnel + Cohort Retention */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Conversion Funnel" subtitle="User journey progression">
          <div className="space-y-3">
            {mockFunnelData.map((step, i) => {
              const pct = Math.round((step.value / mockFunnelData[0].value) * 100);
              const dropoff = i > 0 ? Math.round(((mockFunnelData[i - 1].value - step.value) / mockFunnelData[i - 1].value) * 100) : 0;
              return (
                <div key={step.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{step.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{step.value.toLocaleString()}</span>
                      {i > 0 && (
                        <span className="text-xs text-red-500">-{dropoff}%</span>
                      )}
                    </div>
                  </div>
                  <div className="h-6 bg-muted/50 rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md transition-all"
                      style={{ width: `${pct}%`, backgroundColor: COLORS[i] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Cohort Retention" subtitle="Weekly retention by signup cohort" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left font-medium text-muted-foreground px-4 py-2">Cohort</th>
                  {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((w) => (
                    <th key={w} className="text-center font-medium text-muted-foreground px-2 py-2">{w}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockCohortRetention.map((row) => (
                  <tr key={row.week} className="border-b border-border/20 last:border-b-0">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">{row.week}</td>
                    {[row.w1, row.w2, row.w3, row.w4, row.w5, row.w6, row.w7, row.w8].map((val, i) => (
                      <td key={i} className="text-center px-2 py-2">
                        {val > 0 ? (
                          <span
                            className="inline-flex items-center justify-center w-10 h-6 rounded text-[10px] font-medium"
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${val / 100 * 0.3})`,
                              color: val > 50 ? "#1e40af" : "#6b7280",
                            }}
                          >
                            {val}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* Row 4: Activity Heatmap */}
      <ChartCard title="Activity Heatmap" subtitle="When users are most active (hover for details)">
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
                  const point = mockActivityHeatmap.find((p) => p.day === day && p.hour === h);
                  const val = point?.value || 0;
                  const maxVal = 130;
                  const opacity = Math.min(val / maxVal, 1);
                  return (
                    <div
                      key={h}
                      className="flex-1 h-6 rounded-sm cursor-default transition-colors"
                      style={{ backgroundColor: `rgba(59, 130, 246, ${opacity * 0.7 + 0.05})` }}
                      title={`${day} ${h}:00 — ${val} active users`}
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

      {/* Row 5: XP Breakdown + Difficulty Rates + XP Distribution */}
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="XP by Source" subtitle="Where XP comes from">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={xpBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {xpBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${v}%`, "Share"]} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Difficulty Completion Rates" subtitle="By course and difficulty">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={mockDifficultyRates}>
              <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
              <Radar name="Easy" dataKey="easy" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Medium" dataKey="medium" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Hard" dataKey="hard" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="XP Distribution" subtitle="Users by XP bracket">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockXpDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 6: Demographics */}
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="Device Breakdown" subtitle="User devices">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={mockDeviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {mockDeviceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Browser Distribution" subtitle="Top browsers">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockBrowserData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} width={60} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Bar dataKey="value" fill="#06b6d4" radius={[0, 4, 4, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Regions" subtitle="User distribution by region">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockRegionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} width={70} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 7: Course Performance + Engagement Cards */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Course Performance" subtitle="Enrollments and completion rates" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Course</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">Enrolled</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">Completion</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-5 py-2.5 hidden sm:table-cell">Trend</th>
                </tr>
              </thead>
              <tbody>
                {mockCourses.filter(c => c.isPublished).sort((a, b) => b.enrollmentCount - a.enrollmentCount).map((course) => (
                  <tr key={course.id} className="border-b border-border/20 last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: course.color }} />
                        <span className="font-medium">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium">{course.enrollmentCount.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${course.completionRate}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{course.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-right hidden sm:table-cell">
                      <span className="text-xs text-emerald-600 font-medium">+{Math.floor(Math.random() * 15 + 3)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* Engagement metrics */}
        <div className="grid grid-cols-2 gap-3 content-start">
          <StatCard icon={<Clock size={16} />} label="Avg Session" value="18 min" subtitle="Per user per day" />
          <StatCard icon={<RefreshCw size={16} />} label="7d Retention" value="72%" trend={{ value: 3, positive: true }} />
          <StatCard icon={<RefreshCw size={16} />} label="30d Retention" value="45%" trend={{ value: 2, positive: false }} />
          <StatCard icon={<BarChart3 size={16} />} label="Lessons/User" value="8.4" subtitle="Average" />
          <StatCard icon={<Globe size={16} />} label="Top Region" value="NCR" subtitle="4,230 users" />
          <StatCard icon={<Smartphone size={16} />} label="Mobile Users" value="45%" subtitle="5,842 users" />
        </div>
      </div>
    </div>
  );
}
