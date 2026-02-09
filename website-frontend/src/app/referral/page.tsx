"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import { Gift, Users, Zap, Copy, Check, ArrowRight, Trophy, Star, Share2, Heart, Sparkles } from "lucide-react";

const rewardTiers = [
  { referrals: 1, reward: "500 XP Bonus", badge: "🎁", unlocked: true },
  { referrals: 3, reward: "1 Month Pro Free", badge: "⭐", unlocked: true },
  { referrals: 5, reward: "Exclusive Badge + 2,000 XP", badge: "🏅", unlocked: false },
  { referrals: 10, reward: "3 Months Pro + Merch Box", badge: "🎯", unlocked: false },
  { referrals: 25, reward: "Lifetime Pro + Ambassador Title", badge: "👑", unlocked: false },
];

const referralStats = [
  { label: "Total Referrals", value: "3", icon: <Users size={20} /> },
  { label: "XP Earned", value: "1,500", icon: <Zap size={20} /> },
  { label: "Next Tier", value: "2 more", icon: <Trophy size={20} /> },
  { label: "Your Rank", value: "#47", icon: <Star size={20} /> },
];

const howItWorks = [
  { step: "1", title: "Share Your Link", desc: "Copy your unique referral link and share it with friends, classmates, or social media." },
  { step: "2", title: "Friend Signs Up", desc: "When someone signs up using your link, they get 200 bonus XP to start their journey." },
  { step: "3", title: "Both Earn Rewards", desc: "You earn 500 XP per referral plus unlock tier rewards as you refer more people." },
];

const topReferrers = [
  { name: "CyberNinja", referrals: 45, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { name: "DevStar_PH", referrals: 38, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevStar" },
  { name: "CodeCrusher", referrals: 29, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
  { name: "PixelQueen", referrals: 24, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { name: "ByteHunter", referrals: 19, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteHunter" },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://aralify.com/join?ref=JUAN-XK9F";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Gift size={14} /> Invite & Earn
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">REFER A FRIEND</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Share Aralify with friends and earn XP, free Pro months, and exclusive rewards for every learner you bring in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Referral Link Card */}
      <section className="py-10 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-background neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-8 text-center space-y-4">
            <h2 className="font-black text-lg uppercase tracking-wider">Your Referral Link</h2>
            <div className="flex items-center gap-2 bg-muted/50 neo-brutal-border rounded-xl p-3">
              <code className="flex-1 text-sm font-mono font-bold text-primary truncate text-left">{referralLink}</code>
              <NeoButton variant="primary" size="sm" className="gap-1.5 shrink-0" onClick={handleCopy}>
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
              </NeoButton>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <NeoButton variant="outline" size="sm" className="gap-1.5">
                <Share2 size={14} /> Share on Twitter
              </NeoButton>
              <NeoButton variant="outline" size="sm" className="gap-1.5">
                <Share2 size={14} /> Share on Facebook
              </NeoButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {referralStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl text-center"
              >
                <div className="text-primary mx-auto mb-2">{stat.icon}</div>
                <div className="font-black text-2xl">{stat.value}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-10">HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary text-white neo-brutal-border rounded-2xl flex items-center justify-center font-black text-2xl mx-auto">
                  {step.step}
                </div>
                <h3 className="font-black text-lg uppercase">{step.title}</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-16 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-10">REWARD TIERS</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {rewardTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 neo-brutal-border rounded-xl flex items-center gap-4 ${
                  tier.unlocked
                    ? "bg-green-100/50 dark:bg-green-900/20 neo-brutal-shadow-sm"
                    : "bg-background opacity-70"
                }`}
              >
                <span className="text-3xl">{tier.badge}</span>
                <div className="flex-1">
                  <div className="font-black text-base">{tier.referrals} Referral{tier.referrals > 1 ? "s" : ""}</div>
                  <div className="text-sm font-medium text-muted-foreground">{tier.reward}</div>
                </div>
                {tier.unlocked ? (
                  <span className="text-xs font-black text-green-600 dark:text-green-400 flex items-center gap-1 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-full">
                    <Check size={12} /> Unlocked
                  </span>
                ) : (
                  <span className="text-xs font-black text-muted-foreground">Locked</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Referrers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-10">TOP REFERRERS</h2>
          <div className="max-w-md mx-auto bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-6 space-y-3">
            {topReferrers.map((user, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-xs font-black text-muted-foreground w-5">#{i + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full neo-brutal-border" loading="lazy" />
                <span className="font-black text-sm flex-1">{user.name}</span>
                <span className="text-xs font-black text-primary">{user.referrals} referrals</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
