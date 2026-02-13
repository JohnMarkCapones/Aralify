"use client";

import { motion } from "framer-motion";
import { MegaMenuFeaturedCard } from "./MegaMenuFeaturedCard";
import { MegaMenuColumn } from "./MegaMenuColumn";
import { MegaMenuCTABar } from "./MegaMenuCTABar";
import type { MegaMenuData } from "./navbar-data";

interface MegaMenuPanelProps {
  menu: MegaMenuData;
  onNavigate?: () => void;
}

export function MegaMenuPanel({ menu, onNavigate }: MegaMenuPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.99 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[min(1024px,calc(100vw-2rem))] bg-card neo-brutal-border neo-brutal-shadow-lg rounded-3xl z-50 overflow-hidden"
      role="menu"
    >
      {/* Top accent gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      {/* Main content: featured card + columns */}
      <div className="flex gap-6 p-6">
        <MegaMenuFeaturedCard featured={menu.featured} onNavigate={onNavigate} />

        <div
          className={`flex-1 grid gap-6 ${
            menu.columns.length === 3 ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          {menu.columns.map((col, i) => (
            <MegaMenuColumn
              key={col.title}
              column={col}
              index={i}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      {/* CTA bar */}
      <MegaMenuCTABar cta={menu.cta} onNavigate={onNavigate} />
    </motion.div>
  );
}
