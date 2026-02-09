"use client";

import Link from "next/link";
import { BookOpen, Trophy, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardUserProfile } from "@/lib/data/dashboard";

interface LobbyActionCardsProps {
  user: DashboardUserProfile;
}

export function LobbyActionCards({ user }: LobbyActionCardsProps) {
  const cards = [
    {
      label: "My Courses",
      icon: BookOpen,
      href: "/dashboard/courses",
      stat: `${user.coursesEnrolled} enrolled \u00B7 ${user.coursesCompleted} completed`,
      gradient: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
    {
      label: "Leaderboard",
      icon: Trophy,
      href: "/dashboard/leaderboard",
      stat: `#${user.rank} \u00B7 Top ${((user.rank / user.totalUsers) * 100).toFixed(1)}%`,
      gradient: "from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-900/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Achievements",
      icon: Award,
      href: "/dashboard/achievements",
      stat: `${user.achievementsUnlocked}/15 unlocked`,
      gradient: "from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      progress: user.achievementsUnlocked / 15,
    },
    {
      label: "Social",
      icon: Users,
      href: "/dashboard/social",
      stat: `${user.followingCount} following \u00B7 ${user.followersCount} followers`,
      gradient: "from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-900/10",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div
              className={cn(
                "p-5 rounded-xl card-elevated bg-gradient-to-br transition-shadow hover:card-elevated-hover",
                card.gradient
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <card.icon size={24} className={card.iconColor} />
                <span className="text-xs font-medium text-muted-foreground">
                  {card.label}
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground">{card.stat}</p>
              {card.progress !== undefined && (
                <div className="mt-2 h-1 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${card.progress * 100}%` }}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
