"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Flame,
  Trophy,
  GraduationCap,
  Globe,
  Calendar,
  Clock,
  BookOpen,
  Code2,
  Target,
  Star,
  MessageSquare,
  Heart,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import {
  GridPattern,
  DotPattern,
  FloatingShapes,
  AnimatedCounter,
} from "@/components/effects";

// ── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_USER = {
  displayName: "Juan Dela Cruz",
  username: "juandev",
  avatarSeed: "juandev-aralify",
  level: 12,
  joinDate: "January 2025",
  bio: "Full-stack dev in training. Python enthusiast. Building cool stuff one lesson at a time.",
  totalXp: 12450,
  streak: 14,
  coursesCompleted: 4,
  globalRank: 156,
};

const MOCK_BADGES = [
  { emoji: "🔥", name: "7-Day Streak", color: "bg-orange-100 dark:bg-orange-950/30" },
  { emoji: "⚡", name: "Speed Demon", color: "bg-yellow-100 dark:bg-yellow-950/30" },
  { emoji: "🎯", name: "Perfect Score", color: "bg-green-100 dark:bg-green-950/30" },
  { emoji: "🐍", name: "Python Master", color: "bg-blue-100 dark:bg-blue-950/30" },
  { emoji: "📚", name: "50 Lessons", color: "bg-purple-100 dark:bg-purple-950/30" },
  { emoji: "🏆", name: "Top 200", color: "bg-pink-100 dark:bg-pink-950/30" },
];

const MOCK_COURSES = [
  {
    icon: "🐍",
    title: "Python Fundamentals",
    completedDate: "Dec 2025",
    color: "bg-blue-100 dark:bg-blue-950/30",
  },
  {
    icon: "🌐",
    title: "HTML & CSS Mastery",
    completedDate: "Oct 2025",
    color: "bg-orange-100 dark:bg-orange-950/30",
  },
  {
    icon: "⚛️",
    title: "React Basics",
    completedDate: "Aug 2025",
    color: "bg-cyan-100 dark:bg-cyan-950/30",
  },
  {
    icon: "🗃️",
    title: "SQL for Beginners",
    completedDate: "Jun 2025",
    color: "bg-green-100 dark:bg-green-950/30",
  },
];

const MOCK_ACTIVITY = [
  {
    icon: <CheckCircle size={16} />,
    text: 'Completed lesson "Async/Await Patterns"',
    xp: "+120 XP",
    time: "2 hours ago",
    color: "text-green-500",
  },
  {
    icon: <Trophy size={16} />,
    text: 'Earned badge "Speed Demon"',
    xp: "+50 XP",
    time: "5 hours ago",
    color: "text-yellow-500",
  },
  {
    icon: <Target size={16} />,
    text: "Solved Hard challenge in Variables & Types",
    xp: "+300 XP (3x)",
    time: "1 day ago",
    color: "text-red-500",
  },
  {
    icon: <Star size={16} />,
    text: "Reached Level 12",
    xp: "",
    time: "2 days ago",
    color: "text-primary",
  },
  {
    icon: <MessageSquare size={16} />,
    text: 'Commented on "Understanding Closures"',
    xp: "",
    time: "3 days ago",
    color: "text-blue-500",
  },
  {
    icon: <Heart size={16} />,
    text: "Liked 3 community solutions",
    xp: "",
    time: "3 days ago",
    color: "text-pink-500",
  },
];

// ── Animations ─────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
};

