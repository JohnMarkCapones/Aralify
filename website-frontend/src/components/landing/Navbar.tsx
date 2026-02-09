"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Rocket, BookOpen, Code2, Terminal, Shield, Zap, Cpu, Globe, Layers, Database, Sparkles, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { NavSearchTrigger } from "@/components/navigation/NavSearchTrigger";
import { UserNavSection } from "@/components/navigation/UserNavSection";
import { NotificationBell } from "@/components/navigation/NotificationBell";
import { GridPattern } from "@/components/effects";

interface NavbarProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollYProgress, isScrolled } = useScrollProgress();

  // Use lifted state if available, otherwise internal
  const isOpen = mobileMenuOpen ?? internalOpen;
  const setIsOpen = setMobileMenuOpen ?? setInternalOpen;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { href: "/courses", label: "COURSES" },
    { href: "/about", label: "ABOUT" },
    { href: "/blog", label: "BLOG" },
  ];

  const megaMenuItems = [
    {
      name: "ACADEMY",
      icon: <BookOpen size={20} />,
      columns: [
        {
          title: "LEARNING PATHS",
          accent: "bg-primary",
          items: [
            { name: "Frontend Development", desc: "HTML, CSS, React, Next.js", icon: <Layers size={16} />, isNew: false },
            { name: "Backend Development", desc: "Node.js, APIs, Databases", icon: <Database size={16} />, isNew: false },
            { name: "Fullstack Journey", desc: "The complete learning path", icon: <Cpu size={16} />, isNew: false },
          ],
        },
        {
          title: "TOPICS",
          accent: "bg-secondary",
          items: [
            { name: "AI & Machine Learning", desc: "Python, TensorFlow basics", icon: <Zap size={16} />, isNew: false },
            { name: "Cybersecurity", desc: "Secure coding practices", icon: <Shield size={16} />, isNew: false },
            { name: "Cloud & DevOps", desc: "AWS, Docker, CI/CD", icon: <Globe size={16} />, isNew: false },
          ],
        },
        {
          title: "NEW COURSES",
          accent: "bg-accent",
          items: [
            { name: "Rust Fundamentals", desc: "Systems programming", icon: <Terminal size={16} />, isNew: true },
            { name: "Web3 Basics", desc: "Blockchain & smart contracts", icon: <Rocket size={16} />, isNew: true },
          ],
        },
      ],
    },
    {
      name: "RESOURCES",
      icon: <Layers size={20} />,
      columns: [
        {
          title: "TOOLS",
          accent: "bg-primary",
          items: [
            { name: "Code Playground", desc: "Write & run code in-browser", icon: <Terminal size={16} />, isNew: false },
            { name: "API Sandbox", desc: "Test APIs in real-time", icon: <Code2 size={16} />, isNew: false },
          ],
        },
        {
          title: "COMMUNITY",
          accent: "bg-secondary",
          items: [
            { name: "Success Stories", desc: "Learner achievements", icon: <Sparkles size={16} />, isNew: false },
            { name: "Discussion Forum", desc: "Ask questions, share tips", icon: <MessageSquare size={16} />, isNew: false },
          ],
        },
      ],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b-4 border-border bg-background/90 backdrop-blur-xl">
      <div
        className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Animated Logo */}
        <Link
          href="/"
          className="font-display font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer flex items-center gap-3 group"
        >
          <motion.div
            className={`bg-primary neo-brutal-border neo-brutal-shadow-sm transition-all duration-300 ${
              isScrolled ? "p-1.5" : "p-2"
            }`}
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Code2
              size={isScrolled ? 20 : 24}
              className="text-white transition-all duration-300"
            />
          </motion.div>
          <span
            className={`transition-all duration-300 ${
              isScrolled ? "text-2xl" : "text-3xl"
            }`}
          >
            ARAL<span className="text-primary">IFY</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-display font-bold text-sm h-full">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 px-3 rounded-xl transition-colors"
              >
                {/* Sliding Active Indicator */}
                {isActive && (
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
                {/* Hover micro-interaction wrapper */}
                <motion.span
                  whileHover={{ y: -2 }}
                  className={`inline-block transition-colors ${
                    isActive
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {link.label}
                </motion.span>
              </Link>
            );
          })}

          {megaMenuItems.map((menu) => (
            <div
              key={menu.name}
              className="relative h-full flex items-center group"
              onMouseEnter={() => setActiveMenu(menu.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-primary/5 cursor-pointer"
              >
                {menu.name}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    activeMenu === menu.name ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {activeMenu === menu.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-card neo-brutal-border neo-brutal-shadow-lg p-8 rounded-3xl z-50 grid grid-cols-3 gap-8"
                  >
                    {menu.columns.map((col, colIdx) => (
                      <motion.div
                        key={col.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: colIdx * 0.05 }}
                        className="space-y-4"
                      >
                        {/* Colored accent bar */}
                        <div className={`h-1 w-12 rounded-full ${col.accent}`} />
                        <h4 className="text-xs tracking-widest text-muted-foreground font-black border-b-2 border-primary/20 pb-2">
                          {col.title}
                        </h4>
                        <div className="flex flex-col gap-2">
                          {col.items.map((item) => (
                            <a
                              key={item.name}
                              href="#"
                              className="relative flex items-start gap-3 p-3 hover:bg-primary/5 rounded-xl transition-all group/item"
                            >
                              <div className="mt-1 p-2 bg-foreground text-background rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <div className="font-black text-base group-hover/item:text-primary flex items-center gap-2">
                                  {item.name}
                                  {item.isNew && (
                                    <span className="bg-accent neo-brutal-border text-[9px] font-black uppercase px-1.5 py-0.5 rounded rotate-[-3deg] inline-block">
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm font-medium text-muted-foreground leading-tight">
                                  {item.desc}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="flex items-center gap-3 border-l-4 border-border pl-8">
            <NavSearchTrigger />
            <ThemeToggle />
            <NotificationBell />
            <UserNavSection />
          </div>
        </div>

        {/* Mobile Controls - hidden, bottom nav takes over */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-primary to-accent"
        style={{ scaleX: smoothProgress }}
      />

      {/* Mobile Full-Screen Menu Takeover */}
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
                onClick={() => setIsOpen(false)}
                className="font-display font-black text-2xl tracking-tighter flex items-center gap-2"
              >
                <div className="bg-primary p-1.5 neo-brutal-border">
                  <Code2 size={18} className="text-white" />
                </div>
                ARAL<span className="text-primary">IFY</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 neo-brutal-border neo-brutal-shadow-sm bg-card cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6 relative z-10">
              {/* Nav links as brutalist cards */}
              <div className="flex flex-col gap-3">
                {navLinks.map((link, i) => {
                  const colors = ["border-l-primary", "border-l-secondary", "border-l-accent"];
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block font-display font-black text-xl py-4 px-5 rounded-2xl neo-brutal-border border-l-[6px] transition-colors ${
                          colors[i % colors.length]
                        } ${
                          pathname.startsWith(link.href)
                            ? "bg-primary text-white neo-brutal-shadow-sm"
                            : "bg-card hover:bg-primary/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mega menu sections */}
              {megaMenuItems.map((menu, menuIdx) => (
                <motion.div
                  key={menu.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + menuIdx) * 0.08 }}
                  className="space-y-4"
                >
                  <div className="text-2xl font-black text-primary flex items-center gap-2">
                    {menu.icon} {menu.name}
                  </div>
                  {menu.columns.map((col) => (
                    <div key={col.title} className="pl-4 space-y-3">
                      {col.items.map((item) => (
                        <a
                          key={item.name}
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col p-5 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-2xl cursor-pointer"
                        >
                          <span className="font-black text-lg flex items-center gap-2">
                            {item.name}
                            {item.isNew && (
                              <span className="bg-accent neo-brutal-border text-[9px] font-black uppercase px-1.5 py-0.5 rounded rotate-[-3deg] inline-block">
                                NEW
                              </span>
                            )}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {item.desc}
                          </span>
                        </a>
                      ))}
                    </div>
                  ))}
                </motion.div>
              ))}

              {/* Auth section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + megaMenuItems.length) * 0.08 }}
                className="flex flex-col gap-3 pt-4 border-t-4 border-border"
              >
                <UserNavSection />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
