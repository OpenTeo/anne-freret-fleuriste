'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { mockProducts } from '@/lib/mock-data';
import { getReviewsForProduct } from '@/lib/reviews-data';
import { Heart, ShoppingCart, Minus, Plus, Truck, Gift, Shield, Star, ChevronDown } from 'lucide-react';

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPageClient({ params }: ProductPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number } | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{ name: string; price?: number } | null>(null);
  const [personalMessage, setPersonalMessage] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({
    vase: false,
    chocolats: false,
    bougie: false
  });

  // État pour les accordéons
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const product = mockProducts.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Initialiser la sélection par défaut
  if (product.sizes && !selectedSize) {
    setSelectedSize(product.sizes[0]);
  }
  if (product.variants && !selectedVariant) {
    setSelectedVariant(product.variants[0]);
  }

  // Calculer le prix actuel avec add-ons
  const addOns = {
    vase: { name: 'Vase en verre artisanal', price: 19.90 },
    chocolats: { name: 'Boîte de chocolats', price: 14.90 },
    bougie: { name: 'Bougie parfumée', price: 12.90 }
  };
  
  const basePrice = selectedSize?.price || product.price;
  const addOnsTotal = Object.entries(selectedAddOns)
    .filter(([_, selected]) => selected)
    .reduce((total, [key, _]) => total + addOns[key as keyof typeof addOns].price, 0);
  const currentPrice = basePrice + addOnsTotal;

  const handleAddOnChange = (addOnKey: string) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [addOnKey]: !prev[addOnKey]
    }));
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const productImages = product.images || [product.image];

  // Composant accordéon
  const AccordionItem = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isOpen = openAccordion === id;
    return (
      <div className="border-b border-[#e8e0d8]">
        <button
          onClick={() => toggleAccordion(id)}
          className="w-full flex items-center justify-between py-4 text-left hover:bg-[#f5f0eb] px-4 rounded transition-colors"
        >
          <span className="font-medium text-[#2d2a26]">{title}</span>
          <ChevronDown 
            className={`w-5 h-5 text-[#2d2a26] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            isOpen ? 'max-h-[1000px] pb-4' : 'max-h-0'
          }`}
        >
          <div className="px-4">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#faf8f5]">
        {/* Breadcrumb - FOND CRÈME */}
        <div className="bg-[#faf8f5] border-b border-[#e8e0d8] py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <Link href="/" className="text-[#2d2a26] hover:text-[#b8956a] transition-colors">Accueil</Link>
              <span className="mx-2 text-[#2d2a26]">/</span>
              <Link href="/boutique" className="text-[#2d2a26] hover:text-[#b8956a] transition-colors">Boutique</Link>
              <span className="mx-2 text-[#2d2a26]">/</span>
              <Link href={`/boutique?category=${product.category}`} className="text-[#2d2a26] hover:text-[#b8956a] transition-colors">
                {product.category}
              </Link>
              <span className="mx-2 text-[#2d2a26]">/</span>
              <span className="text-[#b8956a]">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* IMAGES (colonne gauche) */}
            <div className="order-1 lg:order-1">
              <div className="relative aspect-square lg:aspect-square aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-white">
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-[#c4a47a] text-white text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
                    PROMO
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-[#c4a47a] text-white text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
                    Best-seller
                  </div>
                )}
              </div>
              
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden bg-white flex-shrink-0 ${
                        selectedImageIndex === index ? 'ring-2 ring-[#b8956a]' : 'border border-[#e8e0d8]'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* INFOS PRODUIT (colonne droite) - ORDRE OPTIMISÉ */}
            <div className="order-2 lg:order-2 space-y-6">
              
              {/* 2. Catégorie */}
              <div>
                <span className="text-[#b8956a] font-medium uppercase tracking-wide text-sm">
                  {product.category}
                </span>
              </div>

              {/* 3. Nom produit */}
              <div>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-[#2d2a26] leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* 4. Avis - étoiles dorées */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#b8956a] fill-current"
                    />
                  ))}
                </div>
                <span className="text-[#2d2a26] text-sm">(27 avis)</span>
              </div>

              {/* 5. Prix - gros, gras */}
              <div>
                <div className="flex items-baseline space-x-3">
                  <span className="font-bold text-3xl lg:text-4xl text-[#2d2a26]">
                    {(product.sizes && product.sizes.length > 1) ? 'Dès ' : ''}{currentPrice.toFixed(2)}€
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice}€
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-[#b8956a] text-sm font-medium mt-1">
                    Économisez {(product.originalPrice - currentPrice).toFixed(2)}€
                  </p>
                )}
              </div>

              {/* 6. Sélection de taille - JUSTE APRÈS le prix */}
              {product.sizes && (
                <div>
                  <h3 className="text-[#2d2a26] font-medium mb-3 text-lg">Taille :</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 border transition-all text-sm ${
                          selectedSize?.name === size.name
                            ? 'border-[#b8956a] bg-[#b8956a] text-white'
                            : 'border-[#e8e0d8] text-[#2d2a26] hover:border-[#b8956a] bg-white'
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variantes si existantes */}
              {product.variants && (
                <div>
                  <h3 className="text-[#2d2a26] font-medium mb-3 text-lg">Variante :</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.name}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-3 border transition-all text-sm ${
                          selectedVariant?.name === variant.name
                            ? 'border-[#b8956a] bg-[#b8956a] text-white'
                            : 'border-[#e8e0d8] text-[#2d2a26] hover:border-[#b8956a] bg-white'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Description courte - 2-3 lignes max */}
              <div>
                <p className="text-[#2d2a26] text-lg leading-relaxed">
                  {product.description.length > 150 
                    ? product.description.substring(0, 150) + '...'
                    : product.description
                  }
                </p>
              </div>

              {/* 8. Quantité + Bouton "Ajouter au panier" */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40">Quantité</span>
                  <div className="flex items-center border border-[#e8e0d8] h-10">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#c4a47a] transition-colors">−</button>
                    <span className="w-10 text-center text-sm text-[#2d2a26]">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#c4a47a] transition-colors">+</button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      alert(`${product.name} (${selectedSize?.name || ''}) × ${quantity} ajouté au panier — ${currentPrice.toFixed(2)}€`);
                    }}
                    className="flex-grow bg-[#c4a47a] text-white py-3.5 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Ajouter au panier — {currentPrice.toFixed(2)}€
                  </button>
                  
                  <button className="w-12 border border-[#e8e0d8] flex items-center justify-center hover:border-[#c4a47a] hover:text-[#c4a47a] transition-colors text-[#2d2a26]/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 9. Badges confiance - grille 2x2 compacte */}
              <div className="bg-white rounded-lg border border-[#e8e0d8] p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m0 0V4.875c0-.621-.504-1.125-1.125-1.125H8.25" /></svg>
                    <span className="text-[#2d2a26]">Livraison France</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                    <span className="text-[#2d2a26]">Fraîcheur 7 jours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                    <span className="text-[#2d2a26]">Carte message offerte</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    <span className="text-[#2d2a26]">Paiement sécurisé</span>
                  </div>
                </div>
              </div>

              {/* 10. Accordéon dépliable */}
              <div className="bg-white rounded-lg border border-[#e8e0d8] divide-y divide-[#e8e0d8]">
                
                {/* Description complète */}
                <AccordionItem id="description" title="Description complète">
                  <div className="space-y-4">
                    <p className="text-[#2d2a26] leading-relaxed">
                      {product.description}
                    </p>
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e8e0d8]">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-[#f5f0eb] text-[#2d2a26] text-sm rounded-full border border-[#e8e0d8]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionItem>

                {/* Carte message gratuite */}
                <AccordionItem id="message" title="💌 Carte message gratuite">
                  <div className="space-y-4">
                    <p className="text-[#2d2a26] text-sm">
                      Écrivez un message qui sera imprimé et livré avec votre bouquet
                    </p>
                    <textarea
                      placeholder="Votre message personnalisé..."
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      className="w-full p-3 text-sm border border-[#e8e0d8] rounded-md focus:ring-2 focus:ring-[#b8956a] focus:border-[#b8956a] bg-[#faf8f5]"
                      rows={3}
                    />
                  </div>
                </AccordionItem>

                {/* Complétez votre cadeau */}
                <AccordionItem id="addons" title="Complétez votre cadeau">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-[#faf8f5] p-3 rounded-lg border border-[#e8e0d8]">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.vase}
                            onChange={() => handleAddOnChange('vase')}
                            className="w-5 h-5 text-[#b8956a] bg-gray-100 border-[#e8e0d8] rounded focus:ring-[#b8956a] focus:ring-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                <span className="font-medium text-[#2d2a26]">Vase en verre artisanal</span>
                              </div>
                              <span className="font-bold text-[#b8956a]">+19,90€</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-7">Vase élégant soufflé à la main</p>
                          </div>
                        </label>
                      </div>

                      <div className="bg-[#faf8f5] p-3 rounded-lg border border-[#e8e0d8]">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.chocolats}
                            onChange={() => handleAddOnChange('chocolats')}
                            className="w-5 h-5 text-[#b8956a] bg-gray-100 border-[#e8e0d8] rounded focus:ring-[#b8956a] focus:ring-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" /></svg>
                                <span className="font-medium text-[#2d2a26]">Boîte de chocolats</span>
                              </div>
                              <span className="font-bold text-[#b8956a]">+14,90€</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-7">Assortiment de chocolats fins français</p>
                          </div>
                        </label>
                      </div>

                      <div className="bg-[#faf8f5] p-3 rounded-lg border border-[#e8e0d8]">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.bougie}
                            onChange={() => handleAddOnChange('bougie')}
                            className="w-5 h-5 text-[#b8956a] bg-gray-100 border-[#e8e0d8] rounded focus:ring-[#b8956a] focus:ring-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg>
                                <span className="font-medium text-[#2d2a26]">Bougie parfumée</span>
                              </div>
                              <span className="font-bold text-[#b8956a]">+12,90€</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-7">Bougie artisanale aux senteurs florales</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                {/* Livraison */}
                <AccordionItem id="shipping" title="Livraison">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <svg className="w-4 h-4 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25" /></svg>
                          <span className="text-sm text-[#2d2a26]">Livraison partout en France</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg className="w-4 h-4 text-[#b8a590]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                          <span className="text-sm text-[#2d2a26]">Fraîcheur garantie 72h</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">↩️</span>
                          <span className="text-sm text-[#2d2a26]">Satisfait ou remplacé</span>
                        </div>
                      </div>
                      <div>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-[#f5f0eb] border border-[#e8e0d8]">
                          <Image
                            src="https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798?v=1747399798"
                            alt="Emballage spécial fleurs fraîches"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                {/* Entretien */}
                <AccordionItem id="care" title="Entretien">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#f5f0eb] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-[#b8956a] text-xl">💧</span>
                      </div>
                      <h4 className="font-medium text-[#2d2a26] mb-2">Hydratation</h4>
                      <p className="text-sm text-gray-600">
                        Changez l'eau tous les 2 jours et recoupez les tiges en biais.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#f5f0eb] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-[#b8956a] text-xl">🌡️</span>
                      </div>
                      <h4 className="font-medium text-[#2d2a26] mb-2">Température</h4>
                      <p className="text-sm text-gray-600">
                        Évitez les sources de chaleur et les courants d'air.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#f5f0eb] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-[#b8956a] text-xl">✂️</span>
                      </div>
                      <h4 className="font-medium text-[#2d2a26] mb-2">Entretien</h4>
                      <p className="text-sm text-gray-600">
                        Retirez les fleurs fanées pour prolonger la durée de vie.
                      </p>
                    </div>
                  </div>
                </AccordionItem>

              </div>
            </div>
          </div>

          {/* Avis clients */}
          {(() => {
            const reviews = getReviewsForProduct(product.slug);
            const avgRating = product.rating || (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length);
            return (
              <section className="mt-16 border-t border-[#e8e0d8] pt-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-2">Avis clients</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'text-[#c4a47a]' : 'text-[#e8e0d8]'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-[#2d2a26]/60">{avgRating.toFixed(1)} — {reviews.length} avis</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-[#e8e0d8]/50 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#f5f0eb] rounded-full flex items-center justify-center text-xs text-[#c4a47a] font-medium">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm text-[#2d2a26] font-medium">{review.author}</p>
                            {review.verified && <p className="text-[10px] text-[#c4a47a]">Achat vérifié</p>}
                          </div>
                        </div>
                        <span className="text-xs text-[#2d2a26]/40">{new Date(review.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex mb-2 ml-11">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-[#c4a47a]' : 'text-[#e8e0d8]'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-[#2d2a26]/70 leading-relaxed ml-11">{review.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* Produits similaires */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="font-serif text-3xl font-bold text-[#2d2a26] mb-8 text-center">
                Produits similaires
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bouton panier sticky sur mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#faf8f5]/95 backdrop-blur-sm border-t border-[#e8e0d8] z-50">
          <button 
            onClick={() => alert(`${product.name} (${selectedSize?.name || ''}) × ${quantity} ajouté au panier — ${currentPrice.toFixed(2)}€`)}
            className="w-full bg-[#c4a47a] text-white py-3.5 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Ajouter au panier — {currentPrice.toFixed(2)}€
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}