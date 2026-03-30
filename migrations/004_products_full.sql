-- Migration 004: Colonnes produits + import Shopify
-- Généré automatiquement depuis fleuriste-annefreret.com/products.json

-- Nouveaux champs
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS sizes JSONB DEFAULT '[]';
ALTER TABLE products ADD COLUMN IF NOT EXISTS variants JSONB DEFAULT '[]';
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1);
ALTER TABLE products ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN (tags);

-- Produits importés depuis Shopify

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Édition Amour',
  'edition-amour',
  'Description : Offrez un concentré de tendresse avec le Bouquet Ma Poulette, une création florale généreuse et vibrante qui célèbre l''amour et la complicité. Les roses rouges intenses s''associent aux nuances délicates du lisianthus rose et à la légèreté des fleurs aériennes pour créer une composition à la fois passionnée et raffinée. Un bouquet plein de douceur et de caractère, idéal pour faire plaisir à celle qui compte. Composition : Limonium, rose rouge, lisianthus rose, hypericum, gerbera, asparagus, clématite, sanguisorba, dianthus, alstroemeria, eucalyptus et autres feuillages. 📏 Disponible en trois tailles : Moyen : 79,90€ Grand : 99.90€ Très grand : 144,90€ 📸 Photo illustrant la taille moyenne. Charte qualité Anne Freret : Chaque bouquet est confectionné à la main par nos artisans fleuristes en Normandie et Bretagne, garantissant une qualité exceptionnelle. Nos créations sont réalisées avec des fleurs fraîches de saison, soigneusement sélectionnées pour assurer une tenue parfaite et une esthétique élégante. Note : 🌿 Nos compositions étant faites à partir de fleurs fraîches, certaines variétés peuvent être remplacées en fonction des disponibilités saisonnières pour préserver la qualité et l''esthétique du bouquet. 🛍️ Commandez dès maintenant et offrez un instant de tendresse et d''émotion.',
  'Bouquets',
  79.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.43.58.jpg?v=1770916995', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.52.23.jpg?v=1770916995', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/BE8068CF-E141-42F2-A7E1-CAB4643360FA.jpg?v=1770916995'],
  true,
  true,
  '[{"name": "Moyen", "price": 79.9}, {"name": "Grand", "price": 99.9}, {"name": "Très grand", "price": 144.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Ma douceur',
  'velours-noir',
  'Description : Découvrez le Bouquet Ma douceur, une composition florale intense et sophistiquée qui joue sur les contrastes profonds et les textures délicates. Les tulipes noires et les anémones sombres apportent mystère et caractère, tandis que les renoncules françaises et les fleurs aériennes viennent adoucir l''ensemble avec finesse. Une création audacieuse et raffinée, parfaite pour transmettre un message fort, élégant et inoubliable. Composition : Tulipe noire, muflier, renoncule française, anémone noire, astrance, dianthus, clématite. 📏 Disponible en trois tailles : Moyen : 65,90€ Grand : 85,90€ Très grand : 125,90€ 📸 Photo illustrant la taille moyenne. Charte qualité Anne Freret : Chaque bouquet est confectionné à la main par nos artisans fleuristes en Normandie et Bretagne, garantissant une qualité exceptionnelle. Nos créations sont réalisées avec des fleurs fraîches de saison, soigneusement sélectionnées pour assurer une tenue parfaite et une esthétique élégante. Note : 🌿 Nos compositions étant faites à partir de fleurs fraîches, certaines variétés peuvent être remplacées en fonction des disponibilités saisonnières pour préserver la qualité et l''esthétique du bouquet. 🛍️ Commandez dès maintenant et offrez un instant de tendresse et d''émotion.',
  'Bouquets',
  65.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.34.45.jpg?v=1770916718', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.34.46_1.jpg?v=1770916718', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/BE8068CF-E141-42F2-A7E1-CAB4643360FA.jpg?v=1770916995'],
  true,
  true,
  '[{"name": "Moyen", "price": 65.9}, {"name": "Grand", "price": 85.9}, {"name": "Très grand", "price": 125.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'À fleur de Cœur',
  'eveil-champetre-copie',
  'Description : Laissez-vous séduire par le Bouquet À fleur de Cœur, une composition lumineuse et généreuse qui célèbre la fraîcheur et la vitalité des fleurs de saison. L''élégance des roses d''Équateur et des renoncules françaises se mêle aux textures délicates du mimosa et du muflier pour créer un bouquet vibrant, plein de douceur et de caractère. Une création idéale pour offrir un message d''affection, de joie et de raffinement. Composition : Renoncule française, mimosa, muflier, gerbera, rose d''Équateur, rose branchue, dianthus, eucalyptus, sanguisorba. 📏 Disponible en trois tailles : Moyen : 59,90€ Grand : 79,90€ Très grand : 119,90€ 📸 Photo illustrant la taille moyenne Charte qualité Anne Freret : Chaque bouquet est confectionné à la main par nos artisans fleuristes en Normandie et Bretagne, garantissant une qualité exceptionnelle. Nos créations sont réalisées avec des fleurs fraîches de saison, soigneusement sélectionnées pour assurer une tenue parfaite et une esthétique élégante. Note : 🌿 Nos compositions étant faites à partir de fleurs fraîches, certaines variétés peuvent être remplacées en fonction des disponibilités saisonnières pour préserver la qualité et l''esthétique du bouquet. 🛍️ Commandez dès maintenant et offrez un instant de tendresse et d''émotion.',
  'Bouquets',
  59.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at05.39.42_d0368c21-4fab-4fba-8ace-46a73510a55c.jpg?v=1770916596', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at05.39.40_f2cefb1a-cfa6-4f73-9976-96230a3f068e.jpg?v=1770916596', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/BE8068CF-E141-42F2-A7E1-CAB4643360FA.jpg?v=1770916995'],
  true,
  true,
  '[{"name": "Moyen", "price": 59.9}, {"name": "Grand", "price": 79.9}, {"name": "Très grand", "price": 119.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Grany',
  'jullouville-les-pins-1',
  'Description : Craquez pour cet ensemble de fleurs à vous faire tomber de bonheur. Avec ces couleurs dans les tonalités de rose qui viendront apporter de la fraicheur à votre intérieur. Composition : Rose pâle sweet, wax fleur, tulipe dentelé, renoncule rose pâle, lisianthus marbré, genet feuillages mélangés (Moyen 49,90€ / Grand 59,90€ / Très grand 99,90€) Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_3a2e9857-fa21-42db-b89a-47630ccdf35d.png?v=1684428237', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_c37ad490-915a-4031-905f-650f46ae45ad.png?v=1684428237', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/3_1c6dabac-f587-4b2b-8889-d5853f5722be.png?v=1684428237', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_969050f5-ede9-423d-afc7-7963bc99e2db.jpg?v=1684428237'],
  true,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 59.9}, {"name": "Très grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'L’amoureux',
  'l-amoureux',
  'Création spéciale pour exprimer votre amour ! photo non contractuelle',
  'Bouquets',
  50.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/55C2677F-FE27-421C-9C09-834A37DC73DB.jpg?v=1736713571', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/CADC1F8B-BBBB-4B3B-A12D-0507C9104136.png?v=1736713571'],
  false,
  true,
  '[{"name": "Moyen", "price": 50.0}, {"name": "Grand", "price": 69.9}, {"name": "Très Grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'La pointe du Roc',
  'la-pointe-du-roc',
  'Description : Voici l''un des chouchous de la collection Anne Freret. Nous on l''adore parce qu''avec ses ravissants tons rose clair, il nous rappelle les événements heureux de la vie. Soyez certains de faire plaisir avec cette jolie composition de roses. Composition : Rose sweat advance, pampa rose, wax blanc, statice rose, oeillet poudré, lisianthus rose pâle, feuillages mélangés (Moyen 59,90€ / Grand 69,90€ / Très grand 79,90€) Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  59.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/284953372_351374500458766_8011634554600232545_n.jpg?v=1679413454', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche2_3ac6e0e4-4591-4415-acdc-e7450de5635f.jpg?v=1655568027', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_25403894-d14d-488c-a678-5333c60969c4.jpg?v=1655568027'],
  false,
  true,
  '[{"name": "Moyen", "price": 59.9}, {"name": "Grand", "price": 69.9}, {"name": "Très grand", "price": 79.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Le Chausiais',
  'le-saint-pairais',
  'Description : Le Bouquet du fleuriste est le mélange parfait pour sublimer vos intérieurs ou bien même pour faire plaisir à vos proches. N''hésitez plus pour l''offrir à quelqu''un d''important à vos yeux. Composition : Bouquet frais composé de Rose branchue rose, Renoncule Clone du Var, Wax Flower, Lisianthus double rose, Graminée rose, Feuillages d''hivers ( Moyen 49.90€ / Grand 59.90€ / Très grand 99.90€) Charte qualité Anne Freret : Votre bouquet sera réalisé à la main juste avant sa livraison par un artisan fleuriste dans nos ateliers Normands et Bretons vous garantissant ainsi un produit d''une qualité optimale. Maître artisan bouquetiste et son équipe de pro ! Laboratoire créatif en Baie du Mont Saint Michel. Note : Votre arrangement floral Anne Freret, composé de fleurs fraîches, pourra être quelque peu différent du visuel présenté qui a valeur indicative. Votre composition, créée spécialement pour vous par un de nos artisans, est susceptible de varier légèrement en fonction de la saisonnalité des végétaux qui la composent (Certains végétaux peuvent être remplacés par un substitut en fonction de la saison ou bien des récoltes de nos producteurs).',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00002_b6f2b70f-619d-4105-b4e8-f74941e8c689.jpg?v=1639823258', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00003.jpg?v=1639823258', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00001_e43cd843-e27c-4212-af2e-8f9749a31f84.jpg?v=1639823258', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/DisignEmballagebouquet_27a38b31-d66d-43bc-81e3-090c229f9454.jpg?v=1639823258'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 59.9}, {"name": "Très grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Le Sublime',
  'le-bouquet-du-fleuriste',
  'Description : Ce bouquet somptueux allie roses poudrées, renoncules délicates et petites fleurs champêtres pour créer une composition à la fois raffinée et intemporelle. Enrichi de feuillages d''eucalyptus, il dégage une atmosphère apaisante et chaleureuse. Parfait pour un cadeau rempli de douceur ou pour embellir une occasion spéciale, ce bouquet incarne l''équilibre entre romantisme et naturel. Offrez une touche d''élégance et de poésie avec cette création florale unique. Composition : Rose espérance, roses sweet advance, gypsophile rose, limonium rose, anémone rose, tulipe, astrancia, lisianthus rose, wax et feuillage de saison ( Moyen 49.90€ / Grand 59.90€ / Très grand 99.90€) Model Grand sur la photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_29_8a157ca1-e7ec-4bdd-8c6e-fc4a07a4af4c.png?v=1709222874', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_30.png?v=1709222874', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_28_1f3cf6e5-dc09-4759-b80d-87faf1a1b900.png?v=1709222870', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/presentationlivraisonAnneFreret_5a8c4ad5-de94-4d5c-8f1a-3afa288bdefa.jpg?v=1709223250'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 59.9}, {"name": "Très Grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Volupté',
  'volupte',
  'Description : Des roses rouges éclatantes et des fleurs enchanteresses, soigneusement assemblées pour créer un cadeau mémorable. Surprenez votre bien-aimé(e) avec ce geste romantique. Exprimez l''affection et la passion de manière inoubliable Composition : Rose rouge Naomi, limonium, lisiabthus, rose ancienne, renoncule, astance, lagurus et différents feuillages. (Moyen 59,90€ / Grand 99,90€ / Très grand 149,90€) Bouquet grand en photo. Charte qualité Anne Freret : Votre bouquet sera réalisé à la main juste avant sa livraison par un artisan fleuriste dans nos ateliers Normands et Bretons vous garantissant ainsi un produit d''une qualité optimale. Maître artisan bouquetiste et son équipe de pro ! Laboratoire créatif en Baie du Mont Saint Michel. Note : Votre arrangement floral Anne Freret, composé de fleurs fraîches, pourra être quelque peu différent du visuel présenté qui a une valeur indicative. Votre composition, créée spécialement pour vous par un de nos artisans, est susceptible de varier légèrement en fonction de la saisonnalité des végétaux qui la composent (Certains végétaux peuvent être remplacés par un substitut en fonction de la saison ou bien des récoltes de nos producteurs) .',
  'Bouquets',
  59.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Design_sans_titre_30_602ce972-9fb5-489a-a9c0-93e7855b2c62.png?v=1706801502', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_32.png?v=1706801502', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_31.png?v=1706801502', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/presentationlivraisonAnneFreret_112c976a-7dfb-4b86-a01a-a0a94711d025.jpg?v=1706801502'],
  true,
  true,
  '[{"name": "Moyenne", "price": 59.9}, {"name": "Grand", "price": 99.9}, {"name": "Très Grand", "price": 149.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Adoration',
  'adoration',
  'Description : Découvrez notre exquis bouquet de fleurs de saison, soigneusement conçu pour capturer la beauté naturelle de cette période. Offrez un cadeau qui célèbre la saison avec élégance et la simplicité. Composition : Renoncule, giroflée, tulipe, anemone, wax et différents feuillages (Moyen 49.90€ / Grand 59.90€ / Très grand 89.90€). Taille grande en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_35.png?v=1706808037', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_33.png?v=1706808036', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_44.png?v=1706808036', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/presentationlivraisonAnneFreret_c64dcf0b-07d5-4b90-b484-b2a2efb10a5f.jpg?v=1706808036'],
  false,
  true,
  '[{"name": "Moyenne", "price": 49.9}, {"name": "Grande", "price": 59.9}, {"name": "Très Grande", "price": 89.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Val es fleur',
  'val-es-fleur',
  'Description : Les fleurettes du Lisianthus frisé blanc, tel un fin plumetis, ponctuent ce joli bouquet fougueux de grâce et de finesse. Cet élégant mélange d''essences nobles est parfait pour marquer les occasions spéciales et faire plaisir à vos proches. Composition : Lisianthus frisé blanc, statice blanc, eucalyptus, feuillage de saison (Moyen 39,90€ / Grand 49,90€ / Très grand 59,90€) Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  39.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Lisianthusfriseblanc2.jpg?v=1625219126', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Lisianthusfriseblanc3.jpg?v=1625219130', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Lisianthusfriseblanc.jpg?v=1625219133', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_baa7d3fc-7da4-4a16-b81a-5fc9cec9e2cd.jpg?v=1625219095'],
  true,
  true,
  '[{"name": "Moyen", "price": 39.9}, {"name": "Grand", "price": 49.9}, {"name": "Très grand", "price": 59.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'La croix du lude',
  'la-croix-du-lude',
  'Description : Tendrissime brassée de fleurs aux teintes roses. Travaillé en abondance, ce joli bouquet aux couleurs pastel séduit par son homogénéité de tons avant de subjuguer par le mariage de ses essences. Une essence innocente apportée avec douceur par la présence du bouquet la croix du lude. A offrir amoureusement, amicalement mais aussi tendrement aux êtres qui vous sont précieux. Composition : bouvardia, rose gros bouton, lisianthus double rose pâle, eucalypthus, feuillage de saison (Moyen 49,90€ / Grand 59,90€ / Très grand 99,90€) Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton2.jpg?v=1625149279', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton3.jpg?v=1625149283', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton.jpg?v=1625149286', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_88b4dd89-f21d-4c40-b8cb-5fccb1d02d93.jpg?v=1625149256'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 59.99}, {"name": "Très grand", "price": 99.99}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Le Hérel',
  'bouquet-aphrodite',
  'Description : Ce bouquet raffiné, composé de roses rouges intenses et de fleurs pastel délicates, incarne l''élégance et l''émotion. Parfait pour exprimer un amour profond, une gratitude sincère ou pour marquer un moment spécial, il allie romantisme et tendresse. Les nuances vibrantes des roses rouges se mêlent harmonieusement aux teintes douces des fleurs roses et blanches, créant une composition à la fois chaleureuse et apaisante. Offrez ce bouquet pour transmettre vos sentiments avec grâce et poésie. Composition : Roses Pink Mondial, Roses Red Naomi, Roses Espérances, Lisianthus, rose frisé, Wax rose (Moyen 84,90€ / Grand 99,90€) Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  84.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin2.jpg?v=1625151901', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin3.jpg?v=1625151904', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin.jpg?v=1625151908', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_5ae8b3b9-4f13-4788-b52b-fe5477658f0a.jpg?v=1625151874'],
  false,
  true,
  '[{"name": "Moyen", "price": 84.9}, {"name": "Grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Vase',
  'georges-vase-en-verre',
  'Votre vase : Vase en verre épais d''une hauteur de 25 cm pour 9.5 cm de diamètre.',
  'Accessoires',
  12.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_27.png?v=1706808980', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_29.png?v=1706808980', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_28.png?v=1706808980'],
  false,
  true,
  '[]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Barneville-Carteret',
  'barneville-carteret',
  'Description : Cette délicate composition s''accompagne de lisianthus, de dille, de roses, de limonum, et blé le tout entouré d''un délicat feuillage. Une invitation à la tendresse d''un simple rêve, aussi furtif qu''un éclair, qui déposera dans votre intérieur une ambiance aérienne et coquette. Un bouquet frais créé dans nos ateliers Normands et Bretons juste pour vous ! Composition : Lisianthus blanc, dille, rose blanche, limonum blanc, blé et feuillages mélangés (Moyen 49.90€ / Grand 59.90€ / Très grand 99.90€). Taille grande en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/3_08d6c59e-2511-48e0-8c52-2316f0f61993.png?v=1684428619', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_a5ba4dac-d2cd-4154-ba11-ae1d9540a605.png?v=1684428619', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/DisignEmballagebouquet.jpg?v=1684428619'],
  true,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "grand", "price": 59.9}, {"name": "Très grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'La pointe d''Agon',
  'la-pointe-dagon',
  'Description : Ce bouquet rafraîchissant, avec des teintes vives est parfait pour apporter une touche d''énergie et de vivacité dans votre intérieur. Offrez un bouquet acidulé pour égayer le quotidien et surprendre vos proches. Composition : Rose frisée blanche, c hardon sec blanc, p hlox blanc, l isianthus blanc, d ihlle graine, m élange de feuillages de saison Moyen 49.90€ / Grand 59.90€ / Très grand 79.90€ Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/IMG_7776.jpg?v=1626082397', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/IMG_80812.jpg?v=1626082397', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/IMG_7772.jpg?v=1626082397', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/DisignEmballagebouquet_aaec78cb-1f97-4d3a-a550-53beff487bf0.jpg?v=1626082184'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 59.9}, {"name": "Très grand", "price": 79.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Délicatesse',
  'delicatesse',
  'Description : Ce bouquet rafraîchissant, avec des teintes vives est parfait pour apporter une touche d''énergie et de vivacité dans votre maison. (Moyen 49.90€ / Grand 69.90€ / Très grand 89.90€ ). Taille grande en photo. photo non contractuelle Charte qualité Anne Freret : Votre bouquet sera réalisé à la main juste avant sa livraison par un artisan fleuriste dans nos ateliers Normands et Bretons vous garantissant ainsi un produit d''une qualité optimale. Maître artisan bouquetiste et son équipe de pro ! Laboratoire créatif en Baie du Mont Saint Michel. Note : Votre arrangement floral Anne Freret, composé de fleurs fraîches, pourra être quelque peu différent du visuel présenté qui a une valeur indicative. Votre composition, créée spécialement pour vous par un de nos artisans, est susceptible de varier légèrement en fonction de la saisonnalité des végétaux qui la composent ( Certains végétaux peuvent être remplacés par un substitut en fonction de la saison ou bien des récoltes de nos producteurs) .',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/EFD05CD5-1CD6-452F-B68F-D7FAB8A759D5.jpg?v=1736713276', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/BE8068CF-E141-42F2-A7E1-CAB4643360FA.jpg?v=1770916995'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 69.9}, {"name": "Très Grand", "price": 89.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Ruban Personnalisé',
  'ruban-personnalise',
  'Description : Ajoutez une touche personnelle et significative à vos gerbes funéraires avec notre ruban personnalisé. Pour une attention unique, vous pouvez indiquer la phrase de votre choix à inscrire sur le ruban. 📝 Instruction : merci de renseigner votre message à inscrire dans l''espace « Créez votre carte message » lors de la finalisation de votre commande. Ce ruban, confectionné avec soin, apportera une note d''élégance et de respect à votre hommage. Photos et exemples de rubans disponibles pour vous inspirer.',
  'Accessoires',
  10.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Ruban.jpg?v=1743711352'],
  false,
  true,
  '[]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Couronne',
  'couronne',
  'Description : Cet arrangement floral tout en rondeur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Si vous le souhaitez, vous pouvez ajouter un ruban avec une inscription de votre choix (par exemple : À notre maman chérie , Repose en paix , Ton fils pour toujours ...). Merci d''indiquer le message à inscrire sur le ruban, ainsi que le nom du défunt, dans l''espace “Créez votre carte message” au moment de la validation de votre panier. (Nos produits de la catégories deuil sont disponibles exclusivement en livraison locale. Merci de vérifier votre adresse avant de passer commande) Composition : moyen 60cm de longueur : 250€ grande 70cm de longueur : 350€ très grande 90cm de longueur : 450€ Taille grande affiché Charte qualité Anne Freret : Votre composition sera confectionnée à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Deuil & Hommages',
  250.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne2.jpg?v=1743008466', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne4.jpg?v=1743008463'],
  false,
  true,
  '[{"name": "moyen", "price": 250.0}, {"name": "grand", "price": 350.0}, {"name": "très grand", "price": 450.0}]'::jsonb,
  '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "coloré"}]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Éveil Champêtre',
  'bouquet-douce-harmonie',
  'Description : Offrez un instant de douceur avec le Bouquet Douce Harmonie, une composition florale raffinée qui évoque la pureté et la délicatesse. Ses roses blanches Avalanche majestueuses, associées à des fleurs aux teintes subtiles et un feuillage aérien, en font le cadeau parfait pour transmettre un message de sérénité et d''affection. Composition : Roses blanches Avalanche, lisianthus, graminées, gypsophile, hypericum, giroflée, phlox, hortensia, eucalyptus médaillon et statice vert. 📏 Disponible en trois tailles : Moyen : 49,90€ Grand : 79,90€ Très grand : 120,00€ 📸 Photo illustrant la taille moyenne. Charte qualité Anne Freret : Chaque bouquet est confectionné à la main par nos artisans fleuristes en Normandie et Bretagne, garantissant une qualité exceptionnelle. Nos créations sont réalisées avec des fleurs fraîches de saison, soigneusement sélectionnées pour assurer une tenue parfaite et une esthétique élégante. Note : 🌿 Nos compositions étant faites à partir de fleurs fraîches, certaines variétés peuvent être remplacées en fonction des disponibilités saisonnières pour préserver la qualité et l''esthétique du bouquet. 🛍️ Commandez dès maintenant et offrez un instant de douceur et d''émotion !',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-20250201-WA0008.jpg?v=1738607322', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/bouquet_blanc_e670f727-9e27-4694-b916-8de8f509cac1.jpg?v=1738785309', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/BE8068CF-E141-42F2-A7E1-CAB4643360FA.jpg?v=1770916995'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 79.9}, {"name": "Très grand", "price": 120.0}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Le Saint-Pairais',
  'le-chausiais-1',
  'Description : Hommage floral à la ville qui l''a inspiré, Le Saint Pairais est une composition élégante et romantique. Avec ses roses délicates aux nuances pastel, ses fleurs champêtres et son feuillage verdoyant, ce bouquet respire la douceur et l''authenticité. Parfait pour marquer une occasion spéciale ou simplement pour faire plaisir, il incarne l''esprit chaleureux et accueillant de Saint-Pair-sur-Mer. Offrez ce bouquet unique, reflet d''un savoir-faire local et d''une nature sublimée. Composition : Rose Sweat Advance, Rose branchue, Statice rose, Astrancia blanc, Hypericum pastel (Moyen 49,90€ / Grand 59,90€ / Très grand 99,90€) Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderosessweetadvance2.jpg?v=1625151643', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderosessweetadvance3.jpg?v=1625151648', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderosessweetadvance.jpg?v=1625151652', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_55cb4f4c-8c2a-4b80-a4c8-2793fe9e296c.jpg?v=1625151614'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 59.9}, {"name": "Très grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Jardin de Granville',
  'jardin-de-granville-1',
  'Description : Ce bouquet délicat, composé de fleurs aux tons pastel, évoque douceur et sérénité. Idéal pour offrir en hommage ou pour témoigner d''une pensée sincère, il apporte une touche de réconfort et de beauté naturelle en toutes circonstances. Chaque fleur a été soigneusement sélectionnée pour créer une harmonie parfaite, symbolisant des souvenirs précieux et des émotions partagées. Laissez ce bouquet transmettre vos sentiments avec élégance et respect. Composition : Rose advance rose pâle, rose espérance, rose ohara, rose pink floyd, genet blanc, statice rose (Moyen 89,90€ / Grand 99,90€ / Très Grand 120€) Taille moyenne en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  89.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses3.jpg?v=1737559058', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses2.jpg?v=1737559058', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_2d9fd32c-3461-4129-aed0-72eada8aa84d.jpg?v=1625148842'],
  false,
  true,
  '[{"name": "Moyen", "price": 89.9}, {"name": "Grand", "price": 99.9}, {"name": "Très Grand", "price": 120.0}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Le Jullouvillais',
  'bouquet-du-fleuriste',
  'Description : Avec ses tons doux et ses textures aériennes, ce bouquet évoque la beauté naturelle et la sérénité. Composé de roses poudrées, de fleurs sauvages et de feuillages délicats, il capture l''essence d''un charme champêtre tout en restant raffiné. Idéal pour célébrer un moment d''exception ou pour offrir une parenthèse de douceur, ce bouquet intemporel est une ode à la nature et à l''élégance. Composition : Rose Sweat Advance, Limonium pêche, Miscanthus séché, Panicum, Bouvardia, Alstromère rose. ( Moyen 49.90€ / Grand 59.90€ / Très grand 99.90€) Taille grande en photo. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose2.jpg?v=1625070100', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose3.jpg?v=1625070104', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose.jpg?v=1625070108', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'],
  false,
  true,
  '[{"name": "Moyen", "price": 49.9}, {"name": "Grand", "price": 59.9}, {"name": "Très grand", "price": 99.9}]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Chemin de Sérénité',
  'raquette',
  'Description : Cet arrangement floral tout en longueur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Si vous le souhaitez, vous pouvez ajouter un ruban avec une inscription de votre choix (par exemple : À notre maman chérie , Repose en paix , Ton fils pour toujours ...). Merci d''indiquer le message à inscrire sur le ruban, ainsi que le nom du défunt, dans l''espace “Créez votre carte message” au moment de la validation de votre panier. (Nos produits de la catégories deuil sont disponibles exclusivement en livraison locale. Merci de vérifier votre adresse avant de passer commande) Composition : moyen 80cm de longueur : 170€ grande 100cm de longueur : 220€ très grande 120cm de longueur : 320€ Taille grande affiché Charte qualité Anne Freret : Votre composition sera confectionnée à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Deuil & Hommages',
  170.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquette.jpg?v=1737645211', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquetteside.jpg?v=1737645211'],
  false,
  true,
  '[{"name": "moyen", "price": 170.0}, {"name": "grand", "price": 220.0}, {"name": "très grand", "price": 320.0}]'::jsonb,
  '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "coloré"}]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Coussin',
  'gerbe',
  'Description : Cet arrangement floral, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Si vous le souhaitez, vous pouvez ajouter un ruban avec une inscription de votre choix (par exemple : À notre maman chérie , Repose en paix , Ton fils pour toujours ...). Merci d''indiquer le message à inscrire sur le ruban, ainsi que le nom du défunt, dans l''espace “Créez votre carte message” au moment de la validation de votre panier. (Nos produits de la catégories deuil sont disponibles exclusivement en livraison locale. Merci de vérifier votre adresse avant de passer commande) Composition : moyen 40 cm : 120€ grande 55 cm : 160€ très grande 70 cm : 220€ Taille moyenne affiché Charte qualité Anne Freret : Votre composition sera confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Deuil & Hommages',
  120.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_3.png?v=1729873535', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_4.png?v=1729873548'],
  false,
  true,
  '[{"name": "Moyen", "price": 120.0}, {"name": "Grand", "price": 160.0}, {"name": "Très Grand", "price": 220.0}]'::jsonb,
  '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Jardin de plantes',
  'jardin-de-plantes',
  'Description : Cet arrangement floral en forme de cœur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Si vous le souhaitez, vous pouvez ajouter un ruban avec une inscription de votre choix (par exemple : À notre maman chérie , Repose en paix , Ton fils pour toujours ...). Merci d''indiquer le message à inscrire sur le ruban, ainsi que le nom du défunt, dans l''espace “Créez votre carte message” au moment de la validation de votre panier. (Nos produits de la catégories deuil sont disponibles exclusivement en livraison locale. Merci de vérifier votre adresse avant de passer commande) Composition : Plantes variables selon les saisons. moyen 40cm de diamètre : 60€ grande 50cm de diamètre : 80€ très grande 80cm de diamètre : 150€ Taille moyen affiché Charte qualité Anne Freret : Votre composition sera confectionnée à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Deuil & Hommages',
  60.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_5_251d2d18-b531-457a-81d2-8a77a2151dbc.png?v=1729950268', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_6.png?v=1729950270'],
  false,
  true,
  '[{"name": "Moyen", "price": 60.0}, {"name": "Grand", "price": 80.0}, {"name": "Très Grand", "price": 150.0}]'::jsonb,
  '[{"name": "Blanc"}, {"name": "Rose"}]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Coeur',
  'coeur',
  'Description : Cet arrangement floral en forme de cœur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Si vous le souhaitez, vous pouvez ajouter un ruban avec une inscription de votre choix (par exemple : À notre maman chérie , Repose en paix , Ton fils pour toujours ...). Merci d''indiquer le message à inscrire sur le ruban, ainsi que le nom du défunt, dans l''espace “Créez votre carte message” au moment de la validation de votre panier. (Nos produits de la catégories deuil sont disponibles exclusivement en livraison locale. Merci de vérifier votre adresse avant de passer commande) Composition : moyen 30 cm : 200€ grande 50 cm : 280€ très grande 60 cm : 380€ Taille moyenne affiché Charte qualité Anne Freret : Votre composition sera confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Deuil & Hommages',
  200.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/348A6A99-5D2C-4C43-99C2-8A53E018715C.jpg?v=1729195556'],
  false,
  true,
  '[{"name": "Moyen", "price": 200.0}, {"name": "Grand", "price": 280.0}, {"name": "Très Grand", "price": 380.0}]'::jsonb,
  '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Croix Funéraire',
  'croix-blanche',
  'Description : Cet arrangement floral en forme de croix, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Si vous le souhaitez, vous pouvez ajouter un ruban avec une inscription de votre choix (par exemple : À notre maman chérie , Repose en paix , Ton fils pour toujours ...). Merci d''indiquer le message à inscrire sur le ruban, ainsi que le nom du défunt, dans l''espace “Créez votre carte message” au moment de la validation de votre panier. (Nos produits de la catégories deuil sont disponibles exclusivement en livraison locale. Merci de vérifier votre adresse avant de passer commande) Composition : moyen 60 cm de longueur : 220€ grande 80 cm de longueur : 330€ très grande 100 cm de longueur : 430€ Taille grande affiché Charte qualité Anne Freret : Votre composition sera confectionnée à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Deuil & Hommages',
  220.0,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9458.jpg?v=1729195833', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9459.jpg?v=1729195833'],
  false,
  true,
  '[{"name": "Moyen", "price": 220.0}, {"name": "Grand", "price": 330.0}, {"name": "Très Grand", "price": 430.0}]'::jsonb,
  '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Le choix du fleuriste',
  'le-choix-du-fleuriste',
  'Description : Et pourquoi pas vivre une aventure ? Laissez libre choix à nos equipes ! Elles se chargerons du choix des fleurs. Composition : Choix libre du fleuriste Photo non contractuelle. Charte qualité Anne Freret : Votre bouquet est confectionné à la main par un artisan fleuriste dans nos ateliers Normands et Bretons pour garantir une qualité optimale. Maître artisan bouquetiste et son équipe créent dans notre laboratoire en Baie du Mont-Saint-Michel. Note : Votre arrangement floral, réalisé avec des fleurs fraîches, peut légèrement différer du visuel présenté en raison de la saisonnalité ou des récoltes. Certains végétaux peuvent être remplacés par des équivalents pour maintenir la qualité.',
  'Bouquets',
  39.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'],
  true,
  true,
  '[{"name": "Moyen", "price": 39.9}, {"name": "Grand", "price": 49.9}, {"name": "Très grand", "price": 79.9}, {"name": "XXL", "price": 99.9}]'::jsonb,
  '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Automnale"}]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Box Mariage sur la plage',
  'mariage-sur-la-plage',
  'Inscription Nos "Box Mariage" se composent d''un bouquet et d''un peigne pour la mariée et d''une boutonnière assortie pour le marié. Bouquet : 20cm de diamètre pour 25cm de hauteur environ, finition de la poignée en cordelette. Boutonnière : montée sur épingle, 7cm environ. Peigne : 10cm environ. Composition: Miscanthus, delphinium, graine de dill, hortensia, stipa, briza maxima, gypsophile Prix de la box : 118.90€ Charte qualité Anne Freret : Votre box sera réalisée à la main juste avant sa livraison par un artisan fleuriste dans nos ateliers Normands et Bretons vous garantissant ainsi un produit d''une qualité optimale. Maître artisan bouquetiste et son équipe de pro ! Laboratoire créatif en Baie du Mont Saint Michel. Note: - Fleurs séchées et stabilisées pour une longue conservation - Quantité limitée - Produit unique - Pour un produit personnalisé envoyer nous un mail ou appeler au 02 33 50 26 15',
  'Mariages',
  118.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png?v=1684426619', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_48965a48-1161-4bf2-abf5-6ebac369097a.png?v=1684426600', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/3_5df940aa-8d02-4924-a90c-03212a5974f2.png?v=1684426599', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/4_e20c2393-b7b4-4869-ba4a-1a3ff59cde37.png?v=1684426600'],
  true,
  true,
  '[]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Box Mariage Exotique',
  'box-exotique',
  'Inscription Nos "Box Mariage" se composent d''un bouquet et d''un peigne pour la mariée et d''une boutonnière assortie pour le marié. Bouquet : 25cm de diamètre pour 30cm de hauteur environ, finition de la poignée en cordelette. Boutonnière : montée sur épingle, 7cm environ. Peigne : 10cm environ. Composition: Hortensia, feuille de palmier, immortelle, graine de dill, pampa, lagurus, phalaris, gypsophile, stipa, graine de nigelle, graminée. Prix de la box : 139.90€ Charte qualité Anne Freret : Votre box sera réalisée à la main juste avant sa livraison par un artisan fleuriste dans nos ateliers Normands et Bretons vous garantissant ainsi un produit d''une qualité optimale. Maître artisan bouquetiste et son équipe de pro ! Laboratoire créatif en Baie du Mont Saint Michel. Note: - Fleurs séchées et stabilisées pour une longue conservation - Quantité limitée - Produit unique - Pour un produit personnalisé envoyer nous un mail ou appeler au 02 33 50 26 15',
  'Mariages',
  139.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png?v=1684426912', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_d1c3a206-ccf7-492a-83eb-58032b0ff5ac.png?v=1684426912', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/3_654271a7-84a8-48b7-bc67-be8581cead52.png?v=1684426912', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/4_a51f0e9c-b798-438f-8327-954e50e40677.png?v=1684426912'],
  true,
  true,
  '[]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Box Champêtre Lila',
  'box-champetre-lila',
  'Inscription Nos "Box Mariage" se composent d''un bouquet et d''un peigne pour la mariée et d''une boutonnière assortie pour le marié. Bouquet : 20cm de diamètre pour 25cm de hauteur environ, finition de la poignée en cordelette. Boutonnière : montée sur épingle, 7cm environ. Peigne : 10cm environ. Composition: Amarante, miscanthus, phalaris, phalaris, grain d''aneth, limonium, gypsophile, lagurus, stipa Prix de la box : 118.90€ Charte qualité Anne Freret : Votre box sera réalisée à la main juste avant sa livraison par un artisan fleuriste dans nos ateliers Normands et Bretons vous garantissant ainsi un produit d''une qualité optimale. Maître artisan bouquetiste et son équipe de pro ! Laboratoire créatif en Baie du Mont Saint Michel. Note: - Fleurs séchées et stabilisées pour une longue conservation - Quantité limitée - Produit unique - Pour un produit personnalisé envoyer nous un mail ou appeler au 02 33 50 26 15',
  'Mariages',
  118.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/4.png?v=1684426098', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png?v=1684426098', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/3_8fee3a6a-0133-48f0-834d-87fb1f0b3686.png?v=1684426098'],
  true,
  true,
  '[]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, sizes, variants, is_active)
