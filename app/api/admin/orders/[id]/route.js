import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status: data.status,
        trackingId: data.trackingId || undefined,
        isDelivered: data.status === 'delivered',
        deliveredAt: data.status === 'delivered' ? new Date() : undefined,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
