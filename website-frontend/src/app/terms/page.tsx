'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout/PageShell';
import { FloatingShapes } from '@/components/effects';
import { Code2, FileText, ArrowRight } from 'lucide-react';

const sections = [
  {
    number: '01',
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using the Aralify platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.',
      'These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 13 years of age, or if you are under 13, that you have obtained parental or guardian consent.',
      'We reserve the right to update or modify these Terms at any time. Continued use of the Service after any changes constitutes your acceptance of the revised Terms.',
    ],
  },
  {
    number: '02',
    title: 'User Accounts',
    content: [
      'To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      'You agree to provide accurate, current, and complete information during registration. You must notify us immediately of any unauthorized use of your account or any other breach of security.',
      'We reserve the right to suspend or terminate your account at our discretion if we believe you have violated these Terms or engaged in fraudulent or illegal activity.',
    ],
  },
  {
    number: '03',
    title: 'Acceptable Use',
    content: [
      'You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not use the Service to transmit any material that is defamatory, offensive, or otherwise objectionable.',
      'You may not attempt to gain unauthorized access to any part of the Service, other users\' accounts, or any systems or networks connected to the Service through hacking, password mining, or any other means.',
      'You agree not to use the Service to distribute spam, malware, or any harmful code. You may not use automated tools, bots, or scrapers to access the Service without our written permission.',
      'When submitting code through our platform, you agree not to submit malicious code or attempt to compromise the sandboxed execution environment.',
    ],
  },
  {
    number: '04',
    title: 'Intellectual Property',
    content: [
      'The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Aralify and its licensors.',
      'Our platform is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.',
      'You retain ownership of any code or content you create using the Service. However, by submitting content to the Service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with operating and improving the Service.',
      'Course materials, lesson content, quizzes, and challenges provided on the platform are proprietary and may not be reproduced, distributed, or used outside the platform without express permission.',
    ],
  },
  {
    number: '05',
    title: 'Payment Terms',
    content: [
      'Certain features of the Service may require a paid subscription. By subscribing to a paid plan, you agree to pay the applicable fees as described on our pricing page.',
      'All payments are non-refundable unless otherwise stated or required by applicable law. You may cancel your subscription at any time, and cancellation will take effect at the end of your current billing period.',
      'We reserve the right to change our pricing at any time. If we change the price of a subscription plan, we will provide notice before the change takes effect. Your continued use after the price change constitutes your acceptance of the new pricing.',
      'If your payment fails or your account is past due, we may suspend or limit your access to paid features until payment is received.',
    ],
  },
  {
    number: '06',
    title: 'Termination',
    content: [
      'We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.',
      'Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may do so by contacting us or using the account deletion feature in your settings.',
      'All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.',
      'You may request an export of your data prior to account termination. We will retain your data for a reasonable period as required by law or legitimate business purposes.',
    ],
  },
  {
    number: '07',
    title: 'Limitation of Liability',
    content: [
      'In no event shall Aralify, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, use, or goodwill.',
      'Our total liability for any claims arising out of or relating to these Terms or the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.',
      'The Service is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the reliability, availability, or suitability of the Service for your particular needs.',
      'We do not guarantee that code executed through our sandboxed environment will produce specific results, and we are not liable for any consequences arising from code execution on our platform.',
    ],
  },
  {
    number: '08',
    title: 'Contact',
    content: [
      'If you have any questions about these Terms of Service, please contact us at:',
      'Email: legal@aralify.com',
      'You may also reach us through the contact form on our website. We aim to respond to all inquiries within 5 business days.',
    ],
  },
];

export default function TermsPage() {
  return (
    <PageShell>
      {/* Hero section */}
      <section className="relative bg-primary text-white overflow-hidden noise-overlay">
        <FloatingShapes shapes={[
          { type: "ring", size: 70, x: "5%", y: "15%", color: "border-white", delay: 0, duration: 14 },
          { type: "circle", size: 25, x: "90%", y: "25%", color: "bg-white", delay: 1, duration: 10 },
          { type: "diamond", size: 30, x: "80%", y: "70%", color: "bg-white", delay: 2, duration: 12 },
          { type: "cross", size: 20, x: "15%", y: "80%", color: "bg-white", delay: 1.5, duration: 9 },
        ]} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 neo-brutal-border-white rounded-full">
              <FileText size={14} />
              <span className="font-display font-black text-xs uppercase tracking-widest">Legal</span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              TERMS OF<br />SERVICE
            </h1>

            <p className="text-lg md:text-xl font-medium opacity-70 max-w-lg">
              Please read these terms carefully before using the Aralify platform.
            </p>

            <div className="flex items-center gap-2 text-sm font-bold opacity-50">
              <Code2 size={14} />
              <span>Last updated: February 1, 2026</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content sections */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-8">
        {sections.map((section, i) => (
          <motion.div
            key={section.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-xl neo-brutal-border flex items-center justify-center font-display font-black text-sm">
                {section.number}
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter pt-1">
                {section.title}
              </h2>
            </div>
            <div className="space-y-4 pl-0 md:pl-16">
              {section.content.map((paragraph, j) => (
                <p key={j} className="text-muted-foreground font-medium leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/30 neo-brutal-border rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Related Pages</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/privacy"
              className="flex items-center gap-3 p-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-bold text-sm hover:neo-brutal-shadow transition-shadow group flex-1"
            >
              <div className="p-2 bg-primary text-white rounded-lg neo-brutal-border">
                <FileText size={16} />
              </div>
              <span className="flex-1">Privacy Policy</span>
              <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 p-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-bold text-sm hover:neo-brutal-shadow transition-shadow group flex-1"
            >
              <div className="p-2 bg-accent rounded-lg neo-brutal-border">
                <Mail size={16} />
              </div>
              <span className="flex-1">Contact Us</span>
              <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}

function Mail({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
