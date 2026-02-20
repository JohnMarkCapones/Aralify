"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is Aralify really free to start?",
    answer: "Yes! The Hobbyist plan gives you access to 3 intro courses, community support, basic challenges, and a profile page -- completely free, no credit card required. Upgrade to Pro when you're ready for unlimited access."
  },
  {
    question: "What programming languages are supported?",
    answer: "We support 50+ languages including Python, JavaScript, TypeScript, Java, C++, Rust, Go, Ruby, PHP, Swift, Kotlin, and more. All code runs in a secure cloud sandbox -- no local setup needed."
  },
  {
    question: "Do I need prior coding experience?",
    answer: "Not at all! Our courses start from absolute zero. The Easy difficulty tier is designed for complete beginners. As you gain confidence, you can switch to Medium and Hard for extra XP and deeper challenges."
  },
  {
    question: "How does the difficulty tier system work?",
    answer: "Every lesson has three difficulty tiers: Easy (1x XP), Medium (2x XP), and Hard (3x XP). You choose your difficulty before each lesson. Easy covers the basics, Medium adds complexity, and Hard pushes you with real-world scenarios. You can always revisit lessons at a higher difficulty."
  },
  {
    question: "What are XP, streaks, and badges?",
    answer: "XP (Experience Points) are earned by completing lessons and challenges. Streaks track your daily coding consistency. Badges are achievements unlocked for milestones like 'First 100 XP', '7-Day Streak', or 'Complete a Hard Challenge'. All of these show up on your public profile and the leaderboard."
  },
  {
    question: "Can I use Aralify for my school or team?",
    answer: "Absolutely! The Team plan ($49/mo) includes a team dashboard, assignment reviews, custom learning paths, and API access. Perfect for bootcamps, universities, and engineering teams onboarding new developers."
  },
  {
    question: "Is there a mobile app?",
    answer: "We're building native iOS and Android apps with React Native. They'll support offline mode so you can learn on the go. Join the waitlist to get early access when we launch."
  },
  {
    question: "How is Aralify different from Codecademy or freeCodeCamp?",
    answer: "Three key differences: (1) Our difficulty tier system lets you choose Easy, Medium, or Hard for every single lesson -- no other platform does this. (2) Real code execution via Judge0 sandbox means your code actually runs, not just pattern matching. (3) Gamification with XP multipliers, streaks, and leaderboards keeps you motivated long-term."
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">FAQ</h2>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className="font-black text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t-2 border-border pt-4">
                        <p className="font-medium text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
