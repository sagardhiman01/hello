'use client';
import { useState, useEffect } from 'react';

export default function AdminActivityPage() {
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = () => {
      fetch('/api/admin/clicks')
        .then(r => r.json())
        .then(d => {
          if (d.success) setClicks(d.clicks);
          setLoading(false);
        });
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-activity-page">
      <h1 className="admin-page-title">Live Client Activity</h1>
      <p className="admin-page-subtitle">Real-time interactions from the last 24 hours</p>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>User</th>
              <th>Action (Clicked)</th>
              <th>Page Path</th>
            </tr>
          </thead>
          <tbody>
            {clicks.map(click => (
              <tr key={click.id}>
                <td>{new Date(click.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                <td>
                  <span className={`user-badge ${click.userName === 'Guest' ? 'guest' : 'member'}`}>
                    {click.userName}
                  </span>
                </td>
                <td><code className="click-el">{click.element}</code></td>
                <td><small>{click.path}</small></td>
              </tr>
            ))}
          </tbody>
        </table>
        {clicks.length === 0 && !loading && (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No activity recorded yet.</p>
        )}
      </div>

      <style jsx>{`
        .user-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .guest { background: #333; color: #999; }
        .member { background: rgba(196, 153, 92, 0.2); color: #C4995C; }
        .click-el { color: #C4995C; font-family: monospace; }
      `}</style>
    </div>
  );
}
