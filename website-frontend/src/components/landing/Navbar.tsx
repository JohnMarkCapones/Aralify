"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NeoButton } from "@/components/ui/neo-button";
import { Menu, X, ChevronDown, Rocket, BookOpen, Code2, Terminal, Shield, Zap, Cpu, Globe, Layers, Database, Sparkles, MessageSquare, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();

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
          items: [
            { name: "Frontend Development", desc: "HTML, CSS, React, Next.js", icon: <Layers size={16} /> },
            { name: "Backend Development", desc: "Node.js, APIs, Databases", icon: <Database size={16} /> },
            { name: "Fullstack Journey", desc: "The complete learning path", icon: <Cpu size={16} /> },
          ]
        },
        {
          title: "TOPICS",
          items: [
            { name: "AI & Machine Learning", desc: "Python, TensorFlow basics", icon: <Zap size={16} /> },
            { name: "Cybersecurity", desc: "Secure coding practices", icon: <Shield size={16} /> },
            { name: "Cloud & DevOps", desc: "AWS, Docker, CI/CD", icon: <Globe size={16} /> },
          ]
        },
        {
          title: "NEW COURSES",
          items: [
            { name: "Rust Fundamentals", desc: "Systems programming", icon: <Terminal size={16} /> },
            { name: "Web3 Basics", desc: "Blockchain & smart contracts", icon: <Rocket size={16} /> },
          ]
        }
      ]
    },
    {
      name: "RESOURCES",
      icon: <Layers size={20} />,
      columns: [
        {
          title: "TOOLS",
          items: [
            { name: "Code Playground", desc: "Write & run code in-browser", icon: <Terminal size={16} /> },
            { name: "API Sandbox", desc: "Test APIs in real-time", icon: <Code2 size={16} /> },
          ]
        },
        {
          title: "COMMUNITY",
          items: [
            { name: "Success Stories", desc: "Learner achievements", icon: <Sparkles size={16} /> },
            { name: "Discussion Forum", desc: "Ask questions, share tips", icon: <MessageSquare size={16} /> },
          ]
        }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b-4 border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-display font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer flex items-center gap-3 group">
          <div className="bg-primary p-2 neo-brutal-border neo-brutal-shadow-sm group-hover:rotate-12 transition-transform">
            <Code2 size={24} className="text-white" />
          </div>
          <span>ARAL<span className="text-primary">IFY</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-display font-bold text-sm h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2 px-3 rounded-xl transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {megaMenuItems.map((menu) => (
            <div
              key={menu.name}
              className="relative h-full flex items-center group"
              onMouseEnter={() => setActiveMenu(menu.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-2 hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-primary/5">
                {menu.name}
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeMenu === menu.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-card neo-brutal-border neo-brutal-shadow-lg p-8 rounded-3xl z-50 grid grid-cols-3 gap-8"
                  >
                    {menu.columns.map((col) => (
                      <div key={col.title} className="space-y-4">
                        <h4 className="text-xs tracking-widest text-muted-foreground font-black border-b-2 border-primary/20 pb-2">{col.title}</h4>
                        <div className="flex flex-col gap-2">
                          {col.items.map((item) => (
                            <a key={item.name} href="#" className="flex items-start gap-3 p-3 hover:bg-primary/5 rounded-xl transition-all group/item">
                              <div className="mt-1 p-2 bg-foreground text-background rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <div className="font-black text-base group-hover/item:text-primary">{item.name}</div>
                                <div className="text-sm font-medium text-muted-foreground leading-tight">{item.desc}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="flex items-center gap-3 border-l-4 border-border pl-8">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 neo-brutal-border neo-brutal-shadow-sm bg-card hover:bg-primary/10 transition-colors rounded-xl"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <Link href="/login" className="font-display font-black hover:text-primary transition-colors cursor-pointer">
              LOGIN
            </Link>
            <NeoButton size="md" variant="primary" className="rounded-2xl">Get Started</NeoButton>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 neo-brutal-border neo-brutal-shadow-sm bg-card"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            className="p-2.5 neo-brutal-border neo-brutal-shadow-sm bg-card"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="lg:hidden fixed inset-0 top-20 bg-background z-50 overflow-y-auto"
          >
            <div className="p-6 flex flex-col gap-8">
              {megaMenuItems.map(menu => (
                <div key={menu.name} className="space-y-4">
                  <div className="text-2xl font-black text-primary flex items-center gap-2">
                    {menu.icon} {menu.name}
                  </div>
                  {menu.columns.map(col => (
                    <div key={col.title} className="pl-4 space-y-3">
                      {col.items.map(item => (
                        <a key={item.name} className="flex flex-col p-5 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-2xl">
                          <span className="font-black text-lg">{item.name}</span>
                          <span className="text-sm text-muted-foreground">{item.desc}</span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-display font-black text-lg py-3 px-5 rounded-2xl neo-brutal-border transition-colors ${
                      pathname.startsWith(link.href)
                        ? "bg-primary text-white neo-brutal-shadow-sm"
                        : "bg-card hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t-4 border-border">
                <Link href="/login" className="font-display font-black text-xl text-center py-4 neo-brutal-border bg-card rounded-2xl">LOGIN</Link>
                <NeoButton size="lg" variant="primary" className="w-full rounded-2xl">Get Started Free</NeoButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
