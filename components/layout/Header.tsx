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
    { href: '/mariages', label: 'Mariages' },
    { href: '/diy', label: 'DIY' },
    { href: '/abonnement', label: 'Abonnement' },
    { href: '/livraison', label: 'Livraison' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];
  const navLeft = navLinks.slice(0, 3);
  const navRight = navLinks.slice(3, 6);

  return (
    <>
      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'top-0 bg-[#faf8f5]/95 backdrop-blur-md shadow-sm' : 'top-7 bg-[#faf8f5]'
      }`}>
        {/* border bottom */}
        <div className="border-b border-[#e8e0d8]/30" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Top bar - desktop */}
          <div className="hidden md:block relative h-20">
            {/* Logo — ABSOLUMENT centré au milieu de la page */}
            <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Logo className="text-lg md:text-xl" />
            </Link>

            {/* Left nav — aligné à gauche */}
            <nav className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-5 lg:gap-7">
              {navLeft.map(link => (
                <Link key={link.href} href={link.href} className="text-[#2d2a26]/70 text-[10px] lg:text-[11px] tracking-[0.12em] uppercase hover:text-[#b8935a] transition-all duration-500 whitespace-nowrap">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right nav — aligné à droite */}
            <nav className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-5 lg:gap-7">
              {navRight.map(link => (
                <Link key={link.href} href={link.href} className="text-[#2d2a26]/70 text-[10px] lg:text-[11px] tracking-[0.12em] uppercase hover:text-[#b8935a] transition-all duration-500 whitespace-nowrap">
                  {link.label}
                </Link>
              ))}
              <div className="w-px h-4 bg-[#b8935a]/20 ml-1"></div>
              <Link href="/compte" className="text-[#2d2a26]/70 hover:text-[#b8935a] transition-all duration-500 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
              <Link href="/panier" className="text-[#2d2a26]/80 hover:text-[#b8935a] transition-all duration-500 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </nav>
          </div>

          {/* Mobile bar */}
          <div className="grid md:hidden grid-cols-3 items-center h-14">
            <div className="flex justify-start">
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
            </div>

            <Link href="/" className="flex justify-center" onClick={closeMenu}>
              <Logo className="text-base" />
            </Link>

            <div className="flex items-center justify-end gap-2">
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
              <Link href="/" onClick={closeMenu} className="text-[#2d2a26] text-[14px] py-2.5 border-b border-[#b8935a]/20">
                Accueil
              </Link>
              {[
                { href: '/boutique', label: 'Boutique' },
                { href: '/mariages', label: 'Mariages' },
                { href: '/abonnement', label: 'Abonnement' },
                { href: '/diy', label: 'DIY' },
                { href: '/deuil', label: 'Deuil & Hommages' },
                { href: '/la-marque', label: 'Qui sommes-nous' },
                { href: '/livraison', label: 'Livraison' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={closeMenu}
                  className="text-[#2d2a26] text-[14px] py-2.5 border-b border-[#b8935a]/20 flex justify-between items-center transition-colors hover:text-[#b8935a]"
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
              39 Place du Général de Gaulle, 50270 Saint-Pair-sur-Mer
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
