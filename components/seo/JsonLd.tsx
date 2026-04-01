interface JsonLdProps {
  type?: 'LocalBusiness' | 'Product' | 'BreadcrumbList' | 'Organization';
  data?: any;
  pathname?: string;
}

export default function JsonLd({ type = 'LocalBusiness', data, pathname = '/' }: JsonLdProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'Florist',
          '@id': 'https://fleuriste-annefreret.com/#florist',
          name: 'Anne Freret Fleuriste',
          description:
            'Artisan fleuriste depuis 2001 à Barneville-Carteret. Bouquets artisanaux, mariages, deuil, abonnements. Livraison en Normandie et France entière.',
          image: 'https://fleuriste-annefreret.com/images/logo.png',
          logo: 'https://fleuriste-annefreret.com/images/logo.png',
          url: 'https://fleuriste-annefreret.com',
          priceRange: '€€',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Barneville-Carteret',
            addressRegion: 'Normandie',
            postalCode: '50270',
            addressCountry: 'FR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 49.3833,
            longitude: -1.75,
          },
          areaServed: [
            { '@type': 'City', name: 'Barneville-Carteret' },
            { '@type': 'City', name: 'Granville' },
            { '@type': 'City', name: 'Saint-Pair-sur-Mer' },
            { '@type': 'City', name: 'Donville-les-Bains' },
            { '@type': 'City', name: 'Bréhal' },
            { '@type': 'City', name: 'Coutances' },
            { '@type': 'City', name: 'Avranches' },
            { '@type': 'City', name: 'Villedieu-les-Poêles' },
            { '@type': 'City', name: 'Saint-Lô' },
            { '@type': 'City', name: 'Cherbourg' },
            { '@type': 'City', name: 'Valognes' },
            { '@type': 'City', name: 'Caen' },
            { '@type': 'City', name: 'Bayeux' },
            { '@type': 'City', name: 'Vire' },
            { '@type': 'City', name: 'Rouen' },
            { '@type': 'City', name: 'Lisieux' },
            { '@type': 'State', name: 'Cotentin' },
            { '@type': 'State', name: 'Manche' },
            { '@type': 'State', name: 'Calvados' },
            { '@type': 'State', name: 'Normandie' },
            { '@type': 'Country', name: 'France' },
          ],
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '09:00',
              closes: '19:00',
            },
          ],
          sameAs: [],
        };

      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': 'https://fleuriste-annefreret.com/#organization',
          name: 'Anne Freret Fleuriste',
          url: 'https://fleuriste-annefreret.com',
          logo: 'https://fleuriste-annefreret.com/images/logo.png',
          description:
            'Artisan fleuriste depuis 2001 à Barneville-Carteret, Normandie. Bouquets artisanaux, mariages, deuil, livraison France.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Barneville-Carteret',
            addressRegion: 'Normandie',
            postalCode: '50270',
            addressCountry: 'FR',
          },
          sameAs: [],
        };

      case 'BreadcrumbList':
        if (!pathname || pathname === '/') return null;
        
        const pathSegments = pathname.split('/').filter(Boolean);
        const breadcrumbItems = [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://fleuriste-annefreret.com',
          },
        ];

        const nameMap: { [key: string]: string } = {
          boutique: 'Boutique',
          deuil: 'Fleurs de Deuil',
          mariages: 'Mariages',
          abonnement: 'Abonnement',
          contact: 'Contact',
          livraison: 'Livraison',
          blog: 'Blog',
          faq: 'FAQ',
          'a-propos': 'À Propos',
          cgv: 'Conditions Générales',
          'mentions-legales': 'Mentions Légales',
          galerie: 'Galerie',
        };

        let currentPath = 'https://fleuriste-annefreret.com';
        pathSegments.forEach((segment, index) => {
          currentPath += `/${segment}`;
          breadcrumbItems.push({
            '@type': 'ListItem',
            position: index + 2,
            name: nameMap[segment] || segment,
            item: currentPath,
          });
        });

        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems,
        };

      case 'Product':
        return data;

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
