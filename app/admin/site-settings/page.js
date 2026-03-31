'use client';
import { useState, useEffect } from 'react';
import { useSite } from '@/context/SiteContext';

export default function SiteSettingsPage() {
  const { refreshSettings } = useSite();
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => { if (d.success) setSettings(d.settings); });
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });
      setSaved(true);
      refreshSettings();
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert('Failed to save!');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <div>Loading settings...</div>;

  const tabs = [
    { id: 'general', label: '🏷️ General', icon: '🏷️' },
    { id: 'hero', label: '🎯 Hero Section', icon: '🎯' },
    { id: 'banner', label: '🏆 Featured Banner', icon: '🏆' },
    { id: 'categories', label: '📂 Categories', icon: '📂' },
    { id: 'testimonials', label: '⭐ Testimonials', icon: '⭐' },
    { id: 'contact', label: '📞 Contact & Footer', icon: '📞' },
  ];

  const categories = (() => {
    try { return JSON.parse(settings.categories); } catch { return []; }
  })();

  const testimonials = (() => {
    try { return JSON.parse(settings.testimonials); } catch { return []; }
  })();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Site Settings</h1>
          <p className="admin-page-subtitle">Customize every section of your website</p>
        </div>
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : saved ? '✅ Saved!' : '💾 Save All Changes'}
        </button>
      </div>

      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="settings-panel">
        {/* GENERAL */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <h3 className="settings-section-title">🏷️ Brand Identity</h3>
            <div className="form-grid">
              <div className="admin-field">
                <label>Website Name</label>
                <input value={settings.site_name} onChange={e => handleChange('site_name', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Tagline</label>
                <input value={settings.site_tagline} onChange={e => handleChange('site_tagline', e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label>Site Description (SEO)</label>
              <textarea rows={3} value={settings.site_description} onChange={e => handleChange('site_description', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Newsletter Title</label>
              <input value={settings.newsletter_title} onChange={e => handleChange('newsletter_title', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Newsletter Text</label>
              <textarea rows={2} value={settings.newsletter_text} onChange={e => handleChange('newsletter_text', e.target.value)} />
            </div>
          </div>
        )}

        {/* HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="settings-section">
            <h3 className="settings-section-title">🎯 Hero Section</h3>
            <div className="form-grid">
              <div className="admin-field">
                <label>Hero Title (Line 1)</label>
                <input value={settings.hero_title} onChange={e => handleChange('hero_title', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Hero Title Accent (Line 2)</label>
                <input value={settings.hero_title_accent} onChange={e => handleChange('hero_title_accent', e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label>Hero Badge Text</label>
              <input value={settings.hero_badge} onChange={e => handleChange('hero_badge', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Hero Subtitle</label>
              <textarea rows={3} value={settings.hero_subtitle} onChange={e => handleChange('hero_subtitle', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Hero Image Path</label>
              <input value={settings.hero_image} onChange={e => handleChange('hero_image', e.target.value)} />
            </div>
            <h3 className="settings-section-title" style={{ marginTop: '2rem' }}>📊 Hero Stats</h3>
            <div className="form-grid form-grid-3">
              <div className="admin-field">
                <label>Stat 1 Value</label>
                <input value={settings.hero_stat_1} onChange={e => handleChange('hero_stat_1', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Stat 1 Label</label>
                <input value={settings.hero_stat_1_label} onChange={e => handleChange('hero_stat_1_label', e.target.value)} />
              </div>
            </div>
            <div className="form-grid form-grid-3">
              <div className="admin-field">
                <label>Stat 2 Value</label>
                <input value={settings.hero_stat_2} onChange={e => handleChange('hero_stat_2', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Stat 2 Label</label>
                <input value={settings.hero_stat_2_label} onChange={e => handleChange('hero_stat_2_label', e.target.value)} />
              </div>
            </div>
            <div className="form-grid form-grid-3">
              <div className="admin-field">
                <label>Stat 3 Value</label>
                <input value={settings.hero_stat_3} onChange={e => handleChange('hero_stat_3', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Stat 3 Label</label>
                <input value={settings.hero_stat_3_label} onChange={e => handleChange('hero_stat_3_label', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* FEATURED BANNER */}
        {activeTab === 'banner' && (
          <div className="settings-section">
            <h3 className="settings-section-title">🏆 Featured Banner</h3>
            <div className="admin-field">
              <label>Banner Title</label>
              <input value={settings.banner_title} onChange={e => handleChange('banner_title', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Banner Description</label>
              <textarea rows={4} value={settings.banner_text} onChange={e => handleChange('banner_text', e.target.value)} />
            </div>
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="settings-section">
            <h3 className="settings-section-title">📂 Categories</h3>
            {categories.map((cat, i) => (
              <div key={i} className="nested-card">
                <h4>Category {i + 1}</h4>
                <div className="form-grid">
                  <div className="admin-field">
                    <label>Name</label>
                    <input value={cat.name} onChange={e => {
                      const updated = [...categories];
                      updated[i] = { ...updated[i], name: e.target.value };
                      handleChange('categories', JSON.stringify(updated));
                    }} />
                  </div>
                  <div className="admin-field">
                    <label>Category Slug</label>
                    <input value={cat.slug} onChange={e => {
                      const updated = [...categories];
                      updated[i] = { ...updated[i], slug: e.target.value };
                      handleChange('categories', JSON.stringify(updated));
                    }} />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="admin-field">
                    <label>Image Path</label>
                    <input value={cat.image} onChange={e => {
                      const updated = [...categories];
                      updated[i] = { ...updated[i], image: e.target.value };
                      handleChange('categories', JSON.stringify(updated));
                    }} />
                  </div>
                  <div className="admin-field">
                    <label>Subtitle</label>
                    <input value={cat.subtitle} onChange={e => {
                      const updated = [...categories];
                      updated[i] = { ...updated[i], subtitle: e.target.value };
                      handleChange('categories', JSON.stringify(updated));
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="settings-section">
            <h3 className="settings-section-title">⭐ Testimonials</h3>
            {testimonials.map((t, i) => (
              <div key={i} className="nested-card">
                <h4>Review {i + 1}</h4>
                <div className="form-grid">
                  <div className="admin-field">
                    <label>Customer Name</label>
                    <input value={t.name} onChange={e => {
                      const updated = [...testimonials];
                      updated[i] = { ...updated[i], name: e.target.value };
                      handleChange('testimonials', JSON.stringify(updated));
                    }} />
                  </div>
                  <div className="admin-field">
                    <label>Location</label>
                    <input value={t.location} onChange={e => {
                      const updated = [...testimonials];
                      updated[i] = { ...updated[i], location: e.target.value };
                      handleChange('testimonials', JSON.stringify(updated));
                    }} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Review Text</label>
                  <textarea rows={2} value={t.text} onChange={e => {
                    const updated = [...testimonials];
                    updated[i] = { ...updated[i], text: e.target.value };
                    handleChange('testimonials', JSON.stringify(updated));
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTACT & FOOTER */}
        {activeTab === 'contact' && (
          <div className="settings-section">
            <h3 className="settings-section-title">📞 Contact Information</h3>
            <div className="admin-field">
              <label>Store Address</label>
              <textarea rows={2} value={settings.contact_address} onChange={e => handleChange('contact_address', e.target.value)} />
            </div>
            <div className="form-grid">
              <div className="admin-field">
                <label>Phone Number</label>
                <input value={settings.contact_phone} onChange={e => handleChange('contact_phone', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Email</label>
                <input value={settings.contact_email} onChange={e => handleChange('contact_email', e.target.value)} />
              </div>
            </div>
            <h3 className="settings-section-title" style={{ marginTop: '2rem' }}>🔻 Footer</h3>
            <div className="admin-field">
              <label>Footer About Text</label>
              <textarea rows={3} value={settings.footer_about} onChange={e => handleChange('footer_about', e.target.value)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
