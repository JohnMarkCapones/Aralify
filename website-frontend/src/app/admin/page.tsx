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

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#f43f5e", "#10b981"];

const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: "1px solid #1e293b",
  backgroundColor: "#111827",
  color: "#e2e8f0",
  fontSize: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
};

const AXIS_STYLE = { fontSize: 11, fill: "#64748b" };

export default function AdminDashboardPage() {
  const m = mockDashboardMetrics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Platform overview and key metrics"
        actions={
          <span className="text-xs text-slate-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <StatCard icon={<Users size={16} />} label="Total Users" value={m.users.total} trend={{ value: 12, positive: true }} accentColor="blue" />
        <StatCard icon={<UserPlus size={16} />} label="Active (30d)" value={m.users.active} trend={{ value: 8, positive: true }} accentColor="cyan" />
        <StatCard icon={<UserPlus size={16} />} label="New This Week" value={m.users.newThisWeek} trend={{ value: 15, positive: true }} accentColor="purple" />
        <StatCard icon={<Zap size={16} />} label="Total XP Awarded" value="2.8M" subtitle="All time" accentColor="emerald" />
        <StatCard icon={<BookOpen size={16} />} label="Published Courses" value={`${m.content.publishedCourses} / ${m.content.totalCourses}`} accentColor="amber" />
        <StatCard icon={<GraduationCap size={16} />} label="Lessons Published" value={`${m.content.publishedLessons} / ${m.content.totalLessons}`} accentColor="orange" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* User Growth - Area Chart */}
        <ChartCard title="User Growth" subtitle="Total users over time" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockUserGrowthTrend}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.6} />
              <XAxis dataKey="name" tick={AXIS_STYLE} stroke="#1e293b" />
              <YAxis tick={AXIS_STYLE} stroke="#1e293b" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fill="url(#userGrad)" name="Total Users" />
              <Area type="monotone" dataKey="active" stroke="#06b6d4" strokeWidth={2} fill="url(#activeGrad)" name="Active Users" />
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
                stroke="#0a0e1a"
                strokeWidth={2}
              >
                {mockDeviceData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Daily Signups - Bar Chart */}
        <ChartCard title="Daily Signups" subtitle="Last 7 days">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockDailySignups}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.6} />
              <XAxis dataKey="date" tick={AXIS_STYLE} stroke="#1e293b" />
              <YAxis tick={AXIS_STYLE} stroke="#1e293b" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Signups" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Lesson Completions - Area Chart */}
        <ChartCard title="Lesson Completions" subtitle="Daily completions trend">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockCompletionsTrend}>
              <defs>
                <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.6} />
              <XAxis dataKey="name" tick={AXIS_STYLE} stroke="#1e293b" />
              <YAxis tick={AXIS_STYLE} stroke="#1e293b" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
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
                <tr className="border-b border-[#1e293b] bg-[#0d1117]/40">
                  <th className="text-left text-xs font-medium text-slate-400 px-5 py-2.5">User</th>
                  <th className="text-left text-xs font-medium text-slate-400 px-4 py-2.5 hidden sm:table-cell">Email</th>
                  <th className="text-left text-xs font-medium text-slate-400 px-4 py-2.5">Joined</th>
                  <th className="text-left text-xs font-medium text-slate-400 px-4 py-2.5 hidden md:table-cell">Method</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentSignups.slice(0, 5).map((user) => (
                  <tr key={user.id} className="border-b border-white/[0.04] last:border-b-0 hover:bg-blue-500/[0.03] transition-colors">
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/25 to-purple-500/25 ring-1 ring-blue-500/20 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-medium text-blue-300">{user.displayName.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-white">{user.displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-slate-400 hidden sm:table-cell">{user.email}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2.5 hidden md:table-cell">
                      <span className="text-xs font-medium text-slate-400">{user.signupMethod}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-[#1e293b]/60">
            <Link href="/admin/users" className="text-xs font-medium text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
              View all users <ArrowRight size={12} />
            </Link>
          </div>
        </ChartCard>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <ChartCard title="Recent Activity" noPadding>
            <div className="divide-y divide-white/[0.04]">
              {mockRecentActivity.map((item) => {
                const icons: Record<string, React.ReactNode> = {
                  completion: <CheckCircle size={13} className="text-emerald-400" />,
                  achievement: <Award size={13} className="text-amber-400" />,
                  rank: <TrendingUp size={13} className="text-blue-400" />,
                  streak: <Flame size={13} className="text-orange-400" />,
                  enrollment: <UserPlus size={13} className="text-cyan-400" />,
                };
                const dotColors: Record<string, string> = {
                  completion: "bg-emerald-400/20",
                  achievement: "bg-amber-400/20",
                  rank: "bg-blue-400/20",
                  streak: "bg-orange-400/20",
                  enrollment: "bg-cyan-400/20",
                };
                return (
                  <div key={item.id} className="flex items-start gap-2.5 px-5 py-3">
                    <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${dotColors[item.type] || "bg-slate-400/20"}`}>
                      {icons[item.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-snug text-slate-200">{item.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500">{item.time}</span>
                        {item.xp && <span className="text-[10px] font-medium text-blue-400">{item.xp}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          {/* System Health */}
          <ChartCard title="System Health" noPadding>
            <div className="divide-y divide-white/[0.04]">
              {[
                { icon: <Database size={13} />, label: "Database", value: <StatusBadge status={mockSystemHealth.database} dot /> },
                { icon: <Clock size={13} />, label: "Uptime", value: <span className="text-xs font-medium text-emerald-400">{Math.floor(mockSystemHealth.uptime / 86400)}d</span> },
                { icon: <Server size={13} />, label: "Version", value: <span className="text-xs font-mono text-slate-400">v{mockSystemHealth.version}</span> },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-2 text-slate-400">
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
          { href: "/admin/content", icon: <BookOpen size={18} />, title: "Create Course", desc: "Add new learning content", color: "text-blue-400", borderColor: "border-l-blue-500", bgGlow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.08)]" },
          { href: "/admin/moderation", icon: <Activity size={18} />, title: "View Reports", desc: "5 pending reports", color: "text-orange-400", borderColor: "border-l-orange-500", bgGlow: "hover:shadow-[0_0_15px_rgba(249,115,22,0.08)]" },
          { href: "/admin/analytics", icon: <TrendingUp size={18} />, title: "Analytics", desc: "Deep dive into data", color: "text-emerald-400", borderColor: "border-l-emerald-500", bgGlow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.08)]" },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <div className={`group flex items-center gap-4 p-4 rounded-xl border border-[#1e293b] border-l-2 ${action.borderColor} bg-[#111827]/80 transition-all ${action.bgGlow}`}>
              <div className={action.color}>{action.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{action.title}</p>
                <p className="text-xs text-slate-500">{action.desc}</p>
              </div>
              <ArrowUpRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
