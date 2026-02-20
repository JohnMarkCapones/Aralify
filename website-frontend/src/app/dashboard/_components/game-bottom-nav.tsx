"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, Target, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { icon: Home, label: "Home", href: "/dashboard", exact: true },
  { icon: BookOpen, label: "Courses", href: "/dashboard/courses", exact: false },
  { icon: Target, label: "Challenges", href: "/dashboard/challenges", exact: false },
  { icon: Users, label: "Community", href: "/dashboard/leaderboard", exact: false },
  { icon: User, label: "Profile", href: "__profile__", exact: false },
] as const;

interface GameBottomNavProps {
  onProfileClick: () => void;
}

export function GameBottomNav({ onProfileClick }: GameBottomNavProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (href === "__profile__") return false;
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      {/* Mobile: full-width bottom bar */}
      <div className="lg:hidden border-t border-border/20 bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16">
          {TABS.map((tab) => {
            const active = isActive(tab.href, tab.exact);
            const isProfile = tab.href === "__profile__";

            if (isProfile) {
              return (
                <button
                  key={tab.label}
                  onClick={onProfileClick}
                  className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-muted-foreground transition-colors"
                >
                  <tab.icon size={20} />
                  <span className="text-[11px] font-bold">{tab.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="bottomnav-indicator"
                    className="absolute -top-0.5 w-6 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <tab.icon size={20} />
                <span className="text-[11px] font-bold">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

    </nav>
  );
}
