import { PrismaClient, UserRole, Difficulty, QuestionType, SubmissionStatus, XpSourceType, BadgeRarity, ActivityType, NotificationType, DeviceType, ReportReason, ReportStatus, LeaderboardType, LessonStatus, Visibility, MessagePerm } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ============================================================================
  // 1. USERS
  // ============================================================================
  console.log('Creating users...');

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'juan@example.com' },
      update: {},
      create: {
        id: 'user_001',
        email: 'juan@example.com',
        username: 'juandelacruz',
        displayName: 'Juan Dela Cruz',
        locale: 'fil',
        xpTotal: 2500,
        level: 5,
        streakCurrent: 7,
        streakLongest: 14,
        role: UserRole.USER,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'maria@example.com' },
      update: {},
      create: {
        id: 'user_002',
        email: 'maria@example.com',
        username: 'maria_dev',
        displayName: 'Maria Santos',
        locale: 'en',
        xpTotal: 8500,
        level: 12,
        streakCurrent: 30,
        streakLongest: 45,
        role: UserRole.USER,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'admin@aralify.com' },
      update: {},
      create: {
        id: 'user_003',
        email: 'admin@aralify.com',
        username: 'admin',
        displayName: 'Admin User',
        locale: 'en',
        xpTotal: 0,
        level: 1,
        streakCurrent: 0,
        role: UserRole.ADMIN,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'mod@aralify.com' },
      update: {},
      create: {
        id: 'user_004',
        email: 'mod@aralify.com',
        username: 'moderator',
        displayName: 'Mod User',
        locale: 'en',
        xpTotal: 1200,
        level: 3,
        streakCurrent: 5,
        role: UserRole.MODERATOR,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'newbie@example.com' },
      update: {},
      create: {
        id: 'user_005',
        email: 'newbie@example.com',
        username: 'newbie_coder',
        displayName: 'New Learner',
        locale: 'fil',
        xpTotal: 100,
        level: 1,
        streakCurrent: 1,
        role: UserRole.USER,
        isVerified: false,
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // ============================================================================
  // 2. COURSES
  // ============================================================================
  console.log('Creating courses...');

  const courses = await Promise.all([
    prisma.course.upsert({
      where: { slug: 'python-basics' },
      update: {},
      create: {
        id: 'course_001',
        slug: 'python-basics',
        language: 'python',
        titleEn: 'Python Basics',
        titleFil: 'Batayan ng Python',
        descriptionEn: 'Learn Python programming from scratch. Perfect for beginners.',
        descriptionFil: 'Matuto ng Python programming mula sa simula. Perpekto para sa mga baguhan.',
        iconUrl: '/icons/python.svg',
        color: '#3776AB',
        estimatedHours: 20,
        isPublished: true,
        orderIndex: 0,
      },
    }),
    prisma.course.upsert({
      where: { slug: 'javascript-fundamentals' },
      update: {},
      create: {
        id: 'course_002',
        slug: 'javascript-fundamentals',
        language: 'javascript',
        titleEn: 'JavaScript Fundamentals',
        titleFil: 'Batayan ng JavaScript',
        descriptionEn: 'Master JavaScript basics and DOM manipulation.',
        descriptionFil: 'I-master ang batayan ng JavaScript at DOM manipulation.',
        iconUrl: '/icons/js.svg',
        color: '#F7DF1E',
        estimatedHours: 25,
        isPublished: true,
        orderIndex: 1,
      },
    }),
    prisma.course.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: {
        id: 'course_003',
        slug: 'web-development',
        language: 'html',
        titleEn: 'Web Development',
        titleFil: 'Pagbuo ng Web',
        descriptionEn: 'Build websites from scratch with HTML, CSS, and JavaScript.',
        descriptionFil: 'Bumuo ng mga website mula sa simula gamit ang HTML, CSS, at JavaScript.',
        iconUrl: '/icons/web.svg',
        color: '#E34F26',
        estimatedHours: 30,
        isPublished: true,
        orderIndex: 2,
      },
    }),
    prisma.course.upsert({
      where: { slug: 'data-structures' },
      update: {},
      create: {
        id: 'course_004',
        slug: 'data-structures',
        language: 'python',
        titleEn: 'Data Structures',
        titleFil: 'Istruktura ng Data',
        descriptionEn: 'Learn essential data structures with Python.',
        descriptionFil: 'Matuto ng mahahalagang istruktura ng data gamit ang Python.',
        iconUrl: '/icons/ds.svg',
        color: '#4B8BBE',
        estimatedHours: 40,
        isPublished: false,
        orderIndex: 3,
      },
    }),
  ]);

  console.log(`Created ${courses.length} courses`);

  // ============================================================================
  // 3. LEVELS
  // ============================================================================
  console.log('Creating levels...');

  const levels = await Promise.all([
    // Python Basics levels
    prisma.level.upsert({
      where: { id: 'level_001' },
      update: {},
      create: {
        id: 'level_001',
        courseId: 'course_001',
        slug: 'variables',
        titleEn: 'Variables & Data Types',
        titleFil: 'Mga Variable at Uri ng Data',
        descriptionEn: 'Learn how to store and manipulate data using variables.',
        descriptionFil: 'Matuto kung paano mag-imbak at magmanipula ng data gamit ang mga variable.',
        orderIndex: 0,
        isPublished: true,
      },
    }),
    prisma.level.upsert({
      where: { id: 'level_002' },
      update: {},
      create: {
        id: 'level_002',
        courseId: 'course_001',
        slug: 'control-flow',
        titleEn: 'Control Flow',
        titleFil: 'Daloy ng Kontrol',
        descriptionEn: 'Master if statements, conditions, and logical operators.',
        descriptionFil: 'I-master ang if statements, conditions, at logical operators.',
        orderIndex: 1,
        isPublished: true,
      },
    }),
    prisma.level.upsert({
      where: { id: 'level_003' },
      update: {},
      create: {
        id: 'level_003',
        courseId: 'course_001',
        slug: 'functions',
        titleEn: 'Functions',
        titleFil: 'Mga Function',
        descriptionEn: 'Create reusable code blocks with functions.',
        descriptionFil: 'Gumawa ng reusable code blocks gamit ang functions.',
        orderIndex: 2,
        isPublished: true,
      },
    }),
    prisma.level.upsert({
      where: { id: 'level_004' },
      update: {},
      create: {
        id: 'level_004',
        courseId: 'course_001',
        slug: 'loops',
        titleEn: 'Loops & Iteration',
        titleFil: 'Mga Loop',
        descriptionEn: 'Repeat actions efficiently with loops.',
        descriptionFil: 'Ulitin ang mga aksyon nang mahusay gamit ang mga loop.',
        orderIndex: 3,
        isPublished: true,
      },
    }),
    // JavaScript levels
    prisma.level.upsert({
      where: { id: 'level_005' },
      update: {},
      create: {
        id: 'level_005',
        courseId: 'course_002',
        slug: 'js-basics',
        titleEn: 'JS Basics',
        titleFil: 'Batayan ng JS',
        descriptionEn: 'Introduction to JavaScript syntax and concepts.',
        descriptionFil: 'Panimula sa JavaScript syntax at concepts.',
        orderIndex: 0,
        isPublished: true,
      },
    }),
    prisma.level.upsert({
      where: { id: 'level_006' },
      update: {},
      create: {
        id: 'level_006',
        courseId: 'course_002',
        slug: 'dom-manipulation',
        titleEn: 'DOM Manipulation',
        titleFil: 'Pagmamanipula ng DOM',
        descriptionEn: 'Learn to interact with web pages using JavaScript.',
        descriptionFil: 'Matuto makipag-interact sa mga web page gamit ang JavaScript.',
        orderIndex: 1,
        isPublished: true,
      },
    }),
    // Web Development level
    prisma.level.upsert({
      where: { id: 'level_007' },
      update: {},
      create: {
        id: 'level_007',
        courseId: 'course_003',
        slug: 'html-basics',
        titleEn: 'HTML Basics',
        titleFil: 'Batayan ng HTML',
        descriptionEn: 'Learn the structure of web pages with HTML.',
        descriptionFil: 'Matuto ng istruktura ng mga web page gamit ang HTML.',
        orderIndex: 0,
        isPublished: true,
      },
    }),
  ]);

  console.log(`Created ${levels.length} levels`);

  // ============================================================================
  // 4. LESSONS
  // ============================================================================
  console.log('Creating lessons...');

  const lessons = await Promise.all([
    // Level 1: Variables - Easy, Medium, Hard
    prisma.lesson.upsert({
      where: { id: 'lesson_001' },
      update: {},
      create: {
        id: 'lesson_001',
        levelId: 'level_001',
        difficulty: Difficulty.EASY,
        titleEn: 'Introduction to Variables',
        titleFil: 'Panimula sa mga Variable',
        content: { type: 'tutorial', sections: [{ title: 'What is a Variable?', content: 'A variable is like a container that stores data.' }] },
        xpReward: 50,
        estimatedTimeMinutes: 10,
        orderIndex: 0,
        isPublished: true,
      },
    }),
    prisma.lesson.upsert({
      where: { id: 'lesson_002' },
      update: {},
      create: {
        id: 'lesson_002',
        levelId: 'level_001',
        difficulty: Difficulty.MEDIUM,
        titleEn: 'Working with Numbers',
        titleFil: 'Paggamit ng mga Numero',
        content: { type: 'tutorial', sections: [{ title: 'Number Operations', content: 'Learn arithmetic operations in Python.' }] },
        xpReward: 100,
        estimatedTimeMinutes: 15,
        orderIndex: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.upsert({
      where: { id: 'lesson_003' },
      update: {},
      create: {
        id: 'lesson_003',
        levelId: 'level_001',
        difficulty: Difficulty.HARD,
        titleEn: 'Type Conversion Mastery',
        titleFil: 'Pag-master ng Type Conversion',
        content: { type: 'tutorial', sections: [{ title: 'Converting Types', content: 'Master type conversion between different data types.' }] },
        xpReward: 150,
        estimatedTimeMinutes: 20,
        orderIndex: 2,
        isPublished: true,
      },
    }),
    // Level 2: Control Flow
    prisma.lesson.upsert({
      where: { id: 'lesson_004' },
      update: {},
      create: {
        id: 'lesson_004',
        levelId: 'level_002',
        difficulty: Difficulty.EASY,
        titleEn: 'If Statements',
        titleFil: 'Mga If Statement',
        content: { type: 'tutorial', sections: [{ title: 'Making Decisions', content: 'Learn how to make decisions in code.' }] },
        xpReward: 50,
        estimatedTimeMinutes: 10,
        orderIndex: 0,
        isPublished: true,
      },
    }),
    prisma.lesson.upsert({
      where: { id: 'lesson_005' },
      update: {},
      create: {
        id: 'lesson_005',
        levelId: 'level_002',
        difficulty: Difficulty.MEDIUM,
        titleEn: 'Else and Elif',
        titleFil: 'Else at Elif',
        content: { type: 'tutorial', sections: [{ title: 'Multiple Conditions', content: 'Handle multiple conditions with else and elif.' }] },
        xpReward: 100,
        estimatedTimeMinutes: 15,
        orderIndex: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.upsert({
      where: { id: 'lesson_006' },
      update: {},
      create: {
        id: 'lesson_006',
        levelId: 'level_002',
        difficulty: Difficulty.HARD,
        titleEn: 'Nested Conditions',
        titleFil: 'Nested na Kondisyon',
        content: { type: 'tutorial', sections: [{ title: 'Complex Logic', content: 'Master nested conditions and complex logic.' }] },
        xpReward: 150,
        estimatedTimeMinutes: 20,
        orderIndex: 2,
        isPublished: true,
      },
    }),
    // Level 3: Functions
    prisma.lesson.upsert({
      where: { id: 'lesson_007' },
      update: {},
      create: {
        id: 'lesson_007',
        levelId: 'level_003',
        difficulty: Difficulty.EASY,
        titleEn: 'Creating Functions',
        titleFil: 'Paggawa ng mga Function',
        content: { type: 'tutorial', sections: [{ title: 'Your First Function', content: 'Learn to create your first function.' }] },
        xpReward: 50,
        estimatedTimeMinutes: 10,
        orderIndex: 0,
        isPublished: true,
      },
    }),
    prisma.lesson.upsert({
      where: { id: 'lesson_008' },
      update: {},
      create: {
        id: 'lesson_008',
        levelId: 'level_003',
        difficulty: Difficulty.MEDIUM,
        titleEn: 'Parameters & Return',
        titleFil: 'Mga Parameter at Return',
        content: { type: 'tutorial', sections: [{ title: 'Function I/O', content: 'Pass data in and get results back.' }] },
        xpReward: 100,
        estimatedTimeMinutes: 15,
        orderIndex: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.upsert({
      where: { id: 'lesson_009' },
      update: {},
      create: {
        id: 'lesson_009',
        levelId: 'level_003',
        difficulty: Difficulty.HARD,
        titleEn: 'Advanced Functions',
        titleFil: 'Advanced na mga Function',
        content: { type: 'tutorial', sections: [{ title: 'Advanced Concepts', content: 'Lambda, decorators, and more.' }] },
        xpReward: 150,
        estimatedTimeMinutes: 20,
        orderIndex: 2,
        isPublished: true,
      },
    }),
    // JS Basics
    prisma.lesson.upsert({
      where: { id: 'lesson_010' },
      update: {},
      create: {
        id: 'lesson_010',
        levelId: 'level_005',
        difficulty: Difficulty.EASY,
        titleEn: 'JavaScript Variables',
        titleFil: 'Mga Variable sa JavaScript',
        content: { type: 'tutorial', sections: [{ title: 'let, const, var', content: 'Learn the different ways to declare variables.' }] },
        xpReward: 50,
        estimatedTimeMinutes: 10,
        orderIndex: 0,
        isPublished: true,
      },
    }),
    prisma.lesson.upsert({
      where: { id: 'lesson_011' },
      update: {},
      create: {
        id: 'lesson_011',
        levelId: 'level_005',
        difficulty: Difficulty.MEDIUM,
        titleEn: 'JS Data Types',
        titleFil: 'Mga Uri ng Data sa JS',
        content: { type: 'tutorial', sections: [{ title: 'Data Types', content: 'Strings, numbers, booleans, and more.' }] },
        xpReward: 100,
        estimatedTimeMinutes: 15,
        orderIndex: 1,
        isPublished: true,
      },
    }),
    // HTML Basics
    prisma.lesson.upsert({
      where: { id: 'lesson_012' },
      update: {},
      create: {
        id: 'lesson_012',
        levelId: 'level_007',
        difficulty: Difficulty.EASY,
        titleEn: 'HTML Structure',
        titleFil: 'Istruktura ng HTML',
        content: { type: 'tutorial', sections: [{ title: 'HTML Basics', content: 'Learn the basic structure of HTML documents.' }] },
        xpReward: 50,
        estimatedTimeMinutes: 10,
        orderIndex: 0,
        isPublished: true,
      },
    }),
  ]);

  console.log(`Created ${lessons.length} lessons`);

  // ============================================================================
  // 5. QUIZZES
  // ============================================================================
  console.log('Creating quizzes...');

  const quizzes = await Promise.all([
    prisma.quiz.upsert({
      where: { id: 'quiz_001' },
      update: {},
      create: {
        id: 'quiz_001',
        lessonId: 'lesson_001',
        questionType: QuestionType.MULTIPLE_CHOICE,
        questionEn: 'What keyword is used to create a variable in Python?',
        questionFil: 'Anong keyword ang ginagamit sa paggawa ng variable sa Python?',
        options: { options: [{ id: 'a', text: 'var' }, { id: 'b', text: 'let' }, { id: 'c', text: 'const' }, { id: 'd', text: 'No keyword needed' }] },
        correctAnswer: { answer: 'd' },
        explanationEn: 'In Python, you can create variables without any keyword. Just use: variable_name = value',
        explanationFil: 'Sa Python, maaari kang gumawa ng variable nang walang keyword. Gamitin lang: variable_name = value',
        orderIndex: 0,
      },
    }),
    prisma.quiz.upsert({
      where: { id: 'quiz_002' },
      update: {},
      create: {
        id: 'quiz_002',
        lessonId: 'lesson_001',
        questionType: QuestionType.TRUE_FALSE,
        questionEn: 'Python is a statically typed language.',
        questionFil: 'Ang Python ay isang statically typed na wika.',
        options: { options: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }] },
        correctAnswer: { answer: 'false' },
        explanationEn: 'Python is dynamically typed - you don\'t need to declare variable types.',
        orderIndex: 1,
      },
    }),
    prisma.quiz.upsert({
      where: { id: 'quiz_003' },
      update: {},
      create: {
        id: 'quiz_003',
        lessonId: 'lesson_002',
        questionType: QuestionType.CODE_OUTPUT,
        questionEn: 'What is the output of: print(5 + 3)',
        questionFil: 'Ano ang output ng: print(5 + 3)',
        correctAnswer: { answer: '8' },
        explanationEn: '5 + 3 equals 8, and print() displays it.',
        orderIndex: 0,
      },
    }),
    prisma.quiz.upsert({
      where: { id: 'quiz_004' },
      update: {},
      create: {
        id: 'quiz_004',
        lessonId: 'lesson_002',
        questionType: QuestionType.FILL_BLANK,
        questionEn: 'To convert a string to integer, use ___()',
        questionFil: 'Para i-convert ang string sa integer, gamitin ang ___()',
        correctAnswer: { answer: 'int' },
        explanationEn: 'The int() function converts strings or floats to integers.',
        orderIndex: 1,
      },
    }),
    prisma.quiz.upsert({
      where: { id: 'quiz_005' },
      update: {},
      create: {
        id: 'quiz_005',
        lessonId: 'lesson_004',
        questionType: QuestionType.MULTIPLE_CHOICE,
        questionEn: 'Which operator checks equality?',
        questionFil: 'Aling operator ang nag-check ng pagkakapantay?',
        options: { options: [{ id: 'a', text: '=' }, { id: 'b', text: '==' }, { id: 'c', text: '===' }, { id: 'd', text: '!=' }] },
        correctAnswer: { answer: 'b' },
        explanationEn: '== is the equality operator. = is for assignment, != is for not equal.',
        orderIndex: 0,
      },
    }),
  ]);

  console.log(`Created ${quizzes.length} quizzes`);

  // ============================================================================
  // 6. CODE CHALLENGES
  // ============================================================================
  console.log('Creating code challenges...');

  const challenges = await Promise.all([
    prisma.codeChallenge.upsert({
      where: { id: 'cc_001' },
      update: {},
      create: {
        id: 'cc_001',
        lessonId: 'lesson_001',
        titleEn: 'Create a Variable',
        titleFil: 'Gumawa ng Variable',
        descriptionEn: 'Create a variable named "greeting" and assign it the value "Hello, World!"',
        descriptionFil: 'Gumawa ng variable na pinangalanang "greeting" at bigyan ito ng value na "Hello, World!"',
        starterCode: '# Create a variable named "greeting"\n',
        solutionCode: 'greeting = "Hello, World!"',
        language: 'python',
        testCases: { tests: [{ input: {}, expected: 'Hello, World!', check: 'greeting' }] },
        orderIndex: 0,
      },
    }),
    prisma.codeChallenge.upsert({
      where: { id: 'cc_002' },
      update: {},
      create: {
        id: 'cc_002',
        lessonId: 'lesson_002',
        titleEn: 'Calculate Sum',
        titleFil: 'Kalkulahin ang Kabuuan',
        descriptionEn: 'Given variables a and b, calculate their sum and store it in "result".',
        descriptionFil: 'Gamit ang mga variable a at b, kalkulahin ang kabuuan at ilagay sa "result".',
        starterCode: '# Variables a and b are already defined\n# Calculate the sum and store in result\n',
        solutionCode: 'result = a + b',
        language: 'python',
        testCases: { tests: [{ input: { a: 5, b: 3 }, expected: 8 }, { input: { a: 10, b: -5 }, expected: 5 }, { input: { a: 0, b: 0 }, expected: 0 }] },
        orderIndex: 0,
      },
    }),
    prisma.codeChallenge.upsert({
      where: { id: 'cc_003' },
      update: {},
      create: {
        id: 'cc_003',
        lessonId: 'lesson_003',
        titleEn: 'Type Converter',
        titleFil: 'Tagapag-convert ng Uri',
        descriptionEn: 'Convert the string variable "string_num" to an integer and store it in "num".',
        descriptionFil: 'I-convert ang string variable "string_num" sa integer at ilagay sa "num".',
        starterCode: '# string_num contains a number as string\n# Convert it to integer\n',
        solutionCode: 'num = int(string_num)',
        language: 'python',
        testCases: { tests: [{ input: { string_num: '42' }, expected: 42 }, { input: { string_num: '100' }, expected: 100 }] },
        orderIndex: 0,
      },
    }),
    prisma.codeChallenge.upsert({
      where: { id: 'cc_004' },
      update: {},
      create: {
        id: 'cc_004',
        lessonId: 'lesson_007',
        titleEn: 'Hello Function',
        titleFil: 'Function na Hello',
        descriptionEn: 'Create a function called "greet" that takes a name and returns "Hello, {name}!"',
        descriptionFil: 'Gumawa ng function na tinatawag na "greet" na kumukuha ng pangalan at nagbabalik ng "Hello, {name}!"',
        starterCode: '# Create a greet function\ndef greet(name):\n    pass\n',
        solutionCode: 'def greet(name):\n    return f"Hello, {name}!"',
        language: 'python',
        testCases: { tests: [{ input: { name: 'World' }, expected: 'Hello, World!' }, { input: { name: 'Juan' }, expected: 'Hello, Juan!' }] },
        orderIndex: 0,
      },
    }),
  ]);

  console.log(`Created ${challenges.length} code challenges`);

  // ============================================================================
  // 7. ACHIEVEMENTS
  // ============================================================================
  console.log('Creating achievements...');

  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { slug: 'first-steps' },
      update: {},
      create: {
        id: 'ach_001',
        slug: 'first-steps',
        nameEn: 'First Steps',
        nameFil: 'Unang Hakbang',
        descriptionEn: 'Complete your first lesson',
        descriptionFil: 'Kumpletuhin ang iyong unang aralin',
        iconUrl: '/achievements/first-steps.svg',
        category: 'onboarding',
        xpReward: 500,
        criteria: { type: 'lessons_completed', threshold: 1 },
        isSecret: false,
      },
    }),
    prisma.achievement.upsert({
      where: { slug: 'week-warrior' },
      update: {},
      create: {
        id: 'ach_002',
        slug: 'week-warrior',
        nameEn: 'Week Warrior',
        nameFil: 'Mandirigma ng Linggo',
        descriptionEn: 'Maintain a 7-day streak',
        descriptionFil: 'Mapanatili ang 7-araw na streak',
        iconUrl: '/achievements/week-warrior.svg',
        category: 'streak',
        xpReward: 1000,
        criteria: { type: 'streak', threshold: 7 },
        isSecret: false,
      },
    }),
    prisma.achievement.upsert({
      where: { slug: 'course-master' },
      update: {},
      create: {
        id: 'ach_003',
        slug: 'course-master',
        nameEn: 'Course Master',
        nameFil: 'Master ng Kurso',
        descriptionEn: 'Complete an entire course',
        descriptionFil: 'Kumpletuhin ang buong kurso',
        iconUrl: '/achievements/course-master.svg',
        category: 'completion',
        xpReward: 2000,
        criteria: { type: 'course_completed', threshold: 1 },
        isSecret: false,
      },
    }),
    prisma.achievement.upsert({
      where: { slug: 'speed-demon' },
      update: {},
      create: {
        id: 'ach_004',
        slug: 'speed-demon',
        nameEn: 'Speed Demon',
        nameFil: 'Mabilis na Demonyo',
        descriptionEn: 'Complete a challenge in under 60 seconds',
        descriptionFil: 'Kumpletuhin ang challenge sa loob ng 60 segundo',
        iconUrl: '/achievements/speed-demon.svg',
        category: 'challenge',
        xpReward: 750,
        criteria: { type: 'challenge_time', threshold: 60 },
        isSecret: false,
      },
    }),
    prisma.achievement.upsert({
      where: { slug: 'perfectionist' },
      update: {},
      create: {
        id: 'ach_005',
        slug: 'perfectionist',
        nameEn: 'Perfectionist',
        nameFil: 'Perpeksyunista',
        descriptionEn: 'Get 100% on 10 lessons',
        descriptionFil: 'Makakuha ng 100% sa 10 aralin',
        iconUrl: '/achievements/perfectionist.svg',
        category: 'accuracy',
        xpReward: 1500,
        criteria: { type: 'perfect_score', threshold: 10 },
        isSecret: false,
      },
    }),
    prisma.achievement.upsert({
      where: { slug: 'secret-explorer' },
      update: {},
      create: {
        id: 'ach_006',
        slug: 'secret-explorer',
        nameEn: 'Secret Explorer',
        nameFil: 'Lihim na Manlalakbay',
        descriptionEn: '???',
        descriptionFil: '???',
        iconUrl: '/achievements/secret.svg',
        category: 'hidden',
        xpReward: 2500,
        criteria: { type: 'easter_egg', threshold: 1 },
        isSecret: true,
      },
    }),
  ]);

  console.log(`Created ${achievements.length} achievements`);

  // ============================================================================
  // 8. BADGES
  // ============================================================================
  console.log('Creating badges...');

  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { slug: 'python-novice' },
      update: {},
      create: {
        id: 'badge_001',
        slug: 'python-novice',
        nameEn: 'Python Novice',
        nameFil: 'Baguhan sa Python',
        descriptionEn: 'Completed first Python level',
        descriptionFil: 'Nakumpleto ang unang level ng Python',
        iconUrl: '/badges/python-novice.svg',
        rarity: BadgeRarity.COMMON,
        criteria: { type: 'level_complete', course: 'python-basics', level: 1 },
      },
    }),
    prisma.badge.upsert({
      where: { slug: 'python-intermediate' },
      update: {},
      create: {
        id: 'badge_002',
        slug: 'python-intermediate',
        nameEn: 'Python Intermediate',
        nameFil: 'Intermediate sa Python',
        descriptionEn: 'Completed half of Python course',
        descriptionFil: 'Nakumpleto ang kalahati ng kurso ng Python',
        iconUrl: '/badges/python-mid.svg',
        rarity: BadgeRarity.UNCOMMON,
        criteria: { type: 'course_progress', course: 'python-basics', percentage: 50 },
      },
    }),
    prisma.badge.upsert({
      where: { slug: 'python-expert' },
      update: {},
      create: {
        id: 'badge_003',
        slug: 'python-expert',
        nameEn: 'Python Expert',
        nameFil: 'Eksperto sa Python',
        descriptionEn: 'Mastered Python course',
        descriptionFil: 'Na-master ang kurso ng Python',
        iconUrl: '/badges/python-expert.svg',
        rarity: BadgeRarity.RARE,
        criteria: { type: 'course_mastery', course: 'python-basics', percentage: 100 },
      },
    }),
    prisma.badge.upsert({
      where: { slug: 'streak-master' },
      update: {},
      create: {
        id: 'badge_004',
        slug: 'streak-master',
        nameEn: 'Streak Master',
        nameFil: 'Master ng Streak',
        descriptionEn: '30-day learning streak',
        descriptionFil: '30-araw na streak sa pag-aaral',
        iconUrl: '/badges/streak-master.svg',
        rarity: BadgeRarity.EPIC,
        criteria: { type: 'streak', days: 30 },
      },
    }),
    prisma.badge.upsert({
      where: { slug: 'code-legend' },
      update: {},
      create: {
        id: 'badge_005',
        slug: 'code-legend',
        nameEn: 'Code Legend',
        nameFil: 'Alamat ng Code',
        descriptionEn: 'Achieved 10,000 total XP',
        descriptionFil: 'Nakamit ang 10,000 kabuuang XP',
        iconUrl: '/badges/legend.svg',
        rarity: BadgeRarity.LEGENDARY,
        criteria: { type: 'total_xp', amount: 10000 },
      },
    }),
    prisma.badge.upsert({
      where: { slug: 'js-novice' },
      update: {},
      create: {
        id: 'badge_006',
        slug: 'js-novice',
        nameEn: 'JS Novice',
        nameFil: 'Baguhan sa JS',
        descriptionEn: 'Completed first JavaScript level',
        descriptionFil: 'Nakumpleto ang unang level ng JavaScript',
        iconUrl: '/badges/js-novice.svg',
        rarity: BadgeRarity.COMMON,
        criteria: { type: 'level_complete', course: 'javascript-fundamentals', level: 1 },
      },
    }),
  ]);

  console.log(`Created ${badges.length} badges`);

  // ============================================================================
  // 9. USER PROGRESS DATA
  // ============================================================================
  console.log('Creating user progress...');

  // User Course Progress
  await Promise.all([
    prisma.userCourseProgress.upsert({
      where: { userId_courseId: { userId: 'user_001', courseId: 'course_001' } },
      update: {},
      create: {
        userId: 'user_001',
        courseId: 'course_001',
        completionPercentage: 45.5,
        masteryPercentage: 33.3,
        totalXpEarned: 750,
        timeSpentSeconds: 7200,
      },
    }),
    prisma.userCourseProgress.upsert({
      where: { userId_courseId: { userId: 'user_001', courseId: 'course_002' } },
      update: {},
      create: {
        userId: 'user_001',
        courseId: 'course_002',
        completionPercentage: 10.0,
        masteryPercentage: 5.0,
        totalXpEarned: 100,
        timeSpentSeconds: 1800,
      },
    }),
    prisma.userCourseProgress.upsert({
      where: { userId_courseId: { userId: 'user_002', courseId: 'course_001' } },
      update: {},
      create: {
        userId: 'user_002',
        courseId: 'course_001',
        completionPercentage: 100.0,
        masteryPercentage: 100.0,
        totalXpEarned: 2500,
        timeSpentSeconds: 36000,
        completedAt: new Date('2025-12-20'),
      },
    }),
    prisma.userCourseProgress.upsert({
      where: { userId_courseId: { userId: 'user_005', courseId: 'course_001' } },
      update: {},
      create: {
        userId: 'user_005',
        courseId: 'course_001',
        completionPercentage: 5.0,
        masteryPercentage: 0.0,
        totalXpEarned: 50,
        timeSpentSeconds: 600,
      },
    }),
  ]);

  // User Level Unlocks
  await Promise.all([
    prisma.userLevelUnlock.upsert({
      where: { userId_levelId: { userId: 'user_001', levelId: 'level_001' } },
      update: {},
      create: { userId: 'user_001', levelId: 'level_001' },
    }),
    prisma.userLevelUnlock.upsert({
      where: { userId_levelId: { userId: 'user_001', levelId: 'level_002' } },
      update: {},
      create: { userId: 'user_001', levelId: 'level_002' },
    }),
    prisma.userLevelUnlock.upsert({
      where: { userId_levelId: { userId: 'user_002', levelId: 'level_001' } },
      update: {},
      create: { userId: 'user_002', levelId: 'level_001' },
    }),
    prisma.userLevelUnlock.upsert({
      where: { userId_levelId: { userId: 'user_002', levelId: 'level_002' } },
      update: {},
      create: { userId: 'user_002', levelId: 'level_002' },
    }),
    prisma.userLevelUnlock.upsert({
      where: { userId_levelId: { userId: 'user_002', levelId: 'level_003' } },
      update: {},
      create: { userId: 'user_002', levelId: 'level_003' },
    }),
    prisma.userLevelUnlock.upsert({
      where: { userId_levelId: { userId: 'user_002', levelId: 'level_004' } },
      update: {},
      create: { userId: 'user_002', levelId: 'level_004' },
    }),
    prisma.userLevelUnlock.upsert({
      where: { userId_levelId: { userId: 'user_005', levelId: 'level_001' } },
      update: {},
      create: { userId: 'user_005', levelId: 'level_001' },
    }),
  ]);

  // User Lesson Progress
  await Promise.all([
    prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: 'user_001', lessonId: 'lesson_001' } },
      update: {},
      create: {
        userId: 'user_001',
        lessonId: 'lesson_001',
        status: LessonStatus.COMPLETED,
        score: 100,
        xpEarned: 50,
        timeSpentSeconds: 480,
        completedAt: new Date(),
      },
    }),
    prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: 'user_001', lessonId: 'lesson_002' } },
      update: {},
      create: {
        userId: 'user_001',
        lessonId: 'lesson_002',
        status: LessonStatus.COMPLETED,
        score: 85,
        xpEarned: 100,
        timeSpentSeconds: 720,
        completedAt: new Date(),
      },
    }),
    prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: 'user_001', lessonId: 'lesson_003' } },
      update: {},
      create: {
        userId: 'user_001',
        lessonId: 'lesson_003',
        status: LessonStatus.IN_PROGRESS,
        timeSpentSeconds: 300,
      },
    }),
    prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: 'user_002', lessonId: 'lesson_001' } },
      update: {},
      create: {
        userId: 'user_002',
        lessonId: 'lesson_001',
        status: LessonStatus.COMPLETED,
        score: 100,
        xpEarned: 50,
        timeSpentSeconds: 360,
        completedAt: new Date(),
      },
    }),
    prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: 'user_002', lessonId: 'lesson_002' } },
      update: {},
      create: {
        userId: 'user_002',
        lessonId: 'lesson_002',
        status: LessonStatus.COMPLETED,
        score: 100,
        xpEarned: 100,
        timeSpentSeconds: 600,
        completedAt: new Date(),
      },
    }),
    prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: 'user_002', lessonId: 'lesson_003' } },
      update: {},
      create: {
        userId: 'user_002',
        lessonId: 'lesson_003',
        status: LessonStatus.COMPLETED,
        score: 95,
        xpEarned: 150,
        timeSpentSeconds: 900,
        completedAt: new Date(),
      },
    }),
    prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: 'user_005', lessonId: 'lesson_001' } },
      update: {},
      create: {
        userId: 'user_005',
        lessonId: 'lesson_001',
        status: LessonStatus.IN_PROGRESS,
        timeSpentSeconds: 300,
      },
    }),
  ]);

  console.log('Created user progress data');

  // ============================================================================
  // 10. GAMIFICATION DATA
  // ============================================================================
  console.log('Creating gamification data...');

  // XP Transactions
  await Promise.all([
    prisma.xpTransaction.create({
      data: {
        userId: 'user_001',
        amount: 50,
        sourceType: XpSourceType.LESSON_COMPLETE,
        sourceId: 'lesson_001',
        description: 'Completed: Introduction to Variables',
        multiplier: 1.0,
      },
    }),
    prisma.xpTransaction.create({
      data: {
        userId: 'user_001',
        amount: 200,
        sourceType: XpSourceType.LESSON_COMPLETE,
        sourceId: 'lesson_002',
        description: 'Completed: Working with Numbers (Medium)',
        multiplier: 2.0,
      },
    }),
    prisma.xpTransaction.create({
      data: {
        userId: 'user_001',
        amount: 50,
        sourceType: XpSourceType.STREAK_BONUS,
        description: '7-day streak bonus',
        multiplier: 1.0,
      },
    }),
    prisma.xpTransaction.create({
      data: {
        userId: 'user_002',
        amount: 450,
        sourceType: XpSourceType.LESSON_COMPLETE,
        sourceId: 'lesson_003',
        description: 'Completed: Type Conversion Mastery (Hard)',
        multiplier: 3.0,
      },
    }),
    prisma.xpTransaction.create({
      data: {
        userId: 'user_002',
        amount: 500,
        sourceType: XpSourceType.ACHIEVEMENT,
        sourceId: 'ach_001',
        description: 'Achievement: First Steps',
        multiplier: 1.0,
      },
    }),
  ]);

  // User Achievements
  await Promise.all([
    prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: 'user_001', achievementId: 'ach_001' } },
      update: {},
      create: { userId: 'user_001', achievementId: 'ach_001' },
    }),
    prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: 'user_001', achievementId: 'ach_002' } },
      update: {},
      create: { userId: 'user_001', achievementId: 'ach_002' },
    }),
    prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: 'user_002', achievementId: 'ach_001' } },
      update: {},
      create: { userId: 'user_002', achievementId: 'ach_001' },
    }),
    prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: 'user_002', achievementId: 'ach_002' } },
      update: {},
      create: { userId: 'user_002', achievementId: 'ach_002' },
    }),
    prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: 'user_002', achievementId: 'ach_003' } },
      update: {},
      create: { userId: 'user_002', achievementId: 'ach_003' },
    }),
    prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: 'user_002', achievementId: 'ach_005' } },
      update: {},
      create: { userId: 'user_002', achievementId: 'ach_005' },
    }),
  ]);

  // User Badges
  await Promise.all([
    prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: 'user_001', badgeId: 'badge_001' } },
      update: {},
      create: { userId: 'user_001', badgeId: 'badge_001', isDisplayed: true, displayOrder: 1 },
    }),
    prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: 'user_002', badgeId: 'badge_001' } },
      update: {},
      create: { userId: 'user_002', badgeId: 'badge_001' },
    }),
    prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: 'user_002', badgeId: 'badge_002' } },
      update: {},
      create: { userId: 'user_002', badgeId: 'badge_002', isDisplayed: true, displayOrder: 1 },
    }),
    prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: 'user_002', badgeId: 'badge_003' } },
      update: {},
      create: { userId: 'user_002', badgeId: 'badge_003', isDisplayed: true, displayOrder: 2 },
    }),
    prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: 'user_002', badgeId: 'badge_004' } },
      update: {},
      create: { userId: 'user_002', badgeId: 'badge_004', isDisplayed: true, displayOrder: 3 },
    }),
  ]);

  // Streak History
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    await prisma.streakHistory.upsert({
      where: { userId_date: { userId: 'user_001', date } },
      update: {},
      create: {
        userId: 'user_001',
        date,
        activityCount: Math.floor(Math.random() * 4) + 1,
        xpEarned: Math.floor(Math.random() * 300) + 100,
        streakDay: 7 - i,
      },
    });
  }

  console.log('Created gamification data');

  // ============================================================================
  // 11. SOCIAL DATA
  // ============================================================================
  console.log('Creating social data...');

  // Follows
  await Promise.all([
    prisma.follow.upsert({
      where: { followerId_followingId: { followerId: 'user_001', followingId: 'user_002' } },
      update: {},
      create: { followerId: 'user_001', followingId: 'user_002' },
    }),
    prisma.follow.upsert({
      where: { followerId_followingId: { followerId: 'user_005', followingId: 'user_001' } },
      update: {},
      create: { followerId: 'user_005', followingId: 'user_001' },
    }),
    prisma.follow.upsert({
      where: { followerId_followingId: { followerId: 'user_005', followingId: 'user_002' } },
      update: {},
      create: { followerId: 'user_005', followingId: 'user_002' },
    }),
    prisma.follow.upsert({
      where: { followerId_followingId: { followerId: 'user_002', followingId: 'user_001' } },
      update: {},
      create: { followerId: 'user_002', followingId: 'user_001' },
    }),
  ]);

  // Activities
  await Promise.all([
    prisma.activity.create({
      data: {
        userId: 'user_001',
        activityType: ActivityType.COURSE_STARTED,
        entityType: 'course',
        entityId: 'course_001',
        isPublic: true,
      },
    }),
    prisma.activity.create({
      data: {
        userId: 'user_001',
        activityType: ActivityType.LESSON_COMPLETED,
        entityType: 'lesson',
        entityId: 'lesson_001',
        isPublic: true,
      },
    }),
    prisma.activity.create({
      data: {
        userId: 'user_001',
        activityType: ActivityType.ACHIEVEMENT_EARNED,
        entityType: 'achievement',
        entityId: 'ach_001',
        isPublic: true,
      },
    }),
    prisma.activity.create({
      data: {
        userId: 'user_002',
        activityType: ActivityType.COURSE_COMPLETED,
        entityType: 'course',
        entityId: 'course_001',
        isPublic: true,
      },
    }),
    prisma.activity.create({
      data: {
        userId: 'user_002',
        activityType: ActivityType.BADGE_EARNED,
        entityType: 'badge',
        entityId: 'badge_003',
        isPublic: true,
      },
    }),
  ]);

  console.log('Created social data');

  // ============================================================================
  // 12. COMMENTS
  // ============================================================================
  console.log('Creating comments...');

  // Create parent comments first
  await prisma.comment.upsert({
    where: { id: 'com_001' },
    update: {},
    create: {
      id: 'com_001',
      userId: 'user_001',
      lessonId: 'lesson_001',
      content: 'Great explanation of variables! Very clear.',
    },
  });
  await prisma.comment.upsert({
    where: { id: 'com_002' },
    update: {},
    create: {
      id: 'com_002',
      userId: 'user_002',
      lessonId: 'lesson_001',
      content: 'Tip: Try using meaningful variable names like "user_age" instead of "x".',
      isPinned: true,
    },
  });
  await prisma.comment.upsert({
    where: { id: 'com_004' },
    update: {},
    create: {
      id: 'com_004',
      userId: 'user_001',
      lessonId: 'lesson_002',
      content: 'The integer conversion part was tricky for me at first.',
      isEdited: true,
    },
  });

  // Create reply comments after parents exist
  await prisma.comment.upsert({
    where: { id: 'com_003' },
    update: {},
    create: {
      id: 'com_003',
      userId: 'user_005',
      lessonId: 'lesson_001',
      parentId: 'com_001',
      content: 'Thanks! This helped me understand better.',
    },
  });
  await prisma.comment.upsert({
    where: { id: 'com_005' },
    update: {},
    create: {
      id: 'com_005',
      userId: 'user_002',
      lessonId: 'lesson_002',
      parentId: 'com_004',
      content: 'Try using int() and float() - practice makes perfect!',
    },
  });

  const comments = await prisma.comment.findMany();

  // Comment Likes
  await Promise.all([
    prisma.commentLike.create({ data: { userId: 'user_002', commentId: 'com_001' } }),
    prisma.commentLike.create({ data: { userId: 'user_005', commentId: 'com_002' } }),
    prisma.commentLike.create({ data: { userId: 'user_001', commentId: 'com_002' } }),
    prisma.commentLike.create({ data: { userId: 'user_001', commentId: 'com_005' } }),
    prisma.commentLike.create({ data: { userId: 'user_005', commentId: 'com_001' } }),
  ]);

  console.log(`Created ${comments.length} comments with likes`);

  // ============================================================================
  // 13. NOTIFICATIONS
  // ============================================================================
  console.log('Creating notifications...');

  await Promise.all([
    prisma.notification.create({
      data: {
        userId: 'user_001',
        type: NotificationType.ACHIEVEMENT_EARNED,
        title: 'Achievement Unlocked!',
        message: 'You earned "First Steps"!',
        isRead: true,
      },
    }),
    prisma.notification.create({
      data: {
        userId: 'user_001',
        type: NotificationType.STREAK_REMINDER,
        title: 'Keep your streak!',
        message: "Don't forget to practice today!",
        isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        userId: 'user_001',
        type: NotificationType.NEW_FOLLOWER,
        title: 'New Follower',
        message: 'newbie_coder started following you',
        isRead: true,
      },
    }),
    prisma.notification.create({
      data: {
        userId: 'user_002',
        type: NotificationType.BADGE_EARNED,
        title: 'New Badge!',
        message: 'You earned "Python Expert"!',
        isRead: true,
      },
    }),
    prisma.notification.create({
      data: {
        userId: 'user_005',
        type: NotificationType.LEVEL_UP,
        title: 'Level Up!',
        message: 'You reached Level 2!',
        isRead: false,
      },
    }),
  ]);

  console.log('Created notifications');

  // ============================================================================
  // 14. SETTINGS
  // ============================================================================
  console.log('Creating user settings...');

  await Promise.all([
    prisma.userSettings.upsert({
      where: { userId: 'user_001' },
      update: {},
      create: {
        userId: 'user_001',
        theme: 'dark',
        codeEditorTheme: 'monokai',
        fontSize: 14,
        dailyGoalMins: 30,
        difficultyPref: Difficulty.MEDIUM,
      },
    }),
    prisma.userSettings.upsert({
      where: { userId: 'user_002' },
      update: {},
      create: {
        userId: 'user_002',
        theme: 'auto',
        codeEditorTheme: 'vs-dark',
        fontSize: 16,
        dailyGoalMins: 60,
        difficultyPref: Difficulty.HARD,
      },
    }),
    prisma.userSettings.upsert({
      where: { userId: 'user_005' },
      update: {},
      create: {
        userId: 'user_005',
        theme: 'auto',
        codeEditorTheme: 'vs-dark',
        fontSize: 18,
        dailyGoalMins: 15,
        difficultyPref: Difficulty.EASY,
      },
    }),
  ]);

  await Promise.all([
    prisma.notificationSettings.upsert({
      where: { userId: 'user_001' },
      update: {},
      create: {
        userId: 'user_001',
        emailEnabled: true,
        pushEnabled: true,
        streakReminders: true,
        achievementNotifs: true,
        socialNotifs: true,
      },
    }),
    prisma.notificationSettings.upsert({
      where: { userId: 'user_002' },
      update: {},
      create: {
        userId: 'user_002',
        emailEnabled: true,
        pushEnabled: true,
        streakReminders: false,
        achievementNotifs: true,
        socialNotifs: true,
      },
    }),
    prisma.notificationSettings.upsert({
      where: { userId: 'user_005' },
      update: {},
      create: {
        userId: 'user_005',
        emailEnabled: true,
        pushEnabled: true,
        streakReminders: true,
        achievementNotifs: true,
        socialNotifs: true,
      },
    }),
  ]);

  await Promise.all([
    prisma.privacySettings.upsert({
      where: { userId: 'user_001' },
      update: {},
      create: {
        userId: 'user_001',
        profileVisibility: Visibility.PUBLIC,
        showProgress: true,
        showActivity: true,
        allowMessages: MessagePerm.EVERYONE,
      },
    }),
    prisma.privacySettings.upsert({
      where: { userId: 'user_002' },
      update: {},
      create: {
        userId: 'user_002',
        profileVisibility: Visibility.PUBLIC,
        showProgress: true,
        showActivity: true,
        allowMessages: MessagePerm.FRIENDS,
      },
    }),
    prisma.privacySettings.upsert({
      where: { userId: 'user_004' },
      update: {},
      create: {
        userId: 'user_004',
        profileVisibility: Visibility.PRIVATE,
        showProgress: false,
        showActivity: false,
        allowMessages: MessagePerm.NONE,
      },
    }),
    prisma.privacySettings.upsert({
      where: { userId: 'user_005' },
      update: {},
      create: {
        userId: 'user_005',
        profileVisibility: Visibility.PUBLIC,
        showProgress: true,
        showActivity: true,
        allowMessages: MessagePerm.EVERYONE,
      },
    }),
  ]);

  console.log('Created user settings');

  // ============================================================================
  // 15. LEADERBOARD
  // ============================================================================
  console.log('Creating leaderboard snapshot...');

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  await prisma.leaderboardSnapshot.create({
    data: {
      leaderboardType: LeaderboardType.GLOBAL_WEEKLY,
      periodStart: weekStart,
      periodEnd: new Date(),
      rankings: {
        rankings: [
          { rank: 1, userId: 'user_002', xp: 1500, username: 'maria_dev' },
          { rank: 2, userId: 'user_001', xp: 750, username: 'juandelacruz' },
          { rank: 3, userId: 'user_005', xp: 100, username: 'newbie_coder' },
        ],
      },
    },
  });

  console.log('Created leaderboard snapshot');

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
