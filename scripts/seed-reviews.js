const { neon } = require('@neondatabase/serverless');

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_KhVc6M2XdtsD@ep-steep-dust-agx38zwr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(POSTGRES_URL);

async function seed() {
  try {
    console.log('🌱 Ajout d\'avis de test...');

    // Récupérer quelques produits
    const products = await sql`SELECT id, name, slug FROM products LIMIT 5`;
    
    if (products.length === 0) {
      console.log('⚠️ Aucun produit trouvé. Veuillez d\'abord ajouter des produits.');
      return;
    }

    const sampleReviews = [
      {
        author: 'Marie L.',
        rating: 5,
        title: 'Absolument magnifique !',
        text: 'Les fleurs étaient fraîches et le bouquet a tenu plus de 10 jours. Je recommande vivement.',
        verified: true,
        featured: true,
        status: 'approved'
      },
      {
        author: 'Sophie D.',
        rating: 5,
        title: 'Livraison rapide et soignée',
        text: 'Le bouquet était encore plus beau que sur la photo. Ma mère était ravie !',
        verified: true,
        featured: true,
        status: 'approved'
      },
      {
        author: 'Jean-Pierre M.',
        rating: 4,
        title: 'Très beau bouquet',
        text: 'Bien emballé. Seul petit bémol : une rose était un peu fanée mais le reste était parfait.',
        verified: true,
        featured: false,
        status: 'approved'
      },
      {
        author: 'Claire B.',
        rating: 5,
        title: 'Qualité constante',
        text: 'C\'est la troisième fois que je commande et je ne suis jamais déçue. Qualité constante et service impeccable.',
        verified: true,
        featured: true,
        status: 'approved'
      },
      {
        author: 'Nathalie P.',
        rating: 5,
        title: 'Un vrai bonheur',
        text: 'L\'odeur est divine et elles illuminent mon salon depuis une semaine.',
        verified: true,
        featured: true,
        status: 'approved'
      },
      {
        author: 'François H.',
        rating: 5,
        title: 'Parfait pour un anniversaire',
        text: 'Parfait pour un anniversaire de mariage. Ma femme a adoré. Merci Anne Freret !',
        verified: true,
        featured: true,
        status: 'approved'
      },
      {
        author: 'Isabelle R.',
        rating: 5,
        title: 'Superbe !',
        text: 'Commandé pour Noël, le bouquet a fait sensation ! Les couleurs étaient superbes.',
        verified: true,
        featured: false,
        status: 'approved'
      },
      {
        author: 'Thomas G.',
        rating: 4,
        title: 'Composition originale',
        text: 'Belles fleurs de saison, composition originale. Bon rapport qualité-prix.',
        verified: true,
        featured: false,
        status: 'approved'
      }
    ];

    let reviewCount = 0;

    // Ajouter des avis pour chaque produit
    for (const product of products) {
      // 2-3 avis par produit
      const numReviews = Math.floor(Math.random() * 2) + 2;
      
      for (let i = 0; i < numReviews; i++) {
        const review = sampleReviews[Math.floor(Math.random() * sampleReviews.length)];
        
        await sql`
          INSERT INTO reviews (
            product_id,
            author_name,
            rating,
            title,
            text,
            verified_purchase,
            featured,
            status
          ) VALUES (
            ${product.id},
            ${review.author},
            ${review.rating},
            ${review.title},
            ${review.text},
            ${review.verified},
            ${review.featured && reviewCount < 6}, -- Seulement 6 featured max
            ${review.status}
          )
        `;
        
        reviewCount++;
      }

      console.log(`✅ ${numReviews} avis ajoutés pour ${product.name}`);
    }

    // Mettre à jour les ratings des produits
    console.log('🔄 Mise à jour des ratings produits...');
    for (const product of products) {
      const stats = await sql`
        SELECT
          COUNT(*) as count,
          AVG(rating)::numeric(3,2) as average
        FROM reviews
        WHERE product_id = ${product.id} AND status = 'approved'
      `;

      if (stats.length > 0) {
        const count = parseInt(stats[0].count);
        const average = parseFloat(stats[0].average || 0);

        await sql`
          UPDATE products
          SET
            rating = ${average},
            review_count = ${count}
          WHERE id = ${product.id}
        `;
        
        console.log(`✅ ${product.name}: ${average.toFixed(1)} étoiles (${count} avis)`);
      }
    }

    console.log(`🎉 ${reviewCount} avis de test créés avec succès !`);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
}

seed();
