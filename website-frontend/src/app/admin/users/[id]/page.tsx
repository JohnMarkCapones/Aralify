"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Zap, Star, Flame, BookOpen, GraduationCap, Award,
  Ban, UserCog, KeyRound, Trash2, CheckCircle, TrendingUp,
  Mail, Calendar, Shield, UserPlus,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { StatCard } from "../../_components/stat-card";
import { StatusBadge } from "../../_components/status-badge";
import { ConfirmDialog } from "../../_components/confirm-dialog";
import { ChartCard } from "../../_components/chart-card";
import { mockUsers } from "@/lib/data/admin";
import { cn } from "@/lib/utils";

export default function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];

  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "progress" | "moderation">("overview");

  const userActivity = [
    { text: `Completed "For Loops" (Hard)`, xp: "+150 XP", time: "2h ago", icon: <CheckCircle size={14} className="text-emerald-500" /> },
    { text: `Earned "Code Warrior" badge`, xp: "+200 XP", time: "1d ago", icon: <Award size={14} className="text-yellow-500" /> },
    { text: `Completed "Variables" (Medium)`, xp: "+100 XP", time: "1d ago", icon: <CheckCircle size={14} className="text-emerald-500" /> },
    { text: `Climbed to Rank #142`, xp: "", time: "2d ago", icon: <TrendingUp size={14} className="text-primary" /> },
    { text: `Started "Control Flow" level`, xp: "", time: "3d ago", icon: <BookOpen size={14} className="text-blue-500" /> },
    { text: `Completed "Hello World" (Easy)`, xp: "+50 XP", time: "4d ago", icon: <CheckCircle size={14} className="text-emerald-500" /> },
    { text: `Enrolled in Python Fundamentals`, xp: "", time: "5d ago", icon: <UserPlus size={14} className="text-blue-500" /> },
  ];

  const courseProgress = [
    { title: "Python Fundamentals", progress: 65, completed: 16, total: 24 },
    { title: "JavaScript Essentials", progress: 38, completed: 12, total: 32 },
    { title: "HTML & CSS Basics", progress: 85, completed: 10, total: 12 },
  ];

  const userXpHistory = [
    { name: "Week 1", xp: 450 }, { name: "Week 2", xp: 820 },
    { name: "Week 3", xp: 1200 }, { name: "Week 4", xp: 680 },
    { name: "Week 5", xp: 1450 }, { name: "Week 6", xp: 1100 },
    { name: "Week 7", xp: 980 }, { name: "Week 8", xp: 1380 },
  ];

  const userWeeklyActivity = [
    { name: "Mon", lessons: 3 }, { name: "Tue", lessons: 2 },
    { name: "Wed", lessons: 4 }, { name: "Thu", lessons: 1 },
    { name: "Fri", lessons: 5 }, { name: "Sat", lessons: 2 },
    { name: "Sun", lessons: 0 },
  ];

  const banHistory = user.isBanned
    ? [{ date: user.bannedAt || "2026-01-28", reason: user.banReason || "N/A", duration: "Permanent", unbannedAt: null }]
    : [];

  const tabs = ["overview", "activity", "progress", "moderation"] as const;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} /> Back to Users
      </Link>

      {/* User header */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
            <span className="text-2xl font-semibold text-primary">
              {user.displayName.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="text-xl font-semibold tracking-tight">
                {user.displayName}
              </h1>
              <div className="flex items-center gap-2">
                <StatusBadge status={user.role} />
                <StatusBadge status={user.isBanned ? "BANNED" : "ACTIVE"} />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">@{user.username}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Joined {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-col">
            <button
              onClick={() => setBanDialogOpen(true)}
              className={cn(
                "h-8 px-3 rounded-lg text-xs font-medium transition-colors",
                user.isBanned
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-red-600 text-white hover:bg-red-700"
              )}
            >
              <Ban size={12} className="inline mr-1" />
              {user.isBanned ? "Unban" : "Ban"}
            </button>
            <button
              onClick={() => setRoleDialogOpen(true)}
              className="h-8 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors"
            >
              <UserCog size={12} className="inline mr-1" /> Role
            </button>
            <button className="h-8 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors">
              <KeyRound size={12} className="inline mr-1" /> Reset PW
            </button>
            <button
              onClick={() => setDeleteDialogOpen(true)}
              className="h-8 px-3 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
            >
              <Trash2 size={12} className="inline mr-1" /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon={<Zap size={16} />} label="XP" value={user.xpTotal} />
        <StatCard icon={<Star size={16} />} label="Level" value={user.level} />
        <StatCard icon={<Flame size={16} />} label="Streak" value={`${user.streakCurrent}d`} />
        <StatCard icon={<BookOpen size={16} />} label="Courses" value={user.coursesEnrolled || 0} />
        <StatCard icon={<GraduationCap size={16} />} label="Lessons" value={user.lessonsCompleted || 0} />
        <StatCard icon={<Award size={16} />} label="Achievements" value={user.achievementsCount || 0} />
      </div>

      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize",
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Mail size={14} /> Account Info
            </h3>
            <div className="space-y-3">
              {[
                { label: "Email", value: user.email },
                { label: "Verified", value: user.isVerified ? "Yes" : "No" },
                { label: "Sign-up Method", value: user.signupMethod || "Email" },
                { label: "Active", value: user.isActive ? "Yes" : "No" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-b-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Calendar size={14} /> Dates
            </h3>
            <div className="space-y-3">
              {[
                { label: "Created", value: new Date(user.createdAt).toLocaleString() },
                { label: "Last Active", value: new Date(user.lastActiveAt).toLocaleString() },
                ...(user.bannedAt ? [{ label: "Banned At", value: new Date(user.bannedAt).toLocaleString() }] : []),
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-b-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <ChartCard title="XP Earned" subtitle="Last 8 weeks">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={userXpHistory}>
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Area type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={2} fill="url(#xpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Weekly Activity" subtitle="Lessons completed this week">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={userWeeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Bar dataKey="lessons" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {userActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="mt-0.5 shrink-0">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.text}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    {item.xp && <span className="text-[10px] font-medium text-primary">{item.xp}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold mb-4">Course Progress</h3>
          <div className="space-y-5">
            {courseProgress.map((course) => (
              <div key={course.title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{course.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {course.completed}/{course.total} lessons
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium w-10 text-right">{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "moderation" && (
        <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Shield size={14} /> Moderation History
          </h3>
          {banHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No moderation actions on this account.
            </p>
          ) : (
            <div className="space-y-3">
              {banHistory.map((entry, i) => (
                <div key={i} className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-900/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <StatusBadge status="BANNED" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium">Reason: {entry.reason}</p>
                  <p className="text-xs text-muted-foreground">Duration: {entry.duration}</p>
                  {entry.unbannedAt && (
                    <p className="text-xs text-emerald-600 font-medium">
                      Unbanned: {new Date(entry.unbannedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={banDialogOpen}
        onOpenChange={setBanDialogOpen}
        title={user.isBanned ? "Unban User" : "Ban User"}
        description={
          user.isBanned
            ? `Unban ${user.displayName}? They will regain access.`
            : `Ban ${user.displayName}? They will lose platform access.`
        }
        onConfirm={() => setBanDialogOpen(false)}
        destructive={!user.isBanned}
        confirmText={user.isBanned ? "Unban" : "Ban User"}
      />
      <ConfirmDialog
        open={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        title="Change User Role"
        description={`Current role: ${user.role}`}
        onConfirm={() => setRoleDialogOpen(false)}
        confirmText="Change Role"
      >
        <select className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm font-medium">
          <option value="USER">User</option>
          <option value="MODERATOR">Moderator</option>
          <option value="ADMIN">Admin</option>
        </select>
      </ConfirmDialog>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User Account"
        description={`Permanently delete ${user.displayName}'s account. This cannot be undone.`}
        onConfirm={() => setDeleteDialogOpen(false)}
        destructive
        confirmText="Delete Account"
        requireConfirmation="DELETE"
      />
    </div>
  );
}
