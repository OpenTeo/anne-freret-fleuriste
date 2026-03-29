/**
 * Script pour créer les Price objects Stripe pour les abonnements
 * Usage: node scripts/create-stripe-prices.js
 * 
 * Ce script va créer 9 Price objects (3 formules × 3 fréquences)
 * et afficher les IDs à copier dans /app/api/subscriptions/checkout/route.ts
 */

const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

// Lire .env.local manuellement
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const stripe = new Stripe(envVars.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

const formulas = [
  { id: 'essentiel', name: 'Essentiel 🌿', prices: { weekly: 25.50, biweekly: 27.50, monthly: 29.90 } },
  { id: 'signature', name: 'Signature 🌸', prices: { weekly: 38.00, biweekly: 41.50, monthly: 44.90 } },
  { id: 'prestige', name: 'Prestige 👑', prices: { weekly: 59.00, biweekly: 64.50, monthly: 69.90 } },
];

const frequencies = {
  weekly: { interval: 'week', interval_count: 1, label: 'Hebdomadaire' },
  biweekly: { interval: 'week', interval_count: 2, label: 'Bi-mensuel' },
  monthly: { interval: 'month', interval_count: 1, label: 'Mensuel' },
};

async function createPrices() {
  console.log('🚀 Création des Price objects Stripe...\n');

  const priceIds = {
    essentiel: {},
    signature: {},
    prestige: {},
  };

  // D'abord, créer un Product pour chaque formule
  const products = {};
  
  for (const formula of formulas) {
    console.log(`📦 Création du produit: ${formula.name}`);
    
    const product = await stripe.products.create({
      name: `Abonnement Fleurs ${formula.name}`,
      description: `Abonnement récurrent aux bouquets ${formula.name}`,
      metadata: {
        formula: formula.id,
      },
    });
    
    products[formula.id] = product.id;
    console.log(`   ✅ Product créé: ${product.id}\n`);
  }

  // Ensuite, créer les Price objects pour chaque combinaison formule/fréquence
  for (const formula of formulas) {
    for (const [freqKey, freqData] of Object.entries(frequencies)) {
      const priceAmount = formula.prices[freqKey];
      
      console.log(`💰 Création Price: ${formula.name} - ${freqData.label} (${priceAmount}€)`);
      
      const price = await stripe.prices.create({
        product: products[formula.id],
        unit_amount: Math.round(priceAmount * 100), // Convertir en centimes
        currency: 'eur',
        recurring: {
          interval: freqData.interval,
          interval_count: freqData.interval_count,
        },
        metadata: {
          formula: formula.id,
          frequency: freqKey,
        },
      });
      
      priceIds[formula.id][freqKey] = price.id;
      console.log(`   ✅ Price créé: ${price.id}\n`);
    }
  }

  // Afficher le code à copier-coller
  console.log('\n' + '='.repeat(80));
  console.log('✅ TOUS LES PRICE OBJECTS ONT ÉTÉ CRÉÉS !');
  console.log('='.repeat(80) + '\n');
  
  console.log('📋 Copiez-collez ce code dans /app/api/subscriptions/checkout/route.ts :\n');
  console.log('const PRICE_IDS: Record<string, Record<string, string>> = {');
  
  for (const [formulaId, frequencies] of Object.entries(priceIds)) {
    console.log(`  ${formulaId}: {`);
    for (const [freqKey, priceId] of Object.entries(frequencies)) {
      console.log(`    ${freqKey}: '${priceId}',`);
    }
    console.log(`  },`);
  }
  
  console.log('};\n');
  
  console.log('🎯 Prochaines étapes :');
  console.log('1. Copier le code ci-dessus dans checkout/route.ts');
  console.log('2. Commit et déployer sur Vercel');
  console.log('3. Tester un abonnement sur le site\n');
}

// Exécuter
createPrices().catch((error) => {
  console.error('❌ Erreur:', error);
  process.exit(1);
});
