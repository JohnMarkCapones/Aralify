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
    <div className={cn(
      "bg-[#111827]/80 rounded-xl border border-[#1e293b] overflow-hidden transition-shadow hover:shadow-[0_0_20px_rgba(59,130,246,0.06)]",
      className
    )}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e293b]/80">
        <div className="flex items-center gap-3">
          <div className="w-1 h-4 rounded-full bg-blue-500" />
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {actions}
      </div>
      <div className={cn(noPadding ? "" : "p-5")}>
        {children}
      </div>
    </div>
  );
}
