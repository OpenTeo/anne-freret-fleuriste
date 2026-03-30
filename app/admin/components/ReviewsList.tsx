'use client';

import { useEffect, useState } from 'react';

interface Review {
  id: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  author_name: string;
  rating: number;
  title: string | null;
  text: string;
  verified_purchase: boolean;
  featured: boolean;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Approuvé', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejeté', color: 'bg-red-100 text-red-800' },
};

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadReviews = async () => {
    try {
      const res = await fetch('/api/reviews?all=true');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Erreur chargement avis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const updateStatus = async (reviewId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        loadReviews();
      }
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const toggleFeatured = async (reviewId: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured }),
      });

      if (res.ok) {
        loadReviews();
      }
    } catch (error) {
      console.error('Erreur toggle featured:', error);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Supprimer définitivement cet avis ?')) return;

    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadReviews();
      }
    } catch (error) {
      console.error('Erreur suppression avis:', error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-[#b8935a]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? '' : 'opacity-30'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(
    (r) => statusFilter === 'all' || r.status === statusFilter
  );

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex gap-2 flex-wrap items-center">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 text-sm rounded transition-all ${
            statusFilter === 'all'
              ? 'bg-[#b8935a] text-white'
              : 'bg-white text-[#2d2a26] border border-[#e8e0d8] hover:border-[#b8935a]'
          }`}
        >
          Tous ({reviews.length})
        </button>
        {Object.entries(statusLabels).map(([key, { label }]) => {
          const count = reviews.filter((r) => r.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-3 py-1.5 text-sm rounded transition-all relative ${
                statusFilter === key
                  ? 'bg-[#b8935a] text-white'
                  : 'bg-white text-[#2d2a26] border border-[#e8e0d8] hover:border-[#b8935a]'
              }`}
            >
              {label} ({count})
              {key === 'pending' && count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white border border-[#e8e0d8] p-12 text-center">
            <p className="text-[#2d2a26]/40">Aucun avis</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-[#e8e0d8] p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-[#2d2a26]">
                      {review.author_name}
                    </h3>
                    {review.verified_purchase && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">
                        Achat vérifié
                      </span>
                    )}
                    {review.featured && (
                      <span className="text-xs px-2 py-0.5 bg-[#b8935a]/20 text-[#b8935a] rounded">
                        Mis en avant
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/60">
                    <span className="font-medium">{review.product_name}</span>
                    <span>•</span>
                    <time>
                      {new Date(review.created_at).toLocaleDateString('fr-FR')}
                    </time>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${
                      statusLabels[review.status]?.color
                    }`}
                  >
                    {statusLabels[review.status]?.label}
                  </span>
                </div>
              </div>

              {/* Title */}
              {review.title && (
                <h4 className="font-medium text-[#2d2a26] mb-2">
                  {review.title}
                </h4>
              )}

              {/* Text */}
              <p className="text-[#2d2a26]/80 mb-4 leading-relaxed">
                {review.text}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e8e0d8]">
                {review.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(review.id, 'approved')}
                      className="px-3 py-1.5 text-sm bg-green-600 text-white hover:bg-green-700 rounded transition-colors"
                    >
                      Approuver
                    </button>
                    <button
                      onClick={() => updateStatus(review.id, 'rejected')}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white hover:bg-red-700 rounded transition-colors"
                    >
                      Rejeter
                    </button>
                  </>
                )}

                {review.status === 'approved' && (
                  <button
                    onClick={() => toggleFeatured(review.id, review.featured)}
                    className={`px-3 py-1.5 text-sm rounded transition-colors ${
                      review.featured
                        ? 'bg-[#b8935a] text-white hover:bg-[#a07d4a]'
                        : 'bg-white text-[#2d2a26] border border-[#e8e0d8] hover:border-[#b8935a]'
                    }`}
                  >
                    {review.featured ? 'Retirer de la homepage' : 'Mettre en avant'}
                  </button>
                )}

                {review.status === 'rejected' && (
                  <button
                    onClick={() => updateStatus(review.id, 'approved')}
                    className="px-3 py-1.5 text-sm bg-green-600 text-white hover:bg-green-700 rounded transition-colors"
                  >
                    Approuver finalement
                  </button>
                )}

                <button
                  onClick={() => deleteReview(review.id)}
                  className="px-3 py-1.5 text-sm bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded transition-colors ml-auto"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="mt-6 p-4 bg-white border border-[#e8e0d8]">
          <div className="flex flex-wrap gap-4 text-sm text-[#2d2a26]/60">
            <span>
              Total: <strong className="text-[#2d2a26]">{reviews.length}</strong>
            </span>
            <span>
              En attente:{' '}
              <strong className="text-yellow-700">{pendingCount}</strong>
            </span>
            <span>
              Approuvés:{' '}
              <strong className="text-green-700">
                {reviews.filter((r) => r.status === 'approved').length}
              </strong>
            </span>
            <span>
              Rejetés:{' '}
              <strong className="text-red-700">
                {reviews.filter((r) => r.status === 'rejected').length}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
