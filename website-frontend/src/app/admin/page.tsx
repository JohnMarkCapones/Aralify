"use client";

import Link from "next/link";
import {
  Users, UserPlus, Zap, BookOpen, GraduationCap, Activity,
  CheckCircle, Award, TrendingUp, Flame, ArrowRight,
  Database, Clock, Server, ArrowUpRight,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { StatCard } from "./_components/stat-card";
import { PageHeader } from "./_components/page-header";
import { ChartCard } from "./_components/chart-card";
import { StatusBadge } from "./_components/status-badge";
import {
  mockDashboardMetrics,
  mockRecentSignups,
  mockRecentActivity,
  mockSystemHealth,
  mockUserGrowthTrend,
  mockDailySignups,
  mockDeviceData,
  mockCompletionsTrend,
} from "@/lib/data/admin";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminDashboardPage() {
  const m = mockDashboardMetrics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Platform overview and key metrics"
        actions={
          <span className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <StatCard icon={<Users size={16} />} label="Total Users" value={m.users.total} trend={{ value: 12, positive: true }} />
        <StatCard icon={<UserPlus size={16} />} label="Active (30d)" value={m.users.active} trend={{ value: 8, positive: true }} />
        <StatCard icon={<UserPlus size={16} />} label="New This Week" value={m.users.newThisWeek} trend={{ value: 15, positive: true }} />
        <StatCard icon={<Zap size={16} />} label="Total XP Awarded" value="2.8M" subtitle="All time" />
        <StatCard icon={<BookOpen size={16} />} label="Published Courses" value={`${m.content.publishedCourses} / ${m.content.totalCourses}`} />
        <StatCard icon={<GraduationCap size={16} />} label="Lessons Published" value={`${m.content.publishedLessons} / ${m.content.totalLessons}`} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* User Growth - Area Chart */}
        <ChartCard title="User Growth" subtitle="Total users over time" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockUserGrowthTrend}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fill="url(#userGrad)" name="Total Users" />
              <Area type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} fill="url(#activeGrad)" name="Active Users" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Device Breakdown - Pie Chart */}
        <ChartCard title="Device Breakdown" subtitle="User devices">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={mockDeviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {mockDeviceData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Daily Signups - Bar Chart */}
        <ChartCard title="Daily Signups" subtitle="Last 7 days">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockDailySignups}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Signups" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Lesson Completions - Area Chart */}
        <ChartCard title="Lesson Completions" subtitle="Daily completions trend">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockCompletionsTrend}>
              <defs>
                <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#compGrad)" name="Completions" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent Signups */}
        <ChartCard title="Recent Signups" className="lg:col-span-2" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">User</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5 hidden sm:table-cell">Email</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Joined</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5 hidden md:table-cell">Method</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentSignups.slice(0, 5).map((user) => (
                  <tr key={user.id} className="border-b border-border/20 last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-medium text-primary">{user.displayName.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium">{user.displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-muted-foreground hidden sm:table-cell">{user.email}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2.5 hidden md:table-cell">
                      <span className="text-xs font-medium text-muted-foreground">{user.signupMethod}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-border/30">
            <Link href="/admin/users" className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
              View all users <ArrowRight size={12} />
            </Link>
          </div>
        </ChartCard>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <ChartCard title="Recent Activity" noPadding>
            <div className="divide-y divide-border/20">
              {mockRecentActivity.map((item) => {
                const icons: Record<string, React.ReactNode> = {
                  completion: <CheckCircle size={13} className="text-emerald-500" />,
                  achievement: <Award size={13} className="text-amber-500" />,
                  rank: <TrendingUp size={13} className="text-blue-500" />,
                  streak: <Flame size={13} className="text-orange-500" />,
                  enrollment: <UserPlus size={13} className="text-blue-500" />,
                };
                return (
                  <div key={item.id} className="flex items-start gap-2.5 px-5 py-3">
                    <div className="mt-0.5 shrink-0">{icons[item.type]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-snug">{item.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground">{item.time}</span>
                        {item.xp && <span className="text-[10px] font-medium text-primary">{item.xp}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          {/* System Health */}
          <ChartCard title="System Health" noPadding>
            <div className="divide-y divide-border/20">
              {[
                { icon: <Database size={13} />, label: "Database", value: <StatusBadge status={mockSystemHealth.database} dot /> },
                { icon: <Clock size={13} />, label: "Uptime", value: <span className="text-xs font-medium">{Math.floor(mockSystemHealth.uptime / 86400)}d</span> },
                { icon: <Server size={13} />, label: "Version", value: <span className="text-xs font-mono text-muted-foreground">v{mockSystemHealth.version}</span> },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  {item.value}
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/admin/content", icon: <BookOpen size={18} />, title: "Create Course", desc: "Add new learning content", color: "text-blue-600" },
          { href: "/admin/moderation", icon: <Activity size={18} />, title: "View Reports", desc: "5 pending reports", color: "text-orange-600" },
          { href: "/admin/analytics", icon: <TrendingUp size={18} />, title: "Analytics", desc: "Deep dive into data", color: "text-emerald-600" },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-background shadow-sm hover:shadow-md hover:border-border transition-all">
              <div className={action.color}>{action.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.desc}</p>
              </div>
              <ArrowUpRight size={14} className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
