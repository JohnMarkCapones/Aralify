'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout/PageShell';
import { FloatingShapes } from '@/components/effects';
import { Code2, FileText, ArrowRight, Shield } from 'lucide-react';

const sections = [
  {
    number: '01',
    title: 'Information We Collect',
    content: [
      'We collect information you provide directly to us when you create an account, including your name, email address, username, and profile information. If you sign in using a third-party provider (such as Google or GitHub), we receive basic profile information from that provider.',
      'We automatically collect certain information when you use the Service, including your IP address, browser type, operating system, device information, pages visited, and the dates and times of your visits.',
      'When you use our code execution features, we collect the code you submit for execution purposes. We may also collect usage data such as your learning progress, quiz results, XP earned, and streak information to provide and improve the Service.',
      'We may collect information about your interactions with other users, including comments, follows, and activity on the platform.',
    ],
  },
  {
    number: '02',
    title: 'How We Use Information',
    content: [
      'We use the information we collect to provide, maintain, and improve the Service, including personalizing your learning experience, tracking your progress, and calculating gamification metrics such as XP and streaks.',
      'We use your information to communicate with you about your account, respond to your inquiries, send technical notices, security alerts, and support messages.',
      'We may use aggregated and anonymized data for research, analytics, and to improve our educational content and platform features.',
      'We use your information to detect, prevent, and address fraud, abuse, and technical issues, and to protect the security and integrity of the Service.',
    ],
  },
  {
    number: '03',
    title: 'Data Storage & Security',
    content: [
      'Your data is stored securely on servers provided by our infrastructure partners, including Supabase (PostgreSQL) and Vercel. We implement industry-standard security measures to protect your personal information.',
      'We use encryption in transit (TLS/SSL) and at rest to protect your data. Access to personal data is restricted to authorized personnel who need it to operate, develop, or improve our Service.',
      'While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.',
      'Code submitted for execution is processed in sandboxed environments and is not permanently stored beyond what is necessary for your learning progress records.',
    ],
  },
  {
    number: '04',
    title: 'Cookies',
    content: [
      'We use cookies and similar tracking technologies to collect and track information about your use of the Service. Cookies are small data files stored on your device that help us improve your experience.',
      'We use essential cookies to authenticate users, prevent fraud, and ensure the Service functions correctly. We also use analytics cookies to understand how users interact with the Service.',
      'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of the Service.',
      'We do not use cookies for targeted advertising. Any third-party cookies are limited to essential analytics and service functionality.',
    ],
  },
  {
    number: '05',
    title: 'Third-Party Services',
    content: [
      'We use third-party services to help us operate and improve the Service. These include authentication providers (Google, GitHub), hosting (Vercel, Supabase), code execution (Judge0), analytics (PostHog), and error monitoring (Sentry).',
      'These third-party services may have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.',
      'We are not responsible for the privacy practices of third-party services. We encourage you to review the privacy policies of any third-party services you interact with through our platform.',
      'If you choose to connect your account with third-party services (such as GitHub), we may receive additional information as permitted by your settings with that service.',
    ],
  },
  {
    number: '06',
    title: 'Your Rights',
    content: [
      'You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a copy of the personal data we hold about you.',
      'You have the right to opt out of non-essential communications from us. You can manage your notification preferences in your account settings.',
      'If you are a resident of the European Economic Area (EEA), you have additional rights under the GDPR, including the right to data portability, the right to restrict processing, and the right to object to processing.',
      'To exercise any of these rights, please contact us at privacy@aralify.com. We will respond to your request within 30 days.',
    ],
  },
  {
    number: '07',
    title: "Children's Privacy",
    content: [
      'The Service is designed to be accessible to learners of various ages. However, we do not knowingly collect personal information from children under the age of 13 without parental consent.',
      'If you are a parent or guardian and you believe your child under 13 has provided us with personal information without your consent, please contact us immediately at privacy@aralify.com.',
      'If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers.',
      'For users between the ages of 13 and 18, we encourage parental involvement in their use of the Service.',
    ],
  },
  {
    number: '08',
    title: 'Changes to Policy',
    content: [
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
      'For significant changes, we will provide a more prominent notice, such as an email notification or a banner within the Service.',
      'You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.',
      'Your continued use of the Service after we post changes constitutes your acceptance of the updated Privacy Policy.',
    ],
  },
  {
    number: '09',
    title: 'Contact',
    content: [
      'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:',
      'Email: privacy@aralify.com',
      'You may also reach us through the contact form on our website. We aim to respond to all privacy-related inquiries within 5 business days.',
      'If you are not satisfied with our response, you may have the right to lodge a complaint with your local data protection authority.',
    ],
  },
];

export default function PrivacyPage() {
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
              <Shield size={14} />
              <span className="font-display font-black text-xs uppercase tracking-widest">Privacy</span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              PRIVACY<br />POLICY
            </h1>

            <p className="text-lg md:text-xl font-medium opacity-70 max-w-lg">
              Your privacy matters. Here is how we collect, use, and protect your information.
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
              href="/terms"
              className="flex items-center gap-3 p-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-bold text-sm hover:neo-brutal-shadow transition-shadow group flex-1"
            >
              <div className="p-2 bg-primary text-white rounded-lg neo-brutal-border">
                <FileText size={16} />
              </div>
              <span className="flex-1">Terms of Service</span>
              <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 p-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-bold text-sm hover:neo-brutal-shadow transition-shadow group flex-1"
            >
              <div className="p-2 bg-accent rounded-lg neo-brutal-border">
                <MailIcon size={16} />
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

function MailIcon({ size }: { size: number }) {
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
