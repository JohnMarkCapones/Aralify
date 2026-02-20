'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { NeoButton } from '@/components/ui/neo-button';
import { Code2, ArrowRight, CheckCircle, XCircle, Mail, RefreshCw } from 'lucide-react';
import { FloatingShapes, GridPattern } from '@/components/effects';

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (errorParam) {
      setStatus('error');
      setErrorMessage(errorDescription || 'Email verification failed. The link may have expired.');
    } else {
      setStatus('success');
    }
  }, [searchParams]);

  useEffect(() => {
    if (status !== 'success') return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/dashboard';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const handleResend = async () => {
    setResending(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user?.email) {
      await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
    }

    setResending(false);
  };

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
                {status === 'success' ? "YOU'RE\nVERIFIED." : "ALMOST\nTHERE."}
              </h1>
              <p className="text-xl font-medium opacity-70 max-w-sm">
                {status === 'success'
                  ? "Your email has been verified. Welcome to Aralify!"
                  : "There was an issue verifying your email. Let's fix that."}
              </p>
            </div>
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

          {status === 'loading' && (
            <div className="text-center p-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full"
              />
              <p className="mt-4 font-bold text-muted-foreground">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
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
                  className="mx-auto w-20 h-20 bg-green-500 text-white rounded-2xl neo-brutal-border neo-brutal-shadow flex items-center justify-center"
                >
                  <CheckCircle size={36} />
                </motion.div>

                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                    EMAIL VERIFIED!
                  </h2>
                  <p className="text-muted-foreground font-medium">
                    Your account is ready. Redirecting to dashboard in {countdown}s...
                  </p>
                </div>

                <Link href="/dashboard">
                  <NeoButton variant="primary" size="md" className="w-full mt-2">
                    GO TO DASHBOARD <ArrowRight size={16} className="ml-1" />
                  </NeoButton>
                </Link>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
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
                  className="mx-auto w-20 h-20 bg-destructive text-white rounded-2xl neo-brutal-border neo-brutal-shadow flex items-center justify-center"
                >
                  <XCircle size={36} />
                </motion.div>

                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                    VERIFICATION FAILED
                  </h2>
                  <p className="text-muted-foreground font-medium">
                    {errorMessage}
                  </p>
                </div>

                <div className="space-y-3">
                  <NeoButton
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <><RefreshCw size={16} className="mr-2" /> RESEND VERIFICATION</>
                    )}
                  </NeoButton>

                  <Link href="/login">
                    <NeoButton variant="outline" size="md" className="w-full">
                      <Mail size={16} className="mr-2" /> BACK TO SIGN IN
                    </NeoButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
