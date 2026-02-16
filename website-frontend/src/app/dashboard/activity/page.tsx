"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, Swords, Trophy, Users, Zap, Flame, Activity, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { useActivityFeed } from "@/hooks/api";

interface ActivityItem {
  id: string;
  type: "lesson" | "challenge" | "achievement" | "social" | "badge" | "streak" | "xp";
  title: string;
  description: string;
  xp: number | null;
  timestamp: string;
  icon: string;
  relatedUrl?: string;
}

type TypeFilter = "all" | ActivityItem["type"];

const FILTERS: { value: TypeFilter; label: string; color: string }[] = [
  { value: "all", label: "All", color: "bg-primary text-primary-foreground" },
  { value: "lesson", label: "Lessons", color: "bg-blue-500 text-white" },
  { value: "challenge", label: "Challenges", color: "bg-orange-500 text-white" },
  { value: "achievement", label: "Achievements", color: "bg-purple-500 text-white" },
  { value: "social", label: "Social", color: "bg-emerald-500 text-white" },
];

const TYPE_STYLES: Record<string, { border: string; iconBg: string; iconColor: string }> = {
  lesson: {
    border: "border-l-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  challenge: {
    border: "border-l-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-950/40",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  achievement: {
    border: "border-l-purple-500",
    iconBg: "bg-purple-100 dark:bg-purple-950/40",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  social: {
    border: "border-l-emerald-500",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  badge: {
    border: "border-l-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-950/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  streak: {
    border: "border-l-red-500",
    iconBg: "bg-red-100 dark:bg-red-950/40",
    iconColor: "text-red-600 dark:text-red-400",
  },
  xp: {
    border: "border-l-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
};

const DATE_BORDER_COLORS: Record<string, string> = {
  Today: "border-l-blue-500",
  Yesterday: "border-l-purple-500",
  "This Week": "border-l-emerald-500",
  Earlier: "border-l-amber-500",
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: "easeOut" as const },
  }),
};

function groupByDate(items: ActivityItem[]): { label: string; items: ActivityItem[] }[] {
  const now = new Date();
  const today = now.toDateString();
  const yesterday = new Date(now.getTime() - 86_400_000).toDateString();

  const groups: Record<string, ActivityItem[]> = {};

  items.forEach((item) => {
    const date = new Date(item.timestamp);
    const dateStr = date.toDateString();
    let label: string;

    if (dateStr === today) label = "Today";
    else if (dateStr === yesterday) label = "Yesterday";
    else {
      const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
      if (diffDays < 7) label = "This Week";
      else label = "Earlier";
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });

  const order = ["Today", "Yesterday", "This Week", "Earlier"];
  return order.filter((l) => groups[l]).map((label) => ({ label, items: groups[label] }));
}

function mapActivityType(type: string): ActivityItem["type"] {
  const map: Record<string, ActivityItem["type"]> = {
    lesson_completed: "lesson",
    achievement_unlocked: "achievement",
    badge_earned: "badge",
    streak_milestone: "streak",
    challenge_completed: "challenge",
    course_started: "lesson",
    course_completed: "achievement",
    level_up: "xp",
  };
  return map[type] || "lesson";
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<TypeFilter>("all");
  const { data: feedData, isLoading } = useActivityFeed({ limit: 50 });

  const allActivities: ActivityItem[] = (feedData?.activities ?? []).map((a) => ({
    id: a.id,
    type: mapActivityType(a.type),
    title: (a.data?.title as string) || a.type.replace(/_/g, " "),
    description: (a.data?.description as string) || `${a.displayName} ${a.type.replace(/_/g, " ")}`,
    xp: (a.data?.xp as number) || null,
    timestamp: a.createdAt,
    icon: a.type,
    relatedUrl: a.data?.url as string | undefined,
  }));

  const filtered = filter === "all"
    ? allActivities
    : allActivities.filter((a) => a.type === filter);

  const groups = groupByDate(filtered);

  // Stats
  const totalXp = allActivities.reduce((sum, a) => sum + (a.xp ?? 0), 0);
  const lessonCount = allActivities.filter((a) => a.type === "lesson").length;
  const challengeCount = allActivities.filter((a) => a.type === "challenge").length;

  const stats = [
    { icon: Activity, label: "Activities", value: allActivities.length, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-950/40" },
    { icon: Zap, label: "XP Earned", value: `+${totalXp}`, color: "text-primary", bg: "bg-primary/10" },
    { icon: BookOpen, label: "Lessons", value: lessonCount, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-950/40" },
    { icon: Swords, label: "Challenges", value: challengeCount, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-950/40" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Feed"
        description="Your recent learning activity"
        actions={
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  filter === f.value
                    ? f.color
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-sm"
          >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {groups.map((group) => (
        <div key={group.label}>
          <div className={cn(
            "border-l-4 pl-3 mb-3",
            DATE_BORDER_COLORS[group.label] || "border-l-muted-foreground"
          )}>
            <h3 className="text-xs font-semibold text-muted-foreground">{group.label}</h3>
          </div>
          <div className="space-y-2">
            {group.items.map((item, i) => {
              const style = TYPE_STYLES[item.type] || TYPE_STYLES.xp;
              return (
                <motion.div
                  key={item.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  variants={cardVariants}
                  whileHover={{ y: -2 }}
                  className={cn(
                    "bg-background rounded-xl border border-border/50 shadow-sm p-4 flex items-start gap-3",
                    "border-l-4",
                    style.border
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    style.iconBg
                  )}>
                    <span className="text-sm">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {item.xp !== null && item.xp > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        <Zap size={10} />
                        +{item.xp} XP
                      </span>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {formatTime(item.timestamp)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Clock size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No activity found</p>
          <p className="text-xs mt-1">Try changing the filter</p>
        </div>
      )}
    </div>
  );
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}
