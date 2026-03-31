import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { user: { select: { name: true, email: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
    });

    const parsed = orders.map(o => ({
      ...o,
      items: JSON.parse(o.items || '[]'),
      shippingAddress: JSON.parse(o.shippingAddress || '{}'),
      paymentResult: o.paymentResult ? JSON.parse(o.paymentResult) : null,
    }));

    return NextResponse.json({ success: true, orders: parsed });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
