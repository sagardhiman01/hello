'use client';
import './admin.css';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role?.toLowerCase() !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role?.toLowerCase() !== 'admin') {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f', color: '#C4995C' }}>Loading Admin Panel...</div>;
  }

  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/admin' },
    { icon: '⚙️', label: 'Site Settings', href: '/admin/site-settings' },
    { icon: '🖼️', label: 'Slider', href: '/admin/slider' },
    { icon: '💎', label: 'Products', href: '/admin/products' },
    { icon: '📦', label: 'Orders', href: '/admin/orders' },
    { icon: '👥', label: 'Customers', href: '/admin/customers' },
    { icon: '🔴', label: 'Live Activity', href: '/admin/activity' },
  ];

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-sidebar-header">
          <Link href="/" className="admin-brand">
            <img src="/images/logo.png" alt="THE AURIKA" style={{ height: '80px', width: 'auto' }} />
          </Link>
          <span className="admin-badge">ADMIN</span>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="admin-nav-item">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-item">
            <span className="nav-icon">🌐</span>
            <span className="nav-label">View Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="admin-user-info">
            <span>Welcome, <strong>{user.name}</strong></span>
          </div>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
