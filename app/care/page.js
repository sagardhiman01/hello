'use client';

export default function JewelryCare() {
  return (
    <div className="section" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Guide</div>
          <h2 className="section-title">Jewelry Care</h2>
          <p className="section-subtitle">Keep your precious pieces shining for a lifetime.</p>
        </div>

        <div className="care-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          marginBottom: '5rem'
        }}>
          <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '2rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🧼</div>
            <h3 style={{ marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Cleaning</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
              Use a soft, lint-free cloth to gently wipe your jewelry after each wear. For deeper cleaning, use lukewarm water and mild soap, then dry thoroughly.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '2rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📦</div>
            <h3 style={{ marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Storage</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
              Store each piece separately in its original pouch or box to prevent scratching and tangling. Keep in a cool, dry place away from direct sunlight.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '2rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🚫</div>
            <h3 style={{ marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Avoid Chemicals</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
              Remove jewelry before swimming, showering, or applying perfumes, lotions, and hairspray. Chemicals can tarnish metals and damage stones.
            </p>
          </div>
        </div>

        <div className="content-box" style={{ 
          background: 'var(--bg-card)', 
          padding: '4rem', 
          borderRadius: '2rem', 
          border: '1px solid var(--border-color)',
          lineHeight: '1.8',
          color: 'var(--text-light)'
        }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Special Care for Gemstones</h3>
          <p style={{ marginBottom: '1.5rem' }}>Some gemstones are more delicate than others and require extra care:</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            <li style={{ marginBottom: '1rem' }}><strong>Pearls:</strong> These are organic gems and very soft. Wipe them with a damp cloth only.</li>
            <li style={{ marginBottom: '1rem' }}><strong>Emeralds:</strong> Often treated with oils; avoid ultrasonic cleaners and extreme heat.</li>
            <li><strong>Diamonds:</strong> While hard, they can still chip if hit at the right angle. Handle with care.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
