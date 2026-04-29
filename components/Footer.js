'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSite } from '@/context/SiteContext';

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSite();

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/images/logo.png" alt="THE AURIKA" style={{ height: '150px', width: 'auto', marginBottom: '1.5rem' }} />
          <p>{settings?.footer_about || 'Find Your Spark. Elevating everyday luxury with meticulously handcrafted jewelry that celebrates life\'s most precious moments.'}</p>
          <div className="footer-social">
            <a href="https://instagram.com/the_aurika_" target="_blank" rel="noopener noreferrer">Ig</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Fb</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Pt</a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link href="/products?newArrival=true">New Arrivals</Link></li>
            <li><Link href="/products?category=Necklaces">Necklaces & Pendants</Link></li>
            <li><Link href="/products?category=Rings">Rings & Bands</Link></li>
            <li><Link href="/products?category=Earrings">Earrings</Link></li>
            <li><Link href="/products?category=Bracelets">Bracelets & Cuffs</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/shipping">Shipping & Returns</Link></li>
            <li><Link href="/refund-policy">Refund & Cancellation</Link></li>
            <li><Link href="/care">Jewelry Care</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {settings?.site_name || 'THE AURIKA'}. All rights reserved. {settings?.contact_address || ''} | <span className="design-credit">design by mac studio hub</span></p>
        <div className="footer-payment">
          <span>Razorpay</span>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>UPI</span>
        </div>
      </div>
    </footer>
  );
}
