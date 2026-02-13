"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NavFeaturedCard } from "./navbar-data";

interface MegaMenuFeaturedCardProps {
  featured: NavFeaturedCard;
  onNavigate?: () => void;
}

export function MegaMenuFeaturedCard({ featured, onNavigate }: MegaMenuFeaturedCardProps) {
  const Icon = featured.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-[260px] shrink-0"
    >
      <Link
        href={featured.ctaHref}
        onClick={onNavigate}
        className={`block h-full bg-gradient-to-br ${featured.gradient} rounded-2xl p-6 text-white neo-brutal-border relative overflow-hidden group/card`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10" />
          <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-white/[0.07]" />
          <div className="absolute right-6 top-6 w-12 h-12 rounded-full bg-white/[0.05]" />
          {/* Grid dots pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }} />
        </div>

        <div className="relative z-10 flex flex-col h-full min-h-[200px] justify-between">
          <div>
            <div className="p-2.5 bg-white/20 rounded-xl w-fit mb-4 backdrop-blur-sm neo-brutal-border-white">
              <Icon size={22} />
            </div>
            <h3 className="font-black text-lg leading-tight mb-2">
              {featured.title}
            </h3>
            <p className="text-sm text-white/80 leading-snug">
              {featured.description}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 font-black text-sm bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 w-fit group-hover/card:bg-white/25 transition-all">
            {featured.ctaLabel}
            <ArrowRight size={15} className="group-hover/card:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
