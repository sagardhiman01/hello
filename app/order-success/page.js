'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="section" style={{ paddingTop: '12rem', textAlign: 'center', minHeight: '80vh' }}>
      <div className="container">
        <div className="success-icon" style={{ fontSize: '5rem', marginBottom: '2rem' }}>✨</div>
        <h2 className="section-title">Order Placed Successfully!</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Thank you for choosing THE AURIKA. Your masterpiece is now being prepared for its journey to you.
        </p>
        
        <div className="order-details-box" style={{ 
          background: 'var(--bg-card)', 
          padding: '2rem', 
          borderRadius: '1.5rem', 
          border: '1px solid var(--border-color)',
          maxWidth: '400px',
          margin: '0 auto 3rem'
        }}>
          <h4 style={{ color: 'var(--gold-dark)', marginBottom: '0.8rem' }}>Order Confirmation</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Order ID: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>#{orderId}</span></p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>A confirmation email has been sent to you.</p>
        </div>

        <div className="success-actions">
          <Link href="/products" className="btn-primary" style={{ marginRight: '1rem' }}>
            Continue Shopping
          </Link>
          <Link href="/account/orders" className="btn-outline">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '12rem', textAlign: 'center' }}>Processing your order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
