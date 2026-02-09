"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Flame, Zap, BookOpen, Trophy, TrendingUp, Calendar, Clock,
  Code2, Settings, User
} from "lucide-react";
import { LogoutButton } from "../logout-button";

const courseProgress = [
  { title: "Python Fundamentals", progress: 65, lessonsComplete: 16, totalLessons: 24, xpEarned: 4200, color: "bg-[#3776AB]" },
  { title: "JavaScript Essentials", progress: 38, lessonsComplete: 12, totalLessons: 32, xpEarned: 2800, color: "bg-[#F7DF1E]" },
  { title: "HTML & CSS Foundations", progress: 100, lessonsComplete: 20, totalLessons: 20, xpEarned: 3500, color: "bg-[#E34F26]" },
];

const xpHistory = [
  { day: "Mon", xp: 350 },
  { day: "Tue", xp: 200 },
  { day: "Wed", xp: 500 },
  { day: "Thu", xp: 150 },
  { day: "Fri", xp: 400 },
  { day: "Sat", xp: 0 },
  { day: "Sun", xp: 0 },
];

const maxXp = Math.max(...xpHistory.map((d) => d.xp), 1);

// Generate streak calendar (last 12 weeks)
const streakCalendar: boolean[][] = Array.from({ length: 12 }, () =>
  Array.from({ length: 7 }, () => Math.random() > 0.35)
);

export function ProgressClient({ userEmail }: { userEmail: string }) {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      {/* Top bar */}
      <div className="border-b-3 border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-primary text-white rounded-lg neo-brutal-border">
              <Code2 size={18} />
            </div>
            <span className="font-display font-black text-xl uppercase tracking-tighter">Aralify</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <Link href="/settings" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Settings">
              <Settings size={18} />
            </Link>
            <Link href="/profile/me" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Profile">
              <User size={18} />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">PROGRESS</h1>
          <p className="text-muted-foreground font-medium mt-1">Track your learning journey and milestones.</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total XP", value: "10,500", icon: <Zap size={20} className="text-primary" />, color: "bg-primary/10" },
            { label: "Streak", value: "12 days", icon: <Flame size={20} className="text-orange-500" />, color: "bg-orange-500/10" },
            { label: "Courses", value: "3 active", icon: <BookOpen size={20} className="text-blue-500" />, color: "bg-blue-500/10" },
            { label: "Hours", value: "48h", icon: <Clock size={20} className="text-purple-500" />, color: "bg-purple-500/10" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} p-5 rounded-2xl neo-brutal-border`}>
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-2xl font-black">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Course Completion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <h2 className="text-xl font-black uppercase tracking-tight mb-5">Course Progress</h2>
              <div className="space-y-5">
                {courseProgress.map((course) => (
                  <div key={course.title} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-sm">{course.title}</span>
                        <span className="text-xs font-bold text-muted-foreground ml-2">
                          {course.lessonsComplete}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <span className="text-xs font-black text-primary flex items-center gap-1">
                        <Zap size={10} /> {course.xpEarned.toLocaleString()} XP
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden neo-brutal-border">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full ${course.progress === 100 ? 'bg-green-500' : 'bg-primary'} rounded-full`}
                      />
                    </div>
                    <div className="text-right text-xs font-black text-muted-foreground">{course.progress}%</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* XP History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={18} className="text-primary" />
                <h2 className="text-xl font-black uppercase tracking-tight">XP This Week</h2>
              </div>
              <div className="flex items-end gap-3 h-40">
                {xpHistory.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black text-primary">{day.xp > 0 ? day.xp : ''}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.xp / maxXp) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`w-full rounded-t-lg neo-brutal-border ${day.xp > 0 ? 'bg-primary' : 'bg-muted/30'}`}
                      style={{ minHeight: day.xp > 0 ? 8 : 4 }}
                    />
                    <span className="text-[10px] font-bold text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-green-500" />
                <h3 className="font-black uppercase text-base tracking-tight">Activity Calendar</h3>
              </div>
              <div className="flex gap-1">
                {streakCalendar.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((active, di) => (
                      <div
                        key={di}
                        className={`w-3 h-3 rounded-sm ${
                          active ? 'bg-green-500' : 'bg-muted/50'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs font-bold text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted/50" />
                  <div className="w-3 h-3 rounded-sm bg-green-300" />
                  <div className="w-3 h-3 rounded-sm bg-green-500" />
                </div>
                <span>More</span>
              </div>
            </motion.div>

            {/* Time Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={18} className="text-accent-foreground" />
                <h3 className="font-black uppercase text-base tracking-tight">Milestones</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "First Course Completed", done: true },
                  { label: "10-Day Streak", done: true },
                  { label: "1,000 XP Earned", done: true },
                  { label: "10,000 XP Earned", done: true },
                  { label: "50-Day Streak", done: false },
                  { label: "All Courses Completed", done: false },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full neo-brutal-border flex items-center justify-center text-xs ${
                      m.done ? 'bg-green-500 text-white' : 'bg-muted/50'
                    }`}>
                      {m.done ? '✓' : ''}
                    </div>
                    <span className={`text-sm font-bold ${m.done ? '' : 'text-muted-foreground'}`}>{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
