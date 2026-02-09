"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { showcaseProjects, showcaseTags } from "@/lib/data/showcase";
import { Heart, ArrowUpDown } from "lucide-react";

export default function ShowcasePage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState<"likes" | "title">("likes");

  const filtered = useMemo(() => {
    let results = selectedTag === "All"
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.tags.includes(selectedTag));

    if (sortBy === "likes") {
      results = [...results].sort((a, b) => b.likes - a.likes);
    } else {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [selectedTag, sortBy]);

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
            SHOWCASE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-medium text-muted-foreground max-w-2xl"
          >
            Amazing projects built by Aralify learners. Get inspired and share your own.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {showcaseTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 neo-brutal-border rounded-full font-black text-sm uppercase transition-colors ${
                    selectedTag === tag
                      ? "bg-primary text-white"
                      : "bg-card hover:bg-primary/10"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSortBy(sortBy === "likes" ? "title" : "likes")}
              className="flex items-center gap-2 px-4 py-2 neo-brutal-border rounded-xl font-bold text-sm bg-card hover:bg-muted/50 transition-colors"
            >
              <ArrowUpDown size={14} />
              Sort by: {sortBy === "likes" ? "Most Liked" : "Title"}
            </button>
          </div>

          {/* Project Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform"
              >
                {/* Gradient placeholder */}
                <div className={`h-36 bg-gradient-to-br ${project.gradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 font-black text-4xl uppercase tracking-tighter">{project.title.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-black text-lg leading-tight">{project.title}</h3>
                  <p className="text-xs font-bold text-primary">by {project.author}</p>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t-2 border-border">
                    <button className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors">
                      <Heart size={14} /> {project.likes}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
