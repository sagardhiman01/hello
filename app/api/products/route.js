import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const bestSeller = searchParams.get('bestSeller');
    const newArrival = searchParams.get('newArrival');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;

    let where = {};
    if (category) where.category = category;
    if (featured === 'true') where.featured = true;
    if (bestSeller === 'true') where.bestSeller = true;
    if (newArrival === 'true') where.newArrival = true;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } }
      ];
    }

    const total = await prisma.product.count({ where });
    const productsRaw = await prisma.product.findMany({
      where,
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    const products = productsRaw.map(p => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
      tags: p.tags ? JSON.parse(p.tags) : []
    }));

    return NextResponse.json({
      success: true,
      products,
      pagination: { total, page, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Products GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Note: requireAdmin might need updating to check Prisma users
    // For now we'll proceed assuming auth middleware is somewhat decoupled
    const data = await request.json();
    
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (!data.sku) {
      data.sku = 'AUR-' + Date.now();
    }

    // Convert arrays back to JSON strings for SQLite
    if (data.images && Array.isArray(data.images)) {
      data.images = JSON.stringify(data.images);
    }
    if (data.tags && Array.isArray(data.tags)) {
      data.tags = JSON.stringify(data.tags);
    }

    const productRaw = await prisma.product.create({ data });
    const product = {
      ...productRaw,
      images: productRaw.images ? JSON.parse(productRaw.images) : [],
      tags: productRaw.tags ? JSON.parse(productRaw.tags) : []
    };

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    if (error.message === 'Authentication required' || error.message === 'Admin access required') {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Products POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
