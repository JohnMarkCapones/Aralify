import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ActivityClient } from './activity-client';

export default async function ActivityPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return <ActivityClient userEmail={user.email || ''} />;
}
