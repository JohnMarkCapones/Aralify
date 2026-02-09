'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout/PageShell';
import { searchResults, type SearchResult } from '@/lib/data/search';
import { Search, BookOpen, Code2, Swords, Users, ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'all', label: 'All', icon: <Search size={14} /> },
  { id: 'course', label: 'Courses', icon: <BookOpen size={14} /> },
  { id: 'lesson', label: 'Lessons', icon: <Code2 size={14} /> },
  { id: 'challenge', label: 'Challenges', icon: <Swords size={14} /> },
  { id: 'community', label: 'Community', icon: <Users size={14} /> },
] as const;

type Tab = typeof tabs[number]['id'];

export function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return searchResults.filter((r) => {
      const matchesQuery = !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      const matchesTab = activeTab === 'all' || r.type === activeTab;
      return matchesQuery && matchesTab;
    });
  }, [query, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const getSlugPrefix = (result: SearchResult) => {
    switch (result.type) {
      case 'course': return `/courses/${result.slug}`;
      case 'lesson': return `/courses/${result.slug}`;
      case 'challenge': return `/challenges/${result.slug}`;
      case 'community': return `/community`;
      default: return '/';
    }
  };

  return (
    <PageShell>
      {/* Header */}
      <section className="py-12 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">SEARCH</h1>

          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses, lessons, challenges..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg neo-brutal-border neo-brutal-shadow-sm rounded-xl bg-card font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 neo-brutal-border rounded-xl font-black text-sm uppercase transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white neo-brutal-shadow-sm'
                    : 'bg-card hover:bg-primary/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm font-bold text-muted-foreground mb-6">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} {query && `for "${query}"`}
          </p>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((result, i) => (
                <motion.div
                  key={`${result.type}-${result.slug}-${i}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={getSlugPrefix(result)}
                    className="block bg-card neo-brutal-border neo-brutal-shadow rounded-xl p-5 group hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border bg-primary/10 text-primary">
                            {result.type}
                          </span>
                          {result.meta && (
                            <span className="text-xs font-bold text-muted-foreground">{result.meta}</span>
                          )}
                        </div>
                        <h3 className="font-black text-lg">{result.title}</h3>
                        <p className="text-sm font-medium text-muted-foreground mt-0.5">{result.description}</p>
                      </div>
                      <span className="text-primary shrink-0 group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">:(</div>
              <h3 className="text-2xl font-black uppercase mb-2">NO RESULTS FOUND</h3>
              <p className="text-muted-foreground font-medium">
                Try different keywords or browse our <Link href="/courses" className="text-primary font-black hover:underline">courses</Link>.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
