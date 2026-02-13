import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.session) {
      // Register session with backend (fire-and-forget, non-blocking)
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      fetch(`${API_URL}/api/v1/auth/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }).catch(() => {
        // Backend sync is best-effort; AuthProvider will retry on client
      });

      // Check if this is a new user (created within the last 10 seconds)
      const createdAt = data.user?.created_at;
      const isNewUser =
        createdAt && Date.now() - new Date(createdAt).getTime() < 10_000;

      if (isNewUser) {
        return NextResponse.redirect(new URL("/onboarding", origin));
      }

      return NextResponse.redirect(new URL(redirect, origin));
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=Could not authenticate", origin)
  );
}
