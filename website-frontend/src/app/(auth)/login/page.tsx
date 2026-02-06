'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { NeoButton } from '@/components/ui/neo-button';
import { Code2, ArrowRight, Flame, Trophy, Zap, Eye, EyeOff, Terminal, Sparkles, CheckCircle } from 'lucide-react';
import { FloatingShapes, GridPattern } from '@/components/effects';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    });
  };

  const handleGithubLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — Brand/decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden noise-overlay">
        <FloatingShapes shapes={[
          { type: "ring", size: 80, x: "10%", y: "10%", color: "border-white", delay: 0, duration: 14 },
          { type: "circle", size: 30, x: "80%", y: "20%", color: "bg-white", delay: 1, duration: 10 },
          { type: "diamond", size: 35, x: "85%", y: "75%", color: "bg-white", delay: 2, duration: 12 },
          { type: "cross", size: 22, x: "15%", y: "85%", color: "bg-white", delay: 1.5, duration: 9 },
          { type: "square", size: 20, x: "50%", y: "5%", color: "bg-white", delay: 3, duration: 11, rotate: 45 },
        ]} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-white text-primary rounded-xl neo-brutal-border-white group-hover:rotate-12 transition-transform">
              <Code2 size={24} />
            </div>
            <span className="font-display font-black text-3xl uppercase tracking-tighter">Aralify</span>
          </Link>

          {/* Center content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                WELCOME<br />BACK,<br />CODER.
              </h1>
              <p className="text-xl font-medium opacity-70 max-w-sm">
                Your streak is waiting. Pick up where you left off and keep leveling up.
              </p>
            </div>

            {/* Terminal mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0d1117] rounded-2xl neo-brutal-border-white overflow-hidden max-w-sm"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-auto text-white/30 font-mono text-[10px]"><Terminal size={10} className="inline mr-1" />session</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-1">
                <div className="text-white/50">$ aralify login</div>
                <div className="text-emerald-400">Welcome back! Streak: 12 days</div>
                <div className="text-accent font-bold">+50 XP daily bonus earned</div>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-2 h-3.5 bg-white"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom stats */}
          <div className="flex gap-6">
            {[
              { icon: <Flame size={16} />, label: "Daily Streaks" },
              { icon: <Trophy size={16} />, label: "Leaderboards" },
              { icon: <Zap size={16} />, label: "XP Rewards" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 text-white/50 text-sm font-bold"
              >
                {item.icon} {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative px-6 py-12">
        <GridPattern />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-10 justify-center">
            <div className="p-2 bg-primary text-white rounded-xl neo-brutal-border">
              <Code2 size={20} />
            </div>
            <span className="font-display font-black text-2xl uppercase tracking-tighter">Aralify</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-accent px-4 py-1.5 neo-brutal-border neo-brutal-shadow-sm rounded-full mb-4 rotate-[-1deg]"
            >
              <Sparkles size={14} />
              <span className="font-display font-black text-xs uppercase tracking-widest">Welcome Back</span>
            </motion.div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">SIGN IN</h2>
            <p className="text-muted-foreground font-medium">Continue your coding journey where you left off.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 text-sm font-bold text-destructive bg-destructive/10 neo-brutal-border border-destructive rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-black uppercase tracking-wider">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-black uppercase tracking-wider">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 pr-12 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <NeoButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full text-lg"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>SIGN IN <ArrowRight size={18} className="ml-1" /></>
              )}
            </NeoButton>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center justify-center gap-2.5 h-12 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-bold text-sm hover:neo-brutal-shadow transition-shadow"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGithubLogin}
              type="button"
              className="flex items-center justify-center gap-2.5 h-12 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-bold text-sm hover:neo-brutal-shadow transition-shadow"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </motion.button>
          </div>

          {/* Footer link */}
          <div className="text-center mt-8 p-4 bg-muted/30 neo-brutal-border rounded-xl">
            <p className="text-sm font-medium text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-black hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-3 border-muted border-t-primary rounded-full mx-auto"
          />
          <p className="font-bold text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
