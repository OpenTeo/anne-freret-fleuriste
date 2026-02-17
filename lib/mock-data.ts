export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  slug: string;
  featured: boolean;
  inStock: boolean;
  tags: string[];
  sizes?: { name: string; price: number }[];
  variants?: { name: string; price?: number }[];
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

export const categories = [
  'Bouquets',
  'Plantes',
  'Accessoires',
  'Deuil & Hommages',
];

export const mockProducts: Product[] = [
  // BOUQUETS
  {
    id: '2',
    name: 'Barneville-Carteret',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619'
    ],
    category: 'Bouquets',
    description: 'Cette délicate composition s\'accompagne de lisianthus, de dille, de roses, de limonum, et blé le tout entouré d\'un délicat feuillage. Une invitation à la tendresse d\'un simple rêve, aussi furtif qu\'un éclair, qui déposera dans votre intérieur une ambiance aérienne et coquette. Composition : Lisianthus blanc, dille, rose blanche, limonum blanc, blé et feuillages mélangés.',
    slug: 'barneville-carteret',
    featured: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 3,
    tags: ['lisianthus', 'roses', 'dille', 'tendresse'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '3',
    name: 'La pointe d\'Agon',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275'
    ],
    category: 'Bouquets',
    description: 'Ce bouquet rafraîchissant, avec des teintes vives est parfait pour apporter une touche d\'énergie et de vivacité dans votre intérieur. Offrez un bouquet acidulé pour égayer le quotidien et surprendre vos proches. Composition : Rose frisée blanche, chardon sec blanc, phlox blanc, lisianthus blanc, dille graine, mélange de feuillages de saison.',
    slug: 'la-pointe-d-agon',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 10,
    tags: ['teintes vives', 'énergie', 'vivacité', 'rafraîchissant'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '4',
    name: 'Le Saint-Pairais',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-20250201-WA0008.jpg?v=1738607322',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-20250201-WA0008.jpg?v=1738607322'
    ],
    category: 'Bouquets',
    description: 'Le Bouquet du fleuriste est le mélange parfait pour sublimer vos intérieurs ou bien même pour faire plaisir à vos proches. N\'hésitez plus pour l\'offrir à quelqu\'un d\'important à vos yeux. Composition : Bouquet frais composé de Rose branchue rose, Renoncule Clone du Var, Wax Flower, Lisianthus double rose, Graminée rose, Feuillages d\'hivers.',
    slug: 'le-saint-pairais',
    featured: false,
    inStock: true,
    rating: 4.4,
    reviewCount: 26,
    tags: ['roses délicates', 'pastel', 'champêtre', 'douceur'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '5',
    name: 'Grany',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_3a2e9857-fa21-42db-b89a-47630ccdf35d.png?v=1684428237',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_3a2e9857-fa21-42db-b89a-47630ccdf35d.png?v=1684428237'
    ],
    category: 'Bouquets',
    description: 'Craquez pour cet ensemble de fleurs à vous faire tomber de bonheur. Avec ces couleurs dans les tonalités de rose qui viendront apporter de la fraîcheur à votre intérieur. Composition : Rose pâle sweet, wax fleur, tulipe dentelé, renoncule rose pâle, lisianthus marbré, genet feuillages mélangés.',
    slug: 'grany',
    featured: true,
    inStock: true,
    rating: 4.3,
    reviewCount: 26,
    tags: ['rose pâle', 'wax fleur', 'tulipe dentelé', 'fraîcheur'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '6',
    name: 'Val es fleur',
    price: 39.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058'
    ],
    category: 'Bouquets',
    description: 'Lisianthus frisés d\'un blanc immaculé, semblables à de fines dentelles, se mêlent à des touches de verdure tendre dans cette composition épurée et lumineuse. La texture vaporeuse des pétales ondulés apporte un volume généreux sans jamais perdre en élégance. Parfait pour un intérieur clair ou une occasion qui appelle la simplicité raffinée, ce bouquet tient magnifiquement 8 à 10 jours en vase.',
    slug: 'val-es-fleur',
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 5,
    tags: ['lisianthus frisé', 'blanc', 'grâce', 'finesse'],
    sizes: [
      { name: 'Moyen', price: 39.90 },
      { name: 'Grand', price: 49.90 },
      { name: 'Très grand', price: 69.90 }
    ]
  },
  {
    id: '7',
    name: 'La croix du lude',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton2.jpg?v=1625149279',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton2.jpg?v=1625149279'
    ],
    category: 'Bouquets',
    description: 'Tendrissime brassée de fleurs aux teintes roses. Travaillé en abondance, ce joli bouquet aux couleurs pastel séduit par son homogénéité de tons avant de subjuguer par le mariage de ses essences. Une essence innocente apportée avec douceur par la présence du bouquet la croix du lude. A offrir amoureusement, amicalement mais aussi tendrement aux êtres qui vous sont précieux. Composition : bouvardia, rose gros bouton, lisianthus double rose pâle, eucalyptus, feuillage de saison.',
    slug: 'la-croix-du-lude',
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 4,
    tags: ['teintes roses', 'pastel', 'homogène', 'abondant'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '8',
    name: 'Éveil de Normandie',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Offrez un instant de douceur avec le Bouquet Douce Harmonie, une composition florale raffinée qui évoque la pureté et la délicatesse. Ses roses blanches Avalanche majestueuses, associées à des fleurs aux teintes subtiles et un feuillage aérien, en font le cadeau parfait pour transmettre un message de sérénité et d\'affection. Composition : Roses blanches Avalanche, lisianthus, graminées, gypsophile, hypericum, giroflée, phlox, hortensia, eucalyptus médaillon et statice vert.',
    slug: 'eveil-de-normandie',
    featured: false,
    inStock: true,
    rating: 4.2,
    reviewCount: 9,
    tags: ['rose frisée', 'chardon', 'normandie', 'sauvage'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '9',
    name: 'La pointe du Roc',
    price: 59.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454'
    ],
    category: 'Bouquets',
    description: 'Voici l\'un des chouchous de la collection Anne Freret. Nous on l\'adore parce qu\'avec ses ravissants tons rose clair, il nous rappelle les événements heureux de la vie. Soyez certains de faire plaisir avec cette jolie composition de roses. Composition : Rose sweet advance, pampa rose, wax blanc, statice rose, oeillet poudré, lisianthus rose pâle, feuillages mélangés.',
    slug: 'la-pointe-du-roc',
    featured: false,
    inStock: true,
    rating: 4.4,
    reviewCount: 22,
    tags: ['chouchou', 'rose clair', 'événements heureux', 'vie'],
    sizes: [
      { name: 'Moyen', price: 59.90 },
      { name: 'Grand', price: 69.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '10',
    name: 'Le Chausiais',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00002_b6f2b70f-619d-4105-b4e8-f74941e8c689.jpg?v=1639823258',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00002_b6f2b70f-619d-4105-b4e8-f74941e8c689.jpg?v=1639823258'
    ],
    category: 'Bouquets',
    description: 'Le Chausiais est une composition généreuse et chaleureuse aux tonalités roses. Chaque tige est soigneusement choisie par notre fleuriste pour créer un ensemble harmonieux et plein de caractère. Un bouquet qui illumine une pièce et réchauffe le cœur. Composition : Rose branchue rose, Renoncule Clone du Var, Wax Flower, Lisianthus double rose, Graminée rose, Feuillages d\'hiver.',
    slug: 'le-chausiais',
    featured: false,
    inStock: true,
    rating: 4.2,
    reviewCount: 9,
    tags: ['mélange parfait', 'sublimer', 'intérieurs', 'plaisir'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '11',
    name: 'Le choix du fleuriste',
    price: 39.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Et pourquoi pas vivre une aventure ? Laissez libre choix à nos équipes ! Elles se chargeront du choix des fleurs. Composition : Choix libre du fleuriste. Photo non contractuelle.',
    slug: 'le-choix-du-fleuriste',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 25,
    tags: ['surprise', 'expertise', 'unique'],
    variants: [
      { name: 'Blanc' },
      { name: 'Rose' },
      { name: 'Automnale' }
    ],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '12',
    name: 'Le Hérel',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin2.jpg?v=1625151901',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin2.jpg?v=1625151901'
    ],
    category: 'Bouquets',
    description: 'Ce bouquet raffiné, composé de roses rouges intenses et de fleurs pastel délicates, incarne l\'élégance et l\'émotion. Parfait pour exprimer un amour profond, une gratitude sincère ou pour marquer un moment spécial, il allie romantisme et tendresse. Les nuances vibrantes des roses rouges se mêlent harmonieusement aux teintes douces des fleurs roses et blanches, créant une composition à la fois chaleureuse et apaisante. Offrez ce bouquet pour transmettre vos sentiments avec grâce et poésie. Composition : Roses Pink Mondial, Roses Red Naomi, Roses Espérances, Lisianthus, rose frisé, Wax rose.',
    slug: 'le-herel',
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 10,
    tags: ['roses rouges', 'pastel', 'dramatique', 'premium'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },
  {
    id: '13',
    name: 'Le Jullouvillais',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose2.jpg?v=1625070100',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose2.jpg?v=1625070100'
    ],
    category: 'Bouquets',
    description: 'Avec ses tons doux et ses textures aériennes, ce bouquet évoque la beauté naturelle et la sérénité. Composé de roses poudrées, de fleurs sauvages et de feuillages délicats, il capture l\'essence d\'un charme champêtre tout en restant raffiné. Idéal pour célébrer un moment d\'exception ou pour offrir une parenthèse de douceur, ce bouquet intemporel est une ode à la nature et à l\'élégance. Composition : Rose Sweet Advance, Limonium pêche, Miscanthus séché, Panicum, Bouvardia, Alstromère rose.',
    slug: 'le-jullouvillais',
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 11,
    tags: ['tons doux', 'textures aériennes', 'sérénité', 'raffiné'],
    sizes: [
      { name: 'Moyen', price: 49.90 },
      { name: 'Grand', price: 59.90 },
      { name: 'Très grand', price: 99.90 }
    ]
  },

  // MARIAGES
  {
    id: '14',
    name: 'Box Champêtre Lila',
    price: 118.90,
    image: 'https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png',
    images: [
      'https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098',
      'https://fleuriste-annefreret.com/cdn/shop/files/279170543_782557459396911_8647938960483584919_n-min_1024x1024_crop_center.jpg'
    ],
    category: 'Bouquets',
    description: 'Nos "Box Mariage" se composent d\'un bouquet et d\'un peigne pour la mariée et d\'une boutonnière assortie pour le marié. Bouquet : 20cm de diamètre pour 25cm de hauteur environ, finition de la poignée en cordelette. Boutonnière : montée sur épingle, 7cm environ. Peigne : 10cm environ. Composition : Amarante, miscanthus, phalaris, grain d\'aneth, limonium, gypsophile, lagurus, stipa. Fleurs séchées et stabilisées pour une longue conservation.',
    slug: 'box-champetre-lila',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 3,
    tags: ['nuptial', 'champêtre', 'lila', 'harmonie']
  },
  {
    id: '15',
    name: 'Box Mariage Exotique',
    price: 139.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png?v=1684426912',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png?v=1684426912'
    ],
    category: 'Bouquets',
    description: 'Évadez-vous avec cette Box Mariage aux accents exotiques. Un ensemble complet — bouquet généreux (25cm × 30cm), peigne fleuri et boutonnière assortie — dans des teintes chaudes et ensoleillées. Finition poignée en cordelette. Composition : Hortensia, feuille de palmier, immortelle, graine de dill, pampa, lagurus, phalaris, gypsophile, stipa, graine de nigelle, graminée. Fleurs séchées et stabilisées pour une longue conservation.',
    slug: 'box-mariage-exotique',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 8,
    tags: ['tropical', 'orchidées', 'aventure', 'passion']
  },
  {
    id: '16',
    name: 'Box Mariage sur la plage',
    price: 118.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png?v=1684426619',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png?v=1684426619'
    ],
    category: 'Bouquets',
    description: 'Rêvez de vagues et de sable fin avec cette Box Mariage inspirée du bord de mer. Un trio élégant — bouquet délicat (20cm × 25cm), peigne et boutonnière — dans des tons naturels et apaisants. Finition poignée en cordelette. Composition : Miscanthus, delphinium, graine de dill, hortensia, stipa, briza maxima, gypsophile. Fleurs séchées et stabilisées pour une longue conservation.',
    slug: 'box-mariage-sur-la-plage',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 13,
    tags: ['marin', 'nacrés', 'vagues', 'symphonie']
  },

  // DEUIL & HOMMAGES
  {
    id: '17',
    name: 'Chemin de Sérénité',
    price: 170,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquette.jpg?v=1737645211',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquette.jpg?v=1737645211'
    ],
    category: 'Deuil & Hommages',
    description: 'Cet arrangement floral tout en longueur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d\'un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d\'affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    slug: 'chemin-de-serenite',
    featured: true,
    inStock: true,
    rating: 4.4,
    reviewCount: 9,
    tags: ['raquette', 'paix', 'éternité', 'réconfort'],
    variants: [
      { name: 'Blanc' },
      { name: 'Rose' },
      { name: 'Coloré' }
    ]
  },
  {
    id: '18',
    name: 'Coeur',
    price: 200,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556'
    ],
    category: 'Deuil & Hommages',
    description: 'Cet arrangement floral en forme de cœur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d\'un être cher, ce cœur fleuri est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d\'affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    slug: 'coeur',
    featured: false,
    inStock: true,
    rating: 5.0,
    reviewCount: 13,
    tags: ['cœur fleuri', 'transcende', 'souvenirs', 'éternité'],
    variants: [
      { name: 'Blanc' },
      { name: 'Rose' },
      { name: 'Coloré' }
    ]
  },
  {
    id: '19',
    name: 'Couronne',
    price: 250,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466'
    ],
    category: 'Deuil & Hommages',
    description: 'Cet arrangement floral tout en rondeur, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d\'un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d\'affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    slug: 'couronne',
    featured: false,
    inStock: true,
    rating: 4.3,
    reviewCount: 15,
    tags: ['majestueuse', 'intemporel', 'éternité', 'noblesse'],
    variants: [
      { name: 'Blanc' },
      { name: 'Rose' },
      { name: 'Coloré' }
    ]
  },
  {
    id: '20',
    name: 'Coussin',
    price: 120,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_3.png?v=1729873535',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_3.png?v=1729873535'
    ],
    category: 'Deuil & Hommages',
    description: 'Cet arrangement floral, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d\'un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d\'affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    slug: 'coussin',
    featured: false,
    inStock: true,
    rating: 4.3,
    reviewCount: 14,
    tags: ['refuge', 'tendresse', 'havre de paix', 'précieux'],
    variants: [
      { name: 'Blanc' },
      { name: 'Rose' },
      { name: 'Coloré' }
    ]
  },
  {
    id: '21',
    name: 'Croix Funéraire',
    price: 220,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9458.jpg?v=1729195833',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9458.jpg?v=1729195833'
    ],
    category: 'Deuil & Hommages',
    description: 'Cet arrangement floral en forme de croix, composé de roses aux teintes douces et délicates, est un hommage empreint de tendresse et de respect. Parfait pour exprimer votre amour et honorer la mémoire d\'un être cher, il est souvent choisi pour accompagner les moments de recueillement. Offrez un geste d\'affection unique avec cet hommage floral. Disponible exclusivement en livraison locale.',
    slug: 'croix-funeraire',
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 28,
    tags: ['sacrée', 'foi', 'espérance', 'lumière'],
    variants: [
      { name: 'Blanc' },
      { name: 'Rose' },
      { name: 'Coloré' }
    ]
  },
  {
    id: '22',
    name: 'Jardin de plantes',
    price: 60,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_5_251d2d18-b531-457a-81d2-8a77a2151dbc.png?v=1729950268',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_5_251d2d18-b531-457a-81d2-8a77a2151dbc.png?v=1729950268'
    ],
    category: 'Deuil & Hommages',
    description: 'Ce jardin de plantes est une composition végétale pensée pour durer dans le temps. Un ensemble harmonieux de plantes vertes et fleuries, soigneusement sélectionnées pour leur résistance et leur beauté naturelle. Un hommage vivant et respectueux, symbole de renouveau et de mémoire. Plantes variables selon les saisons. Disponible exclusivement en livraison locale.',
    slug: 'jardin-de-plantes',
    featured: false,
    inStock: true,
    rating: 4.2,
    reviewCount: 17,
    tags: ['éternité', 'persistant', 'renouveau', 'saisons'],
    variants: [
      { name: 'Blanc' },
      { name: 'Rose' }
    ]
  },
  // PLANTES
  {
    id: '23',
    name: 'Monstera Deliciosa',
    price: 34.90,
    image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Plantes',
    description: 'Feuilles découpées d\'un vert profond, port sculptural et allure résolument tropicale : le Monstera Deliciosa transforme chaque intérieur en jardin d\'hiver. Il apprécie une lumière vive indirecte et un arrosage modéré toutes les semaines, laissant le substrat sécher entre deux apports. Livré dans un pot en céramique artisanale, il purifie naturellement l\'air et gagne en majesté au fil des mois.',
    slug: 'monstera-deliciosa',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 22,
    tags: ['tropical', 'intérieur', 'dépolluante', 'céramique'],
    sizes: [
      { name: 'Petit (40cm)', price: 34.90 },
      { name: 'Moyen (60cm)', price: 49.90 },
      { name: 'Grand (80cm)', price: 69.90 }
    ]
  },
  {
    id: '24',
    name: 'Olivier d\'ornement',
    price: 44.90,
    image: 'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Plantes',
    description: 'Tronc noueux patiné par le temps et feuillage argenté frémissant : cet olivier d\'ornement insuffle une élégance méditerranéenne à votre intérieur. Il aime la lumière directe, supporte la sécheresse passagère et demande un arrosage espacé toutes les 10 à 14 jours. Livré dans un cache-pot en terre cuite, il incarne la paix et la longévité, et devient au fil des ans une véritable pièce maîtresse.',
    slug: 'olivier-ornement',
    featured: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 15,
    tags: ['méditerranéen', 'élégant', 'longévité', 'terre cuite'],
    sizes: [
      { name: 'Petit (35cm)', price: 44.90 },
      { name: 'Moyen (50cm)', price: 64.90 },
      { name: 'Grand (70cm)', price: 89.90 }
    ]
  },
  {
    id: '25',
    name: 'Ficus Lyrata',
    price: 39.90,
    image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Plantes',
    description: 'Grandes feuilles vernissées en forme de lyre, port élancé et présence affirmée : le Ficus Lyrata est une véritable sculpture végétale vivante. Il s\'épanouit en lumière vive indirecte et apprécie un arrosage régulier lorsque le terreau est sec en surface, environ une fois par semaine. Évitez les courants d\'air et offrez-lui un emplacement stable — il vous le rendra par une croissance généreuse et un feuillage spectaculaire.',
    slug: 'ficus-lyrata',
    featured: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 18,
    tags: ['sculptural', 'intérieur', 'luxuriant', 'design'],
    sizes: [
      { name: 'Petit (45cm)', price: 39.90 },
      { name: 'Moyen (70cm)', price: 59.90 },
      { name: 'Grand (100cm)', price: 89.90 }
    ]
  },
  {
    id: '26',
    name: 'Trio de succulentes',
    price: 24.90,
    image: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Plantes',
    description: 'Trois succulentes aux formes graphiques et aux teintes allant du vert jade au mauve poudré, présentées dans de petits pots en béton brut au style contemporain. Quasi-indestructibles, elles ne demandent qu\'un rebord de fenêtre lumineux et un arrosage tous les 10 à 15 jours. Parfaites pour offrir à ceux qui n\'ont pas la main verte ou pour habiller un bureau, une étagère ou une table basse avec élégance.',
    slug: 'trio-succulentes',
    featured: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 26,
    tags: ['succulentes', 'bureau', 'cadeau', 'graphique'],
    sizes: [
      { name: 'Trio classique', price: 24.90 },
      { name: 'Trio premium (pot céramique)', price: 34.90 }
    ]
  },
  // ACCESSOIRES & CADEAUX
  {
    id: '27',
    name: 'Bougie parfumée',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1602607207102-04a2d3beeab4?w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1602607207102-04a2d3beeab4?w=800&q=85'
    ],
    category: 'Accessoires',
    description: 'Coulée à la main en Normandie dans de la cire de soja naturelle, cette bougie au parfum délicat de fleur de coton diffuse une lumière douce et un sillage aérien dans toute la pièce. Sa mèche en coton naturel assure une combustion propre et régulière pendant environ 40 heures. Présentée dans un contenant en verre fumé réutilisable, elle accompagne idéalement un bouquet pour un cadeau complet et raffiné.',
    slug: 'bougie-parfumee',
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 19,
    tags: ['bougie', 'soja', 'normande', 'cadeau'],
  },
  {
    id: '28',
    name: 'Vase en céramique',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=85'
    ],
    category: 'Accessoires',
    description: 'Vase en céramique tourné à la main, aux lignes organiques et à la finition crème mat légèrement texturée au toucher. D\'une hauteur de 18 cm, sa silhouette épurée met en valeur aussi bien un bouquet généreux qu\'une branche unique. Chaque pièce est légèrement différente, témoignage du geste artisanal. Un objet décoratif à part entière, même sans fleurs.',
    slug: 'vase-ceramique',
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 14,
    tags: ['vase', 'céramique', 'artisanal', 'déco'],
  },
  {
    id: '29',
    name: 'Coffret chocolats artisanaux',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=85'
    ],
    category: 'Accessoires',
    description: 'Coffret élégant de chocolats artisanaux normands, déclinés en noir intense, lait onctueux et blanc crémeux. Fourrages praliné noisette, ganache au cacao grand cru et caramel beurre salé se dévoilent sous des coques finement travaillées. L\'accompagnement parfait pour sublimer un bouquet et transformer une attention florale en cadeau gourmand d\'exception.',
    slug: 'coffret-chocolats',
    featured: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 23,
    tags: ['chocolat', 'belge', 'cadeau', 'coffret'],
  },
  {
    id: '30',
    name: 'Sachet de graines sauvages',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=85'
    ],
    category: 'Accessoires',
    description: 'Mélange de graines de fleurs sauvages — coquelicots écarlates, bleuets azur, marguerites lumineuses et cosmos aériens — à semer au printemps pour une floraison estivale généreuse. Présenté dans un sachet kraft illustré à la main, il fait un cadeau charmant et original pour les amoureux de nature. Couvre environ 2 m2 de prairie fleurie et attire papillons et abeilles au jardin.',
    slug: 'sachet-graines-sauvages',
    featured: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 11,
    tags: ['graines', 'sauvages', 'jardin', 'cadeau'],
  },
];

