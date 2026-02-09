import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardClient } from './dashboard-client';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let profile = null;

  if (apiUrl && token) {
    try {
      const res = await fetch(`${apiUrl}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });

      if (res.ok) {
        profile = await res.json();
      }
    } catch {
      // API unavailable — dashboard will use defaults
    }

    // Check if user needs onboarding
    if (profile && profile.onboardingCompleted === false) {
      redirect('/onboarding');
    }
  }

  return (
    <DashboardClient
      userEmail={user.email || ''}
      profile={profile}
      token={token}
    />
  );
}
