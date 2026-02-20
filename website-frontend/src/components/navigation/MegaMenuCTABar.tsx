"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavCTABar } from "./navbar-data";

interface MegaMenuCTABarProps {
  cta: NavCTABar;
  onNavigate?: () => void;
}

export function MegaMenuCTABar({ cta, onNavigate }: MegaMenuCTABarProps) {
  const Icon = cta.icon;

  return (
    <div className="border-t-2 border-border/50 bg-muted/20 px-6 py-3.5">
      <Link
        href={cta.href}
        onClick={onNavigate}
        className="flex items-center gap-2.5 text-sm font-bold group/cta hover:text-primary transition-colors"
      >
        <div className="p-1.5 bg-primary/10 rounded-lg shrink-0">
          <Icon size={14} className="text-primary" />
        </div>
        <span className="text-muted-foreground">{cta.text}</span>
        <span className="text-primary font-black group-hover/cta:underline underline-offset-2">
          {cta.linkLabel}
        </span>
        <ArrowRight size={14} className="text-primary group-hover/cta:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
