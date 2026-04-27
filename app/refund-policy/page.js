'use client';

export default function RefundPolicy() {
  return (
    <div className="section" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Legal</div>
          <h2 className="section-title">Refund & Cancellation</h2>
          <p className="section-subtitle">Our policy on returns, refunds, and order cancellations.</p>
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
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>1. Returns</h3>
            <p>We accept returns within 7 days of delivery. To be eligible for a return, your item must be unused and in the same condition that you received it, with all original packaging and certificates.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>2. Refunds</h3>
            <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed and a credit will automatically be applied to your original method of payment.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>3. Exchanges</h3>
            <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact us.</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>4. Cancellations</h3>
            <p>Orders can only be cancelled before they are shipped. Once an order is shipped, the return policy will apply.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>5. Non-returnable items</h3>
            <p>Personalized or custom-made jewelry pieces are not eligible for returns or refunds unless they arrive damaged.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
