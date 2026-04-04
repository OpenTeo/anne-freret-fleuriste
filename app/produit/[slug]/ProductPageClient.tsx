'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import AuthPromptModal from '@/components/ui/AuthPromptModal';
import { useAuth } from '@/lib/auth-context';
import RibbonConfigurator from '@/components/ui/RibbonConfigurator';
import CardSelector from '@/components/ui/CardSelector';
import ProductReviews from '@/components/reviews/ProductReviews';
// No lucide imports — using inline SVGs for consistency

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  original_price?: number;
  image: string;
  images?: string[];
  featured: boolean;
  inStock: boolean;
  in_stock: boolean;
  tags: string[];
  sizes?: Array<{ name: string; price: number }>;
  variants?: Array<{ name: string; price?: number }>;
  rating?: number;
  reviewCount?: number;
  review_count?: number;
}

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPageClient({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number } | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{ name: string; price?: number } | null>(null);
  const [personalMessage, setPersonalMessage] = useState('');
  const [selectedCardImage, setSelectedCardImage] = useState<string | null>(null);
  const [ribbonText, setRibbonText] = useState('');
  const [ribbonColor, setRibbonColor] = useState('or');
  const [ribbonEnabled, setRibbonEnabled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({
    vase: false,
    chocolats: false,
    bougie: false
  });

  // État pour les accordéons
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Charger le produit depuis l'API
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const foundProduct = (data.products || []).find((p: any) => p.slug === params.slug);
        
        if (foundProduct) {
          // Normaliser les données
          const normalized = {
            ...foundProduct,
            image: foundProduct.images?.[0] || '',
            inStock: foundProduct.in_stock ?? true,
            reviewCount: foundProduct.review_count || 0,
            originalPrice: foundProduct.original_price,
            tags: foundProduct.tags || [],
          };
          setProduct(normalized);

          // Charger les produits similaires
          const related = (data.products || [])
            .filter((p: any) => p.category === foundProduct.category && p.id !== foundProduct.id && p.is_active)
            .slice(0, 3)
            .map((p: any) => ({
              ...p,
              image: p.images?.[0] || '',
              inStock: p.in_stock ?? true,
              reviewCount: p.review_count || 0,
              tags: p.tags || [],
            }));
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Erreur chargement produit:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [params.slug]);

  // Initialiser la sélection par défaut
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.variants && product.variants.length > 0 && !selectedVariant) {
        setSelectedVariant(product.variants[0]);
      }
    }
  }, [product]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
          <div className="text-[#2d2a26]/60">Chargement...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    notFound();
  }

  // Calculer le prix actuel avec add-ons
  const addOns = {
    vase: { name: 'Vase en verre artisanal', price: 19.90 },
    chocolats: { name: 'Boîte de chocolats', price: 14.90 },
    bougie: { name: 'Bougie parfumée', price: 12.90 }
  };
  
  const basePrice = Number(selectedSize?.price || product.price);
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

  const productImages = product.images || [product.image];

  // Composant accordéon
  const AccordionItem = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isOpen = openAccordion === id;
    return (
      <div className="border-b border-[#e8e0d8]/60">
        <button
          onClick={() => toggleAccordion(id)}
          className="w-full flex items-center justify-between py-4 text-left px-4 transition-colors group"
        >
          <span className="text-sm text-[#2d2a26] group-hover:text-[#b8935a] transition-colors">{title}</span>
          <svg 
            className={`w-4 h-4 text-[#b8935a]/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[1000px] pb-5' : 'max-h-0'
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
        <div className="bg-[#faf8f5] py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs text-[#2d2a26]/40">
              <Link href="/" className="hover:text-[#b8935a] transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/boutique" className="hover:text-[#b8935a] transition-colors">Boutique</Link>
              <span>/</span>
              <Link href={`/boutique?category=${product.category}`} className="hover:text-[#b8935a] transition-colors">{product.category}</Link>
              <span>/</span>
              <span className="text-[#2d2a26]/60">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* IMAGES (colonne gauche) */}
            <div className="order-1 lg:order-1 lg:sticky lg:top-8 lg:self-start">
              <div className="relative aspect-square lg:aspect-square aspect-[3/4] mb-4 overflow-hidden bg-white">
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-[#b8935a] text-white text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
                    PROMO
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-[#b8935a] text-white text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
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
                      className={`relative w-16 h-16 lg:w-20 lg:h-20 overflow-hidden bg-white flex-shrink-0 ${
                        selectedImageIndex === index ? 'border-2 border-[#b8935a]' : 'border border-[#e8e0d8]'
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
              
              {/* Catégorie */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a]">
                {product.category}
              </p>

              {/* Nom produit */}
              <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] leading-tight -mt-2">
                {product.name}
              </h1>

              {/* Avis */}
              <div className="flex items-center gap-2 -mt-2">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3.5 h-3.5 text-[#b8935a]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-[#2d2a26]/40">27 avis</span>
              </div>

              {/* Prix */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-serif text-[#2d2a26]">
                    {(product.sizes && product.sizes.length > 1) ? 'Dès ' : ''}{currentPrice.toFixed(2)}€
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#2d2a26]/30 line-through">
                      {product.originalPrice}€
                    </span>
                  )}
                </div>
              </div>

              {/* 6. Sélection de taille - JUSTE APRÈS le prix */}
              {product.sizes && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-2">Taille</h3>
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
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-2">Variante</h3>
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

              {/* Description */}
              <p className="text-sm text-[#2d2a26]/60 font-light leading-relaxed">
                {product.description}
              </p>

              {/* ——— CARTE MESSAGE — visible directement, SAUF Deuil ——— */}
              {product.category !== 'Deuil & Hommages' && (
                <div className="pt-2 pb-4 border-b border-[#e8e0d8]/60">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40">Ajouter une carte artisanale</h3>
                    <span className="text-xs text-[#b8935a]">+ 4,99 €</span>
                  </div>
                  <CardSelector
                    selectedCard={selectedCardImage}
                    onSelect={setSelectedCardImage}
                  />
                </div>
              )}

              {/* ——— ADD-ONS — visible directement, SAUF Deuil ——— */}
              {product.category !== 'Deuil & Hommages' && (
                <div className="pt-2 pb-4 border-b border-[#e8e0d8]/60">
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-3">Complétez votre cadeau</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'vase', name: 'Vase artisanal', price: 19.90, image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=300&q=85', desc: 'Céramique fait main' },
                      { key: 'chocolats', name: 'Chocolats artisanaux', price: 14.90, image: '/chocolats-addon.jpg', desc: 'Coffret normand' },
                      { key: 'bougie', name: 'Bougie parfumée', price: 12.90, image: '/bougie-addon.jpg', desc: 'Cire de soja naturelle' },
                    ].map(addon => (
                      <button
                        key={addon.key}
                        onClick={() => handleAddOnChange(addon.key)}
                        className={`text-left border transition-all ${
                          selectedAddOns[addon.key as keyof typeof selectedAddOns]
                            ? 'border-[#b8935a] bg-[#b8935a]/5'
                            : 'border-[#e8e0d8]/50 hover:border-[#b8935a]/50'
                        }`}
                      >
                        <div className="relative aspect-square overflow-hidden bg-[#f5f0eb]">
                          <Image src={addon.image} alt={addon.name} fill className="object-cover" sizes="120px" />
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs text-[#2d2a26] leading-tight mb-0.5">{addon.name}</p>
                          <p className="text-[10px] text-[#2d2a26]/30">{addon.desc}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-[#b8935a] font-medium">+{addon.price.toFixed(2)}€</span>
                            {selectedAddOns[addon.key as keyof typeof selectedAddOns] && (
                              <svg className="w-3.5 h-3.5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Quantité + Bouton "Ajouter au panier" */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40">Quantité</span>
                  <div className="flex items-center border border-[#e8e0d8] h-10">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#b8935a] transition-colors">−</button>
                    <span className="w-10 text-center text-sm text-[#2d2a26]">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#b8935a] transition-colors">+</button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      const cart = JSON.parse(localStorage.getItem('af-cart') || '[]');
                      const newItem = {
                        id: product.id + '-' + (selectedSize?.name || 'default'),
                        name: product.name,
                        size: selectedSize?.name || 'Standard',
                        price: currentPrice,
                        quantity: quantity,
                        image: product.image,
                        category: product.category || 'Bouquets',
                      };
                      const existingIndex = cart.findIndex((item: any) => item.id === newItem.id);
                      if (existingIndex >= 0) {
                        cart[existingIndex].quantity += quantity;
                      } else {
                        cart.push(newItem);
                      }
                      localStorage.setItem('af-cart', JSON.stringify(cart));
                      window.location.href = '/panier';
                    }}
                    className="flex-grow bg-[#b8935a] text-white py-3.5 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Ajouter au panier — {currentPrice.toFixed(2)}€
                  </button>
                  
                  <button
                    onClick={() => {
                      if (user) {
                        const key = `favorites-${user.id}`;
                        const favs: string[] = JSON.parse(localStorage.getItem(key) || '[]');
                        if (favs.includes(product.id)) {
                          localStorage.setItem(key, JSON.stringify(favs.filter(f => f !== product.id)));
                          setIsFavorited(false);
                        } else {
                          favs.push(product.id);
                          localStorage.setItem(key, JSON.stringify(favs));
                          setIsFavorited(true);
                        }
                      } else {
                        // Store as guest favorite
                        const guestFavs: string[] = JSON.parse(localStorage.getItem('favorites-guest') || '[]');
                        if (!guestFavs.includes(product.id)) {
                          guestFavs.push(product.id);
                          localStorage.setItem('favorites-guest', JSON.stringify(guestFavs));
                        }
                        setShowAuthModal(true);
                      }
                    }}
                    className={`w-12 border flex items-center justify-center transition-colors ${
                      isFavorited
                        ? 'border-[#b8935a] text-[#b8935a]'
                        : 'border-[#e8e0d8] text-[#2d2a26]/30 hover:border-[#b8935a] hover:text-[#b8935a]'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 9. Badges confiance - grille 2x2 compacte */}
              <div className="border border-[#e8e0d8]/60 p-4">
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
              <div className="border-t border-[#e8e0d8]/60">
                
                {/* Ruban personnalisé — uniquement pour Deuil & Hommages (VISIBLE, pas dans accordéon) */}
                {product.category === 'Deuil & Hommages' && (
                  <div className="py-6 border-b border-[#e8e0d8]/60">
                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ribbonEnabled}
                          onChange={(e) => setRibbonEnabled(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-[#e8e0d8] peer-checked:bg-[#b8935a] relative transition-colors">
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white transition-transform ${ribbonEnabled ? 'translate-x-4' : ''}`} />
                        </div>
                        <span className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40">Ajouter un ruban personnalisé</span>
                      </label>
                      <span className="text-sm text-[#b8935a]">+ 7,99 €</span>
                    </div>
                    {ribbonEnabled && (
                      <RibbonConfigurator
                        ribbonText={ribbonText}
                        setRibbonText={setRibbonText}
                        ribbonColor={ribbonColor}
                        setRibbonColor={setRibbonColor}
                      />
                    )}
                  </div>
                )}

                {/* Message de condoléances — uniquement pour Deuil */}
                {product.category === 'Deuil & Hommages' && (
                  <div className="py-6 border-b border-[#e8e0d8]/60">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-[#2d2a26]/40 mb-3">Message de condoléances</h3>
                    <textarea
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      placeholder="Votre message pour accompagner la composition..."
                      rows={3}
                      maxLength={200}
                      className="w-full px-3 py-2.5 border border-[#e8e0d8] text-[16px] text-[#2d2a26] font-light focus:outline-none focus:border-[#b8935a] transition-colors resize-none placeholder:text-[#2d2a26]/25"
                    />
                    <p className="text-[10px] text-right mt-1 text-[#2d2a26]/30">{personalMessage.length}/200</p>
                  </div>
                )}

                {/* Carte message + add-ons déplacés plus haut (avant le bouton panier) */}

                {/* Livraison */}
                <AccordionItem id="shipping" title="Livraison">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <div>
                        <p className="text-sm text-[#2d2a26] mb-0.5">Livraison partout en France</p>
                        <p className="text-xs text-[#2d2a26]/40 font-light">Locale 24h · Colissimo 48h · Chronopost express 24h</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                      <div>
                        <p className="text-sm text-[#2d2a26] mb-0.5">Fraîcheur garantie 7 jours</p>
                        <p className="text-xs text-[#2d2a26]/40 font-light">Bouquet remplacé si vous n&#39;êtes pas satisfait</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m0-13.5h3.75M12 7.5H8.25" />
                      </svg>
                      <div>
                        <p className="text-sm text-[#2d2a26] mb-0.5">Emballage soigné</p>
                        <p className="text-xs text-[#2d2a26]/40 font-light">Protection sur mesure pour préserver la fraîcheur</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>
                      <div>
                        <p className="text-sm text-[#2d2a26] mb-0.5">Livraison offerte des 60€</p>
                        <p className="text-xs text-[#2d2a26]/40 font-light">Locale : 6-10€ · Colissimo : 12,90€ · Chronopost : 18,90€</p>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                {/* Entretien */}
                <AccordionItem id="care" title="Entretien">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c3.5 0 6-3.13 6-7 0-4.5-6-11-6-11S6 9.5 6 14c0 3.87 2.5 7 6 7z" />
                      </svg>
                      <div>
                        <p className="text-sm text-[#2d2a26] font-medium mb-0.5">Hydratation</p>
                        <p className="text-xs text-[#2d2a26]/50 leading-relaxed">Changez l&#39;eau tous les 2 jours et recoupez les tiges en biais.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-[#2d2a26] font-medium mb-0.5">Température</p>
                        <p className="text-xs text-[#2d2a26]/50 leading-relaxed">Évitez les sources de chaleur directe et les courants d&#39;air.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
                      </svg>
                      <div>
                        <p className="text-sm text-[#2d2a26] font-medium mb-0.5">Entretien</p>
                        <p className="text-xs text-[#2d2a26]/50 leading-relaxed">Retirez les fleurs fanées pour prolonger la durée de vie du bouquet.</p>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

              </div>
            </div>
          </div>

          {/* Avis clients */}
          <ProductReviews productId={product.id} />

          {/* Produits similaires */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="font-serif text-2xl text-[#2d2a26] mb-8 text-center">
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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 px-5 pt-3 pb-8 bg-[#faf8f5]/95 backdrop-blur-sm border-t border-[#e8e0d8] z-50" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}>
          <button 
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem('af-cart') || '[]');
              const newItem = {
                id: product.id + '-' + (selectedSize?.name || 'default'),
                name: product.name,
                size: selectedSize?.name || 'Standard',
                price: currentPrice,
                quantity: quantity,
                image: product.image,
                category: product.category || 'Bouquets',
              };
              const existingIndex = cart.findIndex((item: any) => item.id === newItem.id);
              if (existingIndex >= 0) {
                cart[existingIndex].quantity += quantity;
              } else {
                cart.push(newItem);
              }
              localStorage.setItem('af-cart', JSON.stringify(cart));
              window.location.href = '/panier';
            }}
            className="w-full bg-[#b8935a] text-white py-3.5 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Ajouter au panier — {currentPrice.toFixed(2)}€
          </button>
        </div>
      </main>
      <Footer />

      <AuthPromptModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Sauvegardez vos favoris"
        message="Connectez-vous pour sauvegarder vos favoris et retrouver votre selection a tout moment."
      />
    </>
  );
}