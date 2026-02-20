'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout/PageShell';
import { NeoButton } from '@/components/ui/neo-button';
import { challengeDetails } from '@/lib/data/challenges';
import {
  ArrowLeft, Zap, Users, ChevronDown, ChevronUp, Play, CheckCircle, XCircle,
  Lightbulb, Terminal, Clock,
} from 'lucide-react';

const diffColor: Record<string, string> = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export default function ChallengeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const challenge = challengeDetails[slug];

  const [showHints, setShowHints] = useState<boolean[]>([]);
  const [output, setOutput] = useState<string | null>(null);
  const [result, setResult] = useState<'pass' | 'fail' | null>(null);

  if (!challenge) {
    return (
      <PageShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">CHALLENGE NOT FOUND</h1>
          <p className="text-muted-foreground font-medium mb-6">This challenge doesn&apos;t exist or has been removed.</p>
          <Link href="/challenges">
            <NeoButton variant="primary" size="md">
              <ArrowLeft size={16} className="mr-2" /> BACK TO CHALLENGES
            </NeoButton>
          </Link>
        </div>
      </PageShell>
    );
  }

  const toggleHint = (index: number) => {
    setShowHints((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleRun = () => {
    setOutput('Running tests...\n\nTest 1: PASSED ✓\nTest 2: PASSED ✓\nTest 3: PASSED ✓\n\nAll tests passed!');
    setResult('pass');
  };

  return (
    <PageShell>
      {/* Top bar */}
      <section className="py-4 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/challenges" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> Back to Challenges
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 font-black text-primary">
                <Zap size={14} /> {challenge.xp} XP
              </span>
              <span className="flex items-center gap-1 font-bold text-muted-foreground">
                <Users size={14} /> {challenge.solvedBy} solved
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Description */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={challenge.icon} alt={challenge.language} className="w-10 h-10" loading="lazy" />
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter">{challenge.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border ${diffColor[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">{challenge.language}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {challenge.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full neo-brutal-border">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
                <h2 className="font-black uppercase tracking-tight mb-3">Description</h2>
                <div className="text-sm font-medium text-muted-foreground whitespace-pre-line leading-relaxed">
                  {challenge.description}
                </div>
              </div>
            </motion.div>

            {/* Constraints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <h2 className="font-black uppercase tracking-tight mb-3">Constraints</h2>
              <ul className="space-y-2">
                {challenge.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium text-muted-foreground">
                    <span className="text-primary font-black mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Hints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <h2 className="font-black uppercase tracking-tight mb-3 flex items-center gap-2">
                <Lightbulb size={18} className="text-yellow-500" /> Hints
              </h2>
              <div className="space-y-2">
                {challenge.hints.map((hint, i) => (
                  <div key={i}>
                    <button
                      onClick={() => toggleHint(i)}
                      className="w-full flex items-center justify-between p-3 bg-muted/30 neo-brutal-border rounded-xl text-sm font-bold hover:bg-muted/50 transition-colors"
                    >
                      <span>Hint {i + 1}</span>
                      {showHints[i] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {showHints[i] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="px-3 py-2 text-sm font-medium text-muted-foreground"
                      >
                        {hint}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Code editor + Tests */}
          <div className="space-y-6">
            {/* Code editor mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0d1117] neo-brutal-border rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs font-mono text-white/40 flex items-center gap-1">
                  <Terminal size={12} /> solution.{challenge.language === 'Python' ? 'py' : challenge.language === 'JavaScript' ? 'js' : 'ts'}
                </span>
              </div>
              <div className="p-4 font-mono text-sm text-white/80 whitespace-pre-wrap min-h-[300px] leading-relaxed">
                {challenge.starterCode}
              </div>
            </motion.div>

            {/* Test Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
            >
              <h2 className="font-black uppercase tracking-tight mb-3 flex items-center gap-2">
                <Clock size={16} /> Test Cases
              </h2>
              <div className="space-y-3">
                {challenge.testCases.map((tc, i) => (
                  <div key={i} className="p-3 bg-muted/30 neo-brutal-border rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      {result === 'pass' ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : result === 'fail' ? (
                        <XCircle size={14} className="text-destructive" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className="text-xs font-black uppercase">Test {i + 1}</span>
                    </div>
                    <div className="font-mono text-xs space-y-1">
                      <div><span className="text-muted-foreground">Input:</span> {tc.input}</div>
                      <div><span className="text-muted-foreground">Expected:</span> {tc.expected}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Output */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0d1117] neo-brutal-border rounded-2xl p-4"
              >
                <div className="text-xs font-mono text-white/40 mb-2">Output</div>
                <div className="font-mono text-sm text-green-400 whitespace-pre-wrap">{output}</div>
              </motion.div>
            )}

            {/* Submit */}
            <div className="flex gap-3">
              <NeoButton variant="outline" size="md" className="flex-1" onClick={handleRun}>
                <Play size={16} className="mr-2" /> RUN
              </NeoButton>
              <NeoButton variant="primary" size="md" className="flex-1" onClick={handleRun}>
                SUBMIT <Zap size={16} className="ml-2" />
              </NeoButton>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
