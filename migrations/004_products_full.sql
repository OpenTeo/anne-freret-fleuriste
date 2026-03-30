-- Migration 004: Produits complets avec données initiales
-- Ajoute tous les champs manquants et insère les 18 produits de mock-data.ts

-- Ajouter les nouveaux champs à la table products
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS sizes JSONB DEFAULT '[]';
ALTER TABLE products ADD COLUMN IF NOT EXISTS variants JSONB DEFAULT '[]';
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1);
ALTER TABLE products ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT TRUE;

-- Créer un index pour la recherche par tags
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN (tags);

-- Insérer les 18 produits de mock-data.ts
-- BOUQUETS (ids 2-13)
INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, tags, sizes, rating, review_count)
VALUES 
  (
    'Barneville-Carteret',
    'barneville-carteret',
    'Cette délicate composition s''accompagne de lisianthus, de dille, de roses, de limonum, et blé le tout entouré d''un délicat feuillage. Une invitation à la tendresse d''un simple rêve, aussi furtif qu''un éclair, qui déposera dans votre intérieur une ambiance aérienne et coquette. Composition : Lisianthus blanc, dille, rose blanche, limonum blanc, blé et feuillages mélangés.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619'],
    true,
    true,
    ARRAY['lisianthus', 'roses', 'dille', 'tendresse'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.7,
    3
  ),
  (
    'La pointe d''Agon',
    'la-pointe-d-agon',
    'Ce bouquet rafraîchissant, avec des teintes vives est parfait pour apporter une touche d''énergie et de vivacité dans votre intérieur. Offrez un bouquet acidulé pour égayer le quotidien et surprendre vos proches. Composition : Rose frisée blanche, chardon sec blanc, phlox blanc, lisianthus blanc, dille graine, mélange de feuillages de saison.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275'],
    true,
    true,
    ARRAY['teintes vives', 'énergie', 'vivacité', 'rafraîchissant'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.8,
    10
  ),
  (
    'Le Saint-Pairais',
    'le-saint-pairais',
    'Le Bouquet du fleuriste est le mélange parfait pour sublimer vos intérieurs ou bien même pour faire plaisir à vos proches. N''hésitez plus pour l''offrir à quelqu''un d''important à vos yeux. Composition : Bouquet frais composé de Rose branchue rose, Renoncule Clone du Var, Wax Flower, Lisianthus double rose, Graminée rose, Feuillages d''hivers.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-20250201-WA0008.jpg?v=1738607322'],
    false,
    true,
    ARRAY['roses délicates', 'pastel', 'champêtre', 'douceur'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.4,
    26
  ),
  (
    'Grany',
    'grany',
    'Craquez pour cet ensemble de fleurs à vous faire tomber de bonheur. Avec ces couleurs dans les tonalités de rose qui viendront apporter de la fraîcheur à votre intérieur. Composition : Rose pâle sweet, wax fleur, tulipe dentelé, renoncule rose pâle, lisianthus marbré, genet feuillages mélangés.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_3a2e9857-fa21-42db-b89a-47630ccdf35d.png?v=1684428237'],
    true,
    true,
    ARRAY['rose pâle', 'wax fleur', 'tulipe dentelé', 'fraîcheur'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.3,
    26
  ),
  (
    'Val es fleur',
    'val-es-fleur',
    'Lisianthus frisés d''un blanc immaculé, semblables à de fines dentelles, se mêlent à des touches de verdure tendre dans cette composition épurée et lumineuse. La texture vaporeuse des pétaux ondulés apporte un volume généreux sans jamais perdre en élégance. Parfait pour un intérieur clair ou une occasion qui appelle la simplicité raffinée, ce bouquet tient magnifiquement 8 à 10 jours en vase.',
    'Bouquets',
    39.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058'],
    true,
    true,
    ARRAY['lisianthus frisé', 'blanc', 'grâce', 'finesse'],
    '[{"name": "Moyen", "price": 39.90}, {"name": "Grand", "price": 49.90}, {"name": "Très grand", "price": 69.90}]'::jsonb,
    4.9,
    5
  ),
  (
    'La croix du lude',
    'la-croix-du-lude',
    'Tendrissime brassée de fleurs aux teintes roses. Travaillé en abondance, ce joli bouquet aux couleurs pastel séduit par son homogénéité de tons avant de subjuguer par le mariage de ses essences. Une essence innocente apportée avec douceur par la présence du bouquet la croix du lude. A offrir amoureusement, amicalement mais aussi tendrement aux êtres qui vous sont précieux. Composition : bouvardia, rose gros bouton, lisianthus double rose pâle, eucalyptus, feuillage de saison.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton2.jpg?v=1625149279'],
    false,
    true,
    ARRAY['teintes roses', 'pastel', 'homogène', 'abondant'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.7,
    4
  ),
  (
    'Éveil de Normandie',
    'eveil-de-normandie',
    'Offrez un instant de douceur avec le Bouquet Douce Harmonie, une composition florale raffinée qui évoque la pureté et la délicatesse. Ses roses blanches Avalanche majestueuses, associées à des fleurs aux teintes subtiles et un feuillage aérien, en font le cadeau parfait pour transmettre un message de sérénité et d''affection. Composition : Roses blanches Avalanche, lisianthus, graminées, gypsophile, hypericum, giroflée, phlox, hortensia, eucalyptus médaillon et statice vert.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798'],
    false,
    true,
    ARRAY['rose frisée', 'chardon', 'normandie', 'sauvage'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.2,
    9
  ),
  (
    'La pointe du Roc',
    'la-pointe-du-roc',
    'Voici l''un des chouchous de la collection Anne Freret. Nous on l''adore parce qu''avec ses ravissants tons rose clair, il nous rappelle les événements heureux de la vie. Soyez certains de faire plaisir avec cette jolie composition de roses. Composition : Rose sweet advance, pampa rose, wax blanc, statice rose, oeillet poudré, lisianthus rose pâle, feuillages mélangés.',
    'Bouquets',
    59.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454'],
    false,
    true,
    ARRAY['chouchou', 'rose clair', 'événements heureux', 'vie'],
    '[{"name": "Moyen", "price": 59.90}, {"name": "Grand", "price": 69.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.4,
    22
  ),
  (
    'Le Chausiais',
    'le-chausiais',
    'Le Chausiais est une composition généreuse et chaleureuse aux tonalités roses. Chaque tige est soigneusement choisie par notre fleuriste pour créer un ensemble harmonieux et plein de caractère. Un bouquet qui illumine une pièce et réchauffe le cœur. Composition : Rose branchue rose, Renoncule Clone du Var, Wax Flower, Lisianthus double rose, Graminée rose, Feuillages d''hiver.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00002_b6f2b70f-619d-4105-b4e8-f74941e8c689.jpg?v=1639823258'],
    false,
    true,
    ARRAY['mélange parfait', 'sublimer', 'intérieurs', 'plaisir'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.2,
    9
  ),
  (
    'Le choix du fleuriste',
    'le-choix-du-fleuriste',
    'Et pourquoi pas vivre une aventure ? Laissez libre choix à nos équipes ! Elles se chargeront du choix des fleurs. Composition : Choix libre du fleuriste. Photo non contractuelle.',
    'Bouquets',
    39.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798'],
    true,
    true,
    ARRAY['surprise', 'expertise', 'unique'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.8,
    25
  ),
  (
    'Le Hérel',
    'le-herel',
    'Ce bouquet raffiné, composé de roses rouges intenses et de fleurs pastel délicates, incarne l''élégance et l''émotion. Parfait pour exprimer un amour profond, une gratitude sincère ou pour marquer un moment spécial, il allie romantisme et tendresse. Les nuances vibrantes des roses rouges se mêlent harmonieusement aux teintes douces des fleurs roses et blanches, créant une composition à la fois chaleureuse et apaisante. Offrez ce bouquet pour transmettre vos sentiments avec grâce et poésie. Composition : Roses Pink Mondial, Roses Red Naomi, Roses Espérances, Lisianthus, rose frisé, Wax rose.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin2.jpg?v=1625151901'],
    true,
    true,
    ARRAY['roses rouges', 'pastel', 'dramatique', 'premium'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.6,
    10
  ),
  (
    'Le Jullouvillais',
    'le-jullouvillais',
    'Avec ses tons doux et ses textures aériennes, ce bouquet évoque la beauté naturelle et la sérénité. Composé de roses poudrées, de fleurs sauvages et de feuillages délicats, il capture l''essence d''un charme champêtre tout en restant raffiné. Idéal pour célébrer un moment d''exception ou pour offrir une parenthèse de douceur, ce bouquet intemporel est une ode à la nature et à l''élégance. Composition : Rose Sweet Advance, Limonium pêche, Miscanthus séché, Panicum, Bouvardia, Alstromère rose.',
    'Bouquets',
    49.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose2.jpg?v=1625070100'],
    true,
    true,
    ARRAY['tons doux', 'textures aériennes', 'sérénité', 'raffiné'],
    '[{"name": "Moyen", "price": 49.90}, {"name": "Grand", "price": 59.90}, {"name": "Très grand", "price": 99.90}]'::jsonb,
    4.6,
    11
  )
ON CONFLICT (slug) DO NOTHING;

-- MARIAGES (ids 14-16)
INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, tags, rating, review_count)
VALUES 
  (
    'Box Champêtre Lila',
    'box-champetre-lila',
    'Nos "Box Mariage" se composent d''un bouquet et d''un peigne pour la mariée et d''une boutonnière assortie pour le marié. Bouquet : 20cm de diamètre pour 25cm de hauteur environ, finition de la poignée en cordelette. Boutonnière : montée sur épingle, 7cm environ. Peigne : 10cm environ. Composition : Amarante, miscanthus, phalaris, grain d''aneth, limonium, gypsophile, lagurus, stipa. Fleurs séchées et stabilisées pour une longue conservation.',
    'Bouquets',
    118.90,
    ARRAY['https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png', 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098', 'https://fleuriste-annefreret.com/cdn/shop/files/279170543_782557459396911_8647938960483584919_n-min_1024x1024_crop_center.jpg'],
    true,
    true,
    ARRAY['nuptial', 'champêtre', 'lila', 'harmonie'],
    4.8,
    3
  ),
  (
    'Box Mariage Exotique',
    'box-mariage-exotique',
    'Évadez-vous avec cette Box Mariage aux accents exotiques. Un ensemble complet — bouquet généreux (25cm × 30cm), peigne fleuri et boutonnière assortie — dans des teintes chaudes et ensoleillées. Finition poignée en cordelette. Composition : Hortensia, feuille de palmier, immortelle, graine de dill, pampa, lagurus, phalaris, gypsophile, stipa, graine de nigelle, graminée. Fleurs séchées et stabilisées pour une longue conservation.',
    'Bouquets',
    139.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png?v=1684426912'],
    true,
    true,
    ARRAY['tropical', 'orchidées', 'aventure', 'passion'],
    4.8,
    8
  ),
  (
    'Box Mariage sur la plage',
    'box-mariage-sur-la-plage',
    'Rêvez de vagues et de sable fin avec cette Box Mariage inspirée du bord de mer. Un trio élégant — bouquet délicat (20cm × 25cm), peigne et boutonnière — dans des tons naturels et apaisants. Finition poignée en cordelette. Composition : Miscanthus, delphinium, graine de dill, hortensia, stipa, briza maxima, gypsophile. Fleurs séchées et stabilisées pour une longue conservation.',
    'Bouquets',
    118.90,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png?v=1684426619'],
    true,
    true,
    ARRAY['marin', 'nacrés', 'vagues', 'symphonie'],
    4.8,
    13
  )
ON CONFLICT (slug) DO NOTHING;

-- DEUIL & HOMMAGES (ids 17-22)
INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, tags, variants, rating, review_count)
VALUES 
  (
    'Chemin de Sérénité',
    'chemin-de-serenite',
    'Cet arrangement floral tout en longueur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    'Deuil & Hommages',
    170,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquette.jpg?v=1737645211'],
    true,
    true,
    ARRAY['raquette', 'paix', 'éternité', 'réconfort'],
    '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
    4.4,
    9
  ),
  (
    'Coeur',
    'coeur',
    'Cet arrangement floral en forme de cœur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    'Deuil & Hommages',
    200,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556'],
    false,
    true,
    ARRAY['cœur fleuri', 'transcende', 'souvenirs', 'éternité'],
    '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
    5.0,
    13
  ),
  (
    'Couronne',
    'couronne',
    'Cet arrangement floral tout en rondeur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    'Deuil & Hommages',
    250,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466'],
    false,
    true,
    ARRAY['majestueuse', 'intemporel', 'éternité', 'noblesse'],
    '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
    4.3,
    15
  ),
  (
    'Coussin',
    'coussin',
    'Cet arrangement floral, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    'Deuil & Hommages',
    120,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_3.png?v=1729873535'],
    false,
    true,
    ARRAY['refuge', 'tendresse', 'havre de paix', 'précieux'],
    '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
    4.3,
    14
  ),
  (
    'Croix Funéraire',
    'croix-funeraire',
    'Cet arrangement floral en forme de croix, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d''un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d''affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    'Deuil & Hommages',
    220,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9458.jpg?v=1729195833'],
    false,
    true,
    ARRAY['sacrée', 'foi', 'espérance', 'lumière'],
    '[{"name": "Blanc"}, {"name": "Rose"}, {"name": "Coloré"}]'::jsonb,
    4.7,
    28
  ),
  (
    'Jardin de plantes',
    'jardin-de-plantes',
    'Ce jardin de plantes est une composition végétale pensée pour durer dans le temps. Un ensemble harmonieux de plantes vertes et fleuries, soigneusement sélectionnées pour leur résistance et leur beauté naturelle. Un hommage vivant et respectueux, symbole de renouveau et de mémoire. Plantes variables selon les saisons. Disponible exclusivement en livraison locale.',
    'Deuil & Hommages',
    60,
    ARRAY['https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_5_251d2d18-b531-457a-81d2-8a77a2151dbc.png?v=1729950268'],
    false,
    true,
    ARRAY['éternité', 'persistant', 'renouveau', 'saisons'],
    '[{"name": "Blanc"}, {"name": "Rose"}]'::jsonb,
    4.2,
    17
  )
