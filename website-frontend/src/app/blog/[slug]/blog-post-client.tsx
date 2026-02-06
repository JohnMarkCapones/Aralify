"use client";

import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import type { BlogPost } from "@/lib/data/blog";
import { ArrowLeft, ArrowRight, Clock, Tag, User } from "lucide-react";
import Link from "next/link";

export function BlogPostClient({ post }: { post: BlogPost }) {
  // Simple markdown-like rendering for the content
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("## ")) {
        return <h2 key={i} className="text-3xl font-black uppercase tracking-tighter mt-10 mb-4">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith("### ")) {
        return <h3 key={i} className="text-2xl font-black uppercase tracking-tighter mt-8 mb-3">{trimmed.slice(4)}</h3>;
      }
      if (trimmed.startsWith("- **")) {
        const parts = trimmed.slice(2).split("**");
        return (
          <li key={i} className="ml-6 list-disc text-lg font-medium text-muted-foreground leading-relaxed mb-2">
            <strong className="text-foreground font-black">{parts[1]}</strong>{parts[2]}
          </li>
        );
      }
      if (trimmed.startsWith("- ")) {
        return <li key={i} className="ml-6 list-disc text-lg font-medium text-muted-foreground leading-relaxed mb-2">{trimmed.slice(2)}</li>;
      }
      if (trimmed.match(/^\d+\.\s/)) {
        return <li key={i} className="ml-6 list-decimal text-lg font-medium text-muted-foreground leading-relaxed mb-2">{trimmed.replace(/^\d+\.\s/, "")}</li>;
      }
      // Bold text within paragraphs
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = trimmed.split(boldRegex);
      if (parts.length > 1) {
        return (
          <p key={i} className="text-lg font-medium text-muted-foreground leading-relaxed mb-4">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground font-black">{part}</strong> : part)}
          </p>
        );
      }
      return <p key={i} className="text-lg font-medium text-muted-foreground leading-relaxed mb-4">{trimmed}</p>;
    });
  };

  return (
    <PageShell>
      {/* Header */}
      <section className="py-16 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground font-bold mb-6 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary font-black text-xs uppercase rounded-full neo-brutal-border flex items-center gap-1">
              <Tag size={10} /> {post.category}
            </span>
            <span className="text-sm font-bold text-muted-foreground flex items-center gap-1">
              <Clock size={14} /> {post.readTime} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-4">{post.title}</h1>
          <p className="text-xl font-medium text-muted-foreground leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t-2 border-border">
            <div className="w-10 h-10 bg-primary text-white neo-brutal-border rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <div className="font-black text-sm">{post.author}</div>
              <div className="text-sm font-medium text-muted-foreground">{post.date}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="prose-none">
            {renderContent(post.content)}
          </article>

          {/* CTA */}
          <div className="mt-16 bg-primary/5 neo-brutal-border neo-brutal-shadow rounded-2xl p-8 text-center space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter">READY TO START LEARNING?</h3>
            <p className="font-medium text-muted-foreground max-w-md mx-auto">
              Put what you&apos;ve read into practice. Start coding for free on Aralify.
            </p>
            <Link href="/courses">
              <NeoButton size="lg" variant="primary" className="text-lg h-14 px-10 group">
                BROWSE COURSES <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </NeoButton>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
