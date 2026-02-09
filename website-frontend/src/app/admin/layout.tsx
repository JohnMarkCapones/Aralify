import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShellWrapper } from "./admin-shell-wrapper";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Check user role from API
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let profile: { role?: string; username?: string; displayName?: string } | null = null;

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
      // API unavailable — allow access in dev, redirect in prod
    }
  }

  // In development without API, default to ADMIN so the dashboard is accessible.
  // In production with a live API, non-admin users get redirected.
  const isDev = process.env.NODE_ENV === "development";
  const role = profile?.role || (isDev ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "MODERATOR") {
    redirect("/dashboard");
  }

  return (
    <AdminShellWrapper
      adminRole={role as "ADMIN" | "MODERATOR"}
      adminName={profile?.displayName || profile?.username || user.email || "Admin"}
    >
      {children}
    </AdminShellWrapper>
  );
}
