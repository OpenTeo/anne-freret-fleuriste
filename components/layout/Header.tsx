'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Logo texte style Bergamotte
const Logo = ({ className = '' }: { className?: string }) => (
  <div className={`text-center ${className}`}>
    <div className="font-serif text-[#2d2a26] tracking-[0.35em] uppercase leading-none" style={{ fontWeight: 400 }}>
      Anne Freret
    </div>
    <div className="text-[7px] md:text-[8px] tracking-[0.25em] uppercase text-[#2d2a26]/60 mt-0.5">
      — fleuriste —
    </div>
  </div>
);
// Logo has white background, we use mix-blend-mode to blend it

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const navLinks = [
    { href: '/boutique', label: 'Boutique' },
    { href: '/abonnement', label: 'Abonnement' },
    { href: '/mariages', label: 'Mariages' },
    { href: '/livraison', label: 'Livraison' },
    { href: '/blog', label: 'Blog' },
    { href: '/la-marque', label: 'La marque' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'top-0 bg-[#faf8f5]/95 backdrop-blur-md shadow-sm' : 'top-7 bg-[#faf8f5]'
      }`}>
        {/* Trust bar avis - sous le logo */}
        <div className="border-t border-[#e8e0d8]/50">
          <div className="flex items-center justify-center gap-2 py-1.5">
            <span className="text-[10px] text-[#2d2a26]/40">4.8 / 5</span>
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={`w-2.5 h-2.5 ${s <= 4 ? 'text-[#c4a47a]' : 'text-[#e8e0d8]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-[#2d2a26]/40 uppercase tracking-wider">238 avis clients</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Top bar - desktop */}
          <div className="hidden md:flex items-center justify-between h-20">
            {/* Left nav */}
            <nav className="flex items-center gap-8">
              {navLinks.slice(0, 4).map(link => (
                <Link key={link.href} href={link.href} className="text-[#2d2a26]/80 text-[11px] tracking-[0.15em] uppercase hover:text-[#c4a47a] transition-all duration-500">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo className="text-lg md:text-xl" />
            </Link>

            {/* Right nav */}
            <nav className="flex items-center gap-8">
              {navLinks.slice(4).map(link => (
                <Link key={link.href} href={link.href} className="text-[#2d2a26]/80 text-[11px] tracking-[0.15em] uppercase hover:text-[#c4a47a] transition-all duration-500">
                  {link.label}
                </Link>
              ))}
              <div className="w-px h-4 bg-[#c4a47a]/30 ml-2"></div>
              <Link href="/compte" className="text-[#2d2a26]/80 hover:text-[#c4a47a] transition-all duration-500 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
              <Link href="/panier" className="text-[#2d2a26]/80 hover:text-[#c4a47a] transition-all duration-500 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </nav>
          </div>

          {/* Mobile bar */}
          <div className="flex md:hidden items-center justify-between h-14 border-b border-[#e8e0d8]">
            <button onClick={toggleMenu} className="text-[#2d2a26] p-1">
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <Link href="/" className="flex-shrink-0" onClick={closeMenu}>
              <Logo className="text-base" />
            </Link>

            <div className="flex items-center gap-2">
              <Link href="/compte" className="text-[#2d2a26]/80 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
              <Link href="/panier" className="text-[#2d2a26]/80 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - fullscreen like Bergamotte */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf8f5]">
          <div className="pt-20 px-6">
            <nav className="flex flex-col">
              <Link href="/" onClick={closeMenu} className="text-[#2d2a26] text-[15px] py-4 border-b border-[#c4a47a]/20">
                Accueil
              </Link>
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={closeMenu}
                  className="text-[#2d2a26] text-[15px] py-4 border-b border-[#c4a47a]/20 flex justify-between items-center transition-colors hover:text-[#c4a47a]"
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* Social links in mobile menu */}
            <div className="mt-10 flex gap-6">
              <a href="https://www.instagram.com/anne_freret_fleuriste/" target="_blank" rel="noopener noreferrer" className="text-[#999] text-sm">Instagram</a>
              <a href="https://www.facebook.com/fleuristeannefreret/" target="_blank" rel="noopener noreferrer" className="text-[#999] text-sm">Facebook</a>
              <a href="https://www.tiktok.com/@annefreretfleuriste" target="_blank" rel="noopener noreferrer" className="text-[#999] text-sm">TikTok</a>
            </div>

            <p className="mt-6 text-[#666] text-xs">
              Boutique principale : 39 place Générale de Gaulle, Saint-Pair-sur-Mer
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
