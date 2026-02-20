"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { faqSections } from "@/lib/data/faq";
import { Search, ChevronDown, ChevronUp, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const filteredSections = useMemo(() => {
    if (!search) return faqSections;
    const q = search.toLowerCase();
    return faqSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [search]);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <PageShell>
      {/* Header */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
          >
            FAQ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-medium text-muted-foreground max-w-2xl mb-8"
          >
            Find answers to the most common questions about Aralify.
          </motion.p>

          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 neo-brutal-border neo-brutal-shadow-sm rounded-xl bg-card font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {filteredSections.length > 0 ? (
            <div className="space-y-10">
              {filteredSections.map((section, si) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.05 }}
                >
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">{section.title}</h2>
                  <div className="space-y-3">
                    {section.items.map((item, ii) => {
                      const key = `${si}-${ii}`;
                      const isOpen = openItems[key];
                      return (
                        <div
                          key={key}
                          className="neo-brutal-border rounded-xl overflow-hidden bg-card"
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-center justify-between p-5 text-left font-bold text-sm hover:bg-muted/30 transition-colors"
                          >
                            <span>{item.question}</span>
                            {isOpen ? <ChevronUp size={16} className="shrink-0 ml-2" /> : <ChevronDown size={16} className="shrink-0 ml-2" />}
                          </button>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="px-5 pb-5"
                            >
                              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                {item.answer}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">?</div>
              <h3 className="text-2xl font-black uppercase mb-2">NO RESULTS</h3>
              <p className="text-muted-foreground font-medium">Try different search terms.</p>
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center p-10 bg-primary/5 neo-brutal-border neo-brutal-shadow rounded-2xl"
          >
            <MessageCircle size={32} className="mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">STILL HAVE QUESTIONS?</h3>
            <p className="text-muted-foreground font-medium mb-6">
              Our support team is happy to help.
            </p>
            <Link href="/contact">
              <NeoButton variant="primary" size="md">
                CONTACT US <ArrowRight size={16} className="ml-2" />
              </NeoButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
