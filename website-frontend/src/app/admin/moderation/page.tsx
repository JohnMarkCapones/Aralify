"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Shield, MessageSquare, UserX, Check, X, AlertTriangle,
  EyeOff, Pin, Trash2, RotateCcw, ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { StatusBadge } from "../_components/status-badge";
import { DataTable, type Column } from "../_components/data-table";
import { cn } from "@/lib/utils";
import {
  mockReports,
  mockFlaggedComments,
  mockUsers,
  type FlaggedComment,
} from "@/lib/data/admin";

export default function AdminModerationPage() {
  const [activeTab, setActiveTab] = useState<"reports" | "comments" | "flagged">("reports");
  const [reportFilter, setReportFilter] = useState<string>("ALL");

  const filteredReports = useMemo(() => {
    if (reportFilter === "ALL") return mockReports;
    return mockReports.filter((r) => r.status === reportFilter);
  }, [reportFilter]);

  const flaggedUsers = mockUsers.filter((u) => u.isBanned);

  const commentColumns: Column<FlaggedComment>[] = [
    {
      key: "content",
      header: "Content",
      render: (row) => (
        <div className="max-w-xs">
          <p className="text-sm font-medium truncate">{row.content}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">in {row.lessonTitle}</p>
        </div>
      ),
    },
    {
      key: "author",
      header: "Author",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-medium text-primary">{row.authorName.charAt(0)}</span>
          </div>
          <span className="text-sm font-medium">{row.authorName}</span>
        </div>
      ),
    },
    {
      key: "reports",
      header: "Reports",
      className: "hidden sm:table-cell",
      render: (row) => (
        <span className={cn("text-sm font-medium", row.reportsCount > 3 ? "text-red-500" : "text-muted-foreground")}>
          {row.reportsCount}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "",
      className: "w-32",
      render: (row) => (
        <div className="flex gap-1 justify-end">
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Hide">
            <EyeOff size={14} />
          </button>
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Pin">
            <Pin size={14} />
          </button>
          <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500" title="Delete">
            <Trash2 size={14} />
          </button>
          {row.status === "HIDDEN" && (
            <button className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors text-emerald-500" title="Restore">
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const tabs = [
    { id: "reports" as const, label: "Reports Queue", icon: <Shield size={14} /> },
    { id: "comments" as const, label: "Comments", icon: <MessageSquare size={14} /> },
    { id: "flagged" as const, label: "Flagged Users", icon: <UserX size={14} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Moderation"
        description="Review reports, comments, and flagged users"
      />

      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Queue */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          <div className="flex gap-1.5">
            {["ALL", "PENDING", "REVIEWED", "DISMISSED"].map((f) => (
              <button
                key={f}
                onClick={() => setReportFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  reportFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {f.charAt(0) + f.slice(1).toLowerCase()} {f !== "ALL" && `(${mockReports.filter((r) => r.status === f).length})`}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-background rounded-xl border border-border/50 shadow-sm p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-[9px] font-medium text-primary">
                            {report.reporterName.charAt(0)}
                          </span>
                        </div>
                        <span className="text-xs font-medium">{report.reporterName}</span>
                      </div>
                      <StatusBadge status={report.status} />
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm bg-muted/30 p-3 rounded-lg border border-border/30">
                      &ldquo;{report.contentPreview}&rdquo;
                    </p>

                    <div className="flex items-center gap-2">
                      <AlertTriangle size={12} className="text-orange-500" />
                      <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                        {report.reason}
                      </span>
                    </div>
                  </div>

                  {report.status === "PENDING" && (
                    <div className="flex gap-2 shrink-0">
                      <button className="h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                        <Check size={14} /> Approve
                      </button>
                      <button className="h-8 px-3 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
                        <X size={14} /> Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No reports found for this filter.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comments */}
      {activeTab === "comments" && (
        <DataTable
          columns={commentColumns}
          data={mockFlaggedComments}
          pageSize={10}
          searchable
          searchPlaceholder="Search comments..."
          emptyMessage="No flagged comments."
        />
      )}

      {/* Flagged Users */}
      {activeTab === "flagged" && (
        <DataTable
          columns={[
            {
              key: "user",
              header: "User",
              render: (row) => (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-medium text-primary">{row.displayName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{row.displayName}</p>
                    <p className="text-[10px] text-muted-foreground">@{row.username}</p>
                  </div>
                </div>
              ),
            },
            {
              key: "reason",
              header: "Reason",
              render: (row) => (
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {row.banReason || "Flagged for review"}
                </span>
              ),
            },
            {
              key: "date",
              header: "Date",
              className: "hidden sm:table-cell",
              render: (row) => (
                <span className="text-xs text-muted-foreground">
                  {row.bannedAt ? new Date(row.bannedAt).toLocaleDateString() : "—"}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (row) => <StatusBadge status={row.isBanned ? "BANNED" : "ACTIVE"} />,
            },
            {
              key: "actions",
              header: "",
              className: "w-24",
              render: (row) => (
                <div className="flex gap-1 justify-end">
                  <Link href={`/admin/users/${row.id}`}>
                    <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="View Profile">
                      <ArrowUpRight size={14} />
                    </button>
                  </Link>
                </div>
              ),
            },
          ]}
          data={flaggedUsers}
          pageSize={10}
          emptyMessage="No flagged users."
        />
      )}
    </div>
  );
}
