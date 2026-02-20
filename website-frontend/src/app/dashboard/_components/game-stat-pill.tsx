"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface GameStatPillProps {
  icon: LucideIcon;
  label: string;
  value: string | number | ReactNode;
  iconClassName?: string;
  className?: string;
  animateIcon?: "flame" | "pulse";
}

export function GameStatPill({
  icon: Icon,
  label,
  value,
  iconClassName,
  className,
  animateIcon,
}: GameStatPillProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/20 bg-muted/30 text-xs font-semibold cursor-default",
        className
      )}
    >
      <Icon
        size={14}
        className={cn(
          "shrink-0",
          iconClassName,
          animateIcon === "flame" && "animate-flame",
          animateIcon === "pulse" && "group-hover:animate-pulse"
        )}
      />
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold">{value}</span>
    </motion.div>
  );
}
