import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL);

async function main() {
  try {
    // 1. Récupérer tous les produits
    console.log('📦 Récupération des produits...');
    const products = await sql`
      SELECT id, name, slug, category, description 
      FROM products 
      ORDER BY category, name
    `;
    
    console.log(`✅ ${products.length} produits trouvés\n`);
    
    // 2. Transformer les descriptions
    const updates = [];
    
    for (const product of products) {
      const newDescription = shortenDescription(product);
      
      if (newDescription !== product.description) {
        updates.push({
          id: product.id,
          name: product.name,
          category: product.category,
          oldLength: product.description?.length || 0,
          newLength: newDescription.length,
          newDescription
        });
        
        console.log(`📝 ${product.name} (${product.category})`);
        console.log(`   Avant: ${product.description?.length || 0} caractères`);
        console.log(`   Après: ${newDescription.length} caractères`);
        console.log(`   "${newDescription}"\n`);
      }
    }
    
    // 3. Exécuter les UPDATEs
    if (updates.length > 0) {
      console.log(`\n🔄 Mise à jour de ${updates.length} produits en base...`);
      
      for (const update of updates) {
        await sql`
          UPDATE products 
          SET description = ${update.newDescription}
          WHERE id = ${update.id}
        `;
      }
      
      console.log('✅ Mise à jour terminée\n');
    } else {
      console.log('ℹ️  Aucune mise à jour nécessaire\n');
    }
    
    // 4. Vérification finale
    console.log('🔍 Vérification finale...');
    const updated = await sql`
      SELECT id, name, category, LENGTH(description) as desc_length 
      FROM products 
      ORDER BY desc_length DESC
    `;
    
    console.log('\n📊 Longueurs des descriptions :');
    for (const p of updated) {
      const status = p.desc_length <= 300 ? '✅' : '⚠️';
      console.log(`${status} ${p.name}: ${p.desc_length} caractères`);
    }
    
    const tooLong = updated.filter(p => p.desc_length > 300);
    if (tooLong.length > 0) {
      console.log(`\n⚠️  ${tooLong.length} descriptions dépassent 300 caractères`);
    } else {
      console.log('\n✅ Toutes les descriptions sont sous 300 caractères');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

function shortenDescription(product) {
  const { name, category, description } = product;
  
  // Si pas de description, retourner vide
  if (!description) return '';
  
  // Déterminer le ton selon la catégorie
  const isDeuil = category?.toLowerCase().includes('deuil');
  const isAccessoire = category?.toLowerCase().includes('accessoire');
  const isMariage = category?.toLowerCase().includes('mariage');
  
  // Descriptions personnalisées par produit
  // (basées sur l'analyse du contenu original)
  
  const shortDescriptions = {
    // Bouquets classiques
    'ma-poulette': 'Un concentré de tendresse et de passion. Roses rouges intenses, lisianthus rose et fleurs aériennes composent ce bouquet généreux, à la fois vibrant et raffiné. Idéal pour exprimer vos sentiments.',
    
    'brassee-champetre': 'Une brassée généreuse aux tons naturels et champêtres. Composition harmonieuse de fleurs de saison, liée à la main dans l\'esprit des bouquets de campagne. Fraîcheur et authenticité garanties.',
    
    'brassee-tendre': 'Douceur et délicatesse dans une brassée aux teintes pastel. Fleurs fraîches de saison composées avec soin dans des tons romantiques et apaisants. Un geste tendre et intemporel.',
    
    'brassee-coloree': 'Une explosion de couleurs vives et joyeuses. Fleurs de saison assemblées dans un mélange généreux et vitaminé. Parfait pour illuminer une journée et apporter de la bonne humeur.',
    
    'brassee-automnale': 'Les couleurs chaleureuses de l\'automne réunies dans une brassée généreuse. Teintes orangées, ocres et cuivrées évoquent la douceur de cette saison. Un bouquet riche et réconfortant.',
    
    // Bouquets spéciaux
    'bouquet-liberte': 'Un tourbillon de couleurs audacieuses et libres. Composition spontanée mêlant textures et nuances vives dans un esprit créatif et affranchi. L\'expression florale sans contrainte.',
    
    'bouquet-gourmand': 'Une création généreuse aux teintes sucrées et chaleureuses. Roses, renoncules et fleurs délicates composent ce bouquet aussi appétissant qu\'un dessert. Pure gourmandise florale.',
    
    'bouquet-printanier': 'La fraîcheur du printemps dans un bouquet lumineux. Tulipes, renoncules et fleurs de saison célèbrent le renouveau. Des couleurs tendres et vitaminées pour accueillir les beaux jours.',
    
    'bouquet-rond': 'Une composition ronde et structurée, élégante et intemporelle. Fleurs choisies avec soin disposées en harmonie parfaite. Un classique raffiné qui traverse les modes.',
    
    'bouquet-pastel': 'Douceur et raffinement dans des teintes poudrées. Roses, lisianthus et fleurs délicates s\'unissent dans une palette pastel apaisante. Une création romantique et poétique.',
    
    'bouquet-roses': 'L\'élégance intemporelle des roses dans toute leur splendeur. Roses fraîches de qualité supérieure sublimées par un feuillage délicat. Le symbole absolu de l\'amour et de la beauté.',
    
    'bouquet-roses-rouges': 'La passion incarnée dans un bouquet de roses rouges éclatantes. Symbole universel de l\'amour ardent, ces roses d\'exception expriment vos sentiments les plus profonds. Romantisme absolu.',
    
    'composition-florale-sur-mesure': 'Une création unique pensée spécialement pour vous. Nos artisans fleuristes imaginent une composition personnalisée selon vos envies, l\'occasion et votre budget. L\'art floral à votre service.',
    
    // Plantes
    'plante-verte': 'Une plante verte d\'intérieur soigneusement sélectionnée pour sa beauté et sa facilité d\'entretien. Apporte une touche de nature et de sérénité à votre intérieur. Cadeau durable et apaisant.',
    
    'plante-fleurie': 'Une plante fleurie qui égaiera votre intérieur de ses couleurs éclatantes. Choisie pour sa floraison généreuse et sa longévité. Un cadeau vivant qui se renouvelle au fil des saisons.',
    
    'orchidee': 'L\'orchidée Phalaenopsis, symbole d\'élégance et de raffinement. Floraison longue durée et entretien simple pour cette plante exotique d\'exception. Un cadeau prestigieux et durable.',
    
    // Deuil
    'gerbe-deuil-blanc': 'Une gerbe funéraire d\'un blanc immaculé, symbole de paix et de recueillement. Fleurs choisies avec respect pour rendre un dernier hommage empreint de dignité.',
    
    'gerbe-deuil-coloree': 'Une gerbe funéraire aux couleurs douces et apaisantes. Composition respectueuse célébrant la vie et la mémoire de l\'être cher. Un hommage sincère et bienveillant.',
    
    'coussin-deuil': 'Un coussin funéraire confectionné avec délicatesse et respect. Forme traditionnelle garnie de fleurs choisies pour leur symbolique et leur tenue. Hommage empreint de dignité.',
    
    'coeur-deuil': 'Un cœur funéraire exprimant l\'affection et le respect. Composition florale en forme de cœur réalisée avec soin et délicatesse. Le symbole universel de l\'amour éternel.',
    
    'couronne-deuil': 'Une couronne funéraire traditionnelle, symbole d\'éternité et de respect. Fleurs fraîches disposées sur structure végétale. Un dernier hommage dans la tradition.',
    
    'devant-de-tombe': 'Une composition florale pour orner une sépulture. Réalisée dans des teintes respectueuses, elle apporte beauté et recueillement. Un geste de mémoire et de fidélité.',
    
    // Mariages
    'bouquet-mariee': 'Le bouquet de la mariée, création romantique et unique pour le plus beau jour. Fleurs délicates assemblées avec art selon vos envies et le style de votre union. Élégance et émotion.',
    
    'composition-mariage': 'Une composition florale sur-mesure pour votre célébration. Créée en harmonie avec votre thème et vos couleurs, elle sublimera votre réception. Prestations sur devis.',
    
    'decoration-ceremonie': 'Une décoration florale pour embellir votre cérémonie. Arche, chemin d\'allée ou décor d\'autel, chaque élément est pensé pour magnifier ce moment unique. Sur-mesure et poétique.',
    
    'boutonniere': 'Une boutonnière élégante pour le marié et ses témoins. Fleurs fraîches et feuillages raffinés fixés avec soin. Le détail qui parfait la tenue de cérémonie.',
    
    'bracelet-floral': 'Un bracelet floral délicat pour les demoiselles d\'honneur. Petites fleurs et verdure assemblées avec finesse. Une touche florale gracieuse et moderne.',
    
    // Accessoires
    'vase': 'Un vase sélectionné pour sa qualité et son esthétique. Parfait pour mettre en valeur vos bouquets et créer de belles compositions. Disponible en plusieurs styles et tailles.',
    
    'cache-pot': 'Un cache-pot décoratif pour sublimer vos plantes. Choix de matières et de finitions pour s\'harmoniser avec votre intérieur. Élégance et praticité.',
    
    'contenant-decoratif': 'Un contenant décoratif pour vos créations florales. Sélection de contenants originaux et raffinés adaptés à tous les styles de compositions. L\'écrin de vos fleurs.',
    
    'ruban-decoratif': 'Un ruban décoratif de qualité pour sublimer vos bouquets. Différents coloris et matières pour personnaliser vos créations. Le détail qui fait la différence.'
  };
  
  // Chercher une description courte par slug
  const slug = product.slug?.toLowerCase();
  if (slug && shortDescriptions[slug]) {
    return shortDescriptions[slug];
  }
  
  // Sinon, générer une description générique selon la catégorie
  if (isDeuil) {
    return 'Une composition funéraire réalisée avec respect et délicatesse. Fleurs fraîches choisies pour rendre un hommage empreint de dignité et de recueillement.';
  }
  
  if (isAccessoire) {
    return `${name} sélectionné pour sa qualité et son esthétique. Un accessoire élégant pour sublimer vos compositions florales.`;
  }
  
  if (isMariage) {
    return 'Une création florale sur-mesure pour votre mariage. Réalisée selon vos envies et en harmonie avec votre thème. Devis personnalisé sur demande.';
  }
  
  // Description générique pour les autres produits
  return 'Un bouquet artisanal confectionné avec des fleurs fraîches de saison. Chaque création est unique et réalisée avec soin par nos artisans fleuristes. Livraison en Bretagne.';
}

main();
