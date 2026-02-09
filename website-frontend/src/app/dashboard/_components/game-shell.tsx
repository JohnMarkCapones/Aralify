"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GameHudBar } from "./game-hud-bar";
import { GameBottomNav } from "./game-bottom-nav";
import { GameSidebar } from "./game-sidebar";
import { ProfileDrawer } from "./profile-drawer";

interface GameShellProps {
  children: React.ReactNode;
  userName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  rank: number;
  avatarUrl: string | null;
}

export function GameShell({
  children,
  userName,
  level,
  xp,
  xpToNextLevel,
  streak,
  rank,
  avatarUrl,
}: GameShellProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <GameHudBar
        userName={userName}
        xp={xp}
        xpToNextLevel={xpToNextLevel}
        streak={streak}
        rank={rank}
        avatarUrl={avatarUrl}
        onAvatarClick={() => setProfileOpen(true)}
      />

      <main className="pb-28 lg:pb-8">
        <div className="max-w-[1400px] mx-auto p-4 lg:p-8 lg:flex lg:gap-6">
          <GameSidebar onProfileClick={() => setProfileOpen(true)} />
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <GameBottomNav onProfileClick={() => setProfileOpen(true)} />

      <ProfileDrawer
        open={profileOpen}
        onOpenChange={setProfileOpen}
        userName={userName}
        level={level}
        xp={xp}
        xpToNextLevel={xpToNextLevel}
        avatarUrl={avatarUrl}
      />
    </div>
  );
}
