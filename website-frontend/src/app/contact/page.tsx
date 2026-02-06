"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import { DotPattern } from "@/components/effects";
import { Mail, MessageCircle, Github, Twitter, Send, ChevronRight, CheckCircle, HelpCircle } from "lucide-react";

const contactLinks = [
  {
    icon: <Mail size={28} />,
    title: "Email Us",
    description: "For general inquiries and support",
    link: "mailto:hello@aralify.com",
    linkText: "hello@aralify.com",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Discord",
    description: "Join our community of learners",
    link: "https://discord.gg/aralify",
    linkText: "discord.gg/aralify",
    color: "bg-[#5865F2]/10 text-[#5865F2]",
  },
  {
    icon: <Github size={28} />,
    title: "GitHub",
    description: "Report bugs and contribute",
    link: "https://github.com/aralify",
    linkText: "github.com/aralify",
    color: "bg-foreground/10 text-foreground",
  },
  {
    icon: <Twitter size={28} />,
    title: "Twitter / X",
    description: "Follow us for updates",
    link: "https://twitter.com/aralify",
    linkText: "@aralify",
    color: "bg-secondary/10 text-secondary",
  },
];

const faqLinks = [
  { question: "How does the difficulty tier system work?", href: "#" },
  { question: "Is Aralify free to use?", href: "#" },
  { question: "How do XP multipliers work?", href: "#" },
  { question: "Can I use Aralify on mobile?", href: "#" },
];

const subjectOptions = [
  "General Inquiry",
  "Bug Report",
  "Feature Request",
  "Partnership",
  "Press / Media",
  "Account Issues",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border relative overflow-hidden">
        <DotPattern />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-4">
              GET IN TOUCH
            </h1>
            <p className="text-lg font-medium text-muted-foreground max-w-xl mx-auto">
              Have a question, feedback, or just want to say hi? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter mb-6">
                SEND A MESSAGE
              </h2>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-black uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Juan Dela Cruz"
                      className="w-full h-12 px-4 bg-input neo-brutal-border rounded-xl font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:neo-brutal-shadow transition-shadow"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-black uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="juan@email.com"
                      className="w-full h-12 px-4 bg-input neo-brutal-border rounded-xl font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:neo-brutal-shadow transition-shadow"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-black uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 bg-input neo-brutal-border rounded-xl font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:neo-brutal-shadow transition-shadow appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select a subject...
                      </option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-black uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 bg-input neo-brutal-border rounded-xl font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:neo-brutal-shadow transition-shadow resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <NeoButton type="submit" size="lg" className="w-full">
                    <Send size={18} className="mr-2" />
                    SEND MESSAGE
                  </NeoButton>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-10 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="w-20 h-20 bg-green-500 text-white rounded-full neo-brutal-border flex items-center justify-center mx-auto"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tighter">
                    MESSAGE SENT!
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    Thanks for reaching out, <span className="font-black text-foreground">{formData.name || "friend"}</span>!
                    We&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="pt-4">
                    <NeoButton
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                    >
                      SEND ANOTHER MESSAGE
                    </NeoButton>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right: Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter mb-6">
                OTHER WAYS TO REACH US
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {contactLinks.map((link, i) => (
                  <motion.a
                    key={link.title}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px hsl(var(--border))" }}
                    className="block p-5 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl transition-shadow group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${link.color} group-hover:scale-110 transition-transform`}>
                      {link.icon}
                    </div>
                    <h3 className="font-black text-lg uppercase">{link.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {link.description}
                    </p>
                    <span className="text-sm font-bold text-primary flex items-center gap-1">
                      {link.linkText}
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Response time note */}
              <div className="bg-accent/20 neo-brutal-border rounded-2xl p-5 mt-4">
                <p className="font-black uppercase text-sm tracking-wider mb-1">Response Time</p>
                <p className="text-sm font-medium text-muted-foreground">
                  We typically respond within 24-48 hours. For urgent issues, reach out on Discord for faster support.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-12 bg-card border-t-4 border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle size={24} className="text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter">
                FREQUENTLY ASKED
              </h2>
            </div>
            <p className="text-muted-foreground font-medium mb-6">
              Before reaching out, you might find your answer here.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {faqLinks.map((faq, i) => (
                <motion.a
                  key={i}
                  href={faq.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-4 bg-background neo-brutal-border rounded-xl hover:neo-brutal-shadow transition-shadow group"
                >
                  <ChevronRight size={16} className="text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-bold">{faq.question}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
