"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Search, User, MoreHorizontal, Zap, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/user-store";
import { useMounted } from "@/hooks/use-mounted";

interface MobileBottomNavProps {
  onMorePress: () => void;
}

export function MobileBottomNav({ onMorePress }: MobileBottomNavProps) {
  const pathname = usePathname();
  const mounted = useMounted();
  const { user, isAuthenticated } = useUserStore();

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/__search__", label: "Search", icon: Search },
    {
      href: isAuthenticated ? "/dashboard" : "/login",
      label: isAuthenticated ? "Profile" : "Login",
      icon: User,
    },
    { href: "/__more__", label: "More", icon: MoreHorizontal },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/__")) return false;
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden">
      {/* Auth-aware mini bar */}
      {mounted && isAuthenticated && user && (
        <div className="flex items-center justify-center gap-4 py-1 bg-card/80 backdrop-blur-sm border-t-2 border-border text-[10px] font-black">
          <span className="flex items-center gap-1 text-primary">
            <Zap size={10} /> {user.xpTotal.toLocaleString()} XP
          </span>
          {user.streakCurrent > 0 && (
            <span className="flex items-center gap-1 text-orange-500">
              <Flame size={10} /> {user.streakCurrent} day streak
            </span>
          )}
        </div>
      )}

      <nav className="bg-background/95 backdrop-blur-xl border-t-4 border-border pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around px-2 h-16">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const isSpecial = item.href.startsWith("/__");

            const handleClick = (e: React.MouseEvent) => {
              if (item.href === "/__more__") {
                e.preventDefault();
                onMorePress();
              }
              if (item.href === "/__search__") {
                e.preventDefault();
                // Trigger Ctrl+K
                document.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    key: "k",
                    ctrlKey: true,
                    bubbles: true,
                  })
                );
              }
            };

            const content = (
              <div className="relative flex flex-col items-center gap-0.5 py-1 px-3">
                {active && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={`transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-[10px] font-bold transition-colors ${
                    active
                      ? "text-primary font-black"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );

            if (isSpecial) {
              return (
                <button
                  key={item.href}
                  onClick={handleClick}
                  className="cursor-pointer outline-none"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link key={item.href} href={item.href} onClick={handleClick}>
                {content}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
