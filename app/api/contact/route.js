import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Since we don't have a Message model yet, we can save it in a generic way 
    // or for now, just log it. Let's check if we can add a Message model.
    // For now, let's assume we want to save it.
    
    console.log('Inquiry Received:', { name, email, subject, message });

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
