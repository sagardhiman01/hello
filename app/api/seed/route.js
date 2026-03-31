import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const sampleProducts = [
  {
    name: 'Temple Heritage Necklace',
    slug: 'temple-heritage-necklace',
    description: 'Traditional temple jewelry necklace with intricate deity carvings and multi-layered bead work. Beautifully handcrafted for a divine ethnic look.',
    price: 3500,
    comparePrice: 5000,
    category: 'Necklaces',
    material: 'Gold Plated',
    purity: 'None',
    weight: '65g',
    images: JSON.stringify(['/images/temple_necklace.jpg']),
    inStock: true,
    newArrival: true,
    featured: true,
    rating: 4.9,
    reviewCount: 42,
    tags: JSON.stringify(['traditional', 'temple', 'ethnic', 'necklace']),
    sku: 'AUR-NK-003',
  },
  {
    name: 'Blue Sapphire Enchantment Necklace',
    slug: 'blue-sapphire-enchantment-necklace',
    description: 'A stunning silver-plated necklace featuring square-cut blue sapphire crystals surrounded by a halo of shimmering diamonds. Elegant and sophisticated design for special evenings.',
    price: 1350,
    comparePrice: 2500,
    category: 'Necklaces',
    material: 'Silver Plated',
    purity: 'None',
    weight: '35g',
    images: JSON.stringify(['/images/sapphire_necklace.jpg']),
    inStock: true,
    newArrival: true,
    featured: true,
    rating: 4.8,
    reviewCount: 28,
    tags: JSON.stringify(['sapphire', 'blue', 'evening', 'party', 'necklace']),
    sku: 'AUR-NK-004',
  },
  {
    name: 'Rose Quartz Blossom Necklace',
    slug: 'rose-quartz-blossom-necklace',
    description: 'A delicate and charming necklace featuring hand-selected rose quartz beads and crystal accents. Emitting a soft, romantic glow, it is perfect for everyday elegance or a subtle daytime look.',
    price: 450,
    comparePrice: 900,
    category: 'Necklaces',
    material: 'Natural Stone & Gold Plated Chain',
    purity: 'None',
    weight: '25g',
    images: JSON.stringify(['/images/rose_quartz_necklace.jpg']),
    inStock: true,
    newArrival: true,
    featured: false,
    rating: 4.7,
    reviewCount: 15,
    tags: JSON.stringify(['rose quartz', 'pink', 'beads', 'minimal', 'necklace']),
    sku: 'AUR-NK-005',
  },
  {
    name: 'Majestic Royal Blue Choker',
    slug: 'majestic-royal-blue-choker',
    description: 'A grand and majestic choker necklace featuring tiered royal blue tear-drop crystals set in a brilliant silver-plated framework. This statement piece is designed to capture the essence of high luxury and elegance.',
    price: 650,
    comparePrice: 1500,
    category: 'Necklaces',
    material: 'Silver Plated & High-Grade Crystals',
    purity: 'None',
    weight: '75g',
    images: JSON.stringify(['/images/royal_blue_choker.jpg']),
    inStock: true,
    newArrival: true,
    featured: true,
    rating: 4.9,
    reviewCount: 34,
    tags: JSON.stringify(['choker', 'blue', 'majestic', 'royal', 'necklace']),
    sku: 'AUR-NK-006',
  },
  {
    name: 'Modern Earth Pebble Necklace',
    slug: 'modern-earth-pebble-necklace',
    description: 'A contemporary artisan necklace featuring polished grey and earthy-toned pebbles strung with golden accents. A unique, organic piece that brings a minimalist yet sophisticated natural touch to your look.',
    price: 450,
    comparePrice: 850,
    category: 'Necklaces',
    material: 'Natural Stone & Brass',
    purity: 'None',
    weight: '45g',
    images: JSON.stringify(['/images/grey_pebble_necklace.jpg']),
    inStock: true,
    newArrival: true,
    featured: false,
    rating: 4.6,
    reviewCount: 12,
    tags: JSON.stringify(['organic', 'minimalist', 'grey', 'natural', 'necklace']),
    sku: 'AUR-NK-007',
  },
  {
    name: 'Midnight Onyx Bead Necklace',
    slug: 'midnight-onyx-bead-necklace',
    description: 'A striking multi-layered necklace featuring polished black onyx-style beads paired with a shimmering gold-bordered green saree aesthetic. Bold yet timeless, this piece is an essential statement for traditional and formal occasions.',
    price: 1250,
    comparePrice: 2200,
    category: 'Necklaces',
    material: 'High-Gloss Acrylic & Gold-Tone Alloy',
    purity: 'None',
    weight: '90g',
    images: JSON.stringify(['/images/black_onyx_bead_necklace.jpg']),
    inStock: true,
    newArrival: false,
    featured: true,
    rating: 4.8,
    reviewCount: 42,
    tags: JSON.stringify(['onyx', 'black', 'traditional', 'statement', 'necklace']),
    sku: 'AUR-NK-008',
  },
  {
    name: 'Azure Gold Cluster Necklace',
    slug: 'azure-gold-cluster-necklace',
    description: 'A beautiful and artistic necklace featuring clusters of azure blue beads entwined with delicate gold-finished chains. This vibrant piece adds a splash of color and a touch of bohemian luxury to any outfit.',
    price: 650,
    comparePrice: 1300,
    category: 'Necklaces',
    material: 'Glass Beads & Gold-Plated Alloy',
    purity: 'None',
    weight: '55g',
    images: JSON.stringify(['/images/azure_gold_bead_necklace.jpg']),
    inStock: true,
    newArrival: true,
    featured: false,
    rating: 4.7,
    reviewCount: 22,
    tags: JSON.stringify(['azure', 'blue', 'gold', 'boho', 'necklace']),
    sku: 'AUR-NK-009',
  },
  {
    name: 'American Diamond Luxury Set',
    slug: 'american-diamond-luxury-set',
    description: 'A dazzling artificial jewelry set featuring an elegant necklace and matching earrings. Crafted with high-quality American Diamonds (CZ) set in a silver-toned finish with soft pink accents for a truly regal look.',
    price: 1300,
    comparePrice: 2500,
    category: 'Sets',
    material: 'Silver-Toned Alloy & Cubic Zirconia',
    purity: 'None',
    weight: '60g',
    images: JSON.stringify(['/images/american_diamond_set.jpg']),
    inStock: true,
    newArrival: true,
    featured: true,
    rating: 4.9,
    reviewCount: 18,
    tags: JSON.stringify(['american diamond', 'set', 'pink', 'silver', 'artificial']),
    sku: 'AUR-ST-002',
  },







 

];

export async function POST(request) {
  try {
    // Clear existing products
    await prisma.product.deleteMany({});
    
    // Insert sample products
    const products = await prisma.product.createMany({
      data: sampleProducts,
    });
    
    // Create admin user if doesn't exist
    const adminExists = await prisma.user.findUnique({ where: { email: 'admin@theaurika.com' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin@123', 12);
      await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@theaurika.com',
          password: hashedPassword,
          role: 'admin',
          phone: '+919837944411',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${sampleProducts.length} products and admin user (SQLite)`,
    });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
