"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { authApi } from "@/lib/api";
import { useUserStore } from "@/stores/user-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useUserStore();
  const initialized = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    async function syncUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        try {
          const me = await authApi.getMe();
          setUser({
            id: me.id,
            email: me.email,
            username: me.username,
            displayName: me.displayName,
            avatarUrl: me.avatarUrl,
            xpTotal: me.xpTotal,
            level: me.level,
            streakCurrent: me.streakCurrent,
          });
        } catch {
          // Backend might not be reachable; keep existing store state
        }
      }
    }

    if (!initialized.current) {
      initialized.current = true;
      syncUser();
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        try {
          await authApi.registerSession().catch(() => {});
          const me = await authApi.getMe();
          setUser({
            id: me.id,
            email: me.email,
            username: me.username,
            displayName: me.displayName,
            avatarUrl: me.avatarUrl,
            xpTotal: me.xpTotal,
            level: me.level,
            streakCurrent: me.streakCurrent,
          });
        } catch {
          // Backend sync failed; user is still authenticated via Supabase
        }
      } else if (event === "SIGNED_OUT") {
        logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, logout]);

  return <>{children}</>;
}
