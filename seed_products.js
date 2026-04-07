const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  {
    name: 'Royal Heritage Temple Necklace',
    slug: 'royal-heritage-temple-necklace',
    description: 'An exquisite temple jewelry set featuring intricate deity motifs, expertly crafted in premium grade alloy with antique gold plating. Perfect for weddings and grand occasions.',
    price: 3499,
    comparePrice: 4999,
    category: 'Necklaces',
    material: 'Premium Alloy & Antique Gold Plating',
    purity: 'Artisan',
    weight: '120g',
    images: '["/images/temple_necklace.jpg"]',
    inStock: true,
    featured: true,
    bestSeller: true,
    newArrival: false,
    sku: 'NK-TMP-001',
  },
  {
    name: 'Elegance American Diamond Set',
    slug: 'elegance-american-diamond-set',
    description: 'Sparkling like real diamonds, this premium AD set brings a touch of modern royalty to your look. Shimmering stones set in a high-finish rhodium plating.',
    price: 2899,
    comparePrice: 3999,
    category: 'Sets',
    material: 'Rhodium Plated Brass with American Diamonds',
    purity: 'Premium Grade',
    weight: '85g',
    images: '["/images/american_diamond_set.jpg"]',
    inStock: true,
    featured: true,
    bestSeller: false,
    newArrival: true,
    sku: 'SET-AD-002',
  },
  {
    name: 'Midnight Onyx Beaded Dream',
    slug: 'midnight-onyx-beaded-dream',
    description: 'A sophisticated and deep black onyx bead necklace paired with delicate artisan spacers. Elevates both ethnic and contemporary attire.',
    price: 1499,
    comparePrice: 2299,
    category: 'Necklaces',
    material: 'Black Onyx & Premium Alloy',
    purity: 'High Finish',
    weight: '45g',
    images: '["/images/black_onyx_bead_necklace.jpg"]',
    inStock: true,
    featured: false,
    bestSeller: true,
    newArrival: false,
    sku: 'NK-ONX-003',
  },
  {
    name: 'Azure Gold Droplet Necklace',
    slug: 'azure-gold-droplet-necklace',
    description: 'A beautiful contrast of serene azure blue beads interspersed with rich golden droplets, capturing the essence of timeless charm.',
    price: 1799,
    comparePrice: 2499,
    category: 'Necklaces',
    material: 'Imitation Stones & Gold Plated Brass',
    purity: 'Premium Grade',
    weight: '50g',
    images: '["/images/azure_gold_bead_necklace.jpg"]',
    inStock: true,
    featured: true,
    bestSeller: false,
    newArrival: true,
    sku: 'NK-AZR-004',
  },
  {
    name: 'Rose Quartz Love Choker',
    slug: 'rose-quartz-love-choker',
    description: 'Delicate pink rose quartz stones clustered into a stunning choker. Radiates femininity and grace, perfect for evening gowns and lehengas.',
    price: 2199,
    comparePrice: 3199,
    category: 'Necklaces',
    material: 'Rose Quartz & High Quality Alloy',
    purity: 'Artisan',
    weight: '60g',
    images: '["/images/rose_quartz_necklace.jpg"]',
    inStock: true,
    featured: false,
    bestSeller: true,
    newArrival: false,
    sku: 'NK-RSQ-005',
  },
  {
    name: 'Majestic Royal Blue Choker',
    slug: 'majestic-royal-blue-choker',
    description: 'Make a bold statement with this majestic royal blue studded choker. Designed to catch every eye in the room.',
    price: 2599,
    comparePrice: 3599,
    category: 'Necklaces',
    material: 'Imitation Sapphire & Kundan',
    purity: 'Premium Grade',
    weight: '75g',
    images: '["/images/royal_blue_choker.jpg"]',
    inStock: true,
    featured: true,
    bestSeller: false,
    newArrival: true,
    sku: 'NK-RYB-006',
  },
  {
    name: 'Imperial Sapphire Cascade',
    slug: 'imperial-sapphire-cascade',
    description: 'Cascading layers of brilliant imitation sapphires and clear crystals. The ultimate luxury accessory for a truly grand occasion.',
    price: 3899,
    comparePrice: 5499,
    category: 'Sets',
    material: 'Cubic Zirconia & Synthetic Sapphire',
    purity: 'A+ Grade',
    weight: '95g',
    images: '["/images/sapphire_necklace.jpg"]',
    inStock: true,
    featured: true,
    bestSeller: true,
    newArrival: false,
    sku: 'SET-SPH-007',
  },
  {
    name: 'The Grey Pebble statement',
    slug: 'the-grey-pebble-statement',
    description: 'A uniquely textured statement piece featuring grey pebble-inspired beads. A marvel of modern artisan jewelry design.',
    price: 1899,
    comparePrice: 2899,
    category: 'Necklaces',
    material: 'Artisan Resin & Mixed Metals',
    purity: 'High Finish',
    weight: '55g',
    images: '["/images/grey_pebble_necklace.jpg"]',
    inStock: true,
    featured: false,
    bestSeller: false,
    newArrival: false,
    sku: 'NK-GRY-008',
  }
];

async function main() {
  console.log('Seeding products...');
  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`✅ Seeded product: ${created.name}`);
  }
  console.log('Products seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
