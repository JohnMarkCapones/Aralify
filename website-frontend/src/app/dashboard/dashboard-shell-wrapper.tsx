"use client";

import { GameShell } from "./_components/game-shell";

interface DashboardShellWrapperProps {
  children: React.ReactNode;
  userName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  rank: number;
  avatarUrl: string | null;
}

export function DashboardShellWrapper({
  children,
  userName,
  level,
  xp,
  xpToNextLevel,
  streak,
  rank,
  avatarUrl,
}: DashboardShellWrapperProps) {
  return (
    <GameShell
      userName={userName}
      level={level}
      xp={xp}
      xpToNextLevel={xpToNextLevel}
      streak={streak}
      rank={rank}
      avatarUrl={avatarUrl}
    >
      {children}
    </GameShell>
  );
}
