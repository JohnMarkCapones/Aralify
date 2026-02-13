"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridPattern } from "@/components/effects";
import { UserNavSection } from "./UserNavSection";
import { ThemeToggle } from "./ThemeToggle";
import { megaMenus, simpleNavLinks, type MegaMenuData } from "./navbar-data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileAccordion({ menu, index, onClose }: { menu: MegaMenuData; index: number; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const FeaturedIcon = menu.featured.icon;
  const accents = ["border-l-primary", "border-l-secondary", "border-l-accent"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between font-display font-black text-xl py-4 px-5 rounded-2xl neo-brutal-border border-l-[6px] bg-card hover:bg-primary/5 transition-colors cursor-pointer ${
          accents[index % accents.length]
        }`}
      >
        <span className="flex items-center gap-3">
          <FeaturedIcon size={20} className="text-primary" />
          {menu.name}
        </span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 pl-3 flex flex-col gap-2">
              {/* Featured card (compact mobile version) */}
              <Link
                href={menu.featured.ctaHref}
                onClick={onClose}
                className={`block bg-gradient-to-r ${menu.featured.gradient} text-white p-4 rounded-2xl neo-brutal-border`}
              >
                <p className="font-black text-base">{menu.featured.title}</p>
                <p className="text-sm text-white/80 mt-1">{menu.featured.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold mt-3">
                  {menu.featured.ctaLabel}
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Columns */}
              {menu.columns.map((col) => (
                <div key={col.title} className="space-y-2">
                  <div className="flex items-center gap-2 pt-2">
                    <div className={`h-1 w-6 rounded-full ${col.accent}`} />
                    <span className="text-[10px] tracking-widest text-muted-foreground font-black">
                      {col.title}
                    </span>
                  </div>
                  {col.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl"
                      >
                        <div className="p-1.5 bg-foreground text-background rounded-lg shrink-0">
                          <ItemIcon size={14} />
                        </div>
                        <div>
                          <span className="font-black text-sm flex items-center gap-2">
                            {item.name}
                            {item.badge && (
                              <span className="bg-accent neo-brutal-border text-[8px] font-black uppercase px-1 py-0.5 rounded rotate-[-3deg] inline-block leading-none">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground block">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const colors = ["border-l-primary", "border-l-secondary", "border-l-accent"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden fixed inset-0 bg-background z-[200] overflow-y-auto"
        >
          <GridPattern />

          {/* Top bar */}
          <div className="flex items-center justify-between p-4 border-b-4 border-border">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Aralify"
                width={381}
                height={154}
                className="object-contain"
                style={{ height: "56px", width: "auto" }}
                unoptimized
              />
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={onClose}
                className="p-2.5 neo-brutal-border neo-brutal-shadow-sm bg-card cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-3 relative z-10">
            {/* Mega menu accordions */}
            {megaMenus.map((menu, i) => (
              <MobileAccordion key={menu.name} menu={menu} index={i} onClose={onClose} />
            ))}

            {/* Simple nav links */}
            {simpleNavLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (megaMenus.length + i) * 0.08, type: "spring", stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`block font-display font-black text-xl py-4 px-5 rounded-2xl neo-brutal-border border-l-[6px] bg-card hover:bg-primary/5 transition-colors ${
                    colors[(megaMenus.length + i) % colors.length]
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Auth section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (megaMenus.length + simpleNavLinks.length) * 0.08 }}
              className="flex flex-col gap-3 pt-4 border-t-4 border-border"
            >
              <UserNavSection />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
