'use client';

export default function ShippingPolicy() {
  return (
    <div className="section" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Service</div>
          <h2 className="section-title">Shipping & Returns</h2>
          <p className="section-subtitle">Information about our delivery process and return handling.</p>
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
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>1. Shipping Timelines</h3>
            <p>All orders are processed within 2-3 business days. Domestic shipping typically takes 5-7 business days, while international shipping can take 10-15 business days depending on the destination.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>2. Shipping Rates</h3>
            <p>We offer free standard shipping on all domestic orders above ₹1999. For orders below this amount, a flat shipping fee of ₹99 applies. International shipping rates are calculated at checkout.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>3. Order Tracking</h3>
            <p>Once your order has shipped, you will receive an email with a tracking number and a link to track your package.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>4. Return Process</h3>
            <p>To initiate a return, please contact our support team at support@theaurika.com with your order number and reason for return. We will provide you with a return shipping label and instructions.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>5. Damaged Items</h3>
            <p>If you receive a damaged item, please contact us immediately with photos of the damage. We will arrange for a replacement or full refund.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
