'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', comparePrice: '', category: 'Necklaces',
    material: 'Premium Alloy', purity: 'Premium Grade', weight: '', images: '', inStock: true,
    featured: false, bestSeller: false, newArrival: false, sku: '',
  });

  const fetchProducts = async () => {
    const res = await fetch('/api/products?limit=100');
    const data = await res.json();
    if (data.success) setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', comparePrice: '', category: 'Necklaces', material: 'Premium Alloy', purity: 'Premium Grade', weight: '', images: '', inStock: true, featured: false, bestSeller: false, newArrival: false, sku: '' });
    setEditProduct(null);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      images: Array.isArray(product.images) ? product.images.join(', ') : product.images,
      price: product.price?.toString() || '',
      comparePrice: product.comparePrice?.toString() || '',
    });
    setEditProduct(product);
    setShowForm(true);
  };

  const handleUploadSuccess = (url) => {
    const existing = formData.images ? formData.images.split(',').map(s => s.trim()) : [];
    const updated = [...existing, url].join(', ');
    setFormData({ ...formData, images: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      price: parseFloat(formData.price),
      comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
    };

    const url = editProduct ? `/api/admin/products/${editProduct.id}` : '/api/products';
    const method = editProduct ? 'PUT' : 'POST';

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.success) {
      fetchProducts();
      setShowForm(false);
      resetForm();
    } else {
      alert(data.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle">Manage your jewelry catalog</p>
        </div>
        <button className="admin-btn-primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? '✕ Close Form' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-card">
          <h3>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="admin-field"><label>Name</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div className="admin-field"><label>SKU</label><input value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} placeholder="Auto-generated if empty" /></div>
            </div>
            <div className="admin-field"><label>Description</label><textarea rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
            <div className="form-grid form-grid-3">
              <div className="admin-field"><label>Price (₹)</label><input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
              <div className="admin-field"><label>Compare Price</label><input type="number" value={formData.comparePrice} onChange={e => setFormData({...formData, comparePrice: e.target.value})} /></div>
              <div className="admin-field"><label>Weight</label><input value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} /></div>
            </div>
            <div className="form-grid form-grid-3">
              <div className="admin-field"><label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {['Necklaces','Rings','Earrings','Bracelets','Pendants','Sets','Bangles','Anklets'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-field"><label>Material</label><input value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} /></div>
              <div className="admin-field"><label>Purity</label>
                <select value={formData.purity} onChange={e => setFormData({...formData, purity: e.target.value})}>
                  {['Premium Grade','High Finish','Artisan','A+ Grade'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            
            <div className="form-grid">
              <div className="admin-field">
                <label>Images (Paths)</label>
                <input value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} placeholder="/images/product1.jpg, /images/product2.jpg" />
              </div>
              <ImageUpload onUploadSuccess={handleUploadSuccess} label="📁 Quick Image Upload" />
            </div>

            {formData.images && (
              <div style={{ display: 'flex', gap: '5px', margin: '10px 0', overflowX: 'auto', padding: '10px' }}>
                {formData.images.split(',').map((img, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img src={img.trim()} alt="" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                ))}
              </div>
            )}
            <div className="checkbox-group">
              <label className="checkbox-label"><input type="checkbox" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} /> In Stock</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} /> Featured</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.bestSeller} onChange={e => setFormData({...formData, bestSeller: e.target.checked})} /> Best Seller</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.newArrival} onChange={e => setFormData({...formData, newArrival: e.target.checked})} /> New Arrival</label>
            </div>
            <button type="submit" className="admin-btn-primary">{editProduct ? 'Update Product' : 'Create Product'}</button>
          </form>
        </div>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><img src={p.images?.[0]} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }} /></td>
                <td><strong>{p.name}</strong><br/><small style={{color:'#888'}}>{p.sku}</small></td>
                <td>{p.category}</td>
                <td>₹{p.price?.toLocaleString('en-IN')}</td>
                <td><span className={`status-badge ${p.inStock ? 'active' : 'inactive'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                <td>{p.featured ? '⭐' : '—'}</td>
                <td>
                  <div className="action-btns">
                    <button className="admin-btn-sm edit" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="admin-btn-sm delete" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
