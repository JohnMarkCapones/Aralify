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
import { Badge } from "@/components/ui/badge";
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
      <div className={cn("flex items-center h-14 border-b border-border/50 shrink-0", collapsed && !mobile ? "justify-center px-2" : "px-4")}>
        <Link href="/admin" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <Code2 size={16} className="text-white" />
          </div>
          {(!collapsed || mobile) && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Aralify</span>
              <Badge variant="destructive" className="text-[9px] h-4 px-1.5">ADMIN</Badge>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-4">
            {(!collapsed || mobile) && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
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
                      "flex items-center gap-2.5 rounded-lg transition-colors text-[13px] font-medium",
                      collapsed && !mobile ? "justify-center p-2.5" : "px-3 py-2",
                      active
                        ? "bg-primary/10 text-primary dark:bg-primary/15"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                    title={collapsed && !mobile ? item.label : undefined}
                  >
                    <item.icon size={16} className={cn(active && "text-primary")} />
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
      <div className={cn("border-t border-border/50 p-3", collapsed && !mobile && "px-2")}>
        <div className={cn("flex items-center gap-2.5", collapsed && !mobile && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
            {adminName.charAt(0).toUpperCase()}
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{adminName}</p>
              <p className="text-[10px] text-muted-foreground">{adminRole}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30 font-body text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
              <input
                placeholder="Search anything..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/50 bg-muted/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground relative">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
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
            "hidden lg:flex flex-col border-r border-border/50 bg-background shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] transition-all duration-200",
            collapsed ? "w-[60px]" : "w-56"
          )}
        >
          <SidebarContent />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-14 z-30 w-56 h-[calc(100vh-3.5rem)] border-r border-border/50 bg-background lg:hidden shadow-xl">
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
