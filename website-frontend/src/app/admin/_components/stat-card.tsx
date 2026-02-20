"use client";

import { cn } from "@/lib/utils";

type AccentColor = "blue" | "cyan" | "purple" | "emerald" | "amber" | "orange" | "rose";

const ACCENT_STYLES: Record<AccentColor, { icon: string; glow: string; border: string }> = {
  blue:    { icon: "bg-blue-500/15 text-blue-400",    glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",  border: "from-blue-500/50 via-blue-500/10 to-transparent" },
  cyan:    { icon: "bg-cyan-500/15 text-cyan-400",    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",   border: "from-cyan-500/50 via-cyan-500/10 to-transparent" },
  purple:  { icon: "bg-purple-500/15 text-purple-400",  glow: "shadow-[0_0_15px_rgba(139,92,246,0.15)]",  border: "from-purple-500/50 via-purple-500/10 to-transparent" },
  emerald: { icon: "bg-emerald-500/15 text-emerald-400", glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]", border: "from-emerald-500/50 via-emerald-500/10 to-transparent" },
  amber:   { icon: "bg-amber-500/15 text-amber-400",   glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",  border: "from-amber-500/50 via-amber-500/10 to-transparent" },
  orange:  { icon: "bg-orange-500/15 text-orange-400",  glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)]",  border: "from-orange-500/50 via-orange-500/10 to-transparent" },
  rose:    { icon: "bg-rose-500/15 text-rose-400",    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",   border: "from-rose-500/50 via-rose-500/10 to-transparent" },
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  subtitle?: string;
  className?: string;
  accentColor?: AccentColor;
}

export function StatCard({ icon, label, value, trend, subtitle, className, accentColor = "blue" }: StatCardProps) {
  const accent = ACCENT_STYLES[accentColor];

  return (
    <div className={cn(
      "relative bg-[#111827]/80 rounded-xl border border-[#1e293b] p-4 overflow-hidden",
      accent.glow,
      className
    )}>
      {/* Top gradient border accent */}
      <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", accent.border)} />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", accent.icon)}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-md",
              trend.positive
                ? "text-emerald-400 bg-emerald-500/10 shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                : "text-red-400 bg-red-500/10 shadow-[0_0_8px_rgba(239,68,68,0.1)]"
            )}
          >
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
