'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ClickTracker() {
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleClick = (e) => {
      // Find the closest clickable element (button, anchor, or anything with a handler)
      const target = e.target.closest('button, a, input, select, .clickable') || e.target;
      const element = target.innerText || target.getAttribute('aria-label') || target.placeholder || target.tagName;
      const path = pathname;

      if (path.startsWith('/admin')) return;

      /* 
      // Disabling high-frequency tracking to prevent 503 Crashes on Hostinger
      fetch('/api/track/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          path, 
          element: element.trim().slice(0, 50),
          userId: user?.id 
        }),
      }).catch(err => console.error('Tracking Failed:', err));
      */
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [pathname, user]);

  return null;
}
