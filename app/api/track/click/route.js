import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { path, element, userId } = body;

    // Failsafe: Return success immediately without writing to DB to prevent 503 crashes on Hostinger
    return NextResponse.json({ success: true, message: 'Tracking disabled for stability' });
  } catch (error) {
    console.error('Track Click Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to log click' }, { status: 500 });
  }
}
