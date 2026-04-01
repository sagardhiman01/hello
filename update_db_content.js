const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating database content to remove 22K and Gold references...');

  // 1. Update SiteSettings
  const settingsToUpdate = [
    { key: 'hero_stat_1', value: 'Premium' },
    { key: 'hero_stat_1_label', value: 'Quality' },
    { key: 'hero_stat_2_label', value: 'Custom Designs' },
    { key: 'banner_text', value: 'At THE AURIKA, we source only the finest ethically curated materials, pearls, and premium metals. Every creation is born from a meticulous design process, ensuring each detail reflects our commitment to perfection.' }
  ];

  for (const setting of settingsToUpdate) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }
  console.log('✅ Site settings updated.');

  // 2. Update existing Products
  const products = await prisma.product.updateMany({
    where: {
      OR: [
        { material: { contains: 'Gold' } },
        { purity: { contains: '22K' } },
        { purity: { contains: '18K' } }
      ]
    },
    data: {
      material: 'Premium Alloy',
      purity: 'Premium Grade'
    }
  });

  console.log(`✅ ${products.count} products updated.`);

  // 3. Update descriptions of products that might contain "22K"
  const allProducts = await prisma.product.findMany();
  for (const p of allProducts) {
    if (p.description && (p.description.includes('22K') || p.description.includes('pure gold'))) {
      const newDesc = p.description
        .replace(/22K/g, 'Premium')
        .replace(/pure gold/g, 'premium gold-plated');
      
      await prisma.product.update({
        where: { id: p.id },
        data: { description: newDesc }
      });
    }
  }
  console.log('✅ Product descriptions cleaned.');

  console.log('🚀 Database cleanup complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
