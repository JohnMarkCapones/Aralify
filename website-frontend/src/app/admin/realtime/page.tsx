"use client";

import { useState, useEffect } from "react";
import {
  Activity, Users, Cpu, HardDrive, Wifi, Zap,
  Clock, AlertTriangle, CheckCircle2, XCircle, Info,
  Radio, ArrowUpRight, Monitor,
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { PageHeader } from "../_components/page-header";
import { StatCard } from "../_components/stat-card";
import { ChartCard } from "../_components/chart-card";
import { cn } from "@/lib/utils";
import {
  mockRealtimeMetrics,
  mockRequestsPerMinute,
  mockActiveUsersTimeline,
  mockResponseTimeP50,
  mockActiveCoursesNow,
  mockLiveActivity,
  mockRecentErrors,
} from "@/lib/data/admin";

const SEVERITY_STYLES = {
  error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const SEVERITY_ICON = {
  error: <XCircle size={14} />,
  warning: <AlertTriangle size={14} />,
  info: <Info size={14} />,
};

const ACTIVITY_COLORS: Record<string, string> = {
  completion: "text-emerald-500",
  enrollment: "text-blue-500",
  achievement: "text-yellow-500",
  rank: "text-purple-500",
  streak: "text-orange-500",
};

export default function AdminRealtimePage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const rt = mockRealtimeMetrics;

  // Simulate auto-refresh indicator
  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Real-Time Monitoring"
        description="Live platform metrics and activity"
        actions={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Live
            </span>
            <span className="text-[10px] text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        }
      />

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={<Users size={16} />}
          label="Active Users"
          value={rt.activeUsers}
          subtitle="Online right now"
        />
        <StatCard
          icon={<Activity size={16} />}
          label="Active Sessions"
          value={rt.activeSessions}
          subtitle={`${rt.wsConnections} WebSocket conns`}
        />
        <StatCard
          icon={<Zap size={16} />}
          label="Code Executions"
          value={rt.codeExecutions}
          subtitle="Running now"
        />
        <StatCard
          icon={<Clock size={16} />}
          label="Avg Response"
          value={`${rt.avgResponseMs}ms`}
          subtitle={`${rt.errorRate}% error rate`}
        />
      </div>

      {/* Server Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">CPU Usage</span>
            <Cpu size={14} className="text-muted-foreground/50" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-2xl font-semibold">{rt.cpuUsage}%</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden mb-1">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  rt.cpuUsage > 80 ? "bg-red-500" : rt.cpuUsage > 60 ? "bg-yellow-500" : "bg-emerald-500"
                )}
                style={{ width: `${rt.cpuUsage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">Memory Usage</span>
            <HardDrive size={14} className="text-muted-foreground/50" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-2xl font-semibold">{rt.memoryUsage}%</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden mb-1">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  rt.memoryUsage > 80 ? "bg-red-500" : rt.memoryUsage > 60 ? "bg-yellow-500" : "bg-emerald-500"
                )}
                style={{ width: `${rt.memoryUsage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-4 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">Queue Depth</span>
            <Wifi size={14} className="text-muted-foreground/50" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-2xl font-semibold">{rt.queueDepth}</span>
            <span className="text-xs text-muted-foreground mb-1">jobs pending</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1: Requests/min + Active Users Timeline */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Requests / Minute" subtitle="Last 60 minutes">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mockRequestsPerMinute}>
              <defs>
                <linearGradient id="rt_reqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} interval={9} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={1.5} fill="url(#rt_reqGrad)" name="Requests" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Active Users" subtitle="Last 60 minutes">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={mockActiveUsersTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} interval={9} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} name="Users" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2: Response Time + Active Courses */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Response Time (p50)" subtitle="Last 30 minutes">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockResponseTimeP50}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} interval={4} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} unit="ms" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v) => [`${v}ms`, "p50"]} />
              <Bar dataKey="value" fill="#f59e0b" radius={[2, 2, 0, 0]} name="p50" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Active Courses" subtitle="Currently being studied" noPadding>
          <div className="divide-y divide-border/30">
            {mockActiveCoursesNow.map((item) => (
              <div key={item.course} className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors">
                <div>
                  <p className="text-sm font-medium">{item.course}</p>
                  <p className="text-[10px] text-muted-foreground">Popular: {item.currentLesson}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Monitor size={12} className="text-muted-foreground" />
                  <span className="text-sm font-semibold">{item.activeUsers}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row: Live Activity + Errors */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard
          title="Live Activity Feed"
          subtitle="Latest platform events"
          actions={
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Radio size={10} className="text-emerald-500" /> Streaming
            </span>
          }
          noPadding
        >
          <div className="divide-y divide-border/20 max-h-[360px] overflow-y-auto">
            {mockLiveActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3 hover:bg-muted/10 transition-colors">
                <div className={cn("mt-0.5", ACTIVITY_COLORS[item.type] || "text-muted-foreground")}>
                  <ArrowUpRight size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Recent Errors & Warnings" subtitle="System health alerts" noPadding>
          <div className="divide-y divide-border/20">
            {mockRecentErrors.map((err) => (
              <div key={err.id} className="flex items-start gap-3 px-5 py-3.5">
                <div className={cn("p-1.5 rounded-lg", SEVERITY_STYLES[err.severity])}>
                  {SEVERITY_ICON[err.severity]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{err.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-muted-foreground">Last seen: {err.lastSeen}</span>
                    {err.count > 0 && (
                      <span className="text-[10px] font-medium text-orange-600 dark:text-orange-400">
                        {err.count} occurrence{err.count > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-md",
                  SEVERITY_STYLES[err.severity]
                )}>
                  {err.severity.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border/30">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} />
              <span className="text-xs font-medium">All systems operational</span>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
