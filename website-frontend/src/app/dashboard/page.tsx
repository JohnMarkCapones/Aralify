import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogoutButton } from './logout-button';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Fetch user profile from your API
  const token = (await supabase.auth.getSession()).data.session?.access_token;

  let profile = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (res.ok) {
      profile = await res.json();
    }
  } catch (e) {
    console.error('Failed to fetch profile:', e);
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>You are logged in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Supabase ID:</strong> {user.id}</p>
                <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {profile && (
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>From your NestJS API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Username:</strong> {profile.username}</p>
                  <p><strong>Display Name:</strong> {profile.displayName}</p>
                  <p><strong>Level:</strong> {profile.level}</p>
                  <p><strong>XP:</strong> {profile.xpTotal}</p>
                  <p><strong>Streak:</strong> {profile.streakCurrent} days</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/profile">Edit Profile</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
