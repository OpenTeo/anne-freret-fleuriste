'use client';

import Image from 'next/image';

export const MESSAGE_CARDS = [
  {
    id: 'plage',
    name: 'Plage normande',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'falaises',
    name: 'Falaises',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'bouquet',
    name: 'Bouquet champêtre',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'nature',
    name: 'Nature',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'mer',
    name: 'Mer et ciel',
    image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'minimaliste',
    name: 'Minimaliste',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&auto=format&fit=crop&q=80',
  },
] as const;

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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {MESSAGE_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => onSelect(selectedCard === card.id ? null : card.id)}
            className={`text-left border transition-all overflow-hidden ${
              selectedCard === card.id
                ? 'border-[#c4a47a] border-2'
                : 'border-[#e8e0d8] hover:border-[#c4a47a]/50'
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f0eb]">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 200px"
              />
            </div>
            <div className="p-2">
              <p className="text-[11px] text-[#2d2a26]/60 text-center">{card.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
