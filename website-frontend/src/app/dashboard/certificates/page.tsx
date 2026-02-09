import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CertificatesClient } from './certificates-client';

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return <CertificatesClient userEmail={user.email || ''} />;
}
