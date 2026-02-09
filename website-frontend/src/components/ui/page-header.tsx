import { Code2 } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <section className="border-b-4 border-border bg-card pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/" className="text-2xl font-display font-black tracking-tighter flex items-center gap-2 hover:scale-105 transition-transform">
            <div className="bg-primary p-1.5 neo-brutal-border neo-brutal-shadow-sm">
              <Code2 size={18} className="text-white" />
            </div>
            <span>ARAL<span className="text-primary">IFY</span></span>
          </Link>
          {badge && (
            <span className="px-3 py-1 text-xs font-black tracking-widest bg-primary/10 text-primary neo-brutal-border rounded-full">
              {badge}
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter">{title}</h1>
        {description && (
          <p className="mt-3 text-lg text-muted-foreground font-medium max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
