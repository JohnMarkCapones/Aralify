"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Globe, Users, ArrowRight, CheckCircle } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";

const partners = [
  { name: "University of the Philippines", type: "University" },
  { name: "Ateneo de Manila", type: "University" },
  { name: "De La Salle University", type: "University" },
  { name: "Mapúa University", type: "University" },
  { name: "DICT Philippines", type: "Government" },
  { name: "Philippine Startup Week", type: "Organization" },
];

const benefits = [
  "Custom learning paths for your students or employees",
  "Admin dashboard with progress tracking and analytics",
  "Bulk pricing with significant discounts",
  "Priority support and dedicated success manager",
  "Custom branding and white-label options",
  "API access for LMS integration",
];

const stats = [
  { value: "15+", label: "Partner Schools", icon: <GraduationCap size={24} /> },
  { value: "3", label: "Government Partners", icon: <Building2 size={24} /> },
  { value: "2,500+", label: "Students via Partners", icon: <Users size={24} /> },
  { value: "6", label: "Countries", icon: <Globe size={24} /> },
];

export function Partners() {
  return (
    <section className="py-32 bg-primary/5 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 neo-brutal-border neo-brutal-shadow-sm rotate-[-1deg] mb-6"
          >
            <Building2 size={16} />
            <span className="font-display font-black text-sm uppercase tracking-widest">Trusted Partners</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            SCHOOLS &<br /><span className="text-primary">ORGANIZATIONS</span>
          </h2>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
            Leading universities and organizations in the Philippines trust Aralify to teach their students and teams how to code.
          </p>
        </motion.div>

        {/* Partner logos/names */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-16">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl p-5 text-center space-y-2 cursor-default"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto">
                {partner.type === "University" ? <GraduationCap size={22} /> : partner.type === "Government" ? <Building2 size={22} /> : <Globe size={22} />}
              </div>
              <h3 className="font-black text-xs uppercase leading-tight">{partner.name}</h3>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{partner.type}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 text-center"
            >
              <div className="text-primary mx-auto mb-2">{stat.icon}</div>
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 space-y-6">
                <h3 className="text-3xl font-black uppercase tracking-tighter">PARTNER WITH US</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  Bring Aralify to your school, bootcamp, or company. We offer custom plans with admin tools, analytics, and dedicated support.
                </p>
                <NeoButton variant="primary" size="lg" className="gap-2">
                  GET IN TOUCH <ArrowRight size={16} />
                </NeoButton>
              </div>
              <div className="p-8 md:p-10 bg-primary/5 border-t md:border-t-0 md:border-l border-border">
                <h4 className="font-black text-sm uppercase tracking-widest mb-4">What You Get</h4>
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2 text-sm font-medium text-muted-foreground"
                    >
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
