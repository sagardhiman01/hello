'use client';
import { useState, useEffect } from 'react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          const map = {};
          d.orders.forEach(o => {
            if (!map[o.userId]) {
              map[o.userId] = { ...o.user, id: o.userId, orders: 0, totalSpent: 0 };
            }
            map[o.userId].orders += 1;
            map[o.userId].totalSpent += o.totalAmount || 0;
          });
          setCustomers(Object.values(map));
        }
      });
  }, []);

  return (
    <div>
      <h1 className="admin-page-title">Customers</h1>
      <p className="admin-page-subtitle">View customer activity and spending</p>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th></tr></thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td><strong>{c.name}</strong></td>
                <td>{c.email}</td>
                <td>{c.phone || '—'}</td>
                <td>{c.orders}</td>
                <td>₹{c.totalSpent.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && <p style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No customers yet.</p>}
      </div>
    </div>
  );
}
