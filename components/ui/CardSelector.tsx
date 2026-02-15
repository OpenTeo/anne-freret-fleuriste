'use client';

/* ────────────────────────────────────────────────────
   Cartes message « fleur séchée collée » — style polaroid artisanal
   5 cartes entièrement en SVG inline, zéro image externe
   ──────────────────────────────────────────────────── */

export const MESSAGE_CARDS = [
  { id: 'lavande', name: 'Lavande' },
  { id: 'rose', name: 'Rose des champs' },
  { id: 'mimosa', name: 'Mimosa' },
  { id: 'eucalyptus', name: 'Eucalyptus' },
  { id: 'blanche', name: 'Fleur blanche' },
] as const;

/* ── SVG des fleurs séchées ── */

function LavandeSVG() {
  return (
    <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tige */}
      <path d="M40 135 Q39 100, 41 70 Q42 50, 40 30" stroke="#7a8c6e" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M40 90 Q30 80, 25 72" stroke="#7a8c6e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M40 85 Q50 76, 55 68" stroke="#7a8c6e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* Petites feuilles */}
      <ellipse cx="25" cy="71" rx="4" ry="1.5" fill="#8a9e7a" transform="rotate(-30 25 71)"/>
      <ellipse cx="55" cy="67" rx="4" ry="1.5" fill="#8a9e7a" transform="rotate(25 55 67)"/>
      {/* Épis de lavande */}
      {[0, 4, 8, 12, 16, 20, 24].map((offset, i) => (
        <g key={i}>
          <ellipse cx={39 + (i % 2 === 0 ? -1 : 1)} cy={28 - offset + 30} rx="3.5" ry="2.2" fill="#7b5ea7" opacity={0.7 + i * 0.04}/>
          <ellipse cx={41 + (i % 2 === 0 ? 1 : -1)} cy={28 - offset + 30} rx="3" ry="1.8" fill="#9370b8" opacity="0.5"/>
        </g>
      ))}
      {/* Petits détails floraux */}
      {[2, 6, 10, 14, 18, 22].map((offset, i) => (
        <ellipse key={`d${i}`} cx={40 + (i % 2 === 0 ? 2 : -2)} cy={29 - offset + 30} rx="2" ry="1.5" fill="#6a4d91" opacity="0.4"/>
      ))}
      {/* Sommet */}
      <ellipse cx="40" cy="28" rx="2" ry="1.5" fill="#8b6bb0" opacity="0.6"/>
    </svg>
  );
}

function RoseSVG() {
  return (
    <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tiges */}
      <path d="M35 135 Q36 110, 34 85 Q33 70, 35 55" stroke="#6b7c5e" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M35 90 Q45 82, 50 72 Q52 65, 50 58" stroke="#6b7c5e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M35 100 Q25 92, 22 80 Q20 72, 22 64" stroke="#6b7c5e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* Feuilles */}
      <path d="M30 88 Q24 84, 26 78 Q28 82, 30 88Z" fill="#8a9e7a" opacity="0.7"/>
      <path d="M40 86 Q46 82, 44 76 Q42 80, 40 86Z" fill="#8a9e7a" opacity="0.7"/>
      {/* Fleur 1 — centre */}
      <circle cx="35" cy="50" r="6" fill="#e8a0aa"/>
      <circle cx="35" cy="50" r="4" fill="#d4808e"/>
      <circle cx="35" cy="50" r="2" fill="#c06878"/>
      {/* Pétales fleur 1 */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 35 + Math.cos(rad) * 7;
        const cy = 50 + Math.sin(rad) * 7;
        return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="3" fill="#e8a0aa" opacity="0.6" transform={`rotate(${angle} ${cx} ${cy})`}/>;
      })}
      {/* Fleur 2 — droite */}
      <circle cx="50" cy="55" r="4.5" fill="#f0b8be"/>
      <circle cx="50" cy="55" r="2.5" fill="#d4808e"/>
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + Math.cos(rad) * 5.5;
        const cy = 55 + Math.sin(rad) * 5.5;
        return <ellipse key={i} cx={cx} cy={cy} rx="3" ry="2.2" fill="#f0b8be" opacity="0.5" transform={`rotate(${angle} ${cx} ${cy})`}/>;
      })}
      {/* Fleur 3 — gauche */}
      <circle cx="22" cy="60" r="3.5" fill="#e8a0aa"/>
      <circle cx="22" cy="60" r="2" fill="#c06878"/>
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 22 + Math.cos(rad) * 4.5;
        const cy = 60 + Math.sin(rad) * 4.5;
        return <ellipse key={i} cx={cx} cy={cy} rx="2.5" ry="2" fill="#e8a0aa" opacity="0.5" transform={`rotate(${angle} ${cx} ${cy})`}/>;
      })}
      {/* Petits boutons */}
      <circle cx="42" cy="68" r="2" fill="#d4808e" opacity="0.5"/>
      <circle cx="28" cy="72" r="1.5" fill="#e8a0aa" opacity="0.5"/>
    </svg>
  );
}

