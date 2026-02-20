"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, BookOpen, BarChart3, Shield,
  ScrollText, Settings, Code2, Menu, X, Bell, LogOut,
  ChevronRight, Search, Activity, Gamepad2, FileBarChart,
  ChevronLeft,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/realtime", label: "Real-Time", icon: Activity },
    ],
  },
  {
    title: "Management",
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/content", label: "Content", icon: BookOpen },
      { href: "/admin/gamification", label: "Gamification", icon: Gamepad2 },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/admin/moderation", label: "Moderation", icon: Shield },
      { href: "/admin/audit", label: "Audit Logs", icon: ScrollText },
      { href: "/admin/reports", label: "Reports", icon: FileBarChart },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

interface AdminShellProps {
  children: React.ReactNode;
  adminRole?: "ADMIN" | "MODERATOR";
  adminName?: string;
}

export function AdminShell({ children, adminRole = "ADMIN", adminName = "Admin" }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center h-14 border-b border-white/[0.06] shrink-0",
        collapsed && !mobile ? "justify-center px-2" : "px-4"
      )}>
        <Link href="/admin" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
            <Code2 size={16} className="text-white" />
          </div>
          {(!collapsed || mobile) && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">Aralify</span>
              <span className="text-[9px] h-4 px-1.5 rounded font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center">
                ADMIN
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-4">
            {(!collapsed || mobile) && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-blue-300/40">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg transition-all text-[13px] font-medium relative",
                      collapsed && !mobile ? "justify-center p-2.5" : "px-3 py-2",
                      active
                        ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.08)]"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border-l-2 border-transparent"
                    )}
                    title={collapsed && !mobile ? item.label : undefined}
                  >
                    <item.icon size={16} className={cn(active && "text-blue-400")} />
                    {(!collapsed || mobile) && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {active && <ChevronRight size={14} className="opacity-40" />}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className={cn("border-t border-white/[0.06] p-3", collapsed && !mobile && "px-2")}>
        <div className={cn("flex items-center gap-2.5", collapsed && !mobile && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-2 ring-blue-500/20 flex items-center justify-center shrink-0 text-xs font-semibold text-blue-300">
            {adminName.charAt(0).toUpperCase()}
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{adminName}</p>
              <span className="inline-flex text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 shadow-[0_0_8px_rgba(139,92,246,0.1)]">
                {adminRole}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0e1a] font-body text-slate-200">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-14 border-b border-white/[0.06] bg-[#0d1117]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/[0.06] rounded-lg transition-colors text-slate-400"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 hover:bg-white/[0.06] rounded-lg transition-colors text-slate-400"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                placeholder="Search anything..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-white/[0.06] bg-white/[0.03] text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all"
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors text-slate-400 relative">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors text-slate-400"
              title="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "hidden lg:flex flex-col border-r border-white/[0.06] bg-[#0d1117] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] transition-all duration-200",
            collapsed ? "w-[60px]" : "w-56"
          )}
        >
          <SidebarContent />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-14 z-30 w-56 h-[calc(100vh-3.5rem)] border-r border-white/[0.06] bg-[#0d1117] lg:hidden shadow-2xl shadow-black/40">
              <SidebarContent mobile />
            </aside>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 lg:p-6">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
