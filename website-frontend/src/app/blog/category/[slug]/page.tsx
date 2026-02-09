"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { blogPosts, blogCategories } from "@/lib/data/blog";
import { Clock, ArrowRight, ArrowLeft, Tag } from "lucide-react";

export default function BlogCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const categoryName = blogCategories.find(
    (cat) => cat.toLowerCase().replace(/\s+/g, "-") === slug
  );

  const filtered = categoryName
    ? blogPosts.filter((p) => p.category === categoryName)
    : [];

  return (
    <PageShell>
      {/* Header */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={14} /> All Posts
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-primary text-white font-black text-sm uppercase rounded-full neo-brutal-border">
              {categoryName || slug}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            {categoryName || slug.replace(/-/g, " ").toUpperCase()}
          </h1>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} in this category.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/blog"
              className="px-4 py-2 neo-brutal-border rounded-full font-black text-sm uppercase bg-card hover:bg-primary/10 transition-colors"
            >
              All
            </Link>
            {blogCategories.map((cat) => {
              const catSlug = cat.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={cat}
                  href={`/blog/category/${catSlug}`}
                  className={`px-4 py-2 neo-brutal-border rounded-full font-black text-sm uppercase transition-colors ${
                    catSlug === slug ? "bg-primary text-white" : "bg-card hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
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
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">:(</div>
              <h3 className="text-2xl font-black uppercase mb-2">NO POSTS FOUND</h3>
              <p className="text-muted-foreground font-medium mb-6">
                No articles in this category yet.
              </p>
              <Link href="/blog" className="text-primary font-black hover:underline">
                View all posts
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
