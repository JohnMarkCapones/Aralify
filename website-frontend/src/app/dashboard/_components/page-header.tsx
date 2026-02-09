"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function PageHeader({ title, description, actions, icon: Icon, className }: PageHeaderProps) {
  const pathname = usePathname();
  const isHub = pathname === "/dashboard";

  return (
    <div className={cn("mb-6", className)}>
      {/* Back to home link */}
      {!isHub && (
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-2"
        >
          <ChevronLeft size={14} />
          Back to Home
        </Link>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {Icon && <Icon size={20} className="text-primary shrink-0" />}
            <h1 className="font-display text-2xl tracking-tight">{title}</h1>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Simple divider */}
      <div className="mt-3 h-px w-full bg-border/20" />
    </div>
  );
}
