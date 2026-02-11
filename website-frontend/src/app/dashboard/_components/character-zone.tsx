"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Trophy, BookOpen, ArrowRight } from "lucide-react";
import { XpProgressBar } from "./xp-progress-bar";
import { GameStatPill } from "./game-stat-pill";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import type { DashboardUserProfile } from "@/lib/data/dashboard";
import { getUserTitle } from "@/lib/data/dashboard";

interface CharacterZoneProps {
  user: DashboardUserProfile;
}

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function CharacterZone({ user }: CharacterZoneProps) {
  const title = getUserTitle(user.level, "en");

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <section className="rounded-2xl card-elevated bg-background overflow-visible">
      <div className="flex flex-col lg:flex-row">
        {/* Left side: user info */}
        <div className="flex-1 min-w-0 p-6">
          {/* Top row: avatar + name + XP bar */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center shrink-0 bg-gradient-to-br from-primary/20 to-primary/5">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-display text-primary">
                  {user.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Name + title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-semibold truncate">
                  {greeting}, {user.displayName}!
                </h2>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                  LVL {user.level}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>

          </div>

          {/* Stat pills with staggered entrance */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={statVariants}
            >
              <GameStatPill
                icon={Flame}
                label="Streak"
                value={<AnimatedCounter target={user.streak} suffix="d" duration={1.2} className="font-bold" />}
                iconClassName="text-orange-500"
                animateIcon="flame"
              />
            </motion.div>
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={statVariants}
            >
              <GameStatPill
                icon={Trophy}
                label="Rank"
                value={<AnimatedCounter target={user.rank} prefix="#" duration={1.2} className="font-bold" />}
                iconClassName="text-amber-500"
              />
            </motion.div>
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={statVariants}
            >
              <GameStatPill
                icon={BookOpen}
                label="Lessons"
                value={<AnimatedCounter target={user.lessonsCompleted} duration={1.2} className="font-bold" />}
                iconClassName="text-primary"
              />
            </motion.div>
          </div>
        </div>

        {/* Right side: Journey banner */}
        <div className="relative overflow-visible bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-5 lg:w-[50%] flex-shrink-0 rounded-r-2xl">
          <div className="relative z-10">
            <h3 className="text-xl font-display font-bold text-white leading-tight">
              Let&apos;s Start
              <br />
              your Journey
            </h3>
            <Link
              href="/dashboard/courses"
              className="mt-3 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 transition-colors group"
            >
              <span className="text-sm font-semibold text-white">Explore Courses</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {/* Character image - floating animation */}
          <img
            src="/journey-character.png"
            alt="Journey character"
            className="absolute -bottom-20 -right-2 h-[190%] object-contain pointer-events-none drop-shadow-lg animate-float"
          />
          {/* Decorative shapes */}
          <div className="absolute top-3 right-3 grid grid-cols-3 gap-1 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
            ))}
          </div>
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full border-[3px] border-white/10 animate-[spin_60s_linear_infinite]" />
          <div className="absolute -bottom-12 -left-6 w-24 h-24 rounded-full border-[3px] border-white/10 animate-[spin_45s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rotate-45 border-[3px] border-white/[0.07] rounded-md" />
          <div className="absolute top-4 left-[40%] w-3 h-3 bg-white/15 rounded-full" />
          <div className="absolute bottom-6 left-[20%] w-2 h-2 bg-white/20 rounded-full" />
          <div className="absolute top-[60%] left-[15%] w-10 h-10 rotate-12 border-2 border-white/[0.08] rounded-lg" />
        </div>
      </div>
    </section>
  );
}