function MimosaSVG() {
  return (
    <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tige principale */}
      <path d="M42 135 Q40 105, 38 80 Q36 60, 40 40" stroke="#6b7c5e" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Branches */}
      <path d="M39 75 Q30 65, 25 55" stroke="#6b7c5e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M40 65 Q50 55, 55 45" stroke="#6b7c5e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M39 85 Q48 78, 54 70" stroke="#6b7c5e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* Feuilles composées (mimosa) */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={`lf${i}`}>
          <ellipse cx={38 - i * 0.5} cy={95 + i * 5} rx="6" ry="1.2" fill="#7a8c6e" opacity="0.6" transform={`rotate(${-20 + i * 5} ${38 - i * 0.5} ${95 + i * 5})`}/>
          <ellipse cx={42 + i * 0.5} cy={93 + i * 5} rx="6" ry="1.2" fill="#7a8c6e" opacity="0.6" transform={`rotate(${20 - i * 5} ${42 + i * 0.5} ${93 + i * 5})`}/>
        </g>
      ))}
      {/* Boules de mimosa */}
      {[
        [40, 38], [37, 42], [43, 43], [35, 47], [42, 47], [39, 35],
        [25, 53], [28, 57], [23, 58], [30, 52],
        [55, 43], [52, 47], [57, 48], [53, 52],
        [54, 68], [57, 72], [52, 73], [56, 66],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="2.5" fill="#e8c840"/>
          <circle cx={cx! - 0.5} cy={cy! - 0.5} r="1.5" fill="#f0d860" opacity="0.6"/>
          <circle cx={cx! + 0.3} cy={cy! + 0.3} r="0.5" fill="#d4b030" opacity="0.4"/>
        </g>
      ))}
    </svg>
  );
}

function EucalyptusSVG() {
  return (
    <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tige */}
      <path d="M40 135 Q39 110, 40 85 Q41 60, 40 35" stroke="#6b7c5e" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Feuilles d'eucalyptus — arrondies, alternées */}
      {[
        { cy: 40, side: -1 }, { cy: 48, side: 1 }, { cy: 56, side: -1 },
        { cy: 64, side: 1 }, { cy: 72, side: -1 }, { cy: 80, side: 1 },
        { cy: 88, side: -1 }, { cy: 96, side: 1 }, { cy: 104, side: -1 },
        { cy: 112, side: 1 },
      ].map(({ cy, side }, i) => {
        const cx = 40 + side * 10;
        const r = 6 + (i < 3 ? i : 3 - Math.abs(i - 5) * 0.3);
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx={r * 0.7} ry={r} fill="#8baa8e" opacity="0.55" transform={`rotate(${side * 15} ${cx} ${cy})`}/>
            <ellipse cx={cx} cy={cy} rx={r * 0.5} ry={r * 0.85} fill="#a3c2a6" opacity="0.35" transform={`rotate(${side * 15} ${cx} ${cy})`}/>
            {/* Nervure */}
            <line x1={cx} y1={cy - r + 1} x2={cx} y2={cy + r - 1} stroke="#6b7c5e" strokeWidth="0.3" opacity="0.4" transform={`rotate(${side * 15} ${cx} ${cy})`}/>
          </g>
        );
      })}
      {/* Feuille sommitale */}
      <ellipse cx="40" cy="33" rx="3" ry="5" fill="#8baa8e" opacity="0.6"/>
    </svg>
  );
}

