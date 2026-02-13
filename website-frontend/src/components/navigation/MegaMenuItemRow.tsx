"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NavMenuItem } from "./navbar-data";

interface MegaMenuItemRowProps {
  item: NavMenuItem;
  onNavigate?: () => void;
}

export function MegaMenuItemRow({ item, onNavigate }: MegaMenuItemRowProps) {
  const Icon = item.icon;

  return (
    <Link href={item.href} onClick={onNavigate} role="menuitem">
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.15 }}
        className="flex items-start gap-3 p-2.5 hover:bg-primary/5 rounded-xl transition-all group/item cursor-pointer"
      >
        <div className="mt-0.5 p-2 bg-muted/80 text-foreground rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors shrink-0 neo-brutal-border">
          <Icon size={15} />
        </div>
        <div className="min-w-0">
          <div className="font-black text-[13px] group-hover/item:text-primary transition-colors flex items-center gap-2 leading-tight">
            {item.name}
            {item.badge && (
              <span className="bg-accent neo-brutal-border text-[8px] font-black uppercase px-1.5 py-0.5 rounded rotate-[-3deg] inline-block leading-none">
                {item.badge}
              </span>
            )}
          </div>
          <div className="text-[11px] font-medium text-muted-foreground leading-tight mt-0.5">
            {item.desc}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
