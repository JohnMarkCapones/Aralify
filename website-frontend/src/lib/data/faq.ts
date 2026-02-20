export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const faqSections: FaqSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is Aralify?",
        answer: "Aralify is an interactive programming education platform designed for Filipino learners and beyond. We offer structured courses with a unique difficulty tier system (Easy/Medium/Hard) per lesson, real code execution, and gamification features like XP, streaks, and leaderboards.",
      },
      {
        question: "Do I need any prior coding experience?",
        answer: "Not at all! Our beginner courses start from absolute zero. We teach you concepts step-by-step with interactive exercises so you can learn by doing, not just reading.",
      },
      {
        question: "What programming languages can I learn?",
        answer: "We currently offer courses in Python, JavaScript, TypeScript, React, Node.js, HTML/CSS, and more. New courses are added regularly based on industry demand and learner feedback.",
      },
      {
        question: "Is Aralify free?",
        answer: "Yes! Our Free tier gives you access to all beginner courses, daily challenges, and community features. Pro and Team plans unlock advanced content, certificates, and priority support.",
      },
    ],
  },
  {
    title: "Courses & Learning",
    items: [
      {
        question: "How does the difficulty tier system work?",
        answer: "Each lesson has three difficulty tiers: Easy (1x XP), Medium (2x XP), and Hard (3x XP). You can choose your difficulty level per lesson, so you can challenge yourself when you're feeling confident or take it easy when learning something new.",
      },
      {
        question: "Can I skip ahead in a course?",
        answer: "Courses follow a structured path where each lesson builds on the previous one. However, if you demonstrate mastery through our placement quizzes, you can skip foundational lessons.",
      },
      {
        question: "How does code execution work?",
        answer: "We use Piston, a secure sandboxed code execution engine, to run your code in real-time. Your code runs on our servers in an isolated environment — no setup required on your end.",
      },
      {
        question: "Can I learn offline?",
        answer: "Yes! Our mobile app supports offline mode for lesson content and exercises. Your progress syncs automatically when you reconnect.",
      },
    ],
  },
  {
    title: "XP & Gamification",
    items: [
      {
        question: "How do I earn XP?",
        answer: "You earn XP by completing lessons (with multipliers based on difficulty), solving daily and weekly challenges, maintaining streaks, and earning achievements. XP contributes to your level and leaderboard ranking.",
      },
      {
        question: "What are streaks?",
        answer: "A streak counts consecutive days of learning activity. Maintaining a streak earns bonus XP and special badges. Missing a day resets your streak, so try to learn a little every day!",
      },
      {
        question: "How does the leaderboard work?",
        answer: "Leaderboards rank learners by XP earned within a time period (weekly, monthly, all-time). You can compete globally or within your course cohort.",
      },
    ],
  },
  {
    title: "Account & Settings",
    items: [
      {
        question: "Can I change my username?",
        answer: "Yes, you can update your display name anytime in Settings > Profile. Your unique username can be changed once every 30 days.",
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a secure link to set a new password.",
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can permanently delete your account from Settings > Account > Danger Zone. This action is irreversible and removes all your data, progress, and achievements.",
      },
    ],
  },
  {
    title: "Billing & Plans",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, GCash, Maya, and PayPal. Annual plans offer a 20% discount.",
      },
      {
        question: "Can I cancel my subscription?",
        answer: "Yes, you can cancel anytime from your account settings. You'll retain access until the end of your billing period.",
      },
      {
        question: "Do you offer student discounts?",
        answer: "Yes! Students with a valid .edu email get 50% off Pro plans. Contact support with your student verification for the discount.",
      },
      {
        question: "Is there a refund policy?",
        answer: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund.",
      },
    ],
  },
];
