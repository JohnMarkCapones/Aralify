"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { NavToolbar } from "@/components/navigation/NavToolbar";
import { MegaMenuPanel } from "@/components/navigation/MegaMenuPanel";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { megaMenus, simpleNavLinks } from "@/components/navigation/navbar-data";

interface NavbarProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollYProgress, isScrolled } = useScrollProgress();

  const isOpen = mobileMenuOpen ?? internalOpen;
  const setIsOpen = setMobileMenuOpen ?? setInternalOpen;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ── Hover intent timers ──────────────────────────────────────
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMenuEnter = useCallback((menuName: string) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    enterTimer.current = setTimeout(() => setActiveMenu(menuName), 100);
  }, []);

  const handleMenuLeave = useCallback(() => {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const closeMenu = useCallback(() => {
    setActiveMenu(null);
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  // ── Escape key ───────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  // ── Cleanup timers ───────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-[100] border-b-4 border-border bg-background/90 backdrop-blur-xl transition-shadow duration-300 ${
          isScrolled ? "neo-brutal-shadow-sm" : ""
        }`}
        style={{ top: "var(--banner-h, 0px)" }}
      >
        <div
          className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="hover:scale-105 transition-transform cursor-pointer flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Aralify"
              width={381}
              height={154}
              className="object-contain transition-all duration-300"
              style={{ height: isScrolled ? "56px" : "72px", width: "auto" }}
              unoptimized
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 font-display font-bold text-sm h-full">
            {/* Mega menu triggers */}
            {megaMenus.map((menu) => {
              const isActive = activeMenu === menu.name;
              return (
                <div
                  key={menu.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMenuEnter(menu.name)}
                  onMouseLeave={handleMenuLeave}
                  role="navigation"
                  aria-label={menu.name}
                >
                  <motion.button
                    whileHover={{ y: -1 }}
                    className={`flex items-center gap-1.5 py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-primary bg-primary/10 neo-brutal-border neo-brutal-shadow-sm"
                        : "hover:text-primary hover:bg-primary/5"
                    }`}
                    aria-expanded={isActive}
                    aria-haspopup="true"
                  >
                    {menu.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  {/* Invisible bridge — prevents dead zone between trigger and panel */}
                  {isActive && (
                    <div className="absolute top-full left-0 right-0 h-4" />
                  )}

                  <AnimatePresence>
                    {isActive && (
                      <MegaMenuPanel menu={menu} onNavigate={closeMenu} />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Divider dot */}
            <div className="w-1 h-1 rounded-full bg-border mx-1 hidden xl:block" />

            {/* Simple links */}
            {simpleNavLinks.map((link) => {
              const isLinkActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-2 px-3 rounded-xl transition-colors"
                >
                  {isLinkActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 neo-brutal-border neo-brutal-shadow-sm bg-primary/10 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <motion.span
                    whileHover={{ y: -1 }}
                    className={`inline-block transition-colors ${
                      isLinkActive ? "text-primary" : "hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              );
            })}

            <NavToolbar />
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ scaleX: smoothProgress }}
        />
      </nav>

      {/* Backdrop overlay when mega menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[99]"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
