// Test email endpoint to verify email templates and sending
// Protected by query parameter: ?key=AnneFreret2026!

import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmation } from '@/lib/send-email';
import type { Order } from '@/lib/email-templates';

const TEST_KEY = 'AnneFreret2026!';

export async function GET(request: NextRequest) {
  // Check authentication key
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get('key');

  if (key !== TEST_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid key' },
      { status: 401 }
    );
  }

  // Create sample order data
  const sampleOrder: Order = {
    id: 'test-order-123',
    orderNumber: 'AF-2026-001',
    items: [
      {
        id: '1',
        name: 'Bouquet "Élégance Parisienne"',
        quantity: 1,
        price: 65.0,
        image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400',
      },
      {
        id: '2',
        name: 'Roses "Jardin Secret" (12 tiges)',
        quantity: 1,
        price: 45.0,
        image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400',
      },
      {
        id: '3',
        name: 'Composition "Harmonie Champêtre"',
        quantity: 1,
        price: 55.0,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
      },
    ],
    total: 165.0,
    shippingAddress: {
      name: 'contact.ledanois@gmail.com',
      street: '42 Avenue des Champs-Élysées',
      city: 'Paris',
      postalCode: '75008',
      country: 'France',
    },
    estimatedDelivery: 'Vendredi 4 avril 2026',
    createdAt: new Date().toISOString(),
  };

  try {
    // Send test email
    const result = await sendOrderConfirmation(sampleOrder);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        emailId: result.id,
        recipient: sampleOrder.shippingAddress.name,
        orderNumber: sampleOrder.orderNumber,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send email',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Test email endpoint error:', message);
    
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
