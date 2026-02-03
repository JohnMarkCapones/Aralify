import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogoutButton } from './logout-button';
import { CopyToken } from './copy-token';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Fetch user profile from your API
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  console.log('=== DEBUG AUTH ===');
  console.log('API URL:', apiUrl);
  console.log('Token exists:', !!token);
  console.log('Token (first 50 chars):', token?.substring(0, 50));

  let profile = null;
  let profileError = null;

  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not set!');
    profileError = 'API URL not configured';
  } else if (!token) {
    console.error('No access token available!');
    profileError = 'No access token';
  } else {
    try {
      const url = `${apiUrl}/api/v1/auth/me`;
      console.log('Fetching:', url);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      console.log('Response status:', res.status);

      if (res.ok) {
        profile = await res.json();
        console.log('Profile fetched:', profile?.email);
      } else {
        const errorText = await res.text();
        console.error('API Error:', res.status, errorText);
        profileError = `API returned ${res.status}`;
      }
    } catch (e) {
      console.error('Failed to fetch profile:', e);
      profileError = String(e);
    }
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

          {profile ? (
            <Card className="border-green-500">
              <CardHeader>
                <CardTitle className="text-green-500">✅ Your Profile</CardTitle>
                <CardDescription>From your NestJS API - IT WORKS!</CardDescription>
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
          ) : (
            <Card className="border-red-500 border-2">
              <CardHeader>
                <CardTitle className="text-red-500">❌ Profile Error - DEBUG INFO</CardTitle>
                <CardDescription>Could not load from NestJS API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <p><strong>API URL:</strong> {apiUrl || 'NOT SET!'}</p>
                  <p><strong>Token exists:</strong> {token ? '✅ Yes' : '❌ No'}</p>
                  <p><strong>Token preview:</strong> {token ? token.substring(0, 30) + '...' : 'N/A'}</p>
                  <p><strong>Error:</strong> <span className="text-red-400">{profileError || 'Unknown'}</span></p>
                  <hr className="my-2" />
                  <p className="text-xs text-gray-500">Check terminal logs for more details</p>
                </div>
              </CardContent>
            </Card>
          )}

          {token && (
            <Card className="md:col-span-2 border-blue-500">
              <CardHeader>
                <CardTitle className="text-blue-500">API Token (for Swagger)</CardTitle>
                <CardDescription>Use this token in Swagger UI to test authenticated endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <CopyToken token={token} />
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
