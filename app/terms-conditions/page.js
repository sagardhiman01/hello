'use client';

export default function TermsConditions() {
  return (
    <div className="section" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Legal</div>
          <h2 className="section-title">Terms & Conditions</h2>
          <p className="section-subtitle">Please read these terms carefully before using our website.</p>
        </div>

        <div className="content-box" style={{ 
          background: 'var(--bg-card)', 
          padding: '4rem', 
          borderRadius: '2rem', 
          border: '1px solid var(--border-color)',
          lineHeight: '1.8',
          color: 'var(--text-light)'
        }}>
          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>1. Acceptance of Terms</h3>
            <p>By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on THE AURIKA's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>3. Product Descriptions</h3>
            <p>We attempt to be as accurate as possible with product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>4. Limitations</h3>
            <p>In no event shall THE AURIKA or its suppliers be liable for any damages arising out of the use or inability to use the materials on the website.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>5. Governing Law</h3>
            <p>Any claim relating to THE AURIKA's website shall be governed by the laws of India without regard to its conflict of law provisions.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
