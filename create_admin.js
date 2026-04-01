const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('macstudio123456', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'macstudiohub1@gmail.com' },
    update: { role: 'admin', password: hashedPassword },
    create: {
      name: 'Mac Studio Hub',
      email: 'macstudiohub1@gmail.com',
      password: hashedPassword,
      phone: '+91 00000 00000',
      role: 'admin',
    },
  });

  console.log('✅ Admin user created/updated:', admin.email);
  console.log('📧 Email: macstudiohub1@gmail.com');
  console.log('🔑 Password: macstudio123456');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