export const featuredProducts = mockProducts.filter(product => product.featured);

export const testimonials = [
  {
    id: 1,
    name: 'Marie L.',
    rating: 5,
    comment: 'Encore plus beau en vrai',
    avatar: 'https://ui-avatars.com/api/?name=FM&background=c9a96e&color=0a0a0a&size=100'
  },
  {
    id: 2,
    name: 'Pierre D.',
    rating: 5,
    comment: 'Livraison rapide',
    avatar: 'https://ui-avatars.com/api/?name=CA&background=7d8c6e&color=f5f0eb&size=100'
  },
  {
    id: 3,
    name: 'Sophie M.',
    rating: 5,
    comment: 'Qualité exceptionnelle',
    avatar: 'https://ui-avatars.com/api/?name=KA&background=c9a96e&color=0a0a0a&size=100'
  },
  {
    id: 4,
    name: 'Claire B.',
    rating: 5,
    comment: 'Service parfait, je recommande vivement !',
    avatar: 'https://ui-avatars.com/api/?name=CM&background=7d8c6e&color=f5f0eb&size=100'
  },
  {
    id: 5,
    name: 'Jean-Paul R.',
    rating: 5,
    comment: 'Des créations florales magnifiques',
    avatar: 'https://ui-avatars.com/api/?name=LS&background=c9a96e&color=0a0a0a&size=100'
  }
];

