import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('=== AUTH CALLBACK START ===');

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirect = searchParams.get('redirect') || '/dashboard';

  console.log('Code exists:', !!code);
  console.log('Redirect to:', redirect);

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('Exchange result - Error:', error?.message || 'none');
    console.log('Exchange result - User:', data?.user?.email || 'none');
    console.log('Exchange result - Session:', !!data?.session);

    if (!error && data?.session) {
      console.log('Session token (first 50):', data.session.access_token?.substring(0, 50));
      console.log('=== AUTH CALLBACK SUCCESS - Redirecting to', redirect, '===');
      return NextResponse.redirect(`${origin}${redirect}`);
    }

    console.error('Auth callback error:', error);
  }

  console.log('=== AUTH CALLBACK FAILED ===');
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate`);
}
