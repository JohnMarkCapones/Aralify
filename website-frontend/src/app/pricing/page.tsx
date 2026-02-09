"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import {
  Check, X, Zap, ArrowRight, ChevronDown, ChevronUp, Users, Crown, Sparkles,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for beginners exploring coding.",
    icon: <Zap size={24} />,
    color: "bg-muted/30",
    highlight: false,
    features: [
      { text: "All beginner courses", included: true },
      { text: "Daily challenges", included: true },
      { text: "Community access", included: true },
      { text: "Basic progress tracking", included: true },
      { text: "Certificates", included: false },
      { text: "Advanced courses", included: false },
      { text: "Priority support", included: false },
      { text: "Team features", included: false },
    ],
    cta: "GET STARTED FREE",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For serious learners who want it all.",
    icon: <Crown size={24} />,
    color: "bg-primary",
    highlight: true,
    features: [
      { text: "All beginner courses", included: true },
      { text: "Daily challenges", included: true },
      { text: "Community access", included: true },
      { text: "Advanced progress tracking", included: true },
      { text: "Certificates", included: true },
      { text: "Advanced courses", included: true },
      { text: "Priority support", included: true },
      { text: "Team features", included: false },
    ],
    cta: "START PRO TRIAL",
  },
  {
    name: "Team",
    price: "$25",
    period: "/user/month",
    description: "For teams and classrooms.",
    icon: <Users size={24} />,
    color: "bg-muted/30",
    highlight: false,
    features: [
      { text: "All beginner courses", included: true },
      { text: "Daily challenges", included: true },
      { text: "Community access", included: true },
      { text: "Advanced progress tracking", included: true },
      { text: "Certificates", included: true },
      { text: "Advanced courses", included: true },
      { text: "Priority support", included: true },
      { text: "Team features", included: true },
    ],
    cta: "CONTACT SALES",
  },
];

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes! Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle." },
  { q: "Is there a student discount?", a: "Yes! Students with a valid .edu email get 50% off Pro plans. Contact support with your student verification." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, GCash, Maya, and PayPal. Annual plans offer a 20% discount." },
  { q: "Can I cancel my subscription?", a: "Absolutely. Cancel anytime from your account settings. You'll retain access until the end of your billing period." },
  { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-accent px-4 py-1.5 neo-brutal-border neo-brutal-shadow-sm rounded-full mb-6"
          >
            <Sparkles size={14} />
            <span className="font-display font-black text-xs uppercase tracking-widest">Simple Pricing</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
          >
            PRICING
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-medium text-muted-foreground max-w-2xl mx-auto"
          >
            Start for free. Upgrade when you&apos;re ready to go further.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card neo-brutal-border rounded-2xl overflow-hidden ${
                  plan.highlight
                    ? "ring-4 ring-primary neo-brutal-shadow-lg"
                    : "neo-brutal-shadow"
                }`}
              >
                {plan.highlight && (
                  <div className="bg-primary text-white text-center py-2 font-black text-xs uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl neo-brutal-border ${plan.highlight ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{plan.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-muted-foreground font-bold text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-8">{plan.description}</p>

                  <NeoButton
                    variant={plan.highlight ? "primary" : "outline"}
                    size="lg"
                    className="w-full text-base mb-8"
                  >
                    {plan.cta} <ArrowRight size={16} className="ml-2" />
                  </NeoButton>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature.text} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check size={16} className="text-green-500 shrink-0" />
                        ) : (
                          <X size={16} className="text-muted-foreground/30 shrink-0" />
                        )}
                        <span className={`text-sm font-medium ${feature.included ? '' : 'text-muted-foreground/50'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-12">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="neo-brutal-border rounded-xl overflow-hidden bg-background"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-black text-sm uppercase tracking-wide hover:bg-muted/30 transition-colors"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
