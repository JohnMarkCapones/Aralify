"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Flame, Trophy, Zap, ArrowRight, BookOpen, Target, Clock,
  BarChart3, Star, ChevronRight, Play, Award, TrendingUp,
  Calendar, CheckCircle, Code2, LogOut, Settings, User
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { AnimatedCounter } from "@/components/effects";
import { LogoutButton } from "./logout-button";

interface DashboardProfile {
  username: string;
  displayName: string;
  level: number;
  xpTotal: number;
  streakCurrent: number;
  email?: string;
}

interface DashboardClientProps {
  userEmail: string;
  profile: DashboardProfile | null;
  token?: string;
}

const currentCourses = [
  {
    title: "Python Fundamentals",
    slug: "python-fundamentals",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    progress: 65,
    currentLesson: "Functions & Scope",
    lessonNumber: 16,
    totalLessons: 24,
    color: "bg-[#3776AB]",
  },
  {
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    progress: 38,
    currentLesson: "Arrays & Objects",
    lessonNumber: 12,
    totalLessons: 32,
    color: "bg-[#F7DF1E]",
  },
];

const recentActivity = [
  { text: "Completed \"Loops in Python\" (Hard)", xp: "+150 XP", time: "2h ago", icon: <CheckCircle size={16} className="text-emerald-500" /> },
  { text: "Earned \"10-Day Streak\" badge", xp: "+50 XP", time: "1d ago", icon: <Award size={16} className="text-accent-foreground" /> },
  { text: "Completed \"Variables\" in JS (Medium)", xp: "+100 XP", time: "1d ago", icon: <CheckCircle size={16} className="text-emerald-500" /> },
  { text: "Climbed to Rank #142 on leaderboard", xp: "", time: "2d ago", icon: <TrendingUp size={16} className="text-primary" /> },
];

const recommendedCourses = [
  { title: "React From Zero", slug: "react-from-zero", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", difficulty: "Intermediate", lessons: 28, color: "bg-[#61DAFB]" },
  { title: "TypeScript Mastery", slug: "typescript-mastery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", difficulty: "Intermediate", lessons: 20, color: "bg-[#3178C6]" },
  { title: "Node.js Backend", slug: "node-backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", difficulty: "Intermediate", lessons: 26, color: "bg-[#339933]" },
];

const weeklyStreak = [true, true, true, true, true, false, false];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DashboardClient({ userEmail, profile, token }: DashboardClientProps) {
  const displayName = profile?.displayName || profile?.username || userEmail.split("@")[0];
  const xp = profile?.xpTotal || 0;
  const streak = profile?.streakCurrent || 0;
  const level = profile?.level || 1;

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
            <Link href="/settings" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Settings">
              <Settings size={18} />
            </Link>
            <Link href={`/profile/${profile?.username || "me"}`} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Profile">
              <User size={18} />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                Welcome back, <span className="text-primary">{displayName}</span>
              </h1>
              <p className="text-muted-foreground font-medium mt-1">
                Level {level} · {streak > 0 ? `${streak}-day streak — keep it going!` : "Start a streak today!"}
              </p>
            </div>
            <Link href="/courses">
              <NeoButton variant="primary" size="md" className="group">
                BROWSE COURSES <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </NeoButton>
            </Link>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total XP", value: xp || 12450, icon: <Zap size={20} className="text-primary" />, color: "bg-primary/10", suffix: "" },
            { label: "Streak", value: streak || 12, icon: <Flame size={20} className="text-orange-500" />, color: "bg-orange-500/10", suffix: " days" },
            { label: "Rank", value: 142, icon: <Trophy size={20} className="text-accent-foreground" />, color: "bg-accent/30", prefix: "#" },
            { label: "Courses", value: 2, icon: <BookOpen size={20} className="text-secondary" />, color: "bg-secondary/10", suffix: " active" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className={`${stat.color} p-5 rounded-2xl neo-brutal-border`}
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
              <AnimatedCounter
                target={stat.value}
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
                duration={1.5}
                className="text-3xl font-black"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black uppercase tracking-tight">Continue Learning</h2>
                <Link href="/courses" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                  View all <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-4">
                {currentCourses.map((course, i) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 bg-background neo-brutal-border rounded-xl group cursor-pointer transition-shadow hover:neo-brutal-shadow-sm"
                  >
                    <div className={`${course.color} p-3 rounded-xl neo-brutal-border shrink-0`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={course.icon} alt={course.title} className="w-8 h-8" loading="lazy" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-black text-base mb-0.5">{course.title}</div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Lesson {course.lessonNumber}: {course.currentLesson}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                        <span className="text-xs font-black text-muted-foreground shrink-0">{course.progress}%</span>
                      </div>
                    </div>

                    <Link href={`/courses/${course.slug}`}>
                      <div className="p-3 bg-primary text-white rounded-xl neo-brutal-border group-hover:scale-110 group-hover:rotate-6 transition-all shrink-0">
                        <Play size={18} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommended */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <h2 className="text-xl font-black uppercase tracking-tight mb-5">Recommended For You</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {recommendedCourses.map((course, i) => (
                  <Link key={course.slug} href={`/courses/${course.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      whileHover={{ y: -4 }}
                      className="bg-background neo-brutal-border rounded-xl overflow-hidden group cursor-pointer hover:neo-brutal-shadow-sm transition-shadow"
                    >
                      <div className={`${course.color} h-2`} />
                      <div className="p-4 space-y-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={course.icon} alt={course.title} className="w-8 h-8" loading="lazy" />
                        <div>
                          <div className="font-black text-sm">{course.title}</div>
                          <div className="text-xs font-medium text-muted-foreground">{course.lessons} lessons</div>
                        </div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border inline-block bg-yellow-100 text-yellow-800">
                          {course.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Streak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Flame size={20} className="text-orange-500" />
                <h3 className="font-black uppercase text-base tracking-tight">Weekly Streak</h3>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, i) => (
                  <div key={day} className="text-center">
                    <div className="text-[10px] font-bold text-muted-foreground mb-1.5">{day}</div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 300 }}
                      className={`w-8 h-8 mx-auto rounded-lg neo-brutal-border flex items-center justify-center ${
                        weeklyStreak[i] ? "bg-orange-500 text-white" : "bg-muted/50"
                      }`}
                    >
                      {weeklyStreak[i] && <Flame size={14} />}
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-black">{streak || 12} days</div>
                <div className="text-xs font-bold text-muted-foreground">Current streak</div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} />
                <h3 className="font-black uppercase text-base tracking-tight">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 p-3 bg-background rounded-xl"
                  >
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold leading-snug">{item.text}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-muted-foreground">{item.time}</span>
                        {item.xp && <span className="text-[10px] font-black text-primary">{item.xp}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary neo-brutal-border neo-brutal-shadow rounded-2xl p-6 text-white"
            >
              <h3 className="font-black uppercase text-base tracking-tight mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Daily Challenge", icon: <Target size={16} />, href: "/courses" },
                  { label: "Leaderboard", icon: <BarChart3 size={16} />, href: "/leaderboard" },
                  { label: "Achievements", icon: <Award size={16} />, href: "/achievements" },
                  { label: "Settings", icon: <Settings size={16} />, href: "/settings" },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                      {action.icon}
                      <span className="font-bold text-sm">{action.label}</span>
                      <ChevronRight size={14} className="ml-auto opacity-50" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
