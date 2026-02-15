'use client';

/* ────────────────────────────────────────────────────
   Configurateur de ruban deuil — effet satin réaliste
   ──────────────────────────────────────────────────── */

const RIBBON_COLORS = [
  {
    id: 'or',
    name: 'Or',
    base: '#c4a47a',
    light: '#ddc9a3',
    dark: '#9e7e56',
    highlight: '#f0e0c0',
    shadow: '#7a6040',
    textColor: '#ffffff',
  },
  {
    id: 'blanc',
    name: 'Blanc',
    base: '#f0ebe4',
    light: '#faf8f5',
    dark: '#d8d0c4',
    highlight: '#ffffff',
    shadow: '#b8b0a4',
    textColor: '#c4a47a',
  },
  {
    id: 'violet',
    name: 'Violet',
    base: '#4a3662',
    light: '#6a5082',
    dark: '#2e1e42',
    highlight: '#8a70a2',
    shadow: '#1a1028',
    textColor: '#d4c4a0',
  },
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
  const c = RIBBON_COLORS.find(c => c.id === ribbonColor) || RIBBON_COLORS[0];

  const getFontSize = (text: string) => {
    const len = text.length;
    if (len <= 12) return 18;
    if (len <= 20) return 16;
    if (len <= 30) return 13;
    return 11;
  };

  const uid = `rb-${c.id}`;

  return (
    <div className="space-y-4">
      <p className="text-[#2d2a26]/60 text-sm">
        Ajoutez un ruban personnalisé à votre composition.
      </p>

      {/* Ribbon Preview */}
      <div className="flex justify-center py-6">
        <div className="relative" style={{ width: 370, height: 90 }}>
          <svg width="370" height="90" viewBox="0 0 370 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Satin multi-stop vertical gradient */}
              <linearGradient id={`${uid}-satin`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.highlight} stopOpacity="0.4"/>
                <stop offset="8%" stopColor={c.light}/>
                <stop offset="20%" stopColor={c.base}/>
                <stop offset="35%" stopColor={c.light} stopOpacity="0.9"/>
                <stop offset="50%" stopColor={c.base}/>
                <stop offset="65%" stopColor={c.dark} stopOpacity="0.95"/>
                <stop offset="78%" stopColor={c.base}/>
                <stop offset="90%" stopColor={c.light} stopOpacity="0.85"/>
                <stop offset="100%" stopColor={c.dark} stopOpacity="0.7"/>
              </linearGradient>
              {/* Horizontal sheen */}
              <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0"/>
                <stop offset="15%" stopColor="#ffffff" stopOpacity="0.06"/>
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.18"/>
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08"/>
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.15"/>
                <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
              </linearGradient>
              {/* Diagonal sheen for satin silk effect */}
              <linearGradient id={`${uid}-diag`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0"/>
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.12"/>
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05"/>
              </linearGradient>
              {/* Drop shadow */}
              <filter id={`${uid}-shadow`} x="-5%" y="-10%" width="110%" height="130%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.18"/>
              </filter>
              {/* Subtle inner glow */}
              <filter id={`${uid}-inner`}>
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                <feOffset dx="0" dy="1"/>
                <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feFlood floodColor="#000000" floodOpacity="0.08"/>
                <feComposite operator="in" in2="blur"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Text gold emboss */}
              <filter id={`${uid}-emboss`}>
                <feDropShadow dx="0" dy="0.5" stdDeviation="0.3" floodColor="#000000" floodOpacity="0.25"/>
                <feDropShadow dx="0" dy="-0.3" stdDeviation="0.2" floodColor="#ffffff" floodOpacity="0.15"/>
              </filter>
            </defs>

            {/* Main ribbon body — wavy/draped shape */}
            <path
              d={`
                M 18 12
                Q 50 6, 100 10
                Q 185 18, 270 10
                Q 320 6, 352 12
                L 356 16
                Q 340 14, 310 17
                Q 185 28, 60 17
                Q 30 14, 14 16
                Z
              `}
              fill={`url(#${uid}-satin)`}
              filter={`url(#${uid}-shadow)`}
            />
            <path
              d={`
                M 14 16
                Q 30 14, 60 17
                Q 185 28, 310 17
                Q 340 14, 356 16
                L 354 72
                Q 330 76, 280 73
                Q 185 65, 90 73
                Q 40 76, 16 72
                Z
              `}
              fill={`url(#${uid}-satin)`}
            />

            {/* Sheen overlays */}
            <path
              d="M 14 16 Q 30 14, 60 17 Q 185 28, 310 17 Q 340 14, 356 16 L 354 72 Q 330 76, 280 73 Q 185 65, 90 73 Q 40 76, 16 72 Z"
              fill={`url(#${uid}-sheen)`}
            />
            <path
              d="M 14 16 Q 30 14, 60 17 Q 185 28, 310 17 Q 340 14, 356 16 L 354 72 Q 330 76, 280 73 Q 185 65, 90 73 Q 40 76, 16 72 Z"
              fill={`url(#${uid}-diag)`}
            />

            {/* Fold crease lines */}
            <path d="M 90 17 Q 88 44, 90 73" stroke={c.shadow} strokeWidth="0.4" opacity="0.12" fill="none"/>
            <path d="M 280 17 Q 282 44, 280 73" stroke={c.shadow} strokeWidth="0.4" opacity="0.12" fill="none"/>
            {/* Subtle horizontal highlights */}
            <path d="M 60 30 Q 185 24, 310 30" stroke={c.highlight} strokeWidth="0.5" opacity="0.15" fill="none"/>
            <path d="M 60 58 Q 185 64, 310 58" stroke={c.highlight} strokeWidth="0.5" opacity="0.1" fill="none"/>

            {/* Top fold band */}
            <path
              d="M 18 12 Q 50 6, 100 10 Q 185 18, 270 10 Q 320 6, 352 12 L 356 16 Q 340 14, 310 17 Q 185 28, 60 17 Q 30 14, 14 16 Z"
              fill={`url(#${uid}-sheen)`}
              opacity="0.5"
            />

            {/* Left V-cut fringe */}
            <path d={`M 18 12 L 4 6 L 14 16 L 4 26 L 18 20`} fill={`url(#${uid}-satin)`} opacity="0.85"/>
            <path d={`M 16 58 L 2 52 L 12 62 L 2 72 L 16 66`} fill={`url(#${uid}-satin)`} opacity="0.85"/>
            <path d={`M 16 66 L 2 72 L 16 78`} fill={`url(#${uid}-satin)`} opacity="0.7"/>

            {/* Right V-cut fringe */}
            <path d={`M 352 12 L 366 6 L 356 16 L 366 26 L 352 20`} fill={`url(#${uid}-satin)`} opacity="0.85"/>
            <path d={`M 354 58 L 368 52 L 358 62 L 368 72 L 354 66`} fill={`url(#${uid}-satin)`} opacity="0.85"/>
            <path d={`M 354 66 L 368 72 L 354 78`} fill={`url(#${uid}-satin)`} opacity="0.7"/>

            {/* Border highlight */}
            <path
              d="M 18 12 Q 50 6, 100 10 Q 185 18, 270 10 Q 320 6, 352 12"
              stroke={c.highlight}
              strokeWidth="0.6"
              opacity="0.25"
              fill="none"
            />
            <path
              d="M 16 72 Q 40 76, 90 73 Q 185 65, 280 73 Q 330 76, 354 72"
              stroke={c.shadow}
              strokeWidth="0.5"
              opacity="0.15"
              fill="none"
            />
          </svg>

          {/* Text overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingTop: 10, paddingLeft: 30, paddingRight: 30 }}
          >
            <span
              className="text-center leading-tight italic block overflow-hidden whitespace-nowrap"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: getFontSize(ribbonText),
                color: c.textColor,
                textShadow: `0 1px 2px rgba(0,0,0,0.18), 0 0 4px ${c.id === 'blanc' ? 'rgba(196,164,122,0.2)' : 'rgba(255,255,255,0.08)'}`,
                filter: `url(#${uid}-emboss)`,
                maxWidth: 290,
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
                style={{ backgroundColor: color.base }}
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
