"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  subtitle?: string;
  className?: string;
}

export function StatCard({ icon, label, value, trend, subtitle, className }: StatCardProps) {
  return (
    <div className={cn("bg-background rounded-xl border border-border/50 p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="text-muted-foreground/50">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-md",
              trend.positive
                ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30"
                : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30"
            )}
          >
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
