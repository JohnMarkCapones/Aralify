import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, { text: string; bg: string; glow: string }> = {
  PUBLISHED:  { text: "text-emerald-400", bg: "bg-emerald-500/15", glow: "shadow-[0_0_8px_rgba(16,185,129,0.12)]" },
  ACTIVE:     { text: "text-emerald-400", bg: "bg-emerald-500/15", glow: "shadow-[0_0_8px_rgba(16,185,129,0.12)]" },
  VISIBLE:    { text: "text-emerald-400", bg: "bg-emerald-500/15", glow: "shadow-[0_0_8px_rgba(16,185,129,0.12)]" },
  REVIEWED:   { text: "text-emerald-400", bg: "bg-emerald-500/15", glow: "shadow-[0_0_8px_rgba(16,185,129,0.12)]" },
  healthy:    { text: "text-emerald-400", bg: "bg-emerald-500/15", glow: "shadow-[0_0_8px_rgba(16,185,129,0.12)]" },

  DRAFT:      { text: "text-amber-400",   bg: "bg-amber-500/15",   glow: "shadow-[0_0_8px_rgba(245,158,11,0.12)]" },
  PENDING:    { text: "text-orange-400",   bg: "bg-orange-500/15",  glow: "shadow-[0_0_8px_rgba(249,115,22,0.12)]" },
  MEDIUM:     { text: "text-amber-400",   bg: "bg-amber-500/15",   glow: "shadow-[0_0_8px_rgba(245,158,11,0.12)]" },
  degraded:   { text: "text-amber-400",   bg: "bg-amber-500/15",   glow: "shadow-[0_0_8px_rgba(245,158,11,0.12)]" },

  BANNED:     { text: "text-red-400",     bg: "bg-red-500/15",     glow: "shadow-[0_0_8px_rgba(239,68,68,0.12)]" },
  DELETED:    { text: "text-slate-400",   bg: "bg-slate-500/15",   glow: "" },
  HIDDEN:     { text: "text-slate-400",   bg: "bg-slate-500/15",   glow: "" },
  DISMISSED:  { text: "text-slate-400",   bg: "bg-slate-500/15",   glow: "" },
  down:       { text: "text-red-400",     bg: "bg-red-500/15",     glow: "shadow-[0_0_8px_rgba(239,68,68,0.12)]" },

  EASY:       { text: "text-emerald-400", bg: "bg-emerald-500/15", glow: "shadow-[0_0_8px_rgba(16,185,129,0.12)]" },
  HARD:       { text: "text-red-400",     bg: "bg-red-500/15",     glow: "shadow-[0_0_8px_rgba(239,68,68,0.12)]" },

  USER:       { text: "text-blue-400",    bg: "bg-blue-500/15",    glow: "shadow-[0_0_8px_rgba(59,130,246,0.12)]" },
  ADMIN:      { text: "text-purple-400",  bg: "bg-purple-500/15",  glow: "shadow-[0_0_8px_rgba(139,92,246,0.12)]" },
  MODERATOR:  { text: "text-indigo-400",  bg: "bg-indigo-500/15",  glow: "shadow-[0_0_8px_rgba(99,102,241,0.12)]" },

  LEARNING:   { text: "text-blue-400",    bg: "bg-blue-500/15",    glow: "shadow-[0_0_8px_rgba(59,130,246,0.12)]" },
  SOCIAL:     { text: "text-pink-400",    bg: "bg-pink-500/15",    glow: "shadow-[0_0_8px_rgba(236,72,153,0.12)]" },
  STREAK:     { text: "text-orange-400",  bg: "bg-orange-500/15",  glow: "shadow-[0_0_8px_rgba(249,115,22,0.12)]" },
  MASTERY:    { text: "text-purple-400",  bg: "bg-purple-500/15",  glow: "shadow-[0_0_8px_rgba(139,92,246,0.12)]" },
  SPECIAL:    { text: "text-yellow-400",  bg: "bg-yellow-500/15",  glow: "shadow-[0_0_8px_rgba(234,179,8,0.12)]" },
};

const DEFAULT_STYLE = { text: "text-slate-400", bg: "bg-slate-500/15", glow: "" };

interface StatusBadgeProps {
  status: string;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ status, className, dot }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status] || DEFAULT_STYLE;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium",
      styles.text, styles.bg, styles.glow,
      className
    )}>
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full animate-pulse",
          status === "healthy" || status === "ACTIVE" || status === "PUBLISHED" ? "bg-emerald-400" :
          status === "down" || status === "BANNED" ? "bg-red-400" : "bg-amber-400"
        )} />
      )}
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
