'use client';

interface RibbonConfiguratorProps {
  ribbonText: string;
  setRibbonText: (text: string) => void;
  ribbonColor: string;
  setRibbonColor: (color: string) => void;
}

const colorSchemes: Record<string, { base: string; light: string; dark: string; darker: string; border: string; text: string; name: string }> = {
  or: { base: '#b8935a', light: '#e8d5b5', dark: '#a8885c', darker: '#8a6d3b', border: '#8a6d3b', text: '#3d2b14', name: 'Or' },
  blanc: { base: '#f0ebe6', light: '#ffffff', dark: '#ddd5cb', darker: '#c8bdb0', border: '#b8935a', text: '#2d2a26', name: 'Blanc' },
  violet: { base: '#5a4475', light: '#7a6295', dark: '#3d2d55', darker: '#2a1e3d', border: '#b8935a', text: '#ede6f5', name: 'Violet' },
};

export default function RibbonConfigurator({ ribbonText, setRibbonText, ribbonColor, setRibbonColor }: RibbonConfiguratorProps) {
  const scheme = colorSchemes[ribbonColor] || colorSchemes.or;
  const displayText = ribbonText || 'Votre message ici';
  const fontSize = displayText.length > 30 ? 12 : displayText.length > 20 ? 14 : 17;
  const isPlaceholder = !ribbonText;

  return (
    <div className="space-y-4">
      {/* Couleur + Input EN HAUT */}
      <div className="flex gap-2">
        {Object.entries(colorSchemes).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setRibbonColor(key)}
            className={`flex items-center gap-1.5 px-3 py-2 border transition-all text-xs ${
              ribbonColor === key
                ? 'border-[#b8935a] bg-[#b8935a]/5'
                : 'border-[#e8e0d8] hover:border-[#b8935a]/50'
            }`}
          >
            <span className="w-3.5 h-3.5 border border-[#e8e0d8]" style={{ backgroundColor: val.base }} />
            {val.name}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={ribbonText}
        onChange={(e) => setRibbonText(e.target.value.slice(0, 40))}
        placeholder="À notre père adoré"
        className="w-full px-3 py-2.5 border border-[#e8e0d8] text-[16px] text-[#2d2a26] bg-white focus:outline-none focus:border-[#b8935a] transition-colors placeholder:text-[#2d2a26]/25"
      />
      <p className="text-[10px] text-right -mt-3 text-[#2d2a26]/30">{ribbonText.length}/40</p>

      {/* Preview du ruban EN DESSOUS */}
      <div className="flex justify-center">
        <div className="w-full max-w-[380px]" style={{
          perspective: '600px',
        }}>
          <svg 
            viewBox="0 0 400 80" 
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: 'rotateX(8deg)',
              filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.2)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          >
            <defs>
              {/* Main satin gradient — more 3D with strong highlights */}
              <linearGradient id={`satin3d-${ribbonColor}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={scheme.light} />
                <stop offset="8%" stopColor={scheme.base} />
                <stop offset="35%" stopColor={scheme.light} stopOpacity="0.5" />
                <stop offset="40%" stopColor={scheme.base} />
                <stop offset="60%" stopColor={scheme.dark} />
                <stop offset="75%" stopColor={scheme.base} />
                <stop offset="90%" stopColor={scheme.dark} />
                <stop offset="100%" stopColor={scheme.darker} />
              </linearGradient>
              {/* Horizontal sheen for silk look */}
              <linearGradient id={`silk-${ribbonColor}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={scheme.darker} stopOpacity="0.15" />
                <stop offset="5%" stopColor="white" stopOpacity="0.05" />
                <stop offset="20%" stopColor="white" stopOpacity="0.12" />
                <stop offset="50%" stopColor="white" stopOpacity="0.2" />
                <stop offset="80%" stopColor="white" stopOpacity="0.12" />
                <stop offset="95%" stopColor="white" stopOpacity="0.05" />
                <stop offset="100%" stopColor={scheme.darker} stopOpacity="0.15" />
              </linearGradient>
              {/* Diagonal sheen */}
              <linearGradient id={`diag-${ribbonColor}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="40%" stopColor="white" stopOpacity="0.08" />
                <stop offset="60%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Ribbon body */}
            <rect x="5" y="10" width="390" height="60" rx="1.5" fill={`url(#satin3d-${ribbonColor})`} />
            
            {/* Silk sheen overlay */}
            <rect x="5" y="10" width="390" height="60" rx="1.5" fill={`url(#silk-${ribbonColor})`} />
            
            {/* Diagonal sheen */}
            <rect x="5" y="10" width="390" height="60" rx="1.5" fill={`url(#diag-${ribbonColor})`} />

            {/* Top edge highlight (3D) */}
            <rect x="5" y="10" width="390" height="1.5" fill="white" opacity="0.25" rx="1" />
            {/* Bottom edge shadow (3D) */}
            <rect x="5" y="68.5" width="390" height="1.5" fill="black" opacity="0.15" rx="1" />
            {/* Left edge shadow */}
            <rect x="5" y="10" width="1.5" height="60" fill="black" opacity="0.08" />
            {/* Right edge shadow */}
            <rect x="393.5" y="10" width="1.5" height="60" fill="black" opacity="0.08" />

            {/* Top ornamental border band */}
            <rect x="8" y="13" width="384" height="8" fill={scheme.border} opacity="0.15" rx="0.5" />
            <rect x="8" y="13" width="384" height="0.8" fill={scheme.border} opacity="0.5" />
            <rect x="8" y="20.2" width="384" height="0.8" fill={scheme.border} opacity="0.5" />
            {/* Ornamental scrollwork top */}
            {Array.from({ length: 24 }).map((_, i) => (
              <g key={`ot-${i}`} opacity="0.4">
                <path d={`M${16 + i * 16},14.5 Q${20 + i * 16},18.5 ${24 + i * 16},14.5`} fill="none" stroke={scheme.border} strokeWidth="0.5" />
                <path d={`M${16 + i * 16},19.5 Q${20 + i * 16},15.5 ${24 + i * 16},19.5`} fill="none" stroke={scheme.border} strokeWidth="0.5" />
                <circle cx={20 + i * 16} cy={17} r="0.6" fill={scheme.border} opacity="0.5" />
              </g>
            ))}
            
            {/* Bottom ornamental border band */}
            <rect x="8" y="59" width="384" height="8" fill={scheme.border} opacity="0.15" rx="0.5" />
            <rect x="8" y="59" width="384" height="0.8" fill={scheme.border} opacity="0.5" />
            <rect x="8" y="66.2" width="384" height="0.8" fill={scheme.border} opacity="0.5" />
            {/* Ornamental scrollwork bottom */}
            {Array.from({ length: 24 }).map((_, i) => (
              <g key={`ob-${i}`} opacity="0.4">
                <path d={`M${16 + i * 16},60.5 Q${20 + i * 16},64.5 ${24 + i * 16},60.5`} fill="none" stroke={scheme.border} strokeWidth="0.5" />
                <path d={`M${16 + i * 16},65.5 Q${20 + i * 16},61.5 ${24 + i * 16},65.5`} fill="none" stroke={scheme.border} strokeWidth="0.5" />
                <circle cx={20 + i * 16} cy={63} r="0.6" fill={scheme.border} opacity="0.5" />
              </g>
            ))}

            {/* Fabric fold lines (subtle horizontal creases) */}
            <line x1="5" y1="30" x2="395" y2="30" stroke="white" strokeWidth="0.3" opacity="0.1" />
            <line x1="5" y1="50" x2="395" y2="50" stroke="black" strokeWidth="0.3" opacity="0.06" />

            {/* Text with shadow for depth */}
            <text
              x="200"
              y="41"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize={fontSize}
              fontWeight="700"
              letterSpacing="3"
              fill="black"
              opacity="0.15"
            >
              {displayText.toUpperCase()}
            </text>
            <text
              x="200"
              y="40"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize={fontSize}
              fontWeight="700"
              letterSpacing="3"
              fill={scheme.text}
              opacity={isPlaceholder ? 0.4 : 1}
            >
              {displayText.toUpperCase()}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
