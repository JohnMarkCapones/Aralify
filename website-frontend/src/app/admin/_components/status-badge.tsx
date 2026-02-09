import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
  ACTIVE: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
  VISIBLE: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
  REVIEWED: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
  healthy: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",

  DRAFT: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30",
  PENDING: "text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30",
  MEDIUM: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30",
  degraded: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30",

  BANNED: "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/30",
  DELETED: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50",
  HIDDEN: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50",
  DISMISSED: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50",
  down: "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/30",

  EASY: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
  HARD: "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/30",

  USER: "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30",
  ADMIN: "text-purple-700 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30",
  MODERATOR: "text-indigo-700 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/30",

  LEARNING: "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30",
  SOCIAL: "text-pink-700 bg-pink-50 dark:text-pink-400 dark:bg-pink-950/30",
  STREAK: "text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30",
  MASTERY: "text-purple-700 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30",
  SPECIAL: "text-yellow-700 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950/30",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ status, className, dot }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status] || "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50";

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium", styles, className)}>
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", status === "healthy" || status === "ACTIVE" || status === "PUBLISHED" ? "bg-emerald-500" : status === "down" || status === "BANNED" ? "bg-red-500" : "bg-amber-500")} />
      )}
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
