'use client';

import Link from 'next/link';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function AuthPromptModal({ isOpen, onClose, title, message }: AuthPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#2d2a26]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#faf8f5] border border-[#e8e0d8] p-8 md:p-10 max-w-md w-full mx-4 shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2d2a26]/30 hover:text-[#2d2a26] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative line */}
        <div className="w-10 h-px bg-[#c4a47a] mx-auto mb-6" />

        <h2 className="font-serif text-xl text-[#2d2a26] text-center mb-3">
          {title || 'Connectez-vous'}
        </h2>

        <p className="text-sm text-[#2d2a26]/60 text-center font-light leading-relaxed mb-8">
          {message || 'Connectez-vous pour sauvegarder vos favoris et retrouver votre selection a tout moment.'}
        </p>

        <div className="space-y-3">
          <Link
            href="/compte/connexion"
            className="block w-full bg-[#c4a47a] text-white py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors text-center"
          >
            Se connecter
          </Link>

          <Link
            href="/compte/inscription"
            className="block w-full border border-[#2d2a26] text-[#2d2a26] py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#2d2a26] hover:text-white transition-colors text-center"
          >
            Creer un compte
          </Link>
        </div>

        <button
          onClick={onClose}
          className="block w-full text-center mt-4 text-xs text-[#2d2a26]/40 hover:text-[#2d2a26]/60 transition-colors"
        >
          Non merci, continuer
        </button>
      </div>
    </div>
  );
}
