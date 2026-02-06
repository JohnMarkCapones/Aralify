"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, CheckCircle, RefreshCcw } from "lucide-react";

const complianceItems = [
  { icon: <ShieldCheck size={40} />, title: "Data Protection", desc: "Encryption at rest and in transit. Your code, your property." },
  { icon: <Lock size={40} />, title: "Secure Auth", desc: "Multi-factor authentication and granular access controls." },
  { icon: <CheckCircle size={40} />, title: "GDPR Ready", desc: "ISO-aligned practices and full compliance for global scale." },
  { icon: <RefreshCcw size={40} />, title: "High Availability", desc: "99.9% uptime with automated daily backups and recovery." },
];

export function SecuritySection() {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">Enterprise Security</h2>
          <div className="inline-block bg-white text-black px-6 py-2 neo-brutal-border rotate-2 font-black text-xl">BUILT FOR SCALE</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {complianceItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="p-10 bg-black neo-brutal-border border-white rounded-[2.5rem] space-y-6"
            >
              <div className="text-primary">{item.icon}</div>
              <h3 className="text-2xl font-black uppercase">{item.title}</h3>
              <p className="font-bold opacity-70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
