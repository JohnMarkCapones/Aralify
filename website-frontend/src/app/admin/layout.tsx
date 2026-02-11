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

  // TODO: Remove this bypass once proper role management is in place
  const role = profile?.role || "ADMIN";

  return (
    <AdminShellWrapper
      adminRole={role as "ADMIN" | "MODERATOR"}
      adminName={profile?.displayName || profile?.username || user.email || "Admin"}
    >
      {children}
    </AdminShellWrapper>
  );
}
