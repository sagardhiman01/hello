'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await register(formData.name, formData.email, formData.password, formData.phone);
      if (res.success) {
        router.push('/');
      } else {
        setError(res.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Decorative Elements */}
      <div className="auth-decor auth-decor-1"></div>
      <div className="auth-decor auth-decor-2"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="auth-card"
      >
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="auth-logo-block"
        >
          <span className="auth-logo-sub">THE</span>
          <span className="auth-logo-main">AURIKA</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="auth-heading"
        >
          Create Your Account
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="auth-subheading"
        >
          Join our exclusive community of jewelry connoisseurs.
        </motion.p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-row">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="auth-field"
            >
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Elena Roy" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="auth-field"
            >
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="+91 00000 00000" 
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="auth-field"
          >
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="your@email.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="auth-field"
          >
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Create a strong password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="auth-error"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(196, 153, 92, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="auth-divider"
        >
          <span></span>
          <p>Already have an account?</p>
          <span></span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/login" className="auth-secondary-btn">
            Sign In Instead
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
