const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check users
  const users = await prisma.user.findMany({ take: 10 });
  console.log('=== USERS IN DATABASE ===');
  console.log('Count:', users.length);
  users.forEach(u => {
    console.log(`- ${u.email} | username: ${u.username} | level: ${u.level} | xp: ${u.xpTotal}`);
  });

  // Check all tables
  const tables = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`;
  console.log('\n=== TABLES IN DATABASE ===');
  tables.forEach(t => console.log(`- ${t.tablename}`));

  // Check courses
  const courses = await prisma.course.findMany({ take: 5 });
  console.log('\n=== COURSES ===');
  console.log('Count:', courses.length);
  courses.forEach(c => console.log(`- ${c.title} (${c.slug})`));
}

main()
  .catch(e => console.error('Error:', e.message))
  .finally(() => prisma.$disconnect());