VALUES (
  'Lilou',
  'lilou',
  'Description : S''il y a bien une fleur qui vous invite au voyage et à la rêverie, c''est l''orchidée. Aujourd''hui accompagnée de son cache pot tissé Anne Freret, elle viendra illuminer votre intérieur ou celui de votre destinataire, de toute sa délicatesse. Succombez à sa forme atypique et romantique sans précédent. L''orchidée s''adapte à son environnement mais nécessite un arrosage régulier et beaucoup d''attention et d''amour. Avec cette belle couleur blanche, cette fleur illuminera votre intérieur. Composition : Orchidée phalaenopsis d''environ 50 cm. Le cache pot peut varier suivant les collections. Charte qualité Anne Freret : Chaque plante de notre collection est soigneusement sélectionnée par nos artisans fleuristes dans nos ateliers situés en Normandie et en Bretagne, pour vous garantir une qualité exceptionnelle. Maître artisan bouquetiste et son équipe veillent à choisir des végétaux robustes et élégants, cultivés avec soin, pour vous offrir des compositions naturelles uniques. Note : Les plantes étant des éléments vivants, leur apparence peut légèrement différer des visuels présentés en ligne en fonction de leur croissance et des conditions saisonnières.',
  'Bouquets',
  49.9,
  ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_9617_1.jpg?v=1729873705'],
  false,
  true,
  '[]'::jsonb,
  '[]'::jsonb,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  sizes = EXCLUDED.sizes,
  variants = EXCLUDED.variants,
  updated_at = CURRENT_TIMESTAMP;