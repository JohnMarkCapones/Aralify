import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShellWrapper } from "./dashboard-shell-wrapper";

interface AuthMeResponse {
  username?: string;
  displayName?: string;
  avatarUrl?: string | null;
  level?: number;
  xpTotal?: number;
  streakCurrent?: number;
}

interface GamificationProfileResponse {
  xp?: { total?: number; level?: number; progress?: { nextLevelXp?: number } };
  streak?: { current?: number };
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let profile: AuthMeResponse | null = null;
  let gamification: GamificationProfileResponse | null = null;

  if (apiUrl && token) {
    const headers = { Authorization: `Bearer ${token}` };
    const [profileRes, gamificationRes] = await Promise.allSettled([
      fetch(`${apiUrl}/api/v1/auth/me`, { headers, cache: "no-store" }),
      fetch(`${apiUrl}/api/v1/gamification/profile`, { headers, cache: "no-store" }),
    ]);

    if (profileRes.status === "fulfilled" && profileRes.value.ok) {
      profile = await profileRes.value.json();
    }
    if (gamificationRes.status === "fulfilled" && gamificationRes.value.ok) {
      gamification = await gamificationRes.value.json();
    }
  }

  const displayName = profile?.displayName || profile?.username || user.email || "Learner";

  return (
    <DashboardShellWrapper
      userName={displayName}
      level={gamification?.xp?.level ?? profile?.level ?? 1}
      xp={gamification?.xp?.total ?? profile?.xpTotal ?? 0}
      xpToNextLevel={gamification?.xp?.progress?.nextLevelXp ?? 1000}
      streak={gamification?.streak?.current ?? profile?.streakCurrent ?? 0}
      rank={0}
      avatarUrl={profile?.avatarUrl ?? null}
    >
      {children}
    </DashboardShellWrapper>
  );
}
