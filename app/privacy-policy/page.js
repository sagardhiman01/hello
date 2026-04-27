'use client';

export default function PrivacyPolicy() {
  return (
    <div className="section" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Legal</div>
          <h2 className="section-title">Privacy Policy</h2>
          <p className="section-subtitle">Your privacy is important to us. This policy outlines how we handle your personal information.</p>
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
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>1. Information We Collect</h3>
            <p>We collect information you provide directly to us when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, and payment information.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>2. How We Use Your Information</h3>
            <p>We use your information to process orders, communicate with you about your purchases, and improve our services. We may also send you marketing communications if you have opted in to receive them.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>3. Information Sharing</h3>
            <p>We do not sell your personal information. We only share information with third-party service providers (like payment processors and shipping companies) necessary to fulfill your orders.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>4. Data Security</h3>
            <p>We implement industry-standard security measures to protect your personal data from unauthorized access or disclosure.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>5. Contact Us</h3>
            <p>If you have any questions about our privacy policy, please contact us at support@theaurika.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