// ── Component ──────────────────────────────────────────────────────────────

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const user = MOCK_USER;

  return (
    <PageShell>
      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <section className="relative bg-primary overflow-hidden">
        <GridPattern />
        <FloatingShapes
          shapes={[
            { type: "circle", size: 40, x: "5%", y: "15%", color: "bg-white", delay: 0, duration: 8 },
            { type: "square", size: 24, x: "90%", y: "20%", color: "bg-white", delay: 1, duration: 10, rotate: 45 },
            { type: "diamond", size: 30, x: "80%", y: "70%", color: "bg-white", delay: 2, duration: 9 },
            { type: "ring", size: 50, x: "15%", y: "75%", color: "border-white", delay: 0.5, duration: 12 },
            { type: "cross", size: 20, x: "50%", y: "10%", color: "bg-white", delay: 1.5, duration: 11 },
          ]}
        />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="shrink-0"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full neo-brutal-border-white neo-brutal-shadow-lg overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`}
                  alt={`${user.displayName}'s avatar`}
                  className="w-full h-full"
                  loading="eager"
                />
              </div>
            </motion.div>

            {/* User Info */}
            <div className="text-center md:text-left text-white">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter"
              >
                {user.displayName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold opacity-80 mt-1"
              >
                @{username}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4"
              >
                {/* Level Badge */}
                <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 neo-brutal-border rounded-full font-display font-black text-sm uppercase">
                  <TrendingUp size={16} />
                  Level {user.level}
                </span>
                {/* Join Date */}
                <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full font-bold text-sm backdrop-blur-sm">
                  <Calendar size={14} />
                  Joined {user.joinDate}
                </span>
              </motion.div>

              {user.bio && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 text-white/80 font-medium max-w-lg text-lg"
                >
                  {user.bio}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Row ────────────────────────────────────────────────── */}
      <section className="relative -mt-8 z-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                label: "Total XP",
                value: user.totalXp,
                icon: <Zap size={22} className="text-primary" />,
                color: "bg-primary/10",
                suffix: "",
                prefix: "",
              },
              {
                label: "Day Streak",
                value: user.streak,
                icon: <Flame size={22} className="text-orange-500" />,
                color: "bg-orange-100 dark:bg-orange-950/30",
                suffix: " days",
                prefix: "",
              },
              {
                label: "Courses Done",
                value: user.coursesCompleted,
                icon: <GraduationCap size={22} className="text-secondary" />,
                color: "bg-secondary/10",
                suffix: "",
                prefix: "",
              },
              {
                label: "Global Rank",
                value: user.globalRank,
                icon: <Globe size={22} className="text-green-500" />,
                color: "bg-green-100 dark:bg-green-950/30",
                suffix: "",
                prefix: "#",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`${stat.color} p-5 md:p-6 rounded-2xl neo-brutal-border neo-brutal-shadow cursor-default`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="text-xs font-display font-black uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                  className="text-3xl md:text-4xl font-display font-black"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Content Sections ─────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* ── Badges & Achievements ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-accent neo-brutal-border rounded-xl">
              <Trophy size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter">
              Badges & Achievements
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {MOCK_BADGES.map((badge, i) => (
              <motion.div
                key={badge.name}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.05, rotate: [-1, 1, 0] }}
                className={`${badge.color} p-5 rounded-2xl neo-brutal-border neo-brutal-shadow flex flex-col items-center gap-3 cursor-default text-center`}
              >
                <span className="text-4xl">{badge.emoji}</span>
                <span className="text-xs font-display font-black uppercase tracking-wider leading-tight">
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Completed Courses ───────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-secondary neo-brutal-border rounded-xl">
              <BookOpen size={20} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter">
              Completed Courses
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {MOCK_COURSES.map((course, i) => (
              <motion.div
                key={course.title}
                variants={itemVariants}
                whileHover={{ x: 6 }}
                className="flex items-center gap-5 p-5 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl cursor-default group"
              >
                <div
                  className={`${course.color} w-14 h-14 rounded-xl neo-brutal-border flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                >
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-black text-lg uppercase tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-green-500" />
                    Completed
                  </p>
                </div>
                <div className="text-sm font-bold text-muted-foreground flex items-center gap-1.5 shrink-0">
                  <Clock size={14} />
                  {course.completedDate}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Activity Feed ───────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-primary neo-brutal-border rounded-xl">
              <Code2 size={20} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter">
              Recent Activity
            </h2>
          </div>

          <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden">
            <DotPattern />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 divide-y-2 divide-border"
            >
              {MOCK_ACTIVITY.map((activity, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-5 hover:bg-muted/30 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg bg-card neo-brutal-border shrink-0 mt-0.5 ${activity.color}`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{activity.text}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                  {activity.xp && (
                    <span className="text-xs font-display font-black text-primary bg-primary/10 px-3 py-1 rounded-full neo-brutal-border shrink-0">
                      {activity.xp}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </PageShell>
  );
}
