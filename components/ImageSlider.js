'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSite } from '@/context/SiteContext';

export default function ImageSlider() {
  const { settings } = useSite();
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImages = (() => {
    if (!settings?.slider_images) return [];
    try { return JSON.parse(settings.slider_images); } catch { return []; }
  })();

  useEffect(() => {
    if (carouselImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  if (carouselImages.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <section className="premium-slider">
      <div className="slider-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="slide"
          >
            <div className="slide-image-container">
              <img src={carouselImages[currentIndex].url} alt={carouselImages[currentIndex].title} />
              <div className="slide-overlay"></div>
            </div>
            
            <div className="slide-content">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="section-label">
                {carouselImages[currentIndex].category}
              </motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                {carouselImages[currentIndex].title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                {carouselImages[currentIndex].description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="slide-actions">
                <Link href="/products" className="btn-primary">Explore Masterpiece</Link>
                <div className="slider-navigation">
                  <button onClick={prevSlide} className="nav-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  </button>
                  <span className="slide-counter">{currentIndex + 1} / {carouselImages.length}</span>
                  <button onClick={nextSlide} className="nav-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="slider-dots">
          {carouselImages.map((_, index) => (
            <button key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)}></button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .premium-slider { width: 100%; min-height: 80vh; background: var(--dark); position: relative; overflow: hidden; padding: 6rem 0; }
        .slider-wrapper { max-width: 1400px; margin: 0 auto; padding: 0 2rem; position: relative; }
        .slide { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .slide-image-container { position: relative; width: 100%; height: 600px; border-radius: 40px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
        .slide-image-container img { width: 100%; height: 100%; object-fit: cover; }
        .slide-overlay { position: absolute; inset: 0; background: linear-gradient(to right, var(--dark) 0%, transparent 40%); opacity: 0.5; }
        .slide-content h2 { font-size: clamp(3rem, 5vw, 4.5rem); color: #fff; margin-bottom: 2rem; line-height: 1.1; }
        .slide-content p { font-size: 1.2rem; color: var(--sand); max-width: 450px; margin-bottom: 3rem; font-weight: 300; }
        .slide-actions { display: flex; align-items: center; gap: 3rem; }
        .slider-navigation { display: flex; align-items: center; gap: 1.5rem; color: var(--gold); }
        .nav-btn { background: transparent; border: 1px solid var(--gold); color: var(--gold); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; cursor: pointer; }
        .nav-btn:hover { background: var(--gold); color: #000; }
        .slide-counter { font-family: 'Outfit', sans-serif; font-weight: 600; letter-spacing: 0.1em; min-width: 60px; text-align: center; }
        .slider-dots { position: absolute; right: 2rem; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 1rem; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; transition: all 0.4s ease; cursor: pointer; }
        .dot.active { background: var(--gold); transform: scale(1.5); box-shadow: 0 0 10px var(--gold); }
        @media (max-width: 992px) { .slide { grid-template-columns: 1fr; text-align: center; } .slide-image-container { height: 400px; } .slide-content { display: flex; flex-direction: column; align-items: center; } .slide-actions { flex-direction: column; gap: 2rem; } .slider-dots { flex-direction: row; right: auto; left: 50%; top: auto; bottom: -2rem; transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
