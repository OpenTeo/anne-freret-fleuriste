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
    category: 'Bouquets',
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
    category: 'Bouquets',
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
    category: 'Bouquets',
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
    category: 'Bouquets',
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
    category: 'Bouquets',
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
  },
  // PLANTES
  {
    id: '23',
    name: 'Monstera Deliciosa',
    price: 34.90,
    image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Plantes',
    description: 'Le Monstera Deliciosa, star des intérieurs contemporains, séduit par ses feuilles découpées spectaculaires. Facile d\'entretien, il apporte une touche tropicale et purife l\'air naturellement. Livré dans un pot en céramique artisanale.',
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
      'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Plantes',
    description: 'Symbole de paix et de longévité, cet olivier d\'ornement apporte une élégance méditerranéenne à votre intérieur. Son feuillage argenté et son tronc noueux en font une pièce décorative unique. Livré dans un cache-pot en terre cuite.',
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
      'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Plantes',
    description: 'Le Ficus Lyrata, aussi appelé figuier lyre, impressionne par ses grandes feuilles brillantes en forme de violon. Véritable sculpture végétale, il transforme n\'importe quel espace en jardin d\'intérieur luxuriant.',
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
      'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Plantes',
    description: 'Trio de succulentes soigneusement sélectionnées, présentées dans de petits pots en béton. Quasi-indestructibles et graphiques, elles sont parfaites pour offrir ou pour décorer un bureau, une étagère ou un rebord de fenêtre.',
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
    image: 'https://images.pexels.com/photos/374062/pexels-photo-374062.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/374062/pexels-photo-374062.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Accessoires',
    description: 'Bougie artisanale à la cire de soja, parfum fleur de coton. Durée de combustion : environ 40 heures. Mèche en coton naturel. Fabriquée en Normandie.',
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
    image: 'https://images.pexels.com/photos/4022205/pexels-photo-4022205.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4022205/pexels-photo-4022205.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Accessoires',
    description: 'Vase en céramique artisanale, forme organique épurée. Parfait pour mettre en valeur vos bouquets. Coloris crème mat. Hauteur 18cm.',
    slug: 'vase-ceramique',
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 14,
    tags: ['vase', 'céramique', 'artisanal', 'déco'],
  },
  {
    id: '29',
    name: 'Coffret chocolats belges',
    price: 14.90,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Accessoires',
    description: 'Coffret de 12 chocolats belges assortis : noir, lait et blanc. Praliné, ganache et caramel. L\'accompagnement parfait pour un bouquet.',
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
    image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'Accessoires',
    description: 'Mélange de graines de fleurs sauvages à semer au printemps. Coquelicots, bleuets, marguerites et cosmos. Sachet kraft illustré, parfait en cadeau.',
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
    title: 'L\'art de composer un bouquet champêtre',
    excerpt: 'Découvrez nos secrets pour créer des bouquets naturels et authentiques qui capturent l\'essence de la campagne normande.',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'art-composer-bouquet-champetre',
    date: '2026-02-10',
    category: 'Conseils',
    readTime: '5 min de lecture',
    author: 'Anne Freret',
    content: `<p>L'art de composer un bouquet champêtre réside dans la capacité à capturer l'essence sauvage de la nature tout en créant une harmonie visuelle délicate. Chez Anne Freret, cette approche florale est au cœur de notre identité depuis nos débuts à Saint-Pair-sur-Mer.</p>

<h3>Choisir les bonnes fleurs</h3>
<p>Un bouquet champêtre réussi mélange des fleurs de différentes tailles et textures. Commencez par une base de fleurs volumineuses — pivoines, roses de jardin ou hortensias — puis ajoutez des fleurs plus délicates : matricaires, astilbes, nigelles ou scabieuses. L'astuce ? Toujours inclure des fleurs "sauvages" qui apportent ce côté naturel et spontané.</p>

<h3>Le feuillage fait tout</h3>
<p>Ne sous-estimez jamais le pouvoir du feuillage. L'eucalyptus, le lierre, les graminées ornementales ou encore l'olivier donnent du mouvement et de la profondeur à votre composition. C'est le feuillage qui transforme un simple bouquet en une création champêtre authentique.</p>

<h3>La règle des couleurs</h3>
<p>Optez pour une palette de 3 à 4 couleurs maximum, en privilégiant les tons doux et naturels : rose poudré, blanc crème, vert sauge, lavande. Les touches de couleur vive — un coquelicot, un chardon bleu — doivent rester ponctuelles pour garder cet aspect "cueilli dans un champ".</p>

<h3>L'assemblage</h3>
<p>La technique spirale est votre alliée. Tournez chaque tige dans le même sens en variant les hauteurs. Un bouquet champêtre ne doit jamais paraître "trop parfait" — c'est justement cette asymétrie maîtrisée qui fait tout son charme. Laissez les tiges dépasser, autorisez les fleurs à pencher naturellement.</p>

<p>Envie de recevoir un bouquet champêtre composé par nos soins ? Découvrez notre sélection en boutique ou contactez-nous pour une création sur mesure.</p>`
  },
  {
    id: 2,
    title: 'Préparer son mariage : le guide floral complet',
    excerpt: 'De la première consultation au jour J : tout ce qu\'il faut savoir pour choisir les fleurs parfaites de votre mariage.',
    image: 'https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'preparer-mariage-guide-floral',
    date: '2026-02-05',
    category: 'Mariages',
    readTime: '8 min de lecture',
    author: 'Anne Freret',
    content: `<p>Le choix des fleurs pour votre mariage est l'une des décisions les plus importantes de la décoration. Elles définissent l'ambiance, complètent votre robe et racontent votre histoire d'amour. Voici notre guide complet pour ne rien laisser au hasard.</p>

<h3>Quand commencer ?</h3>
<p>Idéalement, prenez rendez-vous avec votre fleuriste 6 à 9 mois avant le jour J. Cela laisse le temps de discuter de vos envies, de la saison des fleurs disponibles et du budget. Pour les mariages en haute saison (juin-septembre), anticipez encore plus.</p>

<h3>Le bouquet de la mariée</h3>
<p>C'est la pièce maîtresse. Il doit s'accorder avec votre robe, votre morphologie et le style du mariage. Un bouquet rond classique pour une robe princesse, une cascade pour une robe sirène, un bouquet libre et aérien pour une cérémonie champêtre. Prévoyez aussi un bouquet de lancer (plus petit et moins fragile).</p>

<h3>Les compositions de cérémonie</h3>
<p>Pensez aux éléments clés : l'arche ou le dais de cérémonie, les bouts de bancs, le chemin de pétales. L'astuce est de concentrer le budget floral sur les points focaux — là où les photos seront prises — plutôt que de tout décorer uniformément.</p>

<h3>La réception</h3>
<p>Les centres de table sont incontournables. Variez les hauteurs : alternez grands vases et compositions basses pour créer du rythme. N'oubliez pas les détails qui font la différence : une fleur sur chaque serviette, un chemin de table végétal, des bougies entourées de verdure.</p>

<h3>Le budget</h3>
<p>En moyenne, le budget floral représente 8 à 12% du budget total du mariage. Nos forfaits mariage commencent à partir de 800€ et incluent la consultation, la création et l'installation le jour J. Demandez votre devis personnalisé.</p>

<p>Prêts à sublimer votre grand jour ? Prenez rendez-vous pour une consultation gratuite à notre atelier de Saint-Pair-sur-Mer.</p>`
  },
  {
    id: 3,
    title: 'Les fleurs de saison : que choisir en février ?',
    excerpt: 'Tulipes, renoncules, anémones... Découvrez les stars florales du mois et comment en profiter.',
    image: 'https://images.pexels.com/photos/2226900/pexels-photo-2226900.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'fleurs-saison-fevrier',
    date: '2026-02-01',
    category: 'Saisons',
    readTime: '4 min de lecture',
    author: 'Anne Freret',
    content: `<p>Février annonce timidement le retour du printemps. Les premiers bulbes pointent leur nez et les couleurs reviennent dans nos ateliers. C'est l'un de nos mois préférés : la palette est douce, romantique, parfaite pour la Saint-Valentin mais pas seulement.</p>

<h3>Les stars de février</h3>
<p><strong>Les tulipes</strong> — Reines incontestées du mois. Simples, doubles, perroquet, frangées... Il existe plus de 3 000 variétés. Nos préférées : les tulipes doubles rose poudré et les tulipes perroquet aux pétales ondulés.</p>

<p><strong>Les renoncules</strong> — Avec leurs pétales délicats qui se superposent comme du papier de soie, elles sont l'élégance incarnée. Disponibles en blanc, rose, rouge, orange et même vert chartreuse.</p>

<p><strong>Les anémones</strong> — Leur cœur noir cerné de pétales blancs, rouges ou violets en fait des fleurs graphiques et modernes. Parfaites pour apporter du contraste.</p>

<p><strong>Le mimosa</strong> — Ses petites boules jaunes et son parfum enivrant font entrer le soleil dans la maison. En branche ou intégré à un bouquet, il illumine tout.</p>

<h3>Nos conseils d'entretien</h3>
<p>Les fleurs de février aiment la fraîcheur. Changez l'eau tous les 2 jours, recoupez les tiges en biseau et évitez la proximité des fruits (l'éthylène accélère le flétrissement). Vos tulipes continueront de pousser dans le vase — c'est normal et c'est beau !</p>

<p>Retrouvez toutes nos compositions de saison dans notre boutique en ligne, avec livraison partout en France.</p>`
  },
  {
    id: 4,
    title: '5 plantes d\'intérieur increvables pour les débutants',
    excerpt: 'Pas la main verte ? Ces plantes résistantes transformeront votre intérieur sans effort.',
    image: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'plantes-interieur-debutants',
    date: '2026-01-25',
    category: 'Conseils',
    readTime: '4 min de lecture',
    author: 'Anne Freret',
    content: `<p>Vous rêvez d'un intérieur verdoyant mais chaque plante que vous touchez finit par dépérir ? Pas de panique. Ces 5 plantes sont quasi-indestructibles et apporteront vie et couleur à votre espace.</p>

<h3>1. Le Pothos (Epipremnum aureum)</h3>
<p>Le champion toutes catégories. Il supporte l'ombre, les oublis d'arrosage et pousse aussi bien en suspension qu'en pot. Ses longues lianes retombantes habillent n'importe quelle étagère. Arrosez quand la terre est sèche, c'est tout.</p>

<h3>2. Le Sansevieria (Langue de belle-mère)</h3>
<p>Graphique et sculptural, il ne demande presque rien. Un arrosage toutes les 2 à 3 semaines suffit. Il purifie l'air et supporte aussi bien la lumière vive que les coins sombres. Parfait pour une chambre.</p>

<h3>3. Le Zamioculcas (Plante ZZ)</h3>
<p>Ses feuilles brillantes et charnues stockent l'eau, ce qui le rend ultra-résistant à la sécheresse. Il pousse lentement mais sûrement, même dans un bureau sans fenêtre. Le survivant ultime.</p>

<h3>4. Le Monstera Deliciosa</h3>
<p>Ses grandes feuilles découpées sont devenues iconiques. Il aime la lumière indirecte et un arrosage hebdomadaire. En retour, il transforme votre salon en jungle tropicale. Vous le trouverez dans notre collection Plantes.</p>

<h3>5. Les Succulentes</h3>
<p>Elles ne demandent qu'un rebord de fenêtre ensoleillé et un arrosage toutes les 2 semaines. Seules ou en trio, elles sont graphiques, modernes et parfaites pour offrir.</p>

<p>Découvrez notre sélection de plantes d'intérieur en boutique — toutes livrées avec leurs conseils d'entretien personnalisés.</p>`
  },
  {
    id: 5,
    title: 'Comment faire durer vos fleurs coupées plus longtemps',
    excerpt: '7 astuces de fleuriste pour profiter de vos bouquets jusqu\'à 2 semaines.',
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'faire-durer-fleurs-coupees',
    date: '2026-01-18',
    category: 'Pratique',
    readTime: '3 min de lecture',
    author: 'Anne Freret',
    content: `<p>Rien n'est plus frustrant qu'un beau bouquet qui se fane en quelques jours. Avec ces astuces de professionnelle, vous pourrez prolonger la vie de vos fleurs de plusieurs jours, voire doubler leur durée.</p>

<h3>1. Recoupez les tiges</h3>
<p>Dès la réception, coupez 2 à 3 cm en biseau avec un couteau propre (pas des ciseaux qui écrasent). Renouvelez la coupe tous les 2-3 jours. C'est le geste le plus important.</p>

<h3>2. Eau fraîche, pas froide</h3>
<p>Remplissez le vase aux deux tiers avec de l'eau tiède (20-25°C). Les tiges absorbent mieux l'eau tiède. Changez l'eau tous les 2 jours pour éviter les bactéries.</p>

<h3>3. Retirez le feuillage immergé</h3>
<p>Toute feuille sous l'eau va pourrir et créer des bactéries qui bouchent les tiges. Nettoyez soigneusement la partie immergée.</p>

<h3>4. L'astuce du sucre et du vinaigre</h3>
<p>Ajoutez une cuillère à café de sucre (nourriture) et une cuillère de vinaigre blanc (antibactérien) par litre d'eau. C'est l'équivalent maison du sachet de conservation.</p>

<h3>5. Éloignez les fruits</h3>
<p>Les fruits dégagent de l'éthylène qui accélère le vieillissement des fleurs. Gardez votre bouquet loin de la corbeille de fruits.</p>

<h3>6. Évitez le soleil direct et la chaleur</h3>
<p>Placez votre bouquet dans un endroit frais et lumineux, mais jamais en plein soleil ni près d'un radiateur. La nuit, un balcon couvert ou une pièce fraîche prolonge significativement leur vie.</p>

<h3>7. Retirez les fleurs fanées</h3>
<p>Une fleur qui se fane accélère le vieillissement des autres. Retirez-les au fur et à mesure pour que le reste du bouquet reste frais plus longtemps.</p>

<p>Tous nos bouquets sont livrés avec un sachet de conservation et des conseils d'entretien personnalisés. Fraîcheur garantie 7 jours !</p>`
  },
  {
    id: 6,
    title: 'Offrir des fleurs : le langage secret des bouquets',
    excerpt: 'Chaque fleur porte un message. Apprenez à composer le bouquet qui dit exactement ce que vous ressentez.',
    image: 'https://images.pexels.com/photos/2879824/pexels-photo-2879824.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'langage-secret-fleurs',
    date: '2026-01-10',
    category: 'Inspiration',
    readTime: '5 min de lecture',
    author: 'Anne Freret',
    content: `<p>Le langage des fleurs, ou floriographie, est une tradition séculaire qui attribue un sens à chaque variété. Aujourd'hui encore, offrir des fleurs est un geste chargé de sens. Voici les messages les plus courants pour ne jamais se tromper.</p>

<h3>L'amour</h3>
<p><strong>La rose rouge</strong> — Le classique absolu de la déclaration d'amour. Une seule rose rouge dit "je t'aime" avec force et simplicité. Un bouquet entier exprime une passion ardente.</p>
<p><strong>La tulipe rouge</strong> — Moins conventionnelle que la rose, elle déclare un amour parfait et sincère. Idéale pour surprendre en février.</p>
<p><strong>La pivoine</strong> — Elle symbolise un amour heureux et la prospérité du couple. Parfaite pour un anniversaire de mariage.</p>

<h3>L'amitié</h3>
<p><strong>Le tournesol</strong> — Joie, fidélité et admiration. Il dit "tu illumines ma vie" sans ambiguïté romantique.</p>
<p><strong>La rose jaune</strong> — Contrairement à la croyance populaire, elle ne signifie pas la jalousie mais l'amitié chaleureuse et la joie de vivre.</p>

<h3>La gratitude</h3>
<p><strong>L'hortensia</strong> — Il exprime la reconnaissance et la grâce. Parfait pour remercier quelqu'un qui compte.</p>
<p><strong>Le lys</strong> — Pureté et noblesse de cœur. Offrez-le pour dire "merci du fond du cœur".</p>

<h3>Le réconfort</h3>
<p><strong>Le chrysanthème blanc</strong> — En France, il est associé au souvenir et au recueillement. Mais dans le reste du monde, il symbolise la vérité et la loyauté.</p>
<p><strong>L'iris</strong> — Il porte un message d'espoir et de foi. Un choix délicat pour accompagner un moment difficile.</p>

<p>Besoin d'aide pour choisir ? Notre équipe vous conseille par téléphone ou en boutique pour composer le message floral parfait.</p>`
  },
];