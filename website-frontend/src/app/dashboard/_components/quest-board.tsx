"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Flame, CalendarDays, Crown, Swords, Zap, Shield, Trophy } from "lucide-react";
import { QuestCard } from "./quest-card";
import { cn } from "@/lib/utils";
import type { EnrolledCourse, DashboardUserProfile } from "@/lib/data/dashboard";

interface QuestBoardProps {
  courses: EnrolledCourse[];
  user: DashboardUserProfile;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getIntensity(xp: number): 0 | 1 | 2 | 3 | 4 {
  if (xp === 0) return 0;
  if (xp < 150) return 1;
  if (xp < 300) return 2;
  if (xp < 450) return 3;
  return 4;
}

const intensityClasses = {
  0: "bg-muted/30 dark:bg-muted/20",
  1: "bg-emerald-200 dark:bg-emerald-900/50",
  2: "bg-emerald-400 dark:bg-emerald-700/70",
  3: "bg-emerald-500 dark:bg-emerald-500",
  4: "bg-emerald-600 dark:bg-emerald-400",
};

/** Generate calendar days for a given month with XP mock data */
function generateMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Monday = 0, Sunday = 6
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const days: { date: string; xp: number; isCurrentMonth: boolean }[] = [];

  // Pad start to align with Monday
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      date: d.toISOString().slice(0, 10),
      xp: 0,
      isCurrentMonth: false,
    });
  }

  // Seed-based XP so it's consistent per date
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dateStr = d.toISOString().slice(0, 10);
    // Simple hash to generate consistent mock XP
    const hash = (year * 372 + month * 31 + day) * 2654435761;
    const val = Math.abs(hash) % 600;
    const isFuture = d > new Date();
    days.push({
      date: dateStr,
      xp: isFuture ? 0 : val,
      isCurrentMonth: true,
    });
  }

  // Pad end to complete the last week
  const remainder = days.length % 7;
  if (remainder > 0) {
    for (let i = 1; i <= 7 - remainder; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d.toISOString().slice(0, 10),
        xp: 0,
        isCurrentMonth: false,
      });
    }
  }

  return days;
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function QuestBoard({ courses, user }: QuestBoardProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const isCurrentMonth = viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const monthData = useMemo(() => generateMonthData(viewYear, viewMonth), [viewYear, viewMonth]);

  const weeks = useMemo(() => {
    const w: typeof monthData[] = [];
    for (let i = 0; i < monthData.length; i += 7) {
      w.push(monthData.slice(i, i + 7));
    }
    return w;
  }, [monthData]);

  const activeDays = monthData.filter((d) => d.isCurrentMonth && d.xp > 0).length;
  const totalXp = monthData.filter((d) => d.isCurrentMonth).reduce((sum, d) => sum + d.xp, 0);

  const inProgress = courses
    .filter((c) => c.status === "in_progress")
    .slice(0, 2);

  const goToPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNext = () => {
    if (isCurrentMonth) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Continue Learning</h3>
        <Link
          href="/dashboard/courses"
          className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline"
        >
          View all <ChevronRight size={12} />
        </Link>
      </div>

      <div className="flex gap-4">
        {/* Left column: Streak calendar */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="hidden lg:flex w-[330px] shrink-0"
        >
          <div className="w-full rounded-xl card-elevated bg-background p-5 flex flex-col">
            {/* Header with streak */}
            <div className="flex items-center gap-2 mb-3">
              <Flame size={16} className="text-orange-500" />
              <span className="text-sm font-semibold">{user.streak} day streak</span>
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={goToPrev}
                className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs font-semibold">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                onClick={goToNext}
                disabled={isCurrentMonth}
                className={cn(
                  "p-1 rounded-md transition-colors",
                  isCurrentMonth
                    ? "text-muted-foreground/30 cursor-not-allowed"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{activeDays}</span> active days
              </span>
              <span className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{totalXp.toLocaleString()}</span> XP
              </span>
            </div>

            {/* Day labels row */}
            <div className="grid grid-cols-7 gap-[6px] mb-[6px]">
              {DAY_LABELS.map((label, i) => (
                <span key={i} className="text-[9px] font-medium text-muted-foreground/60 text-center uppercase tracking-wider">
                  {label}
                </span>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-[6px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-[6px]">
                  {week.map((day, di) => {
                    const level = day.isCurrentMonth ? getIntensity(day.xp) : 0;
                    const todayStr = today.toISOString().slice(0, 10);
                    const isToday = day.date === todayStr;
                    return (
                      <motion.div
                        key={day.date}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: (wi * 7 + di) * 0.012,
                          duration: 0.3,
                        }}
                        title={day.isCurrentMonth ? `${formatDateLabel(day.date)} — ${day.xp} XP` : ""}
                        className={cn(
                          "aspect-square rounded-[4px] transition-colors",
                          day.isCurrentMonth
                            ? intensityClasses[level]
                            : "bg-transparent",
                          isToday && "ring-[1.5px] ring-foreground/40 ring-offset-1 ring-offset-background"
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/10">
              {isCurrentMonth && (
                <span className="text-[9px] text-muted-foreground">Today: {formatDateLabel(today.toISOString().slice(0, 10))}</span>
              )}
              {!isCurrentMonth && <span />}
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-muted-foreground mr-1">Less</span>
                {([0, 1, 2, 3, 4] as const).map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "w-3 h-3 rounded-[3px]",
                      intensityClasses[level]
                    )}
                  />
                ))}
                <span className="text-[9px] text-muted-foreground ml-1">More</span>
              </div>
            </div>

            {/* Today's Goal */}
            <div className="mt-4 pt-4 border-t border-border/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold">Today&apos;s Goal</span>
                <span className="text-[10px] text-muted-foreground">{user.dailyProgress} / {user.dailyGoal} XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, Math.round((user.dailyProgress / user.dailyGoal) * 100))}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                {user.dailyProgress >= user.dailyGoal
                  ? "Goal reached — amazing work!"
                  : `${user.dailyGoal - user.dailyProgress} XP to go — you got this!`}
              </p>
            </div>

            {/* Weekly summary mini stats */}
            <div className="mt-4 pt-4 border-t border-border/10 grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-2.5 rounded-lg bg-muted/30">
                <Flame size={14} className="text-orange-500 mb-1" />
                <span className="text-sm font-bold">{user.streak}</span>
                <span className="text-[9px] text-muted-foreground">Streak</span>
              </div>
              <div className="flex flex-col items-center p-2.5 rounded-lg bg-muted/30">
                <Zap size={14} className="text-amber-500 mb-1" />
                <span className="text-sm font-bold">{totalXp.toLocaleString()}</span>
                <span className="text-[9px] text-muted-foreground">XP this mo.</span>
              </div>
              <div className="flex flex-col items-center p-2.5 rounded-lg bg-muted/30">
                <Trophy size={14} className="text-purple-500 mb-1" />
                <span className="text-sm font-bold">#{user.rank}</span>
                <span className="text-[9px] text-muted-foreground">Rank</span>
              </div>
            </div>

            {/* Illustration */}
            <div className="mt-4 pt-4 border-t border-border/10 flex flex-col items-center text-center">
              <div className="relative w-full h-28 mb-2">
                <Image
                  src="/illustrations/streak.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs font-semibold">
                {user.streak >= 7 ? "You're on fire!" : "Keep going!"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {user.streak >= 7
                  ? `${user.streak} days strong — don't break the chain!`
                  : "Practice daily to build your streak."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right column: Course cards + study plan */}
        <div className="flex-1 min-w-0 space-y-3">
          {inProgress.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            >
              <QuestCard course={course} />
            </motion.div>
          ))}

          {/* Bottom row: Study plan + Go Pro */}
          <div className="flex gap-3">
            {/* Study plan box */}
            <Link
              href="/dashboard/study-plan"
              className="flex-1 flex flex-col justify-between p-6 rounded-xl card-elevated bg-background hover:card-elevated-hover transition-shadow group min-h-[160px]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <CalendarDays size={24} className="text-primary" />
                </div>
                <p className="text-base font-semibold mb-1">Study Plan</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Stay on track with your personalized weekly schedule and daily learning goals.
                </p>
              </div>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-primary">
                <span>View schedule</span>
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            {/* Go Pro box */}
            <Link
              href="/pricing"
              className="flex-1 flex flex-col justify-between p-6 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-colors group shadow-md min-h-[160px] relative overflow-hidden"
            >
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

              {/* Illustration */}
              <div className="absolute -right-2 -bottom-2 w-44 h-44 pointer-events-none">
                <Image
                  src="/illustrations/go-pro.png"
                  alt=""
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Crown size={24} className="text-white" />
                </div>
                <p className="text-base font-semibold text-white mb-1">Go Pro</p>
                <p className="text-xs text-white/80 leading-relaxed max-w-[60%]">
                  Unlock all courses, remove ads, and get priority access to new content.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1 mt-4 text-xs font-semibold text-white">
                <span>Upgrade now</span>
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </div>

          {/* Code Duel box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <div className="rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 shadow-md overflow-hidden relative">
              {/* Background decorations */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/[0.03]" />
                {/* Diagonal slash lines */}
                <div className="absolute top-0 right-20 w-px h-full bg-white/[0.06] rotate-12" />
                <div className="absolute top-0 right-32 w-px h-full bg-white/[0.04] rotate-12" />
              </div>

              {/* Top section: Header + description */}
              <div className="relative z-10 p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <Swords size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-white">Code Duel</p>
                        <span className="px-1.5 py-0.5 rounded-md bg-white/15 text-[10px] font-semibold text-white/90 uppercase tracking-wider">
                          PvP
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-0.5">
                        1v1 live coding battles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-semibold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    247 online
                  </div>
                </div>

                <p className="text-xs text-white/60 leading-relaxed mt-3">
                  Challenge a random opponent to a real-time coding battle. Solve the problem faster and more efficiently to claim victory.
                </p>
              </div>

              {/* VS matchup preview */}
              <div className="relative z-10 mx-6 p-3.5 rounded-lg bg-white/[0.08] border border-white/[0.06]">
                <div className="flex items-center justify-between">
                  {/* You */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
                      {user.displayName?.charAt(0)?.toUpperCase() || "Y"}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-white">You</p>
                      <p className="text-[10px] text-white/40">1,240 Elo</p>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/70">VS</span>
                    </div>
                  </div>

                  {/* Opponent */}
                  <div className="flex items-center gap-2.5 flex-row-reverse">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-xs font-bold text-white">
                      ?
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-semibold text-white">Random</p>
                      <p className="text-[10px] text-white/40">Matchmaking</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="relative z-10 flex items-center gap-4 px-6 mt-4">
                <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-medium">
                  <Zap size={11} className="text-amber-300/70" />
                  <span>+150 XP per win</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-medium">
                  <Shield size={11} className="text-cyan-300/70" />
                  <span>Elo Ranked</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-medium">
                  <Swords size={11} className="text-purple-300/70" />
                  <span>3 duels left today</span>
                </div>
              </div>

              {/* CTA button */}
              <div className="relative z-10 p-6 pt-4">
                <Link
                  href="/dashboard/duel"
                  className="group flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 border border-white/10 transition-colors"
                >
                  <Swords size={15} className="text-white" />
                  <span className="text-sm font-semibold text-white">Find Opponent</span>
                  <ChevronRight size={14} className="text-white/70 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
