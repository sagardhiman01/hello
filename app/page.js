'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThreeDJewelry from '@/components/ThreeDJewelry';
import { useCart } from '@/context/CartContext';
import { useSite } from '@/context/SiteContext';
import ImageSlider from '@/components/ImageSlider';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { settings } = useSite();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?featured=true&limit=4');
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Parse categories from settings
  const categories = (() => {
    if (!settings?.categories) return [];
    try { return JSON.parse(settings.categories); } catch { return []; }
  })();

  // Parse testimonials from settings
  const testimonials = (() => {
    if (!settings?.testimonials) return [];
    try { return JSON.parse(settings.testimonials); } catch { return []; }
  })();

  return (
    <>
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot"></span>
              {settings?.hero_badge || 'Find Your Spark'}
            </div>
            <h1 className="hero-title">
              {settings?.hero_title || 'Discover the'} <br/> <span className="accent">{settings?.hero_title_accent || 'Art of Elegance'}</span>
            </h1>
            <p className="hero-subtitle">
              {settings?.hero_subtitle || 'Meticulously handcrafted contemporary and classical jewelry. Every piece tells a story of unparalleled craftsmanship and timeless luxury.'}
            </p>
            <div className="hero-cta-group">
              <Link href="/products" className="btn-primary">Explore Collection</Link>
              <Link href="/about" className="btn-outline">Our Story</Link>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-floating-card card-1">
              <div className="card-label">Bestseller</div>
              <div className="card-value">{settings?.hero_stat_1 || 'Premium'} <small>{settings?.hero_stat_1_label || 'Quality'}</small></div>
            </div>
            
            <div className="hero-image-frame">
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, mixBlendMode: 'screen' }}>
                 <ThreeDJewelry type="ring" />
              </div>
              <img src={settings?.hero_image || '/images/temple_necklace.jpg'} alt={`${settings?.site_name || 'THE AURIKA'} Luxury Jewelry`} />
            </div>
            
            <div className="hero-floating-card card-2">
              <div className="card-label">Since</div>
              <div className="card-value">2025</div>
            </div>
          </div>
        </div>
      </section>

      <ImageSlider />

      <section className="marquee-section">
        <div className="marquee-track">
          {[...Array(10)].map((_, i) => (
            <div className="marquee-item" key={i}>
              <span>{settings?.site_tagline?.toUpperCase() || 'FIND YOUR SPARK'}</span>
              <div className="divider"></div>
              <span>{settings?.site_name || 'THE AURIKA'}</span>
              <div className="divider"></div>
              <span>LUXURY REDEFINED</span>
              <div className="divider"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Curated Selects</div>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          
          <div className="categories-grid">
            {categories.length > 0 ? categories.map((cat, i) => (
              <Link key={i} href={`/products?category=${cat.slug}`} className="category-card">
                <img src={cat.image} alt={cat.name} />
                <div className="category-card-content">
                  <h3>{cat.name}</h3>
                  <p>{cat.subtitle}</p>
                </div>
              </Link>
            )) : (
              <>
                <Link href="/products?category=Necklaces" className="category-card">
                  <img src="/images/sapphire_necklace.jpg" alt="Necklaces" />
                  <div className="category-card-content"><h3>Necklaces</h3><p>Timeless Elegance</p></div>
                </Link>
                <Link href="/products?category=Rings" className="category-card">
                  <img src="/images/royal_blue_choker.jpg" alt="Rings" />
                  <div className="category-card-content"><h3>Rings</h3><p>Eternal Promise</p></div>
                </Link>
                <Link href="/products?category=Earrings" className="category-card">
                  <img src="/images/rose_quartz_necklace.jpg" alt="Earrings" />
                  <div className="category-card-content"><h3>Earrings</h3><p>Delicate Grace</p></div>
                </Link>
                <Link href="/products?category=Sets" className="category-card">
                  <img src="/images/american_diamond_set.jpg" alt="Sets" />
                  <div className="category-card-content"><h3>Bridal Sets</h3><p>Royal Heritage</p></div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="featured-banner">
        <div className="featured-banner-inner">
          <div className="featured-banner-image" style={{ position: 'relative' }}>
             <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
               <ThreeDJewelry type="diamond" />
             </div>
          </div>
          <div className="featured-banner-content">
            <div className="section-label" style={{ color: 'var(--gold-light)' }}>The Masterpiece</div>
            <h2>{settings?.banner_title || 'Uncompromising Quality & Craftsmanship'}</h2>
            <p>{settings?.banner_text || 'At THE AURIKA, we source only the finest ethically curated materials, pearls, and premium metals.'}</p>
            <div className="featured-stats">
              <div className="featured-stat">
                <div className="stat-number">{settings?.hero_stat_1 || 'Premium'}</div>
                <div className="stat-label">{settings?.hero_stat_1_label || 'Quality'}</div>
              </div>
              <div className="featured-stat">
                <div className="stat-number">{settings?.hero_stat_2 || '100%'}</div>
                <div className="stat-label">{settings?.hero_stat_2_label || 'Expert Curation'}</div>
              </div>
              <div className="featured-stat">
                <div className="stat-number">{settings?.hero_stat_3 || 'Life'}</div>
                <div className="stat-label">{settings?.hero_stat_3_label || 'Time Warranty'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Signature Pieces</div>
            <h2 className="section-title">New & Trending</h2>
            <p className="section-subtitle">Discover our most adored designs that capture the essence of modern luxury blended with classical heritage.</p>
          </div>
          
          <div className="products-grid">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="product-card skeleton" style={{ height: '400px' }}></div>
              ))
            ) : (
              products.map((product) => (
                <div key={product.id || product._id} className="product-card">
                  <div className="product-card-image">
                    {product.newArrival && (
                      <div className="product-card-badges">
                        <span className="product-badge new">New</span>
                      </div>
                    )}
                    <Link href={`/products/${product.slug}`}>
                      <img src={product.images[0]} alt={product.name} />
                    </Link>
                    <div className="product-card-actions">
                      <button className="product-action-btn" title="Add to Wishlist">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="product-card-body">
                    <div className="product-card-category">{product.category}</div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="product-card-name" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{product.name}</h3>
                    </Link>
                    <div className="product-card-rating">
                      <div className="stars">{'★'.repeat(Math.floor(product.rating))}</div>
                      <span className="review-count">({product.reviewCount})</span>
                    </div>
                    <div className="product-card-price">
                      <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.comparePrice > product.price && (
                        <span className="price-compare">₹{product.comparePrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  <div className="product-card-footer">
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/products" className="btn-outline">View Entire Collection</Link>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Legacy</div>
            <h2 className="section-title">Client Stories</h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.length > 0 ? testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.stars || 5)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name?.[0] || '?'}</div>
                  <div className="testimonial-info">
                    <div className="name">{t.name}</div>
                    <div className="location">{t.location}</div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"Amazing jewelry at THE AURIKA!"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">A</div>
                  <div className="testimonial-info"><div className="name">Ananya</div><div className="location">New Delhi</div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="newsletter-section section">
        <div className="container">
          <div className="newsletter-inner">
            <h2>{settings?.newsletter_title || 'Join the Inner Circle'}</h2>
            <p>{settings?.newsletter_text || 'Subscribe to our newsletter for exclusive early access to new collections.'}</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
