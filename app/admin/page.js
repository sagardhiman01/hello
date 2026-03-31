'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, customers: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [prodRes, ordRes] = await Promise.all([
          fetch('/api/products?limit=999'),
          fetch('/api/admin/orders'),
        ]);
        const prodData = await prodRes.json();
        const ordData = await ordRes.json();

        setStats({
          products: prodData.pagination?.total || 0,
          orders: ordData.orders?.length || 0,
          revenue: ordData.orders?.reduce((s, o) => s + (o.totalAmount || 0), 0) || 0,
          customers: new Set(ordData.orders?.map(o => o.userId)).size || 0,
        });
      } catch (e) { console.error(e); }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">Overview of your jewelry empire</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-info">
            <div className="stat-number">{stats.products}</div>
            <div className="stat-label">Total Products</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-number">{stats.orders}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-number">₹{stats.revenue.toLocaleString('en-IN')}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-number">{stats.customers}</div>
            <div className="stat-label">Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