ON CONFLICT (slug) DO NOTHING;

-- PLANTES (ids 23-26)
INSERT INTO products (name, slug, description, category, price, images, featured, in_stock, tags, sizes, rating, review_count)
VALUES 
  (
    'Monstera Deliciosa',
    'monstera-deliciosa',
    'Feuilles découpées d''un vert profond, port sculptural et allure résolument tropicale : le Monstera Deliciosa transforme chaque intérieur en jardin d''hiver. Il apprécie une lumière vive indirecte et un arrosage modéré toutes les semaines, laissant le substrat sécher entre deux apports. Livré dans un pot en céramique artisanale, il purifie naturellement l''air et gagne en majesté au fil des mois.',
    'Plantes',
    34.90,
    ARRAY['https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800'],
    true,
    true,
    ARRAY['tropical', 'intérieur', 'dépolluante', 'céramique'],
    '[{"name": "Petit (40cm)", "price": 34.90}, {"name": "Moyen (60cm)", "price": 49.90}, {"name": "Grand (80cm)", "price": 69.90}]'::jsonb,
    4.8,
    22
  ),
  (
    'Olivier d''ornement',
    'olivier-ornement',
    'Tronc noueux patiné par le temps et feuillage argenté frémissant : cet olivier d''ornement insuffle une élégance méditerranéenne à votre intérieur. Il aime la lumière directe, supporte la sécheresse passagère et demande un arrosage espacé toutes les 10 à 14 jours. Livré dans un cache-pot en terre cuite, il incarne la paix et la longévité, et devient au fil des ans une véritable pièce maîtresse.',
    'Plantes',
    44.90,
    ARRAY['https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=800'],
    true,
    true,
    ARRAY['méditerranéen', 'élégant', 'longévité', 'terre cuite'],
    '[{"name": "Petit (35cm)", "price": 44.90}, {"name": "Moyen (50cm)", "price": 64.90}, {"name": "Grand (70cm)", "price": 89.90}]'::jsonb,
    4.7,
    15
  ),
  (
    'Ficus Lyrata',
    'ficus-lyrata',
    'Grandes feuilles vernissées en forme de lyre, port élancé et présence affirmée : le Ficus Lyrata est une véritable sculpture végétale vivante. Il s''épanouit en lumière vive indirecte et apprécie un arrosage régulier lorsque le terreau est sec en surface, environ une fois par semaine. Évitez les courants d''air et offrez-lui un emplacement stable — il vous le rendra par une croissance généreuse et un feuillage spectaculaire.',
    'Plantes',
    39.90,
    ARRAY['https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=800'],
    false,
    true,
    ARRAY['sculptural', 'intérieur', 'luxuriant', 'design'],
    '[{"name": "Petit (45cm)", "price": 39.90}, {"name": "Moyen (70cm)", "price": 59.90}, {"name": "Grand (100cm)", "price": 89.90}]'::jsonb,
    4.6,
    18
  ),
  (
    'Trio de succulentes',
    'trio-succulentes',
    'Trois succulentes aux formes graphiques et aux teintes allant du vert jade au mauve poudré, présentées dans de petits pots en béton brut au style contemporain. Quasi-indestructibles, elles ne demandent qu''un rebord de fenêtre lumineux et un arrosage tous les 10 à 15 jours. Parfaites pour offrir à ceux qui n''ont pas la main verte ou pour habiller un bureau, une étagère ou une table basse avec élégance.',
    'Plantes',
    24.90,
    ARRAY['https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800'],
    false,
    true,
    ARRAY['succulentes', 'bureau', 'cadeau', 'graphique'],
    '[{"name": "Trio classique", "price": 24.90}, {"name": "Trio premium (pot céramique)", "price": 34.90}]'::jsonb,
    4.9,
    26
  )
