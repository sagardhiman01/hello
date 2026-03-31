import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await requireAuth(request);

    const ordersRaw = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    const orders = ordersRaw.map(o => ({
      ...o,
      items: o.items ? JSON.parse(o.items) : [],
      shippingAddress: o.shippingAddress ? JSON.parse(o.shippingAddress) : {},
      paymentResult: o.paymentResult ? JSON.parse(o.paymentResult) : null
    }));

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }
    console.error('Orders GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
