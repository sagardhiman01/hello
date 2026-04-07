const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@theaurika.com' },
    update: { role: 'admin', password: hashedPassword },
    create: {
      name: 'Admin',
      email: 'admin@theaurika.com',
      password: hashedPassword,
      phone: '+919837944411',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created/updated:', admin.email);
}
main().catch(console.error).finally(() => prisma.$disconnect());
