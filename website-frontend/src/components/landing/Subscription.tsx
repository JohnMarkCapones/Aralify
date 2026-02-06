"use client";

import { NeoButton } from "@/components/ui/neo-button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Hobbyist",
    price: "0",
    color: "bg-white",
    features: ["Access to 3 intro courses", "Community support", "Basic challenges", "Profile page"],
    cta: "Start Free",
    variant: "outline"
  },
  {
    name: "Pro Coder",
    price: "19",
    color: "bg-secondary",
    features: ["Unlimited course access", "Pro certifications", "Private mentorship", "No ads", "Offline mode"],
    cta: "Go Pro",
    variant: "primary",
    popular: true
  },
  {
    name: "Team",
    price: "49",
    color: "bg-primary",
    features: ["Everything in Pro", "Team dashboard", "Assignment review", "Custom learning paths", "API access"],
    cta: "Get Team",
    variant: "secondary"
  }
];

export function Subscription() {
  return (
    <section className="py-20 container mx-auto px-4">
       <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">LEVEL UP</h2>
          <p className="text-xl font-medium max-w-2xl mx-auto">Choose the plan that fits your coding journey. Cancel anytime, no hard feelings.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {plans.map((plan) => (
                <motion.div
                    key={plan.name}
                    whileHover={{ y: -10 }}
                    className={`
                        relative flex flex-col p-8 neo-brutal-border neo-brutal-shadow-lg rounded-2xl
                        ${plan.color} ${plan.popular ? 'md:scale-110 z-10' : 'z-0'}
                    `}
                >
                    {plan.popular && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-black font-black px-4 py-2 border-3 border-black rounded-full rotate-2">
                            MOST POPULAR
                        </div>
                    )}

                    <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-6">
                        <span className="text-5xl font-black">${plan.price}</span>
                        <span className="text-lg font-bold text-muted-foreground ml-2">/mo</span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 font-medium">
                                <div className="bg-black text-white p-0.5 rounded-full">
                                    <Check size={14} strokeWidth={4} />
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <NeoButton variant={plan.variant as "primary" | "secondary" | "accent" | "muted" | "outline"} className="w-full">
                        {plan.cta}
                    </NeoButton>
                </motion.div>
            ))}
        </div>
    </section>
  );
}
