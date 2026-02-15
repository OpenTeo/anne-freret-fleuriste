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
  'Fleurs séchées',
  'Mariages',
  'Deuil & Hommages',
  'Compositions',
];

export const mockProducts: Product[] = [
  // BOUQUETS
  {
    id: '2',
    name: 'Barneville-Carteret',
    price: 49.90,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619',
    images: [
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Cette délicate composition s\'accompagne de lisianthus, de dille, de roses, de limonum, et blé le tout entouré d\'un délicat feuillage. Une invitation à la tendresse.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Ce bouquet rafraîchissant, avec des teintes vives est parfait pour apporter une touche d\'énergie et de vivacité dans votre intérieur.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-20250201-WA0008.jpg?v=1738607322',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-20250201-WA0008.jpg?v=1738607322',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-20250201-WA0008.jpg?v=1738607322',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Hommage floral à la ville qui l\'a inspiré. Avec ses roses délicates aux nuances pastel, ses fleurs champêtres et son feuillage verdoyant, ce bouquet respire la douceur.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_3a2e9857-fa21-42db-b89a-47630ccdf35d.png?v=1684428237',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_3a2e9857-fa21-42db-b89a-47630ccdf35d.png?v=1684428237',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_3a2e9857-fa21-42db-b89a-47630ccdf35d.png?v=1684428237',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Craquez pour cet ensemble de fleurs à vous faire tomber de bonheur. Avec ces couleurs dans les tonalités de rose qui viendront apporter de la fraicheur à votre intérieur. Composition : Rose pâle sweet, wax fleur, tulipe dentelé.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Les fleurettes du Lisianthus frisé blanc, tel un fin plumetis, ponctuent ce joli bouquet fougueux de grâce et de finesse.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton2.jpg?v=1625149279',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton2.jpg?v=1625149279',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Rosegrosbouton2.jpg?v=1625149279',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Tendrissime brassée de fleurs aux teintes roses. Travaillé en abondance, ce joli bouquet aux couleurs pastel séduit par son homogénéité de tons avant de subjuguer par le mariage de ses essences.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Rose frisée blanche sublimée par des chardons sauvages, cette composition évoque l\'authenticité des campagnes normandes. Un contraste saisissant entre douceur florale et caractère sauvage.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'L\'un des chouchous de la collection Anne Freret. Avec ses ravissants tons rose clair, il nous rappelle les événements heureux de la vie.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00002_b6f2b70f-619d-4105-b4e8-f74941e8c689.jpg?v=1639823258',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00002_b6f2b70f-619d-4105-b4e8-f74941e8c689.jpg?v=1639823258',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/image00002_b6f2b70f-619d-4105-b4e8-f74941e8c689.jpg?v=1639823258',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Le Bouquet du fleuriste est le mélange parfait pour sublimer vos intérieurs ou bien même pour faire plaisir à vos proches.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Compositions',
    description: 'Faites confiance à notre expertise ! Nous créons pour vous un bouquet unique selon nos inspirations du moment.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin2.jpg?v=1625151901',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin2.jpg?v=1625151901',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdesaintvalentin2.jpg?v=1625151901',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Bouquets',
    description: 'Roses rouges intenses sublimées par des fleurs pastel. Un contraste dramatique et sophistiqué.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose2.jpg?v=1625070100',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose2.jpg?v=1625070100',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderose2.jpg?v=1625070100',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Mariages',
    description: 'Avec ses tons doux et ses textures aériennes, ce bouquet évoque la beauté naturelle et la sérénité. Composé de roses poudrées, de fleurs sauvages et de feuillages délicats, il capture l\'essence d\'un charme champêtre tout en restant raffiné.',
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
      'https://fleuriste-annefreret.com/cdn/shop/files/279170543_782557459396911_8647938960483584919_n-min_1024x1024_crop_center.jpg',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Fleurs séchées',
    description: 'Nos "Box Mariage" se composent d\'un bouquet et d\'un peigne pour la mariée et d\'une boutonnière assortie pour le marié. Bouquet : 20cm de diamètre pour 25cm de hauteur, finition cordelette. Composition : Amarante, miscanthus, phalaris, grain d\'aneth, limonium, gypsophile, lagurus, stipa. Fleurs séchées.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png?v=1684426912',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png?v=1684426912',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png?v=1684426912',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Fleurs séchées',
    description: 'Nos "Box Mariage" se composent d\'un bouquet et d\'un peigne pour la mariée et d\'une boutonnière assortie pour le marié. Bouquet : 25cm de diamètre pour 30cm de hauteur, finition cordelette. Une composition exotique et colorée pour un mariage dépaysant.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png?v=1684426619',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png?v=1684426619',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png?v=1684426619',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Fleurs séchées',
    description: 'Nos "Box Mariage" se composent d\'un bouquet et d\'un peigne pour la mariée et d\'une boutonnière assortie pour le marié. Bouquet : 20cm de diamètre pour 25cm de hauteur, finition cordelette. Inspiration marine pour une cérémonie en bord de mer.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquette.jpg?v=1737645211',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquette.jpg?v=1737645211',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Raquette.jpg?v=1737645211',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Deuil & Hommages',
    description: 'Cette raquette funéraire trace un chemin de paix vers l\'éternité. Composée avec délicatesse, elle témoigne de l\'amour qui perdure et de la beauté des souvenirs partagés, offrant réconfort aux cœurs endeuillés.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Deuil & Hommages',
    description: 'Ce cœur fleuri exprime l\'amour qui transcende le temps. Chaque pétale murmure les tendres souvenirs, chaque tige raconte une histoire d\'affection infinie. Un symbole d\'éternité qui console et honore la mémoire de l\'être cher.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Deuil & Hommages',
    description: 'Majestueuse couronne aux lignes intemporelles, elle porte en son cercle la promesse de l\'éternité. Chaque fleur délicatement choisie rend hommage à une vie accomplie, dans le respect des traditions et la noblesse du souvenir.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_3.png?v=1729873535',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_3.png?v=1729873535',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_3.png?v=1729873535',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Deuil & Hommages',
    description: 'Doux coussin fleuri, refuge de tendresse dans la tempête du deuil. Ses fleurs assemblées avec délicatesse offrent un havre de paix, murmurant des mots de réconfort à ceux qui pleurent et gardent précieusement le souvenir.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9458.jpg?v=1729195833',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9458.jpg?v=1729195833',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG-9458.jpg?v=1729195833',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Deuil & Hommages',
    description: 'Sacrée croix fleurie, pont entre terre et ciel, elle élève les prières et apaise les âmes. Symbole de foi et d\'espérance, elle guide vers la lumière ceux qui cherchent la paix dans l\'au-delà.',
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
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_5_251d2d18-b531-457a-81d2-8a77a2151dbc.png?v=1729950268',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_5_251d2d18-b531-457a-81d2-8a77a2151dbc.png?v=1729950268',
      'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/photo_vente_5_251d2d18-b531-457a-81d2-8a77a2151dbc.png?v=1729950268',
      'https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798'
    ],
    category: 'Deuil & Hommages',
    description: 'Petit jardin d\'éternité où la vie continue de palpiter. Ces plantes aux feuillages persistants portent la promesse d\'un renouveau, témoignant que l\'amour et le souvenir fleurissent bien au-delà des saisons.',
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
  }
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
    title: 'L\'art de composer un bouquet champêtre',
    excerpt: 'Découvrez nos secrets pour créer des bouquets naturels et authentiques.',
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
    slug: 'art-composer-bouquet-champetre',
    date: '2024-02-10',
    category: 'Compositions',
    readTime: '5 min de lecture',
    author: 'Anne Freret',
    content: '<p>L\'art de composer un bouquet champêtre réside dans la capacité à capturer l\'essence sauvage de la nature tout en créant une harmonie visuelle délicate. Cette approche florale, qui puise son inspiration dans les champs et les prairies, nécessite une compréhension fine des textures, des couleurs et des formes naturelles.</p>'
  },
  {
    id: 2,
    title: 'Préparer son mariage : guide floral complet',
    excerpt: 'Tous nos conseils pour choisir les fleurs parfaites pour votre grand jour.',
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
    slug: 'preparer-mariage-guide-floral',
    date: '2024-02-05',
    category: 'Mariages',
    readTime: '8 min de lecture',
    author: 'Anne Freret',
    content: '<p>Préparer les décorations florales de votre mariage est un moment privilégié qui nécessite réflexion et anticipation. Des premiers conseils de planification aux derniers détails de la décoration, chaque étape mérite une attention particulière pour créer l\'ambiance de vos rêves.</p>'
  },
  {
    id: 3,
    title: 'Les fleurs de saison : février',
    excerpt: 'Quelles fleurs privilégier en cette période de l\'année pour vos compositions.',
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
    slug: 'fleurs-saison-fevrier',
    date: '2024-02-01',
    category: 'Bouquets',
    readTime: '3 min de lecture',
    author: 'Anne Freret',
    content: '<p>Le mois de février marque une transition douce vers le printemps, offrant aux fleuristes une palette florale riche et variée. Cette période de l\'année se caractérise par l\'apparition des premiers bulbes printaniers et la persistance de certaines variétés hivernales.</p>'
  }
];