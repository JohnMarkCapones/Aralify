"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="w-14 h-8 neo-brutal-border rounded-full bg-card" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-8 neo-brutal-border rounded-full bg-card hover:bg-primary/10 transition-colors cursor-pointer"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 neo-brutal-border rounded-full bg-primary flex items-center justify-center"
        animate={{ left: isDark ? "calc(100% - 26px)" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon size={12} className="text-primary-foreground" />
          ) : (
            <Sun size={12} className="text-primary-foreground" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
