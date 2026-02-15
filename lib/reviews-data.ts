import { Review } from './mock-data';

const reviewPool: Review[] = [
  { id: 'r1', author: 'Marie L.', rating: 5, date: '2026-01-15', text: 'Absolument magnifique ! Les fleurs étaient fraîches et le bouquet a tenu plus de 10 jours. Je recommande vivement.', verified: true },
  { id: 'r2', author: 'Sophie D.', rating: 5, date: '2026-01-22', text: 'Livraison rapide et soignée. Le bouquet était encore plus beau que sur la photo. Ma mère était ravie !', verified: true },
  { id: 'r3', author: 'Jean-Pierre M.', rating: 4, date: '2026-01-08', text: 'Très beau bouquet, bien emballé. Seul petit bémol : une rose était un peu fanée mais le reste était parfait.', verified: true },
  { id: 'r4', author: 'Claire B.', rating: 5, date: '2026-02-01', text: 'C\'est la troisième fois que je commande et je ne suis jamais déçue. Qualité constante et service impeccable.', verified: true },
  { id: 'r5', author: 'Isabelle R.', rating: 5, date: '2025-12-20', text: 'Commandé pour Noël, le bouquet a fait sensation ! Les couleurs étaient superbes et l\'emballage très soigné.', verified: true },
  { id: 'r6', author: 'Thomas G.', rating: 4, date: '2026-01-30', text: 'Belles fleurs de saison, composition originale. Bon rapport qualité-prix.', verified: true },
  { id: 'r7', author: 'Nathalie P.', rating: 5, date: '2026-02-05', text: 'Un vrai bonheur de recevoir ces fleurs ! L\'odeur est divine et elles illuminent mon salon depuis une semaine.', verified: true },
  { id: 'r8', author: 'François H.', rating: 5, date: '2026-01-18', text: 'Parfait pour un anniversaire de mariage. Ma femme a adoré. Merci Anne Freret !', verified: true },
  { id: 'r9', author: 'Martine C.', rating: 4, date: '2025-12-28', text: 'Joli bouquet, bien fourni. La carte message personnalisée est un plus appréciable.', verified: true },
  { id: 'r10', author: 'Pauline V.', rating: 5, date: '2026-02-10', text: 'Bouquet reçu ce matin, il est splendide ! Les fleurs sont d\'une fraîcheur incroyable. Bravo.', verified: true },
  { id: 'r11', author: 'Camille A.', rating: 5, date: '2026-01-25', text: 'Fidèle cliente depuis l\'ouverture. Anne a un talent fou pour les compositions. Toujours un plaisir.', verified: true },
  { id: 'r12', author: 'Éric D.', rating: 4, date: '2026-02-08', text: 'Livré à l\'heure, bien protégé. Les fleurs séchées sont magnifiques et durent des mois.', verified: true },
];

// Deterministic reviews per product based on slug hash
export function getReviewsForProduct(slug: string): Review[] {
  const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = 3 + (hash % 4); // 3-6 reviews per product
  const start = hash % reviewPool.length;
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    reviews.push(reviewPool[(start + i) % reviewPool.length]);
  }
  return reviews;
}
