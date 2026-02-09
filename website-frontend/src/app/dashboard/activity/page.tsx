"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { mockActivities } from "@/lib/data/dashboard";
import type { ActivityItem } from "@/lib/data/dashboard";

type TypeFilter = "all" | ActivityItem["type"];

const FILTERS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "lesson", label: "Lessons" },
  { value: "challenge", label: "Challenges" },
  { value: "achievement", label: "Achievements" },
  { value: "social", label: "Social" },
];

function groupByDate(items: ActivityItem[]): { label: string; items: ActivityItem[] }[] {
  const now = new Date("2026-02-09T12:00:00Z");
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

export default function ActivityPage() {
  const [filter, setFilter] = useState<TypeFilter>("all");

  const filtered = filter === "all"
    ? mockActivities
    : mockActivities.filter((a) => a.type === filter);

  const groups = groupByDate(filtered);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Feed"
        description="Your recent learning activity"
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  filter === f.value ? "bg-background card-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      />

      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">{group.label}</h3>
          <div className="space-y-1">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="bg-background rounded-xl border border-border/50 shadow-sm p-4 flex items-start gap-3"
              >
                <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <div className="text-right shrink-0">
                  {item.xp !== null && item.xp > 0 && (
                    <p className="text-xs font-medium text-primary">+{item.xp} XP</p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {formatTime(item.timestamp)}
                  </p>
                </div>
              </div>
            ))}
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
