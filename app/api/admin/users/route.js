import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req) {
  try {
    await requireAdmin(req);
    const users = await prisma.user.findMany({
      include: {
        orders: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    const customersWithStats = users.map(user => ({
      ...user,
      orderCount: user.orders.length,
      totalSpent: user.orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0),
    }));

    return NextResponse.json({ success: true, users: customersWithStats });
  } catch (error) {
    console.error('Fetch Users Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}
