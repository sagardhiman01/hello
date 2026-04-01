import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { path, element, userId } = body;

    const click = await prisma.clickEvent.create({
      data: {
        userId: userId ? parseInt(userId) : null,
        path: path || 'unknown',
        element: element || 'unknown',
        timestamp: new Date(),
      },
    });

    return NextResponse.json({ success: true, click });
  } catch (error) {
    console.error('Track Click Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to log click' }, { status: 500 });
  }
}
