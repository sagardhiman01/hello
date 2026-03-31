import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (data.images && Array.isArray(data.images)) data.images = JSON.stringify(data.images);
    if (data.tags && Array.isArray(data.tags)) data.tags = JSON.stringify(data.tags);
    if (!data.slug) data.slug = data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
