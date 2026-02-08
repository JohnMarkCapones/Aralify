"use client";

import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Clock, Activity, Server, Globe, Database, Zap, Shield, Wifi } from "lucide-react";

type ServiceStatus = "operational" | "degraded" | "down";

const services: { name: string; status: ServiceStatus; uptime: string; responseTime: string; icon: React.ReactNode }[] = [
  { name: "Web Application", status: "operational", uptime: "99.98%", responseTime: "124ms", icon: <Globe size={18} /> },
  { name: "API Gateway", status: "operational", uptime: "99.99%", responseTime: "45ms", icon: <Server size={18} /> },
  { name: "Code Execution (Judge0)", status: "operational", uptime: "99.95%", responseTime: "230ms", icon: <Zap size={18} /> },
  { name: "Database (PostgreSQL)", status: "operational", uptime: "99.99%", responseTime: "12ms", icon: <Database size={18} /> },
  { name: "Authentication", status: "operational", uptime: "99.99%", responseTime: "89ms", icon: <Shield size={18} /> },
  { name: "Real-time (WebSocket)", status: "operational", uptime: "99.97%", responseTime: "34ms", icon: <Wifi size={18} /> },
  { name: "CDN / Static Assets", status: "operational", uptime: "100%", responseTime: "18ms", icon: <Activity size={18} /> },
];

const incidents = [
  {
    date: "Feb 3, 2026",
    title: "Brief API latency spike",
    status: "resolved" as const,
    duration: "12 minutes",
    description: "Increased response times on API endpoints due to a database connection pool exhaustion. Auto-scaling resolved the issue.",
  },
  {
    date: "Jan 28, 2026",
    title: "Judge0 code execution delays",
    status: "resolved" as const,
    duration: "25 minutes",
    description: "Code execution queue backlog caused by a surge in concurrent submissions. Additional workers were provisioned.",
  },
  {
    date: "Jan 15, 2026",
    title: "Scheduled maintenance — Database migration",
    status: "resolved" as const,
    duration: "8 minutes",
    description: "Planned downtime for PostgreSQL schema migration. All services restored successfully within the maintenance window.",
  },
];

// Mock uptime bars for last 30 days
function UptimeBar() {
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i,
    status: Math.random() > 0.03 ? "up" : "partial",
  }));

  return (
    <div className="flex gap-0.5">
      {days.map((d, i) => (
        <div
          key={i}
          className={`flex-1 h-8 rounded-sm ${
            d.status === "up"
              ? "bg-green-500 dark:bg-green-600"
              : "bg-yellow-500 dark:bg-yellow-600"
          }`}
          title={`Day ${30 - i}: ${d.status === "up" ? "Operational" : "Partial degradation"}`}
        />
      ))}
    </div>
  );
}

const statusConfig = {
  operational: { icon: <CheckCircle size={16} />, label: "Operational", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/40" },
  degraded: { icon: <AlertTriangle size={16} />, label: "Degraded", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
  down: { icon: <XCircle size={16} />, label: "Down", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/40" },
};

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">SYSTEM STATUS</h1>
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest ${
              allOperational
                ? "bg-green-500 text-white"
                : "bg-yellow-500 text-white"
            }`}>
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              {allOperational ? "All Systems Operational" : "Some Systems Degraded"}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overall Uptime */}
      <section className="py-8 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-black uppercase tracking-wider">Last 30 Days</span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">99.98% uptime</span>
          </div>
          <UptimeBar />
          <div className="flex justify-between mt-2 text-xs font-bold text-muted-foreground">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">SERVICES</h2>
          <div className="space-y-3">
            {services.map((service, i) => {
              const config = statusConfig[service.status];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 bg-card neo-brutal-border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg text-muted-foreground">{service.icon}</div>
                    <span className="font-black text-base">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs font-bold text-muted-foreground uppercase">Uptime</div>
                      <div className="font-black text-sm">{service.uptime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-muted-foreground uppercase">Response</div>
                      <div className="font-black text-sm">{service.responseTime}</div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs uppercase ${config.bg} ${config.color}`}>
                      {config.icon} {config.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Incidents */}
      <section className="py-12 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">RECENT INCIDENTS</h2>
          <div className="space-y-4">
            {incidents.map((inc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 bg-background neo-brutal-border rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                    <span className="font-black text-sm">{inc.title}</span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{inc.date}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{inc.description}</p>
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={10} /> Duration: {inc.duration}</span>
                  <span className="text-green-600 dark:text-green-400 uppercase font-black">Resolved</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
