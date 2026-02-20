'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { NeoButton } from '@/components/ui/neo-button';
import { Code2, ArrowRight, Mail, ShieldCheck, KeyRound, Lock } from 'lucide-react';
import { FloatingShapes, GridPattern } from '@/components/effects';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?redirect=/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel -- Brand/decorative */}
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
                RESET<br />YOUR<br />PASSWORD.
              </h1>
              <p className="text-xl font-medium opacity-70 max-w-sm">
                No worries — it happens to the best of us. We&apos;ll send you a secure link to get back in.
              </p>
            </div>

            {/* Security reassurance card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl neo-brutal-border-white overflow-hidden max-w-sm p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <span className="font-display font-black text-sm uppercase tracking-wider">Secure Process</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Mail size={14} />, text: "Check your email for a reset link" },
                  { icon: <KeyRound size={14} />, text: "Click the link to set a new password" },
                  { icon: <Lock size={14} />, text: "Your account stays protected" },
                ].map((step, i) => (
                  <motion.div
                    key={step.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center gap-3 text-white/70 text-sm font-medium"
                  >
                    <span className="flex-shrink-0">{step.icon}</span>
                    {step.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom spacer */}
          <div />
        </div>
      </div>

      {/* Right panel -- Form */}
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

          {sent ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="p-8 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
                  className="mx-auto w-20 h-20 bg-primary text-white rounded-2xl neo-brutal-border neo-brutal-shadow flex items-center justify-center"
                >
                  <Mail size={36} />
                </motion.div>

                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                    CHECK YOUR EMAIL
                  </h2>
                  <p className="text-muted-foreground font-medium">
                    We sent a password reset link to
                  </p>
                  <p className="font-bold text-foreground mt-1">{email}</p>
                </div>

                <div className="p-4 bg-muted/30 neo-brutal-border rounded-xl">
                  <p className="text-sm text-muted-foreground font-medium">
                    Didn&apos;t receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setSent(false)}
                      className="text-primary font-black hover:underline"
                    >
                      try again
                    </button>
                  </p>
                </div>

                <Link href="/login">
                  <NeoButton variant="outline" size="md" className="w-full mt-2">
                    BACK TO SIGN IN <ArrowRight size={16} className="ml-1" />
                  </NeoButton>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Form state */
            <>
              {/* Header */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-accent px-4 py-1.5 neo-brutal-border neo-brutal-shadow-sm rounded-full mb-4 rotate-[-1deg]"
                >
                  <KeyRound size={14} />
                  <span className="font-display font-black text-xs uppercase tracking-widest">Password Reset</span>
                </motion.div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">FORGOT PASSWORD</h2>
                <p className="text-muted-foreground font-medium">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleReset} className="space-y-5">
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
                    <>SEND RESET LINK <ArrowRight size={18} className="ml-1" /></>
                  )}
                </NeoButton>
              </form>

              {/* Footer link */}
              <div className="text-center mt-8 p-4 bg-muted/30 neo-brutal-border rounded-xl">
                <p className="text-sm font-medium text-muted-foreground">
                  Remember your password?{' '}
                  <Link href="/login" className="text-primary font-black hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
