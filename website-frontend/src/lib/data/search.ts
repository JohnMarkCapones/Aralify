export type SearchResult = {
  type: "course" | "lesson" | "challenge" | "community";
  title: string;
  description: string;
  slug: string;
  meta?: string;
};

export const searchResults: SearchResult[] = [
  // Courses
  { type: "course", title: "Python Fundamentals", description: "Learn Python from scratch with hands-on exercises and projects.", slug: "python-fundamentals", meta: "24 lessons · Beginner" },
  { type: "course", title: "JavaScript Essentials", description: "Master JavaScript fundamentals including ES6+ features.", slug: "javascript-essentials", meta: "32 lessons · Beginner" },
  { type: "course", title: "React From Zero", description: "Build modern UIs with React hooks, state management, and routing.", slug: "react-from-zero", meta: "28 lessons · Intermediate" },
  { type: "course", title: "TypeScript Mastery", description: "Type-safe JavaScript for production-grade applications.", slug: "typescript-mastery", meta: "20 lessons · Intermediate" },
  { type: "course", title: "Node.js Backend", description: "Build scalable APIs with Express, authentication, and databases.", slug: "node-backend", meta: "26 lessons · Intermediate" },
  // Lessons
  { type: "lesson", title: "Variables & Data Types", description: "Understanding how to store and manipulate data in Python.", slug: "python-fundamentals", meta: "Python Fundamentals · Lesson 3" },
  { type: "lesson", title: "Functions & Scope", description: "Writing reusable code with functions and understanding variable scope.", slug: "python-fundamentals", meta: "Python Fundamentals · Lesson 16" },
  { type: "lesson", title: "Arrays & Objects", description: "Working with complex data structures in JavaScript.", slug: "javascript-essentials", meta: "JavaScript Essentials · Lesson 12" },
  { type: "lesson", title: "Async/Await Patterns", description: "Modern asynchronous programming with Promises and async/await.", slug: "javascript-essentials", meta: "JavaScript Essentials · Lesson 24" },
  // Challenges
  { type: "challenge", title: "Reverse a Linked List", description: "Implement a function to reverse a singly linked list in-place.", slug: "reverse-linked-list", meta: "Medium · 200 XP" },
  { type: "challenge", title: "Binary Search Implementation", description: "Write an efficient binary search algorithm.", slug: "binary-search", meta: "Easy · 100 XP" },
  { type: "challenge", title: "Build a REST API Endpoint", description: "Create a fully functional REST endpoint with validation.", slug: "rest-api-endpoint", meta: "Hard · 300 XP" },
  // Community
  { type: "community", title: "Best practices for Python beginners?", description: "Discussion thread with 42 replies from the community.", slug: "best-practices-python", meta: "12 hours ago · 42 replies" },
  { type: "community", title: "How to prepare for coding interviews", description: "Tips and resources shared by experienced developers.", slug: "coding-interview-prep", meta: "2 days ago · 28 replies" },
];
