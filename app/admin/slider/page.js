'use client';
import { useState, useEffect } from 'react';
import { useSite } from '@/context/SiteContext';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminSliderPage() {
  const { refreshSettings } = useSite();
  const [slides, setSlides] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          try { setSlides(JSON.parse(d.settings.slider_images)); }
          catch { setSlides([]); }
        }
      });
  }, []);

  const updateSlide = (i, field, value) => {
    const updated = [...slides];
    updated[i] = { ...updated[i], [field]: value };
    setSlides(updated);
  };

  const addSlide = () => {
    setSlides([...slides, { url: '/images/', title: 'New Slide', category: 'Collection', description: 'Description here' }]);
  };

  const removeSlide = (i) => {
    setSlides(slides.filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: { slider_images: JSON.stringify(slides) } }),
    });
    refreshSettings();
    setSaving(false);
    alert('Slider saved!');
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Image Slider</h1>
          <p className="admin-page-subtitle">Manage homepage slider images and content</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="admin-btn-outline" onClick={addSlide}>+ Add Slide</button>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : '💾 Save Slider'}</button>
        </div>
      </div>

      {slides.map((slide, i) => (
        <div key={i} className="admin-form-card" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-page-header" style={{ marginBottom: '1rem' }}>
            <h3>Slide {i + 1}</h3>
            <button className="admin-btn-sm delete" onClick={() => removeSlide(i)}>Remove</button>
          </div>
          <div className="form-grid">
            <div className="admin-field"><label>Title</label><input value={slide.title} onChange={e => updateSlide(i, 'title', e.target.value)} /></div>
            <div className="admin-field"><label>Category Label</label><input value={slide.category} onChange={e => updateSlide(i, 'category', e.target.value)} /></div>
          </div>
          <div className="admin-field"><label>Description</label><input value={slide.description} onChange={e => updateSlide(i, 'description', e.target.value)} /></div>
          <div className="admin-field">
            <label>Image Path</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <input style={{ flexgrow: 1 }} value={slide.url} onChange={e => updateSlide(i, 'url', e.target.value)} />
              <ImageUpload onUploadSuccess={(url) => updateSlide(i, 'url', url)} label="Upload New" />
            </div>
            {slide.url && <img src={slide.url} alt="" style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 12, marginTop: 8 }} />}
          </div>
        </div>
      ))}
    </div>
  );
}
