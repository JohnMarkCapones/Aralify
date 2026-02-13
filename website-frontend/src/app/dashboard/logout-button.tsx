'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { authApi } from '@/lib/api';
import { useUserStore } from '@/stores/user-store';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useUserStore();

  const handleLogout = async () => {
    // Revoke backend session first
    try {
      await authApi.logout();
    } catch {
      // Continue with client-side logout even if backend fails
    }

    // Clear Supabase session
    const supabase = createClient();
    await supabase.auth.signOut();

    // Clear Zustand store
    logout();

    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
      aria-label="Log out"
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
