'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, getToken } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/products');
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [cart, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to place an order');
      router.push('/login?redirect=/checkout');
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on server
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          amount: cartTotal,
          receipt: `order_rcpt_${Date.now()}`
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create order');

      // 2. Open Razorpay Checkout
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'THE AURIKA',
        description: 'Luxury Jewelry Purchase',
        order_id: orderData.order.id,
        handler: async function (response) {
          // 3. Verify payment on server
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              shippingAddress: formData,
              items: cart,
              totalAmount: cartTotal
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            clearCart();
            router.push(`/order-success?id=${verifyData.orderId}`);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#C5A059',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="section checkout-page" style={{ paddingTop: '10rem' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Finalize Your Masterpiece</h2>
        
        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
          <div className="checkout-form-container">
            <h3 style={{ marginBottom: '2rem', fontFamily: 'Outfit, sans-serif' }}>Shipping Details</h3>
            <form onSubmit={handlePayment} className="checkout-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Address</label>
                <textarea name="address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '1.5rem' }}
                disabled={loading || !scriptLoaded}
              >
                {loading ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>

          <div className="order-summary-card" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border-color)', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>Order Summary</h3>
            <div className="summary-items" style={{ marginBottom: '1.5rem' }}>
              {cart.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Shipping</span>
                <span style={{ color: '#10b981' }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: '600', fontSize: '1.2rem', color: 'var(--gold-dark)' }}>
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed var(--gold-dark)', borderRadius: '1rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                🛡️ Secure & Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-light);
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.8rem 1.2rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: 0.8rem;
          color: var(--text-main);
          font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--gold-main);
        }
        @media (max-width: 992px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .order-summary-card {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
