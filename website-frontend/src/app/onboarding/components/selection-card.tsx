"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export function SelectionCard({
  selected,
  onClick,
  children,
  className,
  accentColor,
}: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03, x: -2, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative p-4 rounded-2xl neo-brutal-border text-left transition-all",
        selected
          ? "bg-primary text-primary-foreground neo-brutal-shadow-lg"
          : "bg-card text-card-foreground neo-brutal-shadow hover:neo-brutal-shadow-lg",
        accentColor && selected && accentColor,
        className
      )}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full neo-brutal-border flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-primary" strokeWidth={3} />
        </motion.div>
      )}
      {children}
    </motion.button>
  );
}
