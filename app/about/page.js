'use client';

export default function AboutPage() {
  return (
    <div className="section about-page" style={{ paddingTop: '10rem' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Our Story</div>
          <h2 className="section-title">Crafting Timeless Elegance</h2>
          <p className="section-subtitle">At THE AURIKA, we believe jewelry is more than just an ornament; it's a reflection of your soul and a celebration of your most precious moments.</p>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', marginBottom: '8rem' }}>
          <div className="about-image-container">
            <img src="/images/temple_necklace.jpg" alt="Artisan Craftsmanship" style={{ width: '100%', borderRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} />
          </div>
          <div className="about-content">
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>The Artisan's Vision</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '2rem' }}>
              Founded in 2025, THE AURIKA was born from a passion for preserving traditional Indian craftsmanship while embracing contemporary design. Our journey began in Dehradun, where we sought to create pieces that bridge the gap between heritage and modern luxury.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light)' }}>
              Every gemstone is handpicked, every metal is certified for purity, and every design is a labor of love. We don't just make jewelry; we create heirlooms that can be passed down through generations.
            </p>
          </div>
        </div>

        <div className="values-section" style={{ background: 'var(--bg-card)', padding: '5rem 2rem', borderRadius: '3rem', border: '1px solid var(--border-color)' }}>
          <h3 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', fontFamily: 'Outfit, sans-serif' }}>Our Core Pillars</h3>
          <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Uncompromised Quality</h4>
              <p style={{ color: 'var(--text-light)' }}>We use only 22K/18K certified gold and ethically sourced gemstones in all our creations.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Master Craftsmanship</h4>
              <p style={{ color: 'var(--text-light)' }}>Our artisans spend hundreds of hours on each piece to ensure perfection in every detail.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Ethical Spirit</h4>
              <p style={{ color: 'var(--text-light)' }}>Commitment to fair labor practices and sustainable sourcing is at the heart of everything we do.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
