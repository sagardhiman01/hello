import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Default site settings
const defaults = {
  site_name: 'THE AURIKA',
  site_tagline: 'Find Your Spark',
  site_description: 'Discover exquisite handcrafted jewelry at THE AURIKA.',
  hero_title: 'Discover the',
  hero_title_accent: 'Art of Elegance',
  hero_subtitle: 'Meticulously handcrafted contemporary and classical jewelry. Every piece tells a story of unparalleled craftsmanship and timeless luxury.',
  hero_badge: 'Find Your Spark',
  hero_image: '/images/temple_necklace.jpg',
  hero_stat_1: '22K',
  hero_stat_1_label: 'Purity Gold',
  hero_stat_2: '100%',
  hero_stat_2_label: 'Ethical Gems',
  hero_stat_3: 'Life',
  hero_stat_3_label: 'Time Warranty',
  banner_title: 'Uncompromising Quality & Craftsmanship',
  banner_text: 'At THE AURIKA, we source only the finest ethically mined diamonds, pearls, and precious metals. Every creation is born from a meticulous design process, ensuring each detail reflects our commitment to perfection.',
  testimonials: JSON.stringify([
    { stars: 5, text: 'Finding my spark was easy with THE AURIKA. The American Diamond set I purchased is an absolute masterpiece.', name: 'Ananya Sharma', location: 'New Delhi' },
    { stars: 5, text: 'I ordered the Temple Heritage Necklace for my wedding. The piece looks exactly as pictured, if not better.', name: 'Rhea Kapoor', location: 'Mumbai' },
    { stars: 5, text: 'The Sapphire Enchantment Necklace I bought is my new everyday luxury. THE AURIKA truly knows premium.', name: 'Priya Patel', location: 'Dehradun' }
  ]),
  slider_images: JSON.stringify([
    { url: '/images/temple_necklace.jpg', title: 'The Royal Heritage', category: 'Handcrafted Necklaces', description: 'A masterpiece that captures the essence of divine craftsmanship.' },
    { url: '/images/sapphire_necklace.jpg', title: 'Azure Dreams', category: 'Premium Collection', description: 'Ethically sourced sapphires meet 22K pure gold elegance.' },
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

export async function GET() {
  try {
    const settingsRaw = await prisma.siteSettings.findMany();
    
    // Build result with defaults
    const result = { ...defaults };
    
    for (const s of settingsRaw) {
      try {
        // Try to parse as JSON if it looks like JSON, otherwise keep as string
        if (s.value && (s.value.startsWith('{') || s.value.startsWith('['))) {
          result[s.key] = JSON.parse(s.value);
        } else {
          result[s.key] = s.value;
        }
      } catch (e) {
        result[s.key] = s.value;
      }
    }
    
    return NextResponse.json({ success: true, settings: result });
  } catch (error) {
    console.error('Settings GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { settings } = await request.json();
    
    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Invalid settings data' }, { status: 400 });
    }

    // Upsert each setting
    for (const [key, value] of Object.entries(settings)) {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      await prisma.siteSettings.upsert({
        where: { key },
        update: { value: stringValue },
        create: { key, value: stringValue },
      });
    }
    
    return NextResponse.json({ success: true, message: 'Settings updated' });
  } catch (error) {
    console.error('Settings PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