function FleurBlancheSVG() {
  return (
    <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tige */}
      <path d="M40 135 Q39 110, 40 85 Q41 65, 40 55" stroke="#7a8c6e" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Feuilles */}
      <path d="M40 100 Q32 92, 28 86 Q32 90, 40 95Z" fill="#8a9e7a" opacity="0.6"/>
      <path d="M40 95 Q48 87, 52 82 Q48 86, 40 92Z" fill="#8a9e7a" opacity="0.6"/>
      {/* Pétales principaux — fleur simple blanche */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 40 + Math.cos(rad) * 11;
        const cy = 50 + Math.sin(rad) * 11;
        return (
          <ellipse key={i} cx={cx} cy={cy} rx="7" ry="4.5" fill="#f5f0eb" stroke="#e8e0d8" strokeWidth="0.3"
            opacity="0.85" transform={`rotate(${angle} ${cx} ${cy})`}/>
        );
      })}
      {/* Pétales intérieurs */}
      {[20, 80, 140, 200, 260, 320].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 40 + Math.cos(rad) * 7;
        const cy = 50 + Math.sin(rad) * 7;
        return (
          <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3" fill="#faf8f5" stroke="#e8e0d8" strokeWidth="0.2"
            opacity="0.7" transform={`rotate(${angle} ${cx} ${cy})`}/>
        );
      })}
      {/* Cœur */}
      <circle cx="40" cy="50" r="4" fill="#e8dcc8"/>
      <circle cx="40" cy="50" r="2.5" fill="#d4c4a0"/>
      <circle cx="39" cy="49" r="1" fill="#c4a47a" opacity="0.5"/>
    </svg>
  );
}

const FLOWER_COMPONENTS: Record<string, () => React.ReactNode> = {
  lavande: LavandeSVG,
  rose: RoseSVG,
  mimosa: MimosaSVG,
  eucalyptus: EucalyptusSVG,
  blanche: FleurBlancheSVG,
};

const TAPE_COLORS: Record<string, string> = {
  lavande: '#c4b0d9',
  rose: '#f0c8cc',
  mimosa: '#a8b89a',
  eucalyptus: '#8a8c6e',
  blanche: '#d4c8b0',
};

interface CardSelectorProps {
  selectedCard: string | null;
  onSelect: (cardId: string | null) => void;
}

export default function CardSelector({ selectedCard, onSelect }: CardSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-[#2d2a26]/60 text-sm">
        Choisissez le visuel de votre carte message offerte.
      </p>
      {/* Desktop: 5 colonnes — Mobile: scroll horizontal */}
      <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible">
        {MESSAGE_CARDS.map((card) => {
          const FlowerSvg = FLOWER_COMPONENTS[card.id];
          const tapeColor = TAPE_COLORS[card.id];
          const isSelected = selectedCard === card.id;

          return (
            <button
              key={card.id}
              onClick={() => onSelect(isSelected ? null : card.id)}
              className="flex-shrink-0 text-left transition-all duration-200"
              style={{
                width: 110,
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div
                className="relative border transition-colors duration-200"
                style={{
                  aspectRatio: '3/4',
                  borderColor: isSelected ? '#c4a47a' : '#d8d4ce',
                  borderWidth: isSelected ? 2 : 1,
                  backgroundColor: '#ffffff',
                }}
              >
                {/* Cadre intérieur */}
                <div
                  className="absolute"
                  style={{
                    top: 8,
                    left: 8,
                    right: 8,
                    bottom: 24,
                    backgroundColor: '#f0f0ea',
                  }}
                >
                  {/* Fleur SVG */}
                  <div className="absolute inset-2 flex items-center justify-center">
                    <div style={{ width: '60%', height: '75%' }}>
                      <FlowerSvg />
                    </div>
                  </div>
                  {/* Scotch / Washi tape */}
                  <div
                    className="absolute"
                    style={{
                      top: '15%',
                      left: '25%',
                      width: '50%',
                      height: 8,
                      backgroundColor: tapeColor,
                      opacity: 0.7,
                      transform: 'rotate(-15deg)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    }}
                  />
                </div>
                {/* Nom en bas */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
                  style={{ height: 22 }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 7,
                      letterSpacing: '0.18em',
                      color: '#2d2a26',
                      opacity: 0.45,
                      textTransform: 'uppercase',
                    }}
                  >
                    Anne Freret
                  </span>
                </div>
              </div>
              {/* Légende */}
              <p className="text-center mt-1.5" style={{ fontSize: 10, color: '#2d2a26', opacity: 0.55 }}>
                {card.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
