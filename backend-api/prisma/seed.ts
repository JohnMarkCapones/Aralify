import { PrismaClient, Difficulty, QuizType, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...\n');

  // ============================================
  // DEMO USERS
  // ============================================
  console.log('👤 Seeding demo users...');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@aralify.com' },
    update: {},
    create: {
      email: 'admin@aralify.com',
      username: 'admin',
      displayName: 'Admin User',
      bio: 'Platform administrator',
      role: UserRole.ADMIN,
      isVerified: true,
      xpTotal: 10000,
      level: 25,
      streakCurrent: 30,
      streakLongest: 45,
      settings: {
        create: {
          theme: 'dark',
          codeEditorTheme: 'vs-dark',
          fontSize: 14,
          dailyGoalMins: 60,
          difficultyPref: Difficulty.HARD,
        },
      },
      notificationSettings: {
        create: {
          emailEnabled: true,
          pushEnabled: true,
          streakReminders: true,
          achievementNotifs: true,
          socialNotifs: true,
        },
      },
      privacySettings: {
        create: {
          profileVisibility: 'PUBLIC',
          showProgress: true,
          showActivity: true,
          allowMessages: 'EVERYONE',
        },
      },
    },
  });

  const modUser = await prisma.user.upsert({
    where: { email: 'mod@aralify.com' },
    update: {},
    create: {
      email: 'mod@aralify.com',
      username: 'moderator',
      displayName: 'Mod User',
      bio: 'Community moderator',
      role: UserRole.MODERATOR,
      isVerified: true,
      xpTotal: 5000,
      level: 15,
      streakCurrent: 14,
      streakLongest: 20,
      settings: {
        create: {
          theme: 'auto',
          codeEditorTheme: 'vs-dark',
          fontSize: 14,
          dailyGoalMins: 45,
          difficultyPref: Difficulty.MEDIUM,
        },
      },
      notificationSettings: { create: {} },
      privacySettings: { create: {} },
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@aralify.com' },
    update: {},
    create: {
      email: 'demo@aralify.com',
      username: 'demo_learner',
      displayName: 'Demo Learner',
      bio: 'Just learning to code!',
      role: UserRole.USER,
      isVerified: true,
      xpTotal: 1500,
      level: 5,
      streakCurrent: 3,
      streakLongest: 7,
      settings: {
        create: {
          theme: 'light',
          codeEditorTheme: 'vs-light',
          fontSize: 16,
          dailyGoalMins: 30,
          difficultyPref: Difficulty.EASY,
        },
      },
      notificationSettings: { create: {} },
      privacySettings: { create: {} },
    },
  });

  console.log(`   ✅ Created ${adminUser.email}, ${modUser.email}, ${demoUser.email}\n`);

  // ============================================
  // COURSES
  // ============================================
  console.log('📚 Seeding courses...');

  const pythonCourse = await prisma.course.upsert({
    where: { slug: 'python-fundamentals' },
    update: {},
    create: {
      slug: 'python-fundamentals',
      title: 'Python Fundamentals',
      titleEn: 'Python Fundamentals',
      titleFil: 'Batayan ng Python',
      description: 'Learn Python from scratch. Master variables, loops, functions, and more!',
      language: 'python',
      iconUrl: '/icons/python.svg',
      color: '#3776AB',
      orderIndex: 0,
      isPublished: true,
    },
  });

  const jsCourse = await prisma.course.upsert({
    where: { slug: 'javascript-essentials' },
    update: {},
    create: {
      slug: 'javascript-essentials',
      title: 'JavaScript Essentials',
      titleEn: 'JavaScript Essentials',
      titleFil: 'Mga Pangunahing JavaScript',
      description: 'Master JavaScript for web development. DOM, events, async, and more!',
      language: 'javascript',
      iconUrl: '/icons/javascript.svg',
      color: '#F7DF1E',
      orderIndex: 1,
      isPublished: true,
    },
  });

  const htmlCssCourse = await prisma.course.upsert({
    where: { slug: 'html-css-basics' },
    update: {},
    create: {
      slug: 'html-css-basics',
      title: 'HTML & CSS Basics',
      titleEn: 'HTML & CSS Basics',
      titleFil: 'Batayan ng HTML at CSS',
      description: 'Build beautiful websites with HTML and CSS. Learn structure and styling!',
      language: 'html',
      iconUrl: '/icons/html5.svg',
      color: '#E34F26',
      orderIndex: 2,
      isPublished: true,
    },
  });

  console.log(`   ✅ Created ${pythonCourse.title}, ${jsCourse.title}, ${htmlCssCourse.title}\n`);

  // ============================================
  // LEVELS & LESSONS
  // ============================================
  console.log('📖 Seeding levels and lessons...');

  // Python Course Levels
  const pythonLevels = [
    { slug: 'variables-data-types', title: 'Variables & Data Types', description: 'Learn about variables, strings, numbers, and booleans' },
    { slug: 'control-flow', title: 'Control Flow', description: 'Master if statements, loops, and conditions' },
    { slug: 'functions', title: 'Functions', description: 'Create reusable code with functions' },
    { slug: 'lists-dictionaries', title: 'Lists & Dictionaries', description: 'Work with collections of data' },
  ];

  // JavaScript Course Levels
  const jsLevels = [
    { slug: 'js-basics', title: 'JavaScript Basics', description: 'Variables, types, and operators' },
    { slug: 'dom-manipulation', title: 'DOM Manipulation', description: 'Interact with web pages' },
    { slug: 'events-handlers', title: 'Events & Handlers', description: 'Respond to user interactions' },
    { slug: 'async-javascript', title: 'Async JavaScript', description: 'Promises, async/await, and fetch' },
  ];

  // HTML/CSS Course Levels
  const htmlCssLevels = [
    { slug: 'html-structure', title: 'HTML Structure', description: 'Tags, elements, and document structure' },
    { slug: 'css-styling', title: 'CSS Styling', description: 'Colors, fonts, and basic styling' },
    { slug: 'layout-flexbox', title: 'Layout with Flexbox', description: 'Create flexible layouts' },
    { slug: 'responsive-design', title: 'Responsive Design', description: 'Build mobile-friendly websites' },
  ];

  const courseLevelsMap = [
    { course: pythonCourse, levels: pythonLevels, langId: 71 }, // Python 3
    { course: jsCourse, levels: jsLevels, langId: 63 }, // JavaScript
    { course: htmlCssCourse, levels: htmlCssLevels, langId: 63 }, // HTML uses JS for Judge0
  ];

  let totalLessons = 0;
  let totalQuizzes = 0;
  let totalChallenges = 0;

  for (const { course, levels, langId } of courseLevelsMap) {
    for (let i = 0; i < levels.length; i++) {
      const levelData = levels[i];

      const level = await prisma.level.upsert({
        where: { courseId_slug: { courseId: course.id, slug: levelData.slug } },
        update: {},
        create: {
          courseId: course.id,
          slug: levelData.slug,
          title: levelData.title,
          description: levelData.description,
          orderIndex: i,
          isPublished: true,
        },
      });

      // Create 3 lessons per level (Easy, Medium, Hard)
      const difficulties: Difficulty[] = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];
      const xpRewards = { EASY: 100, MEDIUM: 200, HARD: 300 };

      for (let d = 0; d < difficulties.length; d++) {
        const difficulty = difficulties[d];
        const lessonSlug = `${levelData.slug}-lesson`;

        const lesson = await prisma.lesson.upsert({
          where: { levelId_slug_difficulty: { levelId: level.id, slug: lessonSlug, difficulty } },
          update: {},
          create: {
            levelId: level.id,
            slug: lessonSlug,
            title: `${levelData.title} - ${difficulty}`,
            content: {
              introduction: `Welcome to ${levelData.title} (${difficulty} mode)!`,
              sections: [
                { title: 'Overview', content: `This lesson covers ${levelData.description.toLowerCase()}.` },
                { title: 'Key Concepts', content: 'Learn the fundamental concepts step by step.' },
                { title: 'Practice', content: 'Apply what you learned with hands-on exercises.' },
              ],
              summary: 'Great job completing this lesson!',
            },
            difficulty,
            xpReward: xpRewards[difficulty],
            orderIndex: d,
            isPublished: true,
          },
        });
        totalLessons++;

        // Create 2 quizzes per lesson
        const quizTypes: QuizType[] = [QuizType.MULTIPLE_CHOICE, QuizType.TRUE_FALSE];
        for (let q = 0; q < quizTypes.length; q++) {
          await prisma.quiz.upsert({
            where: { id: `quiz-${lesson.id}-${q}` },
            update: {},
            create: {
              id: `quiz-${lesson.id}-${q}`,
              lessonId: lesson.id,
              type: quizTypes[q],
              question: quizTypes[q] === QuizType.MULTIPLE_CHOICE
                ? `What is a key concept in ${levelData.title}?`
                : `${levelData.title} is an important programming concept.`,
              options: quizTypes[q] === QuizType.MULTIPLE_CHOICE
                ? ['Option A - Correct', 'Option B', 'Option C', 'Option D']
                : undefined,
              correctAnswer: quizTypes[q] === QuizType.MULTIPLE_CHOICE ? 'Option A - Correct' : 'true',
              explanation: `This is the explanation for the ${quizTypes[q]} quiz.`,
              orderIndex: q,
            },
          });
          totalQuizzes++;
        }

        // Create 1 code challenge per lesson
        await prisma.codeChallenge.upsert({
          where: { id: `challenge-${lesson.id}` },
          update: {},
          create: {
            id: `challenge-${lesson.id}`,
            lessonId: lesson.id,
            title: `${levelData.title} Challenge`,
            description: `Apply your knowledge of ${levelData.description.toLowerCase()}`,
            starterCode: course.language === 'python'
              ? '# Write your code here\n\ndef solution():\n    pass\n'
              : course.language === 'javascript'
              ? '// Write your code here\n\nfunction solution() {\n  \n}\n'
              : '<!-- Write your HTML here -->\n',
            solutionCode: course.language === 'python'
              ? 'def solution():\n    return "Hello, World!"\n'
              : course.language === 'javascript'
              ? 'function solution() {\n  return "Hello, World!";\n}\n'
              : '<h1>Hello, World!</h1>\n',
            testCases: [
              { input: '', expectedOutput: 'Hello, World!' },
            ],
            hints: ['Think about the basics', 'Review the lesson content', 'Try a simple approach first'],
            languageId: langId,
          },
        });
        totalChallenges++;
      }
    }
  }

  console.log(`   ✅ Created ${totalLessons} lessons, ${totalQuizzes} quizzes, ${totalChallenges} challenges\n`);

  // ============================================
  // ACHIEVEMENTS
  // ============================================
  console.log('🏆 Seeding achievements...');

  const achievements = [
    // Completion achievements
    { slug: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson', category: 'completion', xpReward: 50, criteria: { type: 'lessons_completed', count: 1 } },
    { slug: 'ten-lessons', title: 'Getting Started', description: 'Complete 10 lessons', category: 'completion', xpReward: 200, criteria: { type: 'lessons_completed', count: 10 } },
    { slug: 'fifty-lessons', title: 'Dedicated Learner', description: 'Complete 50 lessons', category: 'completion', xpReward: 500, criteria: { type: 'lessons_completed', count: 50 } },
    { slug: 'hundred-lessons', title: 'Centurion', description: 'Complete 100 lessons', category: 'completion', xpReward: 1000, criteria: { type: 'lessons_completed', count: 100 } },

    // Streak achievements
    { slug: 'streak-3', title: 'On Fire', description: 'Maintain a 3-day streak', category: 'streak', xpReward: 100, criteria: { type: 'streak', count: 3 } },
    { slug: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day streak', category: 'streak', xpReward: 250, criteria: { type: 'streak', count: 7 } },
    { slug: 'streak-30', title: 'Monthly Master', description: 'Maintain a 30-day streak', category: 'streak', xpReward: 1000, criteria: { type: 'streak', count: 30 } },
    { slug: 'streak-100', title: 'Unstoppable', description: 'Maintain a 100-day streak', category: 'streak', xpReward: 5000, criteria: { type: 'streak', count: 100 }, isSecret: true },

    // Mastery achievements
    { slug: 'first-hard', title: 'Challenge Accepted', description: 'Complete your first HARD lesson', category: 'mastery', xpReward: 150, criteria: { type: 'hard_lessons', count: 1 } },
    { slug: 'python-master', title: 'Python Master', description: 'Complete all Python lessons', category: 'mastery', xpReward: 2000, criteria: { type: 'course_complete', course: 'python-fundamentals' } },
    { slug: 'js-master', title: 'JavaScript Master', description: 'Complete all JavaScript lessons', category: 'mastery', xpReward: 2000, criteria: { type: 'course_complete', course: 'javascript-essentials' } },

    // XP achievements
    { slug: 'xp-1000', title: 'Rising Star', description: 'Earn 1,000 XP', category: 'xp', xpReward: 100, criteria: { type: 'total_xp', count: 1000 } },
    { slug: 'xp-10000', title: 'XP Hunter', description: 'Earn 10,000 XP', category: 'xp', xpReward: 500, criteria: { type: 'total_xp', count: 10000 } },

    // Social achievements
    { slug: 'first-comment', title: 'Socializer', description: 'Leave your first comment', category: 'social', xpReward: 50, criteria: { type: 'comments', count: 1 } },
    { slug: 'first-follower', title: 'Influencer', description: 'Get your first follower', category: 'social', xpReward: 100, criteria: { type: 'followers', count: 1 } },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: {},
      create: {
        slug: achievement.slug,
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        xpReward: achievement.xpReward,
        criteria: achievement.criteria,
        isSecret: achievement.isSecret || false,
        iconUrl: `/icons/achievements/${achievement.slug}.svg`,
      },
    });
  }

  console.log(`   ✅ Created ${achievements.length} achievements\n`);

  // ============================================
  // BADGES
  // ============================================
  console.log('🎖️ Seeding badges...');

  const badges = [
    { slug: 'newcomer', title: 'Newcomer', description: 'Welcome to Aralify!', rarity: 'common' },
    { slug: 'quick-learner', title: 'Quick Learner', description: 'Complete 5 lessons in one day', rarity: 'common' },
    { slug: 'night-owl', title: 'Night Owl', description: 'Study after midnight', rarity: 'common' },
    { slug: 'early-bird', title: 'Early Bird', description: 'Study before 6 AM', rarity: 'rare' },
    { slug: 'perfectionist', title: 'Perfectionist', description: 'Get 100% on 10 quizzes', rarity: 'rare' },
    { slug: 'speed-demon', title: 'Speed Demon', description: 'Complete a lesson in under 5 minutes', rarity: 'rare' },
    { slug: 'polyglot', title: 'Polyglot', description: 'Complete lessons in 3 different languages', rarity: 'epic' },
    { slug: 'mentor', title: 'Mentor', description: 'Help 10 learners with comments', rarity: 'epic' },
    { slug: 'legend', title: 'Legend', description: 'Reach level 50', rarity: 'legendary' },
    { slug: 'founder', title: 'Founder', description: 'Early adopter of Aralify', rarity: 'legendary' },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {},
      create: {
        slug: badge.slug,
        title: badge.title,
        description: badge.description,
        rarity: badge.rarity,
        iconUrl: `/icons/badges/${badge.slug}.svg`,
      },
    });
  }

  console.log(`   ✅ Created ${badges.length} badges\n`);

  // ============================================
  // GIVE DEMO USER SOME PROGRESS
  // ============================================
  console.log('📊 Seeding demo user progress...');

  // Give demo user the newcomer badge
  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: demoUser.id, badgeId: (await prisma.badge.findUnique({ where: { slug: 'newcomer' } }))!.id } },
    update: {},
    create: {
      userId: demoUser.id,
      badgeId: (await prisma.badge.findUnique({ where: { slug: 'newcomer' } }))!.id,
    },
  });

  // Give demo user some achievements
  const firstLessonAchievement = await prisma.achievement.findUnique({ where: { slug: 'first-lesson' } });
  if (firstLessonAchievement) {
    await prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: demoUser.id, achievementId: firstLessonAchievement.id } },
      update: {},
      create: {
        userId: demoUser.id,
        achievementId: firstLessonAchievement.id,
      },
    });
  }

  // Give admin user some badges and achievements
  const legendBadge = await prisma.badge.findUnique({ where: { slug: 'legend' } });
  const founderBadge = await prisma.badge.findUnique({ where: { slug: 'founder' } });

  if (legendBadge) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: adminUser.id, badgeId: legendBadge.id } },
      update: {},
      create: { userId: adminUser.id, badgeId: legendBadge.id },
    });
  }

  if (founderBadge) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: adminUser.id, badgeId: founderBadge.id } },
      update: {},
      create: { userId: adminUser.id, badgeId: founderBadge.id },
    });
  }

  console.log(`   ✅ Added badges and achievements to demo users\n`);

  // ============================================
  // SUMMARY
  // ============================================
  console.log('═══════════════════════════════════════');
  console.log('🎉 Seed completed successfully!');
  console.log('═══════════════════════════════════════');
  console.log(`   👤 Users: 3 demo users`);
  console.log(`   📚 Courses: 3`);
  console.log(`   📖 Levels: 12`);
  console.log(`   📝 Lessons: ${totalLessons}`);
  console.log(`   ❓ Quizzes: ${totalQuizzes}`);
  console.log(`   💻 Code Challenges: ${totalChallenges}`);
  console.log(`   🏆 Achievements: ${achievements.length}`);
  console.log(`   🎖️ Badges: ${badges.length}`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
