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
      className={`fixed top-0 left-0 right-0 z-[60] overflow-hidden border-b border-[#b8935a]/15 bg-[#2d2a26] text-white transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(184,147,90,0.08),transparent_30%,rgba(184,147,90,0.12),transparent_70%,rgba(184,147,90,0.08))]" />
      <div className="relative px-8 py-2 md:py-2.5 text-center">
        <p className="text-[10px] md:text-[11px] tracking-[0.14em] uppercase whitespace-nowrap overflow-hidden text-ellipsis">
          Livraison locale le jour même avant 12h · <span className="text-[#d6b37a]">Livraison offerte dès 60€</span> · <button onClick={() => window.dispatchEvent(new Event('open-newsletter'))} className="underline underline-offset-4 hover:text-[#d6b37a] transition-colors">-10% avec la newsletter</button>
        </p>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        aria-label="Fermer la bannière"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
