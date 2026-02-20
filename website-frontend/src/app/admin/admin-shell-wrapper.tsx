"use client";

import { AdminShell } from "./_components/admin-shell";

interface AdminShellWrapperProps {
  children: React.ReactNode;
  adminRole: "ADMIN" | "MODERATOR";
  adminName: string;
}

export function AdminShellWrapper({ children, adminRole, adminName }: AdminShellWrapperProps) {
  return (
    <div className="dark bg-[#0a0e1a] min-h-screen text-white">
      <AdminShell adminRole={adminRole} adminName={adminName}>
        {children}
      </AdminShell>
    </div>
  );
}