export const blogPosts = [
  {
    id: 1,
    title: 'L\'art du bouquet champêtre : quand la Normandie s\'invite chez vous',
    excerpt: 'Il y a dans les champs normands une beauté que l\'on ne compose pas — on la cueille, on la ressent. Voici comment capturer cette grâce sauvage dans un bouquet.',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'art-composer-bouquet-champetre',
    date: '2026-02-10',
    category: 'Conseils',
    readTime: '6 min de lecture',
    author: 'Anne Freret',
    ctaTitle: 'Offrez-vous un bouquet champêtre',
    ctaDescription: 'Composé a la main dans notre atelier de Saint-Pair-sur-Mer, chaque bouquet capture l\'esprit sauvage et poétique de la campagne normande.',
    ctaLink: '/boutique',
    ctaLabel: 'Découvrir nos bouquets',
    content: `<p>Il existe un moment, au debut de l'été, où les chemins creux de la campagne normande se transforment en tableaux vivants. Les graminées ondulent sous le vent marin, les coquelicots percent entre les pierres, et les roses sauvages embaument l'air salé. C'est cette beauté-là — libre, imparfaite, profondément vivante — que nous cherchons à capturer dans chacun de nos bouquets champêtres chez Anne Freret.</p>

<p>Un bouquet champêtre n'est pas un arrangement que l'on dessine sur papier. C'est une émotion que l'on compose avec les mains, guidée par l'instinct et par cette connaissance intime des fleurs que seules les années de pratique enseignent.</p>

<h3>L'art de choisir : des fleurs qui se racontent</h3>
<p>La réussite d'un bouquet champêtre tient d'abord au choix des variétés. Il faut des fleurs qui semblent avoir poussé ensemble, qui se connaissent déjà. Chez Anne Freret, nous commençons toujours par une base généreuse — pivoines de saison, roses de jardin aux pétales froissés, hortensias aux teintes aquarellées — puis nous y glissons des fleurs plus discrètes qui font toute la magie : nigelles au coeur étoilé, scabieuses dansantes, matricaires qui rappellent les marguerites de notre enfance.</p>

<p>L'astuce que nous partageons avec nos clientes les plus curieuses : intégrez toujours au moins une fleur "inattendue". Un chardon bleu, une branche de fenouil sauvage, une tige de clématite. C'est cette note de surprise qui donne à votre bouquet ce caractère unique, ce sentiment d'avoir été cueilli à l'instant dans un jardin secret.</p>

<h3>Le feuillage : l'âme invisible du bouquet</h3>
<p>Si les fleurs sont les notes d'une mélodie, le feuillage en est le rythme. Sans lui, tout s'effondre. L'eucalyptus apporte sa texture argentée et son parfum discret. Le lierre dessine des lignes courbes qui adoucissent la composition. Les graminées ornementales — stipa, panicum, miscanthus — insufflent ce mouvement aérien qui distingue un bouquet champêtre authentique d'une simple botte de fleurs.</p>

<p>Nous aimons particulièrement travailler avec les feuillages de saison que nous trouvons lors de nos promenades matinales sur la côte : branches d'olivier sauvage, rameaux d'eucalyptus médaillon, fougères encore enroulées au printemps. Chaque saison dicte sa palette, et c'est tant mieux.</p>

<h3>La palette : trois couleurs, mille nuances</h3>
<p>La retenue est la clé. Trois à quatre couleurs suffisent, choisies dans des tons que la nature associe d'elle-même : le rose poudré des aurores normandes, le blanc crème des embruns, le vert sauge des haies bocagères, la lavande des premiers jours d'été. Si vous souhaitez une touche d'éclat, un seul coquelicot vermillon ou un unique chardon bleu acier suffira — comme un point d'exclamation dans une phrase murmurée.</p>

<h3>L'assemblage : l'éloge de l'imparfait</h3>
<p>Voici le secret le mieux gardé des fleuristes : un bouquet champêtre réussi ne doit jamais paraître trop parfait. La technique spirale guide nos mains — chaque tige tournée dans le même sens, les hauteurs variées avec intention — mais nous laissons toujours une part de liberté. Une rose qui penche, une graminée qui s'échappe, un lisianthus qui regarde ailleurs. C'est cette asymétrie maîtrisée, cette élégance nonchalante, qui fait que l'on s'arrête devant un bouquet et que l'on murmure : "C'est exactement ça."</p>

<p>Si vous souhaitez recevoir un bouquet qui porte en lui cette poésie des champs normands, nous en composons chaque semaine dans notre atelier de Saint-Pair-sur-Mer, avec les plus belles fleurs de la saison. <a href="/boutique">Découvrez nos créations du moment</a> et laissez la Normandie s'inviter chez vous.</p>`
  },
  {
    id: 2,
    title: 'Fleurs de mariage : comment créer une cérémonie inoubliable',
    excerpt: 'Le jour de votre mariage, les fleurs ne décorent pas — elles racontent votre histoire. Guide complet pour une mise en fleurs qui vous ressemble.',
    image: 'https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'preparer-mariage-guide-floral',
    date: '2026-02-05',
    category: 'Mariages',
    readTime: '8 min de lecture',
    author: 'Anne Freret',
    ctaTitle: 'Rêvons votre mariage ensemble',
    ctaDescription: 'Bouquet de mariée, boutonnière, décoration de cérémonie... Découvrez nos box mariage en fleurs séchées ou prenez rendez-vous pour une création sur mesure.',
    ctaLink: '/mariages',
    ctaLabel: 'Voir nos offres mariage',
    content: `<p>Il y a des jours qui comptent plus que les autres. Des jours où chaque détail devient un souvenir, où la lumière semble plus douce, où même l'air que l'on respire porte quelque chose de sacré. Votre mariage sera l'un de ces jours. Et les fleurs que vous choisirez ne seront pas de simples ornements — elles seront les témoins silencieux de votre histoire d'amour, le fil conducteur visuel de cette journée que vous raconterez encore dans trente ans.</p>

<p>Chez Anne Freret, nous avons le privilège d'accompagner des couples dans ce moment d'exception depuis notre atelier de Saint-Pair-sur-Mer. Chaque mariage est unique, et notre rôle est de traduire en fleurs ce que les mots peinent parfois à dire.</p>

<h3>Le timing : quand tout commence</h3>
<p>Nous aimons rencontrer nos futurs mariés six à neuf mois avant le grand jour. Non pas pour figer les choses — les plus belles idées viennent souvent tard — mais pour apprendre à se connaître. Nous parlons de vous : vos souvenirs d'enfance liés aux fleurs, le parfum qui vous rend nostalgique, la couleur qui vous fait sourire sans raison. C'est de ces conversations que naissent les compositions les plus justes.</p>

<p>Pour les mariages en haute saison — de juin à septembre en Normandie, quand la côte se pare de ses plus beaux atours — nous recommandons d'anticiper davantage encore. Les pivoines de juin, les dahlias d'août, les cosmos de septembre : chaque mois a ses trésors, et nous voulons vous garantir les plus beaux.</p>

<h3>Le bouquet de la mariée : votre signature florale</h3>
<p>C'est la pièce que l'on regarde en premier, celle que l'on voit sur toutes les photos. Votre bouquet doit vous ressembler autant que votre robe. Un bouquet rond et romantique pour une silhouette princesse. Une cascade de lierre et de jasmin pour une robe fluide. Un bouquet libre, presque sauvage, pour une cérémonie pieds nus sur le sable de Jullouville.</p>

<p>Nous créons également un bouquet de lancer, plus petit et plus résistant, pour que le geste soit aussi joyeux que symbolique. Et pour celles qui souhaitent conserver un souvenir éternel, nos <a href="/mariages">box mariage en fleurs séchées et stabilisées</a> comprennent bouquet, boutonnière et peigne assorti — des pièces qui traverseront le temps comme votre amour.</p>

<h3>La cérémonie : l'émotion en grand</h3>
<p>C'est ici que les fleurs déploient toute leur puissance. L'arche sous laquelle vous échangerez vos voeux peut être un simple cadre de bois habillé de feuillages, ou une explosion florale qui coupera le souffle de vos invités. Les bouts de bancs, délicatement fleuris, guident le regard vers vous. Un chemin de pétales murmure "c'est par ici que tout commence".</p>

<p>Notre conseil : concentrez votre budget floral sur les points focaux. L'arche de cérémonie, la table d'honneur, votre bouquet. Ce sont les lieux que l'objectif du photographe capturera le plus, et ce sont eux qui marqueront les mémoires.</p>

<h3>La réception : du rythme et de la poésie</h3>
<p>Les centres de table racontent la suite de l'histoire. Nous aimons alterner les hauteurs — grands vases élancés et compositions basses et généreuses — pour créer un rythme visuel qui accompagne celui de la soirée. Les détails font la différence : une fleur unique posée sur chaque serviette, un chemin de table végétal ponctué de bougies, des guirlandes de verdure qui adoucissent les lignes d'un chapiteau.</p>

<h3>Le budget : investir dans l'émotion</h3>
<p>Le budget floral représente en moyenne 8 à 12% du budget total d'un mariage. Chez Anne Freret, nous travaillons avec vous pour trouver l'équilibre parfait entre vos rêves et votre réalité. Nos box mariage démarrent à 118,90 euros pour une solution complète en fleurs séchées, et nos prestations sur mesure en fleurs fraîches s'adaptent à chaque projet.</p>

<p>Votre mariage mérite des fleurs à la hauteur de votre histoire. <a href="/mariages">Découvrez nos box mariage</a> ou contactez-nous pour imaginer ensemble la mise en fleurs de votre plus beau jour.</p>`
  },
  {
    id: 3,
    title: 'Les fleurs de février : un avant-goût de printemps sur votre table',
    excerpt: 'Tandis que l\'hiver murmure ses derniers souffles, tulipes, renoncules et anémones annoncent le renouveau. Portrait de ces fleurs qui illuminent février.',
    image: 'https://images.pexels.com/photos/18002540/pexels-photo-18002540.jpeg?auto=compress&w=800',
    slug: 'fleurs-saison-fevrier',
    date: '2026-02-01',
    category: 'Saisons',
    readTime: '5 min de lecture',
    author: 'Anne Freret',
    ctaTitle: 'Nos bouquets de saison',
    ctaDescription: 'Tulipes, renoncules, anémones... Nos compositions du moment célèbrent les plus belles fleurs de février, fraîchement arrivées dans notre atelier.',
    ctaLink: '/boutique',
    ctaLabel: 'Voir les bouquets du moment',
    content: `<p>Il y a quelque chose de profondément émouvant dans les fleurs de février. Dehors, le monde est encore engourdi — les matins sont froids, la lumière pâle, les jardins silencieux. Et pourtant, dans notre atelier de Saint-Pair-sur-Mer, c'est une tout autre histoire qui se joue. Les caisses arrivent de Hollande et du Var, et soudain, l'hiver recule : les tulipes déploient leurs courbes sensuelles, les renoncules dévoilent leurs jupons de soie, les anémones ouvrent leurs grands yeux cerclés de noir.</p>

<p>Février est peut-être le mois le plus poétique pour offrir des fleurs. Pas seulement à cause de la Saint-Valentin — mais parce que ces fleurs-là portent en elles une promesse : celle du printemps qui vient.</p>

<h3>La tulipe : reine incontestée du mois</h3>
<p>Il existe plus de trois mille variétés de tulipes, et chacune raconte une histoire différente. Chez Anne Freret, nous avons un faible pour les tulipes doubles, dont les pétales se superposent comme les pages d'un livre précieux, et pour les tulipes perroquet, ondulées et presque extravagantes, qui apportent un souffle de fantaisie à n'importe quelle composition.</p>

<p>Ce que nous aimons particulièrement chez la tulipe, c'est qu'elle continue de vivre dans le vase. Elle pousse, se courbe vers la lumière, change de posture au fil des jours. Un bouquet de tulipes n'est jamais le même deux matins de suite — c'est une oeuvre d'art en mouvement perpétuel.</p>

<h3>La renoncule : l'élégance à l'état pur</h3>
<p>Si la rose est la reine classique, la renoncule est la princesse moderne. Ses pétales, d'une finesse presque irréelle, se superposent en couches délicates qui évoquent le papier de soie le plus précieux. Disponible en blanc nacré, rose ancien, orange brûlé ou même vert chartreuse, elle se prête à toutes les inspirations. Nous la travaillons souvent en bouquets monochromes — un luxe discret qui fait sensation.</p>

<h3>L'anémone : le contraste saisissant</h3>
<p>Avec son coeur sombre cerné de pétales d'une blancheur éclatante, ou d'un rouge profond, ou d'un violet de velours, l'anémone est la fleur des contrastes. Elle apporte à nos compositions cette touche graphique et contemporaine que nos clientes adorent. Fragile en apparence mais étonnamment résistante, elle tient magnifiquement en vase et se marie avec tout.</p>

<h3>Le mimosa : quand le soleil entre dans la maison</h3>
<p>On ne peut parler de février sans évoquer le mimosa. Ses petites sphères d'or et son parfum poudreux — à mi-chemin entre le miel et la violette — sont une invitation immédiate au bonheur. En branche dans un grand vase, il suffit à lui seul à transformer une pièce. Intégré à un bouquet, il y glisse une lumière et une gaieté incomparables.</p>

<h3>Bien accueillir vos fleurs d'hiver</h3>
<p>Les fleurs de février aiment la fraîcheur. Recoupez les tiges en biseau dès réception, changez l'eau tous les deux jours et éloignez votre bouquet de toute source de chaleur et des corbeilles de fruits. Vos tulipes, en particulier, préféreront une eau fraîche et un espace lumineux sans soleil direct — elles vous récompenseront en déployant leurs pétales avec une grâce quotidiennement renouvelée.</p>

<p>Chaque semaine, nous composons de nouveaux bouquets au gré des arrivages et des saisons. <a href="/boutique">Découvrez nos créations du moment</a> et offrez-vous — ou offrez à quelqu'un que vous aimez — cette promesse de printemps que seules les fleurs de février savent tenir.</p>`
  },
  {
    id: 4,
    title: 'Cinq plantes d\'intérieur pour ceux qui n\'y croient plus',
    excerpt: 'Vous avez renoncé à avoir la main verte ? Ces cinq merveilles végétales vont vous réconcilier avec le vivant — sans effort, sans culpabilité.',
    image: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'plantes-interieur-debutants',
    date: '2026-01-25',
    category: 'Conseils',
    readTime: '5 min de lecture',
    author: 'Anne Freret',
    ctaTitle: 'Adoptez une plante',
    ctaDescription: 'Monstera, olivier, ficus, succulentes... Chaque plante est livrée avec ses conseils d\'entretien personnalisés pour une adoption réussie.',
    ctaLink: '/boutique',
    ctaLabel: 'Voir nos plantes',
    content: `<p>Nous les connaissons bien, ces regards un peu honteux lorsque nos clientes nous confient, à voix basse, qu'elles ont "tué" leur dernière plante. Comme si aimer le végétal tout en échouant à le maintenir en vie était un aveu de faiblesse. Rassurez-vous : il n'existe pas de fatalité botanique. Il n'existe que des plantes mal choisies pour l'espace qu'on leur offre.</p>

<p>Chez Anne Freret, nous croyons profondément que chaque intérieur mérite une présence végétale. Pas un bibelot vert posé dans un coin, mais une vraie compagne de vie — quelque chose qui respire, qui grandit, qui transforme subtilement l'atmosphère d'une pièce. Voici nos cinq recommandations pour celles et ceux qui ont décidé de réessayer.</p>

<h3>Le Pothos : l'indulgent</h3>
<p>Si le monde végétal avait un saint patron des débutants, ce serait le Pothos. Cette plante retombante au feuillage en forme de coeur pardonne tout : les oublis d'arrosage, les coins sombres, les absences prolongées. Ses lianes peuvent atteindre plusieurs mètres, cascadant depuis une étagère avec une nonchalance qui ferait pâlir un mannequin. Un arrosage lorsque la terre est sèche au toucher, et le tour est joué. Rien de plus.</p>

<h3>Le Sansevieria : l'architecte</h3>
<p>Avec ses feuilles dressées comme des lames, le Sansevieria — ou langue de belle-mère, un surnom qu'il porte avec une ironie botanique certaine — est la plante des minimalistes. Graphique, sculptural, presque architectural, il ne demande qu'un arrosage toutes les deux à trois semaines et supporte aussi bien la lumière vive que la pénombre. Bonus considérable : il purifie l'air et libère de l'oxygène la nuit, ce qui en fait le compagnon idéal d'une chambre.</p>

<h3>Le Zamioculcas : le survivant</h3>
<p>On le surnomme la plante ZZ, et il mérite un prix de résilience. Ses feuilles vernissées d'un vert profond stockent l'eau comme un chameau stocke ses réserves, ce qui le rend quasiment imperméable à la négligence. Il pousse lentement, certes, mais il pousse — même dans un bureau sans fenêtre, même quand on l'oublie des semaines entières. Si vous cherchez une plante qui vous survivra, c'est celle-ci.</p>

<h3>Le Monstera Deliciosa : l'iconique</h3>
<p>Ses grandes feuilles fenêtrées sont devenues le symbole d'un intérieur qui a du goût. Le Monstera aime la lumière indirecte et un arrosage hebdomadaire — des exigences raisonnables pour une plante qui transforme n'importe quel salon en jardin d'hiver. Avec le temps, ses feuilles deviennent de plus en plus découpées, chaque nouvelle pousse étant plus spectaculaire que la précédente. C'est une plante qui récompense la patience par la beauté.</p>

<h3>Les Succulentes : les graphiques</h3>
<p>Pour celles et ceux qui voyagent beaucoup ou qui oublient sincèrement que les plantes ont besoin d'eau : les succulentes sont vos alliées. Un rebord de fenêtre ensoleillé, un arrosage tous les dix à quinze jours, et elles prospéreront avec une élégance géométrique qui fait merveille sur un bureau, une étagère ou une table basse. Présentées en trio dans de petits pots en béton brut, elles constituent aussi un cadeau idéal pour convertir un ami sceptique au plaisir du végétal.</p>

<p>Toutes ces plantes sont disponibles dans notre boutique, livrées dans des contenants soigneusement choisis et accompagnées de conseils d'entretien personnalisés. Parce que chez Anne Freret, nous ne vendons pas des plantes — nous vous aidons à les garder vivantes. <a href="/boutique">Découvrez notre collection de plantes</a> et laissez le vert reprendre sa place chez vous.</p>`
  },
  {
    id: 5,
    title: 'Sept secrets de fleuriste pour des fleurs qui durent',
    excerpt: 'Ce serait dommage qu\'un si beau bouquet ne dure que trois jours. Voici les gestes simples qui changent tout — testés et approuvés dans notre atelier.',
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'faire-durer-fleurs-coupees',
    date: '2026-01-18',
    category: 'Pratique',
    readTime: '5 min de lecture',
    author: 'Anne Freret',
    ctaTitle: 'Des bouquets qui durent',
    ctaDescription: 'Chaque bouquet Anne Freret est livré avec son sachet de conservation et ses conseils personnalisés. Fraîcheur garantie sept jours.',
    ctaLink: '/boutique',
    ctaLabel: 'Commander un bouquet frais',
    content: `<p>Il y a peu de choses aussi réjouissantes que de rentrer chez soi et de poser les yeux sur un bouquet de fleurs fraîches. Cette explosion de couleurs sur la table de la cuisine, ce parfum qui flotte dans l'entrée, cette sensation immédiate que la maison est plus vivante, plus douce, plus accueillante. Et il y a peu de choses aussi frustrantes que de voir ce même bouquet s'éteindre en quelques jours à peine.</p>

<p>Après des années passées les mains dans les fleurs, nous avons appris que la différence entre un bouquet qui dure trois jours et un bouquet qui illumine votre intérieur pendant deux semaines tient à quelques gestes simples. Les voici, sans filtre.</p>

<h3>Le geste fondateur : recouper les tiges</h3>
<p>C'est le conseil numéro un, celui que nous répétons à chaque cliente, et celui qui fait la plus grande différence. Dès que vous recevez votre bouquet, recoupez deux à trois centimètres de chaque tige en biseau, avec un couteau bien aiguisé. Pas des ciseaux — ils écrasent les fibres et bloquent l'absorption de l'eau. Renouvelez cette coupe tous les deux à trois jours. Ce geste simple rouvre les canaux d'hydratation de la tige et prolonge la vie de vos fleurs de manière spectaculaire.</p>

<h3>L'eau : tiède, propre, renouvelée</h3>
<p>Contrairement à ce que l'on pourrait croire, les fleurs coupées préfèrent l'eau tiède — autour de vingt degrés — qui pénètre plus facilement dans les tiges. Remplissez votre vase aux deux tiers et changez l'eau tous les deux jours. Ce n'est pas glamour, mais les bactéries qui prolifèrent dans une eau stagnante sont les premières ennemies de vos fleurs.</p>

<h3>Le feuillage immergé : l'ennemi silencieux</h3>
<p>Toute feuille qui trempe dans l'eau se décompose et génère des bactéries qui obstruent les tiges. Avant de placer votre bouquet dans le vase, retirez méticuleusement chaque feuille qui se trouverait sous la ligne d'eau. C'est un petit effort qui a un grand impact.</p>

<h3>La recette secrète : sucre et vinaigre</h3>
<p>Si vous n'avez pas de sachet de conservation — nous en glissons un dans chacun de nos bouquets — voici notre recette maison : une cuillère à café de sucre pour nourrir les fleurs, et une cuillère de vinaigre blanc pour freiner la prolifération bactérienne, le tout pour un litre d'eau. C'est simple, c'est efficace, et vous avez probablement tout ce qu'il faut dans votre cuisine.</p>

<h3>L'éloignement des fruits : la règle d'or</h3>
<p>Les fruits, en murissant, dégagent de l'éthylène — un gaz invisible qui accélère considérablement le vieillissement des fleurs. Éloignez votre bouquet de la corbeille de fruits. Ce détail, souvent ignoré, peut faire gagner plusieurs jours de fraîcheur à vos compositions.</p>

<h3>L'emplacement idéal : frais et lumineux</h3>
<p>Vos fleurs aiment la lumière mais détestent la chaleur. Placez-les dans un endroit lumineux, loin du soleil direct, des radiateurs et des courants d'air. Le soir, si vous le pouvez, déplacez votre bouquet dans la pièce la plus fraîche de la maison — un geste que les fleuristes pratiquent dans leurs boutiques et qui prolonge la vie des fleurs de manière significative.</p>

<h3>Le tri sélectif : retirer ce qui fane</h3>
<p>Une fleur qui se fane dégage de l'éthylène et accélère le déclin de ses voisines. Retirez les fleurs fatiguées au fur et à mesure, sans hésiter. Votre bouquet changera de visage au fil des jours — c'est normal, c'est même beau — et les dernières survivantes vous offriront parfois leur plus belle floraison.</p>

<p>Chez Anne Freret, nous coupons nos fleurs le plus tard possible et nous composons vos bouquets le jour même de l'expédition. Chaque commande est accompagnée d'un sachet de conservation et de conseils adaptés aux variétés que nous avons choisies pour vous. <a href="/boutique">Offrez-vous un bouquet</a> et voyez la différence que fait la fraîcheur.</p>`
  },
  {
    id: 6,
    title: 'Ce que vos fleurs disent de vous : le langage secret des bouquets',
    excerpt: 'Depuis des siècles, chaque fleur porte un message. Apprenez à lire — et à écrire — le plus beau des langages silencieux.',
    image: 'https://images.pexels.com/photos/2879824/pexels-photo-2879824.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'langage-secret-fleurs',
    date: '2026-01-10',
    category: 'Inspiration',
    readTime: '6 min de lecture',
    author: 'Anne Freret',
    ctaTitle: 'Composez votre message floral',
    ctaDescription: 'Amour, amitié, gratitude, réconfort... Laissez notre équipe vous guider pour choisir les fleurs qui diront exactement ce que vous ressentez.',
    ctaLink: '/boutique',
    ctaLabel: 'Choisir un bouquet',
    content: `<p>Bien avant les textos, les emails et les lettres manuscrites, il existait un langage que l'on confiait aux fleurs. Au dix-neuvième siècle, à l'époque victorienne, un bouquet n'était jamais anodin : chaque variété, chaque couleur, jusqu'à la manière de le tendre, portait un message que le destinataire savait déchiffrer. On appelait cela la floriographie — l'art de parler sans dire un mot.</p>

<p>Aujourd'hui, nous ne composons plus nos bouquets en consultant des dictionnaires de symboles. Et pourtant, quelque chose persiste. Lorsque vous hésitez entre des roses rouges et des pivoines rose pâle, ce n'est pas une question de goût — c'est une question de message. Chez Anne Freret, nous croyons que choisir ses fleurs avec intention transforme un beau geste en un geste inoubliable.</p>

<h3>Les fleurs de l'amour</h3>
<p><strong>La rose rouge</strong> n'a pas besoin de présentation. Depuis des siècles, elle est la déclaration d'amour la plus universelle, la plus directe, la plus puissante. Une seule rose rouge dans un vase fin dit "je t'aime" avec une force que mille mots ne sauraient égaler. Un bouquet entier est une proclamation.</p>

<p><strong>La tulipe rouge</strong>, plus inattendue, déclare un amour parfait et sincère. Moins conventionnelle que la rose, elle surprend — et c'est souvent dans la surprise que réside le plus beau des aveux.</p>

<p><strong>La pivoine</strong>, avec ses pétales qui se déploient comme une confidence, symbolise un amour heureux et l'enchantement du couple. C'est la fleur des anniversaires de mariage, celle qui dit "notre histoire est belle et elle continue".</p>

<h3>Les fleurs de l'amitié</h3>
<p><strong>Le tournesol</strong> incarne la joie pure, la fidélité et l'admiration. Offrir des tournesols, c'est dire "tu illumines mes journées" sans aucune ambiguïté romantique — un message rare et précieux dans un monde qui confond souvent affection et séduction.</p>

<p><strong>La rose jaune</strong>, longtemps victime d'une réputation injuste — non, elle ne signifie pas la jalousie — est en réalité le symbole d'une amitié chaleureuse, de la joie partagée, du bonheur d'être ensemble. Offrez-en sans hésiter à vos amis les plus chers.</p>

<h3>Les fleurs de la gratitude</h3>
<p><strong>L'hortensia</strong>, avec ses pompons généreux aux teintes aquarellées, exprime la reconnaissance et la grâce. C'est la fleur que l'on offre pour dire "merci d'exister dans ma vie" — un sentiment plus profond et plus rare qu'un simple remerciement.</p>

<p><strong>Le lys</strong>, dans sa blancheur majestueuse, porte un message de pureté et de noblesse de coeur. Offrir un lys, c'est reconnaître la valeur de quelqu'un avec une élégance qui se passe de commentaire.</p>

<h3>Les fleurs du réconfort</h3>
<p><strong>L'iris</strong>, fleur délicate aux teintes de bleu et de violet, porte un message d'espoir et de foi en l'avenir. Dans les moments difficiles, il murmure "ceci aussi passera" avec une douceur que seul le végétal sait offrir.</p>

<p><strong>Le chrysanthème blanc</strong>, souvent réduit en France à son rôle du premier novembre, est pourtant une fleur d'une noblesse remarquable. Dans le reste du monde, il symbolise la vérité, la loyauté et la dévotion. Nous l'intégrons parfois dans nos compositions de deuil chez Anne Freret, où il apporte une sérénité lumineuse et apaisante.</p>

<h3>Laisser les fleurs parler pour vous</h3>
<p>Vous n'avez pas besoin de maîtriser la floriographie pour offrir un bouquet qui touche en plein coeur. L'essentiel est l'intention : prendre un instant pour penser à la personne que vous aimez, et choisir les fleurs qui reflètent ce que vous ressentez pour elle. Notre équipe est là pour vous guider dans ce choix — par téléphone, en boutique, ou à travers nos compositions pensées pour chaque émotion.</p>

<p>Parce qu'un bouquet bien choisi dit toujours plus qu'une carte de voeux. <a href="/boutique">Explorez nos créations</a> et laissez les fleurs parler pour vous.</p>`
  },
];