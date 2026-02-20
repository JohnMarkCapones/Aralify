const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Testing user creation...');

  try {
    // Try to create a test user
    const user = await prisma.user.create({
      data: {
        id: 'test-user-123',
        email: 'test@example.com',
        username: 'testuser',
        displayName: 'Test User',
        isVerified: true,
      },
    });
    console.log('✅ User created successfully:', user);

    // Clean up - delete the test user
    await prisma.user.delete({ where: { id: 'test-user-123' } });
    console.log('✅ Test user deleted');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) console.error('   Code:', error.code);
    if (error.meta) console.error('   Meta:', error.meta);
  }
}

main()
  .finally(() => prisma.$disconnect());
