"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ActivityItem } from "@/lib/data/dashboard";

interface ActivityTickerProps {
  activities: ActivityItem[];
}

function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffMs / 86_400_000)}d ago`;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" as const },
  }),
};

export function ActivityTicker({ activities }: ActivityTickerProps) {
  const items = activities.slice(0, 5);

  return (
    <section className="rounded-2xl card-elevated bg-background">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/10">
        <h3 className="text-sm font-semibold">Recent Activity</h3>
        <Link
          href="/dashboard/activity"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="divide-y divide-border/10">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="flex items-center gap-3 px-5 py-3"
          >
            <span className="text-base shrink-0">{item.icon}</span>
            <p className="flex-1 text-sm font-medium truncate">{item.title}</p>
            {item.xp && item.xp > 0 && (
              <span className="text-xs font-bold text-primary shrink-0 drop-shadow-[0_0_4px_hsl(var(--primary)/0.3)]">
                +{item.xp} XP
              </span>
            )}
            <span className="text-[11px] text-muted-foreground shrink-0">
              {formatRelativeTime(item.timestamp)}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
