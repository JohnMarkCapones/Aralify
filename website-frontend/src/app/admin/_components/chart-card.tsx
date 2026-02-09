import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function ChartCard({ title, subtitle, actions, children, className, noPadding }: ChartCardProps) {
  return (
    <div className={cn("bg-background rounded-xl border border-border/50 shadow-sm", className)}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {actions}
      </div>
      <div className={cn(noPadding ? "" : "p-5")}>
        {children}
      </div>
    </div>
  );
}
