'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({ productId, onSuccess, onCancel }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [authorName, setAuthorName] = useState(
    user ? `${user.first_name} ${user.last_name}` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      setError('Veuillez sélectionner une note');
      return;
    }

    if (!text.trim()) {
      setError('Veuillez rédiger un avis');
      return;
    }

    if (!authorName.trim()) {
      setError('Veuillez indiquer votre nom');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          user_id: user?.id || null,
          author_name: authorName,
          rating,
          title: title || null,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'avis');
      }

      setSuccess(true);
      
      // Réinitialiser le formulaire
      setTimeout(() => {
        setRating(0);
        setTitle('');
        setText('');
        if (!user) setAuthorName('');
        
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border-2 border-[#b8935a] p-6 md:p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-serif text-xl text-[#2d2a26] mb-2">Merci pour votre avis !</h3>
        <p className="text-sm text-[#2d2a26]/60">
          Votre avis sera publié après vérification.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#e8e0d8] p-6 md:p-8">
      <h3 className="font-serif text-xl text-[#2d2a26] mb-6">Donner votre avis</h3>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#2d2a26] mb-3">
          Votre note <span className="text-[#b8935a]">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="text-3xl transition-all duration-200 hover:scale-110"
            >
              <span
                className={
                  star <= (hoveredRating || rating)
                    ? 'text-[#b8935a]'
                    : 'text-[#e8e0d8]'
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Nom */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#2d2a26] mb-2">
          Votre nom <span className="text-[#b8935a]">*</span>
        </label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full px-4 py-2 border border-[#e8e0d8] focus:border-[#b8935a] focus:outline-none transition-colors"
          placeholder="Prénom N."
          required
        />
      </div>

      {/* Titre */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#2d2a26] mb-2">
          Titre de votre avis (optionnel)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-[#e8e0d8] focus:border-[#b8935a] focus:outline-none transition-colors"
          placeholder="Résumez votre expérience"
          maxLength={200}
        />
      </div>

      {/* Texte */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#2d2a26] mb-2">
          Votre avis <span className="text-[#b8935a]">*</span>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-[#e8e0d8] focus:border-[#b8935a] focus:outline-none transition-colors resize-none"
          placeholder="Partagez votre expérience avec ce produit..."
          required
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-[#e8e0d8] text-[#2d2a26] hover:bg-[#f5f0eb] transition-colors"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-[#2d2a26] text-white hover:bg-[#1a1714] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi...' : 'Publier mon avis'}
        </button>
      </div>

      <p className="text-xs text-[#2d2a26]/40 mt-4 text-center">
        Votre avis sera publié après vérification par notre équipe.
      </p>
    </form>
  );
}
