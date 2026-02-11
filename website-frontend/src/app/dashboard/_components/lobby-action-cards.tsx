"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardUserProfile } from "@/lib/data/dashboard";

interface LobbyActionCardsProps {
  user: DashboardUserProfile;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

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
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <Link href={card.href}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "p-5 rounded-xl card-elevated bg-gradient-to-br transition-shadow hover:card-elevated-hover group",
                  card.gradient
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <card.icon
                    size={24}
                    className={cn(card.iconColor, "group-hover:scale-110 transition-transform")}
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {card.label}
                  </span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground">{card.stat}</p>
                {card.progress !== undefined && (
                  <div className="mt-2 h-1 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.progress * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                )}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
