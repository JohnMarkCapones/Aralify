import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingClient } from "./onboarding-client";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Check if user already completed onboarding (server-side check)
  if (apiUrl && token) {
    try {
      const res = await fetch(`${apiUrl}/api/v1/users/onboarding/status`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (res.ok) {
        const status = await res.json();
        if (status.onboardingCompleted) {
          redirect("/dashboard");
        }
      }
    } catch {
      // API unavailable — allow onboarding to proceed
    }
  }

  return <OnboardingClient userEmail={user.email || ""} />;
}
