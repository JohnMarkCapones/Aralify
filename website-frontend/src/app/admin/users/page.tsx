"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Eye, Ban, UserCog, Trash2, MoreHorizontal, Search,
} from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { DataTable, type Column } from "../_components/data-table";
import { StatusBadge } from "../_components/status-badge";
import { ConfirmDialog } from "../_components/confirm-dialog";
import { cn } from "@/lib/utils";
import { mockUsers, type AdminUser } from "@/lib/data/admin";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((u) => {
      const matchesSearch =
        !search ||
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.displayName.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && !u.isBanned && u.isActive) ||
        (statusFilter === "BANNED" && u.isBanned);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  const columns: Column<AdminUser>[] = [
    {
      key: "user",
      header: "User",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-medium text-primary">
              {row.displayName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm">{row.displayName}</p>
            <p className="text-[10px] text-muted-foreground">@{row.username}</p>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      className: "hidden md:table-cell",
      render: (row) => <span className="text-sm text-muted-foreground">{row.email}</span>,
    },
    {
      key: "role",
      header: "Role",
      render: (row) => <StatusBadge status={row.role} />,
    },
    {
      key: "xp",
      header: "XP",
      sortable: true,
      className: "hidden lg:table-cell",
      render: (row) => <span className="text-sm font-medium">{row.xpTotal.toLocaleString()}</span>,
    },
    {
      key: "level",
      header: "Level",
      sortable: true,
      className: "hidden lg:table-cell",
      render: (row) => <span className="text-sm font-medium">{row.level}</span>,
    },
    {
      key: "streak",
      header: "Streak",
      className: "hidden xl:table-cell",
      render: (row) => (
        <span className={cn("text-sm font-medium", row.streakCurrent > 0 ? "text-orange-500" : "text-muted-foreground")}>
          {row.streakCurrent}d
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <StatusBadge status={row.isBanned ? "BANNED" : row.isActive ? "ACTIVE" : "DRAFT"} />
      ),
    },
    {
      key: "joined",
      header: "Joined",
      className: "hidden md:table-cell",
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-12",
      render: (row) => (
        <div className="relative">
          <button
            onClick={() => setActionMenuId(actionMenuId === row.id ? null : row.id)}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          {actionMenuId === row.id && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setActionMenuId(null)} />
              <div className="absolute right-0 top-8 z-20 w-48 bg-background border border-border/50 shadow-lg rounded-xl overflow-hidden">
                <Link
                  href={`/admin/users/${row.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                  onClick={() => setActionMenuId(null)}
                >
                  <Eye size={14} /> View Details
                </Link>
                <button
                  onClick={() => {
                    setSelectedUser(row);
                    setBanDialogOpen(true);
                    setActionMenuId(null);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Ban size={14} /> {row.isBanned ? "Unban" : "Ban"} User
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(row);
                    setRoleDialogOpen(true);
                    setActionMenuId(null);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  <UserCog size={14} /> Change Role
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(row);
                    setDeleteDialogOpen(true);
                    setActionMenuId(null);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 size={14} /> Delete User
                </button>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description={`${mockUsers.length} total users`}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/50 bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-border/50 bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="ALL">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="MODERATOR">Moderator</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-border/50 bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="BANNED">Banned</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pageSize={20}
        emptyMessage="No users found matching your filters."
      />

      <ConfirmDialog
        open={banDialogOpen}
        onOpenChange={setBanDialogOpen}
        title={selectedUser?.isBanned ? "Unban User" : "Ban User"}
        description={
          selectedUser?.isBanned
            ? `Are you sure you want to unban ${selectedUser?.displayName}?`
            : `Are you sure you want to ban ${selectedUser?.displayName}? They will lose access to the platform.`
        }
        onConfirm={() => setBanDialogOpen(false)}
        destructive={!selectedUser?.isBanned}
        confirmText={selectedUser?.isBanned ? "Unban" : "Ban User"}
      />

      <ConfirmDialog
        open={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        title="Change User Role"
        description={`Change the role for ${selectedUser?.displayName}. Current role: ${selectedUser?.role}`}
        onConfirm={() => setRoleDialogOpen(false)}
        confirmText="Change Role"
      >
        <select className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="USER">User</option>
          <option value="MODERATOR">Moderator</option>
          <option value="ADMIN">Admin</option>
        </select>
      </ConfirmDialog>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User Account"
        description={`This will permanently delete ${selectedUser?.displayName}'s account and all associated data. This action cannot be undone.`}
        onConfirm={() => setDeleteDialogOpen(false)}
        destructive
        confirmText="Delete Account"
        requireConfirmation="DELETE"
      />
    </div>
  );
}
