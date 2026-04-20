const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  });
  
  if (user) {
    console.log('✅ User exists in database:');
    console.log('   Email:', user.email);
    console.log('   Username:', user.username);
    console.log('   Name:', user.name);
  } else {
    console.log('❌ User not found');
  }
  
  await prisma.$disconnect();
}

checkUser();
