"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MegaMenuItemRow } from "./MegaMenuItemRow";
import type { NavMenuColumn } from "./navbar-data";

interface MegaMenuColumnProps {
  column: NavMenuColumn;
  index: number;
  onNavigate?: () => void;
}

export function MegaMenuColumn({ column, index, onNavigate }: MegaMenuColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.2, ease: "easeOut" }}
      className="space-y-2.5"
    >
      <div className="flex items-center gap-2.5 pb-2 border-b-2 border-border/30">
        <div className={`h-1.5 w-1.5 rounded-full ${column.accent}`} />
        <h4 className="text-[11px] tracking-[0.15em] text-muted-foreground font-black">
          {column.title}
        </h4>
      </div>
      <div className="flex flex-col gap-0.5">
        {column.items.map((item) => (
          <MegaMenuItemRow key={item.name} item={item} onNavigate={onNavigate} />
        ))}
      </div>
      {column.viewAllHref && (
        <Link
          href={column.viewAllHref}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:underline underline-offset-2 pt-1 group/link"
        >
          {column.viewAllLabel ?? "View All"}
          <ArrowRight size={11} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
}
