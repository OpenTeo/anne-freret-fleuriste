'use client';

interface RibbonConfiguratorProps {
  ribbonText: string;
  setRibbonText: (text: string) => void;
  ribbonColor: string;
  setRibbonColor: (color: string) => void;
}

const colorSchemes: Record<string, { base: string; light: string; dark: string; border: string; text: string; name: string }> = {
  or: { base: '#c4a47a', light: '#ddc9a3', dark: '#a8885c', border: '#8a6d3b', text: '#4a3520', name: 'Or' },
  blanc: { base: '#f5f0eb', light: '#ffffff', dark: '#e8e0d8', border: '#c4a47a', text: '#2d2a26', name: 'Blanc' },
  violet: { base: '#4a3662', light: '#6b5283', dark: '#362648', border: '#c4a47a', text: '#f5f0eb', name: 'Violet' },
};

export default function RibbonConfigurator({ ribbonText, setRibbonText, ribbonColor, setRibbonColor }: RibbonConfiguratorProps) {
  const scheme = colorSchemes[ribbonColor] || colorSchemes.or;
  const displayText = ribbonText || 'Votre message ici';
  const fontSize = displayText.length > 30 ? 13 : displayText.length > 20 ? 15 : 18;

  return (
    <div className="space-y-5">
      <p className="text-xs text-[#2d2a26]/40 leading-relaxed">
        Ajoutez un ruban personnalisé à votre composition.
      </p>

      {/* Preview du ruban */}
      <div className="flex justify-center py-4">
        <svg viewBox="0 0 400 70" className="w-full max-w-[400px]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Satin gradient */}
            <linearGradient id={`satin-${ribbonColor}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={scheme.light} stopOpacity="0.6" />
              <stop offset="15%" stopColor={scheme.base} />
              <stop offset="50%" stopColor={scheme.light} stopOpacity="0.3" />
              <stop offset="55%" stopColor={scheme.base} />
              <stop offset="100%" stopColor={scheme.dark} />
            </linearGradient>
            {/* Sheen overlay */}
            <linearGradient id={`sheen-${ribbonColor}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            {/* Shadow */}
            <filter id="ribbonShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Main ribbon body */}
          <rect x="10" y="10" width="380" height="50" rx="1" fill={`url(#satin-${ribbonColor})`} filter="url(#ribbonShadow)" />
          
          {/* Satin sheen */}
          <rect x="10" y="10" width="380" height="50" rx="1" fill={`url(#sheen-${ribbonColor})`} />

          {/* Relief edges — top highlight */}
          <rect x="10" y="10" width="380" height="2" fill="white" opacity="0.15" />
          {/* Relief edges — bottom shadow */}
          <rect x="10" y="58" width="380" height="2" fill="black" opacity="0.1" />
          {/* Inner relief — subtle center ridge */}
          <rect x="10" y="33" width="380" height="1" fill="white" opacity="0.06" />
          <rect x="10" y="36" width="380" height="1" fill="black" opacity="0.04" />

          {/* Top ornamental border */}
          <rect x="10" y="10" width="380" height="1.5" fill={scheme.border} opacity="0.6" />
          <rect x="10" y="14" width="380" height="0.5" fill={scheme.border} opacity="0.3" />
          {/* Ornamental pattern top */}
          {Array.from({ length: 38 }).map((_, i) => (
            <g key={`top-${i}`} opacity="0.35">
              <circle cx={20 + i * 10} cy={16.5} r="1.2" fill="none" stroke={scheme.border} strokeWidth="0.4" />
              <path d={`M${15 + i * 10},17.5 Q${20 + i * 10},15.5 ${25 + i * 10},17.5`} fill="none" stroke={scheme.border} strokeWidth="0.3" />
            </g>
          ))}
          
          {/* Bottom ornamental border */}
          <rect x="10" y="58.5" width="380" height="1.5" fill={scheme.border} opacity="0.6" />
          <rect x="10" y="55.5" width="380" height="0.5" fill={scheme.border} opacity="0.3" />
          {/* Ornamental pattern bottom */}
          {Array.from({ length: 38 }).map((_, i) => (
            <g key={`bot-${i}`} opacity="0.35">
              <circle cx={20 + i * 10} cy={53.5} r="1.2" fill="none" stroke={scheme.border} strokeWidth="0.4" />
              <path d={`M${15 + i * 10},52.5 Q${20 + i * 10},54.5 ${25 + i * 10},52.5`} fill="none" stroke={scheme.border} strokeWidth="0.3" />
            </g>
          ))}

          {/* Inner decorative lines */}
          <rect x="15" y="19" width="370" height="0.3" fill={scheme.border} opacity="0.2" />
          <rect x="15" y="51" width="370" height="0.3" fill={scheme.border} opacity="0.2" />

          {/* Text */}
          <text
            x="200"
            y="38"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize={fontSize}
            fontWeight="600"
            letterSpacing="3"
            fill={scheme.text}
          >
            {displayText.toUpperCase()}
          </text>
        </svg>
      </div>

      {/* Choix couleur */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-2">Couleur du ruban</p>
        <div className="flex gap-2">
          {Object.entries(colorSchemes).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setRibbonColor(key)}
              className={`flex items-center gap-2 px-4 py-2.5 border transition-all text-sm ${
                ribbonColor === key
                  ? 'border-[#c4a47a] bg-[#c4a47a]/5'
                  : 'border-[#e8e0d8] hover:border-[#c4a47a]/50'
              }`}
            >
              <span
                className="w-4 h-4 border border-[#e8e0d8]"
                style={{ backgroundColor: val.base }}
              />
              {val.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input texte */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-2">Texte du ruban</p>
        <input
          type="text"
          value={ribbonText}
          onChange={(e) => setRibbonText(e.target.value.slice(0, 40))}
          placeholder="À notre père adoré"
          className="w-full px-3 py-2.5 border border-[#e8e0d8] text-[16px] text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors placeholder:text-[#2d2a26]/25"
        />
        <p className="text-[10px] text-right mt-1 text-[#2d2a26]/30">{ribbonText.length}/40</p>
      </div>
    </div>
  );
}