ON CONFLICT (slug) DO NOTHING;

-- ACCESSOIRES (ids 27-30)
INSERT INTO products (name, slug, description, category, price, images, in_stock, tags, rating, review_count)
VALUES 
  (
    'Bougie parfumée',
    'bougie-parfumee',
    'Coulée à la main en Normandie dans de la cire de soja naturelle, cette bougie au parfum délicat de fleur de coton diffuse une lumière douce et un sillage aérien dans toute la pièce. Sa mèche en coton naturel assure une combustion propre et régulière pendant environ 40 heures. Présentée dans un contenant en verre fumé réutilisable, elle accompagne idéalement un bouquet pour un cadeau complet et raffiné.',
    'Accessoires',
    12.90,
    ARRAY['https://images.unsplash.com/photo-1602607207102-04a2d3beeab4?w=800&q=85'],
    true,
    ARRAY['bougie', 'soja', 'normande', 'cadeau'],
    4.8,
    19
  ),
  (
    'Vase en céramique',
    'vase-ceramique',
    'Vase en céramique tourné à la main, aux lignes organiques et à la finition crème mat légèrement texturée au toucher. D''une hauteur de 18 cm, sa silhouette épurée met en valeur aussi bien un bouquet généreux qu''une branche unique. Chaque pièce est légèrement différente, témoignage du geste artisanal. Un objet décoratif à part entière, même sans fleurs.',
    'Accessoires',
    19.90,
    ARRAY['https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=85'],
    true,
    ARRAY['vase', 'céramique', 'artisanal', 'déco'],
    4.7,
    14
  ),
  (
    'Coffret chocolats artisanaux',
    'coffret-chocolats',
    'Coffret élégant de chocolats artisanaux normands, déclinés en noir intense, lait onctueux et blanc crémeux. Fourrages praliné noisette, ganache au cacao grand cru et caramel beurre salé se dévoilent sous des coques finement travaillées. L''accompagnement parfait pour sublimer un bouquet et transformer une attention florale en cadeau gourmand d''exception.',
    'Accessoires',
    14.90,
    ARRAY['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=85'],
    true,
    ARRAY['chocolat', 'belge', 'cadeau', 'coffret'],
    4.9,
    23
  ),
  (
    'Sachet de graines sauvages',
    'sachet-graines-sauvages',
    'Mélange de graines de fleurs sauvages — coquelicots écarlates, bleuets azur, marguerites lumineuses et cosmos aériens — à semer au printemps pour une floraison estivale généreuse. Présenté dans un sachet kraft illustré à la main, il fait un cadeau charmant et original pour les amoureux de nature. Couvre environ 2 m2 de prairie fleurie et attire papillons et abeilles au jardin.',
    'Accessoires',
    8.90,
    ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=85'],
    true,
    ARRAY['graines', 'sauvages', 'jardin', 'cadeau'],
    4.6,
    11
  )
ON CONFLICT (slug) DO NOTHING;
