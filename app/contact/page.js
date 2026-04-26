'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <div className="section contact-page" style={{ paddingTop: '10rem' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Connect With Us</div>
          <h2 className="section-title">We'd Love to Hear From You</h2>
          <p className="section-subtitle">Whether you're looking for a bespoke creation or have a question about our collections, our concierge team is here to assist you.</p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'stretch' }}>
          <div className="contact-info" style={{ background: 'var(--bg-card)', padding: '4rem', borderRadius: '2rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '3rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--gold-dark)' }}>📍 Flagship Store</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>74/B Rajpur Road, <br />Dehradun, Uttarakhand <br />India, 248001</p>
            </div>
            <div style={{ marginBottom: '3rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--gold-dark)' }}>📞 Concierge Line</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>+91 98765 43210 <br />Available 10 AM - 7 PM IST</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--gold-dark)' }}>✉️ Digital Correspondence</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>concierge@theaurika.com <br />press@theaurika.com</p>
            </div>
          </div>

          <div className="contact-form-container" style={{ padding: '2rem 0' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', background: 'rgba(197, 160, 89, 0.1)', padding: '5rem', borderRadius: '2rem', border: '1px solid var(--gold-dark)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✨</div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Thank You</h3>
                <p style={{ color: 'var(--text-light)' }}>Your message has been received. Our concierge team will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>Your Name</label>
                    <input name="name" type="text" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.8rem', color: 'var(--text-main)' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>Your Email</label>
                    <input name="email" type="email" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.8rem', color: 'var(--text-main)' }} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>Subject of Inquiry</label>
                  <select name="subject" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.8rem', color: 'var(--text-main)' }}>
                    <option value="">Select an option</option>
                    <option value="bespoke">Bespoke Jewelry Customization</option>
                    <option value="order">Order Inquiry</option>
                    <option value="appointment">Schedule a Store Appointment</option>
                    <option value="other">Other Inquiries</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>Your Message</label>
                  <textarea name="message" rows="5" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.8rem', color: 'var(--text-main)' }}></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '1.5rem', marginTop: '1rem' }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
