import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envChecked = {
      JWT_SECRET: !!process.env.JWT_SECRET,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      CWD: process.cwd(),
    };

    let dbStatus = 'Checking...';
    try {
      const userCount = await prisma.user.count();
      dbStatus = `Connected (Users: ${userCount})`;
    } catch (dbErr) {
      dbStatus = `DB ERROR: ${dbErr.message}`;
    }

    return NextResponse.json({
      status: 'Server is running',
      environment: envChecked,
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
