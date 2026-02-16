"use client";

import { NavSearchTrigger } from "./NavSearchTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationBell } from "./NotificationBell";
import { UserNavSection } from "./UserNavSection";

export function NavToolbar() {
  return (
    <div className="flex items-center gap-2 xl:gap-3 border-l-3 border-border pl-5 xl:pl-7 ml-1">
      <NavSearchTrigger />
      <ThemeToggle />
      <NotificationBell />
      <UserNavSection />
    </div>
  );
}
