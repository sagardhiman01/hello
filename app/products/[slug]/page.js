'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}>Loading Masterpiece...</div>;
  if (!product) return <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}>Masterpiece not found.</div>;

  return (
    <div className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div className="about-grid">
          <div className="about-image-container">
            <div className="about-image">
              <img src={product.images[0]} alt={product.name} />
            </div>
          </div>
          <div className="about-content">
            <div className="section-label">{product.category}</div>
            <h2 className="section-title">{product.name}</h2>
            <div className="price-current" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--gold-dark)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <p>{product.description}</p>
            <div className="about-features" style={{ marginBottom: '2rem' }}>
              <div className="about-feature">
                <div className="about-feature-icon">✨</div>
                <div>
                  <h4>Purity: {product.purity}</h4>
                  <p>Certified {product.material}</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">⚖️</div>
                <div>
                  <h4>Weight: {product.weight}</h4>
                  <p>Fine craftsmanship</p>
                </div>
              </div>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '1.5rem' }}
              onClick={() => addToCart(product)}
            >
              Add to Wishlist & Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
