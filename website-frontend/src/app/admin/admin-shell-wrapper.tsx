"use client";

import { AdminShell } from "./_components/admin-shell";

interface AdminShellWrapperProps {
  children: React.ReactNode;
  adminRole: "ADMIN" | "MODERATOR";
  adminName: string;
}

export function AdminShellWrapper({ children, adminRole, adminName }: AdminShellWrapperProps) {
  return (
    <AdminShell adminRole={adminRole} adminName={adminName}>
      {children}
    </AdminShell>
  );
}
