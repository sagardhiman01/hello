'use client';
import { useState, useEffect } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(r => r.json())
      .then(d => { if (d.success) setOrders(d.orders); setLoading(false); });
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const statusColors = {
    pending: '#f59e0b', confirmed: '#3b82f6', shipped: '#8b5cf6',
    delivered: '#10b981', cancelled: '#ef4444',
  };

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>
      <p className="admin-page-subtitle">Manage and track customer orders</p>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td><strong>{o.user?.name}</strong><br/><small style={{color:'#888'}}>{o.user?.email}</small></td>
                <td>{o.items?.length || 0} items</td>
                <td>₹{o.totalAmount?.toLocaleString('en-IN')}</td>
                <td>
                  <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                    style={{ background: statusColors[o.status] || '#666', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8, fontWeight: 600, fontSize: '0.8rem' }}>
                    {['pending','confirmed','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                  </select>
                </td>
                <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                <td><span style={{ color: o.isPaid ? '#10b981' : '#ef4444', fontWeight: 600 }}>{o.isPaid ? '✅ Paid' : '❌ Unpaid'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && !loading && <p style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No orders yet.</p>}
      </div>
    </div>
  );
}
