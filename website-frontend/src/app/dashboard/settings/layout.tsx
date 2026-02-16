"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User, Shield, Bell, Palette, Eye, ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard/settings/profile", label: "Profile", icon: <User size={18} /> },
  { href: "/dashboard/settings/account", label: "Account", icon: <Shield size={18} /> },
  { href: "/dashboard/settings/notifications", label: "Notifications", icon: <Bell size={18} /> },
  { href: "/dashboard/settings/appearance", label: "Appearance", icon: <Palette size={18} /> },
  { href: "/dashboard/settings/privacy", label: "Privacy", icon: <Eye size={18} /> },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter"
        >
          Settings
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-muted-foreground font-medium mt-1 text-sm"
        >
          Manage your profile, account preferences, and privacy.
        </motion.p>
      </div>

      {/* Sub-nav + Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings sub-nav */}
        <aside className="lg:w-56 shrink-0">
          <div className="lg:sticky lg:top-28">
            <nav className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href === "/dashboard/settings/profile" && pathname === "/dashboard/settings");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left font-bold text-sm transition-all border-b-2 border-border last:border-b-0 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    {item.icon}
                    <span className="flex-1 font-display uppercase tracking-wider text-xs">
                      {item.label}
                    </span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${
                        isActive ? "translate-x-0.5" : "opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Settings content */}
        <main className="flex-1 space-y-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
