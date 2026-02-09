"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Target,
  Users,
  BarChart3,
  Award,
  Medal,
  GraduationCap,
  Bookmark,
  CalendarCheck,
  Clock,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_NAV = [
  { icon: Home, label: "Home", href: "/dashboard", exact: true },
  { icon: BookOpen, label: "Courses", href: "/dashboard/courses", exact: false },
  { icon: Target, label: "Challenges", href: "/dashboard/daily-challenge", exact: false },
  { icon: Users, label: "Community", href: "/dashboard/leaderboard", exact: false },
];

const SECONDARY_NAV = [
  { href: "/dashboard/stats", label: "Stats", icon: BarChart3 },
  { href: "/dashboard/achievements", label: "Achievements", icon: Award },
  { href: "/dashboard/badges", label: "Badges", icon: Medal },
  { href: "/dashboard/certificates", label: "Certificates", icon: GraduationCap },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/dashboard/study-plan", label: "Study Plan", icon: CalendarCheck },
  { href: "/dashboard/activity", label: "Activity", icon: Clock },
  { href: "/dashboard/social", label: "Social", icon: Users },
];

interface GameSidebarProps {
  onProfileClick: () => void;
}

export function GameSidebar({ onProfileClick }: GameSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-20 h-fit max-h-[calc(100vh-6rem)]">
      <nav className="card-elevated rounded-2xl bg-background p-3 flex flex-col gap-1 overflow-y-auto">
        {/* Primary nav */}
        {PRIMARY_NAV.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="h-px bg-border/20 my-2" />

        {/* Secondary nav */}
        {SECONDARY_NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="h-px bg-border/20 my-2" />

        {/* Bottom section */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/settings" || pathname.startsWith("/settings/")
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>

        <button
          onClick={onProfileClick}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        >
          <User size={18} />
          <span>Profile</span>
        </button>
      </nav>
    </aside>
  );
}
