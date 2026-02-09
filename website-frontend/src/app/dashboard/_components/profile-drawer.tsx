"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BarChart3, Award, Medal, GraduationCap, Bookmark,
  CalendarCheck, Users, Clock, Settings, LogOut, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { XpProgressBar } from "./xp-progress-bar";

const NAV_LINKS = [
  { href: "/dashboard/stats", label: "Stats", icon: BarChart3 },
  { href: "/dashboard/achievements", label: "Achievements", icon: Award },
  { href: "/dashboard/badges", label: "Badges", icon: Medal },
  { href: "/dashboard/certificates", label: "Certificates", icon: GraduationCap },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/dashboard/study-plan", label: "Study Plan", icon: CalendarCheck },
  { href: "/dashboard/activity", label: "Activity", icon: Clock },
  { href: "/dashboard/social", label: "Social", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface ProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  avatarUrl: string | null;
}

export function ProfileDrawer({
  open,
  onOpenChange,
  userName,
  level,
  xp,
  xpToNextLevel,
  avatarUrl,
}: ProfileDrawerProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    onOpenChange(false);
    router.push("/login");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed z-50 bg-background border border-border/20 overflow-y-auto",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            // Mobile: bottom sheet
            "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl lg:rounded-t-none",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            // Desktop: right panel
            "lg:inset-y-0 lg:right-0 lg:left-auto lg:w-80 lg:max-h-none lg:rounded-none",
            "lg:data-[state=closed]:slide-out-to-right lg:data-[state=open]:slide-in-from-right"
          )}
        >
          {/* Drag handle (mobile) */}
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/20">
            <Dialog.Title className="font-display text-sm tracking-tight">
              Profile
            </Dialog.Title>
            <Dialog.Close className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
              <X size={16} />
            </Dialog.Close>
          </div>

          {/* Mini character card */}
          <div className="px-5 py-4 border-b border-border/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-lg font-bold bg-gradient-to-br from-primary/20 to-primary/5 text-primary shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{userName}</p>
                <p className="text-xs text-muted-foreground">Level {level}</p>
              </div>
            </div>
            <XpProgressBar current={xp} max={xpToNextLevel} size="sm" />
          </div>

          {/* Nav links grid */}
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => onOpenChange(false)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg border border-border/20 bg-muted/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <link.icon size={18} />
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="px-4 pb-6 lg:pb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border/20 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
