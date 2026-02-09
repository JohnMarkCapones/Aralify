"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface GameStatPillProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconClassName?: string;
  className?: string;
}

export function GameStatPill({
  icon: Icon,
  label,
  value,
  iconClassName,
  className,
}: GameStatPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/20 bg-muted/30 text-xs font-semibold",
        className
      )}
    >
      <Icon size={14} className={cn("shrink-0", iconClassName)} />
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
