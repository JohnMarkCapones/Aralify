"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, Bell, Flame, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { XpProgressBar } from "./xp-progress-bar";

interface GameHudBarProps {
  userName: string;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  rank: number;
  avatarUrl: string | null;
  onAvatarClick: () => void;
}

export function GameHudBar({
  userName,
  xp,
  xpToNextLevel,
  streak,
  rank,
  avatarUrl,
  onAvatarClick,
}: GameHudBarProps) {
  const pathname = usePathname();
  const isHub = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border/20 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-3 lg:px-5 max-w-[1400px] mx-auto">
        {/* Left: logo / back */}
        <div className="flex items-center gap-2">
          {!isHub && (
            <Link
              href="/dashboard"
              className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
            >
              <ChevronLeft size={18} />
            </Link>
          )}
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Aralify"
              width={381}
              height={154}
              className="object-contain"
              style={{ height: "64px", width: "auto" }}
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Center: search (desktop) */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
            />
            <input
              placeholder="Search courses, lessons..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-border/20 bg-muted/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              readOnly
            />
          </div>
        </div>

        {/* Right: stats + actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* XP bar - desktop only */}
          <div className="hidden lg:block w-36">
            <XpProgressBar current={xp} max={xpToNextLevel} size="sm" showLabel={false} shimmer />
          </div>
          <span className="hidden lg:inline-flex text-xs font-bold text-muted-foreground">
            {xp.toLocaleString()}/{(xpToNextLevel / 1000).toFixed(0)}K
          </span>

          {/* Streak */}
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-bold",
              streak >= 7 && "text-orange-400 drop-shadow-[0_0_6px_rgba(251,146,60,0.5)]"
            )}
          >
            <Flame size={16} className="text-orange-500 animate-flame" />
            <span>{streak}</span>
          </div>

          {/* Rank - desktop only with shimmer */}
          <span className="hidden lg:inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 relative overflow-hidden">
            #{rank}
            <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] pointer-events-none" />
          </span>

          {/* Notification bell */}
          <button className="relative p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
            <Bell size={17} className="animate-[bounce_1s_ease-in-out_1]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Avatar */}
          <button
            onClick={onAvatarClick}
            className={cn(
              "w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center shrink-0 text-xs font-bold",
              "bg-gradient-to-br from-primary/20 to-primary/5 text-primary hover:ring-2 hover:ring-primary/30 transition-all"
            )}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
