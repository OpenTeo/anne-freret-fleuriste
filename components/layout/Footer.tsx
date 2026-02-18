'use client';

import Link from 'next/link';
import { Instagram, Facebook, Video, MapPin, Phone, Mail, Store } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1714] pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="font-serif text-xl text-[#faf8f5] tracking-[0.35em] uppercase leading-none">
                Anne Freret
              </div>
              <div className="text-[8px] tracking-[0.25em] uppercase text-[#faf8f5]/40 mt-1">
                — fleuriste · Saint-Pair-sur-Mer —
              </div>
            </div>
            
            <p className="text-white/70 mb-6 max-w-md">
              Créations florales d'exception à Saint-Pair-sur-Mer. 
              Passion, savoir-faire et élégance pour sublimer vos moments précieux.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#b8935a]" />
                <span className="text-white/80">39 Place du Général de Gaulle, Saint-Pair-sur-Mer</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#b8935a]" />
                <span className="text-white/80">02 33 50 26 15</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#b8935a]" />
                <span className="text-white/80">contact@fleuriste-annefreret.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/mariages" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  Mariages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/livraison" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/entretien" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  Entretien des fleurs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-white/70 hover:text-[#b8935a] transition-all duration-500 text-[11px] tracking-wide uppercase">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Nos Boutiques */}
        <div className="mb-12">
          <h3 className="font-serif text-lg text-white mb-6">Nos Boutiques</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <Store className="w-4 h-4 text-[#b8935a] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white/80 text-sm block">Saint-Pair-sur-Mer</span>
                <span className="text-white/50 text-xs">02 33 50 26 15</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Store className="w-4 h-4 text-[#b8935a] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white/80 text-sm block">Jullouville</span>
                <span className="text-white/50 text-xs">02 33 91 71 07</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Store className="w-4 h-4 text-[#b8935a] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white/80 text-sm block">Yquelon</span>
                <span className="text-white/50 text-xs">02 61 90 04 00</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Store className="w-4 h-4 text-[#b8935a] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white/80 text-sm block">Dol-de-Bretagne</span>
                <span className="text-white/50 text-xs">02 99 48 03 63</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gold separator */}
        <div className="flex justify-center mb-8">
          <div className="gold-separator"></div>
        </div>

        {/* Social Media */}
        <div className="pt-8 mb-8">
          <h3 className="font-serif text-lg text-white mb-4 text-center">Suivez-nous</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://instagram.com/anne_freret_fleuriste" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#b8935a] hover:text-white transition-all duration-500"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://facebook.com/fleuristeannefreret" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#b8935a] hover:text-white transition-all duration-500"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://tiktok.com/@annefreretfleuriste" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#b8935a] hover:text-white transition-all duration-500"
            >
              <Video className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#b8935a]/20 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2025 Anne Freret Fleuriste. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;