"use client";

import { PageShell } from "@/components/layout/PageShell";
import { blogPosts, blogCategories } from "@/lib/data/blog";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? blogPosts.filter((p) => p.category === selectedCategory)
    : blogPosts;

  return (
    <PageShell>
      {/* Header */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">BLOG</h1>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl">
            Guides, tutorials, and insights on learning to code, career development, and the Aralify platform.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 neo-brutal-border rounded-full font-black text-sm uppercase transition-colors ${
                !selectedCategory ? "bg-primary text-white" : "bg-card hover:bg-primary/10"
              }`}
            >
              All
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-2 neo-brutal-border rounded-full font-black text-sm uppercase transition-colors ${
                  selectedCategory === cat ? "bg-primary text-white" : "bg-card hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post (first) */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link
                href={`/blog/${filtered[0].slug}`}
                className="block bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform"
              >
                <div className="grid md:grid-cols-2">
                  <div className="bg-primary/10 p-12 flex items-center justify-center">
                    <div className="text-8xl font-black text-primary/20 uppercase tracking-tighter leading-none">
                      {filtered[0].title.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary font-black text-xs uppercase rounded-full neo-brutal-border">
                        {filtered[0].category}
                      </span>
                      <span className="text-sm font-bold text-muted-foreground flex items-center gap-1">
                        <Clock size={14} /> {filtered[0].readTime} min read
                      </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">{filtered[0].title}</h2>
                    <p className="text-lg font-medium text-muted-foreground leading-relaxed">{filtered[0].excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t-2 border-border">
                      <span className="text-sm font-bold text-muted-foreground">{filtered[0].date}</span>
                      <span className="font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        READ <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Post grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(1).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform h-full"
                >
                  <div className="p-6 space-y-3 flex flex-col h-full">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary font-black text-xs uppercase rounded-full flex items-center gap-1">
                        <Tag size={10} /> {post.category}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> {post.readTime} min
                      </span>
                    </div>

                    <h3 className="text-xl font-black uppercase tracking-tighter leading-tight">{post.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                      <span className="text-xs font-bold text-muted-foreground">{post.date}</span>
                      <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        READ <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
