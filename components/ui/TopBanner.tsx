'use client';

import { useState, useEffect } from 'react';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[60] bg-[#2d2a26] text-white text-center py-1.5 px-8 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <p className="text-[10px] md:text-[11px] tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
        Livraison offerte dès 60€ · <span className="text-[#c4a47a]">-10%</span> avec la newsletter
      </p>
      <button 
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
