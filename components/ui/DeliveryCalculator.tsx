'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getDeliveryInfo, getDeliveryZoneSuggestions, DeliveryZone } from '@/lib/delivery-zones';

interface DeliveryCalculatorProps {
  onDeliveryChange?: (fee: number, time: string, type: 'local' | 'regional' | 'national') => void;
  showMap?: boolean;
  className?: string;
}

export default function DeliveryCalculator({ 
  onDeliveryChange, 
  showMap = true, 
  className = '' 
}: DeliveryCalculatorProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<DeliveryZone[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<ReturnType<typeof getDeliveryInfo> | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lon: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (input.length >= 2) {
      const newSuggestions = getDeliveryZoneSuggestions(input);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateDelivery = (searchInput: string) => {
    if (!searchInput.trim()) return;
    const result = getDeliveryInfo(searchInput);
    setDeliveryResult(result);
    onDeliveryChange?.(result.fee, result.time, result.type);
  };

  const geocodeCity = async (city: string) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city + ', France')}&limit=1`);
      const data = await res.json();
      if (data?.[0]) setMapCenter({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
    } catch { /* silently fail */ }
  };

  const selectSuggestion = (zone: DeliveryZone) => {
    setInput(`${zone.postalCode} ${zone.city}`);
    setShowSuggestions(false);
    calculateDelivery(`${zone.postalCode} ${zone.city}`);
    geocodeCity(zone.city);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') { calculateDelivery(input); setShowSuggestions(false); }
      return;
    }
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev); break;
      case 'ArrowUp': e.preventDefault(); setSelectedIndex(prev => prev > 0 ? prev - 1 : -1); break;
      case 'Enter': e.preventDefault(); selectedIndex >= 0 ? selectSuggestion(suggestions[selectedIndex]) : (calculateDelivery(input), setShowSuggestions(false)); break;
      case 'Escape': setShowSuggestions(false); setSelectedIndex(-1); break;
    }
  };

  const getZoneLabel = (type: 'local' | 'regional' | 'national') => {
    switch (type) {
      case 'local': return 'Locale';
      case 'regional': return 'Régionale';
      case 'national': return 'Nationale';
    }
  };

  return (
    <div className={className}>
      {/* Input */}
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => input.length >= 2 && setShowSuggestions(suggestions.length > 0)}
            placeholder="Code postal ou ville..."
            className="w-full px-3 py-2.5 border border-[#e8e0d8] bg-white text-sm text-[#2d2a26] font-light placeholder:text-[#2d2a26]/25 focus:outline-none focus:border-[#c4a47a] transition-colors"
          />
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e8e0d8] z-50 max-h-48 overflow-y-auto">
            {suggestions.map((zone, index) => (
              <button
                key={`${zone.postalCode}-${zone.city}`}
                onClick={() => selectSuggestion(zone)}
                className={`w-full px-3 py-2.5 text-left transition-colors border-b border-[#e8e0d8]/30 last:border-0 ${
                  index === selectedIndex ? 'bg-[#c4a47a]/5' : 'hover:bg-[#faf8f5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-[#2d2a26]">{zone.city}</span>
                    <span className="text-xs text-[#2d2a26]/30 ml-1.5">{zone.postalCode}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#2d2a26]/40">{zone.distance} km</span>
                    <span className="text-xs text-[#c4a47a] ml-2 font-medium">{zone.deliveryFee}€</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result */}
      {deliveryResult && (
        <div className="mt-3 border border-[#e8e0d8] bg-white">
          {/* Header */}
          <div className="p-3 border-b border-[#e8e0d8]/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm text-[#2d2a26]">{deliveryResult.description}</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#c4a47a] border border-[#c4a47a]/30 px-2 py-0.5">
                {getZoneLabel(deliveryResult.type)}
              </span>
            </div>
          </div>
          
          {/* Prix + Délai */}
          <div className="grid grid-cols-2 divide-x divide-[#e8e0d8]/50">
            <div className="p-3 text-center">
              <p className="text-lg font-serif text-[#2d2a26]">{deliveryResult.fee.toFixed(0)}€</p>
              <p className="text-[10px] text-[#2d2a26]/35 uppercase tracking-wider">Livraison</p>
            </div>
            <div className="p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-serif text-[#2d2a26]">{deliveryResult.time}</p>
              </div>
              <p className="text-[10px] text-[#2d2a26]/35 uppercase tracking-wider">Délai estimé</p>
            </div>
          </div>
        </div>
      )}

      {/* Map section */}
      {showMap && (
        <div className="mt-8">
          <h3 className="text-base font-serif text-[#2d2a26] mb-4 text-center">
            Nos zones de livraison
          </h3>

          <div className="border border-[#e8e0d8] overflow-hidden" style={{ height: '350px' }}>
            <iframe
              src={mapCenter 
                ? `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lon - 0.15}%2C${mapCenter.lat - 0.1}%2C${mapCenter.lon + 0.15}%2C${mapCenter.lat + 0.1}&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lon}`
                : 'https://www.openstreetmap.org/export/embed.html?bbox=-2.05%2C48.65%2C-1.1%2C48.98&layer=mapnik&marker=48.8167%2C-1.5667'
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Zones de livraison Anne Freret"
            />
          </div>

          <div className="grid grid-cols-3 border border-t-0 border-[#e8e0d8] divide-x divide-[#e8e0d8]">
            <div className="p-3 text-center">
              <p className="text-[10px] text-[#2d2a26]/35 uppercase tracking-wider mb-1">0-5 km</p>
              <p className="text-sm font-serif text-[#2d2a26]">6€</p>
              <p className="text-[9px] text-[#2d2a26]/30 mt-1">Granville, Jullouville</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-[10px] text-[#2d2a26]/35 uppercase tracking-wider mb-1">5-10 km</p>
              <p className="text-sm font-serif text-[#2d2a26]">8€</p>
              <p className="text-[9px] text-[#2d2a26]/30 mt-1">Bréhal, Cérences</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-[10px] text-[#2d2a26]/35 uppercase tracking-wider mb-1">10-35 km</p>
              <p className="text-sm font-serif text-[#2d2a26]">10€</p>
              <p className="text-[9px] text-[#2d2a26]/30 mt-1">Avranches, Villedieu</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}