"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, Target, BarChart3, Award, Medal, Trophy,
  Clock, GraduationCap, Bookmark, CalendarCheck, Users, Settings,
  Menu, X, Bell, LogOut, ChevronRight, ChevronLeft, Code2, Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV_SECTIONS = [
  {
    title: "Learning",
    items: [
      { href: "/dashboard", label: "Home", icon: LayoutDashboard, exact: true },
      { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
      { href: "/dashboard/daily-challenge", label: "Daily Challenge", icon: Target },
    ],
  },
  {
    title: "Progress",
    items: [
      { href: "/dashboard/stats", label: "Stats", icon: BarChart3 },
      { href: "/dashboard/achievements", label: "Achievements", icon: Award },
      { href: "/dashboard/badges", label: "Badges", icon: Medal },
      { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
    ],
  },
  {
    title: "Activity",
    items: [
      { href: "/dashboard/activity", label: "Activity Feed", icon: Clock },
      { href: "/dashboard/certificates", label: "Certificates", icon: GraduationCap },
    ],
  },
  {
    title: "Planning",
    items: [
      { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
      { href: "/dashboard/study-plan", label: "Study Plan", icon: CalendarCheck },
      { href: "/dashboard/social", label: "Social", icon: Users },
    ],
  },
  {
    title: "",
    items: [
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

interface DashboardShellProps {
  children: React.ReactNode;
  userName?: string;
}

export function DashboardShell({ children, userName = "Learner" }: DashboardShellProps) {
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
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
          <div className="w-5 h-5 bg-primary rounded flex items-center justify-center shrink-0">
            <Code2 size={11} className="text-white" />
          </div>
          {(!collapsed || mobile) && (
            <span className="font-semibold text-sm">Aralify</span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_SECTIONS.map((section, sIdx) => (
          <div key={section.title || sIdx} className="mb-4">
            {section.title && (!collapsed || mobile) && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {section.title}
              </p>
            )}
            {!section.title && (
              <div className="border-t border-border/30 my-2 mx-2" />
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

      {/* Bottom user */}
      <div className={cn("border-t border-border/50 p-3", collapsed && !mobile && "px-2")}>
        <div className={cn("flex items-center gap-2.5", collapsed && !mobile && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
            {userName.charAt(0).toUpperCase()}
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{userName}</p>
              <p className="text-[10px] text-muted-foreground">Learner</p>
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
                placeholder="Search courses, lessons..."
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
