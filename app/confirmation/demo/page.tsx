'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationDemo() {
  const router = useRouter();

  useEffect(() => {
    const demoOrder = {
      orderId: 'AF-2026-X7K9L',
      date: new Date().toISOString(),
      items: [
        {
          id: 'bouquet-champetre',
          name: 'Le Bouquet Champêtre',
          size: 'Grand',
          price: 54.90,
          quantity: 1,
          image: 'https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png',
        },
        {
          id: 'bougie-parfumee',
          name: 'Bougie parfumée',
          size: 'Unique',
          price: 12.90,
          quantity: 1,
          image: 'https://images.pexels.com/photos/374062/pexels-photo-374062.jpeg?auto=compress&cs=tinysrgb&w=300',
        },
      ],
      delivery: {
        mode: 'local',
        date: '2026-02-17',
        fee: 6,
        discount: 0,
        subtotal: 67.80,
        total: 73.80,
      },
      customer: {
        email: 'freret.anne@orange.fr',
        firstName: 'Anne',
        lastName: 'Freret',
        phone: '02 33 50 26 15',
        address: '39 Place Charles de Gaulle',
        postalCode: '50380',
        city: 'Saint-Pair-sur-Mer',
      },
    };

    localStorage.setItem('af-last-order', JSON.stringify(demoOrder));
    router.replace('/confirmation');
  }, [router]);

  return null;
}
