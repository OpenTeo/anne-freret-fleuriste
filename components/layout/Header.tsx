'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const LOGO_URL = '/logo-transparent.png';
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
    { href: '/livraison', label: 'Livraison' },
    { href: '/blog', label: 'Blog' },
    { href: '/la-marque', label: 'La marque' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#b8956a]/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Top bar - desktop */}
          <div className="hidden md:flex items-center justify-between h-20">
            {/* Left nav */}
            <nav className="flex items-center gap-6">
              {navLinks.slice(0, 3).map(link => (
                <Link key={link.href} href={link.href} className="text-[#2d2a26]/80 text-[13px] tracking-wide hover:text-[#b8956a] transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <Link href="/" className="flex-shrink-0">
              <img src={LOGO_URL} alt="Anne Freret Fleuriste" className="h-14 w-auto object-contain " />
            </Link>

            {/* Right nav */}
            <nav className="flex items-center gap-6">
              {navLinks.slice(3).map(link => (
                <Link key={link.href} href={link.href} className="text-[#2d2a26]/80 text-[13px] tracking-wide hover:text-[#b8956a] transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/panier" className="text-[#2d2a26]/80 hover:text-[#b8956a] transition-colors ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </nav>
          </div>

          {/* Mobile bar */}
          <div className="flex md:hidden items-center justify-between h-16">
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
              <img src={LOGO_URL} alt="Anne Freret" className="h-10 w-auto object-contain " />
            </Link>

            <Link href="/panier" className="text-[#2d2a26]/80 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu - fullscreen like Bergamotte */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf8f5]">
          <div className="pt-20 px-6">
            <nav className="flex flex-col">
              <Link href="/" onClick={closeMenu} className="text-[#2d2a26] text-[15px] py-4 border-b border-[#b8956a]/20">
                Accueil
              </Link>
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={closeMenu}
                  className="text-[#2d2a26] text-[15px] py-4 border-b border-[#b8956a]/20 flex justify-between items-center"
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#b8956a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
