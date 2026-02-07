"use client";

import Link from "next/link";
import { Zap, Flame, User, BookOpen, Trophy, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/user-store";
import { useMounted } from "@/hooks/use-mounted";
import { NeoButton } from "@/components/ui/neo-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedCounter } from "@/components/effects";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function UserNavSection() {
  const mounted = useMounted();
  const { user, isAuthenticated, logout } = useUserStore();

  if (!mounted) {
    return <div className="w-32 h-10" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="font-display font-black hover:text-primary transition-colors cursor-pointer"
        >
          LOGIN
        </Link>
        <NeoButton size="md" variant="primary" className="rounded-2xl">
          Get Started
        </NeoButton>
      </div>
    );
  }

  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.username.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-2">
      {/* XP Badge */}
      <motion.div
        whileHover={{ y: -2 }}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 neo-brutal-border rounded-full cursor-default"
      >
        <Zap size={14} className="text-primary" />
        <AnimatedCounter
          target={user.xpTotal}
          className="text-xs font-black text-primary"
          duration={1}
        />
      </motion.div>

      {/* Streak Badge */}
      {user.streakCurrent > 0 && (
        <motion.div
          whileHover={{ y: -2 }}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/30 neo-brutal-border rounded-full cursor-default"
        >
          <Flame size={14} className="text-orange-500" />
          <span className="text-xs font-black">{user.streakCurrent}</span>
        </motion.div>
      )}

      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer outline-none">
            <Avatar size="default" className="neo-brutal-border">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.displayName || user.username} />
              ) : null}
              <AvatarFallback className="bg-primary text-primary-foreground font-black text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 neo-brutal-border neo-brutal-shadow-sm"
        >
          <DropdownMenuLabel className="font-display">
            <div className="font-black">{user.displayName || user.username}</div>
            <div className="text-xs font-medium text-muted-foreground">
              Level {user.level}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                <User size={16} />
                <span className="font-bold">Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/courses" className="cursor-pointer">
                <BookOpen size={16} />
                <span className="font-bold">My Courses</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                <Trophy size={16} />
                <span className="font-bold">Achievements</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings size={16} />
                <span className="font-bold">Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => logout()}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut size={16} />
            <span className="font-bold">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
