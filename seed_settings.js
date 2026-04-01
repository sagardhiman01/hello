const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaults = {
  site_name: 'THE AURIKA',
  site_tagline: 'Find Your Spark',
  site_description: 'Discover exquisite handcrafted jewelry at THE AURIKA.',
  hero_title: 'Discover the',
  hero_title_accent: 'Art of Elegance',
  hero_subtitle: 'Meticulously handcrafted contemporary and classical jewelry. Every piece tells a story of unparalleled craftsmanship and timeless luxury.',
  hero_badge: 'Find Your Spark',
  hero_image: '/images/temple_necklace.jpg',
  hero_stat_1: 'Premium',
  hero_stat_1_label: 'Quality',
  hero_stat_2: '100%',
  hero_stat_2_label: 'Custom Designs',
  hero_stat_3: 'Life',
  hero_stat_3_label: 'Time Warranty',
  banner_title: 'Uncompromising Quality & Craftsmanship',
  banner_text: 'At THE AURIKA, we source only the finest ethically curated materials, pearls, and premium metals. Every creation is born from a meticulous design process, ensuring each detail reflects our commitment to perfection.',
  testimonials: JSON.stringify([
    { stars: 5, text: 'Finding my spark was easy with THE AURIKA. The American Diamond set I purchased is an absolute masterpiece.', name: 'Ananya Sharma', location: 'New Delhi' },
    { stars: 5, text: 'I ordered the Temple Heritage Necklace for my wedding. The piece looks exactly as pictured, if not better.', name: 'Rhea Kapoor', location: 'Mumbai' },
    { stars: 5, text: 'The Sapphire Enchantment Necklace I bought is my new everyday luxury. THE AURIKA truly knows premium.', name: 'Priya Patel', location: 'Dehradun' }
  ]),
  slider_images: JSON.stringify([
    { url: '/images/temple_necklace.jpg', title: 'The Royal Heritage', category: 'Handcrafted Necklaces', description: 'A masterpiece that captures the essence of divine craftsmanship.' },
    { url: '/images/sapphire_necklace.jpg', title: 'Azure Dreams', category: 'Premium Collection', description: 'Ethically curated stones meet premium gold-plated elegance.' },
    { url: '/images/rose_quartz_necklace.jpg', title: 'Ethereal Rose', category: 'Artisan Selection', description: 'Delicate textures meet timeless beauty in every detail.' },
    { url: '/images/american_diamond_set.jpg', title: 'Divine Radiance', category: 'Bridal Sets', description: 'Shine brighter on your special day with our signature collection.' }
  ]),
  categories: JSON.stringify([
    { name: 'Necklaces', slug: 'Necklaces', image: '/images/sapphire_necklace.jpg', subtitle: 'Timeless Elegance' },
    { name: 'Rings', slug: 'Rings', image: '/images/royal_blue_choker.jpg', subtitle: 'Eternal Promise' },
    { name: 'Earrings', slug: 'Earrings', image: '/images/rose_quartz_necklace.jpg', subtitle: 'Delicate Grace' },
    { name: 'Bridal Sets', slug: 'Sets', image: '/images/american_diamond_set.jpg', subtitle: 'Royal Heritage' }
  ]),
  footer_about: 'Find Your Spark. Elevating everyday luxury with meticulously handcrafted jewelry that celebrates life\'s most precious moments.',
  contact_address: '74/B Rajpur Road, Dehradun, Uttarakhand, India 248001',
  contact_phone: '+91 98765 43210',
  contact_email: 'concierge@theaurika.com',
  newsletter_title: 'Join the Inner Circle',
  newsletter_text: 'Subscribe to our newsletter for exclusive early access to new collections, special private events, and styling inspiration.',
};

async function main() {
  console.log('Seeding site settings...');
  for (const [key, value] of Object.entries(defaults)) {
    await prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log('✅ Site settings seeded successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
