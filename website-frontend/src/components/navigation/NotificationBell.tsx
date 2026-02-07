"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/user-store";
import { useMounted } from "@/hooks/use-mounted";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function NotificationBell() {
  const mounted = useMounted();
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  const notifCount = 3; // placeholder

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 neo-brutal-border neo-brutal-shadow-sm bg-card hover:bg-primary/10 transition-colors rounded-xl cursor-pointer outline-none"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {notifCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent neo-brutal-border rounded-full flex items-center justify-center text-[10px] font-black rotate-12">
              {notifCount}
            </span>
          )}
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-72 neo-brutal-border neo-brutal-shadow-sm"
      >
        <DropdownMenuLabel className="font-display font-black">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2 space-y-1">
          {[
            {
              title: "New achievement unlocked!",
              desc: "You earned the '7-Day Streak' badge",
              time: "2m ago",
            },
            {
              title: "Course update",
              desc: "Python Fundamentals has new lessons",
              time: "1h ago",
            },
            {
              title: "Leaderboard rank up",
              desc: "You moved to #156 globally",
              time: "3h ago",
            },
          ].map((n) => (
            <div
              key={n.title}
              className="p-2.5 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
            >
              <div className="text-sm font-bold">{n.title}</div>
              <div className="text-xs text-muted-foreground font-medium">
                {n.desc}
              </div>
              <div className="text-[10px] text-muted-foreground font-bold mt-1">
                {n.time}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
