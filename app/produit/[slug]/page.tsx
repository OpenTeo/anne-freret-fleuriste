'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { mockProducts } from '@/lib/mock-data';
import { Heart, ShoppingCart, Minus, Plus, Truck, Gift, Shield, Star } from 'lucide-react';

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
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
    vase: { name: 'Vase en verre artisanal', price: 19.90, icon: '🏺' },
    chocolats: { name: 'Boîte de chocolats', price: 14.90, icon: '🍫' },
    bougie: { name: 'Bougie parfumée', price: 12.90, icon: '🕯️' }
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

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const productImages = product.images || [product.image];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary">
        {/* Breadcrumb */}
        <div className="bg-primary text-secondary py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span className="mx-2">/</span>
              <Link href="/boutique" className="hover:text-accent transition-colors">Boutique</Link>
              <span className="mx-2">/</span>
              <Link href={`/boutique?category=${product.category}`} className="hover:text-accent transition-colors">
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-accent">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Images */}
            <div>
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-accent text-primary text-sm font-bold px-3 py-1 rounded-full">
                    PROMO
                  </div>
                )}
              </div>
              
              {productImages.length > 1 && (
                <div className="flex space-x-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                        selectedImageIndex === index ? 'ring-2 ring-accent' : ''
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

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="text-accent font-medium uppercase tracking-wider text-sm">
                  {product.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
                  {product.name}
                </h1>
                
                {/* Rating (mock) */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-accent fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">(27 avis)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-3xl text-primary">
                    {(product.sizes || product.variants) && !selectedSize ? 'à partir de ' : ''}{currentPrice}€
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted line-through">
                      {product.originalPrice}€
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-accent text-sm font-medium">
                    Économisez {product.originalPrice - currentPrice}€
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-muted leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Complétez votre cadeau section */}
              <div className="mb-8 p-6 bg-[#faf8f5] rounded-lg border border-[#e8e0d8]">
                <h3 className="text-primary font-serif font-bold text-xl mb-6 text-center">
                  Complétez votre cadeau
                </h3>
                <div className="space-y-4">
                  {/* Carte message personnalisée */}
                  <div className="bg-white p-4 rounded-lg border border-[#e8e0d8]">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="carte-message"
                          defaultChecked
                          disabled
                          className="w-5 h-5 text-[#b8956a] bg-gray-100 border-[#e8e0d8] rounded focus:ring-[#b8956a] focus:ring-2"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">💌</span>
                          <span className="font-semibold text-primary">Carte message personnalisée</span>
                          <span className="text-sm bg-[#b8956a] text-white px-2 py-1 rounded-full">Inclus</span>
                        </div>
                        <p className="text-sm text-muted mb-3">
                          Écrivez un message qui sera imprimé et livré avec votre bouquet
                        </p>
                        <textarea
                          placeholder="Votre message personnalisé..."
                          value={personalMessage}
                          onChange={(e) => setPersonalMessage(e.target.value)}
                          className="w-full p-3 text-sm border border-[#e8e0d8] rounded-md focus:ring-2 focus:ring-[#b8956a] focus:border-[#b8956a]"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Autres add-ons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-[#e8e0d8]">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.vase}
                          onChange={() => handleAddOnChange('vase')}
                          className="w-5 h-5 text-[#b8956a] bg-gray-100 border-[#e8e0d8] rounded focus:ring-[#b8956a] focus:ring-2"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">🏺</span>
                              <span className="font-semibold text-primary text-sm lg:text-base">Vase en verre artisanal</span>
                            </div>
                            <span className="font-bold text-[#b8956a]">+19,90€</span>
                          </div>
                          <p className="text-xs lg:text-sm text-muted">Vase élégant soufflé à la main</p>
                        </div>
                      </label>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-[#e8e0d8]">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.chocolats}
                          onChange={() => handleAddOnChange('chocolats')}
                          className="w-5 h-5 text-[#b8956a] bg-gray-100 border-[#e8e0d8] rounded focus:ring-[#b8956a] focus:ring-2"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">🍫</span>
                              <span className="font-semibold text-primary text-sm lg:text-base">Boîte de chocolats</span>
                            </div>
                            <span className="font-bold text-[#b8956a]">+14,90€</span>
                          </div>
                          <p className="text-xs lg:text-sm text-muted">Assortiment de chocolats fins français</p>
                        </div>
                      </label>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-[#e8e0d8] md:col-span-2 lg:col-span-1 xl:col-span-2">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.bougie}
                          onChange={() => handleAddOnChange('bougie')}
                          className="w-5 h-5 text-[#b8956a] bg-gray-100 border-[#e8e0d8] rounded focus:ring-[#b8956a] focus:ring-2"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">🕯️</span>
                              <span className="font-semibold text-primary text-sm lg:text-base">Bougie parfumée</span>
                            </div>
                            <span className="font-bold text-[#b8956a]">+12,90€</span>
                          </div>
                          <p className="text-xs lg:text-sm text-muted">Bougie artisanale aux senteurs florales</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info livraison section */}
              <div className="mb-8 p-6 bg-[#faf8f5] rounded-lg border border-[#e8e0d8]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-primary font-serif font-bold text-lg mb-4">Informations livraison</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🚚</span>
                        <span className="text-sm text-primary">Livraison partout en France</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🌿</span>
                        <span className="text-sm text-primary">Fraîcheur garantie 72h</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">↩️</span>
                        <span className="text-sm text-primary">Satisfait ou remplacé</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-primary font-semibold text-sm mb-3 flex items-center space-x-2">
                      <span className="text-lg">📦</span>
                      <span>Emballage spécial fleurs fraîches</span>
                    </h4>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-white border border-[#e8e0d8]">
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

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary text-secondary text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="text-primary font-medium mb-3">Taille :</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full border-2 transition-all ${
                          selectedSize?.name === size.name
                            ? 'border-accent bg-accent text-primary'
                            : 'border-primary text-primary hover:border-accent'
                        }`}
                      >
                        {size.name} - {size.price}€
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selection */}
              {product.variants && (
                <div className="mb-6">
                  <h3 className="text-primary font-medium mb-3">Variante :</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.name}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 rounded-full border-2 transition-all ${
                          selectedVariant?.name === variant.name
                            ? 'border-accent bg-accent text-primary'
                            : 'border-primary text-primary hover:border-accent'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-primary font-medium">Quantité :</span>
                  <div className="flex items-center space-x-3 bg-primary rounded-full p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center text-secondary font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="w-full sm:flex-1 bg-accent text-primary font-semibold py-4 px-6 rounded-full hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart size={20} />
                    <span>Ajouter au panier</span>
                  </button>
                  
                  <button className="w-full sm:w-auto border-2 border-primary text-primary p-4 rounded-full hover:bg-primary hover:text-secondary transition-colors flex items-center justify-center">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Product Features */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Truck className="text-accent" size={18} />
                  <span>Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Gift className="text-accent" size={18} />
                  <span>Emballage cadeau offert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="text-accent" size={18} />
                  <span>Fraîcheur garantie 7 jours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
                Produits similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Product Care Section */}
        <section className="bg-primary text-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold mb-6">
                Conseils d'entretien
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent text-2xl">💧</span>
                  </div>
                  <h3 className="font-semibold mb-2">Hydratation</h3>
                  <p className="text-sm text-secondary/80">
                    Changez l'eau tous les 2 jours et recoupez les tiges en biais.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent text-2xl">🌡️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Température</h3>
                  <p className="text-sm text-secondary/80">
                    Évitez les sources de chaleur et les courants d'air.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent text-2xl">✂️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Entretien</h3>
                  <p className="text-sm text-secondary/80">
                    Retirez les fleurs fanées pour prolonger la durée de vie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}