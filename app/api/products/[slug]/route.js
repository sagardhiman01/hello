import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const productRaw = await prisma.product.findUnique({
      where: { slug }
    });

    if (!productRaw) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = {
      ...productRaw,
      images: productRaw.images ? JSON.parse(productRaw.images) : [],
      tags: productRaw.tags ? JSON.parse(productRaw.tags) : []
    };

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Product Detail GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
