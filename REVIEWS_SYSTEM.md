# Système d'Avis Clients - Anne Freret

## 📋 Résumé

Système complet d'avis clients intégré au site e-commerce Anne Freret, permettant aux clients de laisser des avis et aux administrateurs de les modérer.

## ✅ Fonctionnalités Implémentées

### 1. Base de Données

**Table `reviews`** créée avec :
- Champs : `id`, `product_id`, `user_id`, `author_name`, `rating`, `title`, `text`, `verified_purchase`, `featured`, `status`, `created_at`, `updated_at`
- Contraintes : rating entre 1-5, statut (pending/approved/rejected)
- Index sur `product_id`, `status`, et `featured`
- Relations : CASCADE sur products, SET NULL sur users

**Scripts de migration :**
- `scripts/migrate-reviews.js` - Création de la table
- `scripts/seed-reviews.js` - Données de test (10 avis sur 5 produits)
- `scripts/check-reviews.js` - Vérification du système

### 2. API Routes

**`/api/reviews` (GET, POST)**
- `GET ?productId=xxx` - Avis approuvés pour un produit
- `GET ?all=true` - Tous les avis (admin)
- `GET ?featured=true&limit=6` - Avis mis en avant pour homepage
- `POST` - Soumettre un avis (status=pending par défaut)

**`/api/reviews/stats` (GET)**
- `GET ?productId=xxx` - Stats pour un produit
- Stats globales : total, moyenne, répartition par étoiles

**`/api/reviews/[id]` (PATCH, DELETE)**
- `PATCH` - Approuver/rejeter/mettre en avant (admin only)
- `DELETE` - Supprimer un avis (admin only)
- Mise à jour automatique du rating produit lors approbation

### 3. Composants Frontend

**`components/reviews/ReviewForm.tsx`**
- Sélection étoiles interactive (hover)
- Champs : nom, titre (optionnel), texte, rating
- Validation côté client
- Message de confirmation après soumission
- Pré-remplissage du nom si connecté

**`components/reviews/ProductReviews.tsx`**
- Affichage note moyenne + distribution étoiles
- Liste des avis approuvés
- Badge "Achat vérifié"
- Formulaire intégré avec bouton "Laisser un avis"
- Message si aucun avis : "Soyez le premier"

**`components/sections/TestimonialsCarousel.tsx`**
- Modifié pour charger les vrais avis depuis `/api/reviews?featured=true&limit=6`
- Fallback sur avis hardcodés si DB vide
- Auto-rotation toutes les 6 secondes

### 4. Admin Dashboard

**`app/admin/components/ReviewsList.tsx`**
- Liste tous les avis avec filtres (pending/approved/rejected)
- Actions : Approuver, Rejeter, Mettre en avant, Supprimer
- Badge de compteur pour avis en attente
- Affichage : produit, auteur, étoiles, texte, date, statut

**`app/admin/page.tsx`**
- Nouveau tab "Avis" (⭐)
- Intégré dans le menu desktop et mobile

### 5. Intégrations

**Pages produits**
- `app/produit/[slug]/ProductPageClient.tsx` modifié
- Remplacement de `getReviewsForProduct()` par `<ProductReviews productId={product.id} />`
- Suppression de `lib/reviews-data.ts` (faux avis)

**Mise à jour automatique des produits**
- Champ `rating` et `review_count` mis à jour automatiquement
- Calcul de la moyenne lors de l'approbation d'un avis
- Recalcul lors de la suppression

## 🎨 Design

- Couleurs : noir (#2d2a26), doré (#b8935a), crème (#faf8f5)
- Mobile-first responsive
- Textes en français
- Pas d'emojis dans le UI
- Cohérent avec le design existant du site

## 🔐 Sécurité

- Vérification admin via cookie session pour PATCH/DELETE
- Validation côté serveur (rating 1-5, champs requis)
- Status "pending" par défaut pour nouveaux avis
- Protection CASCADE/SET NULL sur les FK

## 📊 État Actuel

```
Total avis: 10
- approved: 10
- pending: 0
- rejected: 0

Avis mis en avant: 5

Produits avec avis: 5
- Ratings entre 4.5 et 5.0 étoiles
```

## 🚀 Déploiement

- Build réussi : `npm run build` ✅
- Commits pushés sur `main`
- Base de données migrée sur Neon
- Prêt pour production

## 📝 Notes

- Les avis de test peuvent être supprimés via l'admin
- Le flag `featured` permet de contrôler les avis affichés sur la homepage
- Le champ `verified_purchase` peut être rempli automatiquement lors d'une future intégration avec les commandes
- Interface Review conservée dans `lib/mock-data.ts` (utilisée ailleurs)

## 🔄 Prochaines Améliorations Possibles

- Marquer automatiquement `verified_purchase=true` si l'utilisateur a acheté le produit
- Notifications email lors de nouveaux avis (admin)
- Réponses de l'admin aux avis
- Photos dans les avis
- Tri des avis (plus récents, mieux notés)
- Pagination pour les produits avec beaucoup d'avis
