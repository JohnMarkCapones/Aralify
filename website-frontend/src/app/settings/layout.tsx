"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { DotPattern, FloatingShapes } from "@/components/effects";
import {
  User, Shield, Bell, Palette, Eye, ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/settings/profile", label: "Profile", icon: <User size={18} /> },
  { href: "/settings/account", label: "Account", icon: <Shield size={18} /> },
  { href: "/settings/notifications", label: "Notifications", icon: <Bell size={18} /> },
  { href: "/settings/appearance", label: "Appearance", icon: <Palette size={18} /> },
  { href: "/settings/privacy", label: "Privacy", icon: <Eye size={18} /> },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <PageShell>
      {/* Page Header */}
      <section className="relative bg-card border-b-4 border-border overflow-hidden">
        <DotPattern />
        <FloatingShapes
          shapes={[
            { type: "circle", size: 30, x: "90%", y: "20%", color: "bg-primary", delay: 0, duration: 10 },
            { type: "square", size: 20, x: "5%", y: "60%", color: "bg-secondary", delay: 1, duration: 8, rotate: 45 },
            { type: "diamond", size: 24, x: "80%", y: "70%", color: "bg-accent", delay: 2, duration: 9 },
          ]}
        />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter"
          >
            Settings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-medium mt-2 text-lg"
          >
            Manage your profile, account preferences, and privacy.
          </motion.p>
        </div>
      </section>

      {/* Sidebar + Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-28">
              <nav className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || (item.href === "/settings/profile" && pathname === "/settings");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`w-full flex items-center gap-3 px-5 py-4 text-left font-bold text-sm transition-all border-b-2 border-border last:border-b-0 ${
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

          {/* Main Content */}
          <main className="flex-1 space-y-8 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </PageShell>
  );
}
