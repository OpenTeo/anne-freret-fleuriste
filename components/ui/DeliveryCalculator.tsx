'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Truck, Clock, Check } from 'lucide-react';
import { getDeliveryInfo, getDeliveryZoneSuggestions, DELIVERY_ZONES, DeliveryZone } from '@/lib/delivery-zones';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle input changes and suggestions
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

  // Handle delivery calculation
  const calculateDelivery = (searchInput: string) => {
    if (!searchInput.trim()) return;
    
    const result = getDeliveryInfo(searchInput);
    setDeliveryResult(result);
    
    // Notify parent component
    onDeliveryChange?.(result.fee, result.time, result.type);
  };

  // Handle suggestion selection
  const selectSuggestion = (zone: DeliveryZone) => {
    setInput(`${zone.postalCode} ${zone.city}`);
    setShowSuggestions(false);
    calculateDelivery(`${zone.postalCode} ${zone.city}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        calculateDelivery(input);
        setShowSuggestions(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          calculateDelivery(input);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Zone color mapping
  const getZoneColor = (type: 'local' | 'regional' | 'national') => {
    switch (type) {
      case 'local': return '#4caf50';
      case 'regional': return '#2196f3';
      case 'national': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  // Zone badge styling
  const getZoneBadge = (type: 'local' | 'regional' | 'national') => {
    const colors = {
      local: { bg: 'bg-green-100', text: 'text-green-700', label: 'Local' },
      regional: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Régional' },
      national: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'National' }
    };
    return colors[type];
  };

  return (
    <div className={`delivery-calculator ${className}`}>
      {/* Input Section */}
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => input.length >= 2 && setShowSuggestions(suggestions.length > 0)}
            placeholder="Votre code postal ou ville..."
            className="w-full px-4 py-4 pl-12 pr-4 rounded-xl border-2 border-[#e8e0d8] bg-[#faf8f5] text-[#2d2a26] placeholder-[#9a9490] focus:outline-none focus:border-[#b8956a] focus:bg-white transition-all duration-200"
          />
          <Search 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b8956a]" 
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#e8e0d8] shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            {suggestions.map((zone, index) => (
              <button
                key={`${zone.postalCode}-${zone.city}`}
                onClick={() => selectSuggestion(zone)}
                className={`w-full px-4 py-3 text-left hover:bg-[#faf8f5] transition-colors border-b border-[#f5f0eb] last:border-b-0 ${index === selectedIndex ? 'bg-[#faf8f5]' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#2d2a26]">
                      {zone.postalCode} {zone.city}
                    </div>
                    <div className="text-sm text-[#9a9490]">
                      {zone.distance}km - {zone.deliveryFee}€
                    </div>
                  </div>
                  <div className="text-[#b8956a] text-sm font-medium">
                    {zone.deliveryTime}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Section */}
      {deliveryResult && (
        <div className="mt-6 bg-white rounded-2xl border border-[#e8e0d8] p-6 shadow-sm animate-[slideIn_0.3s_ease-out]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full" 
                   style={{ backgroundColor: `${getZoneColor(deliveryResult.type)}20` }}>
                <Truck size={20} style={{ color: getZoneColor(deliveryResult.type) }} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-1">
                  Livraison disponible
                </h3>
                <p className="text-[#9a9490] text-sm">
                  {deliveryResult.description}
                </p>
              </div>
            </div>
            
            {/* Zone Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getZoneBadge(deliveryResult.type).bg} ${getZoneBadge(deliveryResult.type).text}`}>
              {getZoneBadge(deliveryResult.type).label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="text-center p-4 rounded-xl bg-[#faf8f5]">
              <div className="text-2xl font-bold text-[#b8956a] mb-1">
                {deliveryResult.fee.toFixed(2)}€
              </div>
              <div className="text-[#9a9490] text-sm">
                Frais de livraison
              </div>
            </div>

            {/* Time */}
            <div className="text-center p-4 rounded-xl bg-[#faf8f5]">
              <div className="flex items-center justify-center mb-1">
                <Clock size={16} className="text-[#b8956a] mr-1" />
                <span className="text-lg font-semibold text-[#2d2a26]">
                  {deliveryResult.time}
                </span>
              </div>
              <div className="text-[#9a9490] text-sm">
                Délai estimé
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Zone Map */}
      {showMap && (
        <div className="mt-8 bg-white rounded-2xl border border-[#e8e0d8] p-6">
          <h3 className="font-serif text-xl text-[#2d2a26] mb-6 text-center">
            Nos zones de livraison
          </h3>

          {/* OpenStreetMap embed centered on Saint-Pair-sur-Mer */}
          <div className="relative rounded-xl overflow-hidden border border-[#e8e0d8]" style={{ height: '400px' }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-2.05%2C48.65%2C-1.1%2C48.98&layer=mapnik&marker=48.8167%2C-1.5667"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Zones de livraison Anne Freret"
            />
            
            {/* Zone overlay legend on the map */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#e8e0d8]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4caf50' }} />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#2d2a26' }}>0-5 km</div>
                    <div className="text-xs font-bold" style={{ color: '#4caf50' }}>8€</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff9800' }} />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#2d2a26' }}>5-10 km</div>
                    <div className="text-xs font-bold" style={{ color: '#ff9800' }}>12€</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2196f3' }} />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#2d2a26' }}>10+ km</div>
                    <div className="text-xs font-bold" style={{ color: '#2196f3' }}>18€</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9e9e9e' }} />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#2d2a26' }}>National</div>
                    <div className="text-xs font-bold" style={{ color: '#9e9e9e' }}>12.90€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cities list by zone */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl p-4" style={{ backgroundColor: '#f0faf0', border: '1px solid #c8e6c9' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4caf50' }} />
                <span className="text-sm font-semibold" style={{ color: '#2d2a26' }}>Zone locale (8€)</span>
              </div>
              <p className="text-xs" style={{ color: '#6b6560' }}>Saint-Pair, Granville, Donville, Jullouville, St-Planchers</p>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: '#fff8f0', border: '1px solid #ffe0b2' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff9800' }} />
                <span className="text-sm font-semibold" style={{ color: '#2d2a26' }}>Zone étendue (12€)</span>
              </div>
              <p className="text-xs" style={{ color: '#6b6560' }}>Bréhal, Cérences, Gavray, La Haye-Pesnel, Villedieu</p>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: '#f0f4ff', border: '1px solid #bbdefb' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2196f3' }} />
                <span className="text-sm font-semibold" style={{ color: '#2d2a26' }}>Zone régionale (18€)</span>
              </div>
              <p className="text-xs" style={{ color: '#6b6560' }}>Avranches, Sartilly, Pontorson, Coutances, Saint-Lô</p>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}