"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown, ChevronRight, Search,
} from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { cn } from "@/lib/utils";
import { mockAuditLogs } from "@/lib/data/admin";

const ACTION_COLORS: Record<string, string> = {
  USER_BANNED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  LESSON_DELETED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  COURSE_PUBLISHED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  LESSON_PUBLISHED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  LESSON_CREATED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  COURSE_CREATED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  ACHIEVEMENT_CREATED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  BADGE_CREATED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  ROLE_CHANGED: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  LESSON_UPDATED: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  COURSE_UPDATED: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  SYSTEM_SETTINGS_UPDATED: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  USER_UNBANNED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const allActions = [...new Set(mockAuditLogs.map((l) => l.action))];
const allEntityTypes = [...new Set(mockAuditLogs.map((l) => l.entityType))];

export default function AdminAuditPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionFilter, setActionFilter] = useState<string>("ALL");
  const [entityFilter, setEntityFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      const matchesAction = actionFilter === "ALL" || log.action === actionFilter;
      const matchesEntity = entityFilter === "ALL" || log.entityType === entityFilter;
      const matchesSearch =
        !search ||
        log.description.toLowerCase().includes(search.toLowerCase()) ||
        log.adminName.toLowerCase().includes(search.toLowerCase());
      return matchesAction && matchesEntity && matchesSearch;
    });
  }, [actionFilter, entityFilter, search]);

  const expandedLog = expandedId ? filtered.find((l) => l.id === expandedId) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Track all administrative actions"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/50 bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-border/50 bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="ALL">All Actions</option>
          {allActions.map((a) => (
            <option key={a} value={a}>{a.replace(/_/g, " ")}</option>
          ))}
        </select>
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-border/50 bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="ALL">All Entities</option>
          {allEntityTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Audit log table */}
      <div className="overflow-x-auto rounded-xl border border-border/50 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="w-8 px-4 py-3" />
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Timestamp</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Admin</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Action</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Entity</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Description</th>
            </tr>
          </thead>
          <tbody className="bg-background">
            {filtered.map((log) => {
              const isExpanded = expandedId === log.id;
              const actionStyle = ACTION_COLORS[log.action] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

              return (
                <tr
                  key={log.id}
                  className={cn(
                    "border-b border-border/30 cursor-pointer transition-colors",
                    isExpanded ? "bg-muted/30" : "hover:bg-muted/20"
                  )}
                  onClick={() => setExpandedId(isExpanded ? null : log.id)}
                >
                  <td className="px-4 py-3">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleDateString()}{" "}
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-medium text-primary">
                          {log.adminName.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">{log.adminName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium",
                      actionStyle
                    )}>
                      {log.action.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {log.entityType} #{log.entityId}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground truncate max-w-xs block">
                      {log.description}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Expanded detail */}
        {expandedLog && (
          <div className="border-t border-border/50 bg-muted/20 p-6 space-y-3">
            <p className="text-sm font-medium">{expandedLog.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {expandedLog.oldValue && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Old Value</p>
                  <pre className="text-xs bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-200/30 dark:border-red-900/20 overflow-x-auto font-mono">
                    {JSON.stringify(JSON.parse(expandedLog.oldValue), null, 2)}
                  </pre>
                </div>
              )}
              {expandedLog.newValue && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">New Value</p>
                  <pre className="text-xs bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg border border-emerald-200/30 dark:border-emerald-900/20 overflow-x-auto font-mono">
                    {JSON.stringify(JSON.parse(expandedLog.newValue), null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span>IP: <span className="font-mono font-medium">{expandedLog.ipAddress}</span></span>
              <span>Entity: <span className="font-medium">{expandedLog.entityType} #{expandedLog.entityId}</span></span>
            </div>
          </div>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No audit logs found matching your filters.
        </div>
      )}
    </div>
  );
}
