import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShellWrapper } from "./dashboard-shell-wrapper";
import { mockUserProfile } from "@/lib/data/dashboard";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let profile: { username?: string; displayName?: string } | null = null;

  if (apiUrl && token) {
    try {
      const res = await fetch(`${apiUrl}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        profile = await res.json();
      }
    } catch {
      // API unavailable — dashboard will use defaults
    }
  }

  const displayName = profile?.displayName || profile?.username || user.email || "Learner";

  return (
    <DashboardShellWrapper
      userName={displayName}
      level={mockUserProfile.level}
      xp={mockUserProfile.xp}
      xpToNextLevel={mockUserProfile.xpToNextLevel}
      streak={mockUserProfile.streak}
      rank={mockUserProfile.rank}
      avatarUrl={mockUserProfile.avatarUrl}
    >
      {children}
    </DashboardShellWrapper>
  );
}
