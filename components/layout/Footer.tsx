'use client';

import Link from 'next/link';
import { Instagram, Facebook, Video, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2d2a26] pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#b8956a] rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-white">
                  Anne Freret
                </span>
                <span className="text-sm text-[#b8956a]">Fleuriste</span>
              </div>
            </div>
            
            <p className="text-white/70 mb-6 max-w-md">
              Créations florales d'exception à Saint-Pair-sur-Mer. 
              Passion, savoir-faire et élégance pour sublimer vos moments précieux.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#b8956a]" />
                <span className="text-white/80">39 place Générale de Gaulle, Saint-Pair-sur-Mer</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#b8956a]" />
                <span className="text-white/80">02 33 50 26 15</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#b8956a]" />
                <span className="text-white/80">contact@annefreret.fr</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/mariages" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  Mariages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-[#b8956a] transition-colors">
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
                <Link href="/livraison" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/entretien" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  Entretien des fleurs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-white/70 hover:text-[#b8956a] transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h3 className="font-serif text-lg text-white mb-4 text-center">Suivez-nous</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://instagram.com/anne_freret_fleuriste" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#b8956a] hover:text-white transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://facebook.com/fleuristeannefreret" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#b8956a] hover:text-white transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://tiktok.com/@annefreretfleuriste" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#b8956a] hover:text-white transition-colors"
            >
              <Video className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2025 Anne Freret Fleuriste. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;