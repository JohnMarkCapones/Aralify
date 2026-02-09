'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeoButton } from '@/components/ui/neo-button';
import { Code2, ArrowRight, Zap, BookOpen, Trophy, Flame, Gift } from 'lucide-react';
import { FloatingShapes, GridPattern } from '@/components/effects';

export default function InvitePage() {
  const params = useParams();
  const code = params.code as string;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden noise-overlay">
        <FloatingShapes shapes={[
          { type: "ring", size: 80, x: "10%", y: "10%", color: "border-white", delay: 0, duration: 14 },
          { type: "circle", size: 30, x: "80%", y: "20%", color: "bg-white", delay: 1, duration: 10 },
          { type: "diamond", size: 35, x: "85%", y: "75%", color: "bg-white", delay: 2, duration: 12 },
          { type: "cross", size: 22, x: "15%", y: "85%", color: "bg-white", delay: 1.5, duration: 9 },
          { type: "square", size: 20, x: "50%", y: "5%", color: "bg-white", delay: 3, duration: 11, rotate: 45 },
        ]} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-white text-primary rounded-xl neo-brutal-border-white group-hover:rotate-12 transition-transform">
              <Code2 size={24} />
            </div>
            <span className="font-display font-black text-3xl uppercase tracking-tighter">Aralify</span>
          </Link>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                YOU&apos;RE<br />INVITED!
              </h1>
              <p className="text-xl font-medium opacity-70 max-w-sm">
                A friend thinks you&apos;d love learning to code on Aralify. Join now and get bonus XP!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl neo-brutal-border-white overflow-hidden max-w-sm p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Gift size={20} />
                </div>
                <span className="font-display font-black text-sm uppercase tracking-wider">What You Get</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Zap size={14} />, text: "500 bonus XP to start" },
                  { icon: <BookOpen size={14} />, text: "Access to all free courses" },
                  { icon: <Trophy size={14} />, text: "Leaderboards & achievements" },
                  { icon: <Flame size={14} />, text: "Daily challenges & streaks" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center gap-3 text-white/70 text-sm font-medium"
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div />
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative px-6 py-12">
        <GridPattern />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-10 justify-center">
            <div className="p-2 bg-primary text-white rounded-xl neo-brutal-border">
              <Code2 size={20} />
            </div>
            <span className="font-display font-black text-2xl uppercase tracking-tighter">Aralify</span>
          </Link>

          <div className="p-8 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-primary text-white rounded-2xl neo-brutal-border neo-brutal-shadow flex items-center justify-center"
            >
              <Gift size={36} />
            </motion.div>

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-accent px-4 py-1.5 neo-brutal-border neo-brutal-shadow-sm rounded-full mb-4"
              >
                <Zap size={14} />
                <span className="font-display font-black text-xs uppercase tracking-widest">+500 Bonus XP</span>
              </motion.div>

              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                JOIN ARALIFY
              </h2>
              <p className="text-muted-foreground font-medium">
                Your friend invited you to learn coding together. Sign up now and start with bonus XP!
              </p>
            </div>

            <div className="space-y-3">
              <Link href={`/signup?ref=${code}`}>
                <NeoButton variant="primary" size="lg" className="w-full text-lg">
                  JOIN ARALIFY FREE <ArrowRight size={18} className="ml-2" />
                </NeoButton>
              </Link>

              <p className="text-center text-xs font-medium text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-black hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { icon: <BookOpen size={18} />, label: "50+ Courses" },
              { icon: <Zap size={18} />, label: "XP System" },
              { icon: <Flame size={18} />, label: "Daily Streaks" },
              { icon: <Trophy size={18} />, label: "Leaderboards" },
            ].map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 p-3 bg-card neo-brutal-border rounded-xl">
                <span className="text-primary">{feature.icon}</span>
                <span className="text-xs font-black uppercase">{feature.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
