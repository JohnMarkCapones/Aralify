"use client";

import { Flame, Trophy, BookOpen } from "lucide-react";
import { XpProgressBar } from "./xp-progress-bar";
import { GameStatPill } from "./game-stat-pill";
import type { DashboardUserProfile } from "@/lib/data/dashboard";
import { getUserTitle } from "@/lib/data/dashboard";

interface CharacterZoneProps {
  user: DashboardUserProfile;
}

export function CharacterZone({ user }: CharacterZoneProps) {
  const title = getUserTitle(user.level, "en");

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <section className="rounded-2xl card-elevated bg-background p-6">
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

        {/* XP bar (desktop) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="w-36">
            <XpProgressBar current={user.xp} max={user.xpToNextLevel} size="sm" showLabel={false} />
          </div>
          <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
            {user.xp.toLocaleString()}/{(user.xpToNextLevel / 1000).toFixed(0)}K XP
          </span>
        </div>
      </div>

      {/* XP bar (mobile) */}
      <div className="sm:hidden mt-4">
        <XpProgressBar current={user.xp} max={user.xpToNextLevel} size="sm" />
      </div>

      {/* Stat pills */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <GameStatPill
          icon={Flame}
          label="Streak"
          value={`${user.streak}d`}
          iconClassName="text-orange-500"
        />
        <GameStatPill
          icon={Trophy}
          label="Rank"
          value={`#${user.rank}`}
          iconClassName="text-amber-500"
        />
        <GameStatPill
          icon={BookOpen}
          label="Lessons"
          value={user.lessonsCompleted}
          iconClassName="text-primary"
        />
      </div>
    </section>
  );
}
