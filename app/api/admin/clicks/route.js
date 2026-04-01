import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req) {
  try {
    await requireAdmin(req);
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Get clicks and include user details if available
    const clicks = await prisma.clickEvent.findMany({
      where: {
        timestamp: { gte: yesterday }
      },
      orderBy: { timestamp: 'desc' },
      take: 200, // Limit to recent 200 for performance
    });

    // Populate user names for clicks
    const clicksWithUsers = await Promise.all(clicks.map(async (click) => {
      let userName = 'Guest';
      if (click.userId) {
        const user = await prisma.user.findUnique({ where: { id: click.userId }, select: { name: true } });
        userName = user?.name || 'User';
      }
      return { ...click, userName };
    }));

    return NextResponse.json({ success: true, clicks: clicksWithUsers });
  } catch (error) {
    console.error('Fetch Clicks Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch clicks' }, { status: 500 });
  }
}
