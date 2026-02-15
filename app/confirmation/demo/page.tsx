'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationDemo() {
  const router = useRouter();

  useEffect(() => {
    const demoOrder = {
      orderId: 'AF-2026-R3N4D',
      date: new Date().toISOString(),
      items: [
        {
          id: 'la-pointe-du-roc',
          name: 'La Pointe du Roc',
          size: 'Très grand',
          price: 79.90,
          quantity: 1,
          image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454',
        },
        {
          id: 'vase-ceramique',
          name: 'Vase en céramique',
          size: 'Unique',
          price: 19.90,
          quantity: 1,
          image: 'https://images.pexels.com/photos/4022205/pexels-photo-4022205.jpeg?auto=compress&cs=tinysrgb&w=300',
        },
      ],
      delivery: {
        mode: 'national',
        date: '2026-02-18',
        fee: 0,
        discount: 0,
        subtotal: 99.80,
        total: 99.80,
      },
      customer: {
        email: 'renaud.sechan@gmail.com',
        firstName: 'Renaud',
        lastName: 'Séchan',
        phone: '04 91 55 12 34',
        address: '12 Boulevard de la Canebière',
        postalCode: '13001',
        city: 'Marseille',
      },
    };

    localStorage.setItem('af-last-order', JSON.stringify(demoOrder));
    router.replace('/confirmation');
  }, [router]);

  return null;
}
