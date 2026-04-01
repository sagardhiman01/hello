import prisma from '@/lib/prisma';
import { generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { execSync } from 'child_process';

async function initializeDatabase() {
  try {
    console.log('Initializing database on the fly...');
    execSync('npx prisma db push --accept-data-loss');
    // Also ensuring admin exists
    const hashedPassword = await bcrypt.hash('macstudio123456', 12);
    await prisma.user.upsert({
      where: { email: 'macstudiohub1@gmail.com' },
      update: { role: 'admin' },
      create: {
        name: 'Mac Studio Hub',
        email: 'macstudiohub1@gmail.com',
        password: hashedPassword,
        phone: '+91 00000 00000',
        role: 'admin',
      },
    });
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Failed to auto-initialize database:', err);
  }
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    let user;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch (dbError) {
      // If table doesn't exist, try initializing once
      if (dbError.message.includes('does not exist')) {
        await initializeDatabase();
        user = await prisma.user.findUnique({ where: { email } });
      } else {
        throw dbError;
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user);

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
