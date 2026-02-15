'use client';

import { useState } from 'react';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#2d2a26] text-white text-center py-2 px-4 relative z-[60]">
      <p className="text-[11px] md:text-xs tracking-wide">
        Livraison offerte dès 60€ d'achat · Code <span className="text-[#c4a47a] font-medium">BIENVENUE10</span> = -10% sur votre 1ère commande
      </p>
      <button 
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
