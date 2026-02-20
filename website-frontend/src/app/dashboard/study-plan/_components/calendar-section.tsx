"use client";

import { cn } from "@/lib/utils";
import { getWeekDates, getTodayStr } from "./use-planner-store";
import type { PlannerTask } from "./use-planner-store";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CATEGORY_DOT_COLORS: Record<PlannerTask["category"], string> = {
  lesson: "bg-blue-500",
  review: "bg-purple-500",
  challenge: "bg-amber-500",
  practice: "bg-emerald-500",
  other: "bg-gray-400",
};

interface CalendarSectionProps {
  tasks: PlannerTask[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function CalendarSection({
  tasks,
  selectedDate,
  onSelectDate,
}: CalendarSectionProps) {
  const weekDates = getWeekDates();
  const todayStr = getTodayStr();

  return (
    <div className="bg-background rounded-xl border border-border/50 p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4">This Week</h3>
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, i) => {
          const dateStr = date.toISOString().split("T")[0];
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;
          const dayTasks = tasks.filter((t) => t.date === dateStr);
          const completedCount = dayTasks.filter((t) => t.isCompleted).length;
          const totalCount = dayTasks.length;
          const categories = [...new Set(dayTasks.map((t) => t.category))];

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={cn(
                "rounded-lg border p-2.5 text-center transition-all cursor-pointer",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : isToday
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/30 hover:border-border"
              )}
            >
              <p
                className={cn(
                  "text-[10px] font-medium mb-1",
                  isSelected || isToday
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {DAY_NAMES[i]}
              </p>
              <p
                className={cn(
                  "text-lg font-bold leading-tight",
                  isSelected
                    ? "text-primary"
                    : isToday
                      ? "text-foreground"
                      : "text-foreground/80"
                )}
              >
                {date.getDate()}
              </p>

              {/* Task count */}
              {totalCount > 0 && (
                <p
                  className={cn(
                    "text-[9px] font-medium mt-1",
                    completedCount === totalCount
                      ? "text-emerald-500"
                      : "text-muted-foreground"
                  )}
                >
                  {completedCount}/{totalCount}
                </p>
              )}

              {/* Category dots */}
              {categories.length > 0 && (
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {categories.slice(0, 3).map((cat) => (
                    <div
                      key={cat}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        CATEGORY_DOT_COLORS[cat]
                      )}
                    />
                  ))}
                </div>
              )}

              {isToday && !totalCount && (
                <p className="text-[9px] font-medium text-primary mt-1">Today</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
