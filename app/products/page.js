'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = '/api/products';
        if (category) url += `?category=${category}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  return (
    <div className="section products-section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">{category || 'All Collections'}</div>
          <h2 className="section-title">Our Premium Jewelry</h2>
        </div>
        
        <div className="products-grid">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="product-card skeleton" style={{ height: '400px' }}></div>
            ))
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
              <h3>No products found in this category.</h3>
              <p>Please try a different category or hit the Seed API to populate data.</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-card-image">
                  <Link href={`/products/${product.slug}`}>
                    <img src={product.images[0]} alt={product.name} />
                  </Link>
                </div>
                <div className="product-card-body">
                  <div className="product-card-category">{product.category}</div>
                  <h3 className="product-card-name">{product.name}</h3>
                  <div className="product-card-price">
                    <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="product-card-footer">
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
