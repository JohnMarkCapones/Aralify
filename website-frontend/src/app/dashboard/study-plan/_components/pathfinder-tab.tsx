"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Flame,
  Target,
  BookOpen,
  Clock,
  CheckCircle,
  Loader2,
  Compass,
  Coffee,
  Award,
  RotateCcw,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  recommendationApi,
  gamificationApi,
  type StudyPlanResponse,
  type TodayPlanResponse,
  type StudyPlanItem,
} from "@/lib/api";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  lessons: <BookOpen size={14} />,
  xp: <Target size={14} />,
  challenges: <Flame size={14} />,
  time: <Clock size={14} />,
};

const ITEM_TYPE_META: Record<
  string,
  { Icon: typeof BookOpen; color: string; label: string }
> = {
  LEARN: { Icon: BookOpen, color: "text-primary", label: "Learn" },
  REVIEW: { Icon: RotateCcw, color: "text-purple-500", label: "Review" },
  CHALLENGE: { Icon: Zap, color: "text-amber-500", label: "Challenge" },
  REST: { Icon: Coffee, color: "text-emerald-500", label: "Rest Day" },
  MILESTONE: { Icon: Award, color: "text-orange-500", label: "Milestone" },
};

export function PathfinderTab() {
  const [plan, setPlan] = useState<StudyPlanResponse | null>(null);
  const [today, setToday] = useState<TodayPlanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    Promise.all([
      recommendationApi.getStudyPlan().catch(() => null),
      recommendationApi.getTodayPlan().catch(() => null),
      gamificationApi.getStreak().catch(() => null),
    ])
      .then(([planData, todayData, streakData]) => {
        setPlan(planData);
        setToday(todayData);
        if (streakData) setCurrentStreak(streakData.current);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCompleteItem = async (itemId: string) => {
    setCompletingId(itemId);
    try {
      await recommendationApi.completeItem(itemId);
      if (today) {
        setToday({
          ...today,
          completedCount: today.completedCount + 1,
          items: today.items.map((item) =>
            item.id === itemId
              ? { ...item, isCompleted: true, completedAt: new Date().toISOString() }
              : item
          ),
        });
      }
      if (plan) {
        setPlan({
          ...plan,
          completedDays: plan.completedDays + 1,
          completionPercentage: Math.min(
            100,
            Math.round(((plan.completedDays + 1) / plan.totalDays) * 100)
          ),
        });
      }
    } catch {
      // silently fail
    } finally {
      setCompletingId(null);
    }
  };

  const hasApiPlan = plan && !plan.message;
  const hasApiToday = today && !today.message;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── API-driven: Today's Plan ─── */}
      {hasApiToday && (
        <div className="bg-background rounded-xl border border-border/50 shadow-sm">
          <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">
                Today&apos;s Plan (Day {today.dayNumber})
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {today.completedCount}/{today.totalCount} items completed
                {today.totalEstimatedMins > 0 &&
                  ` · ~${today.totalEstimatedMins} min`}
              </p>
            </div>
            {today.totalCount > 0 && (
              <div className="text-right">
                <span
                  className={cn(
                    "text-lg font-bold",
                    today.completedCount === today.totalCount
                      ? "text-emerald-500"
                      : "text-primary"
                  )}
                >
                  {Math.round(
                    (today.completedCount / today.totalCount) * 100
                  )}
                  %
                </span>
              </div>
            )}
          </div>

          <div className="p-5 space-y-3">
            {today.items.map((item) => (
              <TodayItem
                key={item.id}
                item={item}
                isCompleting={completingId === item.id}
                onComplete={() => handleCompleteItem(item.id)}
              />
            ))}

            {today.motivationalMessage && (
              <p className="text-xs text-muted-foreground italic mt-2 text-center">
                {today.motivationalMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ─── API-driven: Overall Plan Progress ─── */}
      {hasApiPlan && (
        <div className="bg-background rounded-xl border border-border/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">
              {plan.title || "Study Plan"}
            </h3>
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                plan.status === "COMPLETED"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : plan.status === "ACTIVE"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {plan.status}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">
                Progress: {plan.completedDays}/{plan.totalDays} days
              </span>
              <span className="font-bold text-primary">
                {plan.completionPercentage}%
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  plan.completionPercentage === 100
                    ? "bg-emerald-500"
                    : "bg-primary"
                )}
                style={{ width: `${plan.completionPercentage}%` }}
              />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                <Clock size={12} className="inline mr-1" />
                {plan.dailyMinutes} min/day
              </span>
              {plan.endDate && (
                <span>
                  <CalendarCheck size={12} className="inline mr-1" />
                  Ends{" "}
                  {new Date(plan.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>

          {plan.upcomingItems && plan.upcomingItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                COMING UP
              </h4>
              <div className="space-y-2">
                {plan.upcomingItems.slice(0, 5).map((item) => {
                  const meta = ITEM_TYPE_META[item.type] || ITEM_TYPE_META.LEARN;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 text-xs"
                    >
                      <span className={cn("shrink-0", meta.color)}>
                        <meta.Icon size={12} />
                      </span>
                      <span className="font-medium truncate flex-1">
                        Day {item.dayNumber}: {item.title || meta.label}
                      </span>
                      <span className="text-muted-foreground shrink-0">
                        {item.estimatedMins}min
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── No API plan? Show CTA ─── */}
      {!hasApiPlan && !hasApiToday && (
        <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 text-center">
          <Compass size={32} className="mx-auto text-primary mb-3" />
          <h3 className="text-sm font-semibold mb-1">
            No Study Plan Yet
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Take the PathFinder quiz to get a personalized study plan
            tailored to your goals and schedule.
          </p>
          <Link
            href="/pathfinder"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Compass size={14} /> START PATHFINDER QUIZ
          </Link>
        </div>
      )}

      {/* Streak Reminder */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl border border-orange-200/50 dark:border-orange-800/30 p-5">
        <div className="flex items-center gap-3">
          <Flame size={24} className="text-orange-500 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold">
              Keep your streak alive!
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              You&apos;re on a {currentStreak}-day streak. Complete
              at least one lesson today to keep it going.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Today Item Component ────────────────────────────────────────── */

function TodayItem({
  item,
  isCompleting,
  onComplete,
}: {
  item: StudyPlanItem;
  isCompleting: boolean;
  onComplete: () => void;
}) {
  const meta = ITEM_TYPE_META[item.type] || ITEM_TYPE_META.LEARN;
  const isRest = item.type === "REST";

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-colors",
        item.isCompleted
          ? "border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/50 dark:bg-emerald-950/10"
          : "border-border/30 hover:border-border"
      )}
    >
      <span className={cn("shrink-0", meta.color)}>
        <meta.Icon size={16} />
      </span>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium truncate",
            item.isCompleted && "line-through opacity-60"
          )}
        >
          {item.title || meta.label}
        </p>
        {item.description && (
          <p className="text-xs text-muted-foreground truncate">
            {item.description}
          </p>
        )}
      </div>

      <span className="text-xs text-muted-foreground shrink-0">
        {item.estimatedMins}min
      </span>

      {!isRest && (
        <button
          onClick={onComplete}
          disabled={item.isCompleted || isCompleting}
          className={cn(
            "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            item.isCompleted
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-border hover:border-primary"
          )}
        >
          {item.isCompleted ? (
            <CheckCircle size={14} />
          ) : isCompleting ? (
            <Loader2 size={12} className="animate-spin" />
          ) : null}
        </button>
      )}
    </div>
  );
}
