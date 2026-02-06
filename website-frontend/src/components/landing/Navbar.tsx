"use client";

import Link from "next/link";
import { NeoButton } from "@/components/ui/neo-button";
import { Menu, X, ChevronDown, Rocket, BookOpen, Code2, Terminal, Shield, Zap, Cpu, Globe, Layers, Database, Sparkles, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const megaMenuItems = [
    {
      name: "ACADEMY",
      icon: <BookOpen size={20} />,
      columns: [
        {
          title: "ENGINEERING PATHS",
          items: [
            { name: "Frontend Master", desc: "React, Next.js, Framer", icon: <Layers size={16} /> },
            { name: "Backend Architect", desc: "Node, Go, System Design", icon: <Database size={16} /> },
            { name: "Fullstack Elite", desc: "The complete journey", icon: <Cpu size={16} /> },
          ]
        },
        {
          title: "SPECIALIZATIONS",
          items: [
            { name: "AI & ML", desc: "Neural networks for devs", icon: <Zap size={16} /> },
            { name: "Cybersecurity", desc: "Defensive programming", icon: <Shield size={16} /> },
            { name: "Cloud Ops", desc: "AWS, Docker, K8s", icon: <Globe size={16} /> },
          ]
        },
        {
          title: "LATEST DROPS",
          items: [
            { name: "Rust for JS Devs", desc: "Memory safety", icon: <Terminal size={16} /> },
            { name: "Web3 Mastery", desc: "Smart contracts", icon: <Rocket size={16} /> },
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
            { name: "Aralify IDE", desc: "Cloud development", icon: <Terminal size={16} /> },
            { name: "API Sandbox", desc: "Test in real-time", icon: <Code2 size={16} /> },
          ]
        },
        {
          title: "COMMUNITY",
          items: [
            { name: "Success Stories", desc: "Hire data", icon: <Sparkles size={16} /> },
            { name: "Dev Forum", desc: "Discuss topics", icon: <MessageSquare size={16} /> },
          ]
        }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b-4 border-black bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="text-4xl font-display font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer flex items-center gap-3 group">
            <div className="bg-primary p-2 neo-brutal-border neo-brutal-shadow-sm group-hover:rotate-12 transition-transform">
              <Code2 size={28} className="text-white" />
            </div>
            <span>ARAL<span className="text-primary">IFY</span></span>
        </Link>

        {/* Desktop Mega Menu */}
        <div className="hidden lg:flex items-center gap-10 font-display font-bold text-sm h-full">
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
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white neo-brutal-border neo-brutal-shadow-lg p-10 rounded-[2.5rem] z-50 grid grid-cols-3 gap-10"
                  >
                    {menu.columns.map((col) => (
                      <div key={col.title} className="space-y-6">
                        <h4 className="text-xs tracking-widest text-muted-foreground font-black border-b-2 border-primary/20 pb-2">{col.title}</h4>
                        <div className="flex flex-col gap-4">
                          {col.items.map((item) => (
                            <a key={item.name} href="#" className="flex items-start gap-4 p-4 hover:bg-primary/5 rounded-2xl transition-all group/item neo-brutal-border border-transparent hover:border-black">
                              <div className="mt-1 p-2 bg-black text-white rounded-lg group-hover/item:bg-primary transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <div className="font-black text-lg group-hover/item:text-primary">{item.name}</div>
                                <div className="text-sm font-medium opacity-60 leading-tight">{item.desc}</div>
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
          <div className="flex items-center gap-4 border-l-4 border-black pl-10">
            <Link href="/login" className="font-display font-black hover:text-primary transition-colors cursor-pointer">
              LOGIN
            </Link>
            <NeoButton size="md" variant="primary" className="rounded-2xl">Deploy Portal</NeoButton>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-3 neo-brutal-border neo-brutal-shadow bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="lg:hidden fixed inset-0 top-24 bg-background z-50 overflow-y-auto"
          >
            <div className="p-6 flex flex-col gap-8">
              {megaMenuItems.map(menu => (
                <div key={menu.name} className="space-y-4">
                  <div className="text-2xl font-black text-primary flex items-center gap-2">
                    {menu.icon} {menu.name}
                  </div>
                  {menu.columns.map(col => (
                    <div key={col.title} className="pl-4 space-y-4">
                      {col.items.map(item => (
                        <a key={item.name} className="flex flex-col p-6 bg-white neo-brutal-border neo-brutal-shadow-sm rounded-2xl">
                          <span className="font-black text-xl">{item.name}</span>
                          <span className="text-sm opacity-60">{item.desc}</span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
