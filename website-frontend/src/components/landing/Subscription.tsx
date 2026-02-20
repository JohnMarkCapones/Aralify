"use client";

import { NeoButton } from "@/components/ui/neo-button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { DotPattern, FloatingShapes, GradientOrbs } from "@/components/effects";

const plans = [
  {
    name: "Hobbyist",
    price: "0",
    color: "bg-card",
    textColor: "",
    features: ["Access to 3 intro courses", "Community support", "Basic challenges", "Profile page"],
    cta: "Start Free",
    variant: "outline" as const,
  },
  {
    name: "Pro Coder",
    price: "19",
    color: "bg-primary",
    textColor: "text-white",
    features: ["Unlimited course access", "Pro certifications", "Private mentorship", "No ads", "Offline mode"],
    cta: "Go Pro",
    variant: "accent" as const,
    popular: true,
  },
  {
    name: "Team",
    price: "49",
    color: "bg-secondary",
    textColor: "text-white",
    features: ["Everything in Pro", "Team dashboard", "Assignment review", "Custom learning paths", "API access"],
    cta: "Get Team",
    variant: "outline" as const,
  }
];

export function Subscription() {
  return (
    <section className="py-32 container mx-auto px-4 relative overflow-hidden">
      <DotPattern />
      <GradientOrbs orbs={[
        { color: "bg-primary/10", size: 250, x: "5%", y: "30%", delay: 0, duration: 18 },
        { color: "bg-accent/10", size: 200, x: "85%", y: "60%", delay: 2, duration: 14 },
      ]} />
      <FloatingShapes shapes={[
        { type: "circle", size: 22, x: "5%", y: "15%", color: "bg-primary", delay: 0, duration: 10 },
        { type: "diamond", size: 20, x: "92%", y: "20%", color: "bg-accent", delay: 1, duration: 9 },
        { type: "cross", size: 16, x: "90%", y: "85%", color: "bg-secondary", delay: 2, duration: 11 },
      ]} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">LEVEL UP YOUR PLAN</h2>
        <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">Choose the plan that fits your coding journey. Cancel anytime, no hard feelings.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch relative z-10">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`
              relative flex flex-col p-8 neo-brutal-border neo-brutal-shadow-lg rounded-2xl
              ${plan.color} ${plan.textColor}
              ${plan.popular ? 'ring-4 ring-accent ring-offset-4 ring-offset-background' : ''}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground font-black px-4 py-1.5 neo-brutal-border rounded-full text-sm">
                MOST POPULAR
              </div>
            )}

            <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-black">${plan.price}</span>
              <span className={`text-lg font-bold ml-2 ${plan.textColor ? 'opacity-70' : 'text-muted-foreground'}`}>/mo</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 font-medium">
                  <div className={`p-0.5 rounded-full ${plan.textColor ? 'bg-white text-foreground' : 'bg-foreground text-background'}`}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <NeoButton variant={plan.variant} className="w-full">
              {plan.cta}
            </NeoButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
