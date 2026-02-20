"use client";

import { useState } from "react";
import {
  FileBarChart, Download, Calendar, Clock, FileText, FileSpreadsheet,
  Play, Pause, Plus, Users, BookOpen, Zap, DollarSign,
  TrendingUp, ArrowUpRight,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { PageHeader } from "../_components/page-header";
import { ChartCard } from "../_components/chart-card";
import { cn } from "@/lib/utils";
import {
  mockReportTemplates,
  mockScheduledExports,
  mockRevenueTrend,
  mockUserGrowthTrend,
  mockCompletionsTrend,
  type ReportTemplate,
} from "@/lib/data/admin";

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  users: <Users size={16} className="text-blue-500" />,
  content: <BookOpen size={16} className="text-emerald-500" />,
  engagement: <Zap size={16} className="text-yellow-500" />,
  revenue: <DollarSign size={16} className="text-purple-500" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  users: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  content: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  engagement: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  revenue: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const FREQUENCY_STYLES: Record<string, string> = {
  daily: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  weekly: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  monthly: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  "on-demand": "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const FORMAT_ICON: Record<string, React.ReactNode> = {
  CSV: <FileSpreadsheet size={14} className="text-emerald-500" />,
  PDF: <FileText size={14} className="text-red-500" />,
  JSON: <FileBarChart size={14} className="text-blue-500" />,
};

type Tab = "templates" | "exports" | "quick-reports";

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("templates");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredTemplates = categoryFilter === "all"
    ? mockReportTemplates
    : mockReportTemplates.filter((t) => t.category === categoryFilter);

  const tabs = [
    { id: "templates" as const, label: "Report Templates", icon: <FileBarChart size={14} /> },
    { id: "exports" as const, label: "Scheduled Exports", icon: <Calendar size={14} /> },
    { id: "quick-reports" as const, label: "Quick Reports", icon: <TrendingUp size={14} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, schedule, and export platform reports"
        actions={
          <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <Plus size={14} /> New Report
          </button>
        }
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

      {/* Report Templates */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex gap-1.5">
            {["all", "users", "content", "engagement", "revenue"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                  categoryFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredTemplates.map((report) => (
              <div
                key={report.id}
                className="bg-background rounded-xl border border-border/50 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0">
                    {CATEGORY_ICON[report.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold">{report.title}</h3>
                      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md", CATEGORY_COLORS[report.category])}>
                        {report.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-3">
                    {report.frequency && (
                      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md", FREQUENCY_STYLES[report.frequency])}>
                        {report.frequency}
                      </span>
                    )}
                    {report.lastGenerated && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock size={10} /> {new Date(report.lastGenerated).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button className="h-7 px-2.5 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
                      <ArrowUpRight size={12} /> View
                    </button>
                    <button className="h-7 px-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                      <Download size={12} /> Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Exports */}
      {activeTab === "exports" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <Plus size={14} /> Schedule Export
            </button>
          </div>

          <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Export</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Format</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Schedule</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Last Run</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockScheduledExports.map((exp) => (
                  <tr key={exp.id} className="border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-sm font-medium">{exp.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {FORMAT_ICON[exp.format]}
                        <span className="text-xs font-medium">{exp.format}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-muted-foreground">{exp.schedule}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {new Date(exp.lastRun).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium",
                        exp.status === "active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      )}>
                        {exp.status === "active" ? <Play size={8} /> : <Pause size={8} />}
                        {exp.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1 justify-end">
                        <button className="h-7 px-2.5 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1">
                          <Download size={12} /> Run Now
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Reports */}
      {activeTab === "quick-reports" && (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Preview key metrics. Click &ldquo;Export&rdquo; to download the full report.
          </p>

          {/* User Growth Preview */}
          <ChartCard
            title="User Growth Report"
            subtitle="Total and active users over time"
            actions={
              <button className="h-7 px-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                <Download size={12} /> Export PDF
              </button>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockUserGrowthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Total Users" />
                <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Active Users" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Revenue Preview */}
          <ChartCard
            title="Revenue Overview"
            subtitle="Monthly revenue and subscriber count"
            actions={
              <button className="h-7 px-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                <Download size={12} /> Export PDF
              </button>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockRevenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="revenue" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="Revenue ($)" />
                <Line yAxisId="right" type="monotone" dataKey="subscribers" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Subscribers" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Engagement Preview */}
          <ChartCard
            title="Lesson Completions"
            subtitle="Daily lesson completions over the last 14 days"
            actions={
              <button className="h-7 px-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                <Download size={12} /> Export CSV
              </button>
            }
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={mockCompletionsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Bar dataKey="value" fill="#10b981" radius={[3, 3, 0, 0]} name="Completions" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Export Summary */}
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold mb-4">Quick Export</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "All Users", desc: "Full user list with metrics", format: "CSV" },
                { label: "Course Data", desc: "Courses, levels, and lessons", format: "JSON" },
                { label: "XP Transactions", desc: "All XP awards this month", format: "CSV" },
                { label: "Audit Trail", desc: "Admin actions log", format: "CSV" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0">
                    <Download size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc} ({item.format})</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
