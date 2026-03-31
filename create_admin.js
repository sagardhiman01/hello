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
      phone: '+91 00000 00000',
      role: 'admin',
    },
  });

  console.log('✅ Admin user created/updated:', admin.email);
  console.log('📧 Email: admin@theaurika.com');
  console.log('🔑 Password: admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
