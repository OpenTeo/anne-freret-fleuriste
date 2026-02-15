'use client';

import { useState } from 'react';

const RIBBON_COLORS = [
  { id: 'or', name: 'Or', hex: '#c4a47a', textColor: '#ffffff' },
  { id: 'blanc', name: 'Blanc', hex: '#f5f0eb', textColor: '#c4a47a' },
  { id: 'violet', name: 'Violet', hex: '#4a3662', textColor: '#d4c4a0' },
] as const;

interface RibbonConfiguratorProps {
  ribbonText: string;
  setRibbonText: (text: string) => void;
  ribbonColor: string;
  setRibbonColor: (color: string) => void;
}

export default function RibbonConfigurator({
  ribbonText,
  setRibbonText,
  ribbonColor,
  setRibbonColor,
}: RibbonConfiguratorProps) {
  const activeColor = RIBBON_COLORS.find(c => c.id === ribbonColor) || RIBBON_COLORS[0];

  // Auto-adjust font size based on text length
  const getFontSize = (text: string) => {
    const len = text.length;
    if (len <= 15) return 16;
    if (len <= 25) return 14;
    if (len <= 35) return 12;
    return 11;
  };

  return (
    <div className="space-y-4">
      <p className="text-[#2d2a26]/60 text-sm">
        Ajoutez un ruban personnalisé à votre composition.
      </p>

      {/* Ribbon Preview */}
      <div className="flex justify-center py-4">
        <div className="relative" style={{ width: 300, height: 64 }}>
          {/* Ribbon shape with satin effect */}
          <svg width="300" height="64" viewBox="0 0 300 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Satin gradient */}
              <linearGradient id={`satin-${activeColor.id}`} x1="0" y1="0" x2="0" y2="64">
                <stop offset="0%" stopColor={activeColor.hex} stopOpacity="0.85" />
                <stop offset="25%" stopColor={activeColor.hex} stopOpacity="1" />
                <stop offset="50%" stopColor={activeColor.hex} stopOpacity="0.92" />
                <stop offset="75%" stopColor={activeColor.hex} stopOpacity="1" />
                <stop offset="100%" stopColor={activeColor.hex} stopOpacity="0.88" />
              </linearGradient>
              {/* Subtle shine */}
              <linearGradient id={`shine-${activeColor.id}`} x1="0" y1="0" x2="300" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              {/* Shadow filter */}
              <filter id="ribbon-shadow" x="-4" y="-2" width="308" height="72">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.12" />
              </filter>
            </defs>
            {/* Ribbon body with gentle drape curve */}
            <path
              d="M8 8 Q30 4, 75 6 Q150 12, 225 6 Q270 4, 292 8 L296 12 Q280 10, 260 14 Q150 24, 40 14 Q20 10, 4 12 Z"
              fill={`url(#satin-${activeColor.id})`}
              filter="url(#ribbon-shadow)"
            />
            <path
              d="M4 12 Q20 10, 40 14 Q150 24, 260 14 Q280 10, 296 12 L292 52 Q270 56, 225 54 Q150 48, 75 54 Q30 56, 8 52 Z"
              fill={`url(#satin-${activeColor.id})`}
            />
            {/* Shine overlay */}
            <path
              d="M8 8 Q30 4, 75 6 Q150 12, 225 6 Q270 4, 292 8 L296 12 Q280 10, 260 14 Q150 24, 40 14 Q20 10, 4 12 Z"
              fill={`url(#shine-${activeColor.id})`}
            />
            <path
              d="M4 12 Q20 10, 40 14 Q150 24, 260 14 Q280 10, 296 12 L292 52 Q270 56, 225 54 Q150 48, 75 54 Q30 56, 8 52 Z"
              fill={`url(#shine-${activeColor.id})`}
            />
            {/* Left tail */}
            <path d="M8 8 L0 0 L4 12 L0 24 L8 16" fill={`url(#satin-${activeColor.id})`} opacity="0.9" />
            <path d="M8 44 L0 40 L4 52 L0 64 L8 52" fill={`url(#satin-${activeColor.id})`} opacity="0.9" />
            {/* Right tail */}
            <path d="M292 8 L300 0 L296 12 L300 24 L292 16" fill={`url(#satin-${activeColor.id})`} opacity="0.9" />
            <path d="M292 44 L300 40 L296 52 L300 64 L292 52" fill={`url(#satin-${activeColor.id})`} opacity="0.9" />
            {/* Subtle fold lines */}
            <line x1="40" y1="14" x2="40" y2="54" stroke="#000000" strokeOpacity="0.04" strokeWidth="0.5" />
            <line x1="260" y1="14" x2="260" y2="54" stroke="#000000" strokeOpacity="0.04" strokeWidth="0.5" />
          </svg>
          {/* Text overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center px-8"
            style={{ paddingTop: 2 }}
          >
            <span
              className="text-center leading-tight italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: getFontSize(ribbonText),
                color: activeColor.textColor,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                maxWidth: 240,
                display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {ribbonText || 'Votre message ici'}
            </span>
          </div>
        </div>
      </div>

      {/* Color choice */}
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-2">Couleur du ruban</p>
        <div className="flex gap-3">
          {RIBBON_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setRibbonColor(color.id)}
              className={`flex items-center gap-2 px-4 py-2.5 border transition-all text-sm ${
                ribbonColor === color.id
                  ? 'border-[#c4a47a] bg-[#c4a47a]/5'
                  : 'border-[#e8e0d8] hover:border-[#c4a47a]/50'
              }`}
            >
              <span
                className="w-4 h-4 border border-[#e8e0d8]"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[#2d2a26]/70">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text input */}
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-2">Texte du ruban</p>
        <input
          type="text"
          value={ribbonText}
          onChange={(e) => {
            if (e.target.value.length <= 40) setRibbonText(e.target.value);
          }}
          placeholder="À notre père adoré"
          className="w-full px-3 py-2.5 border border-[#e8e0d8] text-sm text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors placeholder:text-[#2d2a26]/25"
        />
        <p className="text-[10px] text-[#2d2a26]/30 text-right mt-1">{ribbonText.length}/40</p>
      </div>
    </div>
  );
}
