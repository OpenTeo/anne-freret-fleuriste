'use client';

import { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';

interface Review {
  id: string;
  author_name: string;
  rating: number;
  title: string | null;
  text: string;
  verified_purchase: boolean;
  created_at: string;
}

interface ReviewStats {
  total: number;
  average: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadReviews = async () => {
    try {
      // Charger les avis
      const reviewsRes = await fetch(`/api/reviews?productId=${productId}`);
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData.reviews || []);

      // Charger les stats
      const statsRes = await fetch(`/api/reviews/stats?productId=${productId}`);
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (error) {
      console.error('Erreur chargement avis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'text-[#b8935a]' : 'text-[#e8e0d8]'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderDistribution = () => {
    if (!stats || stats.total === 0) return null;

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = stats.distribution[star as keyof typeof stats.distribution];
          const percentage = (count / stats.total) * 100;

          return (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="text-[#2d2a26]/60 w-8">{star}★</span>
              <div className="flex-1 h-2 bg-[#e8e0d8] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[#b8935a] transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-[#2d2a26]/60 w-8 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-[#2d2a26]/40">
        Chargement des avis...
      </div>
    );
  }

  return (
    <div className="py-12 border-t border-[#e8e0d8]">
      <div className="max-w-4xl mx-auto">
        {/* Header avec stats */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-6">
            Avis clients
          </h2>

          {stats && stats.total > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Note moyenne */}
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <span className="text-4xl font-serif text-[#2d2a26]">
                    {stats.average.toFixed(1)}
                  </span>
                  <div>
                    {renderStars(Math.round(stats.average))}
                    <p className="text-sm text-[#2d2a26]/60 mt-1">
                      {stats.total} avis
                    </p>
                  </div>
                </div>
              </div>

              {/* Distribution */}
              <div>{renderDistribution()}</div>
            </div>
          ) : (
            <p className="text-[#2d2a26]/60 mb-6">Aucun avis pour le moment.</p>
          )}

          {/* Bouton laisser un avis */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-[#2d2a26] text-white hover:bg-[#1a1714] transition-colors"
            >
              {stats && stats.total > 0
                ? 'Laisser un avis'
                : 'Soyez le premier à donner votre avis'}
            </button>
          )}
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="mb-8">
            <ReviewForm
              productId={productId}
              onSuccess={() => {
                setShowForm(false);
                loadReviews();
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Liste des avis */}
        {reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-[#e8e0d8] p-6 bg-white"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-[#2d2a26]">
                        {review.author_name}
                      </p>
                      {review.verified_purchase && (
                        <span className="text-xs px-2 py-1 bg-[#b8935a]/10 text-[#b8935a] border border-[#b8935a]/20">
                          Achat vérifié
                        </span>
                      )}
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <time className="text-sm text-[#2d2a26]/60">
                    {formatDate(review.created_at)}
                  </time>
                </div>

                {/* Titre */}
                {review.title && (
                  <h4 className="font-medium text-[#2d2a26] mb-2">
                    {review.title}
                  </h4>
                )}

                {/* Texte */}
                <p className="text-[#2d2a26]/80 leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
